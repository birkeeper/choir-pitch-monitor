// App shell: load a recording, run the analysis worker, export CSV.
//
// This is the first milestone from PLAN.md section 9 -- deliberately without pitch visualisation.
// The point is to get trustworthy numbers out of the pipeline and into a file that can be compared
// against predict_on_audio.py and inspected on real rehearsal recordings. The piano roll and the
// live meters come once the numbers are trusted.

import { AudioSource } from './js/audio-source.js';
import { extractPeaks, ensembleDrift, peaksToCsv, peaksToMultif0Csv } from './worker/notes.js';
import {
    SAMPLE_RATE, FRAME_RATE, CENTS_PER_BIN, N_BINS, REFERENCE_A4,
} from './constants.js';

const VERSION = 'v0.1';

const elements = {
    version: document.getElementById('version'),
    alerts: document.getElementById('alertPlaceholder'),
    input: document.getElementById('audio_input'),
    inputLabel: document.getElementById('audio_input-label'),
    cancel: document.getElementById('cancel'),
    message: document.getElementById('message'),
    progressBar: document.getElementById('progressBar'),
    progressLabel: document.getElementById('progressLabel'),
    audio: document.getElementById('audioElement'),
    summary: document.getElementById('summary'),
    downloadDetail: document.getElementById('downloadDetail'),
    downloadMultif0: document.getElementById('downloadMultif0'),
    threshold: document.getElementById('threshold'),
    bandLower: document.getElementById('bandLower'),
    bandUpper: document.getElementById('bandUpper'),
    driftWindow: document.getElementById('driftWindow'),
    refine: document.getElementById('refine'),
    relativeToDrift: document.getElementById('relativeToDrift'),
};

elements.version.textContent = VERSION;

/** Everything about the recording currently loaded. Null until one is analysed. */
let session = null;
/** How the model was adapted to this machine's GPU; reported by the worker on READY. */
let device = null;
let worker = null;
let analysing = false;

/**
 * Describe how the model had to be adapted to this GPU.
 *
 * Worth showing rather than hiding: the chunk width and the kernel splitting both come from the
 * GPU's reported texture limit, both affect throughput, and both differ between machines -- so a
 * timing figure is not comparable across machines without them.
 */
function describePlan(backend, plan) {
    if (!plan) { return ''; }
    const parts = [`chunk ${plan.chunkFrames} frames`];
    if (plan.maxTextureSize) {
        parts.push(`max texture ${plan.maxTextureSize}`);
    }
    const splits = Object.entries(plan.splits ?? {});
    parts.push(splits.length
        ? `${splits.length} layer(s) split to fit: `
            + splits.map(([name, rows]) => `${name}/${rows}`).join(', ')
        : 'no layers split');
    return `Device plan (${backend}): ${parts.join(', ')}`;
}

function alertUser(message, variant = 'danger') {
    const wrapper = document.createElement('div');
    wrapper.className = `alert alert-${variant} alert-dismissible fade show py-2`;
    wrapper.setAttribute('role', 'alert');
    wrapper.textContent = message;
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'btn-close';
    close.setAttribute('data-bs-dismiss', 'alert');
    wrapper.appendChild(close);
    elements.alerts.appendChild(wrapper);
}

function setProgress(fraction, label) {
    elements.progressBar.style.width = `${Math.round(100 * fraction)}%`;
    elements.progressLabel.textContent = label;
}

function ensureWorker() {
    if (worker) { return worker; }
    worker = new Worker('./worker/analysis-worker.js', { type: 'module' });
    worker.onerror = (event) => {
        analysing = false;
        elements.cancel.classList.add('d-none');
        alertUser(`Analysis worker failed to start: ${event.message}`);
    };
    return worker;
}

// The two stages have very different costs, so a single bar would stall visibly. Feature
// extraction and inference each get a share proportional to roughly what they cost.
const STAGE_SHARE = { features: 0.4, inference: 0.6 };

async function analyse(file) {
    if (analysing) { return; }

    if (session) {
        session.source.dispose();
        session = null;
    }
    elements.downloadDetail.disabled = true;
    elements.downloadMultif0.disabled = true;
    elements.summary.textContent = 'Decoding...';
    elements.audio.classList.add('d-none');

    let source;
    try {
        setProgress(0, 'decoding');
        source = await AudioSource.load(file);
    } catch (error) {
        setProgress(0, 'idle');
        elements.summary.textContent = 'No analysis yet.';
        alertUser(error.message);
        return;
    }

    elements.message.textContent =
        `${source.info.name} - ${formatDuration(source.duration)}, `
        + `${source.info.decodedChannels} channel(s) decoded to mono at ${SAMPLE_RATE} Hz`;
    elements.audio.src = source.objectUrl;
    elements.audio.classList.remove('d-none');

    analysing = true;
    elements.cancel.classList.remove('d-none');
    const started = performance.now();

    const activeWorker = ensureWorker();
    activeWorker.onmessage = (event) => {
        const data = event.data;
        switch (data.type) {
            case 'STATUS':
                setProgress(0, 'loading model');
                elements.summary.textContent = data.message;
                break;

            case 'READY':
                device = data.plan;
                elements.summary.textContent =
                    `Backend: ${data.backend}\n`
                    + `Model: ${data.source.architecture} / ${data.source.weights}\n`
                    + `${describePlan(data.backend, data.plan)}\n`
                    + `Analysing ${formatDuration(source.duration)} of audio...`;
                break;

            case 'PROGRESS': {
                const offset = data.stage === 'inference' ? STAGE_SHARE.features : 0;
                const share = STAGE_SHARE[data.stage] ?? 0;
                const fraction = offset + share * (data.done / data.total);
                const elapsed = (performance.now() - started) / 1000;
                setProgress(fraction, `${data.stage} ${Math.round(100 * fraction)}% `
                    + `(${elapsed.toFixed(0)}s)`);
                break;
            }

            case 'RESULT':
                analysing = false;
                elements.cancel.classList.add('d-none');
                setProgress(1, 'done');
                session = {
                    source,
                    salience: new Float32Array(data.salience),
                    frames: data.frames,
                    backend: data.backend,
                    timing: data.timing,
                    audioSeconds: data.audioSeconds,
                };
                refresh();
                break;

            case 'CANCELLED':
                analysing = false;
                elements.cancel.classList.add('d-none');
                setProgress(0, 'cancelled');
                elements.summary.textContent = 'Analysis cancelled.';
                source.dispose();
                break;

            case 'ERROR':
                analysing = false;
                elements.cancel.classList.add('d-none');
                setProgress(0, 'failed');
                elements.summary.textContent = 'Analysis failed.';
                alertUser(`Analysis failed: ${data.message}`);
                console.error(data.stack);
                break;

            default:
                console.warn('unexpected message from worker', data);
        }
    };

    // The sample buffer is transferred, not copied: it can be tens of megabytes.
    const samples = source.samples;
    activeWorker.postMessage(
        { type: 'ANALYSE', samples: samples.buffer },
        [samples.buffer],
    );
    // The buffer is detached by the transfer, so the session keeps only what it still needs.
    source.samples = new Float32Array(0);
}

/**
 * Re-derive notes from the cached salience map and update the summary.
 *
 * Every analysis setting feeds only this function, which is why changing one is instant: the HCQT
 * and the network are not involved.
 */
function refresh() {
    if (!session) { return; }

    const options = readSettings();
    const peaks = extractPeaks(session.salience, session.frames, {
        threshold: options.threshold,
        refine: options.refine,
        referenceA4: REFERENCE_A4,
    });
    const drift = ensembleDrift(peaks, session.frames, options.driftWindowFrames);

    session.peaks = peaks;
    session.drift = drift;
    session.options = options;
    // Exposed so the analysis can be inspected from the console or an automated browser run
    // without going through the download machinery. Read-only by convention.
    window.__session = session;

    elements.downloadDetail.disabled = peaks.count === 0;
    elements.downloadMultif0.disabled = false;
    elements.summary.textContent = summarise(session, peaks, drift, options);
}

function readSettings() {
    const driftWindowSeconds = clamp(Number(elements.driftWindow.value) || 2, 0.2, 10);
    return {
        threshold: clamp(Number(elements.threshold.value) || 0.5, 0.01, 0.99),
        bandLower: clamp(Number(elements.bandLower.value) || -20, -50, 0),
        bandUpper: clamp(Number(elements.bandUpper.value) || 20, 0, 50),
        refine: elements.refine.checked,
        relativeToDrift: elements.relativeToDrift.checked,
        driftWindowSeconds,
        // Odd, so the window is symmetric about the frame it describes.
        driftWindowFrames: 2 * Math.round((driftWindowSeconds * FRAME_RATE) / 2) + 1,
    };
}

function clamp(value, low, high) {
    return Math.min(high, Math.max(low, value));
}

function summarise(session, peaks, drift, options) {
    const { timing } = session;
    let inBand = 0;
    let flat = 0;
    let sharp = 0;
    let driftSum = 0;
    let concentrationSum = 0;

    for (let i = 0; i < peaks.count; i++) {
        const frame = peaks.frame[i];
        const judged = options.relativeToDrift
            ? wrap(peaks.cents[i] - drift.cents[frame])
            : peaks.cents[i];
        if (judged < options.bandLower) { flat++; }
        else if (judged > options.bandUpper) { sharp++; }
        else { inBand++; }
    }
    for (let frame = 0; frame < session.frames; frame++) {
        driftSum += drift.cents[frame];
        concentrationSum += drift.concentration[frame];
    }

    const percent = (count) => peaks.count
        ? `${((100 * count) / peaks.count).toFixed(1)}%`
        : 'n/a';

    return [
        `Recording   ${session.source.info.name}`,
        `            ${formatDuration(session.audioSeconds)}, ${session.frames} frames `
            + `at ${FRAME_RATE.toFixed(2)} fps`,
        '',
        `Backend     ${session.backend}`,
        ...(device ? [`Device      ${describePlan(session.backend, device).replace(
            /^Device plan \([^)]*\): /, '')}`] : []),
        `Timing      features ${timing.features.toFixed(1)} s `
            + `(${timing.featureRealTimeFactor.toFixed(2)}x real-time), `
            + `inference ${timing.inference.toFixed(1)} s `
            + `(${timing.inferenceRealTimeFactor.toFixed(2)}x)`,
        `            total ${timing.total.toFixed(1)} s `
            + `-> ${timing.realTimeFactor.toFixed(2)}x real-time`,
        '',
        `Detections  ${peaks.count} peaks at threshold ${options.threshold.toFixed(2)} `
            + `(${(peaks.count / session.frames).toFixed(2)} per frame)`,
        `Tuning      in band [${options.bandLower}, ${options.bandUpper}] cents: `
            + `${inBand} (${percent(inBand)})`,
        `            flat:  ${flat} (${percent(flat)})`,
        `            sharp: ${sharp} (${percent(sharp)})`,
        `            judged ${options.relativeToDrift
            ? 'relative to ensemble drift' : `against fixed A=${REFERENCE_A4} Hz`}`,
        '',
        `Drift       mean ${(driftSum / session.frames).toFixed(1)} cents over a `
            + `${options.driftWindowSeconds.toFixed(1)} s window`,
        `            mean confidence ${(concentrationSum / session.frames).toFixed(2)} `
            + `(0 = sounding notes disagree, 1 = unanimous)`,
        '',
        options.refine
            ? `Resolution  sub-bin refinement on`
            : `Resolution  sub-bin refinement OFF - the grid is ${CENTS_PER_BIN} cents per bin, so `
              + `deviations\n            can only take the values 0, +/-20, +/-40 cents`,
    ].join('\n');
}

function wrap(cents) {
    return cents - 100 * Math.floor((cents + 50) / 100);
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds - 60 * minutes;
    return `${minutes}:${rest.toFixed(1).padStart(4, '0')}`;
}

function download(filename, text) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    // Revoking immediately can race the download in some browsers; one turn of the event loop is
    // enough for the click to have been handled.
    setTimeout(() => URL.revokeObjectURL(url), 0);
}

function baseName() {
    const name = session?.source.info.name ?? 'analysis';
    return name.replace(/\.[^.]+$/, '');
}

// --- wiring ---------------------------------------------------------------------------------

elements.input.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (file) { analyse(file); }
    // Clear the value so choosing the same file again still fires a change event.
    event.target.value = '';
});

elements.cancel.addEventListener('click', () => {
    if (analysing && worker) {
        worker.postMessage({ type: 'CANCEL' });
        elements.progressLabel.textContent = 'cancelling';
    }
});

for (const element of [elements.threshold, elements.bandLower, elements.bandUpper,
    elements.driftWindow, elements.refine, elements.relativeToDrift]) {
    element.addEventListener('change', refresh);
}

elements.downloadDetail.addEventListener('click', () => {
    if (!session?.peaks) { return; }
    download(`${baseName()}_detections.csv`,
        peaksToCsv(session.peaks, session.drift, session.options));
});

elements.downloadMultif0.addEventListener('click', () => {
    if (!session?.peaks) { return; }
    download(`${baseName()}_multif0.tsv`,
        peaksToMultif0Csv(session.peaks, session.frames));
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .catch((error) => console.warn('service worker registration failed:', error));
}

console.log(`Choir Pitch Monitor ${VERSION}: ${N_BINS} salience bins, `
    + `${CENTS_PER_BIN} cents per bin, ${FRAME_RATE.toFixed(2)} frames/s`);
