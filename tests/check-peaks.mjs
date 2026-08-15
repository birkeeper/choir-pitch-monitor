// Check worker/notes.js against utils_train.pitch_activations_to_mf0.
//
// Runs on the Python reference salience map, so this isolates peak picking from the feature
// extractor and the model: with identical input, the detected set must be identical, not merely
// close. Refinement is then applied to the same peaks to show what it buys.
//
// Usage: node tests/check-peaks.mjs   (after tools/make_reference.py)

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { extractPeaks, ensembleDrift, wrapCents } from '../worker/notes.js';
import { CENTS_PER_BIN } from '../constants.js';

const here = dirname(fileURLToPath(import.meta.url));
const fixtures = join(here, 'fixtures');

if (!existsSync(join(fixtures, 'reference.json'))) {
    console.error('tests/fixtures/reference.json missing -- run tools/make_reference.py first.');
    process.exit(1);
}

const reference = JSON.parse(readFileSync(join(fixtures, 'reference.json'), 'utf8'));
const buffer = readFileSync(join(fixtures, 'salience.f32'));
const salience = new Float32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / 4);
const [bins, frames] = reference.salience.shape;
console.log(`salience: ${bins} bins x ${frames} frames, threshold ${reference.peaks.threshold}`);

// --- exact agreement, refinement off ---------------------------------------------------------
const raw = extractPeaks(salience, frames, {
    threshold: reference.peaks.threshold,
    refine: false,
});

const expected = readFileSync(join(fixtures, 'peaks.csv'), 'utf8')
    .trim().split('\n').slice(1)
    .map((line) => {
        const [frame, freq] = line.split(',');
        return { frame: Number(frame), freq: Number(freq) };
    });

console.log(`peaks: JS ${raw.count}, Python ${expected.length}`);

let mismatches = 0;
let maxFreqError = 0;
if (raw.count !== expected.length) {
    console.error(`\x1b[31mFAIL: peak counts differ\x1b[0m`);
    mismatches = Math.abs(raw.count - expected.length);
} else {
    for (let i = 0; i < expected.length; i++) {
        if (raw.frame[i] !== expected[i].frame) {
            if (mismatches < 5) {
                console.error(`  frame mismatch at ${i}: JS ${raw.frame[i]} vs `
                    + `Python ${expected[i].frame}`);
            }
            mismatches++;
            continue;
        }
        // Both should be exact bin-centre frequencies from the same grid formula.
        const error = Math.abs(raw.frequency[i] - expected[i].freq);
        maxFreqError = Math.max(maxFreqError, error / expected[i].freq);
    }
}

if (mismatches === 0) {
    console.log(`\x1b[32mPASS\x1b[0m  identical peak set; max relative frequency difference `
        + `${maxFreqError.toExponential(2)}`);
} else {
    console.error(`\x1b[31mFAIL\x1b[0m  ${mismatches} mismatched peaks`);
    process.exitCode = 1;
}

// --- what refinement changes -------------------------------------------------------------------
const refined = extractPeaks(salience, frames, {
    threshold: reference.peaks.threshold,
    refine: true,
});

const rawDistinct = new Set();
for (let i = 0; i < raw.count; i++) { rawDistinct.add(raw.cents[i].toFixed(3)); }

let sumShift = 0;
let maxShift = 0;
for (let i = 0; i < refined.count; i++) {
    const shift = Math.abs(wrapCents(refined.cents[i] - raw.cents[i]));
    sumShift += shift;
    maxShift = Math.max(maxShift, shift);
}

console.log(`\nsub-bin refinement (PLAN.md section 2.4):`);
console.log(`  without it, deviation takes ${rawDistinct.size} distinct values: `
    + `${[...rawDistinct].map(Number).sort((a, b) => a - b).join(', ')} cents`);
console.log(`  grid resolution is ${CENTS_PER_BIN} cents per bin`);
console.log(`  refinement moves each peak by ${(sumShift / refined.count).toFixed(2)} cents on `
    + `average, at most ${maxShift.toFixed(2)}`);

const histogram = new Map();
for (let i = 0; i < refined.count; i++) {
    const bucket = Math.round(refined.cents[i] / 5) * 5;
    histogram.set(bucket, (histogram.get(bucket) || 0) + 1);
}
console.log('\n  refined deviation histogram (5-cent buckets):');
for (const bucket of [...histogram.keys()].sort((a, b) => a - b)) {
    const count = histogram.get(bucket);
    const bar = '#'.repeat(Math.max(1, Math.round((60 * count) / refined.count)));
    console.log(`   ${String(bucket).padStart(4)} c  ${String(count).padStart(5)}  ${bar}`);
}

// --- drift ---------------------------------------------------------------------------------------
console.log('\nensemble drift, by smoothing window:');
for (const windowFrames of [43, 173, 431]) {
    const drift = ensembleDrift(refined, frames, windowFrames);
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    let concentration = 0;
    for (let frame = 0; frame < frames; frame++) {
        min = Math.min(min, drift.cents[frame]);
        max = Math.max(max, drift.cents[frame]);
        sum += drift.cents[frame];
        concentration += drift.concentration[frame];
    }
    console.log(`  ${(windowFrames / 86.13).toFixed(1)}s window: `
        + `mean ${(sum / frames).toFixed(2)} c, `
        + `range [${min.toFixed(1)}, ${max.toFixed(1)}] c, `
        + `mean concentration ${(concentration / frames).toFixed(3)}`);
}
console.log('  (concentration near 0 means the sounding notes disagree about where the semitone');
console.log('   grid sits, so the drift angle carries little information)');
