// App shell: load a recording, run the analysis worker, find pitch tracks, and show the ensemble's
// drift, spread and key and the pitches of the tracks.
//
// Everything after the worker's salience map is causal and fed frame by frame (worker/pitch-tracker.js
// and worker/ensemble.js, run by worker/ensemble-pipeline.js), so a recording is reviewed with
// exactly the numbers a live run would have shown at each moment.

import { AudioSource } from './js/audio-source.js';
import { extractPeaks } from './worker/notes.js';
import { KEY_SIGNATURES } from './worker/ensemble.js';
import { trackEnsemble } from './worker/ensemble-pipeline.js';
import { TimeAxis } from './js/time-axis.js';
import { latestIndex, formatCents } from './js/time-chart.js';
import { EnsembleChart } from './js/ensemble-chart.js';
import { PitchChart } from './js/pitch-chart.js';
import { buildPitchData } from './js/pitch-data.js';
import {
    SAMPLE_RATE, FRAME_RATE, CENTS_PER_BIN, N_BINS, REFERENCE_A4,
    DEFAULT_THRESHOLD, DEFAULT_REFINE, FISHEYE_DISTORTION_MAX,
    KEY_FIT_SMOOTHNESS_MIN, KEY_FIT_SMOOTHNESS_MAX, KEY_FIT_SMOOTHNESS_STEP,
    KEY_FIT_SMOOTHNESS_DEFAULT,
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
    key: document.getElementById('key'),
    otherKeys: document.getElementById('otherKeys'),
    smoothness: document.getElementById('smoothness'),
    smoothnessValue: document.getElementById('smoothnessValue'),
    zoom: document.getElementById('zoom'),
    zoomValue: document.getElementById('zoomValue'),
    driftNow: document.getElementById('driftNow'),
    spreadNow: document.getElementById('spreadNow'),
    keyNow: document.getElementById('keyNow'),
    chart: document.getElementById('ensembleChart'),
    chartTooltip: document.getElementById('chartTooltip'),
    pitchChart: document.getElementById('pitchChart'),
    pitchTooltip: document.getElementById('pitchTooltip'),
};

elements.version.textContent = VERSION;

for (const key of KEY_SIGNATURES) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    elements.key.appendChild(option);
}
elements.key.value = 'none';
for (const key of KEY_SIGNATURES) {
    if (key === 'none') { continue; }
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    elements.otherKeys.appendChild(option);
}
updateOtherKeys();
Object.assign(elements.smoothness, {
    min: KEY_FIT_SMOOTHNESS_MIN, max: KEY_FIT_SMOOTHNESS_MAX, step: KEY_FIT_SMOOTHNESS_STEP,
    value: KEY_FIT_SMOOTHNESS_DEFAULT,
});

// One time axis for both charts: they share the zoom, the playhead and the cursor.
const axis = new TimeAxis();
const seek = (seconds) => {
    elements.audio.currentTime = seconds;
    showPlayhead();
};
const ensembleChart = new EnsembleChart(elements.chart, elements.chartTooltip, axis, seek);
const pitchChart = new PitchChart(elements.pitchChart, elements.pitchTooltip, axis, seek);

/** Everything about the recording currently loaded. Null until one is analysed. */
let session = null;
let worker = null;
let analysing = false;

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

/** The line next to the Load button: what is loaded, and what is happening to it. */
let loadedInfo = '';
function setMessage(status) {
    elements.message.textContent = status ? `${loadedInfo} - ${status}` : loadedInfo;
}

async function analyse(file) {
    if (analysing) { return; }

    if (session) {
        session.source.dispose();
        session = null;
    }
    elements.audio.classList.add('d-none');
    showRecording(null);
    askForKey();

    let source;
    try {
        setProgress(0, 'decoding');
        elements.message.textContent = 'Decoding...';
        source = await AudioSource.load(file);
    } catch (error) {
        setProgress(0, 'idle');
        elements.message.textContent = 'Choose a FLAC, WAV or MP3 recording.';
        alertUser(error.message);
        return;
    }

    loadedInfo = `${source.info.name} - ${formatDuration(source.duration)}, `
        + `${source.info.decodedChannels} channel(s) decoded to mono at ${SAMPLE_RATE} Hz`;
    setMessage('');
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
                setMessage(data.message);
                break;

            case 'READY':
                setMessage(`analysing on ${data.backend}...`);
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
                setMessage(`analysed on ${data.backend} in ${data.timing.total.toFixed(1)} s `
                    + `(${data.timing.realTimeFactor.toFixed(2)}x real-time)`);
                session = {
                    source,
                    frames: data.frames,
                    audioSeconds: data.audioSeconds,
                    // The salience map is fixed, so the detections are made once.
                    peaks: extractPeaks(new Float32Array(data.salience), data.frames, {
                        threshold: DEFAULT_THRESHOLD,
                        refine: DEFAULT_REFINE,
                        referenceA4: REFERENCE_A4,
                    }),
                };
                // Exposed so the analysis can be inspected from the console or an automated browser
                // run. Read-only by convention.
                window.__session = session;
                showRecording(session);
                break;

            case 'CANCELLED':
                analysing = false;
                elements.cancel.classList.add('d-none');
                setProgress(0, 'cancelled');
                setMessage('analysis cancelled.');
                source.dispose();
                break;

            case 'ERROR':
                analysing = false;
                elements.cancel.classList.add('d-none');
                setProgress(0, 'failed');
                setMessage('analysis failed.');
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

/** Point the charts at a new recording (a session), or at none (null). */
function showRecording(newSession) {
    axis.setRecording(newSession?.audioSeconds ?? 0, newSession?.frames ?? 0);
    if (!newSession) {
        ensembleChart.setData(null);
        pitchChart.setData(null);
        showPlayhead();
        return;
    }
    updateEnsemble();
}

/**
 * Run pitch tracking and the ensemble tracker over the whole recording and show the result.
 *
 * Both are fed frame by frame exactly as they would be live (see worker/ensemble-pipeline.js), so
 * the curves at any moment only depend on the audio before it, and a full re-run is cheap enough to
 * repeat whenever the keys change. Key changes are traced back as they are found, and only the
 * corrected values are kept.
 */
function updateEnsemble() {
    if (!session) { return; }
    const { peaks, frames } = session;
    const key = elements.key.value;
    const keys = key === 'none' ? []
        : [...elements.otherKeys.selectedOptions].map((option) => option.value);
    const result = trackEnsemble(peaks, frames, { key, keys, smoothness: readSmoothness() });
    session.ensemble = {
        time: result.time, keyDrift: result.keyDrift, spread: result.spread,
        keyName: result.keyName,
    };
    session.pitches = buildPitchData(result.samples, session.ensemble, key, frames);
    ensembleChart.setData(session.ensemble);
    pitchChart.setData(session.pitches);
    showPlayhead();
}

/** The smoothness in seconds, from the slider (which snaps to its steps), shown beside it. */
function readSmoothness() {
    const seconds = clamp(Number(elements.smoothness.value) || KEY_FIT_SMOOTHNESS_DEFAULT,
        KEY_FIT_SMOOTHNESS_MIN, KEY_FIT_SMOOTHNESS_MAX);
    elements.smoothnessValue.textContent = `${seconds.toFixed(1)} s`;
    return seconds;
}

/**
 * Reset the keys -- starting key 'none', no other keys -- and show the starting-key menu unfolded,
 * so the right keys are picked for every new recording: the drift is measured against them. A native dropdown cannot be opened from script
 * without a fresh click (showPicker() is refused once the user's activation has expired), so the
 * menu is shown as an open list instead, and folds back once a key is chosen.
 */
function askForKey() {
    elements.key.value = 'none';
    for (const option of elements.otherKeys.options) { option.selected = false; }
    updateOtherKeys();
    elements.key.size = KEY_SIGNATURES.length;
    elements.key.classList.add('choosing');
    elements.key.focus();
}

function foldKey() {
    if (!elements.key.classList.contains('choosing')) { return; }
    elements.key.removeAttribute('size');
    elements.key.classList.remove('choosing');
}

/**
 * Other keys only mean something with a starting key: with 'none' every semitone is a scale note
 * already. The starting key itself is not offered again.
 */
function updateOtherKeys() {
    const key = elements.key.value;
    elements.otherKeys.disabled = key === 'none';
    for (const option of elements.otherKeys.options) {
        option.disabled = option.value === key;
        if (option.disabled) { option.selected = false; }
    }
}

/**
 * Move the playhead and update the readouts to the latest fit at or before it -- what a live
 * display would be showing at that moment.
 */
function showPlayhead() {
    axis.setPlayhead(elements.audio.currentTime || 0);
    const ensemble = session?.ensemble;
    const index = ensemble ? latestIndex(ensemble.time, axis.playhead + 1e-9) : -1;
    elements.driftNow.textContent = formatCents(index >= 0 ? ensemble.keyDrift[index] : NaN, true);
    elements.spreadNow.textContent = formatCents(index >= 0 ? ensemble.spread[index] : NaN, false);
    elements.keyNow.textContent = index >= 0 ? ensemble.keyName[index] : '\u2013';
}

/** Follow the playhead smoothly while playing; timeupdate alone fires only a few times a second. */
function followPlayback() {
    showPlayhead();
    if (!elements.audio.paused) { requestAnimationFrame(followPlayback); }
}

function clamp(value, low, high) {
    return Math.min(high, Math.max(low, value));
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds - 60 * minutes;
    return `${minutes}:${rest.toFixed(1).padStart(4, '0')}`;
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

// The keys only feed the trackers, so peak picking is not repeated for them.
elements.key.addEventListener('change', () => {
    foldKey();
    updateOtherKeys();
    updateEnsemble();
});
elements.otherKeys.addEventListener('change', updateEnsemble);
// Like the keys, the smoothness only feeds the trackers.
elements.smoothness.addEventListener('input', readSmoothness);
elements.smoothness.addEventListener('change', updateEnsemble);
readSmoothness();
// Clicking the already selected entry fires no change event, but is still a choice: 'none' may be
// the right key.
elements.key.addEventListener('click', foldKey);

elements.zoom.max = FISHEYE_DISTORTION_MAX;
function applyZoom() {
    const distortion = clamp(Number(elements.zoom.value) || 0, 0, FISHEYE_DISTORTION_MAX);
    elements.zoomValue.textContent = `d ${distortion.toFixed(1)}`;
    axis.setZoom(distortion);
}
elements.zoom.addEventListener('input', applyZoom);
applyZoom();

elements.audio.addEventListener('play', followPlayback);
for (const type of ['timeupdate', 'seeked', 'loadedmetadata']) {
    elements.audio.addEventListener(type, showPlayhead);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .catch((error) => console.warn('service worker registration failed:', error));
}

console.log(`Choir Pitch Monitor ${VERSION}: ${N_BINS} salience bins, `
    + `${CENTS_PER_BIN} cents per bin, ${FRAME_RATE.toFixed(2)} frames/s`);
