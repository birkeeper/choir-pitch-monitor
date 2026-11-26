// Sweep the salience threshold (tau_n, DEFAULT_THRESHOLD in constants.js) over one recording and
// show what it does to the detections and to the ensemble drift and spread.
//
//   node tests/threshold-sweep.mjs <recording.wav> [key] [threshold ...]
//
// The recording must be 16-bit PCM mono at 22050 Hz (the model's rate; nothing is resampled). key is
// one of KEY_SIGNATURES, default '3b'; thresholds default to 0.10 .. 0.50. Run it again whenever the
// model in MODEL_URL changes: thresholds do not carry over between models.
//
// It runs the app's own code -- worker/salience-model.js, worker/notes.js and worker/ensemble.js --
// on TF.js's CPU backend, so expect a few minutes for a full song. The model runs once; every
// threshold reuses its salience map. Per threshold it prints:
//
//   peaks/frame   detections per frame
//   voiced        frames with at least one detection
//   >max          frames with more than MAX_FRAME_PITCHES detections (the tracker drops the rest)
//   no fit        fits without a drift: the short window held fewer than KEY_FIT_MIN_DETECTIONS_PER_FRAME x its frames tracked samples, or no real peak
//   drift         key drift (cents) a quarter, half and three quarters in, and at the end
//   spread        median of the spread (cents)

import { readFileSync } from 'node:fs';

// The bundled TF.js takes Node for Node and then fails on its stubbed `util` module. Posing as a
// browser makes it use the platform's own fetch and TextEncoder, which Node has; the model itself
// is handed over from disk below, so nothing is fetched.
globalThis.window ??= globalThis;
globalThis.document ??= {};

const tf = await import('../libraries/tfjs/tfjs.js');
const {
    MODEL_URL, SAMPLE_RATE, DEFAULT_REFINE, MAX_FRAME_PITCHES,
    KEY_FIT_LONG_SECONDS, KEY_FIT_SMOOTHNESS_DEFAULT,
} = await import('../constants.js');
const { SalienceModel } = await import('../worker/salience-model.js');
const { extractPeaks } = await import('../worker/notes.js');
const { trackEnsemble } = await import('../worker/ensemble-pipeline.js');

const [file, key = '3b', ...rest] = process.argv.slice(2);
if (!file) {
    console.error('usage: node tests/threshold-sweep.mjs <recording.wav> [key] [threshold ...]');
    process.exit(1);
}
const thresholds = rest.length
    ? rest.map(Number)
    : [0.10, 0.13, 0.15, 0.17, 0.20, 0.25, 0.30, 0.40, 0.50];

/** 16-bit PCM mono WAV at SAMPLE_RATE, as floats in [-1, 1). */
function readWav(path) {
    const bytes = readFileSync(path);
    let format;
    let data;
    for (let at = 12; at + 8 <= bytes.length;) {
        const id = bytes.toString('ascii', at, at + 4);
        const size = bytes.readUInt32LE(at + 4);
        if (id === 'fmt ') {
            format = {
                tag: bytes.readUInt16LE(at + 8),
                channels: bytes.readUInt16LE(at + 10),
                rate: bytes.readUInt32LE(at + 12),
                bits: bytes.readUInt16LE(at + 22),
            };
        } else if (id === 'data') {
            data = bytes.subarray(at + 8, at + 8 + size);
        }
        at += 8 + size + (size & 1);
    }
    if (!format || !data || format.tag !== 1 || format.channels !== 1
        || format.rate !== SAMPLE_RATE || format.bits !== 16) {
        throw new Error(`${path}: need 16-bit PCM mono at ${SAMPLE_RATE} Hz, got `
            + JSON.stringify(format));
    }
    const samples = new Float32Array(data.length >> 1);
    for (let i = 0; i < samples.length; i++) { samples[i] = data.readInt16LE(2 * i) / 32768; }
    return samples;
}

/** The model at MODEL_URL, read from disk as an in-memory IO handler. */
function modelHandler() {
    const json = JSON.parse(readFileSync(new URL(MODEL_URL), 'utf8'));
    const weights = Buffer.concat(json.weightsManifest
        .flatMap((group) => group.paths)
        .map((name) => readFileSync(new URL(name, MODEL_URL))));
    return {
        load: async () => ({
            modelTopology: json.modelTopology,
            format: json.format,
            generatedBy: json.generatedBy,
            convertedBy: json.convertedBy,
            signature: json.signature,
            userDefinedMetadata: json.userDefinedMetadata,
            modelInitializer: json.modelInitializer,
            weightSpecs: json.weightsManifest.flatMap((group) => group.weights),
            weightData: weights.buffer.slice(weights.byteOffset,
                weights.byteOffset + weights.byteLength),
        }),
    };
}

function median(values) {
    const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
    return sorted.length ? sorted[sorted.length >> 1] : NaN;
}

const cell = (value, width, digits = 1) =>
    (Number.isFinite(value) ? value.toFixed(digits) : 'NaN').padStart(width);

await tf.setBackend('cpu');
const samples = readWav(file);
const model = await SalienceModel.load(modelHandler());
console.error(`${file}: ${(samples.length / SAMPLE_RATE).toFixed(1)} s, running the model ...`);
const started = Date.now();
const { salience, frames } = await model.analyse(samples);
console.error(`model done in ${((Date.now() - started) / 1000).toFixed(0)} s, ${frames} frames`);

console.log(`key ${key}, windows ${KEY_FIT_LONG_SECONDS} s and ${KEY_FIT_SMOOTHNESS_DEFAULT} s, `
    + `model ${new URL(MODEL_URL).pathname}`);
console.log(' tau   peaks/frame  voiced   >max  no fit   drift 25%   50%   75%   end   spread');
for (const threshold of thresholds) {
    const peaks = extractPeaks(salience, frames, { threshold, refine: DEFAULT_REFINE });

    // The app's own pipeline: pitch tracks, then the ensemble tracker on their unmasked samples.
    const tracked = trackEnsemble(peaks, frames, { key });
    const fits = tracked.time.map((_, k) => ({ keyDrift: tracked.keyDrift[k], spread: tracked.spread[k] }));
    let voiced = 0;
    let crowded = 0;
    for (let frame = 0, i = 0; frame < frames; frame++) {
        const first = i;
        while (i < peaks.count && peaks.frame[i] === frame) { i++; }
        if (i > first) { voiced++; }
        if (i - first > MAX_FRAME_PITCHES) { crowded++; }
    }

    // The drift as the chart shows it: a skipped fit (NaN) holds the previous one.
    let held = NaN;
    const drift = fits.map((fit) => (Number.isFinite(fit.keyDrift) ? (held = fit.keyDrift) : held));
    const at = (fraction) => drift[Math.min(drift.length - 1, Math.floor(fraction * drift.length))];
    const skipped = fits.filter((fit) => !Number.isFinite(fit.keyDrift)).length;

    console.log([
        cell(threshold, 4, 2),
        cell(peaks.count / frames, 13, 2),
        cell((100 * voiced) / frames, 6, 0) + '%',
        cell((100 * crowded) / frames, 5, 1) + '%',
        cell((100 * skipped) / fits.length, 6, 0) + '%',
        cell(at(0.25), 11, 0),
        cell(at(0.5), 5, 0),
        cell(at(0.75), 5, 0),
        cell(drift[drift.length - 1], 5, 0),
        cell(median(fits.map((fit) => fit.spread)), 8),
    ].join(' '));
}
model.dispose();
