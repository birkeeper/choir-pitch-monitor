// TensorFlow.js backend selection.

import * as tf from '../libraries/tfjs/tfjs.js';

// Preference order. WebGPU first where available, then WebGL; CPU is a correctness fallback and is
// far too slow to be practical for anything but short excerpts.
const BACKEND_PREFERENCE = ['webgpu', 'webgl', 'cpu'];

// TF.js's WebGL backend has been observed on this project's development GPU (Intel UHD Comet Lake
// GT2, Mesa/ANGLE) to compute *large* convolutions incorrectly through its packed im2col path --
// silently, with no error and with float32 rendering enabled. The workaround is
// `tf.env().set('WEBGL_EXP_CONV', true)`, which routes convolutions through a packed direct
// convolution instead.
//
// It is deliberately NOT applied here. The problem was only ever reproduced with convolutions whose
// im2col reduction (kernelHeight * kernelWidth * inChannels) ran into the tens of thousands; the
// largest in this model is 936, an order of magnitude below anything that misbehaved. Setting an
// experimental flag to guard against a fault this model has not been shown to have would trade a
// known-good default for a less-tested path.
//
// tests/test-backend-parity.html is what settles it: it runs the same audio through every available
// backend and compares them against CPU. Run it after any change of model, GPU or TF.js version --
// this class of bug produces plausible-looking output, not a crash.

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

/** The GPU's maximum texture dimension under WebGL, or null on other backends. Diagnostic only. */
export function deviceTextureLimit(backend = tf.getBackend()) {
    if (backend !== 'webgl') { return null; }
    const limit = tf.env().getNumber('WEBGL_MAX_TEXTURE_SIZE');
    return Number.isFinite(limit) && limit > 0 ? limit : null;
}
