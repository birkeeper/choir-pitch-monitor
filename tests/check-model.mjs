// Check the model interpreter (including the split-height convolution workaround for the
// 'distribution' layer, see worker/model.js) against the Keras reference fixture, entirely in
// Node -- no browser, no GPU, so no WebGL texture-size limit to work around here. This validates
// the op-list interpreter logic itself; tests/test-model.html is what exercises the actual WebGL
// and WebGPU backends in a browser, where the texture limit that motivated the split lives.
//
// Runs on tfjs-core + the cpu backend already vendored under libraries/.tfjs-build/node_modules
// (fetched there by build_libraries.sh), so no additional install is needed.
//
// Usage: node tests/check-model.mjs   (after tools/export_model.py --fixtures ...)

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import '../libraries/.tfjs-build/node_modules/@tensorflow/tfjs-backend-cpu/dist/tf-backend-cpu.node.js';
import * as tf from '../libraries/.tfjs-build/node_modules/@tensorflow/tfjs-core/dist/tf-core.node.js';
// The real planner (worker/device-plan.js imports no TF.js, so it loads here unchanged).
import { planForDevice } from '../worker/device-plan.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

await tf.setBackend('cpu');
await tf.ready();

// --- reimplementation of worker/model.js's interpreter, against plain tfjs-core -----------------
// Not a copy-paste of worker/model.js (that file imports the browser-only vendored bundle, which
// does not load under Node -- see the comment in tools/export_model.py's verify() for why the
// Python-side replay does not cover this). Kept intentionally close to worker/model.js's #runOp so
// a change to one is easy to notice as a change needed in the other.

function splitHeightConv2d(input, kernel, bias, groupHeight, activation) {
    const [kernelHeight, kernelWidth] = kernel.shape;
    const [, height, width] = input.shape;
    const padTop = Math.floor((kernelHeight - 1) / 2);
    const padBottom = Math.ceil((kernelHeight - 1) / 2);
    const padLeft = Math.floor((kernelWidth - 1) / 2);
    const padRight = Math.ceil((kernelWidth - 1) / 2);
    const padded = tf.pad(input, [[0, 0], [padTop, padBottom], [padLeft, padRight], [0, 0]]);

    let sum = null;
    for (let offset = 0; offset < kernelHeight; offset += groupHeight) {
        const chunkHeight = Math.min(groupHeight, kernelHeight - offset);
        const inputSlice = tf.slice(padded, [0, offset, 0, 0],
            [-1, height + chunkHeight - 1, -1, -1]);
        const kernelSlice = tf.slice(kernel, [offset, 0, 0, 0], [chunkHeight, -1, -1, -1]);
        const partial = tf.conv2d(inputSlice, kernelSlice, 1, 'valid');
        sum = sum ? tf.add(sum, partial) : partial;
    }
    if (sum.shape[1] !== height || sum.shape[2] !== width) {
        throw new Error(`split conv produced [${sum.shape}] but 'same' requires `
            + `height ${height} and width ${width}`);
    }
    const biased = tf.add(sum, bias);
    return activation === 'relu' ? tf.relu(biased) : tf.sigmoid(biased);
}

function runOp(op, inputs, weights, splits) {
    switch (op.type) {
        case 'conv2d': {
            const { kernel, bias } = weights.get(op.output);
            const groupHeight = splits.get(op.output);
            if (groupHeight) {
                return splitHeightConv2d(inputs[0], kernel, bias, groupHeight, op.activation);
            }
            const convolved = tf.conv2d(inputs[0], kernel, 1, 'same');
            const biased = tf.add(convolved, bias);
            return op.activation === 'relu' ? tf.relu(biased) : tf.sigmoid(biased);
        }
        case 'batchnorm': {
            const { scale, offset } = weights.get(op.output);
            return tf.add(tf.mul(inputs[0], scale), offset);
        }
        case 'concat':
            return tf.concat(inputs, op.axis);
        case 'squeeze':
            return tf.squeeze(inputs[0], [op.axis]);
        default:
            throw new Error(`unknown op type '${op.type}'`);
    }
}

function predict(manifest, weights, mag, dphase, splits) {
    const tensors = new Map([
        [manifest.input.tensors[0], mag],
        [manifest.input.tensors[1], dphase],
    ]);
    for (const op of manifest.ops) {
        const inputs = op.inputs.map((name) => tensors.get(name));
        tensors.set(op.output, runOp(op, inputs, weights, splits));
    }
    return tensors.get(manifest.output.tensor);
}

// --- load the real exported model ----------------------------------------------------------------
const manifest = JSON.parse(readFileSync(join(root, 'model', 'manifest.json'), 'utf8'));
const blob = readFileSync(join(root, 'model', manifest.weights_file));
const buffer = blob.buffer.slice(blob.byteOffset, blob.byteOffset + blob.byteLength);

const weights = new Map();
for (const op of manifest.ops) {
    if (!op.weights) { continue; }
    const tensors = {};
    for (const [role, descriptor] of Object.entries(op.weights)) {
        const count = descriptor.shape.reduce((a, b) => a * b, 1);
        tensors[role] = tf.tensor(new Float32Array(buffer, descriptor.offset, count),
            descriptor.shape, 'float32');
    }
    weights.set(op.output, tensors);
}



// --- compare against the Keras fixture -----------------------------------------------------------
const spec = JSON.parse(readFileSync(join(here, 'fixtures', 'model-io.json'), 'utf8'));
if (spec.weights_sha256 !== manifest.source.weights_sha256) {
    console.error('FAIL: fixture was generated from different weights than model/ contains');
    process.exit(1);
}

function readFloat32(name) {
    const data = readFileSync(join(here, 'fixtures', name));
    return new Float32Array(data.buffer, data.byteOffset, data.byteLength / 4);
}

const magArray = readFloat32(spec.inputs.mag);
const dphaseArray = readFloat32(spec.inputs.dphase);
const expected = readFloat32(spec.output);

const mag = tf.tensor4d(magArray, spec.input_shape);
const dphase = tf.tensor4d(dphaseArray, spec.input_shape);

// Every plan the planner can produce must give the same answer, because the height split is an
// exact decomposition. Running the aggressive low-limit plans here is the point: a 4096 GPU splits
// nine layers including the 5x5 convs, which is the case least likely to be exercised by the
// hardware anyone happens to test on.
let failures = 0;
console.log('GPU limit   splits  max abs err   mean abs err');
console.log('------------------------------------------------');

for (const maxTextureSize of [null, 32768, 16384, 8192, 4096]) {
    const plan = planForDevice(manifest, { mode: 'offline', maxTextureSize });
    const output = predict(manifest, weights, mag, dphase, plan.splits);
    const actual = await output.data();

    let maxError = 0;
    let sumError = 0;
    for (let i = 0; i < expected.length; i++) {
        const error = Math.abs(actual[i] - expected[i]);
        maxError = Math.max(maxError, error);
        sumError += error;
    }
    const meanError = sumError / expected.length;
    output.dispose();

    // Same tolerance as tests/test-model.html: float32 reassociation noise from summing the split
    // convolution's chunks in a different order than a single conv2d call, not a structural
    // difference. More splits means more partial sums, so the error grows slightly with them.
    const pass = maxError < 1e-3;
    if (!pass) { failures++; }
    console.log(`${String(maxTextureSize ?? 'none').padStart(9)}   `
        + `${String(plan.splits.size).padStart(6)}  ${maxError.toExponential(3)}     `
        + `${meanError.toExponential(3)}  ${pass ? '' : '\x1b[31mFAIL\x1b[0m'}`);
}

console.log();
if (failures === 0) {
    console.log('\x1b[32mPASS\x1b[0m  every device plan reproduces Keras over '
        + `${spec.output_shape.join('x')}`);
} else {
    console.log(`\x1b[31mFAIL\x1b[0m  ${failures} device plan(s) diverge from Keras`);
    process.exitCode = 1;
}
