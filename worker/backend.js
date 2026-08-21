// TensorFlow.js backend selection and the GPU limits that constrain how the model can be run.
//
// Shared by both model runners (worker/graph-model.js, worker/model.js) so neither has to depend on
// the other.

import * as tf from '../libraries/tfjs/tfjs.js';

// TF.js's WebGL backend computes this model INCORRECTLY with its default settings on at least some
// GPUs -- measured on Intel UHD (Comet Lake GT2) via Mesa/ANGLE, where the salience map came back
// squashed into [0.0001, 0.0239] instead of reaching 0.99, giving zero detections. Not a precision
// fallback: WEBGL_RENDER_FLOAT32_ENABLED was true. The fault is in the packed im2col convolution
// path (conv2dWithIm2Row), and it was proved to be TF.js's rather than ours by two independent
// implementations -- the converted graph and the op-list interpreter in worker/model.js --
// producing bit-identical wrong output.
//
// TF.js chooses among four convolution paths (kernels/Conv2D.js), in this order:
//
//   1x1, stride 1        -> conv2dByMatMul       packed matmul, flags irrelevant
//   WEBGL_EXP_CONV       -> Conv2DPackedProgram  packed direct conv, no im2col
//   WEBGL_CONV_IM2COL    -> conv2dWithIm2Row     packed im2col + matmul   <-- the broken one
//   (else)               -> Conv2DProgram        UNPACKED direct conv
//
// so both flags below are set: EXP_CONV diverts every convolution in this model (all stride 1,
// channels-last) to the packed direct path before im2col is consulted, and CONV_IM2COL=false
// ensures anything that somehow falls through lands on the correct unpacked path rather than the
// broken one.
//
// Measured over 172 frames, against a reference of max 0.990554 and 466 peaks:
//
//   defaults                       max 0.023851    0 peaks    ~47 ms/frame   WRONG
//   CONV_IM2COL=false              max 0.990554  466 peaks    188 ms/frame   correct, slow
//   EXP_CONV=true                  max 0.990554  466 peaks     54 ms/frame   correct
//
// The unpacked fallback is 3.5x slower for a structural reason worth recording: Conv2DProgram has
// no packedInputs/packedOutput, so it moves one float per RGBA texel instead of four, and it
// recomputes each output's entire receptive window independently instead of reusing loaded values
// across outputs the way a tiled matmul does. This model is punished unusually hard by that --
// harm1/harm2 have 70x3 kernels over 32 channels (6720 taps per output) and `distribution` is
// 360x1 over 64 channels (23040 taps).
//
// EXP_CONV also removes the reason the model needed adapting to the GPU's texture limit at all:
// with no [sharedDim x numCols] matrix, the "Requested texture size [23040x23040] greater than
// WebGL maximum" failure cannot arise either (see worker/device-plan.js).
//
// Keeping im2col and merely shrinking the convolutions does NOT recover correctness -- tested and
// rejected, so there is no threshold to steer by:
//
//   sharedDim 23040, numCols  20160  ->  45 peaks   WRONG
//   sharedDim 15872, numCols  20160  ->  84 peaks   WRONG   (both dims under 16384)
//   sharedDim  1536, numCols 100800  -> 466 peaks   correct but slow
//   sharedDim  8512, numCols   8640  -> correct     (the small synthetic fixture)
//
// WEBGL_PACK=false also cures the wrong output, but is not usable: an unpacked im2col matrix loses
// packing's 2x texture headroom and fails outright ("Requested texture size [20365x20365]").
//
// Must be set before the WebGL backend initialises, hence module scope rather than inside
// selectBackend. tests/test-backend-parity.html is the regression guard: it compares every backend
// against CPU on real features, which is the only thing that catches this class of bug -- a small
// synthetic fixture does not trigger it.
tf.env().set('WEBGL_EXP_CONV', true);
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
