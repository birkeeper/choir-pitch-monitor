// Check planForDevice against the texture-size rule it is derived from.
//
// The rule: TF.js's WebGL conv2d must store an im2col matrix of [sharedDim, numCols] in a packed
// 2D texture, which is representable exactly when sharedDim * numCols <= 4 * maxTextureSize^2.
// This file recomputes the texture shape the way TF.js's own getTextureShapeFromLogicalShape does
// -- independently of the closed-form inequality the planner uses -- and asserts that every op the
// planner leaves unsplit (and every split piece it produces) genuinely fits.
//
// Runs without a GPU: it is arithmetic over the manifest, so every GPU limit worth caring about can
// be checked, not just the one in this laptop.
//
// Usage: node tests/check-plan.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { N_BINS } from '../constants.js';
// The real planner, not a copy: worker/device-plan.js is deliberately free of any TF.js import so
// it can be exercised here without a GPU. A copy would let the test keep passing while the
// shipped planner drifted.
import { planForDevice } from '../worker/device-plan.js';

const here = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(join(here, '..', 'model', 'manifest.json'), 'utf8'));

// --- independent simulation of TF.js's texture allocation ---------------------------------------
const sizeFromShape = (s) => s.reduce((a, b) => a * b, 1);
const nearestLargerEven = (v) => (v % 2 === 0 ? v : v + 1);
const sizeToSquarishShape = (size) => {
    const width = Math.ceil(Math.sqrt(size));
    return [width, Math.ceil(size / width)];
};
const squeezeShape = (shape) => shape.filter((d) => d > 1);

function physicalTexture(sharedDim, numCols, maxTex) {
    // Mirrors getTextureShapeFromLogicalShape(logShape, isPacked = true) for the 3D im2col shape
    // [1, sharedDim, numCols], then the packed physical conversion [ceil(cols/2), ceil(rows/2)].
    let maxTexSize = maxTex * 2;
    let logShape = [1, nearestLargerEven(sharedDim), nearestLargerEven(numCols)];
    logShape = squeezeShape(logShape);

    let textureShape = null;
    if (logShape.length === 2 && logShape[0] <= maxTexSize && logShape[1] <= maxTexSize) {
        textureShape = logShape;
    }
    if (textureShape == null) {
        const [rows, cols] = [logShape[logShape.length - 2], logShape[logShape.length - 1]];
        const size = (rows / 2) * (cols / 2);
        textureShape = sizeToSquarishShape(size).map((d) => d * 2);
    }
    const [rows, cols] = textureShape;
    return [Math.ceil(cols / 2), Math.ceil(rows / 2)];
}

// --- run ------------------------------------------------------------------------------------
const context = Math.ceil((manifest.time_receptive_field - 1) / 2);
const convs = manifest.ops.filter((op) => op.type === 'conv2d');
let failures = 0;

console.log('GPU limit   mode      chunk  splits');
console.log('---------------------------------------------------------------');

for (const maxTex of [4096, 8192, 16384, 32768]) {
    for (const mode of ['offline', 'live']) {
        const plan = planForDevice(manifest, { mode, maxTextureSize: maxTex });
        const numCols = N_BINS * (plan.chunkFrames + 2 * context);

        const splitText = plan.splits.size
            ? [...plan.splits].map(([name, g]) => `${name}/${g}`).join(' ')
            : '(none)';
        console.log(`${String(maxTex).padStart(9)}   ${mode.padEnd(8)}  `
            + `${String(plan.chunkFrames).padStart(5)}  ${splitText}`);

        // Every op, as the plan would actually execute it, must fit.
        for (const op of convs) {
            const [kernelHeight, kernelWidth] = op.kernel;
            const groupHeight = plan.splits.get(op.output) ?? kernelHeight;
            const effectiveHeight = Math.min(groupHeight, kernelHeight);
            const sharedDim = effectiveHeight * kernelWidth * op.in_channels;
            const [w, h] = physicalTexture(sharedDim, numCols, maxTex);
            if (w > maxTex || h > maxTex) {
                console.log(`    \x1b[31mFAIL\x1b[0m ${op.output}: physical [${w}x${h}] `
                    + `exceeds ${maxTex} (sharedDim ${sharedDim}, numCols ${numCols})`);
                failures++;
            }
        }
    }
}

console.log();
if (failures === 0) {
    console.log('\x1b[32mPASS\x1b[0m  every conv fits its GPU\'s textures under the derived plan');
} else {
    console.log(`\x1b[31mFAIL\x1b[0m  ${failures} op/limit combinations exceed the texture cap`);
    process.exitCode = 1;
}

// Regression guard reproducing the exact reported failure. tests/test-model.html benchmarks a
// 256-frame buffer, so predict() runs a single chunk of width 256 (not 256 + 2 * context, which
// only applies once there are further frames to draw context from): numCols = 360 * 256 = 92160
// against sharedDim 23040 gives the [23040x23040] in the error message.
const unsplit = physicalTexture(23040, N_BINS * 256, 16384);
const reproduced = unsplit[0] === 23040 && unsplit[1] === 23040;
console.log(`\nreported failure reproduced: unsplit distribution, 256-frame chunk, 16384 GPU`);
console.log(`  predicted physical texture [${unsplit[0]}x${unsplit[1]}], `
    + `reported [23040x23040] -- ${reproduced ? 'match' : 'MISMATCH'}`);
if (!reproduced) {
    console.log('\x1b[31m  the texture-size model no longer explains the observed error\x1b[0m');
    process.exitCode = 1;
}
