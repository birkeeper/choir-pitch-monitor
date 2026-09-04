// Analysis worker: mono 22050 Hz samples in, salience map out.
//
// The NMP model computes its own CQT and harmonic stacking internally, so there is no feature
// extraction stage here -- the worker hands raw audio to the model and nothing else.
//
// It deliberately stops at the salience map rather than returning finished notes: peak picking is
// cheap, and keeping it on the main thread means the threshold, the tuning band and sub-bin
// refinement can be changed and re-exported instantly, without touching the GPU again.

import { SalienceModel } from './salience-model.js';
import { selectBackend } from './backend.js';
import { SAMPLE_RATE, DEFAULT_THRESHOLD } from '../constants.js';

let model = null;
let backend = null;
let cancelled = false;

async function ensureLoaded() {
    if (model) { return; }
    post({ type: 'STATUS', message: 'Loading model...' });
    backend = await selectBackend();
    model = await SalienceModel.load();
    post({
        type: 'READY',
        backend,
        source: {
            architecture: 'NMP salience (Bittner et al. 2022)',
            weights: 'model/nmp_salience_tfjs/',
        },
        defaultThreshold: DEFAULT_THRESHOLD,
        plan: model.plan,
    });
}

function post(message, transfer) {
    self.postMessage(message, transfer || []);
}

self.onmessage = async (event) => {
    const { type } = event.data;

    if (type === 'CANCEL') {
        cancelled = true;
        return;
    }

    if (type === 'ANALYSE') {
        cancelled = false;
        const samples = new Float32Array(event.data.samples);
        try {
            await ensureLoaded();

            const started = performance.now();
            const result = await model.analyse(
                samples,
                (done, total) => post({ type: 'PROGRESS', stage: 'inference', done, total }),
                () => cancelled,
            );
            if (!result) { post({ type: 'CANCELLED' }); return; }
            const seconds = (performance.now() - started) / 1000;

            const audioSeconds = samples.length / SAMPLE_RATE;
            post({
                type: 'RESULT',
                salience: result.salience.buffer,
                frames: result.frames,
                audioSeconds,
                backend,
                timing: {
                    inference: seconds,
                    total: seconds,
                    realTimeFactor: audioSeconds / seconds,
                },
            }, [result.salience.buffer]);
        } catch (error) {
            post({ type: 'ERROR', message: error.message, stack: error.stack });
        }
    }
};
