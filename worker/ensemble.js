// Ensemble drift and spread, tracked causally so the same code can run on live audio.
//
// Grown from the "key fit" and "spread" sections of scripts/script_analyse_ensemble_drift.m.
// EnsembleTracker is fed one frame at a time and only ever looks back, so the numbers it produces
// for a recording are the ones it would have produced live. One exception: once a key change is
// confirmed, it is traced back to where it began, and the fits made since then are revised. Live,
// those last few seconds are first shown as they were measured and then corrected.
//
// Key fit: a window's notes are folded onto one octave (cents above C) and a template of the
// starting key's scale is slid over them. A shift F of that template is the drift plus 100 cents
// for every semitone the music has modulated: the template of a key t semitones higher is the
// starting key's template shifted by 100 t, so one correlation scores every key at once. The
// catch is that key and whole-semitone drift cannot be told apart within one window; only
// continuity of the drift over time separates a modulation from a slip.
//
// Two windows: the long one is fixed (KEY_FIT_LONG_SECONDS), the short one is the user's smoothness:
//  - The long window decides the key and the semitone. Key and drift are chosen together among the
//    keys the user selected. Every key offers the real peaks of its score within +/-KEY_FIT_JUMP of
//    the current fit (a real peak, not the edge of the range, where the curve is still rising).
//    Each is weighted by a Gaussian of how far its drift lies from a slow moving average of the
//    drift, the key in effect is favoured by KEY_FIT_KEEP_BONUS, and the best wins. A jump is
//    therefore read as a key change, and a slow drift can no longer creep a semitone away. This is
//    why the keys must be selected: with every key allowed, the fit wanders off by semitones again.
//  - The short window refines the drift: the real peak of its score within +/-KEY_FIT_JUMP of the
//    long fit's drift, weighted the same way. The spread is measured over the short window too.
// Until the long window is full, the short window works alone in the starting key: its first fit is
// searched within +/-KEY_FIT_START_RANGE of pitch, later ones within +/-KEY_FIT_JUMP of the last.
// The long window's first fit is searched within +/-KEY_FIT_START_RANGE of pitch as well. In both
// first fits, a rival peak scoring KEY_FIT_RIVAL_RATIO of the best makes the semitone ambiguous, and
// the candidate nearest to pitch is taken. Later, the key in effect is favoured over rivals by
// KEY_FIT_KEEP_BONUS; no other keys are reported.
//
// Key changes: when the long fit changes key, the moment it happened is looked for among the onsets
// of the notes in the long window (a note's first unmasked sample). The boundary is put at the
// onset after which the samples fit the new key best compared with the old one. From then on,
// every sample is judged in the key in effect at its own frame, so a short window across the
// boundary is split between the two keys, and the fits made since the boundary are revised.
//
// Spread: each sample of the short window, in its key, is compared with the nearest scale note
// after taking out the drift; the spread is the median absolute deviation of those residuals.

import {
    REFERENCE_A4, MAX_FRAME_PITCHES, ENSEMBLE_F_MIN, ENSEMBLE_F_MAX, FRAME_RATE, FRAME_DURATION,
    KEY_FIT_LONG_SECONDS, KEY_FIT_SMOOTHNESS_DEFAULT, KEY_FIT_HOP_FRAMES,
    KEY_FIT_TEMPLATE_WIDTH, KEY_FIT_START_RANGE, KEY_FIT_JUMP,
    KEY_FIT_RIVAL_RATIO, KEY_FIT_MIN_DETECTIONS_PER_FRAME,
    KEY_FIT_MOVE_STD, KEY_FIT_REFERENCE_TAU, KEY_FIT_KEEP_BONUS,
} from '../constants.js';

const OCTAVE = 1200;
const MAJOR_STEPS = [0, 2, 4, 5, 7, 9, 11];

/**
 * Key signatures offered to the user, in menu order: 'none' (every semitone), then sharps down to
 * no accidentals and on through the flats. All fifteen are listed, as they can all appear in sheet
 * music, although some name the same pitch classes: 7# = 5b (C# / Db), 6# = 6b (F# / Gb) and
 * 5# = 7b (B / Cb).
 */
export const KEY_SIGNATURES = [
    'none', '7#', '6#', '5#', '4#', '3#', '2#', '1#', '0',
    '1b', '2b', '3b', '4b', '5b', '6b', '7b',
];

/**
 * Scale notes of a key signature, in cents above C.
 *
 * A key signature names a major key and its relative minor, which share their notes, so one major
 * scale serves both. Each sharp moves the tonic up a fifth (7 semitones), each flat down a fifth.
 *
 * @param {string} key one of KEY_SIGNATURES
 * @returns {number[]}
 */
export function scaleFromKey(key) {
    if (key === 'none') {
        return Array.from({ length: 12 }, (_, i) => 100 * i);
    }
    const match = /^([0-7])([#b]?)$/.exec(key);
    if (!match) { throw new Error(`unknown key signature: ${key}`); }
    const count = Number(match[1]);
    const tonic = mod((match[2] === 'b' ? -7 : 7) * count, 12);
    return MAJOR_STEPS.map((step) => 100 * mod(tonic + step, 12)).sort((a, b) => a - b);
}

/**
 * Semitones above C of the major tonic a key signature names; 0 for 'none'.
 *
 * @param {string} key one of KEY_SIGNATURES
 * @returns {number} 0..11
 */
export function tonicOfKey(key) {
    if (key === 'none') { return 0; }
    scaleFromKey(key);   // validates the key
    return mod((key.endsWith('b') ? -7 : 7) * Number(key[0]), 12);
}

const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const LETTER_STEPS = [0, 2, 4, 5, 7, 9, 11];
const SHARP_ORDER = 'FCGDAEB';   // flats are added in the reverse order

/**
 * How a key signature spells its scale notes: semitone above C (0..11) -> letter and alteration
 * (+1 sharp, -1 flat). Spelled as the signature does, so 3b gives Eb, Ab and Bb, and 7# gives E#
 * and B#. With no key every semitone is a scale note, spelled with sharps.
 *
 * @param {string} key one of KEY_SIGNATURES
 * @returns {Map<number, {letter:string, alteration:number}>}
 */
export function scaleSpelling(key) {
    const spelling = new Map();
    if (key === 'none') {
        for (let step = 0; step < 12; step++) {
            const i = LETTER_STEPS.findLastIndex((letterStep) => letterStep <= step);
            spelling.set(step, { letter: LETTERS[i], alteration: step - LETTER_STEPS[i] });
        }
        return spelling;
    }
    scaleFromKey(key);   // validates the key
    const count = Number(key[0]);
    const flats = key.endsWith('b');
    const altered = flats ? [...SHARP_ORDER].reverse().slice(0, count) : [...SHARP_ORDER].slice(0, count);
    LETTERS.forEach((letter, i) => {
        const alteration = altered.includes(letter) ? (flats ? -1 : 1) : 0;
        spelling.set(mod(LETTER_STEPS[i] + alteration, 12), { letter, alteration });
    });
    return spelling;
}

/**
 * Name a detected pitch by its nearest scale note once the key drift is taken out, as the spread
 * does: with a drift of +30 cents, a pitch 30 cents above A4 is "A4 +0".
 *
 * @param {number} frequency Hz
 * @param {number} drift cents, the key fit in effect (0 if there is none)
 * @param {Map<number, {letter:string, alteration:number}>} spelling from scaleSpelling
 * @returns {{name:string, midi:number, cents:number}} name with octave (scientific pitch, by
 *   letter, so Cb4 is the B below middle C sounding), the scale note's MIDI number before drift,
 *   and the deviation from it in cents
 */
export function nearestScaleNote(frequency, drift, spelling) {
    const exact = 69 + 12 * Math.log2(frequency / REFERENCE_A4) - drift / 100;
    let best = null;
    for (const [step, spelled] of spelling) {
        const midi = step + 12 * Math.round((exact - step) / 12);
        if (best === null || Math.abs(exact - midi) < Math.abs(exact - best.midi)) {
            best = { midi, spelled };
        }
    }
    const { letter, alteration } = best.spelled;
    const accidental = alteration > 0 ? '#' : alteration < 0 ? 'b' : '';
    const octave = Math.floor((best.midi - alteration) / 12) - 1;
    return { name: `${letter}${accidental}${octave}`, midi: best.midi, cents: 100 * (exact - best.midi) };
}

/** Floored modulo, like Octave's mod: the result has the sign of the divisor. */
function mod(x, m) {
    return ((x % m) + m) % m;
}

/** Signed distance on the octave circle, in [-600, 600). */
function wrapOctave(cents) {
    return mod(cents + OCTAVE / 2, OCTAVE) - OCTAVE / 2;
}

/** Cents above C, folded to one octave, unrounded. */
function foldedCents(frequency) {
    return mod(OCTAVE * Math.log2(frequency / REFERENCE_A4) + 900, OCTAVE);
}

/**
 * The detections of a frame the ensemble measurement uses: the MAX_FRAME_PITCHES most salient, of
 * those the ones within the f0 range. The script this was ported from reads such a list.
 *
 * @returns {number[]} indices into the two arrays, ascending
 */
export function usableIndices(frequencies, saliences) {
    let order = Array.from({ length: frequencies.length }, (_, i) => i);
    if (order.length > MAX_FRAME_PITCHES) {
        order = order.sort((a, b) => saliences[b] - saliences[a]).slice(0, MAX_FRAME_PITCHES);
    }
    return order
        .filter((i) => frequencies[i] >= ENSEMBLE_F_MIN && frequencies[i] <= ENSEMBLE_F_MAX)
        .sort((a, b) => a - b);
}

/** Median of the first `count` values; sorts them in place. */
function medianInPlace(values, count) {
    const sorted = values.subarray(0, count).sort();
    const middle = count >> 1;
    return count % 2 ? sorted[middle] : 0.5 * (sorted[middle - 1] + sorted[middle]);
}


// Gain of the drift's moving average per fit, for a time constant of KEY_FIT_REFERENCE_TAU.
const REFERENCE_GAIN = KEY_FIT_HOP_FRAMES / (KEY_FIT_REFERENCE_TAU * FRAME_RATE);

/** Weight of a candidate whose drift lies `move` cents from the drift's moving average. */
function moveWeight(move) {
    return Math.exp(-(move ** 2) / (2 * KEY_FIT_MOVE_STD ** 2));
}

/** The step from offset `from` to a key `to` semitones above the start, as -5..6. */
function stepTo(from, to) {
    return mod(to - from + 5, 12) - 5;
}

export class EnsembleTracker {
    #scale;                 // the starting key's scale notes, in cents above C
    #template;              // its template, zero mean, stored twice over (see the constructor)
    #short;                 // the short window, in frames: the smoothness
    #long;                  // the long window, in frames
    #allowed = [];          // the selected keys, as semitones above the starting key (0..11)
    #names = new Map();     // those semitones -> the key signature the user selected

    // Samples, ordered by frame, from #head on: frame, folded cents (unrounded) and track. Plain
    // arrays, compacted now and then. #onsets: track -> its first sample's frame.
    #frames = [];
    #cents = [];
    #tracks = [];
    #head = 0;
    #onsets = new Map();

    #firstFrame = null;     // frame of the first sample; the first fit is a short window later
    #fitCount = 0;          // fits made so far; also the index of the next one

    #startDrift = NaN;      // the latest short-window drift, while there is no long fit yet
    #fit = NaN;             // the long fit: drift + 100 * #offset, held while windows fail
    #offset = 0;            // semitones the music has modulated from the starting key
    #reference = NaN;       // slow moving average of the long fit's drift
    #segments = [{ frame: -Infinity, offset: 0 }];   // the key in effect from each frame on
    #history = [];          // fits a key change can still revise: {index, frame, centre}
    #score = new Float64Array(OCTAVE);
    #scratch = new Float64Array(0);

    /**
     * @param {object} [options]
     * @param {string} [options.key='none'] the starting key, one of KEY_SIGNATURES
     * @param {string[]} [options.keys=[]] the other keys the song changes to (ignored with 'none')
     * @param {number} [options.smoothness] s, the short window (also the one the spread is measured
     *   over); rounded to whole frames. The long window is always KEY_FIT_LONG_SECONDS.
     */
    constructor({ key = 'none', keys = [], smoothness = KEY_FIT_SMOOTHNESS_DEFAULT } = {}) {
        this.#short = Math.max(1, Math.round(smoothness * FRAME_RATE));
        this.#long = Math.round(KEY_FIT_LONG_SECONDS * FRAME_RATE);
        this.#scale = scaleFromKey(key);
        const start = tonicOfKey(key);
        for (const other of key === 'none' ? [key] : [key, ...keys]) {
            const offset = mod(tonicOfKey(other) - start, 12);
            if (!this.#names.has(offset)) {
                this.#names.set(offset, other);
                this.#allowed.push(offset);
            }
        }

        // Gaussian bump on every scale note, with zero mean so a flat histogram scores 0 for every
        // shift.
        const template = new Float64Array(OCTAVE);
        for (let x = 0; x < OCTAVE; x++) {
            for (const note of this.#scale) {
                const distance = Math.abs(wrapOctave(x - note));
                template[x] += Math.exp(-(distance ** 2) / (2 * KEY_FIT_TEMPLATE_WIDTH ** 2));
            }
        }
        const mean = template.reduce((sum, value) => sum + value, 0) / OCTAVE;
        // Stored twice over, so the long window's correlation can index it without wrapping: a
        // modulo per multiply-add made the fit several times slower.
        this.#template = new Float64Array(2 * OCTAVE);
        for (let x = 0; x < 2 * OCTAVE; x++) { this.#template[x] = template[x % OCTAVE] - mean; }
    }

    /**
     * Feed one frame.
     *
     * Frames must arrive in order. Silent frames may be passed (with no frequencies) or left out;
     * either way the fits stay on their grid of KEY_FIT_HOP_FRAMES.
     *
     * The caller chooses the samples. Each may carry its own frame, earlier than `frame` (a sample
     * that only later turned out to belong to a note), and is entered into the windows where it
     * belongs; a fit that has already been made only takes it into account if it is revised.
     * Samples outside the f0 range are left out.
     *
     * @param {number} frame the frame of this call; has to increase
     * @param {ArrayLike<number>} frequencies Hz
     * @param {ArrayLike<number>} [frames] the frame of each sample (default: `frame`)
     * @param {ArrayLike<number>} [tracks] the note (pitch track) of each sample, for finding the
     *   onsets of notes (default: none; every sample's frame is then a possible key change)
     * @returns {{index:number, frame:number, time:number, keyDrift:number, spread:number,
     *            keyName:string}[]} the fits that fell due, usually none or one, and
     *   the earlier fits a key change revised; a fit is identified by its index, counting from 0.
     *   keyDrift (cents) is NaN when the short window held too few samples or no real peak (and
     *   until the first fit); spread is NaN when it held too few samples. keyName is the key in
     *   effect.
     */
    push(frame, frequencies, frames = null, tracks = null) {
        const results = [];
        const usable = [];
        for (let i = 0; i < frequencies.length; i++) {
            if (frequencies[i] >= ENSEMBLE_F_MIN && frequencies[i] <= ENSEMBLE_F_MAX) { usable.push(i); }
        }
        const frameOf = (i) => (frames ? frames[i] : frame);
        if (this.#firstFrame === null) {
            if (usable.length === 0) { return results; }
            this.#firstFrame = Math.min(...usable.map(frameOf));
        }

        // Fits due before this frame see only earlier frames.
        while (this.#nextFitFrame() < frame) {
            results.push(...this.#fitAt(this.#nextFitFrame()));
        }
        for (const i of usable) {
            this.#add(frameOf(i), frequencies[i], tracks ? tracks[i] : -1);
        }
        // A fit due at exactly this frame includes it.
        if (this.#nextFitFrame() === frame) {
            results.push(...this.#fitAt(frame));
        }
        return results;
    }

    #nextFitFrame() {
        return this.#firstFrame + this.#short + this.#fitCount * KEY_FIT_HOP_FRAMES;
    }

    /** Enter one sample, in frame order. Late arrivals only go back a few frames. */
    #add(frame, frequency, track) {
        let at = this.#frames.length;
        while (at > this.#head && this.#frames[at - 1] > frame) { at--; }
        this.#frames.splice(at, 0, frame);
        this.#cents.splice(at, 0, foldedCents(frequency));
        this.#tracks.splice(at, 0, track);
        if (track >= 0) {
            // Kept for good: an onset dropped with its samples would reappear, later, with the
            // note's next sample. One entry per note is little even for hours.
            const onset = this.#onsets.get(track);
            if (onset === undefined || frame < onset) { this.#onsets.set(track, frame); }
        }
    }

    /** Drop what no fit or revision can need any more. */
    #expire(frame) {
        // Samples are kept long enough for a revision, which reaches back a long window, and the short
        // window of the earliest fit it revises.
        const edge = frame - this.#long - this.#short;
        while (this.#head < this.#frames.length && this.#frames[this.#head] <= edge) { this.#head++; }
        if (this.#head > 4096 && this.#head > this.#frames.length / 2) {
            for (const list of [this.#frames, this.#cents, this.#tracks]) { list.splice(0, this.#head); }
            this.#head = 0;
        }
        while (this.#segments.length > 1 && this.#segments[1].frame <= edge) { this.#segments.shift(); }
        // A key change is placed after the start of the long window, so older fits stay as they are.
        const revisable = frame - this.#long;
        while (this.#history.length && this.#history[0].frame <= revisable) { this.#history.shift(); }
    }

    /** The key (offset from the starting key) in effect at a frame. */
    #offsetAt(frame) {
        for (let i = this.#segments.length - 1; ; i--) {
            if (this.#segments[i].frame <= frame) { return this.#segments[i].offset; }
        }
    }

    /** Indices of the samples in (frame - length, frame]. */
    #window(frame, length) {
        let end = this.#frames.length;
        while (end > this.#head && this.#frames[end - 1] > frame) { end--; }
        let start = end;
        while (start > this.#head && this.#frames[start - 1] > frame - length) { start--; }
        return [start, end];
    }

    /** The fit due at `frame`: returns it, preceded by the fits a key change found there revised. */
    #fitAt(frame) {
        this.#expire(frame);
        const index = this.#fitCount++;
        const results = [];
        if (frame >= this.#firstFrame + this.#long) {
            const previous = this.#fitLong(frame);
            if (previous !== null) { results.push(...this.#traceBack(frame, previous)); }
        }

        if (Number.isNaN(this.#fit)) {
            // No long fit yet: the short window alone, in the starting key.
            const first = Number.isNaN(this.#startDrift);
            const record = { index, frame, centre: first ? 0 : this.#startDrift };
            const result = this.#evaluate(record, first ? KEY_FIT_START_RANGE : KEY_FIT_JUMP, first);
            if (Number.isFinite(result.keyDrift)) { this.#startDrift = result.keyDrift; }
            results.push(result);
        } else {
            const record = { index, frame, centre: this.#fit - 100 * this.#offset };
            this.#history.push(record);
            results.push(this.#evaluate(record, KEY_FIT_JUMP, false));
        }
        return results;
    }

    /**
     * The long window's fit of key and drift at `frame`. Updates #fit, #offset and #reference.
     *
     * @returns {number|null} the fit before, if the key changed; otherwise null
     */
    #fitLong(frame) {
        const [start, end] = this.#window(frame, this.#long);
        if (end - start < KEY_FIT_MIN_DETECTIONS_PER_FRAME * this.#long) { return null; }

        // score[k]: the window's histogram against the template shifted by k cents (mod 1200), the
        // circular cross-correlation the script computes with ifft(fft(h) .* conj(fft(TK))). The
        // template is doubled, so template[bin + OCTAVE - k] is template[(bin - k) mod OCTAVE].
        const histogram = new Float64Array(OCTAVE);
        for (let i = start; i < end; i++) { histogram[mod(Math.round(this.#cents[i]), OCTAVE)]++; }
        const template = this.#template;
        const score = this.#score.fill(0);
        for (let bin = 0; bin < OCTAVE; bin++) {
            const count = histogram[bin];
            if (count === 0) { continue; }
            const base = bin + OCTAVE;
            for (let k = 0; k < OCTAVE; k++) { score[k] += count * template[base - k]; }
        }
        const at = (shift) => score[mod(shift, OCTAVE)];
        const isPeak = (shift) => at(shift) > 0
            && at(shift - 1) <= at(shift) && at(shift + 1) <= at(shift);

        if (Number.isNaN(this.#fit)) {
            const shift = firstPeak(at, isPeak);
            if (Number.isNaN(shift)) { return null; }
            this.#fit = shift;
            this.#offset = 0;
            this.#reference = shift;
            return null;
        }

        // Key and drift together: every selected key's real peaks near the current drift.
        const drift = this.#fit - 100 * this.#offset;
        let best = null;
        for (const allowed of this.#allowed) {
            const step = stepTo(this.#offset, allowed);
            const centre = this.#fit + 100 * step;
            for (let shift = Math.ceil(centre - KEY_FIT_JUMP); shift <= centre + KEY_FIT_JUMP; shift++) {
                if (!isPeak(shift)) { continue; }
                const objective = at(shift) * moveWeight(shift - centre + drift - this.#reference)
                    * (step === 0 ? KEY_FIT_KEEP_BONUS : 1);
                if (best === null || objective > best.objective) { best = { objective, shift, step }; }
            }
        }
        const previous = this.#fit;
        let changed = false;
        if (best !== null) {
            changed = best.step !== 0;
            this.#offset += best.step;
            this.#fit = best.shift;
        }
        this.#reference += REFERENCE_GAIN * (this.#fit - 100 * this.#offset - this.#reference);
        return changed ? previous : null;
    }

    /**
     * The long fit has just changed key, from `previous` to #fit. Find where the change began,
     * enter it, and revise the fits made since.
     */
    #traceBack(frame, previous) {
        // The change lies within the long window, and after the change before it.
        const lower = Math.max(frame - this.#long, this.#segments[this.#segments.length - 1].frame);
        const [start, end] = this.#window(frame, frame - lower);

        // Per sample, how much better it fits the new key than the old; all of them were judged in
        // the old key so far.
        const template = this.#template;
        const gains = [];
        for (let i = start; i < end; i++) {
            const bin = mod(Math.round(this.#cents[i]), OCTAVE);
            gains.push(template[mod(bin - this.#fit, OCTAVE)] - template[mod(bin - previous, OCTAVE)]);
        }
        // Candidates: the onsets of notes in the window; without notes, every sample's frame.
        const candidates = new Set();
        for (let i = start; i < end; i++) {
            const onset = this.#tracks[i] >= 0 ? this.#onsets.get(this.#tracks[i]) : this.#frames[i];
            if (onset > lower && onset <= frame) { candidates.add(onset); }
        }
        let boundary = frame;
        let bestGain = -Infinity;
        for (const candidate of [...candidates].sort((a, b) => a - b)) {
            let gain = 0;
            for (let i = start; i < end; i++) {
                if (this.#frames[i] >= candidate) { gain += gains[i - start]; }
            }
            if (gain > bestGain) {
                bestGain = gain;
                boundary = candidate;
            }
        }

        this.#segments.push({ frame: boundary, offset: this.#offset });
        const revised = [];
        for (const record of this.#history) {
            if (record.frame < boundary) { continue; }
            revised.push(this.#evaluate(record, KEY_FIT_JUMP, false));
        }
        return revised;
    }

    /**
     * The short window's fit at a record's frame: drift within `range` of record.centre, and the
     * spread. Every sample is judged in the key in effect at its own frame.
     */
    #evaluate(record, range, first) {
        const [start, end] = this.#window(record.frame, this.#short);
        const count = end - start;
        if (this.#scratch.length < count) { this.#scratch = new Float64Array(2 * count); }
        // Cents in the starting key's terms: a sample in a key t semitones higher, lowered by 100 t.
        const cents = this.#scratch;
        for (let i = start; i < end; i++) {
            cents[i - start] = mod(this.#cents[i] - 100 * this.#offsetAt(this.#frames[i]), OCTAVE);
        }

        let drift = NaN;
        let spread = NaN;
        if (count >= KEY_FIT_MIN_DETECTIONS_PER_FRAME * this.#short) {
            drift = this.#shortDrift(cents, count, record.centre, range, first);
            spread = this.#spread(cents, count, Number.isFinite(drift) ? drift : record.centre);
        }

        const offset = this.#offsetAt(record.frame);
        const keyName = this.#names.get(mod(offset, 12));
        return {
            index: record.index, frame: record.frame, time: record.frame * FRAME_DURATION,
            keyDrift: drift, spread, keyName,
        };
    }

    /** The short window's drift: its best real peak within `range` of `centre`, or NaN. */
    #shortDrift(cents, count, centre, range, first) {
        const low = Math.ceil(centre - range) - 1;
        const high = Math.floor(centre + range) + 1;
        const values = new Float64Array(high - low + 1);
        const template = this.#template;
        for (let i = 0; i < count; i++) {
            const bin = mod(Math.round(cents[i]), OCTAVE);
            for (let shift = low; shift <= high; shift++) {
                values[shift - low] += template[mod(bin - shift, OCTAVE)];
            }
        }
        const at = (shift) => values[shift - low];
        const isPeak = (shift) => shift > low && shift < high && at(shift) > 0
            && at(shift - 1) <= at(shift) && at(shift + 1) <= at(shift);
        if (first) { return firstPeak(at, isPeak, centre, range); }
        let best = NaN;
        let bestObjective = -Infinity;
        for (let shift = low + 1; shift < high; shift++) {
            if (!isPeak(shift)) { continue; }
            const objective = at(shift) * moveWeight(shift - centre);
            if (objective > bestObjective) {
                bestObjective = objective;
                best = shift;
            }
        }
        return best;
    }

    /** Median absolute deviation of the residuals against the scale shifted by `drift`. */
    #spread(cents, count, drift) {
        const residuals = new Float64Array(count);
        for (let i = 0; i < count; i++) {
            let smallest = Infinity;
            for (const note of this.#scale) {
                const deviation = wrapOctave(cents[i] - drift - note);
                if (Math.abs(deviation) < Math.abs(smallest)) { smallest = deviation; }
            }
            residuals[i] = smallest;
        }
        const centre = medianInPlace(residuals, count);
        for (let i = 0; i < count; i++) { residuals[i] = Math.abs(residuals[i] - centre); }
        return medianInPlace(residuals, count);
    }
}

/**
 * A first fit, with no earlier one to continue from: the best real peak within `range` of
 * `centre`. When another real peak in range scores KEY_FIT_RIVAL_RATIO of it, the window cannot
 * tell which semitone the choir is in, and the candidate nearest to `centre` is taken.
 */
function firstPeak(at, isPeak, centre = 0, range = KEY_FIT_START_RANGE) {
    const peaks = [];
    for (let shift = Math.ceil(centre - range); shift <= centre + range; shift++) {
        if (isPeak(shift)) { peaks.push(shift); }
    }
    if (peaks.length === 0) { return NaN; }
    const best = Math.max(...peaks.map(at));
    let chosen = NaN;
    for (const shift of peaks) {
        if (at(shift) >= KEY_FIT_RIVAL_RATIO * best
            && (Number.isNaN(chosen) || Math.abs(shift - centre) < Math.abs(chosen - centre))) {
            chosen = shift;
        }
    }
    return chosen;
}
