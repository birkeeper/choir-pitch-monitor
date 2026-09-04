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

// Which bin A0 actually falls on -- and it is bin 1, not bin 0.
//
// With an ODD number of bins per semitone the semitone centre is the middle bin of its triple, so
// the grid extends a third of a semitone below the lowest note. Counting it out: centres land on
// bins 1, 4, ... 262, which is exactly 88 semitones (A0 to C8), and the two leftover bins are the
// outer thirds at either end -- 3 * 88 + 2 would be 266, but the first and last thirds are shared,
// giving the 264 the graph declares.
//
// This was verified rather than assumed, because getting it wrong is invisible and ruinous: a
// one-bin error is a uniform 33.3 cent bias on every reading. Sweeping deliberately non-equal-
// tempered sine tones through the model and fitting bin against log2(frequency) gives 36.02
// bins/octave (confirming 3 per semitone) and an apparent base of 26.93 Hz, which is 27.5 Hz
// shifted down by 1.09 bins. With this offset applied the residual error is ~0.05 bins.
export const A0_BIN = 1;

// Note that A0 is an exact equal-tempered pitch at A4 = 440, so the bin grid lands precisely on 0
// and +/-33.3 cents relative to every semitone -- see the note on sub-bin refinement below.

// --- Model --------------------------------------------------------------------------------------

export const MODEL_URL =
    new URL('./model/nmp_salience_tfjs/model.json', import.meta.url).href;

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
// on the validation dataset"), so there is no universal value to take from it. 0.3 was chosen by
// sweeping a choir excerpt: it yields ~1.5 detections per frame, where 0.5 yields 0.25 (far too
// strict for four-part singing) and 0.15 and below collapses into noise -- 70 per frame at 0.1.
// Expect to tune it per ensemble and room; the UI exposes it and re-derives instantly.
//
//   tau    peaks/frame   in band
//   0.15      5.20         38%
//   0.20      3.03         39%
//   0.30      1.51         51%
//   0.50      0.25         58%
export const DEFAULT_THRESHOLD = 0.3;

// --- Tuning -------------------------------------------------------------------------------------

export const REFERENCE_A4 = 440;           // fixed, by design decision 6 in PLAN.md
export const DEFAULT_BAND_LOWER_CENTS = -20;
export const DEFAULT_BAND_UPPER_CENTS = 20;

// Sub-bin refinement matters more with this model than the resolution alone suggests. At 33.3 cents
// per bin, and with the grid aligned exactly to equal temperament (see F_MIN), a raw bin centre can
// only ever report 0 or +/-33.3 cents of deviation. The paper anticipates this: multipitch estimates
// "can be used to estimate continuous multi pitch estimates, by using the amplitude values of the
// estimated f0 bin, and those of its neighboring bins in frequency" -- which is the parabolic
// interpolation in worker/notes.js.
export const DEFAULT_REFINE = true;
