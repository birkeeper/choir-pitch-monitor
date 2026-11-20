// Core of the onset-tracking investigation: .npz loading, f0 peak picking and 1D SORT tracking.
// Plain script (no imports) so it can be inlined into the standalone HTML page and also be
// require()d from node for testing.
//
// f0 detection is a port of worker/notes.js (extractFramePeaks): strict local maximum along
// frequency, salience >= threshold, parabolic sub-bin refinement. Keep the two in sync.

const OT = (function () {
    'use strict';

    // --- constants shared with ../../constants.js -----------------------------------------------
    const F_MIN = 27.5;
    const A0_BIN = 0;
    const BINS_PER_OCTAVE = 36;
    const REFERENCE_A4 = 440;
    const FRAME_DURATION = 256 / 22050;

    // --- SORT tuning that is NOT exposed as a slider ----------------------------------------------
    // Units: cents, frames. State is [f0 (cents), velocity (cents/frame)], constant velocity model.
    const KALMAN = {
        sigmaAccel: 2,          // cents/frame^2, std of the random acceleration (process noise)
        measurementStd: 25,     // cents, std of a measured f0 around the true pitch
        initialVelocityStd: 15, // cents/frame, uncertainty of velocity of a fresh track
    };

    // --- .npz / .npy parsing ----------------------------------------------------------------------

    async function inflateRaw(bytes) {
        const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
        return new Uint8Array(await new Response(stream).arrayBuffer());
    }

    /** @returns {Promise<Object<string,Uint8Array>>} file name -> bytes */
    async function readZip(buffer) {
        const bytes = new Uint8Array(buffer);
        const view = new DataView(buffer);
        let eocd = -1;
        for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
            if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
        }
        if (eocd < 0) { throw new Error('Not a zip/npz file (no end-of-central-directory record).'); }
        const count = view.getUint16(eocd + 10, true);
        let p = view.getUint32(eocd + 16, true);
        const files = {};
        const decoder = new TextDecoder();
        for (let n = 0; n < count; n++) {
            if (view.getUint32(p, true) !== 0x02014b50) { throw new Error('Corrupt zip directory.'); }
            const method = view.getUint16(p + 10, true);
            const compSize = view.getUint32(p + 20, true);
            const nameLen = view.getUint16(p + 28, true);
            const extraLen = view.getUint16(p + 30, true);
            const commentLen = view.getUint16(p + 32, true);
            const localOffset = view.getUint32(p + 42, true);
            const name = decoder.decode(bytes.subarray(p + 46, p + 46 + nameLen));
            const localNameLen = view.getUint16(localOffset + 26, true);
            const localExtraLen = view.getUint16(localOffset + 28, true);
            const start = localOffset + 30 + localNameLen + localExtraLen;
            const raw = bytes.subarray(start, start + compSize);
            if (method === 0) { files[name] = raw; }
            else if (method === 8) { files[name] = await inflateRaw(raw); }
            else { throw new Error(`Unsupported zip compression method ${method} for ${name}.`); }
            p += 46 + nameLen + extraLen + commentLen;
        }
        return files;
    }

    function half(h) {
        const sign = h >> 15 ? -1 : 1;
        const exponent = (h >> 10) & 31;
        const fraction = h & 1023;
        if (exponent === 0) { return sign * 5.960464477539063e-8 * fraction; }
        if (exponent === 31) { return fraction ? NaN : sign * Infinity; }
        return sign * Math.pow(2, exponent - 25) * (1024 + fraction);
    }

    /** @returns {{shape:number[], fortran:boolean, data:Float32Array|null, text:string|null}} */
    function parseNpy(bytes) {
        if (bytes[0] !== 0x93 || String.fromCharCode(...bytes.subarray(1, 6)) !== 'NUMPY') {
            throw new Error('Not an .npy array.');
        }
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const major = bytes[6];
        const headerLength = major === 1 ? view.getUint16(8, true) : view.getUint32(8, true);
        const dataStart = (major === 1 ? 10 : 12) + headerLength;
        const header = new TextDecoder().decode(bytes.subarray(dataStart - headerLength, dataStart));
        const descr = /'descr':\s*'([^']+)'/.exec(header)[1];
        const fortran = /'fortran_order':\s*True/.test(header);
        const shape = (/'shape':\s*\(([^)]*)\)/.exec(header)[1])
            .split(',').map((s) => s.trim()).filter(Boolean).map(Number);
        const count = shape.reduce((a, b) => a * b, 1);
        const out = new Float32Array(count);
        const read = {
            '<f2': (i) => half(view.getUint16(dataStart + 2 * i, true)),
            '<f4': (i) => view.getFloat32(dataStart + 4 * i, true),
            '<f8': (i) => view.getFloat64(dataStart + 8 * i, true),
        }[descr];
        if (!read) { return { shape, fortran, data: null, text: descr }; }   // strings etc.: ignored
        for (let i = 0; i < count; i++) { out[i] = read(i); }
        return { shape, fortran, data: out, text: null };
    }

    /**
     * Load a salience map from an .npz (as written by np.savez / np.savez_compressed).
     * Required: 'salience' (2D). Optional: 'freq_grid', 'time_grid'.
     * @returns {Promise<{salience:Float32Array, nBins:number, nFrames:number,
     *                    freqs:Float64Array, times:Float64Array}>}
     *   salience is indexed [bin + nBins * frame]
     */
    async function loadNpz(buffer) {
        const files = await readZip(buffer);
        const arrays = {};
        for (const [name, bytes] of Object.entries(files)) {
            if (name.endsWith('.npy')) { arrays[name.slice(0, -4)] = parseNpy(bytes); }
        }
        const sal = arrays.salience;
        if (!sal || !sal.data || sal.shape.length !== 2) {
            throw new Error(`No 2D 'salience' array in file (found: ${Object.keys(arrays).join(', ')}).`);
        }
        const gridLength = arrays.freq_grid?.data ? arrays.freq_grid.data.length : Math.min(...sal.shape);
        const binsFirst = sal.shape[0] === gridLength;
        if (!binsFirst && sal.shape[1] !== gridLength) {
            throw new Error(`salience shape ${sal.shape} does not match freq_grid length ${gridLength}.`);
        }
        const nBins = gridLength;
        const nFrames = binsFirst ? sal.shape[1] : sal.shape[0];
        const salience = new Float32Array(nBins * nFrames);
        for (let b = 0; b < nBins; b++) {
            for (let f = 0; f < nFrames; f++) {
                // Index into the stored array, which is shape[0] x shape[1] in C or Fortran order.
                const [i, j] = binsFirst ? [b, f] : [f, b];
                const stored = sal.fortran ? i + sal.shape[0] * j : i * sal.shape[1] + j;
                salience[b + nBins * f] = sal.data[stored];
            }
        }
        const freqs = new Float64Array(nBins);
        for (let b = 0; b < nBins; b++) {
            freqs[b] = arrays.freq_grid?.data ? arrays.freq_grid.data[b] : binToFrequency(b);
        }
        const times = new Float64Array(nFrames);
        for (let f = 0; f < nFrames; f++) {
            times[f] = arrays.time_grid?.data && arrays.time_grid.data.length === nFrames
                ? arrays.time_grid.data[f] : f * FRAME_DURATION;
        }
        return { salience, nBins, nFrames, freqs, times };
    }

    // --- f0 detection (port of worker/notes.js) ---------------------------------------------------

    function binToFrequency(bin) {
        return F_MIN * Math.pow(2, (bin - A0_BIN) / BINS_PER_OCTAVE);
    }

    /** Absolute pitch in cents on the MIDI scale (6900 = A4 at 440 Hz). */
    function frequencyToCents(frequency) {
        return 100 * (69 + 12 * Math.log2(frequency / REFERENCE_A4));
    }

    function refineOffset(below, at, above) {
        const denominator = below - 2 * at + above;
        if (denominator === 0) { return 0; }
        const offset = (0.5 * (below - above)) / denominator;
        if (!Number.isFinite(offset)) { return 0; }
        return Math.max(-0.5, Math.min(0.5, offset));
    }

    /**
     * @returns {{frame:Int32Array, cents:Float64Array, salience:Float32Array,
     *            frequency:Float64Array, count:number}} ordered by frame, then ascending bin
     */
    function detectF0(map, threshold) {
        const { salience, nBins, nFrames } = map;
        const frame = [], cents = [], sal = [], freq = [];
        for (let f = 0; f < nFrames; f++) {
            const offset = nBins * f;
            for (let bin = 1; bin < nBins - 1; bin++) {
                const value = salience[offset + bin];
                if (value < threshold) { continue; }
                const below = salience[offset + bin - 1];
                const above = salience[offset + bin + 1];
                if (!(value > below && value > above)) { continue; }
                const frequency = binToFrequency(bin + refineOffset(below, value, above));
                frame.push(f);
                cents.push(frequencyToCents(frequency));
                sal.push(value);
                freq.push(frequency);
            }
        }
        return {
            frame: Int32Array.from(frame), cents: Float64Array.from(cents),
            salience: Float32Array.from(sal), frequency: Float64Array.from(freq), count: frame.length,
        };
    }

    // --- Hungarian algorithm (min-cost assignment, rectangular) -----------------------------------

    /** @returns {number[]} for each row the assigned column, or -1 */
    function hungarian(cost, rows, cols) {
        if (rows === 0 || cols === 0) { return new Array(rows).fill(-1); }
        if (rows > cols) {
            const transposed = Array.from({ length: cols }, (_, j) =>
                Array.from({ length: rows }, (_, i) => cost[i][j]));
            const colToRow = hungarian(transposed, cols, rows);
            const rowToCol = new Array(rows).fill(-1);
            colToRow.forEach((row, col) => { if (row >= 0) { rowToCol[row] = col; } });
            return rowToCol;
        }
        const INF = Infinity;
        const u = new Float64Array(rows + 1), v = new Float64Array(cols + 1);
        const p = new Int32Array(cols + 1), way = new Int32Array(cols + 1);
        for (let i = 1; i <= rows; i++) {
            p[0] = i;
            let j0 = 0;
            const minv = new Float64Array(cols + 1).fill(INF);
            const used = new Uint8Array(cols + 1);
            do {
                used[j0] = 1;
                const i0 = p[j0];
                let delta = INF, j1 = 0;
                for (let j = 1; j <= cols; j++) {
                    if (used[j]) { continue; }
                    const current = cost[i0 - 1][j - 1] - u[i0] - v[j];
                    if (current < minv[j]) { minv[j] = current; way[j] = j0; }
                    if (minv[j] < delta) { delta = minv[j]; j1 = j; }
                }
                for (let j = 0; j <= cols; j++) {
                    if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else { minv[j] -= delta; }
                }
                j0 = j1;
            } while (p[j0] !== 0);
            do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
        }
        const rowToCol = new Array(rows).fill(-1);
        for (let j = 1; j <= cols; j++) { if (p[j]) { rowToCol[p[j] - 1] = j - 1; } }
        return rowToCol;
    }

    // --- 1D SORT ----------------------------------------------------------------------------------

    /**
     * Simple Online and Realtime Tracking on a single (pitch) axis.
     *
     * Per frame: every live track predicts its pitch (constant velocity Kalman), detections are
     * assigned to tracks with the Hungarian algorithm on |detection - prediction| in cents (pairs
     * further apart than maxDistance are not allowed), assigned tracks are updated, unassigned
     * detections start new tracks, tracks that went unmatched for more than maxGapFrames frames end.
     * Tracks with fewer than minHits detections are dropped afterwards.
     *
     * @returns {{tracks:Array<{id:number, frames:number[], det:number[], cents:number[],
     *            estimate:number[]}>, detTrack:Int32Array}}
     *   estimate = filtered Kalman pitch (cents) at each detection of the track
     */
    function sortTrack(dets, nFrames, { maxDistance, maxGapFrames, minHits }) {
        const R = KALMAN.measurementStd ** 2;
        const Q = KALMAN.sigmaAccel ** 2;
        const BIG = 1e6;
        const live = [];
        const finished = [];
        let cursor = 0;

        for (let f = 0; f < nFrames; f++) {
            const first = cursor;
            while (cursor < dets.count && dets.frame[cursor] === f) { cursor++; }
            const nDet = cursor - first;

            // predict
            for (const t of live) {
                t.x += t.v;
                const { p00, p01, p11 } = t;
                t.p00 = p00 + 2 * p01 + p11 + Q * 0.25;
                t.p01 = p01 + p11 + Q * 0.5;
                t.p11 = p11 + Q;
            }

            const cost = live.map((t) => Array.from({ length: nDet }, (_, d) => {
                const distance = Math.abs(dets.cents[first + d] - t.x);
                return distance <= maxDistance ? distance : BIG;
            }));
            const assignment = hungarian(cost, live.length, nDet);
            const taken = new Uint8Array(nDet);

            live.forEach((t, i) => {
                const d = assignment[i];
                if (d >= 0 && cost[i][d] < BIG) {
                    taken[d] = 1;
                    const z = dets.cents[first + d];
                    const s = t.p00 + R;
                    const k0 = t.p00 / s, k1 = t.p01 / s;
                    const innovation = z - t.x;
                    t.x += k0 * innovation;
                    t.v += k1 * innovation;
                    const { p00, p01, p11 } = t;
                    t.p00 = (1 - k0) * p00;
                    t.p01 = (1 - k0) * p01;
                    t.p11 = p11 - k1 * p01;
                    t.misses = 0;
                    t.frames.push(f); t.det.push(first + d); t.cents.push(z); t.estimate.push(t.x);
                } else {
                    t.misses++;
                }
            });

            for (let d = 0; d < nDet; d++) {
                if (taken[d]) { continue; }
                const z = dets.cents[first + d];
                live.push({
                    x: z, v: 0, p00: R, p01: 0, p11: KALMAN.initialVelocityStd ** 2, misses: 0,
                    frames: [f], det: [first + d], cents: [z], estimate: [z],
                });
            }

            for (let i = live.length - 1; i >= 0; i--) {
                if (live[i].misses > maxGapFrames) { finished.push(live[i]); live.splice(i, 1); }
            }
        }
        finished.push(...live);

        const detTrack = new Int32Array(dets.count).fill(-1);
        const tracks = finished
            .filter((t) => t.det.length >= minHits)
            .sort((a, b) => a.frames[0] - b.frames[0])
            .map((t, id) => {
                t.det.forEach((d) => { detTrack[d] = id; });
                return { id, frames: t.frames, det: t.det, cents: t.cents, estimate: t.estimate };
            });
        return { tracks, detTrack };
    }

    // --- onset masking and spread -----------------------------------------------------------------

    function stats(values) {
        const n = values.length;
        if (n === 0) { return { n: 0, mean: NaN, std: NaN }; }
        let sum = 0;
        for (const x of values) { sum += x; }
        const mean = sum / n;
        let squares = 0;
        for (const x of values) { squares += (x - mean) ** 2; }
        return { n, mean, std: n > 1 ? Math.sqrt(squares / (n - 1)) : NaN };
    }

    /**
     * Mask the detections within maskFrames of each track's first frame and compute the spread of
     * each track with and without them. (Mask is relative to the track's first detection only; a
     * track that resumes after a gap is not masked again.)
     * Adds to each track: masked (boolean per detection), all {n,mean,std}, kept {n,mean,std}.
     */
    function maskAndSpread(tracks, maskFrames) {
        for (const t of tracks) {
            const start = t.frames[0];
            t.masked = t.frames.map((f) => f - start < maskFrames);
            t.all = stats(t.cents);
            t.kept = stats(t.cents.filter((_, i) => !t.masked[i]));
        }
    }

    return {
        KALMAN, FRAME_DURATION, loadNpz, parseNpy, readZip, detectF0, sortTrack, maskAndSpread,
        binToFrequency, frequencyToCents, hungarian,
    };
})();

if (typeof module !== 'undefined') { module.exports = OT; }
