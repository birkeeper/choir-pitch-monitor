// Run worker/ensemble.js over a per-frame note CSV, without pitch tracking.
//
//   node tests/ensemble-reference.mjs <frame_notes.csv> [key] [other keys] > out.csv
//
// key is the starting key, one of KEY_SIGNATURES, default '3b'; other keys is a comma-separated
// list of the keys the song changes to, default none. Writes time_s,key_drift,spread,key, with NaN
// where there is no value. Revised fits (after a key change) overwrite the first values.
//
// The CSV is the "notes per frame" download: time_s followed by f0, note and cents for up to eight
// pitches, already the most salient ones, so every pitch is passed with equal salience. With no
// pitch tracks, every sample's frame is a possible start of a key change.
//
// The tracker was ported from scripts/script_analyse_ensemble_drift.m, but it has since grown two
// windows and key changes, so its output no longer matches the script's.

import { readFileSync } from 'node:fs';
import { FRAME_RATE } from '../constants.js';
import { EnsembleTracker, usableIndices } from '../worker/ensemble.js';

const [file, key = '3b', others = ''] = process.argv.slice(2);
if (!file) {
    console.error('usage: node tests/ensemble-reference.mjs <frame_notes.csv> [key] [other keys]');
    process.exit(1);
}

const tracker = new EnsembleTracker({ key, keys: others ? others.split(',') : [] });
const rows = readFileSync(file, 'utf8').trim().split('\n').slice(1);
const fits = [];
let previous = -1;
for (const row of rows) {
    const fields = row.split(',');
    const frequencies = [];
    for (let column = 1; column < fields.length; column += 3) {
        if (fields[column] !== '') { frequencies.push(Number(fields[column])); }
    }
    // Frames must increase; rounding the CSV's time stamps could repeat one.
    const frame = Math.max(previous + 1, Math.round(Number(fields[0]) * FRAME_RATE));
    previous = frame;
    const usable = usableIndices(frequencies, frequencies.map(() => 1));
    for (const fit of tracker.push(frame, usable.map((i) => frequencies[i]))) { fits[fit.index] = fit; }
}
const format = (value) => (Number.isNaN(value) ? 'NaN' : value.toFixed(6));
const lines = ['time_s,key_drift,spread,key'];
for (const fit of fits) {
    lines.push(`${fit.time.toFixed(6)},${format(fit.keyDrift)},${format(fit.spread)},${fit.key}`);
}
process.stdout.write(lines.join('\n') + '\n');
