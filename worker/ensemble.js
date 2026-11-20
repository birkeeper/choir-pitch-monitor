// Ensemble drift and spread, tracked causally so the same code can run on live audio.
//
// A port of the "key fit" and "spread" sections of scripts/script_analyse_ensemble_drift.m. The
// script works on a whole recording at once; EnsembleTracker is fed one frame at a time and only
// ever looks back, so the numbers it produces for a recording are the ones it would have produced
// live. The script is causal too, so the two agree.
//
// Key fit: every window's notes are folded onto one octave (1200 cents above C) and a template of
// the song's scale is slid over them; the best shift is the drift, including whole semitones.
// Nothing is accumulated, so a bad window only spoils itself. Each fit is accepted only if the
// checks pass; otherwise the previous fit is kept:
//  1. Continuity: the shift is searched within +/-KEY_FIT_JUMP of the previous fit, which rules out
//     a jump to a fifth (6 of 7 notes shared) however well it scores.
//  2. Real peak: the best shift in that range must be a peak of this window's score curve, not its
//     edge. At the edge the curve is still rising, and following it partway would let the fit
//     creep away in steps.
//  3. Clear winner: shifts a semitone and a whole tone away must score clearly lower. If one scores
//     nearly as well, the window cannot tell which semitone the choir is in; then the candidate
//     (best or near-equal rival) nearest to the previous fit is taken.
// With no key (all twelve semitones in the template) check 3 always finds a rival, so the fit
// tracks within a semitone and continuity alone carries it across semitone boundaries.
//
// Spread: each detection is shifted by the latest key fit and compared with the nearest scale note;
// the spread is the median absolute deviation of those residuals over the window.

import {
    REFERENCE_A4, MAX_FRAME_PITCHES, ENSEMBLE_F_MIN, ENSEMBLE_F_MAX,
    KEY_FIT_HOP, KEY_FIT_TEMPLATE_WIDTH, KEY_FIT_START_RANGE, KEY_FIT_JUMP,
    KEY_FIT_RIVAL_RATIO, KEY_FIT_RIVAL_RANGE, KEY_FIT_MIN_DETECTIONS_PER_FRAME,
    KEY_FIT_WINDOW_DEFAULT, FRAME_RATE,
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

/** The correlation lag of index k (0..1199): 0..599 and then -600..-1, as in the script. */
function shiftOf(k) {
    return k < OCTAVE / 2 ? k : k - OCTAVE;
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

export class EnsembleTracker {
    #window;
    #minDetections;   // samples a window needs for a fit
    #scale;
    #template;

    // Detections of the last #window seconds, oldest first, from #head on: time, folded cents
    // rounded to a histogram bin, unrounded folded cents, and the residual against the key fit
    // (NaN while there is no fit, undefined until the detection has been resolved against the fit
    // in effect when it arrived). Plain arrays, compacted now and then.
    #times = [];
    #bins = [];
    #cents = [];
    #residuals = [];
    #head = 0;
    #histogram = new Float64Array(OCTAVE);
    #score = new Float64Array(OCTAVE);
    #scratch = new Float64Array(0);

    #firstFit = null;   // time of the first fit, a window after the first frame with detections
    #fitCount = 0;      // fits made so far; the next is due at #firstFit + #fitCount * KEY_FIT_HOP
    #fit = NaN;         // latest accepted key fit, held while later windows fail the checks

    /**
     * @param {object} [options]
     * @param {string} [options.key='none'] one of KEY_SIGNATURES
     * @param {number} [options.window] s, the smoothness setting (WK; the spread window WS equals it)
     */
    constructor({ key = 'none', window = KEY_FIT_WINDOW_DEFAULT } = {}) {
        this.#window = window;
        this.#minDetections = KEY_FIT_MIN_DETECTIONS_PER_FRAME * window * FRAME_RATE;
        this.#scale = scaleFromKey(key);

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
        // Stored twice over, so the correlation can index it without wrapping: a modulo per
        // multiply-add made the fit several times slower.
        this.#template = new Float64Array(2 * OCTAVE);
        for (let x = 0; x < 2 * OCTAVE; x++) { this.#template[x] = template[x % OCTAVE] - mean; }
    }

    /**
     * Feed one frame.
     *
     * Frames must arrive in time order. Silent frames may be passed (with no frequencies) or left
     * out; either way the fits stay on their grid of KEY_FIT_HOP seconds.
     *
     * By default the detections are those of the frame at `time`, and at most MAX_FRAME_PITCHES of
     * them, within the f0 range, are used. With `times` the caller has already chosen the
     * detections, and each carries its own time stamp, which may be earlier than `time` (a
     * detection that only later turned out to belong in the measurement): it is entered into the
     * window where it belongs. A fit that has already been made does not change. `time` is the
     * moment of this call and still has to increase.
     *
     * @param {number} time s
     * @param {ArrayLike<number>} frequencies Hz, the pitches detected in this frame
     * @param {ArrayLike<number>} saliences their salience, used to keep the strongest
     *   MAX_FRAME_PITCHES when a frame holds more (not used with `times`)
     * @param {ArrayLike<number>} [times] s, the time stamp of each detection
     * @returns {{time:number, keyDrift:number, spread:number}[]} the fits that fell due, usually
     *   none or one. keyDrift is NaN when the window held too few detections to fit (the held fit
     *   is still used for the spread), and NaN until the first fit; spread is NaN when too few
     *   residuals were available.
     */
    push(time, frequencies, saliences, times = null) {
        const results = [];
        if (this.#firstFit === null) {
            if (frequencies.length === 0) { return results; }
            this.#firstFit = time + this.#window;
        }

        // Fits due before this frame see only earlier frames.
        while (this.#nextFitTime() < time) {
            results.push(this.#fitAt(this.#nextFitTime()));
        }

        const earliest = this.#add(time, frequencies, saliences, times);
        // A fit due at exactly this frame's time includes it, as the script's window does.
        const fitNow = this.#nextFitTime() <= time;
        let keyDrift;
        if (fitNow) { keyDrift = this.#fitKey(this.#nextFitTime()); }
        // Residuals use the latest fit made at or before this frame.
        this.#resolveResiduals(earliest);
        if (fitNow) {
            const at = this.#nextFitTime();
            this.#fitCount++;
            results.push({ time: at, keyDrift, spread: this.#spread() });
        }
        return results;
    }

    #nextFitTime() {
        return this.#firstFit + this.#fitCount * KEY_FIT_HOP;
    }

    #fitAt(time) {
        const keyDrift = this.#fitKey(time);
        this.#fitCount++;
        return { time, keyDrift, spread: this.#spread() };
    }

    /**
     * Enter this call's usable detections into the window, in time order. Returns the earliest
     * time stamp entered (Infinity if none), so that only the entries from there on need resolving.
     */
    #add(time, frequencies, saliences, times) {
        const indices = times
            ? Array.from({ length: frequencies.length }, (_, i) => i)
                .filter((i) => frequencies[i] >= ENSEMBLE_F_MIN && frequencies[i] <= ENSEMBLE_F_MAX)
            : usableIndices(frequencies, saliences);
        let earliest = Infinity;
        for (const i of indices) {
            const stamp = times ? times[i] : time;
            const cents = foldedCents(frequencies[i]);
            const bin = mod(Math.round(cents), OCTAVE);
            // Insert after every entry that is not later: late arrivals only go back a few frames,
            // so this is a short walk from the end.
            let at = this.#times.length;
            while (at > this.#head && this.#times[at - 1] > stamp) { at--; }
            this.#times.splice(at, 0, stamp);
            this.#cents.splice(at, 0, cents);
            this.#bins.splice(at, 0, bin);
            this.#residuals.splice(at, 0, undefined);
            this.#histogram[bin]++;
            earliest = Math.min(earliest, stamp);
        }
        return earliest;
    }

    /** Resolve the entries not yet judged against a key fit, from the end back to `earliest`. */
    #resolveResiduals(earliest) {
        for (let i = this.#times.length - 1; i >= this.#head && this.#times[i] >= earliest; i--) {
            if (this.#residuals[i] === undefined) {
                this.#residuals[i] = this.#residualOf(this.#cents[i]);
            }
        }
    }

    /** Drop detections at or before `time - window`, the window's open lower edge. */
    #expire(time) {
        const edge = time - this.#window;
        while (this.#head < this.#times.length && this.#times[this.#head] <= edge) {
            this.#histogram[this.#bins[this.#head]]--;
            this.#head++;
        }
        if (this.#head > 4096 && this.#head > this.#times.length / 2) {
            for (const list of [this.#times, this.#bins, this.#cents, this.#residuals]) {
                list.splice(0, this.#head);
            }
            this.#head = 0;
        }
    }

    /** One key fit over the window ending at `time`; returns its key drift or NaN. */
    #fitKey(time) {
        this.#expire(time);
        if (this.#times.length - this.#head < this.#minDetections) { return NaN; }

        // score[k]: the histogram shifted by shiftOf(k) cents against the template, i.e. the
        // circular cross-correlation the script computes with ifft(fft(h) .* conj(fft(TK))).
        // The template is doubled, so template[bin + OCTAVE - k] is template[(bin - k) mod OCTAVE]
        // with the index always in range.
        const histogram = this.#histogram;
        const template = this.#template;
        const score = this.#score.fill(0);
        for (let bin = 0; bin < OCTAVE; bin++) {
            const count = histogram[bin];
            if (count === 0) { continue; }
            const base = bin + OCTAVE;
            for (let k = 0; k < OCTAVE; k++) {
                score[k] += count * template[base - k];
            }
        }

        // 1. Continuity: best shift near the previous fit (near 0 for the first fit).
        const first = Number.isNaN(this.#fit);
        const centre = first ? 0 : this.#fit;
        const limit = first ? KEY_FIT_START_RANGE : KEY_FIT_JUMP;
        let best = -1;
        let bestScore = -Infinity;
        for (let k = 0; k < OCTAVE; k++) {
            if (Math.abs(wrapOctave(shiftOf(k) - centre)) <= limit && score[k] > bestScore) {
                best = k;
                bestScore = score[k];
            }
        }

        // 2. Real peak: the neighbouring shifts must not score higher. Indices wrap, as shifts do.
        const isPeak = score[mod(best - 1, OCTAVE)] <= bestScore
            && score[mod(best + 1, OCTAVE)] <= bestScore;

        // 3. Clear winner over the shifts a semitone and a whole tone away. If there is none, the
        // best and every rival scoring within KEY_FIT_RIVAL_RATIO of it are candidates, and the one
        // nearest to the previous fit is taken instead.
        const candidates = [shiftOf(best)];
        let rival = -Infinity;
        for (const step of [-200, -100, 100, 200]) {
            const target = shiftOf(best) + step;
            let rivalIndex = -1;
            let rivalScore = -Infinity;
            for (let k = 0; k < OCTAVE; k++) {
                if (Math.abs(wrapOctave(shiftOf(k) - target)) <= KEY_FIT_RIVAL_RANGE
                    && score[k] > rivalScore) {
                    rivalIndex = k;
                    rivalScore = score[k];
                }
            }
            rival = Math.max(rival, rivalScore);
            if (rivalScore >= KEY_FIT_RIVAL_RATIO * bestScore) {
                candidates.push(shiftOf(rivalIndex));
            }
        }
        const isClear = bestScore > 0 && rival < KEY_FIT_RIVAL_RATIO * bestScore;
        let shift = shiftOf(best);
        if (!isClear) {
            let nearest = Infinity;
            for (const candidate of candidates) {
                const distance = Math.abs(wrapOctave(candidate - centre));
                if (distance < nearest) {
                    nearest = distance;
                    shift = candidate;
                }
            }
        }

        if (isPeak && bestScore > 0) {
            this.#fit = centre + wrapOctave(shift - centre);   // continues past +/-600
        }
        return this.#fit;
    }

    /** Deviation from the nearest scale note after removing the key fit; NaN before any fit. */
    #residualOf(cents) {
        if (Number.isNaN(this.#fit)) { return NaN; }
        let residual = NaN;
        let smallest = Infinity;
        for (const note of this.#scale) {
            const deviation = wrapOctave(cents - this.#fit - note);
            if (Math.abs(deviation) < smallest) {
                smallest = Math.abs(deviation);
                residual = deviation;
            }
        }
        return residual;
    }

    /**
     * Median absolute deviation of the window's residuals, robust against stray detections. The
     * window was already brought up to date by the key fit made at the same time.
     */
    #spread() {
        const available = this.#times.length - this.#head;
        if (this.#scratch.length < available) { this.#scratch = new Float64Array(2 * available); }
        const values = this.#scratch;
        let count = 0;
        for (let i = this.#head; i < this.#times.length; i++) {
            if (!Number.isNaN(this.#residuals[i])) { values[count++] = this.#residuals[i]; }
        }
        if (count < this.#minDetections) { return NaN; }
        const centre = medianInPlace(values, count);
        for (let i = 0; i < count; i++) { values[i] = Math.abs(values[i] - centre); }
        return medianInPlace(values, count);
    }
}
