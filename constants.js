// Single source of truth for every number shared between the model runner, the note extractor and
// the UI.
//
// The model is the "Notes and Multipitch" (NMP) salience network from:
//
//   Bittner, Bosch, Rubinstein, Meseguer-Brocal, Ewert (2022), "A lightweight instrument-agnostic
//   model for polyphonic note transcription and multipitch estimation", ICASSP.
//   (Bittner_RM_2022_*.pdf in this repository; the model is Spotify's Basic Pitch.)
//
// Only the Yp head is exported here -- the multipitch posteriorgram. The paper's own recipe for
// multipitch estimation is exactly what worker/notes.js does with it: "Multi-pitch estimates are
// created by simply peak picking Yp across frequency and retaining all peaks greater than tau_n."
//
// Values below are taken from the paper where it states them, and from the converted graph's own
// input/output signature where it does not. Both sources are noted per constant, because the two
// agree only if the constants are right -- 43844 samples at 256 hop is 172 frames, which is what
// the graph declares.

// --- Audio and time -----------------------------------------------------------------------------

// Paper section 3, Training: "the model input is 2 seconds of audio at a sample rate of 22050 Hz".
export const SAMPLE_RATE = 22050;

// Paper section 3, Harmonic Stacking: "a hop size of ~11 ms". 256/22050 = 11.61 ms, and it is the
// only power-of-two hop consistent with the graph's 43844-sample input yielding 172 frames.
export const HOP_LENGTH = 256;

export const FRAME_RATE = SAMPLE_RATE / HOP_LENGTH;        // 86.1328125 frames/s
export const FRAME_DURATION = HOP_LENGTH / SAMPLE_RATE;    // 11.61 ms

// --- Frequency grid -----------------------------------------------------------------------------

// Paper section 3: the CQT has "3 bins per semitone", and Yp "has a resolution of 3 bins per
// semitone" (Yn and Yo have 1).
export const BINS_PER_SEMITONE = 3;
export const BINS_PER_OCTAVE = BINS_PER_SEMITONE * 12;     // 36
export const CENTS_PER_BIN = 1200 / BINS_PER_OCTAVE;       // 33.333...

// From the graph's output signature: [1, 172, 264].
export const N_BINS = 264;

// NOT stated in the paper. 264 bins / 3 per semitone = 88 semitones, which is the piano compass, so
// the grid spans A0..C8 and is anchored on A0 = 27.5 Hz.
export const F_MIN = 27.5;

// Which bin A0 actually falls on. The graph does not fix this; the trained weights do, so it must be
// re-measured whenever the weights change. Measure it by sweeping non-equal-tempered sine tones
// through the model and fitting the peak bin against log2(frequency). A one-bin error is a uniform
// 33.3 cent bias on every reading.
export const A0_BIN = 0;

// Note that A0 is an exact equal-tempered pitch at A4 = 440, so the bin grid lands precisely on 0
// and +/-33.3 cents relative to every semitone -- see the note on sub-bin refinement below.

// --- Model --------------------------------------------------------------------------------------

export const MODEL_URL =
    new URL('./model/distill04_salience_tfjs/model.json', import.meta.url).href;

// From the graph's input signature: [1, 43844, 1] raw mono audio. Equals 2 * 22050 - 256, i.e. the
// paper's two seconds less one hop.
export const AUDIO_WINDOW_SAMPLES = 43844;
// From the graph's output signature: [1, 172, 264].
export const WINDOW_FRAMES = 172;

// Frames discarded from each end of every window before stitching. NOT stated in the paper; derived
// from Fig. 1, where the Yp path is Conv2D(5x5) -> Conv2D(5x5) -> Conv2D(3x39) -> Conv2D(5x5), whose
// extents along time sum to a 15-frame receptive field, i.e. 7 frames of context per side. 15 is
// used rather than 7 to also absorb edge effects from the CQT inside the graph, whose lowest bins
// have analysis windows far longer than a frame.
export const WINDOW_TRIM_FRAMES = 15;

// The paper's tau_n, which it fine-tunes per dataset ("we fine-tune the threshold parameter tau_n
// on the validation dataset"), so there is no universal value to take from it, and a value tuned
// for one model does not carry over to another: re-run tests/threshold-sweep.mjs whenever
// MODEL_URL changes.
//
// Sweep for distill04 on "The A Team" (Vocalcious, 3b, 221 s, four parts), whose drift of about
// +30 cents is confirmed. The drift barely depends on tau from 0.10 to 0.30; above 0.4 a growing
// share of frames goes silent. 0.17 gives ~3.5 detections per frame, about one per voice, and
// never exceeds MAX_FRAME_PITCHES. The UI exposes the threshold and re-derives instantly.
//
//   tau    peaks/frame   voiced   drift 25/50/75%/end   spread
//   0.10      4.20        98%       26  10  31  23      16.5
//   0.17      3.50        97%       26  10  32  23      16.1
//   0.30      2.58        92%       26  10  30  24      15.4
//   0.50      1.40        72%       26  15  30  25      14.7
export const DEFAULT_THRESHOLD = 0.17;

// --- Tuning -------------------------------------------------------------------------------------

export const REFERENCE_A4 = 440;           // fixed, by design decision 6 in PLAN.md

// Sub-bin refinement matters more with this model than the resolution alone suggests. At 33.3 cents
// per bin, and with the grid aligned exactly to equal temperament (see F_MIN), a raw bin centre can
// only ever report 0 or +/-33.3 cents of deviation. The paper anticipates this: multipitch estimates
// "can be used to estimate continuous multi pitch estimates, by using the amplitude values of the
// estimated f0 bin, and those of its neighboring bins in frequency" -- which is the parabolic
// interpolation in worker/notes.js.
export const DEFAULT_REFINE = true;

// --- Ensemble drift and spread ------------------------------------------------------------------
//
// Ported from the key fit and spread sections of scripts/script_analyse_ensemble_drift.m, which is
// where these values were tuned; see worker/ensemble.js for what each one does.

// The script reads the per-frame note CSV, which carries at most this many pitches per frame (the
// most salient ones), and ignores pitches outside the f0 range below. The tracker applies the same
// limits so that it sees exactly the detections the script was tuned on.
export const MAX_FRAME_PITCHES = 8;
export const ENSEMBLE_F_MIN = 30;          // Hz
export const ENSEMBLE_F_MAX = 3000;        // Hz

// Two windows. The long one is fixed: it decides the key and the semitone, and a short window holds
// too few different notes to tell which semitone the choir is in (it slipped by whole semitones).
// The short one is the user's smoothness setting: it only refines the drift within +/-KEY_FIT_JUMP
// of the long fit, and the spread is measured over it, so both still show quick changes. Converted
// to the nearest number of frames.
export const KEY_FIT_LONG_SECONDS = 4;
export const KEY_FIT_SMOOTHNESS_MIN = 0.5;       // s
export const KEY_FIT_SMOOTHNESS_MAX = 2;         // s
export const KEY_FIT_SMOOTHNESS_STEP = 0.5;      // s
export const KEY_FIT_SMOOTHNESS_DEFAULT = 1;     // s
export const KEY_FIT_HOP_FRAMES = 17;                            // 0.197 s between fits (hopK)

export const KEY_FIT_TEMPLATE_WIDTH = 20;  // cents width of each template note (sigK)
export const KEY_FIT_START_RANGE = 100;    // cents; the choir is assumed to start within this of pitch (startK)
export const KEY_FIT_JUMP = 50;            // cents; search range around the previous fit (jumpK)
export const KEY_FIT_RIVAL_RATIO = 0.85;   // in a first fit, a rival scoring this fraction of the best is ambiguous (qK)

// Fewer samples in a window than this many per frame of the window: no fit (minDetK in the
// script). The app feeds the tracker only the unmasked samples of confirmed pitch tracks; 0.5 means
// on average half a sample per frame, e.g. a single steady voice for half of the window.
export const KEY_FIT_MIN_DETECTIONS_PER_FRAME = 0.5;

// Songs that change key. Key and whole-semitone drift cannot be told apart within one window (a
// key at drift d scores exactly as the key a semitone higher at d - 100), so the long fit chooses
// key and drift together, among the keys the user selected, and only continuity of the drift
// separates a modulation from a slip:
// - every candidate is weighted by a Gaussian of how far its drift is from a slow moving average
//   of the drift (time constant KEY_FIT_REFERENCE_TAU), so the drift cannot creep a semitone away
//   in a passage that fits several keys (with a time constant of 2 s or less it did, on being.flac);
// - the key in effect is favoured by KEY_FIT_KEEP_BONUS, so a key change needs a clear winner.
export const KEY_FIT_MOVE_STD = 25;        // cents, width of the Gaussian on the drift's move
export const KEY_FIT_REFERENCE_TAU = 5;    // s
export const KEY_FIT_KEEP_BONUS = 1.3;

// --- Pitch tracks ---------------------------------------------------------------------------------
//
// The ensemble is measured only on the unmasked samples of pitch tracks, found causally with SORT
// (Bewley et al., 2016) in one dimension: worker/pitch-tracker.js. The first frames of a note are
// unreliable -- the pitch scoops up to the note -- so they are masked, and detections that never
// settle into a track (noise, overtones, a voice that just breathes) are left out altogether.
export const TRACK_MAX_GAP_FRAMES = 3;     // frames a track may go undetected before it ends
export const TRACK_MASK_FRAMES = 5;        // frames after a track starts whose samples are masked
export const TRACK_MAX_DISTANCE_CENTS = 50; // furthest a detection may be from a track's prediction
export const TRACK_MIN_HITS = 10;          // detections a track needs to be confirmed (and kept)

// Kalman filter of each track: state is pitch (cents) and its velocity (cents/frame), constant
// velocity with random acceleration. Not user settings; chosen so the filter follows vibrato
// (about +/-50 cents at 6 Hz, i.e. up to ~10 cents/frame^2) without chasing single-frame noise.
export const TRACK_MEASUREMENT_STD_CENTS = 25;   // std of a detection around the true pitch
export const TRACK_ACCELERATION_STD = 2;         // cents/frame^2
export const TRACK_INITIAL_VELOCITY_STD = 15;    // cents/frame, uncertainty of a new track's velocity

// Fixed vertical ranges of the drift and spread plots, in cents.
export const DRIFT_PLOT_MIN = -200;
export const DRIFT_PLOT_MAX = 50;
export const SPREAD_PLOT_MIN = 0;
export const SPREAD_PLOT_MAX = 100;

// Trace colours: green at 0, yellow at the first value, red at and beyond the second, blended in
// between. Drift is judged by its size in either direction.
export const DRIFT_YELLOW = 50;
export const DRIFT_RED = 100;
export const SPREAD_YELLOW = 25;
export const SPREAD_RED = 50;

// Fisheye zoom of the two charts' time axis (Sarkar & Brown, 1992, "Graphical fisheye views of
// graphs"). Each point at normalised distance x from the focus, taken as a fraction of D_max, moves
// to G(x) = (d + 1) x / (d x + 1): d = 0 leaves the axis linear and the magnification at the focus
// is d + 1, falling to 1 / (d + 1) at distance D_max. D_max is the distance from the focus to the
// edge of the lens, so the lens stays inside the recording and everything beyond it is untouched.
export const FISHEYE_D_MAX = 60;            // s, D_max
export const FISHEYE_DISTORTION_MAX = 3;    // the slider runs from 0 to this, in steps of 0.1
