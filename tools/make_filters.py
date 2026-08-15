"""Precompute the HCQT filter bank as a browser-loadable asset.

The filter bank depends only on constants (sample rate, fmin, harmonics, bins per octave, number of
bins), so it can be built once with librosa and shipped, exactly like the model weights. That is
much safer than reimplementing librosa.filters.wavelet in JavaScript: the browser then only has to
do an FFT and a sparse dot product, neither of which has any librosa-specific convention to get
wrong.

Two departures from librosa.cqt, both verified numerically (see tests/README.md):

1. **No resampling.** librosa computes each octave on a recursively halved signal, and may
   "early downsample" the input first. Both are optimisations of the same transform. Building every
   octave's filters at the full 22050 Hz -- where they are 2^octave times longer and so need a
   2^octave times larger n_fft -- gives the same result to within 0.03-0.08 dB in the audible range
   and ~2 mrad of phase. Skipping it removes soxr and the whole resampling chain, including its
   streaming state, from the browser.

2. **Scale factor taken at the full rate.** librosa's final `V /= sqrt(lengths)` uses the
   early-downsampled rate, which differs from the full rate by a factor uniform across all bins of
   a harmonic. pumpp applies `amplitude_to_db(ref=np.max)` separately per harmonic, so a uniform
   per-harmonic factor cancels before the model ever sees it.

Usage (from the polyvocals repo, with its venv active):

    python /path/to/choir-pitch-monitor/tools/make_filters.py \
        --outdir ~/Documents/git/choir-pitch-monitor/model
"""

import argparse
import json
import os

import numpy as np
import librosa
from librosa import filters, util

# Mirrors utils.get_hcqt_params() in multif0-estimation-polyvocals and constants.js here.
SAMPLE_RATE = 22050
HOP_LENGTH = 256
BINS_PER_OCTAVE = 60
N_OCTAVES = 6
N_BINS = N_OCTAVES * 12 * 5
F_MIN = 32.7
HARMONICS = [1, 2, 3, 4, 5]
SPARSITY = 0.01          # librosa.cqt default
FILTER_SCALE = 1         # librosa.cqt default
WINDOW = "hann"          # librosa.cqt default
NORM = 1                 # librosa.cqt default


def build_group(freqs_oct, alpha_oct):
    """One octave's sparse FFT filter bank, at the full sample rate.

    Reproduces librosa's __vqt_filter_fft with my_sr = SAMPLE_RATE.
    """
    basis, lengths = filters.wavelet(
        freqs=freqs_oct, sr=SAMPLE_RATE, filter_scale=FILTER_SCALE, norm=NORM,
        pad_fft=True, window=WINDOW, gamma=0, alpha=alpha_oct,
    )
    n_fft = basis.shape[1]
    basis = basis * (lengths[:, np.newaxis] / float(n_fft))
    fft_basis = np.fft.fft(basis, n=n_fft, axis=1)[:, : (n_fft // 2) + 1]
    fft_basis = util.sparsify_rows(fft_basis, quantile=SPARSITY, dtype=np.complex64)
    return fft_basis, n_fft


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--outdir", required=True, help="Output directory")
    args = parser.parse_args()
    outdir = os.path.abspath(os.path.expanduser(args.outdir))
    os.makedirs(outdir, exist_ok=True)

    n_filters = min(BINS_PER_OCTAVE, N_BINS)

    indices = []      # uint32, FFT bin index of each stored coefficient
    coefficients = []  # float32, interleaved real/imag
    groups = []
    total_nnz = 0

    for harmonic in HARMONICS:
        freqs = librosa.cqt_frequencies(n_bins=N_BINS, fmin=F_MIN * harmonic,
                                        bins_per_octave=BINS_PER_OCTAVE)
        alpha = filters._relative_bandwidth(freqs=freqs)

        for octave in range(N_OCTAVES):
            # librosa slices the top octave first and walks downwards; __trim_stack then writes the
            # first response into the highest bins. Reproduced exactly so bin indices line up.
            if octave == 0:
                sl = slice(-n_filters, None)
            else:
                sl = slice(-n_filters * (octave + 1), -n_filters * octave)

            fft_basis, n_fft = build_group(freqs[sl], alpha[sl])
            dense = fft_basis.toarray() if hasattr(fft_basis, "toarray") else np.asarray(fft_basis)

            # Rows are stored CSR-style: row r occupies rows[r] .. rows[r+1] of the flat arrays.
            rows = [len(indices)]
            for row in dense:
                nonzero = np.flatnonzero(row)
                for index in nonzero:
                    indices.append(int(index))
                    coefficients.append(float(row[index].real))
                    coefficients.append(float(row[index].imag))
                rows.append(len(indices))

            nnz = rows[-1] - rows[0]
            total_nnz += nnz
            groups.append({
                "harmonic": harmonic,
                "octave": octave,
                "n_fft": int(n_fft),
                # Destination bins in the 360-bin output, matching librosa's __trim_stack.
                "bin_start": int(N_BINS - n_filters * (octave + 1)),
                "n_filters": int(dense.shape[0]),
                "row_offsets": rows,
                "mean_nnz": round(nnz / dense.shape[0], 1),
            })

    # librosa's scale=True divisor, evaluated at the full sample rate.
    scale = np.empty((len(HARMONICS), N_BINS), dtype=np.float32)
    for h_index, harmonic in enumerate(HARMONICS):
        freqs = librosa.cqt_frequencies(n_bins=N_BINS, fmin=F_MIN * harmonic,
                                        bins_per_octave=BINS_PER_OCTAVE)
        alpha = filters._relative_bandwidth(freqs=freqs)
        lengths, _ = filters.wavelet_lengths(freqs=freqs, sr=SAMPLE_RATE, window=WINDOW,
                                             filter_scale=FILTER_SCALE, gamma=0, alpha=alpha)
        scale[h_index] = 1.0 / np.sqrt(lengths)

    index_array = np.asarray(indices, dtype=np.uint32)
    coefficient_array = np.asarray(coefficients, dtype=np.float32)

    blob = bytearray()
    layout = {}
    for name, array in (("indices", index_array),
                        ("coefficients", coefficient_array),
                        ("scale", scale)):
        # Keep every section 4-byte aligned so the browser can wrap it in a typed array without
        # copying.
        while len(blob) % 4:
            blob.append(0)
        layout[name] = {"offset": len(blob), "shape": list(array.shape),
                        "dtype": str(array.dtype)}
        blob.extend(array.tobytes())

    with open(os.path.join(outdir, "filters.bin"), "wb") as handle:
        handle.write(blob)

    manifest = {
        "description": "HCQT sparse FFT filter bank, precomputed with librosa "
                       f"{librosa.__version__}. See tools/make_filters.py.",
        "sample_rate": SAMPLE_RATE,
        "hop_length": HOP_LENGTH,
        "bins_per_octave": BINS_PER_OCTAVE,
        "n_bins": N_BINS,
        "n_octaves": N_OCTAVES,
        "fmin": F_MIN,
        "harmonics": HARMONICS,
        "sparsity": SPARSITY,
        "librosa_version": librosa.__version__,
        "weights_file": "filters.bin",
        "weights_bytes": len(blob),
        "layout": layout,
        "groups": groups,
    }
    with open(os.path.join(outdir, "filters.json"), "w") as handle:
        json.dump(manifest, handle, indent=2)

    sizes = sorted({group["n_fft"] for group in groups})
    print(f"wrote {outdir}/filters.json and {outdir}/filters.bin")
    print(f"  {len(groups)} groups, {total_nnz:,} non-zero coefficients, {len(blob):,} bytes")
    print(f"  distinct FFT sizes: {sizes}")
    print(f"  largest window: {max(sizes)} samples = {max(sizes) / SAMPLE_RATE:.2f} s "
          f"(the intrinsic latency limit for live analysis)")
    for group in groups:
        if group["harmonic"] == 1:
            print(f"  h=1 octave {group['octave']}: n_fft {group['n_fft']:>6}, "
                  f"bins {group['bin_start']}-{group['bin_start'] + group['n_filters'] - 1}, "
                  f"mean {group['mean_nnz']} non-zeros per filter")


if __name__ == "__main__":
    main()
