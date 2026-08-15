// Harmonic CQT with phase differentials -- the input features for the Cuesta multi-F0 model.
//
// This reproduces pumpp's HCQTPhaseDiff (5 harmonics, 60 bins/octave, 6 octaves, 32.7 Hz, sr 22050,
// hop 256, log=True) as used by utils.create_pump_object() in multif0-estimation-polyvocals.
//
// The filter bank itself is not built here: tools/make_filters.py precomputes it with librosa and
// ships it as model/filters.{json,bin}, so there is no librosa convention left to reimplement
// incorrectly. What remains is framing, the FFT, a sparse dot product, and pumpp's exact
// normalisation -- which has two details that are easy to miss and fatal to accuracy:
//
//   1. amplitude_to_db(ref=np.max) is applied PER HARMONIC and PER SEGMENT. pumpp is called once
//      per 10 s segment by compute_pump_features_segmented, so the dB reference is the loudest cell
//      in that segment's own 12 s block, not a global maximum.
//   2. dphase is diff(unwrap(angle, axis=time)) with frame 0 holding the raw phase rather than a
//      difference. After trimming the leading context this only survives in the very first frame of
//      the file, but it does survive, so it is reproduced.
//
// The transform runs at the full sample rate. librosa computes each octave on a recursively halved
// signal; building the filters at full rate instead (where they are 2^octave longer and need a
// 2^octave larger FFT) is the same transform to within 0.03-0.08 dB, and removes the resampler --
// and its streaming state -- entirely. See tools/make_filters.py and tests/README.md.

import { realFft } from './fft.js';
import {
    SAMPLE_RATE, HOP_LENGTH, N_BINS, HARMONICS, TOP_DB,
    SEGMENT_DURATION, SEGMENT_OVERLAP,
} from '../constants.js';

// librosa.amplitude_to_db's default floor.
const AMIN = 1e-5;

export class HcqtExtractor {
    #groups;        // grouped by FFT size, so each size is transformed once per frame
    #indices;       // Uint32Array, FFT bin index per stored coefficient
    #coefficients;  // Float32Array, interleaved real/imag
    #scale;         // Float32Array [harmonic][bin], librosa's 1/sqrt(length)
    #sizes;         // distinct FFT sizes, ascending
    #buffers;       // per size: {window, real, imag}

    constructor(manifest, blob) {
        const layout = manifest.layout;
        this.#indices = new Uint32Array(
            blob, layout.indices.offset, layout.indices.shape[0]);
        this.#coefficients = new Float32Array(
            blob, layout.coefficients.offset, layout.coefficients.shape[0]);
        this.#scale = new Float32Array(
            blob, layout.scale.offset, layout.scale.shape[0] * layout.scale.shape[1]);

        this.#groups = new Map();
        for (const group of manifest.groups) {
            if (!this.#groups.has(group.n_fft)) { this.#groups.set(group.n_fft, []); }
            this.#groups.get(group.n_fft).push({
                harmonicIndex: HARMONICS.indexOf(group.harmonic),
                binStart: group.bin_start,
                nFilters: group.n_filters,
                rowOffsets: Uint32Array.from(group.row_offsets),
            });
        }
        this.#sizes = [...this.#groups.keys()].sort((a, b) => a - b);

        this.#buffers = new Map();
        for (const size of this.#sizes) {
            this.#buffers.set(size, {
                window: new Float64Array(size),
                real: new Float64Array(size / 2 + 1),
                imag: new Float64Array(size / 2 + 1),
            });
        }
    }

    /** Longest analysis window, in samples: the intrinsic latency floor for live analysis. */
    get maxWindow() { return this.#sizes[this.#sizes.length - 1]; }

    static async load(baseUrl) {
        const manifestUrl = new URL('filters.json', new URL(baseUrl, self.location.href));
        const response = await fetch(manifestUrl);
        if (!response.ok) {
            throw new Error(`could not fetch ${manifestUrl}: ${response.status}`);
        }
        const manifest = await response.json();

        const blobResponse = await fetch(new URL(manifest.weights_file, manifestUrl));
        if (!blobResponse.ok) {
            throw new Error(`could not fetch ${manifest.weights_file}: ${blobResponse.status}`);
        }
        const blob = await blobResponse.arrayBuffer();
        if (blob.byteLength !== manifest.weights_bytes) {
            throw new Error(`${manifest.weights_file} is ${blob.byteLength} bytes, `
                + `manifest declares ${manifest.weights_bytes}`);
        }
        return new HcqtExtractor(manifest, blob);
    }

    /**
     * Number of frames the reference implementation produces for a signal of `n` samples.
     *
     * pumpp uses int(librosa.time_to_frames(duration)) = floor(samples / hop), one fewer than the
     * centred STFT produces, and fix_length() truncates to it.
     */
    static frameCount(samples) { return Math.floor(samples / HOP_LENGTH); }

    /**
     * Segment boundaries, reproducing utils.compute_pump_features_segmented.
     * @returns {{start:number,end:number,ctxStart:number,ctxEnd:number,
     *            leftTrim:number,frames:number,frameOffset:number}[]}
     */
    static segments(totalSamples) {
        const segSamples = Math.trunc(SEGMENT_DURATION * SAMPLE_RATE);
        const overlapSamples = Math.trunc(SEGMENT_OVERLAP * SAMPLE_RATE);
        const result = [];
        let frameOffset = 0;
        for (let start = 0; start < totalSamples; ) {
            const end = Math.min(totalSamples, start + segSamples);
            const ctxStart = Math.max(0, start - overlapSamples);
            const ctxEnd = Math.min(totalSamples, end + overlapSamples);
            // Python uses int(round(...)); JS Math.round differs on exact .5 for negatives, which
            // cannot occur here because both quantities are non-negative.
            const leftTrim = Math.round((start - ctxStart) / HOP_LENGTH);
            const frames = Math.round((end - start) / HOP_LENGTH);
            result.push({ start, end, ctxStart, ctxEnd, leftTrim, frames, frameOffset });
            frameOffset += frames;
            start = end;
        }
        return result;
    }

    /** Total frames the segmented pipeline emits for a signal of `totalSamples`. */
    static totalFrames(totalSamples) {
        return HcqtExtractor.segments(totalSamples)
            .reduce((sum, segment) => sum + segment.frames, 0);
    }

    /**
     * Compute one frame of the HCQT, centred on sample `center` of `samples`.
     *
     * Writes |V| into `magnitude` and arg(V) into `phase`, both indexed
     * [(bin * harmonics + harmonic) * stride + frameSlot].
     */
    computeFrame(samples, center, magnitude, phase, stride, frameSlot) {
        const nHarmonics = HARMONICS.length;

        for (const size of this.#sizes) {
            const buffers = this.#buffers.get(size);
            const window = buffers.window;

            // librosa's stft(center=True, pad_mode='constant') centres frame t on sample t*hop and
            // zero-pads beyond the signal, which is what this slice does.
            const from = center - size / 2;
            const copyStart = Math.max(0, from);
            const copyEnd = Math.min(samples.length, from + size);
            // Only zero the parts the copy will not cover. Blanket-filling every window would cost
            // 130k writes per frame across the eight sizes, almost all of it wasted: interior
            // frames overwrite the whole buffer anyway.
            if (copyStart > from) { window.fill(0, 0, copyStart - from); }
            if (copyEnd < from + size) { window.fill(0, copyEnd - from, size); }
            for (let i = copyStart; i < copyEnd; i++) { window[i - from] = samples[i]; }

            realFft(size).transform(window, buffers.real, buffers.imag);

            for (const group of this.#groups.get(size)) {
                const { harmonicIndex, binStart, nFilters, rowOffsets } = group;
                const scaleBase = harmonicIndex * N_BINS;
                for (let filter = 0; filter < nFilters; filter++) {
                    let real = 0;
                    let imag = 0;
                    const end = rowOffsets[filter + 1];
                    for (let n = rowOffsets[filter]; n < end; n++) {
                        const bin = this.#indices[n];
                        const cr = this.#coefficients[2 * n];
                        const ci = this.#coefficients[2 * n + 1];
                        const sr = buffers.real[bin];
                        const si = buffers.imag[bin];
                        real += cr * sr - ci * si;
                        imag += cr * si + ci * sr;
                    }
                    const bin = binStart + filter;
                    const factor = this.#scale[scaleBase + bin];
                    real *= factor;
                    imag *= factor;
                    const target = (bin * nHarmonics + harmonicIndex) * stride + frameSlot;
                    // sqrt rather than Math.hypot: hypot's overflow guards cost several times more
                    // and cannot matter for values in this range.
                    magnitude[target] = Math.sqrt(real * real + imag * imag);
                    phase[target] = Math.atan2(imag, real);
                }
            }
        }
    }

    /**
     * Extract features for a whole signal, reproducing compute_pump_features_segmented.
     *
     * @param {Float32Array} samples mono, 22050 Hz
     * @param {(done:number,total:number)=>void} [onProgress] called per segment, in frames
     * @param {()=>boolean} [isCancelled] polled per segment
     * @returns {Promise<{mag:Float32Array,dphase:Float32Array,frames:number}|null>}
     *   both arrays laid out [(bin * frames + frame) * harmonics + harmonic], the order
     *   worker/model.js consumes; null if cancelled
     */
    async extract(samples, onProgress, isCancelled) {
        const nHarmonics = HARMONICS.length;
        const segments = HcqtExtractor.segments(samples.length);
        const totalFrames = segments.reduce((sum, segment) => sum + segment.frames, 0);

        const mag = new Float32Array(N_BINS * totalFrames * nHarmonics);
        const dphase = new Float32Array(N_BINS * totalFrames * nHarmonics);

        for (const segment of segments) {
            if (isCancelled?.()) { return null; }

            // Frames of the context block, exactly as pumpp would see them for this segment.
            const blockFrames = HcqtExtractor.frameCount(segment.ctxEnd - segment.ctxStart);
            const size = N_BINS * nHarmonics * blockFrames;
            const blockMagnitude = new Float32Array(size);
            const blockPhase = new Float32Array(size);

            for (let frame = 0; frame < blockFrames; frame++) {
                this.computeFrame(samples, segment.ctxStart + frame * HOP_LENGTH,
                    blockMagnitude, blockPhase, blockFrames, frame);
            }

            this.#toDecibels(blockMagnitude, blockFrames);
            this.#toPhaseDifference(blockPhase, blockFrames);

            // Trim the context and copy into the output, transposing from the block's
            // frame-contiguous layout to the model's harmonic-contiguous one.
            for (let bin = 0; bin < N_BINS; bin++) {
                for (let harmonic = 0; harmonic < nHarmonics; harmonic++) {
                    const source = (bin * nHarmonics + harmonic) * blockFrames + segment.leftTrim;
                    for (let frame = 0; frame < segment.frames; frame++) {
                        const target =
                            (bin * totalFrames + segment.frameOffset + frame) * nHarmonics
                            + harmonic;
                        mag[target] = blockMagnitude[source + frame];
                        dphase[target] = blockPhase[source + frame];
                    }
                }
            }

            onProgress?.(segment.frameOffset + segment.frames, totalFrames);
            // Let the worker service cancellation between segments.
            await Promise.resolve();
        }

        return { mag, dphase, frames: totalFrames };
    }

    /**
     * librosa.amplitude_to_db(magnitude, ref=np.max), in place, independently per harmonic.
     *
     * The per-harmonic reference is what pumpp does (the call sits inside its loop over harmonics),
     * and it is also what makes the full-rate simplification safe: any uniform scale difference
     * against librosa's multirate output cancels here.
     */
    #toDecibels(magnitude, blockFrames) {
        const nHarmonics = HARMONICS.length;
        for (let harmonic = 0; harmonic < nHarmonics; harmonic++) {
            let reference = 0;
            for (let bin = 0; bin < N_BINS; bin++) {
                const base = (bin * nHarmonics + harmonic) * blockFrames;
                for (let frame = 0; frame < blockFrames; frame++) {
                    const value = magnitude[base + frame];
                    if (value > reference) { reference = value; }
                }
            }
            // power_to_db compares against amin before taking the log, for both signal and
            // reference; with ref = max the loudest cell lands at exactly 0 dB, so top_db clamps
            // the floor at -TOP_DB.
            const referenceDb = 20 * Math.log10(Math.max(AMIN, reference));
            const floor = -TOP_DB;
            for (let bin = 0; bin < N_BINS; bin++) {
                const base = (bin * nHarmonics + harmonic) * blockFrames;
                for (let frame = 0; frame < blockFrames; frame++) {
                    const value = 20 * Math.log10(Math.max(AMIN, magnitude[base + frame]))
                        - referenceDb;
                    magnitude[base + frame] = value < floor ? floor : value;
                }
            }
        }
    }

    /**
     * pumpp.feature._utils.phase_diff along the time axis, in place.
     *
     * Frame 0 keeps the raw phase; every later frame holds the difference of the unwrapped phase.
     */
    #toPhaseDifference(phase, blockFrames) {
        const nHarmonics = HARMONICS.length;
        const twoPi = 2 * Math.PI;
        for (let bin = 0; bin < N_BINS; bin++) {
            for (let harmonic = 0; harmonic < nHarmonics; harmonic++) {
                const base = (bin * nHarmonics + harmonic) * blockFrames;
                // np.unwrap then np.diff is, elementwise, the raw difference brought into
                // (-pi, pi] -- the running offset unwrap adds cancels in the difference.
                let previous = phase[base];
                for (let frame = 1; frame < blockFrames; frame++) {
                    const current = phase[base + frame];
                    const raw = current - previous;
                    previous = current;
                    let delta = raw - twoPi * Math.floor((raw + Math.PI) / twoPi);
                    // numpy's unwrap resolves an exact half-turn upwards rather than downwards.
                    // Vanishingly rare in float, but reproduced so the two implementations cannot
                    // disagree at all.
                    if (delta === -Math.PI && raw > 0) { delta = Math.PI; }
                    phase[base + frame] = delta;
                }
                // phase[base] is left holding the raw phase, as pumpp does.
            }
        }
    }
}
