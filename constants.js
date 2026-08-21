// Single source of truth for every number shared between the feature extractor, the model runner
// and the UI. These must stay in lockstep with utils.get_hcqt_params() in
// multif0-estimation-polyvocals -- the model was trained on features computed with exactly these
// values, so changing one silently degrades accuracy rather than producing an obvious error.

// --- HCQT, from utils.get_hcqt_params() ---------------------------------------------------------

export const SAMPLE_RATE = 22050;          // [Hz]
export const HOP_LENGTH = 256;             // [samples]
export const BINS_PER_OCTAVE = 60;         // = OVER_SAMPLE * 12
export const OVER_SAMPLE = 5;              // bins per semitone
export const N_OCTAVES = 6;
export const N_BINS = N_OCTAVES * 12 * OVER_SAMPLE;   // 360
export const F_MIN = 32.7;                 // [Hz] C1 to within 0.17 cents
export const HARMONICS = [1, 2, 3, 4, 5];

// Derived, stated explicitly because they appear throughout the UI and the CSV.
export const FRAME_RATE = SAMPLE_RATE / HOP_LENGTH;        // 86.1328125 frames/s
export const FRAME_DURATION = HOP_LENGTH / SAMPLE_RATE;    // 11.61 ms
export const CENTS_PER_BIN = 1200 / BINS_PER_OCTAVE;       // exactly 20

// pumpp calls librosa.amplitude_to_db(C, ref=np.max) with librosa's default top_db.
export const TOP_DB = 80;

// utils.compute_pump_features_segmented processes the audio in 10 s segments with 1 s of context
// on each side, trimmed after the transform. This matters beyond memory: amplitude_to_db uses
// ref=np.max, so the dB normalisation is per segment. Reproducing the segmentation is required to
// reproduce the features. See PLAN.md section 2.3.
export const SEGMENT_DURATION = 10.0;      // [s]
export const SEGMENT_OVERLAP = 1.0;        // [s]

// --- Model --------------------------------------------------------------------------------------

// Resolved against this module's own location rather than the importer's. The analysis worker
// lives in worker/, so a plain './model/' would resolve to worker/model/ there and to model/ on the
// main thread; anchoring it here makes it the same directory for both.
export const MODEL_URL = new URL('./model/', import.meta.url).href;

// The tensorflowjs_converter output, which is what the app runs. Its time axis is frozen at the
// width it was exported with, so GRAPH_MODEL_FRAMES must match; the loader reads the real value
// out of the graph and only falls back to this when the axis has been relaxed to dynamic (see
// tools/relax_graph_time_axis.py).
export const GRAPH_MODEL_URL =
    new URL('./model/exp3multif0_tfjs/model.json', import.meta.url).href;
export const GRAPH_MODEL_FRAMES = 50;
// Frames of audio pushed through the network per dispatch. predict_on_audio.py uses 2000 for
// model3, sized for a workstation; browser GPUs need far less in flight at once.
//
// This is a preference, not a guarantee: worker/model.js clamps it down if the GPU's reported
// WEBGL_MAX_TEXTURE_SIZE cannot accommodate it (see planForDevice). Chunking never changes the
// result -- chunks overlap by the model's time receptive field and the overlap is trimmed -- so
// the value is purely a latency/throughput knob.
//
// Offline favours throughput: each chunk recomputes 2 * 12 frames of context it then discards, so
// small chunks waste a large fraction of the work (24/32 = 75% at the live setting, 24/256 = 9%
// here).
export const CHUNK_FRAMES_OFFLINE = 256;
// Live favours latency: a frame cannot be emitted until the last frame of its chunk has features,
// so the chunk adds (frames - 1) * 11.61 ms on top of the CQT window lookahead (1.49 s) and the
// model's own 12-frame lookahead (139 ms).
export const CHUNK_FRAMES_LIVE = 32;

// Fraction of the theoretical texture budget to actually use. The estimate of the texture size
// TF.js will request is derived from its source rather than measured, and rounds in a few places
// (nearestLargerEven, two ceils), so the last few percent are not worth claiming: at
// 256 frames on a 16384-limit GPU the unsplit `distribution` layer lands within 1% of the cap.
export const TEXTURE_SAFETY = 0.8;
export const DEFAULT_THRESHOLD = 0.5;      // model3's threshold in predict_on_audio.py

// --- Tuning -------------------------------------------------------------------------------------

export const REFERENCE_A4 = 440;           // [Hz] fixed, by decision 6 in PLAN.md
export const DEFAULT_BAND_LOWER_CENTS = -20;
export const DEFAULT_BAND_UPPER_CENTS = 20;
