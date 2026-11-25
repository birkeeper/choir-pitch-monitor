// From a recording's detections to the ensemble's drift, spread and key, as a live run would produce it.
//
// Detections go frame by frame into the pitch tracker (SORT). What it finds to belong to a confirmed
// track, and not to be within the mask of the track's start, is what the ensemble tracker gets; all
// else is left out. Every frame is fed, silent ones included, and nothing is looked up from later
// frames, so the numbers at any moment only depend on the audio before it -- apart from the
// revisions the ensemble tracker makes once a key change is confirmed, which replace the fits since
// the change began (live, those are shown first as measured and then corrected; here only the
// corrected values are kept). That makes a full re-run cheap enough to repeat whenever the keys change.

import { EnsembleTracker, usableIndices } from './ensemble.js';
import { PitchTracker } from './pitch-tracker.js';

/**
 * @param {{frame:Int32Array, frequency:Float64Array, salience:Float32Array, count:number}} peaks
 *   detections ordered by frame, from extractPeaks
 * @param {number} frames number of frames in the recording
 * @param {object} options
 * @param {string} options.key the starting key, one of KEY_SIGNATURES
 * @param {string[]} [options.keys=[]] the other keys the song changes to
 * @param {object} [options.tracking] overrides for PitchTracker's options
 * @returns {{time:number[], keyDrift:number[], spread:number[], key:string[], keyName:string[],
 *            samples:{count:number, frame:Int32Array, frequency:Float64Array, masked:Uint8Array,
 *                     track:Int32Array}}}
 *   one entry per fit (see EnsembleTracker.push), and the samples that belong to tracks, masked
 *   ones included, ordered by frame and then by frequency
 */
export function trackEnsemble(peaks, frames, { key, keys = [], tracking }) {
    const pitchTracker = new PitchTracker(tracking);
    const ensemble = new EnsembleTracker({ key, keys });
    const fits = [];
    const all = [];

    let i = 0;
    for (let frame = 0; frame < frames; frame++) {
        const first = i;
        while (i < peaks.count && peaks.frame[i] === frame) { i++; }
        const frequencies = peaks.frequency.subarray(first, i);
        const saliences = peaks.salience.subarray(first, i);
        const usable = usableIndices(frequencies, saliences);

        const released = pitchTracker.push(frame,
            usable.map((k) => frequencies[k]), usable.map((k) => saliences[k]));
        const used = released.filter((sample) => !sample.masked);
        // A revised fit replaces the one with the same index.
        for (const fit of ensemble.push(frame, used.map((sample) => sample.frequency),
            used.map((sample) => sample.frame), used.map((sample) => sample.track))) {
            fits[fit.index] = fit;
        }
        all.push(...released);
    }

    all.sort((a, b) => a.frame - b.frame || a.frequency - b.frequency);
    return {
        time: fits.map((fit) => fit.time),
        keyDrift: fits.map((fit) => fit.keyDrift),
        spread: fits.map((fit) => fit.spread),
        key: fits.map((fit) => fit.key),
        keyName: fits.map((fit) => fit.keyName),
        samples: {
            count: all.length,
            frame: Int32Array.from(all, (sample) => sample.frame),
            frequency: Float64Array.from(all, (sample) => sample.frequency),
            masked: Uint8Array.from(all, (sample) => (sample.masked ? 1 : 0)),
            track: Int32Array.from(all, (sample) => sample.track),
        },
    };
}
