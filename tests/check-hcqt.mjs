// Compare worker/hcqt.js against the Python reference, stage by stage.
//
// Runs in Node rather than a browser: the HCQT is plain arithmetic with no browser dependency, and
// a command-line run is far quicker to iterate on. The browser page tests/test-model.html covers
// the parts that do need a browser (TF.js backends).
//
// Regenerate the fixtures first:
//   cd ~/Documents/git/multif0-estimation-polyvocals
//   .venv/bin/python ../choir-pitch-monitor/tools/make_reference.py \
//       --repo . --audio finetune/data/parijs_take02.wav \
//       --outdir ../choir-pitch-monitor/tests/fixtures
//
// Usage: node tests/check-hcqt.mjs

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { HcqtExtractor } from '../worker/hcqt.js';
import { N_BINS, HARMONICS, SAMPLE_RATE, HOP_LENGTH } from '../constants.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const fixtures = join(here, 'fixtures');

function readFloat32(path) {
    const buffer = readFileSync(path);
    return new Float32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / 4);
}

function fail(message) {
    console.error(`\x1b[31m${message}\x1b[0m`);
    process.exitCode = 1;
}

if (!existsSync(join(fixtures, 'reference.json'))) {
    fail('tests/fixtures/reference.json missing -- run tools/make_reference.py first '
        + '(see the header of this file).');
    process.exit(1);
}

const reference = JSON.parse(readFileSync(join(fixtures, 'reference.json'), 'utf8'));
const audio = readFloat32(join(fixtures, 'audio.f32'));
const expectedMag = readFloat32(join(fixtures, 'hcqt-mag.f32'));
const expectedDphase = readFloat32(join(fixtures, 'hcqt-dphase.f32'));

console.log(`audio: ${audio.length} samples (${(audio.length / SAMPLE_RATE).toFixed(2)} s)`);

// --- frame accounting ---------------------------------------------------------------------------
// A mismatch here misaligns everything downstream, so it is checked before any arithmetic.
const segments = HcqtExtractor.segments(audio.length);
const totalFrames = HcqtExtractor.totalFrames(audio.length);
console.log(`segments: ${segments.length}`);
for (const segment of segments) {
    console.log(`  samples ${segment.start}-${segment.end} `
        + `(context ${segment.ctxStart}-${segment.ctxEnd}), `
        + `leftTrim ${segment.leftTrim}, frames ${segment.frames}`);
}
if (totalFrames !== reference.frames) {
    fail(`FAIL frame count: JS ${totalFrames} vs Python ${reference.frames}`);
    process.exit(1);
}
console.log(`frames: ${totalFrames} (matches Python)\n`);

// --- run the port -------------------------------------------------------------------------------
const manifest = JSON.parse(readFileSync(join(root, 'model', 'filters.json'), 'utf8'));
const filterBuffer = readFileSync(join(root, 'model', 'filters.bin'));
const extractor = new HcqtExtractor(
    manifest,
    filterBuffer.buffer.slice(filterBuffer.byteOffset,
        filterBuffer.byteOffset + filterBuffer.byteLength),
);

const started = performance.now();
const { mag, dphase, frames } = await extractor.extract(audio);
const elapsed = (performance.now() - started) / 1000;
const audioSeconds = audio.length / SAMPLE_RATE;
console.log(`extracted in ${elapsed.toFixed(2)} s `
    + `-> ${(audioSeconds / elapsed).toFixed(2)}x real-time (single-threaded JS)\n`);

// --- compare ------------------------------------------------------------------------------------
const nHarmonics = HARMONICS.length;

/**
 * Python stores (frames, bins, harmonics); the port stores (bins, frames, harmonics).
 * Walk both in the port's order and index the reference accordingly.
 */
function compare(label, actual, expected, options = {}) {
    const { audibleFrom } = options;
    let maxError = 0;
    let sumError = 0;
    let count = 0;
    let audibleMax = 0;
    let audibleSum = 0;
    let audibleCount = 0;
    let worst = null;

    for (let bin = 0; bin < N_BINS; bin++) {
        for (let frame = 0; frame < frames; frame++) {
            for (let harmonic = 0; harmonic < nHarmonics; harmonic++) {
                const actualIndex = (bin * frames + frame) * nHarmonics + harmonic;
                const expectedIndex = (frame * N_BINS + bin) * nHarmonics + harmonic;
                const reference = expected[expectedIndex];
                const error = Math.abs(actual[actualIndex] - reference);
                maxError = Math.max(maxError, error);
                if (error === maxError) { worst = { bin, frame, harmonic, reference }; }
                sumError += error;
                count++;
                if (audibleFrom !== undefined && reference > audibleFrom) {
                    audibleMax = Math.max(audibleMax, error);
                    audibleSum += error;
                    audibleCount++;
                }
            }
        }
    }

    console.log(`${label}:`);
    console.log(`  all cells      mean ${(sumError / count).toExponential(3)}  `
        + `max ${maxError.toExponential(3)}`);
    if (audibleFrom !== undefined) {
        console.log(`  above ${audibleFrom}      mean ${(audibleSum / audibleCount).toExponential(3)}  `
            + `max ${audibleMax.toExponential(3)}  `
            + `(${((100 * audibleCount) / count).toFixed(0)}% of cells)`);
    }
    console.log(`  worst cell     bin ${worst.bin} frame ${worst.frame} `
        + `harmonic ${worst.harmonic} (reference ${worst.reference.toFixed(3)})`);
    return { maxError, meanError: sumError / count, audibleMax, audibleMean: audibleSum / audibleCount };
}

// Magnitude is in dB. The floor is -80 and errors there cannot reach the model in any meaningful
// way, so the audible subset is the number that matters.
const magStats = compare('hcqt magnitude (dB)', mag, expectedMag, { audibleFrom: -60 });
console.log();
const dphaseStats = compare('hcqt dphase (rad)', dphase, expectedDphase);

// A phase difference of -pi and one of +pi describe the same rotation, but they are different
// numbers, and the model consumes the number. Report how many cells sit on that boundary so a
// handful of legitimate wraps is not confused with a systematic error -- and so the reverse, a
// systematic error, cannot hide behind the explanation.
let wrapped = 0;
let large = 0;
for (let i = 0; i < dphase.length; i++) {
    const bin = Math.floor(i / (frames * nHarmonics));
    const rest = i - bin * frames * nHarmonics;
    const frame = Math.floor(rest / nHarmonics);
    const harmonic = rest - frame * nHarmonics;
    const error = Math.abs(dphase[i] - expectedDphase[(frame * N_BINS + bin) * nHarmonics + harmonic]);
    if (error > 1) { large++; }
    if (Math.abs(error - 2 * Math.PI) < 0.01) { wrapped++; }
}
console.log(`  cells with error > 1 rad: ${large} of ${dphase.length} `
    + `(${((100 * large) / dphase.length).toFixed(3)}%), of which ${wrapped} are exact 2*pi wraps`);
console.log(`  mean error excluding wraps: `
    + `${((dphaseStats.meanError * dphase.length - wrapped * 2 * Math.PI) / (dphase.length - wrapped)).toExponential(3)}`);
console.log();

// Targets from PLAN.md section 5.
const MAG_TARGET = 0.5;      // dB, mean over audible cells
const DPHASE_TARGET = 0.05;  // rad, mean

let ok = true;
if (!(magStats.audibleMean < MAG_TARGET)) {
    fail(`FAIL magnitude: mean audible error ${magStats.audibleMean.toFixed(4)} dB `
        + `exceeds target ${MAG_TARGET} dB`);
    ok = false;
}
if (!(dphaseStats.meanError < DPHASE_TARGET)) {
    fail(`FAIL dphase: mean error ${dphaseStats.meanError.toFixed(4)} rad `
        + `exceeds target ${DPHASE_TARGET} rad`);
    ok = false;
}
if (ok) {
    console.log('\x1b[32mPASS\x1b[0m  both stages within the targets in PLAN.md section 5');
}
