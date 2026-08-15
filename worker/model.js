// Runs the exported Cuesta multi-F0 salience model on TensorFlow.js.
//
// The model is not a TF.js layers or graph model. tools/export_model.py emits an ordered op list
// (model/manifest.json) plus a flat float32 blob (model/weights.bin), and this file interprets it.
// See that script for why the converter route is not used.
//
// Tensor layout throughout is NHWC with H = frequency bin and W = time frame, which is exactly the
// layout predict_on_audio.py feeds the Keras model: (batch, 360, frames, 5).

import * as tf from '../libraries/tfjs/tfjs.js';
import { INFERENCE_CHUNK_FRAMES } from '../constants.js';

// Preference order. WebGPU is the only backend that makes this model comfortably usable; WebGL is
// workable; CPU is a correctness fallback and will be extremely slow. See PLAN.md section 2.1.
const BACKEND_PREFERENCE = ['webgpu', 'webgl', 'cpu'];

/**
 * Select the fastest available backend.
 * @param {string[]} [preference] override the default preference order
 * @returns {Promise<string>} the backend actually activated
 */
export async function selectBackend(preference = BACKEND_PREFERENCE) {
    for (const backend of preference) {
        try {
            if (await tf.setBackend(backend)) {
                await tf.ready();
                return backend;
            }
        } catch (error) {
            // A backend can fail at registration (no WebGPU adapter, WebGL context refused). Fall
            // through to the next one rather than failing the whole analysis.
            console.warn(`model: backend '${backend}' unavailable:`, error.message);
        }
    }
    throw new Error(`no usable TensorFlow.js backend (tried ${preference.join(', ')})`);
}

export class SalienceModel {
    #manifest;
    #weights;   // op output name -> {name: tf.Tensor}
    #inputNames;
    #outputName;

    constructor(manifest, weights) {
        this.#manifest = manifest;
        this.#weights = weights;
        this.#inputNames = manifest.input.tensors;
        this.#outputName = manifest.output.tensor;
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
     * @param {string} baseUrl directory containing manifest.json and the weight blob
     */
    static async load(baseUrl) {
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
        return new SalienceModel(manifest, weights);
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
        const stride = INFERENCE_CHUNK_FRAMES;
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
