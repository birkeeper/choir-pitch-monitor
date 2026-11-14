// App shell: load a recording, run the analysis worker, track ensemble drift and spread, export CSV.
//
// Drift and spread are tracked by worker/ensemble.js, which is causal and fed frame by frame, so a
// recording is reviewed with exactly the numbers a live run would have shown at each moment.

import { AudioSource } from './js/audio-source.js';
import { extractPeaks, peaksToCsv, peaksToFrameCsv, peaksToFrameNoteCsv }
    from './worker/notes.js';
import { EnsembleTracker, KEY_SIGNATURES, scaleSpelling, nearestScaleNote }
    from './worker/ensemble.js';
import { EnsembleChart, latestIndex, formatCents } from './js/ensemble-chart.js';
import {
    SAMPLE_RATE, FRAME_RATE, FRAME_DURATION, CENTS_PER_BIN, N_BINS, REFERENCE_A4,
    DEFAULT_THRESHOLD, KEY_FIT_WINDOW_MIN, KEY_FIT_WINDOW_MAX, KEY_FIT_WINDOW_DEFAULT,
    MAX_FRAME_PITCHES, ENSEMBLE_F_MIN, ENSEMBLE_F_MAX, FISHEYE_DISTORTION_MAX,
} from './constants.js';

// Set by version.js, which the page loads before this module; it also names the service worker's cache.
const VERSION = self.APP_VERSION;

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
    downloadFrames: document.getElementById('downloadFrames'),
    downloadFrameNotes: document.getElementById('downloadFrameNotes'),
    threshold: document.getElementById('threshold'),
    bandLower: document.getElementById('bandLower'),
    bandUpper: document.getElementById('bandUpper'),
    refine: document.getElementById('refine'),
    key: document.getElementById('key'),
    smoothness: document.getElementById('smoothness'),
    smoothnessValue: document.getElementById('smoothnessValue'),
    zoom: document.getElementById('zoom'),
    zoomValue: document.getElementById('zoomValue'),
    driftNow: document.getElementById('driftNow'),
    spreadNow: document.getElementById('spreadNow'),
    chart: document.getElementById('ensembleChart'),
    chartTooltip: document.getElementById('chartTooltip'),
};

elements.version.textContent = VERSION;

for (const key of KEY_SIGNATURES) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    elements.key.appendChild(option);
}
elements.key.value = 'none';
Object.assign(elements.smoothness, {
    min: KEY_FIT_WINDOW_MIN, max: KEY_FIT_WINDOW_MAX, step: 0.5, value: KEY_FIT_WINDOW_DEFAULT,
});

const chart = new EnsembleChart(elements.chart, elements.chartTooltip, (seconds) => {
    elements.audio.currentTime = seconds;
    showPlayhead();
});

/** Everything about the recording currently loaded. Null until one is analysed. */
let session = null;
/** How the model was adapted to this machine's GPU; reported by the worker on READY. */
let device = null;
let worker = null;
let analysing = false;

/**
 * Describe how the model is being run.
 *
 * The window size and the trimmed overlap are fixed by the converted graph rather than chosen, but
 * they set how much redundant work each analysis does, so they are worth showing next to a timing.
 */
function describePlan(backend, plan) {
    if (!plan) { return ''; }
    const overlap = plan.usableFrames
        ? (plan.windowFrames / plan.usableFrames).toFixed(2)
        : '?';
    return `Window ${plan.windowFrames} frames (${plan.usableFrames} usable after trimming `
        + `${plan.trimFrames} each side, ${overlap}x overhead), ${plan.bins} bins`;
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

// Inference is the only stage; the model computes its own CQT internally.

async function analyse(file) {
    if (analysing) { return; }

    if (session) {
        session.source.dispose();
        session = null;
    }
    elements.downloadDetail.disabled = true;
    elements.downloadFrames.disabled = true;
    elements.downloadFrameNotes.disabled = true;
    elements.summary.textContent = 'Decoding...';
    elements.audio.classList.add('d-none');
    chart.setData(null, 0);
    showPlayhead();
    askForKey();

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
                    + `Model: ${data.source.architecture}\n`
                    + `${describePlan(data.backend, data.plan)}\n`
                    + `Analysing ${formatDuration(source.duration)} of audio...`;
                break;

            case 'PROGRESS': {
                const fraction = data.done / data.total;
                const elapsed = (performance.now() - started) / 1000;
                setProgress(fraction, `${Math.round(100 * fraction)}% (${elapsed.toFixed(0)}s)`);
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
 * Every analysis setting feeds only this function, which is why changing one is instant: the
 * network is not involved.
 */
function refresh() {
    if (!session) { return; }

    const options = readSettings();
    const peaks = extractPeaks(session.salience, session.frames, {
        threshold: options.threshold,
        refine: options.refine,
        referenceA4: REFERENCE_A4,
    });

    session.peaks = peaks;
    session.options = options;
    // Exposed so the analysis can be inspected from the console or an automated browser run
    // without going through the download machinery. Read-only by convention.
    window.__session = session;

    elements.downloadDetail.disabled = peaks.count === 0;
    elements.downloadFrames.disabled = false;
    elements.downloadFrameNotes.disabled = peaks.count === 0;
    trackEnsemble();
}

/**
 * Run the ensemble tracker over the whole recording and show the result.
 *
 * The tracker is fed frame by frame exactly as it would be live, silent frames included, so the
 * curve at any moment only depends on the audio before it. That makes a full re-run cheap enough
 * to repeat whenever the key or the smoothness changes.
 */
function trackEnsemble() {
    if (!session?.peaks) { return; }
    const { peaks, frames } = session;
    const tracker = new EnsembleTracker({ key: elements.key.value, window: readSmoothness() });
    const time = [];
    const keyDrift = [];
    const spread = [];
    let i = 0;
    for (let frame = 0; frame < frames; frame++) {
        const first = i;
        while (i < peaks.count && peaks.frame[i] === frame) { i++; }
        const fits = tracker.push(frame * FRAME_DURATION,
            peaks.frequency.subarray(first, i), peaks.salience.subarray(first, i));
        for (const fit of fits) {
            time.push(fit.time);
            keyDrift.push(fit.keyDrift);
            spread.push(fit.spread);
        }
    }
    const spelling = scaleSpelling(elements.key.value);
    const notesAt = (index) => describeNotes(peaks, frames, time[index], heldDrift(keyDrift, index),
        spelling);
    session.ensemble = { time, keyDrift, spread, notesAt };
    chart.setData(session.ensemble, session.audioSeconds);
    showPlayhead();
    elements.summary.textContent = summarise(session, peaks, session.options);
}

/** The key fit in effect at fit `index`: a skipped fit (NaN) holds the one before; 0 before any. */
function heldDrift(keyDrift, index) {
    for (let i = index; i >= 0; i--) {
        if (Number.isFinite(keyDrift[i])) { return keyDrift[i]; }
    }
    return 0;
}

/**
 * The notes detected in the frame at `seconds`, low to high, as [{text: "A3 +4", equalCents: 34}, ...]:
 * each named by its nearest scale note after taking out the drift, with its deviation in cents;
 * equalCents is how far it is from that note in equal temperament, i.e. the same plus the drift.
 * Only the detections the tracker uses are listed: the MAX_FRAME_PITCHES most salient within the
 * f0 range. Empty for a silent frame.
 */
function describeNotes(peaks, frames, seconds, drift, spelling) {
    const frame = Math.min(frames - 1, Math.round(seconds / FRAME_DURATION));
    // peaks are ordered by frame: find this frame's run.
    let low = 0;
    let high = peaks.count;
    while (low < high) {
        const middle = (low + high) >> 1;
        if (peaks.frame[middle] < frame) { low = middle + 1; } else { high = middle; }
    }
    const found = [];
    for (let i = low; i < peaks.count && peaks.frame[i] === frame; i++) {
        const frequency = peaks.frequency[i];
        if (frequency >= ENSEMBLE_F_MIN && frequency <= ENSEMBLE_F_MAX) {
            found.push({ frequency, salience: peaks.salience[i] });
        }
    }
    return found
        .sort((a, b) => b.salience - a.salience)
        .slice(0, MAX_FRAME_PITCHES)
        .sort((a, b) => a.frequency - b.frequency)
        .map(({ frequency }) => {
            const { name, cents } = nearestScaleNote(frequency, drift, spelling);
            const rounded = Math.round(cents);
            // The text is measured from the scale note with the drift taken out; the colour from equal
            // temperament, i.e. with the drift put back.
            return { text: `${name} ${rounded > 0 ? '+' : ''}${rounded}`, equalCents: cents + drift };
        });
}

/**
 * Reset the key to 'none' and show the menu unfolded, so the right key is picked for every new
 * recording: the drift is measured against it. A native dropdown cannot be opened from script
 * without a fresh click (showPicker() is refused once the user's activation has expired), so the
 * menu is shown as an open list instead, and folds back once a key is chosen.
 */
function askForKey() {
    elements.key.value = 'none';
    elements.key.size = KEY_SIGNATURES.length;
    elements.key.classList.add('choosing');
    elements.key.focus();
}

function foldKey() {
    if (!elements.key.classList.contains('choosing')) { return; }
    elements.key.removeAttribute('size');
    elements.key.classList.remove('choosing');
}

function readSmoothness() {
    const seconds = clamp(Number(elements.smoothness.value) || KEY_FIT_WINDOW_DEFAULT,
        KEY_FIT_WINDOW_MIN, KEY_FIT_WINDOW_MAX);
    elements.smoothnessValue.textContent = `${seconds.toFixed(1)} s`;
    return seconds;
}

/**
 * Move the playhead and update the readouts to the latest fit at or before it -- what a live
 * display would be showing at that moment.
 */
function showPlayhead() {
    const seconds = elements.audio.currentTime || 0;
    chart.setPlayhead(seconds);
    const ensemble = session?.ensemble;
    const index = ensemble ? latestIndex(ensemble.time, seconds) : -1;
    elements.driftNow.textContent = formatCents(index >= 0 ? ensemble.keyDrift[index] : NaN, true);
    elements.spreadNow.textContent = formatCents(index >= 0 ? ensemble.spread[index] : NaN, false);
}

/** Follow the playhead smoothly while playing; timeupdate alone fires only a few times a second. */
function followPlayback() {
    showPlayhead();
    if (!elements.audio.paused) { requestAnimationFrame(followPlayback); }
}

function readSettings() {
    return {
        threshold: clamp(Number(elements.threshold.value) || DEFAULT_THRESHOLD, 0.01, 0.99),
        bandLower: clamp(Number(elements.bandLower.value) || -20, -50, 0),
        bandUpper: clamp(Number(elements.bandUpper.value) || 20, 0, 50),
        refine: elements.refine.checked,
    };
}

function clamp(value, low, high) {
    return Math.min(high, Math.max(low, value));
}

function summarise(session, peaks, options) {
    const { timing, ensemble } = session;
    let inBand = 0;
    let flat = 0;
    let sharp = 0;

    for (let i = 0; i < peaks.count; i++) {
        if (peaks.cents[i] < options.bandLower) { flat++; }
        else if (peaks.cents[i] > options.bandUpper) { sharp++; }
        else { inBand++; }
    }
    const fitted = ensemble.keyDrift.filter(Number.isFinite);

    const percent = (count) => peaks.count
        ? `${((100 * count) / peaks.count).toFixed(1)}%`
        : 'n/a';

    return [
        `Recording   ${session.source.info.name}`,
        `            ${formatDuration(session.audioSeconds)}, ${session.frames} frames `
            + `at ${FRAME_RATE.toFixed(2)} fps`,
        '',
        `Backend     ${session.backend}`,
        ...(device ? [`Model       ${describePlan(session.backend, device)}`] : []),
        `Timing      ${timing.total.toFixed(1)} s `
            + `-> ${timing.realTimeFactor.toFixed(2)}x real-time`,
        '',
        `Detections  ${peaks.count} peaks at threshold ${options.threshold.toFixed(2)} `
            + `(${(peaks.count / session.frames).toFixed(2)} per frame)`,
        `Tuning      in band [${options.bandLower}, ${options.bandUpper}] cents: `
            + `${inBand} (${percent(inBand)})`,
        `            flat:  ${flat} (${percent(flat)})`,
        `            sharp: ${sharp} (${percent(sharp)})`,
        `            judged against fixed A=${REFERENCE_A4} Hz`,
        '',
        `Ensemble    key ${elements.key.value}, smoothness ${readSmoothness().toFixed(1)} s: `
            + `${fitted.length} of ${ensemble.time.length} key fits made`,
        `            drift at the end ${formatCents(fitted.at(-1), true)}`,
        '',
        options.refine
            ? `Resolution  sub-bin refinement on`
            : `Resolution  sub-bin refinement OFF - the grid is `
              + `${CENTS_PER_BIN.toFixed(1)} cents per bin and aligned to equal temperament, so\n`
              + `            deviations can only take the values 0 and +/-${CENTS_PER_BIN.toFixed(1)} cents`,
    ].join('\n');
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
    elements.refine]) {
    element.addEventListener('change', refresh);
}

// The key and smoothness only feed the tracker, so peak picking is not repeated for them.
elements.key.addEventListener('change', () => {
    foldKey();
    trackEnsemble();
});
// Clicking the already selected entry fires no change event, but is still a choice: 'none' may be
// the right key.
elements.key.addEventListener('click', foldKey);
elements.smoothness.addEventListener('input', readSmoothness);
elements.smoothness.addEventListener('change', trackEnsemble);
readSmoothness();

elements.zoom.max = FISHEYE_DISTORTION_MAX;
function applyZoom() {
    const distortion = clamp(Number(elements.zoom.value) || 0, 0, FISHEYE_DISTORTION_MAX);
    elements.zoomValue.textContent = `d ${distortion.toFixed(1)}`;
    chart.setZoom(distortion);
}
elements.zoom.addEventListener('input', applyZoom);
applyZoom();

elements.audio.addEventListener('play', followPlayback);
for (const type of ['timeupdate', 'seeked', 'loadedmetadata']) {
    elements.audio.addEventListener(type, showPlayhead);
}

elements.downloadDetail.addEventListener('click', () => {
    if (!session?.peaks) { return; }
    download(`${baseName()}_detections.csv`,
        peaksToCsv(session.peaks, session.options));
});

elements.downloadFrames.addEventListener('click', () => {
    if (!session?.peaks) { return; }
    download(`${baseName()}_frames.tsv`,
        peaksToFrameCsv(session.peaks, session.frames));
});

elements.downloadFrameNotes.addEventListener('click', () => {
    if (!session?.peaks) { return; }
    download(`${baseName()}_frame_notes.csv`,
        peaksToFrameNoteCsv(session.peaks, session.frames, session.options));
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .catch((error) => console.warn('service worker registration failed:', error));
}

console.log(`Choir Pitch Monitor ${VERSION}: ${N_BINS} salience bins, `
    + `${CENTS_PER_BIN} cents per bin, ${FRAME_RATE.toFixed(2)} frames/s`);
