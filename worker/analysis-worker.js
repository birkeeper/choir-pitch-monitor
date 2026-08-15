// Analysis worker: mono 22050 Hz samples in, salience map out.
//
// Everything expensive lives here so the page stays responsive. The worker deliberately stops at
// the salience map rather than returning finished notes: peak picking is cheap, and keeping it on
// the main thread means the threshold, the tuning band and sub-bin refinement can be changed and
// re-exported instantly, without touching the GPU again. That matters because inference is by far
// the slowest stage (see PLAN.md section 2.1).

import { HcqtExtractor } from './hcqt.js';
import { SalienceModel, selectBackend } from './model.js';
import { MODEL_URL, SAMPLE_RATE } from '../constants.js';

let extractor = null;
let model = null;
let backend = null;
let cancelled = false;

async function ensureLoaded() {
    if (extractor && model) { return; }
    post({ type: 'STATUS', message: 'Loading model and filter bank...' });
    backend = await selectBackend();
    // Both are static assets; fetching them concurrently saves a round trip on a cold cache.
    [extractor, model] = await Promise.all([
        HcqtExtractor.load(MODEL_URL),
        SalienceModel.load(MODEL_URL),
    ]);
    post({
        type: 'READY',
        backend,
        source: model.source,
        defaultThreshold: model.defaultThreshold,
        maxWindow: extractor.maxWindow,
        maxWindowSeconds: extractor.maxWindow / SAMPLE_RATE,
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

            const featureStart = performance.now();
            const features = await extractor.extract(
                samples,
                (done, total) => post({ type: 'PROGRESS', stage: 'features', done, total }),
                () => cancelled,
            );
            if (!features) { post({ type: 'CANCELLED' }); return; }
            const featureSeconds = (performance.now() - featureStart) / 1000;

            const inferenceStart = performance.now();
            const salience = await model.predict(
                features.mag, features.dphase, features.frames,
                (done, total) => post({ type: 'PROGRESS', stage: 'inference', done, total }),
                () => cancelled,
            );
            if (!salience) { post({ type: 'CANCELLED' }); return; }
            const inferenceSeconds = (performance.now() - inferenceStart) / 1000;

            const audioSeconds = samples.length / SAMPLE_RATE;
            post({
                type: 'RESULT',
                salience: salience.buffer,
                frames: features.frames,
                audioSeconds,
                backend,
                timing: {
                    features: featureSeconds,
                    inference: inferenceSeconds,
                    total: featureSeconds + inferenceSeconds,
                    featureRealTimeFactor: audioSeconds / featureSeconds,
                    inferenceRealTimeFactor: audioSeconds / inferenceSeconds,
                    realTimeFactor: audioSeconds / (featureSeconds + inferenceSeconds),
                },
            }, [salience.buffer]);
        } catch (error) {
            post({ type: 'ERROR', message: error.message, stack: error.stack });
        }
    }
};
