// Turn the salience map into detected pitches and their deviation from equal temperament.
//
// Peak selection follows the recipe in Bittner et al. (2022) section 3, which is the model's own:
// "Multi-pitch estimates are created by simply peak picking Yp across frequency and retaining all
// peaks greater than tau_n." A peak is a strict local maximum along the frequency axis -- greater
// than both neighbours, so a two-bin plateau yields none -- and the first and last bins are never
// peaks, having only one neighbour each.
//
// Sub-bin refinement is applied on top. It changes the frequency assigned to an accepted peak but
// never which peaks are accepted, and it is necessary rather than decorative here: the grid is 3
// bins per semitone (33.3 cents) and its base, A0 = 27.5 Hz, is an exact equal-tempered pitch, so
// bin centres alone could only ever report deviations of 0 or +/-33.3 cents. The paper points at the
// same remedy -- continuous estimates come from "the amplitude values of the estimated f0 bin, and
// those of its neighboring bins in frequency".

import {
    N_BINS, F_MIN, A0_BIN, BINS_PER_OCTAVE, FRAME_DURATION, REFERENCE_A4, MAX_FRAME_PITCHES,
} from '../constants.js';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Frequency of a (possibly fractional) salience bin.
 *
 * A0 sits on bin A0_BIN, which depends on the model's weights; see the note in constants.js. Each
 * bin of error there is a uniform 33.3 cent bias on every reported pitch.
 */
export function binToFrequency(bin) {
    return F_MIN * Math.pow(2, (bin - A0_BIN) / BINS_PER_OCTAVE);
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
    // A flat or inverted neighbourhood has no meaningful vertex. Peak selection guarantees `at`
    // is strictly greatest, so this only happens on a perfectly symmetric neighbourhood.
    if (denominator === 0) { return 0; }
    const offset = (0.5 * (below - above)) / denominator;
    if (!Number.isFinite(offset)) { return 0; }
    return Math.max(-0.5, Math.min(0.5, offset));
}

/**
 * Peaks of a single frame.
 *
 * Reads salience bin b from values[offset + b * stride], so the same code serves a whole stitched
 * map (stride = frames, offset = frame) and a single live frame (stride = 1, offset = 0).
 *
 * @param {Float32Array} values
 * @param {number} stride
 * @param {number} offset
 * @param {object} [options] as for extractPeaks
 * @param {(bin:number, frequency:number, salience:number, note:object)=>void} onPeak
 *   called per accepted peak, in ascending bin order
 */
export function extractFramePeaks(values, stride, offset, options, onPeak) {
    const {
        threshold = 0.5,
        refine = true,
        referenceA4 = REFERENCE_A4,
    } = options ?? {};

    // The first and last bins are never peaks (only one neighbour each), so the scan runs from 1 to
    // N_BINS - 1. Comparisons are strict on both sides, so a two-bin plateau yields no peak.
    for (let bin = 1; bin < N_BINS - 1; bin++) {
        const value = values[offset + bin * stride];
        if (value < threshold) { continue; }
        const below = values[offset + (bin - 1) * stride];
        const above = values[offset + (bin + 1) * stride];
        if (!(value > below && value > above)) { continue; }

        const position = refine ? bin + refineOffset(below, value, above) : bin;
        const frequency = binToFrequency(position);
        onPeak(bin, frequency, value, nearestNote(frequency, referenceA4));
    }
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
    const frameOut = [];
    const binOut = [];
    const frequencyOut = [];
    const salienceOut = [];
    const centsOut = [];
    const midiOut = [];

    for (let frame = 0; frame < frames; frame++) {
        extractFramePeaks(salience, frames, frame, options, (bin, frequency, value, note) => {
            frameOut.push(frame);
            binOut.push(bin);
            frequencyOut.push(frequency);
            salienceOut.push(value);
            centsOut.push(note.cents);
            midiOut.push(note.midi);
        });
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
 * Long-format CSV: one row per detected peak, with its deviation from equal temperament at the
 * configured reference.
 */
export function peaksToCsv(peaks, options = {}) {
    const {
        bandLower = -20,
        bandUpper = 20,
        referenceA4 = REFERENCE_A4,
    } = options;

    const lines = ['time_s,freq_hz,bin,salience,note,note_hz,cents,in_band'];
    for (let i = 0; i < peaks.count; i++) {
        const time = peaks.frame[i] * FRAME_DURATION;
        const note = nearestNote(peaks.frequency[i], referenceA4);
        const inBand = peaks.cents[i] >= bandLower && peaks.cents[i] <= bandUpper ? 1 : 0;
        lines.push([
            time.toFixed(6),
            peaks.frequency[i].toFixed(4),
            peaks.bin[i],
            peaks.salience[i].toFixed(4),
            note.name,
            note.frequency.toFixed(4),
            peaks.cents[i].toFixed(2),
            inBand,
        ].join(','));
    }
    return lines.join('\n') + '\n';
}

/**
 * Wide-format, tab-delimited: `time<TAB>freq1<TAB>freq2...`, one row per frame.
 *
 * Every frame gets a row, including frames with no detections, so row index and time stay in step
 * and the file can be read as a dense time series.
 */
export function peaksToFrameCsv(peaks, frames) {
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

/**
 * Wide-format CSV: one row per frame that has at least one detection, with up to
 * MAX_FRAME_PITCHES pitches per row as `f0_n_hz, note_n_hz, cents_n` triples.
 *
 * Silent frames are omitted -- unlike `peaksToFrameCsv`, this is a sparse listing for eyeballing
 * what was detected, not a dense time series. Pitches are ordered low to high within a row; when a
 * frame holds more than the row can carry, the lowest-salience peaks are the ones dropped, so the
 * row keeps the detections the model was most confident about.
 */
export function peaksToFrameNoteCsv(peaks, frames, options = {}) {
    const { referenceA4 = REFERENCE_A4 } = options;

    const byFrame = Array.from({ length: frames }, () => []);
    for (let i = 0; i < peaks.count; i++) {
        byFrame[peaks.frame[i]].push(i);
    }

    const header = ['time_s'];
    for (let n = 1; n <= MAX_FRAME_PITCHES; n++) {
        header.push(`f0_${n}_hz`, `note_${n}_hz`, `cents_${n}`);
    }
    const lines = [header.join(',')];

    for (let frame = 0; frame < frames; frame++) {
        let indices = byFrame[frame];
        if (indices.length === 0) { continue; }
        if (indices.length > MAX_FRAME_PITCHES) {
            indices = indices.slice()
                .sort((a, b) => peaks.salience[b] - peaks.salience[a])
                .slice(0, MAX_FRAME_PITCHES);
        }
        indices = indices.slice().sort((a, b) => peaks.frequency[a] - peaks.frequency[b]);
        // One field per column on every row, so the trailing empties keep the shape rectangular.
        const row = new Array(1 + 3 * MAX_FRAME_PITCHES).fill('');
        row[0] = (frame * FRAME_DURATION).toFixed(6);
        indices.forEach((index, slot) => {
            const frequency = peaks.frequency[index];
            const note = nearestNote(frequency, referenceA4);
            row[1 + 3 * slot] = frequency.toFixed(4);
            row[2 + 3 * slot] = note.frequency.toFixed(4);
            row[3 + 3 * slot] = (1200 * Math.log2(frequency / note.frequency)).toFixed(2);
        });
        lines.push(row.join(','));
    }
    return lines.join('\n') + '\n';
}
