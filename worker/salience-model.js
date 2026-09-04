// Runs the NMP salience model (Bittner et al. 2022 / Basic Pitch) from the tensorflowjs_converter
// output in model/nmp_salience_tfjs/.
//
// The whole front end is inside the graph -- its nodes include a `cqt2010v2` block and a
// `harmonic_stacking` block -- so this module feeds it raw mono audio at 22050 Hz and gets the Yp
// multipitch posteriorgram straight back. There is no feature extraction on our side at all.
//
// The graph is fixed-size in both directions:
//
//   input   audio       [1, 43844, 1]     two seconds of mono audio, less one hop
//   output  output_0    [1, 172, 264]     frames x frequency bins, sigmoid, in [0, 1]
//
// so audio is processed in fixed windows and the results stitched together. Consecutive windows
// overlap by 2 * WINDOW_TRIM_FRAMES and the overlap is discarded, because frames near a window edge
// have not seen their full context: the Yp convolution stack spans 15 frames in time, and the CQT
// inside the graph reaches back much further still at low frequencies.

import * as tf from '../libraries/tfjs/tfjs.js';
import {
    MODEL_URL, AUDIO_WINDOW_SAMPLES, WINDOW_FRAMES, WINDOW_TRIM_FRAMES,
    HOP_LENGTH, N_BINS,
} from '../constants.js';

const INPUT_NAME = 'audio';

export class SalienceModel {
    #model;
    #windowSamples;
    #windowFrames;
    #bins;

    constructor(model, windowSamples, windowFrames, bins) {
        this.#model = model;
        this.#windowSamples = windowSamples;
        this.#windowFrames = windowFrames;
        this.#bins = bins;
    }

    /** Frequency bins in the salience output (264). */
    get bins() { return this.#bins; }
    /** Audio samples consumed per dispatch. */
    get windowSamples() { return this.#windowSamples; }
    /** Frames produced per dispatch, before trimming. */
    get windowFrames() { return this.#windowFrames; }
    /** Frames of usable output per dispatch, after discarding both context margins. */
    get usableFrames() { return this.#windowFrames - 2 * WINDOW_TRIM_FRAMES; }

    /** How the model is being run, for display and diagnostics. */
    get plan() {
        return {
            windowSamples: this.#windowSamples,
            windowFrames: this.#windowFrames,
            usableFrames: this.usableFrames,
            trimFrames: WINDOW_TRIM_FRAMES,
            bins: this.#bins,
        };
    }

    static async load(url = MODEL_URL) {
        const model = await tf.loadGraphModel(url);

        // Read the real shapes out of the graph rather than trusting the constants, and fail loudly
        // if they disagree: a mismatch here would otherwise surface as a silently misaligned or
        // mis-tuned salience map rather than as an error.
        const input = model.inputs.find((tensor) => tensor.shape?.length === 3);
        if (!input) {
            throw new Error('salience model has no rank-3 audio input; is this the right model?');
        }
        const [, windowSamples] = input.shape;
        if (windowSamples > 0 && windowSamples !== AUDIO_WINDOW_SAMPLES) {
            throw new Error(`model expects ${windowSamples} audio samples per window but `
                + `constants.js says ${AUDIO_WINDOW_SAMPLES}`);
        }

        const output = model.outputs.find((tensor) => tensor.shape?.length === 3);
        const [, windowFrames, bins] = output?.shape ?? [];
        if (bins > 0 && bins !== N_BINS) {
            throw new Error(`model produces ${bins} frequency bins but constants.js says ${N_BINS}; `
                + 'the cents grid would be wrong');
        }
        if (windowFrames > 0 && windowFrames !== WINDOW_FRAMES) {
            throw new Error(`model produces ${windowFrames} frames per window but constants.js `
                + `says ${WINDOW_FRAMES}`);
        }

        return new SalienceModel(
            model,
            windowSamples > 0 ? windowSamples : AUDIO_WINDOW_SAMPLES,
            windowFrames > 0 ? windowFrames : WINDOW_FRAMES,
            bins > 0 ? bins : N_BINS,
        );
    }

    /**
     * Number of salience frames produced for a signal of `samples` length.
     *
     * One frame per hop, matching the model's own framing so that frame f corresponds to audio
     * sample f * HOP_LENGTH.
     */
    static frameCount(samples) {
        return Math.max(0, Math.ceil(samples / HOP_LENGTH));
    }

    /**
     * Analyse a whole signal.
     *
     * @param {Float32Array} samples mono, 22050 Hz
     * @param {(done:number,total:number)=>void} [onProgress]
     * @param {()=>boolean} [isCancelled] polled per window
     * @returns {Promise<{salience:Float32Array,frames:number}|null>}
     *   salience is [bins * frames], bin-major -- the layout worker/notes.js consumes. Null if
     *   cancelled.
     */
    async analyse(samples, onProgress, isCancelled) {
        const bins = this.#bins;
        const windowFrames = this.#windowFrames;
        const windowSamples = this.#windowSamples;
        const trim = WINDOW_TRIM_FRAMES;
        const step = this.usableFrames;

        const frames = SalienceModel.frameCount(samples.length);
        const salience = new Float32Array(bins * frames);

        for (let start = 0; start < frames; start += step) {
            if (isCancelled?.()) { return null; }
            const end = Math.min(frames, start + step);

            // Place the window so `start` sits `trim` frames in, giving it real context on the
            // left. Clamped at the beginning of the signal, where no earlier audio exists and the
            // model's own zero padding is all there is -- the same situation it would face
            // analysing the file from its first sample.
            const firstFrame = Math.max(0, start - trim);
            const from = firstFrame * HOP_LENGTH;

            const window = new Float32Array(windowSamples);
            const available = Math.max(0, Math.min(windowSamples, samples.length - from));
            if (available > 0) {
                window.set(samples.subarray(from, from + available));
            }

            const input = tf.tensor3d(window, [1, windowSamples, 1]);
            let output;
            try {
                output = this.#model.execute({ [INPUT_NAME]: input });
                const values = await output.data();
                // output is [1, frames, bins]: frame-major. Transpose into the bin-major layout
                // worker/notes.js expects while copying only the context-complete span.
                const offset = start - firstFrame;
                const count = end - start;
                for (let frame = 0; frame < count; frame++) {
                    const sourceRow = (offset + frame) * bins;
                    if (offset + frame >= windowFrames) { break; }
                    for (let bin = 0; bin < bins; bin++) {
                        salience[bin * frames + start + frame] = values[sourceRow + bin];
                    }
                }
            } finally {
                input.dispose();
                output?.dispose();
            }

            onProgress?.(end, frames);
            // Yield so the worker can service cancellation between windows.
            await Promise.resolve();
        }

        return { salience, frames };
    }

    dispose() {
        this.#model.dispose();
    }
}
