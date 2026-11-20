// The pitch chart's data, from the samples the pitch tracker found and the key fits.

import { REFERENCE_A4, FRAME_DURATION } from '../constants.js';
import { nearestScaleNote } from '../worker/ensemble.js';

/**
 * The pitch chart's data: the samples that belong to tracks, each with the pitch to plot it at and
 * its deviation from equal temperament, and a lookup of the notes in a frame.
 *
 * A sample is named, and coloured, by its nearest scale note once the key drift is taken out, with
 * the drift in effect at its frame: the latest key fit made at or before it, held across skipped
 * fits, and 0 before the first.
 *
 * @returns {{count:number, frame:Int32Array, semitone:Float32Array, equalCents:Float32Array,
 *            notesAt:(frame:number)=>{text:string, equalCents:number}[]}}
 */
export function buildPitchData(samples, ensemble, spelling, frames) {
    const { time, keyDrift } = ensemble;
    const frameDrift = new Float32Array(frames);
    let fit = -1;
    let held = 0;
    for (let frame = 0; frame < frames; frame++) {
        while (fit + 1 < time.length && time[fit + 1] <= frame * FRAME_DURATION + 1e-9) {
            fit++;
            if (Number.isFinite(keyDrift[fit])) { held = keyDrift[fit]; }
        }
        frameDrift[frame] = held;
    }

    const { count, frame, frequency } = samples;
    // samples are ordered by frame, so a frame's samples are the run from frameStart[frame].
    const frameStart = new Int32Array(frames + 1);
    for (let i = 0; i < count; i++) { frameStart[frame[i] + 1]++; }
    for (let f = 0; f < frames; f++) { frameStart[f + 1] += frameStart[f]; }

    const semitone = new Float32Array(count);
    const equalCents = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        const drift = frameDrift[frame[i]];
        semitone[i] = 69 + 12 * Math.log2(frequency[i] / REFERENCE_A4);
        equalCents[i] = nearestScaleNote(frequency[i], drift, spelling).cents + drift;
    }

    // The text is measured from the scale note with the drift taken out; the colour from equal
    // temperament, i.e. with the drift put back.
    const notesAt = (at) => {
        if (at < 0 || at >= frames) { return []; }
        const notes = [];
        for (let i = frameStart[at]; i < frameStart[at + 1]; i++) {
            const { name, cents } = nearestScaleNote(frequency[i], frameDrift[at], spelling);
            const rounded = Math.round(cents);
            notes.push({
                text: `${name} ${rounded > 0 ? '+' : ''}${rounded}`,
                equalCents: equalCents[i],
            });
        }
        return notes;
    };
    return { count, frame, semitone, equalCents, notesAt };
}
