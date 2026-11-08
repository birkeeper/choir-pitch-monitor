// Run worker/ensemble.js over a per-frame note CSV, for comparison with
// scripts/script_analyse_ensemble_drift.m on the same file.
//
//   node tests/ensemble-reference.mjs <frame_notes.csv> [key] [window_s] > out.csv
//
// key is one of KEY_SIGNATURES ('none', '0', '1#'..'6#', '1b'..'6b'), default '3b' (the script's
// scaleK); window is WK in seconds, default 2. Writes tk,key_drift,mad_k -- the script's tk,
// key_drift and mad_k -- with NaN where the script has NaN.
//
// The CSV is the "notes per frame" download: time_s followed by f0, note and cents for up to eight
// pitches, already the most salient ones, so every pitch is passed with equal salience.

import { readFileSync } from 'node:fs';
import { EnsembleTracker } from '../worker/ensemble.js';

const [file, key = '3b', window = '2'] = process.argv.slice(2);
if (!file) {
    console.error('usage: node tests/ensemble-reference.mjs <frame_notes.csv> [key] [window_s]');
    process.exit(1);
}

const tracker = new EnsembleTracker({ key, window: Number(window) });
const rows = readFileSync(file, 'utf8').trim().split('\n').slice(1);
const lines = ['tk,key_drift,mad_k'];
const format = (value) => (Number.isNaN(value) ? 'NaN' : value.toFixed(6));

for (const row of rows) {
    const fields = row.split(',');
    const frequencies = [];
    for (let column = 1; column < fields.length; column += 3) {
        if (fields[column] !== '') { frequencies.push(Number(fields[column])); }
    }
    const saliences = frequencies.map(() => 1);
    for (const fit of tracker.push(Number(fields[0]), frequencies, saliences)) {
        lines.push(`${fit.time.toFixed(6)},${format(fit.keyDrift)},${format(fit.spread)}`);
    }
}
process.stdout.write(lines.join('\n') + '\n');
