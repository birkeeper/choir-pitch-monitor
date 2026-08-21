// Adapting the model's execution to a particular GPU's texture limits.
//
// Kept separate from worker/model.js, and free of any TensorFlow.js import, for two reasons: the
// rule it encodes is arithmetic over the manifest rather than anything that needs a GPU, and
// tests/check-plan.mjs can therefore check it against every texture limit worth caring about
// instead of only the one in the machine running the tests.

import { CHUNK_FRAMES_OFFLINE, CHUNK_FRAMES_LIVE, TEXTURE_SAFETY, N_BINS } from '../constants.js';

/**
 * Decide the chunk width and per-op kernel splitting for a particular GPU.
 *
 * TF.js's WebGL conv2d rearranges its input into an im2col matrix of logical shape
 * [batch, sharedDim, numCols], where
 *
 *     sharedDim = kernelHeight * kernelWidth * inChannels
 *     numCols   = outHeight * outWidth          (here: 360 bins * chunk width in frames)
 *
 * and then has to store it in a 2D texture. When that shape does not fit the GPU's limits
 * directly, getTextureShapeFromLogicalShape falls back to a squarish layout, which for a packed
 * texture works out to a physical side of about
 *
 *     sqrt(sharedDim * numCols) / 2
 *
 * so the op is representable exactly when `sharedDim * numCols <= 4 * maxTextureSize^2`. Fitting
 * directly implies that same inequality, which makes it the single necessary and sufficient
 * condition. Without this, the 'distribution' layer's (360, 1) kernel over 64 channels asks for a
 * [23040x23040] texture at 256 frames and fails outright on a 16384-limit GPU.
 *
 * Both factors are adjustable: `numCols` shrinks with the chunk width, and `sharedDim` shrinks by
 * evaluating the convolution as a sum of height-wise kernel slices. Chunk width is preferred as
 * large as the mode allows, because each chunk recomputes and discards 2 * context frames, so
 * shrinking it wastes work across the whole run; splitting is applied per-op only where needed.
 *
 * @param {object} manifest the model manifest, needing `ops` and `time_receptive_field`
 * @param {object} [options]
 * @param {'offline'|'live'} [options.mode='offline'] latency/throughput preference
 * @param {number|null} [options.maxTextureSize=null] the GPU's limit; null means unconstrained
 * @returns {{chunkFrames:number, splits:Map<string,number>, maxTextureSize:number|null}}
 *   `splits` maps an op's output name to the number of kernel rows to evaluate per pass
 */
export function planForDevice(manifest, options = {}) {
    const { mode = 'offline', maxTextureSize = null } = options;

    const preferred = mode === 'live' ? CHUNK_FRAMES_LIVE : CHUNK_FRAMES_OFFLINE;
    const splits = new Map();
    if (!maxTextureSize) {
        return { chunkFrames: preferred, splits, maxTextureSize: null };
    }

    const convs = manifest.ops.filter((op) => op.type === 'conv2d');
    // Exports predating in_channels cannot have their reduction computed, and silently skipping
    // the check would reintroduce the very crash this exists to prevent.
    const missing = convs.filter((op) => !Number.isFinite(op.in_channels));
    if (missing.length) {
        throw new Error(`model manifest is missing in_channels on ${missing.length} conv op(s) `
            + `(e.g. '${missing[0].output}') -- re-run tools/export_model.py`);
    }

    const budget = 4 * maxTextureSize * maxTextureSize * TEXTURE_SAFETY;
    const context = Math.ceil((manifest.time_receptive_field - 1) / 2);

    let chunkFrames = preferred;
    for (;;) {
        // predict() widens each chunk by the receptive field before trimming, so the tensor the
        // GPU actually sees is wider than the chunk itself.
        const numCols = N_BINS * (chunkFrames + 2 * context);
        const maxSharedDim = Math.floor(budget / numCols);

        splits.clear();
        let feasible = true;
        for (const op of convs) {
            const [kernelHeight, kernelWidth] = op.kernel;
            const perRow = kernelWidth * op.in_channels;
            if (kernelHeight * perRow <= maxSharedDim) { continue; }

            const groupHeight = Math.floor(maxSharedDim / perRow);
            if (groupHeight < 1) {
                // Even one kernel row per pass is too wide: only a narrower chunk can help.
                feasible = false;
                break;
            }
            splits.set(op.output, groupHeight);
        }

        if (feasible) { break; }
        if (chunkFrames <= 8) {
            throw new Error(`this GPU reports WEBGL_MAX_TEXTURE_SIZE=${maxTextureSize}, which is `
                + 'too small to evaluate this model even eight frames at a time');
        }
        chunkFrames = Math.max(8, Math.floor(chunkFrames / 2));
    }

    return { chunkFrames, splits, maxTextureSize };
}
