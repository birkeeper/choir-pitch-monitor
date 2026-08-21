// Runs the exported Cuesta multi-F0 salience model on TensorFlow.js, from a flat weight blob and
// an explicit op list.
//
// NOTE: the app runs worker/graph-model.js (the tensorflowjs_converter output) instead. This module
// is kept as an independent reference implementation -- it is validated against Keras across every
// device plan by tests/check-model.mjs -- and because it is the only path that works on GPUs whose
// texture limit is too small for the converted graph, since it can split tall kernels to fit.
//
// The model is not a TF.js layers or graph model. tools/export_model.py emits an ordered op list
// (model/manifest.json) plus a flat float32 blob (model/weights.bin), and this file interprets it.
// See that script for why the converter route is not used.
//
// Tensor layout throughout is NHWC with H = frequency bin and W = time frame, which is exactly the
// layout predict_on_audio.py feeds the Keras model: (batch, 360, frames, 5).

import * as tf from '../libraries/tfjs/tfjs.js';
import { planForDevice } from './device-plan.js';
import { selectBackend, deviceTextureLimit } from './backend.js';

// Re-exported so existing callers (tests/test-model.html) keep working now that backend selection
// lives in its own module.
export { selectBackend, deviceTextureLimit };

/**
 * Compute a stride-1 'same'-padding conv2d whose kernel is taller than a single texture-backed
 * convolution can safely handle, by splitting the kernel into height-wise chunks and summing
 * 'valid' convolutions of each chunk against a correspondingly offset input slice.
 *
 * This is an exact decomposition, not an approximation: for output row `oh`,
 *   same_conv(x, K)[oh] = sum_{kh=0}^{K.height-1} K[kh] * padded_x[oh + kh]
 * splits cleanly into independent sums over any partition of the kh range, each of which is
 * itself a 'valid' convolution of a kernel slice against the matching slice of padded_x. See
 * worker/device-plan.js for what decides when this is needed, and tests/check-model.mjs for the
 * numeric check of every plan against the Keras reference.
 *
 * Only the height axis is split, but BOTH axes are padded up front: switching to 'valid' removes
 * the implicit padding on the width axis too, so a kernel wider than 1 would silently produce a
 * narrower output than 'same' would. That is not hypothetical -- the harm1/harm2 layers have
 * kernel width 3 and get split on GPUs with an 8192 or smaller texture limit.
 *
 * @param {tf.Tensor4D} input       [batch, height, width, inChannels]
 * @param {tf.Tensor4D} kernel      [kernelHeight, kernelWidth, inChannels, outChannels]
 * @param {tf.Tensor1D} bias        [outChannels]
 * @param {number} groupHeight      max kernel rows per chunk
 * @param {'relu'|'sigmoid'} activation
 */
function splitHeightConv2d(input, kernel, bias, groupHeight, activation) {
    const [kernelHeight, kernelWidth] = kernel.shape;
    const [, height, width] = input.shape;
    // 'same' padding for stride 1: total padding is kernelSize - 1 per axis, with any odd extra
    // element after the input (TensorFlow's convention, reproduced here so the split matches an
    // unsplit 'same' convolution exactly).
    const padTop = Math.floor((kernelHeight - 1) / 2);
    const padBottom = Math.ceil((kernelHeight - 1) / 2);
    const padLeft = Math.floor((kernelWidth - 1) / 2);
    const padRight = Math.ceil((kernelWidth - 1) / 2);
    const padded = tf.pad(input,
        [[0, 0], [padTop, padBottom], [padLeft, padRight], [0, 0]]);

    let sum = null;
    for (let offset = 0; offset < kernelHeight; offset += groupHeight) {
        const chunkHeight = Math.min(groupHeight, kernelHeight - offset);
        // 'valid' conv of a chunkHeight-tall kernel against a (height + chunkHeight - 1)-tall
        // slice of the already-padded input yields exactly `height` x `width` outputs -- the same
        // shape the full 'same' convolution would produce.
        const inputSlice = tf.slice(padded, [0, offset, 0, 0],
            [-1, height + chunkHeight - 1, -1, -1]);
        const kernelSlice = tf.slice(kernel, [offset, 0, 0, 0], [chunkHeight, -1, -1, -1]);
        const partial = tf.conv2d(inputSlice, kernelSlice, 1, 'valid');
        sum = sum ? tf.add(sum, partial) : partial;
    }

    if (sum.shape[1] !== height || sum.shape[2] !== width) {
        // A shape drift here changes the output size rather than erroring, which downstream shows
        // up as truncated salience rather than as a failure. Refuse instead.
        throw new Error(`split conv produced [${sum.shape}] but 'same' requires `
            + `height ${height} and width ${width}`);
    }

    const biased = tf.add(sum, bias);
    return activation === 'relu' ? tf.relu(biased) : tf.sigmoid(biased);
}

export class SalienceModel {
    #manifest;
    #weights;   // op output name -> {name: tf.Tensor}
    #inputNames;
    #outputName;
    #plan;      // chunk width and per-op kernel splitting for this GPU; see planForDevice

    constructor(manifest, weights, plan) {
        this.#manifest = manifest;
        this.#weights = weights;
        this.#inputNames = manifest.input.tensors;
        this.#outputName = manifest.output.tensor;
        this.#plan = plan;
    }

    /** How this model was adapted to the current GPU, for display and diagnostics. */
    get plan() {
        return {
            chunkFrames: this.#plan.chunkFrames,
            maxTextureSize: this.#plan.maxTextureSize,
            splits: Object.fromEntries(this.#plan.splits),
        };
    }

    /** Frequency bins in the salience output (360). */
    get bins() { return this.#manifest.input.bins; }

    /** Harmonics stacked in the channel axis of each input (5). */
    get harmonics() { return this.#manifest.input.harmonics; }

    /** Threshold predict_on_audio.py uses for this architecture. */
    get defaultThreshold() { return this.#manifest.default_threshold; }

    /** Provenance of the weights, for display and for stamping into exported CSVs. */
    get source() { return this.#manifest.source; }

    /**
     * Fetch and instantiate the model.
     *
     * Must be called after the backend is active: the plan depends on the GPU's reported limits.
     *
     * @param {string} baseUrl directory containing manifest.json and the weight blob
     * @param {object} [options] forwarded to planForDevice ({mode, maxTextureSize})
     */
    static async load(baseUrl, options = {}) {
        const manifestUrl = new URL('manifest.json', new URL(baseUrl, self.location.href));
        const manifestResponse = await fetch(manifestUrl);
        if (!manifestResponse.ok) {
            throw new Error(`could not fetch ${manifestUrl}: ${manifestResponse.status}`);
        }
        const manifest = await manifestResponse.json();

        const weightsUrl = new URL(manifest.weights_file, manifestUrl);
        const weightsResponse = await fetch(weightsUrl);
        if (!weightsResponse.ok) {
            throw new Error(`could not fetch ${weightsUrl}: ${weightsResponse.status}`);
        }
        const blob = await weightsResponse.arrayBuffer();
        if (blob.byteLength !== manifest.weights_bytes) {
            throw new Error(`${manifest.weights_file} is ${blob.byteLength} bytes, `
                + `manifest declares ${manifest.weights_bytes}`);
        }

        // Upload every weight to the backend once, up front. Doing this lazily inside the op loop
        // would re-upload on every chunk.
        const weights = new Map();
        for (const op of manifest.ops) {
            if (!op.weights) { continue; }
            const tensors = {};
            for (const [role, descriptor] of Object.entries(op.weights)) {
                const count = descriptor.shape.reduce((a, b) => a * b, 1);
                const values = new Float32Array(blob, descriptor.offset, count);
                tensors[role] = tf.tensor(values, descriptor.shape, 'float32');
            }
            weights.set(op.output, tensors);
        }
        // The limit is read from the live backend unless the caller pins one (tests do).
        const plan = planForDevice(manifest, {
            maxTextureSize: deviceTextureLimit(),
            ...options,
        });
        return new SalienceModel(manifest, weights, plan);
    }

    /**
     * Run one chunk through the network.
     *
     * @param {tf.Tensor4D} mag    HCQT magnitude,     [1, bins, frames, harmonics]
     * @param {tf.Tensor4D} dphase phase differentials, same shape
     * @returns {tf.Tensor3D} salience, [1, bins, frames], values in [0, 1]
     */
    predictChunk(mag, dphase) {
        return tf.tidy(() => {
            const tensors = new Map([
                [this.#inputNames[0], mag],
                [this.#inputNames[1], dphase],
            ]);

            for (const op of this.#manifest.ops) {
                const inputs = op.inputs.map((name) => {
                    const tensor = tensors.get(name);
                    if (!tensor) { throw new Error(`op '${op.output}' wants missing '${name}'`); }
                    return tensor;
                });
                tensors.set(op.output, this.#runOp(op, inputs));
            }

            const output = tensors.get(this.#outputName);
            if (!output) { throw new Error(`op list produced no '${this.#outputName}'`); }
            return output;
        });
    }

    #runOp(op, inputs) {
        switch (op.type) {
            case 'conv2d': {
                const { kernel, bias } = this.#weights.get(op.output);

                // planForDevice marks the ops whose im2col matrix would not fit this GPU's
                // textures -- on a 16384-limit GPU at 256 frames that is the 'distribution'
                // layer, whose (360, 1) kernel over 64 channels would otherwise fail with
                // "Requested texture size [23040x23040] greater than WebGL maximum".
                // splitHeightConv2d is an exact linear decomposition, not an approximation.
                const groupHeight = this.#plan.splits.get(op.output);
                if (groupHeight) {
                    return splitHeightConv2d(inputs[0], kernel, bias, groupHeight, op.activation);
                }

                if (op.activation === 'relu') {
                    // Fusing bias and ReLU into the convolution avoids materialising two extra
                    // full-size intermediates per layer, which matters: the largest is 23.6 MB.
                    return tf.fused.conv2d({
                        x: inputs[0], filter: kernel, strides: 1, pad: 'same',
                        bias, activation: 'relu',
                    });
                }
                // Only the final 1x1 'squishy' layer takes this path, so an unfused sigmoid costs
                // nothing measurable.
                const convolved = tf.conv2d(inputs[0], kernel, 1, 'same');
                return tf.sigmoid(tf.add(convolved, bias));
            }
            case 'batchnorm': {
                // Exported pre-collapsed to a single affine map; see tools/export_model.py.
                const { scale, offset } = this.#weights.get(op.output);
                return tf.add(tf.mul(inputs[0], scale), offset);
            }
            case 'concat':
                return tf.concat(inputs, op.axis);
            case 'squeeze':
                // This is the Lambda(K.squeeze) that tools/export_model.py drops from the graph.
                return tf.squeeze(inputs[0], [op.axis]);
            default:
                throw new Error(`unknown op type '${op.type}'`);
        }
    }

    /**
     * Run a full feature sequence through the network in chunks.
     *
     * Chunks overlap by half the time receptive field on each side and the overlap is discarded
     * afterwards, so the result is identical to processing the whole sequence at once. This is
     * strictly better than predict_on_audio.py, which slices at CHUNK_LEN=2000 with no overlap and
     * so leaves a zero-padding artefact at every boundary.
     *
     * @param {Float32Array} mag    [bins * frames * harmonics], bin-major
     * @param {Float32Array} dphase same layout
     * @param {number} frames
     * @param {(done: number, total: number) => void} [onProgress] called per chunk
     * @param {() => boolean} [isCancelled] polled per chunk; abort when it returns true
     * @returns {Promise<Float32Array|null>} salience [bins * frames], bin-major; null if cancelled
     */
    async predict(mag, dphase, frames, onProgress, isCancelled) {
        const bins = this.bins;
        const harmonics = this.harmonics;
        const context = Math.ceil((this.#manifest.time_receptive_field - 1) / 2);
        const stride = this.#plan.chunkFrames;
        const salience = new Float32Array(bins * frames);

        for (let start = 0; start < frames; start += stride) {
            if (isCancelled?.()) { return null; }

            const end = Math.min(frames, start + stride);
            // Widen by the receptive field so the interior of the chunk sees real context rather
            // than zero padding, then keep only [start, end) from the result.
            const from = Math.max(0, start - context);
            const to = Math.min(frames, end + context);
            const width = to - from;

            const magChunk = sliceFrames(mag, bins, frames, harmonics, from, to);
            const dphaseChunk = sliceFrames(dphase, bins, frames, harmonics, from, to);

            const magTensor = tf.tensor4d(magChunk, [1, bins, width, harmonics]);
            const dphaseTensor = tf.tensor4d(dphaseChunk, [1, bins, width, harmonics]);
            const output = this.predictChunk(magTensor, dphaseTensor);
            const chunk = await output.data();

            magTensor.dispose();
            dphaseTensor.dispose();
            output.dispose();

            for (let bin = 0; bin < bins; bin++) {
                const source = bin * width + (start - from);
                const target = bin * frames + start;
                for (let frame = 0; frame < end - start; frame++) {
                    salience[target + frame] = chunk[source + frame];
                }
            }

            onProgress?.(end, frames);
            // Yield so the worker can service cancellation messages between chunks; without this a
            // long analysis is uninterruptible.
            await Promise.resolve();
        }
        return salience;
    }

    dispose() {
        for (const tensors of this.#weights.values()) {
            for (const tensor of Object.values(tensors)) { tensor.dispose(); }
        }
        this.#weights.clear();
    }
}

/**
 * Extract frames [from, to) from a bin-major [bins][frames][harmonics] buffer.
 */
function sliceFrames(source, bins, frames, harmonics, from, to) {
    const width = to - from;
    const out = new Float32Array(bins * width * harmonics);
    for (let bin = 0; bin < bins; bin++) {
        const sourceOffset = (bin * frames + from) * harmonics;
        const targetOffset = bin * width * harmonics;
        out.set(source.subarray(sourceOffset, sourceOffset + width * harmonics), targetOffset);
    }
    return out;
}
