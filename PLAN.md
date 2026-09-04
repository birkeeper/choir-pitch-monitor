# Choir Pitch Monitor — Architecture & GUI Plan

*Draft for review, 2026-08-15. Background: [choir-pitch-monitor-conversation.md](choir-pitch-monitor-conversation.md).*

A PWA, styled and structured like `~/Documents/git/Choir-practice-midi-player/`, that loads a
single-microphone choir recording (FLAC / WAV / MP3) from disk, runs multi-F0 estimation with the
NMP salience model of Bittner et al. (2022) via TensorFlow.js, and shows how far each sounding note sits from
equal-tempered A=440, with synchronised playback through the WebAudio API. Structured so the same
analysis code can later be driven from a live microphone.

---

## 1. Decisions taken

| # | Decision | Source |
|---|---|---|
| 1 | Single microphone, no score-following, no voice-part assignment. Report **per detected note**. | earlier conversation |
| 2 | Model: the NMP salience head (`Yp`) of Bittner et al. 2022, converted to a TF.js graph model under `model/nmp_salience_tfjs/`. | user |
| 3 | Inference in the browser via **TensorFlow.js**; playback via **WebAudio API**. | user |
| 4 | Peak picking follows the paper: strict local maxima of `Yp` along frequency, kept above `tau_n`. | paper §3 |
| 5 | Off-pitch verdict is **per frame** (every 11.6 ms), not per note-event. | user |
| 6 | Reference is **fixed A=440** equal temperament. Additionally a **drift-relative view**: a toggle showing each note's deviation relative to the ensemble's median deviation, separating "this part is flat" from "the whole choir has sunk". | user |
| 7 | In-tune band boundaries (upper and lower, in cents) are **configurable**. | user |
| 8 | No build step for the app itself: vanilla ES modules, Bootstrap 5.3 dark from CDN (service-worker cached), TF.js vendored under `libraries/`. | matches midi player |

**Still open — see §9.**

---

## 2. Findings that shape the design

### 2.1 The model does its own feature extraction

The converted graph contains a `cqt2010v2` block and a `harmonic_stacking` block before the CNN, so
its input is **raw mono audio**, not a spectrogram:

```
input   audio      [1, 43844, 1]
output  output_0   [1, 172, 264]     frames x frequency bins, sigmoid, in [0, 1]
```

There is therefore no feature-extraction stage in this app at all — no CQT, no FFT, no filter bank,
no reproduction of anyone else's framing conventions. That removes the single largest source of
silent error the earlier design had.

### 2.2 Constants come from the paper, except two that do not

The paper (§3 and Fig. 1) states: 22050 Hz sample rate, 2 s input windows, a CQT with 3 bins per
semitone and a hop of ≈11 ms, 7 harmonics and 1 sub-harmonic in the harmonic stacking, and that
`Yp` — the head exported here — is the multipitch posteriorgram. The graph's own signature supplies
the rest: 43844 samples in, 172 x 264 out. The two agree, which is itself a check: 43844 / 256 is
172 frames, and 256 / 22050 is 11.61 ms.

Two things the paper does not state:

- **Where the bin grid is anchored.** 264 bins ÷ 3 per semitone = 88 semitones, the piano compass,
  so the grid spans A0–C8 and is anchored on A0 = 27.5 Hz. But A0 lands on **bin 1, not bin 0**:
  with an odd number of bins per semitone the semitone centre is the middle bin of its triple, so
  the grid extends a third of a semitone below the lowest note. Semitone centres fall on bins
  1, 4, … 262 — exactly 88 — with one spare bin at each end.

  This was verified rather than assumed, because a one-bin error is invisible and ruinous: it is a
  uniform 33.3 cent bias on every reading. Sweeping deliberately non-equal-tempered sine tones and
  fitting bin against log2(frequency) gives 36.02 bins/octave, confirming 3 per semitone, and an
  apparent base of 26.93 Hz — 27.5 Hz shifted down by 1.09 bins. With the offset applied, sine tones
  at known pitches read back to within +1.2 to +1.6 cents.

- **The window overlap.** Windows are trimmed by 15 frames at each end before stitching. Fig. 1
  gives the `Yp` path as Conv2D(5×5) → Conv2D(5×5) → Conv2D(3×39) → Conv2D(5×5), whose time extents
  sum to a 15-frame receptive field, i.e. 7 frames of context per side; 15 is used instead to also
  absorb edge effects from the CQT inside the graph, whose lowest bins have analysis windows far
  longer than a frame. The cost is 172/142 = 1.21x redundant work.

### 2.3 The threshold has to be tuned for the material

The paper fine-tunes τ_n per dataset, and choir recordings need a far lower value than the 0.5 that
suited the previous model. Swept on a choir excerpt:

| τ_n | peaks/frame | in band |
|---|---|---|
| 0.15 | 5.20 | 38 % |
| 0.20 | 3.03 | 39 % |
| 0.30 | 1.51 | 51 % |
| 0.50 | 0.25 | 58 % |

0.3 is the default. Below about 0.15 the output collapses into noise — 70 peaks per frame at 0.1.
Expect to retune per ensemble and room; the UI exposes it and re-derives instantly from the cached
salience map.

### 2.4 Peak picking on a 33-cent grid quantises the answer

The grid is 3 bins per semitone — **33.3 cents per bin** — and A0 = 27.5 Hz is an exact
equal-tempered pitch, so the grid lands precisely on equal temperament. Reporting bin centres would
therefore restrict every deviation to **0 or ±33.3 cents**, which is useless for judging tuning.

Sub-bin refinement is consequently not optional here. Parabolic interpolation over the peak and its
two neighbours in log-frequency recovers continuous estimates; the paper points at the same remedy,
noting that multipitch estimates "can be used to estimate continuous multi pitch estimates, by using
the amplitude values of the estimated f0 bin, and those of its neighboring bins in frequency". It
carries a small systematic bias — about +1.4 cents on equal-tempered test tones — which is well
inside the accuracy this application needs.

---

## 3. Repository layout

No bundler; ES modules loaded directly, matching the midi player.

```
choir-pitch-monitor/
├── pitch_monitor.html            main page (Bootstrap 5.3 dark)
├── pitch_monitor.css
├── pitch_monitor.js              app shell / UI controller
├── constants.js                  every shared constant, sourced per line
├── manifest.json
├── service-worker.js             versioned cache-first
├── icons/
├── js/
│   └── audio-source.js           file → mono 22050 Hz Float32Array + playback element
├── worker/
│   ├── analysis-worker.js        orchestration, progress, cancellation
│   ├── salience-model.js         windowing, inference, stitching
│   ├── backend.js                TF.js backend selection
│   └── notes.js                  peak picking, refinement, cents, ensemble drift
├── model/nmp_salience_tfjs/      converted graph model (~0.85 MB)
├── tests/
│   ├── test-backend-parity.html  every backend vs CPU, on real audio
│   └── fixtures/clip2s.wav
├── libraries/tfjs/               vendored TF.js bundle
└── build_libraries.sh
```

---

## 4. Analysis pipeline

```
┌── main thread (pitch_monitor.js) ──────────────────────────────────┐
│  file input → AudioSource                                          │
│    ├─ <audio> + MediaElementAudioSourceNode → WebAudio graph        │
│    └─ OfflineAudioContext(1, n, 22050) → mono Float32Array          │
│  peak picking · settings · CSV export                               │
└───────────────┬────────────────────────────────────────────────────┘
                │ postMessage, transferable ArrayBuffer
┌───────────────▼── analysis-worker.js ──────────────────────────────┐
│  SalienceModel: 43844-sample windows, stepping 142 frames           │
│    → graph (CQT + harmonic stacking + CNN, all internal)            │
│    → [1, 172, 264] per window, trim 15 frames each side             │
│    → stitch into [264 bins x frames], bin-major                     │
└─────────────────────────────────────────────────────────────────────┘
```

Peak picking stays on the main thread deliberately: it is cheap, and it means the threshold, the
tuning band and refinement can be changed and re-exported instantly without touching the GPU.

---

## 5. Validation

`tests/test-backend-parity.html` runs the same audio through every available backend and compares
against CPU. This is the test that matters, because TF.js's WebGL backend has been observed to
compute convolutions *wrongly* — silently, producing plausible output rather than an error. Re-run
it after any change of model, GPU or TF.js version.

Current results on the development machine (Intel UHD Comet Lake GT2, Mesa/ANGLE):

| check | result |
|---|---|
| WebGL vs CPU | max abs difference 3.0e-7 |
| sine tones at known pitches | +1.2 to +1.6 cents |
| throughput, WebGL | ~1.4 ms/frame steady state (~8x real-time) |
| throughput, CPU | ~17 ms/frame |

The previous model needed `WEBGL_EXP_CONV` to avoid a WebGL miscomputation. It is **not** set here:
that fault only ever appeared with convolutions whose im2col reduction ran into the tens of
thousands, and the largest in this model is 936. The parity test confirms the default path is
correct, so no experimental flag is traded for it.

---


## 6. GUI

Bootstrap 5.3 dark theme, same header / alert-placeholder / `button-label` idiom as
`midi_player.html`.

```
┌──────────────────────────────────────────────────────────────────────┐
│ [icon]        Choir Pitch Monitor                            v0.1    │
├──────────────────────────────────────────────────────────────────────┤
│ [alerts]                                                             │
├──────────────────────────────────────────────────────────────────────┤
│ [ Load recording ]  rehearsal.flac · 4:12 · WebGPU                   │
│ Analysing ████████████░░░░░░░  62%   2:36 / 4:12   [Cancel]          │
├──────────────────────────────────────────────────────────────────────┤
│ C6┤                                                                  │
│   ┤        ══════════▁▁▁▁         colour = cents deviation           │
│ C5┤────────────────────────────────── equal-tempered gridline        │
│   ┤   ▂▂▂▂▂▂▂          ═══════▃▃▃▃▃                                  │
│ C4┤──────────────────────────────────                                │
│   ┤ ══════      ▄▄▄▄▄▄▄▄▄                                            │
│ C3┤──────────────────────────────────                                │
│   ┤     ══════════════                          ▌ playhead           │
│ C2┤──────────────────────────────────                                │
│   └──────────────────────────────────────────────────────────────    │
│ drift ┤‾‾‾╲___╱‾‾╲______  −38 ¢          (phase 2)                   │
│ minimap ▁▁█▁▁▁▁█▁▁▁▁▁▁▁▁▁█▁▁  ⚠ click to jump   (phase 2)            │
├──────────────────────────────────────────────────────────────────────┤
│ ▶ ⏸  ⏮ ⏭   [═══════●════════]  2:36 / 4:12   speed [0.75×]          │
├──────────────────────────────────────────────────────────────────────┤
│ Sounding now                                                         │
│  A4  ──────●──    0 ¢   ▓▓▓▓▓▓▓░░  0.91                              │
│  F4  ────●────  −20 ¢   ▓▓▓▓▓░░░░  0.74                              │
│  C4  ───────●─  −40 ¢ ⚠ ▓▓▓▓▓▓░░░  0.83                              │
│  F3  ─────●───    0 ¢   ▓▓▓▓░░░░░  0.61                              │
├──────────────────────────────────────────────────────────────────────┤
│ ⚙ Settings                                                           │
│   in-tune band   lower [−20] ¢   upper [+20] ¢                       │
│   salience threshold [0.50]                                          │
│   ⬚ show deviation relative to ensemble drift                        │
│   ⬚ sub-bin refinement (see §2.4)                                    │
│   reference A = 440 Hz (fixed)      backend: WebGPU · 1.4× real-time │
└──────────────────────────────────────────────────────────────────────┘
```

The cents values shown above (0, −20, −40) illustrate §2.4: with the faithful peak picker and no
refinement, those are the only values that can appear.

**Piano roll.** Time on x, log-frequency on y, horizontal gridlines at every equal-tempered
semitone (labelled at every C). Each accepted peak is drawn as a small mark at its frequency,
so held notes read as horizontal runs. Scroll and zoom on both axes; the view follows the playhead
during playback with a "back to playhead" affordance after manual scrolling.

**Colour encoding**, one consistent scale used by the piano roll, the meters and (phase 2) the
minimap:

- inside the configured band → green
- below it → blue, saturation increasing with distance
- above it → red, saturation increasing with distance
- opacity scaled by salience, so weak detections recede

Because the verdict is per frame (decision 5), an isolated flagged frame is visually tiny; a
genuinely flat sustained note shows as a solid coloured run. No hysteresis is applied to the
verdict itself, per your choice — only the opacity-by-salience weighting keeps spurious detections
from drawing attention.

**Now sounding.** The peaks of the frame at the playhead, sorted high to low, each with note name,
signed cents, a horizontal deviation meter with the in-tune band marked, and a salience bar.
Updated at ~30 fps from the cached analysis, not recomputed.

**Settings** persist across sessions and re-render the view immediately without re-running
inference.

---

## 7. Build order

1. ~~Model conversion and benchmark spike~~ — done.
2. ~~Model runner: windowing, stitching, frequency-grid calibration~~ — done.
3. ~~App shell: file loading, progress, settings, CSV export~~ — done.
4. PWA shell: manifest, icons, versioned service worker, offline operation.
5. Visualisation: piano roll, now-sounding panel, drift curve, markers, A–B loop.

---

## 8. Known limitations, stated up front

- **Cents resolution** depends on sub-bin refinement (§2.4), which carries a ~1.4 cent bias.
- **Frequency range** is A0–C8, fixed by the model. Not a constraint for choral repertoire.
- **The threshold is material-dependent** (§2.3) and needs tuning per ensemble and room.
- **No voice-part attribution.** By design (decision 1); the conductor maps notes to parts.
- **Unisons and octaves** partially merge into a single detection — inherent to single-microphone
  multi-F0.
- The model is instrument-agnostic and was not trained specifically on choirs. The paper reports
  vocal results on solo singing (Molina, iKala) rather than ensembles, so a benchmark clip from the
  actual rehearsal room remains the honest test.

---


## 9. Resolved scope for the first milestone

**Q1 — answered: core first, headless.** No pitch visualisation yet. The first milestone is a PWA
that loads a recording, runs the full analysis pipeline with a progress bar, and **writes a CSV**
so the output can be evaluated against the Python reference and against real rehearsal recordings.
The piano roll, now-sounding panel, drift curve, markers and A–B loop all come later, once the
numbers are trusted.

This reorders §7: steps 1–3 stay, step 4 shrinks to "file picker + progress + CSV download", and
steps 5–6 move behind it.

**Q2 — answered: build sub-bin refinement, on by default.** Parabolic interpolation over the
accepted peak and its two neighbours in log-frequency, with a toggle back to raw bin centres for
inspecting the model's unmodified output.

### CSV format

One row per detected peak, so the file is directly comparable to the reference implementation's
output while carrying the extra columns needed for evaluation:

```
time_s,freq_hz,bin,salience,note,note_hz,cents,ensemble_drift_cents,in_band
0.104,220.31,180,0.83,A3,220.00,2.4,-3.1,1
```

`freq_hz` is refined unless refinement is toggled off, in which case it is the bin centre and
`cents` collapses to the {0, ±33.3} set described in §2.4. `bin` and `salience` are kept so the raw
model output can always be recovered. A second, wide-format export is emitted alongside it —
`time` followed by the frequencies sounding in that frame, tab-separated, one row per frame
including empty ones — which reads directly as a dense time series.
