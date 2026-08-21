// Runs the multi-F0 salience model from the tensorflowjs_converter output in
// model/exp3multif0_tfjs/.
//
// This is the app's model path. It replaces the hand-written op-list interpreter in
// worker/model.js, which is kept as a reference implementation and is still covered by
// tests/check-model.mjs (it remains the only path that works on GPUs with a small texture limit --
// see the note on feasibility below).
//
// Two facts about the converted graph shape everything here, both established by probing it rather
// than by reading names (tools/relax_graph_time_axis.py documents the graph's structure):
//
//   1. The time axis is frozen at 50 frames. Any other width is rejected outright:
//        "The shape of dict['inputs'] ... must be [1,360,50,5], but was [1,360,128,5]"
//      so every dispatch is exactly 50 frames wide and the analysis advances in smaller steps.
//
//   2. `inputs:0` is the HCQT magnitude and `inputs_1:0` is the phase differential. Confirmed
//      numerically -- feeding them the right way round correlates 0.997 with the Python salience,
//      the wrong way round 0.114. Swapping them yields plausible-looking output, not an error,
//      which is why the mapping is pinned here explicitly.

import * as tf from '../libraries/tfjs/tfjs.js';
import { deviceTextureLimit, estimateConvTexture } from './backend.js';
import { GRAPH_MODEL_URL, GRAPH_MODEL_FRAMES, N_BINS, TEXTURE_SAFETY } from '../constants.js';

// See fact (2) above. Names come from the converter, not from us.
const INPUT_MAG = 'inputs:0';
const INPUT_DPHASE = 'inputs_1:0';

// Time receptive field of the network: output frame t depends on input frames t-12 .. t+12.
// tools/export_model.py computes this from the kernel sizes and prints it (25 frames).
const RECEPTIVE_FIELD = 25;
const CONTEXT = Math.ceil((RECEPTIVE_FIELD - 1) / 2);   // 12

export class GraphSalienceModel {
    #model;
    #frames;        // the graph's frozen time width
    #harmonics;
    #maxTextureSize;

    constructor(model, frames, harmonics, maxTextureSize) {
        this.#model = model;
        this.#frames = frames;
        this.#harmonics = harmonics;
        this.#maxTextureSize = maxTextureSize;
    }

    get bins() { return N_BINS; }
    get harmonics() { return this.#harmonics; }
    /** Frames per dispatch, fixed by the converted graph. */
    get chunkFrames() { return this.#frames; }
    /** Frames of usable output per dispatch, after discarding the context margins. */
    get usableFrames() { return this.#frames - 2 * CONTEXT; }

    get plan() {
        return {
            chunkFrames: this.#frames,
            usableFrames: this.usableFrames,
            maxTextureSize: this.#maxTextureSize,
            // Kept in the same shape as the interpreter's plan so callers can display either.
            splits: {},
        };
    }

    /**
     * @param {string} [url] model.json to load
     * @param {object} [options]
     * @param {number|null} [options.maxTextureSize] override the detected GPU limit
     */
    static async load(url = GRAPH_MODEL_URL, options = {}) {
        const model = await tf.loadGraphModel(url);

        const input = model.inputs.find((tensor) => tensor.shape?.length === 4);
        if (!input) {
            throw new Error('graph model has no rank-4 input; is this the right model?');
        }
        const [, bins, frames, harmonics] = input.shape;
        if (bins !== N_BINS) {
            throw new Error(`graph model expects ${bins} frequency bins but the feature `
                + `extractor produces ${N_BINS}`);
        }
        // A relaxed model (see tools/relax_graph_time_axis.py) reports -1 here; fall back to the
        // configured width in that case.
        const width = frames > 0 ? frames : GRAPH_MODEL_FRAMES;

        const maxTextureSize = options.maxTextureSize !== undefined
            ? options.maxTextureSize
            : deviceTextureLimit();
        assertFeasible(model, width, maxTextureSize);

        return new GraphSalienceModel(model, width, harmonics, maxTextureSize);
    }

    /**
     * Run a full feature sequence through the network.
     *
     * Because the graph only accepts `chunkFrames` at a time, each dispatch covers a fixed window
     * and only its context-complete interior is kept. Consecutive windows therefore overlap by
     * 2 * CONTEXT frames, which costs roughly chunkFrames / usableFrames times the minimum work
     * (about 1.9x at 50 frames). Relaxing the graph's time axis removes most of that overhead.
     *
     * The first and last windows are deliberately not inset: at the true start and end of the
     * signal there is no further context to be had, and the network's own zero padding is exactly
     * what the reference implementation sees there too.
     *
     * @param {Float32Array} mag    [bins * frames * harmonics], bin-major
     * @param {Float32Array} dphase same layout
     * @param {number} frames
     * @param {(done:number,total:number)=>void} [onProgress]
     * @param {()=>boolean} [isCancelled]
     * @returns {Promise<Float32Array|null>} salience [bins * frames], bin-major; null if cancelled
     */
    async predict(mag, dphase, frames, onProgress, isCancelled) {
        const bins = N_BINS;
        const harmonics = this.#harmonics;
        const width = this.#frames;
        const step = this.usableFrames;
        const salience = new Float32Array(bins * frames);

        for (let start = 0; start < frames; start += step) {
            if (isCancelled?.()) { return null; }
            const end = Math.min(frames, start + step);

            // Place the fixed-width window so `start` sits CONTEXT frames in, clamping at both
            // ends of the signal. When the whole signal is shorter than the window, `from` is 0
            // and the tail is zero-padded, which is what the network's 'same' padding would do.
            let from = Math.max(0, start - CONTEXT);
            if (from + width > frames) { from = Math.max(0, frames - width); }

            const magChunk = sliceFrames(mag, bins, frames, harmonics, from, width);
            const dphaseChunk = sliceFrames(dphase, bins, frames, harmonics, from, width);

            const magTensor = tf.tensor4d(magChunk, [1, bins, width, harmonics]);
            const dphaseTensor = tf.tensor4d(dphaseChunk, [1, bins, width, harmonics]);
            let output;
            try {
                output = this.#model.execute({
                    [INPUT_MAG]: magTensor,
                    [INPUT_DPHASE]: dphaseTensor,
                });
                const chunk = await output.data();
                // output is [1, bins, width]: bin-major, so bin b starts at b * width.
                for (let bin = 0; bin < bins; bin++) {
                    const source = bin * width + (start - from);
                    const target = bin * frames + start;
                    for (let frame = 0; frame < end - start; frame++) {
                        salience[target + frame] = chunk[source + frame];
                    }
                }
            } finally {
                magTensor.dispose();
                dphaseTensor.dispose();
                output?.dispose();
            }

            onProgress?.(end, frames);
            // Yield so the worker can service cancellation between dispatches.
            await Promise.resolve();
        }
        return salience;
    }

    dispose() {
        this.#model.dispose();
    }
}

/**
 * Refuse to run if this GPU cannot represent the graph's convolutions at its frozen width.
 *
 * The graph's convolutions are TF.js's own, so the height-splitting trick worker/model.js uses is
 * not available here -- the only lever would be a narrower window, and the width is frozen. On a
 * GPU with a 16384 texture limit a 50-frame window is comfortable; on one limited to 8192 it is
 * not, and failing here with an explanation beats failing later inside a shader with
 * "Requested texture size [...] greater than WebGL maximum".
 *
 * The worst-case reduction is read from the model's own weight manifest rather than hard-coded, so
 * it stays correct if the architecture changes.
 */
function assertFeasible(model, width, maxTextureSize) {
    if (!maxTextureSize) { return; }

    let worstSharedDim = 0;
    let worstName = null;
    for (const [name, tensor] of Object.entries(model.weights ?? {})) {
        for (const entry of tensor) {
            const shape = entry.shape;
            // Conv kernels are [kernelHeight, kernelWidth, inChannels, outChannels]; the im2col
            // reduction is the product of all but the last.
            if (shape?.length !== 4) { continue; }
            const sharedDim = shape[0] * shape[1] * shape[2];
            if (sharedDim > worstSharedDim) {
                worstSharedDim = sharedDim;
                worstName = name;
            }
        }
    }
    if (!worstSharedDim) { return; }

    const numCols = N_BINS * width;
    const needed = estimateConvTexture(worstSharedDim, numCols);
    const budget = maxTextureSize * Math.sqrt(TEXTURE_SAFETY);
    if (needed > budget) {
        throw new Error(
            `this GPU reports WEBGL_MAX_TEXTURE_SIZE=${maxTextureSize}, but the converted graph `
            + `needs about ${Math.ceil(needed)} for '${worstName}' at its frozen width of ${width} `
            + `frames (reduction ${worstSharedDim} x ${numCols} columns). The graph's convolutions `
            + 'cannot be split, so either re-export it with a narrower time axis or use the '
            + 'op-list interpreter in worker/model.js, which splits tall kernels to fit.');
    }
}

/** Extract `width` frames starting at `from` from a bin-major buffer, zero-padding past the end. */
function sliceFrames(source, bins, frames, harmonics, from, width) {
    const out = new Float32Array(bins * width * harmonics);
    const available = Math.min(width, frames - from);
    for (let bin = 0; bin < bins; bin++) {
        const sourceOffset = (bin * frames + from) * harmonics;
        out.set(source.subarray(sourceOffset, sourceOffset + available * harmonics),
            bin * width * harmonics);
    }
    return out;
}
