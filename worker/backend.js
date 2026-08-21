// TensorFlow.js backend selection and the GPU limits that constrain how the model can be run.
//
// Shared by both model runners (worker/graph-model.js, worker/model.js) so neither has to depend on
// the other.

import * as tf from '../libraries/tfjs/tfjs.js';

// TF.js's WebGL backend computes this model INCORRECTLY with its default settings on at least some
// GPUs -- measured on Intel UHD (Comet Lake GT2) via Mesa/ANGLE, where the salience map came back
// squashed into [0.0001, 0.0239] instead of reaching 0.99. Not a precision fallback:
// WEBGL_RENDER_FLOAT32_ENABLED was true. The fault is in the packed im2col convolution path, and
// disabling it reproduces the CPU backend's output to six decimal places:
//
//   defaults                    max 0.023851   WRONG
//   WEBGL_CONV_IM2COL=false     max 0.966290   correct (CPU: 0.966290)
//   WEBGL_PACK=false            max 0.966290   correct
//
// CONV_IM2COL is the narrower of the two fixes -- it leaves packing enabled for every other op,
// and WEBGL_PACK=false is not independently usable anyway, since an unpacked im2col matrix loses
// packing's 2x texture headroom and fails outright ("Requested texture size [20365x20365]"). It
// also removes the reason the model needed adapting to the GPU's texture limit at all: without
// im2col there is no [sharedDim x numCols] matrix, so the "Requested texture size [23040x23040]"
// failure cannot arise either (see worker/device-plan.js).
//
// The cost is real: about 131 ms per frame here versus ~19 ms on the (wrong) im2col path, i.e.
// 0.09x real-time. Keeping im2col and merely shrinking the convolutions does NOT recover
// correctness -- that was tested and rejected:
//
//   sharedDim 23040, numCols  20160  ->  45 peaks   WRONG
//   sharedDim 15872, numCols  20160  ->  84 peaks   WRONG   (both dims under 16384)
//   sharedDim  1536, numCols 100800  -> 466 peaks   correct, but only 74 ms/frame
//   sharedDim  8512, numCols   8640  -> correct     (the small synthetic fixture)
//
// so there is no clean threshold to steer by, and no configuration of the im2col path that is both
// correct and fast. WebGPU does not use this code path at all and is the preferred backend for that
// reason as well as for speed.
//
// Must be set before the WebGL backend initialises, hence module scope rather than inside
// selectBackend. tests/test-backend-parity.html is the regression guard: it compares WebGL against
// CPU on real features, which is the only thing that catches this class of bug -- a small
// synthetic fixture does not trigger it.
tf.env().set('WEBGL_CONV_IM2COL', false);

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
            console.warn(`backend '${backend}' unavailable:`, error.message);
        }
    }
    throw new Error(`no usable TensorFlow.js backend (tried ${preference.join(', ')})`);
}

/**
 * The GPU's real maximum texture dimension, or null when the constraint does not apply.
 *
 * Only WebGL is constrained here. Its conv2d builds an im2col matrix and stores it as a 2D
 * texture, so a large enough convolution simply cannot be expressed. WebGPU and the CPU backend do
 * not use that representation and are left unconstrained; if a WebGPU buffer limit turns out to
 * bite in practice it needs its own measurement, not a guess borrowed from WebGL.
 */
export function deviceTextureLimit(backend = tf.getBackend()) {
    if (backend !== 'webgl') { return null; }
    const limit = tf.env().getNumber('WEBGL_MAX_TEXTURE_SIZE');
    return Number.isFinite(limit) && limit > 0 ? limit : null;
}

/**
 * Largest physical texture dimension TF.js will request for a conv2d, in texels.
 *
 * TF.js's WebGL conv2d rearranges its input into an im2col matrix of logical shape
 * [batch, sharedDim, numCols] and stores it in a packed 2D texture. When that does not fit
 * directly, getTextureShapeFromLogicalShape falls back to a squarish layout, giving a physical
 * side of about sqrt(sharedDim * numCols) / 2. Fitting directly implies the same bound, so this is
 * the single quantity to compare against the GPU's limit.
 *
 * @param {number} sharedDim kernelHeight * kernelWidth * inChannels
 * @param {number} numCols   outHeight * outWidth
 */
export function estimateConvTexture(sharedDim, numCols) {
    return Math.sqrt(sharedDim * numCols) / 2;
}
