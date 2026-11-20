// Pitch tracks, found causally: SORT (Bewley et al., 2016, "Simple Online and Realtime Tracking") in
// one dimension, with pitch in cents as the only coordinate.
//
// Why: the first moments of a sung note are unreliable (the pitch scoops towards the note), and
// some detections are not a sung note at all. Following each note as a track lets the ensemble
// measurement skip the start of every note and ignore detections that never form a track.
//
// Every frame, each live track predicts its pitch with a constant-velocity Kalman filter. The
// frame's detections are assigned to the tracks with the Hungarian algorithm on the distance in
// cents between detection and prediction; a pair further apart than the maximum distance cannot be
// assigned. Assigned tracks are updated, unassigned detections start new tracks, and a track that
// has gone unassigned for more than the allowed gap ends.
//
// A track is confirmed at its TRACK_MIN_HITS-th detection; one that ends before is discarded. That
// is the only thing a real-time run cannot know in advance, so samples of a track are held back
// until it is confirmed and then released together, with their own frame numbers. The latest
// release is therefore at most the confirmation delay late (min hits plus gaps), never earlier than
// the frame itself, and a sample is only ever released if it belongs to a track that lived long
// enough. A sample is masked while it is within the mask of its track's first frame, whether or
// not the track is confirmed; the mask counts from that first frame only, so a track that resumes
// after a gap is not masked again.

import {
    REFERENCE_A4, TRACK_MAX_GAP_FRAMES, TRACK_MASK_FRAMES, TRACK_MAX_DISTANCE_CENTS, TRACK_MIN_HITS,
    TRACK_MEASUREMENT_STD_CENTS, TRACK_ACCELERATION_STD, TRACK_INITIAL_VELOCITY_STD,
} from '../constants.js';

/** Absolute pitch in cents on the MIDI scale (6900 = A4). */
export function frequencyToCents(frequency) {
    return 100 * (69 + 12 * Math.log2(frequency / REFERENCE_A4));
}

/** Cost of an assignment that is not allowed. Larger than any allowed distance. */
const FORBIDDEN = 1e6;

/**
 * Minimum-cost assignment of rows to columns (rectangular; O(n^3) potentials method).
 * @param {number[][]} cost rows x cols
 * @returns {number[]} for each row its column, or -1 where it got none
 */
export function assign(cost, rows, cols) {
    if (rows === 0 || cols === 0) { return new Array(rows).fill(-1); }
    if (rows > cols) {
        const transposed = Array.from({ length: cols }, (_, j) =>
            Array.from({ length: rows }, (_, i) => cost[i][j]));
        const rowOfCol = assign(transposed, cols, rows);
        const colOfRow = new Array(rows).fill(-1);
        rowOfCol.forEach((row, col) => { if (row >= 0) { colOfRow[row] = col; } });
        return colOfRow;
    }
    const u = new Float64Array(rows + 1);
    const v = new Float64Array(cols + 1);
    const matched = new Int32Array(cols + 1);   // row matched to each column, 1-based; 0 if none
    const way = new Int32Array(cols + 1);
    for (let i = 1; i <= rows; i++) {
        matched[0] = i;
        let j0 = 0;
        const minimum = new Float64Array(cols + 1).fill(Infinity);
        const used = new Uint8Array(cols + 1);
        do {
            used[j0] = 1;
            const i0 = matched[j0];
            let delta = Infinity;
            let j1 = 0;
            for (let j = 1; j <= cols; j++) {
                if (used[j]) { continue; }
                const reduced = cost[i0 - 1][j - 1] - u[i0] - v[j];
                if (reduced < minimum[j]) { minimum[j] = reduced; way[j] = j0; }
                if (minimum[j] < delta) { delta = minimum[j]; j1 = j; }
            }
            for (let j = 0; j <= cols; j++) {
                if (used[j]) { u[matched[j]] += delta; v[j] -= delta; } else { minimum[j] -= delta; }
            }
            j0 = j1;
        } while (matched[j0] !== 0);
        do {
            const j1 = way[j0];
            matched[j0] = matched[j1];
            j0 = j1;
        } while (j0);
    }
    const colOfRow = new Array(rows).fill(-1);
    for (let j = 1; j <= cols; j++) { if (matched[j]) { colOfRow[matched[j] - 1] = j - 1; } }
    return colOfRow;
}

/**
 * @typedef {object} PitchSample
 * @property {number} frame      frame the detection was made in
 * @property {number} frequency  Hz
 * @property {number} salience
 * @property {number} track      id of the track it belongs to
 * @property {boolean} masked    within the mask of the track's first frame
 */

export class PitchTracker {
    #maxGap;
    #maskFrames;
    #maxDistance;
    #minHits;
    #live = [];
    #nextId = 0;

    /**
     * @param {object} [options] all in frames, except maxDistance in cents
     * @param {number} [options.maxGapFrames]
     * @param {number} [options.maskFrames]
     * @param {number} [options.maxDistance]
     * @param {number} [options.minHits]
     */
    constructor({
        maxGapFrames = TRACK_MAX_GAP_FRAMES,
        maskFrames = TRACK_MASK_FRAMES,
        maxDistance = TRACK_MAX_DISTANCE_CENTS,
        minHits = TRACK_MIN_HITS,
    } = {}) {
        this.#maxGap = maxGapFrames;
        this.#maskFrames = maskFrames;
        this.#maxDistance = maxDistance;
        this.#minHits = minHits;
    }

    /**
     * Feed one frame. Every frame must be fed, in order, silent ones with empty lists.
     *
     * @param {number} frame frame number
     * @param {ArrayLike<number>} frequencies Hz, the detections of this frame
     * @param {ArrayLike<number>} saliences
     * @returns {PitchSample[]} the samples that became known to belong to a confirmed track in this
     *   frame: this frame's samples of tracks already confirmed, plus all the held-back samples of
     *   tracks confirmed now. Oldest first within a track; not ordered across tracks.
     */
    push(frame, frequencies, saliences) {
        const released = [];
        const R = TRACK_MEASUREMENT_STD_CENTS ** 2;
        const Q = TRACK_ACCELERATION_STD ** 2;
        const live = this.#live;
        const count = frequencies.length;
        const cents = Array.from(frequencies, frequencyToCents);

        for (const t of live) {
            t.x += t.v;
            const { p00, p01, p11 } = t;
            t.p00 = p00 + 2 * p01 + p11 + 0.25 * Q;
            t.p01 = p01 + p11 + 0.5 * Q;
            t.p11 = p11 + Q;
        }

        const cost = live.map((t) => cents.map((z) => {
            const distance = Math.abs(z - t.x);
            return distance <= this.#maxDistance ? distance : FORBIDDEN;
        }));
        const assignment = assign(cost, live.length, count);
        const taken = new Uint8Array(count);

        live.forEach((t, i) => {
            const d = assignment[i];
            if (d < 0 || cost[i][d] >= FORBIDDEN) { t.misses++; return; }
            taken[d] = 1;
            const innovation = cents[d] - t.x;
            const gain0 = t.p00 / (t.p00 + R);
            const gain1 = t.p01 / (t.p00 + R);
            t.x += gain0 * innovation;
            t.v += gain1 * innovation;
            const { p00, p01, p11 } = t;
            t.p00 = (1 - gain0) * p00;
            t.p01 = (1 - gain0) * p01;
            t.p11 = p11 - gain1 * p01;
            t.misses = 0;
            this.#hit(t, frame, frequencies[d], saliences[d], released);
        });

        for (let d = 0; d < count; d++) {
            if (taken[d]) { continue; }
            const t = {
                id: this.#nextId++, start: frame, hits: 0, misses: 0, confirmed: false, held: [],
                x: cents[d], v: 0, p00: R, p01: 0, p11: TRACK_INITIAL_VELOCITY_STD ** 2,
            };
            live.push(t);
            this.#hit(t, frame, frequencies[d], saliences[d], released);
        }

        // Tracks that have been undetected for longer than the gap end here. An unconfirmed one
        // takes its held samples with it.
        this.#live = live.filter((t) => t.misses <= this.#maxGap);
        return released;
    }

    #hit(track, frame, frequency, salience, released) {
        track.hits++;
        const sample = {
            frame, frequency, salience, track: track.id,
            masked: frame - track.start < this.#maskFrames,
        };
        if (track.confirmed) {
            released.push(sample);
            return;
        }
        track.held.push(sample);
        if (track.hits >= this.#minHits) {
            track.confirmed = true;
            released.push(...track.held);
            track.held = [];
        }
    }
}
