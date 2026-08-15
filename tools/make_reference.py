"""Dump the Python pipeline's intermediate results, stage by stage, as test fixtures.

The JavaScript port reimplements framing, the FFT, pumpp's normalisation, the model forward pass and
the peak picker. Any of those can be wrong in a way that still produces plausible-looking output, so
each stage is compared against this dump separately -- when the final salience map disagrees, the
per-stage errors say which stage is at fault.

The decoded audio is dumped too, so the JS side starts from bit-identical samples and decoder
differences cannot be mistaken for port bugs.

Prefer a clip longer than 10 s: utils.compute_pump_features_segmented only splits into multiple
segments beyond that, and the segmentation drives the per-segment dB reference, which is one of the
easiest details to get wrong.

Usage (from the polyvocals repo, with its venv active):

    python /path/to/choir-pitch-monitor/tools/make_reference.py \
        --repo  ~/Documents/git/multif0-estimation-polyvocals \
        --audio finetune/data/parijs_take02.wav \
        --outdir ~/Documents/git/choir-pitch-monitor/tests/fixtures
"""

import argparse
import json
import os
import sys

import numpy as np


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--repo", required=True,
                        help="Path to the multif0-estimation-polyvocals checkout")
    parser.add_argument("--audio", required=True, help="Audio file, absolute or relative to --repo")
    parser.add_argument("--weights", default="models/exp3multif0.h5",
                        help="Weights file, relative to --repo")
    parser.add_argument("--outdir", required=True, help="Output directory for fixtures")
    parser.add_argument("--duration", type=float, default=None,
                        help="Truncate the audio to this many seconds")
    parser.add_argument("--threshold", type=float, default=0.5,
                        help="Peak-picking threshold (model3 default: 0.5)")
    args = parser.parse_args()

    repo = os.path.abspath(os.path.expanduser(args.repo))
    outdir = os.path.abspath(os.path.expanduser(args.outdir))
    os.makedirs(outdir, exist_ok=True)
    sys.path.insert(0, repo)
    os.environ.setdefault("CUDA_VISIBLE_DEVICES", "")

    import librosa
    import models
    import utils
    import utils_train

    audio_path = args.audio
    if not os.path.isabs(audio_path):
        audio_path = os.path.join(repo, audio_path)

    (_, _, _, sr, _, hop_length, _) = utils.get_hcqt_params()

    # Stage 0: decoded audio. Dumped so the JS test starts from identical samples.
    y, _ = librosa.load(audio_path, sr=sr)
    if args.duration is not None:
        y = y[: int(args.duration * sr)]
    y = np.ascontiguousarray(y, dtype=np.float32)
    y.tofile(os.path.join(outdir, "audio.f32"))
    print(f"audio: {len(y)} samples, {len(y) / sr:.2f} s at {sr} Hz")

    # Stage 1: HCQT magnitude and phase differentials, through the real segmented path.
    pump = utils.create_pump_object()
    features = utils.compute_pump_features_segmented(pump, audio_path) \
        if args.duration is None else _segmented_from_samples(utils, pump, y)
    mag = np.ascontiguousarray(features["dphase/mag"][0], dtype=np.float32)
    dphase = np.ascontiguousarray(features["dphase/dphase"][0], dtype=np.float32)
    frames = mag.shape[0]
    mag.tofile(os.path.join(outdir, "hcqt-mag.f32"))
    dphase.tofile(os.path.join(outdir, "hcqt-dphase.f32"))
    print(f"hcqt:  {mag.shape} (frames, bins, harmonics), "
          f"mag range [{mag.min():.2f}, {mag.max():.2f}] dB")

    # Stage 2: salience map.
    model = models.build_model3()
    model.load_weights(os.path.join(repo, args.weights))
    input_hcqt = mag.transpose(1, 2, 0)[np.newaxis, :, :, :]
    input_dphase = dphase.transpose(1, 2, 0)[np.newaxis, :, :, :]
    salience = model.predict(
        [np.transpose(input_hcqt, (0, 1, 3, 2)), np.transpose(input_dphase, (0, 1, 3, 2))],
        verbose=0,
    )[0]
    salience = np.ascontiguousarray(salience, dtype=np.float32)
    salience.tofile(os.path.join(outdir, "salience.f32"))
    print(f"salience: {salience.shape} (bins, frames), "
          f"range [{salience.min():.4f}, {salience.max():.4f}]")

    # Stage 3: peaks, exactly as utils_train.pitch_activations_to_mf0 produces them.
    times, est_freqs = utils_train.pitch_activations_to_mf0(salience, args.threshold)
    peaks = []
    for frame, freqs in enumerate(est_freqs):
        for freq in freqs:
            if freq > 0:
                peaks.append((frame, float(freq)))
    with open(os.path.join(outdir, "peaks.csv"), "w") as handle:
        handle.write("frame,freq_hz\n")
        for frame, freq in peaks:
            handle.write(f"{frame},{freq:.6f}\n")
    print(f"peaks: {len(peaks)} above threshold {args.threshold} "
          f"({len(peaks) / max(frames, 1):.2f} per frame)")

    freq_grid = utils.get_freq_grid()
    with open(os.path.join(outdir, "reference.json"), "w") as handle:
        json.dump({
            "description": "Stage-by-stage output of the Python pipeline, for the JS port to "
                           "check against. All arrays are float32 little-endian, C order.",
            "audio": {"file": "audio.f32", "samples": int(len(y)), "sample_rate": int(sr),
                      "source": os.path.relpath(audio_path, repo)},
            "hcqt": {"mag": "hcqt-mag.f32", "dphase": "hcqt-dphase.f32",
                     "shape": list(mag.shape), "order": ["frames", "bins", "harmonics"]},
            "salience": {"file": "salience.f32", "shape": list(salience.shape),
                         "order": ["bins", "frames"]},
            "peaks": {"file": "peaks.csv", "threshold": args.threshold, "count": len(peaks)},
            "freq_grid": {"fmin": float(freq_grid[0]), "fmax": float(freq_grid[-1]),
                          "bins": int(len(freq_grid))},
            "hop_length": int(hop_length),
            "frames": int(frames),
        }, handle, indent=2)
    print(f"wrote fixtures to {outdir}")


def _segmented_from_samples(utils, pump, y):
    """compute_pump_features_segmented, but on an in-memory signal.

    The library version re-loads from disk, which would ignore --duration.
    """
    (_, _, _, sr, _, hop_length, _) = utils.get_hcqt_params()
    seg_samples = int(10.0 * sr)
    overlap_samples = int(1.0 * sr)

    mag_list, dphase_list = [], []
    start = 0
    while start < len(y):
        end = min(len(y), start + seg_samples)
        ctx_start = max(0, start - overlap_samples)
        ctx_end = min(len(y), end + overlap_samples)
        feats = pump(y=y[ctx_start:ctx_end], sr=sr)
        left_trim = int(round((start - ctx_start) / hop_length))
        n_frames = int(round((end - start) / hop_length))
        mag_list.append(feats["dphase/mag"][0][left_trim:left_trim + n_frames])
        dphase_list.append(feats["dphase/dphase"][0][left_trim:left_trim + n_frames])
        start = end

    return {"dphase/mag": [np.concatenate(mag_list, axis=0)],
            "dphase/dphase": [np.concatenate(dphase_list, axis=0)]}


if __name__ == "__main__":
    main()
