// Turn the salience map into detected pitches and their deviation from equal temperament.
//
// Peak *selection* is an exact port of utils_train.pitch_activations_to_mf0: local maxima along the
// frequency axis (scipy.signal.argrelmax, strict on both sides, never at an edge) kept when they
// reach the threshold. That is deliberate -- it keeps the detections directly comparable with
// predict_on_audio.py.
//
// What is added on top is sub-bin refinement, which changes the frequency assigned to an accepted
// peak but never which peaks are accepted. It is needed because the salience grid is 60 bins per
// octave -- exactly 20 cents -- and fmin = 32.7 Hz is C1 to within 0.17 cents, so the grid lands
// exactly 5 bins per semitone. Reporting bin centres would therefore restrict every deviation to
// {0, +/-20, +/-40} cents, which is too coarse to judge tuning. See PLAN.md section 2.4.

import {
    N_BINS, F_MIN, BINS_PER_OCTAVE, CENTS_PER_BIN, FRAME_DURATION, REFERENCE_A4,
} from '../constants.js';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/** Frequency of a (possibly fractional) salience bin. Mirrors utils.get_freq_grid(). */
export function binToFrequency(bin) {
    return F_MIN * Math.pow(2, bin / BINS_PER_OCTAVE);
}

/**
 * Nearest equal-tempered note and the signed deviation from it.
 * @returns {{midi:number, name:string, frequency:number, cents:number}}
 */
export function nearestNote(frequency, referenceA4 = REFERENCE_A4) {
    const exact = 69 + 12 * Math.log2(frequency / referenceA4);
    const midi = Math.round(exact);
    return {
        midi,
        name: `${NOTE_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`,
        frequency: referenceA4 * Math.pow(2, (midi - 69) / 12),
        cents: 100 * (exact - midi),
    };
}

/**
 * Sub-bin peak position by parabolic interpolation over the salience of the peak and its
 * neighbours, in log-frequency (where the grid is uniform, so a parabola is the right model).
 *
 * @returns {number} offset in bins, within [-0.5, 0.5]
 */
function refineOffset(below, at, above) {
    const denominator = below - 2 * at + above;
    // A flat or inverted neighbourhood has no meaningful vertex. argrelmax guarantees `at` is
    // strictly greatest, so this only happens on a perfectly symmetric plateau.
    if (denominator === 0) { return 0; }
    const offset = (0.5 * (below - above)) / denominator;
    if (!Number.isFinite(offset)) { return 0; }
    return Math.max(-0.5, Math.min(0.5, offset));
}

/**
 * Extract peaks from a salience map.
 *
 * @param {Float32Array} salience [bins * frames], bin-major -- the model's output layout
 * @param {number} frames
 * @param {object} [options]
 * @param {number} [options.threshold=0.5]
 * @param {boolean} [options.refine=true] parabolic sub-bin refinement
 * @param {number} [options.referenceA4=440]
 * @returns {{frame:Int32Array, bin:Int32Array, frequency:Float64Array,
 *            salience:Float32Array, cents:Float64Array, midi:Int32Array, count:number}}
 *   parallel arrays, ordered by frame then ascending bin
 */
export function extractPeaks(salience, frames, options = {}) {
    const {
        threshold = 0.5,
        refine = true,
        referenceA4 = REFERENCE_A4,
    } = options;

    const frameOut = [];
    const binOut = [];
    const frequencyOut = [];
    const salienceOut = [];
    const centsOut = [];
    const midiOut = [];

    for (let frame = 0; frame < frames; frame++) {
        // argrelmax never reports the first or last row, so the scan starts at 1 and stops at
        // N_BINS - 1. Comparisons are strict on both sides, so a two-bin plateau yields no peak --
        // matching scipy exactly.
        for (let bin = 1; bin < N_BINS - 1; bin++) {
            const value = salience[bin * frames + frame];
            if (value < threshold) { continue; }
            const below = salience[(bin - 1) * frames + frame];
            const above = salience[(bin + 1) * frames + frame];
            if (!(value > below && value > above)) { continue; }

            const position = refine ? bin + refineOffset(below, value, above) : bin;
            const frequency = binToFrequency(position);
            const note = nearestNote(frequency, referenceA4);

            frameOut.push(frame);
            binOut.push(bin);
            frequencyOut.push(frequency);
            salienceOut.push(value);
            centsOut.push(note.cents);
            midiOut.push(note.midi);
        }
    }

    return {
        frame: Int32Array.from(frameOut),
        bin: Int32Array.from(binOut),
        frequency: Float64Array.from(frequencyOut),
        salience: Float32Array.from(salienceOut),
        cents: Float64Array.from(centsOut),
        midi: Int32Array.from(midiOut),
        count: frameOut.length,
    };
}

/**
 * Per-frame ensemble drift: how far the whole ensemble sits from equal temperament.
 *
 * Deviations are only defined modulo a semitone -- a note 49 cents sharp of C and one 51 cents flat
 * of C# are almost the same pitch -- so an ordinary mean would be wrong near the boundary, and a
 * choir sinking past it would appear to snap back. Averaging unit vectors on the 100-cent circle
 * instead is continuous across the boundary. This is the wrap-safe form of the "cumulative drift"
 * signal discussed in the design conversation.
 *
 * Contributions are weighted by salience, then smoothed over `windowFrames`. Drift is a property of
 * the ensemble over seconds, not of a single 11.6 ms frame, and the default window is ~2 s: shorter
 * windows produce an estimate that swings across the whole +/-50 cent range as individual notes come
 * and go, which is noise rather than drift.
 *
 * The returned `concentration` is the length of the mean resultant vector, in [0, 1]. It is the
 * honest confidence signal for this estimate: when the sounding notes disagree about where the
 * semitone grid sits -- which is what a spread-out deviation histogram means -- the angle is close
 * to meaningless, and concentration says so instead of leaving the caller to guess.
 *
 * @returns {{cents: Float64Array, concentration: Float64Array}} cents in (-50, 50] per frame
 */
export function ensembleDrift(peaks, frames, windowFrames = 173) {
    const scale = (2 * Math.PI) / 100;
    const sumX = new Float64Array(frames);
    const sumY = new Float64Array(frames);
    const sumWeight = new Float64Array(frames);

    for (let i = 0; i < peaks.count; i++) {
        const frame = peaks.frame[i];
        const weight = peaks.salience[i];
        const angle = peaks.cents[i] * scale;
        sumX[frame] += weight * Math.cos(angle);
        sumY[frame] += weight * Math.sin(angle);
        sumWeight[frame] += weight;
    }

    // Smooth the resultant vectors rather than the angles: summing vectors keeps the wrap-safety
    // and automatically down-weights frames whose detections disagree.
    const half = Math.floor(windowFrames / 2);
    const cumulativeX = new Float64Array(frames + 1);
    const cumulativeY = new Float64Array(frames + 1);
    const cumulativeWeight = new Float64Array(frames + 1);
    for (let frame = 0; frame < frames; frame++) {
        cumulativeX[frame + 1] = cumulativeX[frame] + sumX[frame];
        cumulativeY[frame + 1] = cumulativeY[frame] + sumY[frame];
        cumulativeWeight[frame + 1] = cumulativeWeight[frame] + sumWeight[frame];
    }

    const cents = new Float64Array(frames);
    const concentration = new Float64Array(frames);
    for (let frame = 0; frame < frames; frame++) {
        const from = Math.max(0, frame - half);
        const to = Math.min(frames, frame + half + 1);
        const x = cumulativeX[to] - cumulativeX[from];
        const y = cumulativeY[to] - cumulativeY[from];
        const weight = cumulativeWeight[to] - cumulativeWeight[from];
        cents[frame] = (x === 0 && y === 0) ? 0 : Math.atan2(y, x) / scale;
        concentration[frame] = weight > 0 ? Math.sqrt(x * x + y * y) / weight : 0;
    }
    return { cents, concentration };
}

/** Bring a cents value into (-50, 50], the half-open interval around the nearest semitone. */
export function wrapCents(cents) {
    return cents - 100 * Math.floor((cents + 50) / 100);
}

/**
 * Long-format CSV: one row per detected peak.
 *
 * `cents` is the deviation from equal temperament at the configured reference; `drift_cents` is the
 * ensemble's own deviation at that instant, and `rel_cents` is the difference -- "who is flat
 * relative to the group" as opposed to "the group is flat".
 */
export function peaksToCsv(peaks, drift, options = {}) {
    const {
        bandLower = -20,
        bandUpper = 20,
        referenceA4 = REFERENCE_A4,
        relativeToDrift = false,
    } = options;

    const lines = ['time_s,freq_hz,bin,salience,note,note_hz,cents,'
        + 'drift_cents,drift_confidence,rel_cents,in_band'];
    for (let i = 0; i < peaks.count; i++) {
        const time = peaks.frame[i] * FRAME_DURATION;
        const note = nearestNote(peaks.frequency[i], referenceA4);
        const driftCents = drift.cents[peaks.frame[i]];
        const relative = wrapCents(peaks.cents[i] - driftCents);
        const judged = relativeToDrift ? relative : peaks.cents[i];
        const inBand = judged >= bandLower && judged <= bandUpper ? 1 : 0;
        lines.push([
            time.toFixed(6),
            peaks.frequency[i].toFixed(4),
            peaks.bin[i],
            peaks.salience[i].toFixed(4),
            note.name,
            note.frequency.toFixed(4),
            peaks.cents[i].toFixed(2),
            driftCents.toFixed(2),
            drift.concentration[peaks.frame[i]].toFixed(3),
            relative.toFixed(2),
            inBand,
        ].join(','));
    }
    return lines.join('\n') + '\n';
}

/**
 * Wide-format, tab-delimited: `time<TAB>freq1<TAB>freq2...`, one row per frame.
 *
 * This is the layout utils_train.save_multif0_output writes, so the output of this app can be
 * diffed directly against predict_on_audio.py. Frames with no detections still get a row, as in the
 * reference implementation.
 */
export function peaksToMultif0Csv(peaks, frames) {
    const byFrame = Array.from({ length: frames }, () => []);
    for (let i = 0; i < peaks.count; i++) {
        byFrame[peaks.frame[i]].push(peaks.frequency[i]);
    }
    const lines = [];
    for (let frame = 0; frame < frames; frame++) {
        const time = frame * FRAME_DURATION;
        lines.push([time, ...byFrame[frame]].join('\t'));
    }
    return lines.join('\n') + '\n';
}
