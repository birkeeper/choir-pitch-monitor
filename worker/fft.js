// Real-input FFT, iterative radix-2, with per-size precomputed tables.
//
// The HCQT needs eight distinct transform sizes from 512 to 65536, evaluated 86 times per second of
// audio, and it is the second most expensive stage after inference -- so the tables (bit-reversal
// permutation and twiddle factors) are built once per size and reused.
//
// A real signal of length n is transformed with a complex FFT of length n/2 by packing even samples
// into the real part and odd samples into the imaginary part, then untangling the result. That is
// the standard factor-of-two saving for real input.

const cache = new Map();

/**
 * Get (creating if needed) the real FFT for a given size.
 * @param {number} size power of two, >= 4
 */
export function realFft(size) {
    let instance = cache.get(size);
    if (!instance) {
        instance = new RealFft(size);
        cache.set(size, instance);
    }
    return instance;
}

export class RealFft {
    /** @param {number} size transform length; must be a power of two and at least 4 */
    constructor(size) {
        if (size < 4 || (size & (size - 1)) !== 0) {
            throw new Error(`FFT size must be a power of two >= 4, got ${size}`);
        }
        this.size = size;
        const half = size / 2;
        this.half = half;

        // Bit-reversal permutation for the half-length complex transform.
        this.reversed = new Uint32Array(half);
        const bits = Math.log2(half);
        for (let i = 0; i < half; i++) {
            let value = i;
            let reversed = 0;
            for (let bit = 0; bit < bits; bit++) {
                reversed = (reversed << 1) | (value & 1);
                value >>>= 1;
            }
            this.reversed[i] = reversed;
        }

        // Twiddles for the complex butterflies, laid out stage by stage.
        this.twiddleReal = new Float64Array(half);
        this.twiddleImag = new Float64Array(half);
        for (let i = 0; i < half; i++) {
            const angle = (-2 * Math.PI * i) / half;
            this.twiddleReal[i] = Math.cos(angle);
            this.twiddleImag[i] = Math.sin(angle);
        }

        // Twiddles for untangling the packed real transform.
        this.unpackReal = new Float64Array(half + 1);
        this.unpackImag = new Float64Array(half + 1);
        for (let i = 0; i <= half; i++) {
            const angle = (-2 * Math.PI * i) / size;
            this.unpackReal[i] = Math.cos(angle);
            this.unpackImag[i] = Math.sin(angle);
        }

        this.scratchReal = new Float64Array(half);
        this.scratchImag = new Float64Array(half);
    }

    /**
     * Transform `input` (length `size`) into the non-negative frequency half-spectrum.
     *
     * @param {Float32Array|Float64Array} input  length `size`
     * @param {Float64Array} outputReal length `size / 2 + 1`
     * @param {Float64Array} outputImag length `size / 2 + 1`
     */
    transform(input, outputReal, outputImag) {
        const half = this.half;
        const re = this.scratchReal;
        const im = this.scratchImag;
        const reversed = this.reversed;

        // Pack the real signal into half as many complex samples, in bit-reversed order so the
        // butterflies below can run in place.
        for (let i = 0; i < half; i++) {
            const source = reversed[i];
            re[i] = input[2 * source];
            im[i] = input[2 * source + 1];
        }

        // Iterative Cooley-Tukey over the packed sequence.
        const twiddleReal = this.twiddleReal;
        const twiddleImag = this.twiddleImag;
        for (let span = 1; span < half; span <<= 1) {
            const step = half / (span << 1);
            for (let start = 0; start < half; start += span << 1) {
                for (let offset = 0; offset < span; offset++) {
                    const even = start + offset;
                    const odd = even + span;
                    const t = offset * step;
                    const wr = twiddleReal[t];
                    const wi = twiddleImag[t];
                    const xr = re[odd] * wr - im[odd] * wi;
                    const xi = re[odd] * wi + im[odd] * wr;
                    re[odd] = re[even] - xr;
                    im[odd] = im[even] - xi;
                    re[even] += xr;
                    im[even] += xi;
                }
            }
        }

        // Untangle: the packed transform Z relates to the real transform X by
        //   X[k] = (Z[k] + conj(Z[half-k]))/2  -  i * w^k * (Z[k] - conj(Z[half-k]))/2
        // with Z[half] taken as Z[0] by periodicity.
        const unpackReal = this.unpackReal;
        const unpackImag = this.unpackImag;
        for (let k = 0; k <= half; k++) {
            const a = k % half;               // Z[k], wrapping Z[half] to Z[0]
            const b = (half - k) % half;      // Z[half - k]

            const sumReal = 0.5 * (re[a] + re[b]);
            const sumImag = 0.5 * (im[a] - im[b]);
            const diffReal = 0.5 * (re[a] - re[b]);
            const diffImag = 0.5 * (im[a] + im[b]);

            // -i * (wr + i*wi) * (diffReal + i*diffImag)
            const wr = unpackReal[k];
            const wi = unpackImag[k];
            const rotatedReal = diffReal * wr - diffImag * wi;
            const rotatedImag = diffReal * wi + diffImag * wr;

            outputReal[k] = sumReal + rotatedImag;
            outputImag[k] = sumImag - rotatedReal;
        }
    }
}
