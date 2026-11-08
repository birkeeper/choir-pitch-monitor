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
    KEY_FIT_RIVAL_RATIO, KEY_FIT_RIVAL_RANGE, KEY_FIT_MIN_DETECTIONS, KEY_FIT_WINDOW_DEFAULT,
} from '../constants.js';

const OCTAVE = 1200;
const MAJOR_STEPS = [0, 2, 4, 5, 7, 9, 11];

/**
 * Key signatures offered to the user, in menu order: 'none' (every semitone), then sharps down to
 * no accidentals and on through the flats. 6# and 6b are the same pitch classes (F# / Gb major).
 */
export const KEY_SIGNATURES = [
    'none', '6#', '5#', '4#', '3#', '2#', '1#', '0', '1b', '2b', '3b', '4b', '5b', '6b',
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
    const match = /^([0-6])([#b]?)$/.exec(key);
    if (!match) { throw new Error(`unknown key signature: ${key}`); }
    const count = Number(match[1]);
    const tonic = mod((match[2] === 'b' ? -7 : 7) * count, 12);
    return MAJOR_STEPS.map((step) => 100 * mod(tonic + step, 12)).sort((a, b) => a - b);
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

/** Median of the first `count` values; sorts them in place. */
function medianInPlace(values, count) {
    const sorted = values.subarray(0, count).sort();
    const middle = count >> 1;
    return count % 2 ? sorted[middle] : 0.5 * (sorted[middle - 1] + sorted[middle]);
}

export class EnsembleTracker {
    #window;
    #scale;
    #template;

    // Detections of the last #window seconds, oldest first, from #head on: time, folded cents
    // rounded to a histogram bin, unrounded folded cents, and the residual against the key fit
    // (NaN while there is no fit). Plain arrays, compacted now and then.
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
     * @param {number} time s
     * @param {ArrayLike<number>} frequencies Hz, the pitches detected in this frame
     * @param {ArrayLike<number>} saliences their salience, used to keep the strongest
     *   MAX_FRAME_PITCHES when a frame holds more
     * @returns {{time:number, keyDrift:number, spread:number}[]} the fits that fell due, usually
     *   none or one. keyDrift is NaN when the window held too few detections to fit (the held fit
     *   is still used for the spread), and NaN until the first fit; spread is NaN when too few
     *   residuals were available.
     */
    push(time, frequencies, saliences) {
        const results = [];
        if (this.#firstFit === null) {
            if (frequencies.length === 0) { return results; }
            this.#firstFit = time + this.#window;
        }

        // Fits due before this frame see only earlier frames.
        while (this.#nextFitTime() < time) {
            results.push(this.#fitAt(this.#nextFitTime()));
        }

        const added = this.#add(time, frequencies, saliences);
        // A fit due at exactly this frame's time includes it, as the script's window does.
        const fitNow = this.#nextFitTime() <= time;
        let keyDrift;
        if (fitNow) { keyDrift = this.#fitKey(this.#nextFitTime()); }
        // Residuals use the latest fit made at or before this frame.
        for (let i = this.#times.length - added; i < this.#times.length; i++) {
            this.#residuals[i] = this.#residualOf(this.#cents[i]);
        }
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

    /** Append this frame's usable detections; returns how many were added. */
    #add(time, frequencies, saliences) {
        let order = Array.from({ length: frequencies.length }, (_, i) => i);
        if (order.length > MAX_FRAME_PITCHES) {
            order = order.sort((a, b) => saliences[b] - saliences[a]).slice(0, MAX_FRAME_PITCHES);
        }
        let added = 0;
        for (const i of order) {
            const frequency = frequencies[i];
            if (!(frequency >= ENSEMBLE_F_MIN && frequency <= ENSEMBLE_F_MAX)) { continue; }
            const cents = foldedCents(frequency);
            const bin = mod(Math.round(cents), OCTAVE);
            this.#times.push(time);
            this.#cents.push(cents);
            this.#bins.push(bin);
            this.#residuals.push(NaN);
            this.#histogram[bin]++;
            added++;
        }
        return added;
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
        if (this.#times.length - this.#head < KEY_FIT_MIN_DETECTIONS) { return NaN; }

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
        if (count < KEY_FIT_MIN_DETECTIONS) { return NaN; }
        const centre = medianInPlace(values, count);
        for (let i = 0; i < count; i++) { values[i] = Math.abs(values[i] - centre); }
        return medianInPlace(values, count);
    }
}
