# Choir Pitch Monitor — Architecture & GUI Plan

*Draft for review, 2026-08-15. Background: [choir-pitch-monitor-conversation.md](choir-pitch-monitor-conversation.md).*

A PWA, styled and structured like `~/Documents/git/Choir-practice-midi-player/`, that loads a
single-microphone choir recording (FLAC / WAV / MP3) from disk, runs multi-F0 estimation with the
Cuesta model `exp3multif0` via TensorFlow.js, and shows how far each sounding note sits from
equal-tempered A=440, with synchronised playback through the WebAudio API. Structured so the same
analysis code can later be driven from a live microphone.

---

## 1. Decisions taken

| # | Decision | Source |
|---|---|---|
| 1 | Single microphone, no score-following, no voice-part assignment. Report **per detected note**. | earlier conversation |
| 2 | Model: `multif0-estimation-polyvocals` `build_model3` ("Late/Deep") with `exp3multif0` weights. | user |
| 3 | Inference in the browser via **TensorFlow.js**; playback via **WebAudio API**. | user |
| 4 | Peak picking is an **exact port of `utils_train.pitch_activations_to_mf0`** — `argrelmax` along the frequency axis, threshold at `thresh` (0.5 for model3). | user |
| 5 | Off-pitch verdict is **per frame** (every 11.6 ms), not per note-event. | user |
| 6 | Reference is **fixed A=440** equal temperament. Additionally a **drift-relative view**: a toggle showing each note's deviation relative to the ensemble's median deviation, separating "this part is flat" from "the whole choir has sunk". | user |
| 7 | In-tune band boundaries (upper and lower, in cents) are **configurable**. | user |
| 8 | No build step for the app itself: vanilla ES modules, Bootstrap 5.3 dark from CDN (service-worker cached), TF.js vendored under `libraries/`. | matches midi player |

**Still open — see §9.**

---

## 2. Findings that shape the design

### 2.1 The model is expensive

`build_model3` is only 1.25 M parameters but ~**450 MMAC per time frame**, dominated by:

| layer | kernel | share of MACs |
|---|---|---|
| `harm1` + `harm2`, both branches | (70, 3), 32→32 | 43 % |
| `conv2`–`conv4`, both branches | (5, 5) | 20 % |
| `distribution` | (360, 1), 64→8 | 15 % |
| `conv7`, `conv8` | (3, 3), 64→64 | 6 % |

At 86.13 frames/s that is ~39 GMAC/s ≈ **78 GFLOP per second of audio**. Measured with native
TensorFlow on this machine (8 CPU cores, no GPU):

```
T=128 frames: 1.49 s audio in  2.35 s → 0.63× real-time
T=256 frames: 2.97 s audio in 10.69 s → 0.28× real-time
```

The laptop GPU is Intel UHD Graphics (Comet Lake GT2). Expected TF.js throughput:
WebGPU ≈ 0.5–2× real-time, WebGL slower, WASM far slower.

**Consequences, baked into the design:**

- Analysis is a **one-shot batch job** with a progress bar and a cancel button, not something
  re-run on every settings change.
- Results are **cached in IndexedDB**, keyed by a hash of the audio, so re-opening a recording is
  instant and threshold / tuning-band changes re-render from the stored salience map without
  re-running inference. (Same reasoning as `save_salience_map` in `predict_on_audio.py`.)
- Backend selection is `webgpu → webgl → wasm`, shown in the UI, with the measured real-time
  factor displayed after analysis.
- Real-time is **architecturally** reachable (§4) but is not promised on this hardware. It needs a
  stronger GPU or a distilled model.

### 2.2 `exp3multif0.keras` cannot be loaded or converted directly

The file contains `Lambda(lambda x: K.squeeze(x, axis=3))`. Keras 3.15 refuses to deserialise a
Python-lambda `Lambda` layer, and with `safe_mode=False` it then fails on output-shape inference.

Conversion path instead: rebuild the graph with `models.build_model3()`, `load_weights()` from the
`.h5`/`.keras` weights, **drop the trailing `Lambda`** (the squeeze is one line of JS on the output
tensor), export, convert to TF.js. If `tensorflowjs_converter` is uncooperative with this TF/Keras
version, the fallback is a plain weight dump (JSON manifest + `Float32Array` blob) with the forward
pass hand-written in ~60 lines of `tf.conv2d` / batch-norm calls — the architecture is a straight
feed-forward CNN, so this is low-risk and removes the converter dependency entirely.

### 2.3 The feature extractor is the bulk of the work, and has two subtle details

Input is pumpp `HCQTPhaseDiff` (`utils.get_hcqt_params`): 5 harmonics `[1,2,3,4,5]`, 60 bins/octave,
6 octaves = **360 bins**, `fmin` 32.7 Hz (C1) → 2068.8 Hz (C7), sr 22050, hop 256
(**86.13 fps, 11.61 ms/frame**), `log=True`.

Two details that will silently corrupt the port if missed:

1. **Magnitude normalisation is per-segment, not global.** `amplitude_to_db(C, ref=np.max, top_db=80)`
   takes the max over the whole (bins × frames) block of *that pump call*, and
   `compute_pump_features_segmented` calls the pump per **10 s segment with 1 s of context, trimmed
   after transform**. The JS must reproduce exactly that segmentation. (For live mode this becomes a
   decaying running max — a deliberate, documented divergence.)
2. **`dphase` is `diff(unwrap(angle(C), axis=time))`**, unwrapped along the *frame* axis, with frame 0
   set to the raw phase rather than a difference (`pumpp.feature._utils.phase_diff`).

CQT filter lengths (Q ≈ 86.06): 2.63 s at the bottom bin, 82 ms at the top of the lowest-harmonic
range. The long low-frequency filters are the intrinsic latency limit for any future live mode.

### 2.4 Peak picking on a 20-cent grid quantises the answer — please read

The salience grid is 60 bins/octave = **exactly 20 cents per bin**, and `fmin = 32.7 Hz` is C1 to
within 0.17 cents. So the grid lines up with equal temperament at exactly 5 bins per semitone.

`pitch_activations_to_mf0` reports the **bin centre frequency** of each peak. Therefore, with a
faithful port and nothing else, the deviation of any detected note can only ever take one of five
values: **0, ±20, ±40 cents**. There is no −8 cents and no −22 cents; the readout is a 5-level
quantisation, and a ±20 cent in-tune band degenerates to "bin offset 0 or ±1".

The *peak finding itself* — which bins are peaks, and which pass the threshold — is unaffected by
this. Only the frequency assigned to each accepted peak is. So the exact port stays the default and
a separate, optional **sub-bin refinement** can sit behind it without changing peak selection:

- **Parabolic interpolation** over the salience values of the peak bin and its two neighbours, in
  log-frequency. Free, no extra audio processing, works identically in a future live mode. Typically
  resolves to a few cents, limited by how blurred the model's peaks are.

Default for this toggle is question **Q2** in §9.

---

## 3. Repository layout

No bundler; ES modules loaded directly, matching the midi player.

```
choir-pitch-monitor/
├── pitch_monitor.html            main page (Bootstrap 5.3 dark)
├── pitch_monitor.css
├── pitch_monitor.js              app shell / UI controller
├── constants.js                  HCQT + model + tuning constants, single source of truth
├── manifest.json
├── service-worker.js             versioned cache-first (adapted from midi player)
├── icons/
├── js/
│   ├── icons.js                  inline SVG icon set (same idiom as midi player)
│   ├── audio-source.js           file → mono 22050 Hz Float32Array + playback element
│   ├── player.js                 WebAudio transport, rate, playhead clock
│   ├── piano-roll.js             canvas renderer: detections, ET grid, playhead
│   ├── now-sounding.js           per-frame note list with cents meters
│   ├── settings.js               persisted settings
│   └── session-store.js          IndexedDB cache: audio hash → salience map + metadata
├── worker/
│   ├── analysis-worker.js        orchestration, progress reporting, cancellation
│   ├── hcqt.js                   streaming HCQT + phase differentials  ← the DSP core
│   ├── fft.js                    real FFT (radix-2)
│   ├── model.js                  TF.js load + chunked inference
│   └── notes.js                  peak picking, cents, ensemble drift
├── model/
│   ├── model.json, *.bin         converted exp3multif0 (~5 MB, committed)
│   └── README.md                 provenance: repo, commit, weights file, conversion command
├── tools/
│   ├── convert_model.py          keras weights → TF.js (run in the polyvocals venv)
│   └── make_reference.py         dump Python HCQT + salience fixtures for a test clip
├── tests/
│   ├── test-hcqt.html            JS vs Python HCQT, prints max/mean error per stage
│   ├── test-model.html           JS vs Python salience map
│   └── fixtures/                 short test clip + reference arrays
├── libraries/                    vendored TF.js dist
└── build_libraries.sh            fetch/build vendored libs (same idiom as midi player)
```

---

## 4. Analysis pipeline

```
┌── main thread (pitch_monitor.js) ──────────────────────────────────┐
│  file input → AudioSource                                          │
│    ├─ <audio> + MediaElementAudioSourceNode → WebAudio graph        │
│    │     (playback, gain, rate; playhead from currentTime)          │
│    └─ OfflineAudioContext(1, n, 22050) → mono Float32Array          │
│         (decode + downmix + resample in one step, all 3 formats)    │
│  Player · PianoRoll · NowSounding · Settings · SessionStore         │
└───────────────┬────────────────────────────────────────────────────┘
                │ postMessage, transferable ArrayBuffers
┌───────────────▼── analysis-worker.js ──────────────────────────────┐
│ 1. HcqtStreamer                                                     │
│      ring buffer → multirate CQT (port of librosa.cqt):             │
│      one shared ×2 downsampling chain, 5×360 complex FFT kernels    │
│      grouped by processing rate; sparse kernels                     │
│      → mag: amplitude_to_db(ref=max per 10 s segment, top_db=80)    │
│      → dphase: diff(unwrap(angle(C), axis=time)), frame 0 = phase   │
│ 2. ModelRunner (TF.js)                                              │
│      chunks of 256 frames ±16 overlap (time receptive field = 25),  │
│      trimmed on recombination — strictly better than the Python     │
│      code's non-overlapping CHUNK_LEN=2000                          │
│      inputs (1, 360, T, 5) ×2 → salience (360, T)                   │
│ 3. NoteExtractor                                                    │
│      argrelmax along frequency axis, keep peaks ≥ thresh            │
│      [optional: parabolic sub-bin refinement — see §2.4]            │
│      → nearest ET note at A=440, signed cents                       │
│      → per-frame ensemble drift = median deviation of active peaks  │
└─────────────────────────────────────────────────────────────────────┘
```

The worker's public interface is **frame-at-a-time streaming** (`push(samples) → frames`); file mode
simply drives it from the decoded buffer. That is what makes the future live path cheap: replace the
file feeder with an `AudioWorklet` microphone tap, replace per-segment `ref=max` with a decaying
running max, and optionally drop the lowest octave to shed its 2.63 s filter latency. Nothing else
in the pipeline changes.

The **salience map is what gets cached**, not just the extracted notes — so the threshold, the
in-tune band, the drift-relative toggle and (if enabled) the refinement can all be changed and
re-rendered instantly without touching the GPU. This mirrors `save_salience_map` in
`predict_on_audio.py`.

---

## 5. Validation — a first-class deliverable

The port fails silently if it is wrong, so numeric verification is built in from the start rather
than bolted on.

`tools/make_reference.py` runs the Python path on a short test clip and dumps, per stage:
raw CQT magnitude, dB magnitude, `dphase`, and the final salience map, plus the CSV of estimated
frequencies from `pitch_activations_to_mf0`. `tests/test-hcqt.html` and `tests/test-model.html` run
the JS path on the same clip and report max and mean error per stage.

Acceptance targets:

| stage | target |
|---|---|
| dB magnitude | mean abs error < 0.5 dB |
| `dphase` | mean abs error < 0.05 rad |
| salience map | correlation > 0.99 |
| detected F0s | identical bin set at `thresh`, ≥ 99 % frame agreement |

Bit-exactness is not the goal and is not achievable — the resampling filters differ between
`librosa`/`soxr` and WebAudio, and the model's input BatchNorm makes it insensitive to differences
far below these thresholds. Chunk-boundary handling also differs deliberately (see §4).

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

1. **Spike — de-risks everything else.** `tools/convert_model.py` → TF.js artifacts → a bare
   benchmark page that runs random input through the model on WebGPU / WebGL / WASM and reports the
   actual real-time factor on this laptop. **Report back before building the app**, because a bad
   number here changes what is worth building.
2. `worker/hcqt.js` + `worker/fft.js`, against the Python fixtures, until §5's targets are met.
3. Worker end to end: file → salience → peaks, verified against `predict_on_audio.py` on the same
   clip.
4. App shell: file loading, playback transport, piano roll, now-sounding, settings, IndexedDB cache.
5. PWA shell: manifest, icons, versioned service worker, offline operation.
6. Phase 2 (if in scope, Q1): ensemble-drift curve, warning markers + minimap, A–B loop, CSV export.

---

## 7a. Implementation findings

Things discovered while building the first milestone that were not visible when the plan was
written. All measured on the development laptop: Intel UHD Graphics (Comet Lake GT2), Mesa/ANGLE,
`WEBGL_MAX_TEXTURE_SIZE` = 16384.

### The model runs from the converted graph, not the hand-written interpreter

`tensorflowjs_converter` output lives in `model/exp3multif0_tfjs/` and is what the app executes
(`worker/graph-model.js`). Two properties of it were established by probing rather than assumption:

- **Its time axis is frozen at 50 frames.** Any other width is rejected. Each dispatch is therefore
  50 frames wide and only the context-complete middle 26 are kept, so ~1.9x the minimum number of
  frames pass through the GPU. `tools/relax_graph_time_axis.py` can relax the axis to dynamic
  without re-exporting (the graph is entirely shape-agnostic: 16 `_FusedConv2D`, `Mul`/`AddV2`
  pairs for the batch norms, a `ConcatV2`, a `Sigmoid` and a `Squeeze`; the width appears only in
  the two `Placeholder` nodes). Currently left at 50 by choice.
- **`inputs:0` is the magnitude and `inputs_1:0` the phase differential.** Confirmed numerically --
  0.997 correlation with the Python salience the right way round, 0.114 the wrong way round.
  Swapping them yields plausible output rather than an error, so the mapping is pinned explicitly.

The op-list interpreter (`worker/model.js`, `tools/export_model.py`) is retained as an independent
reference implementation, validated against Keras across every device plan by
`tests/check-model.mjs`. It is also the only path that can run on a GPU whose texture limit is too
small for the converted graph, because it can split tall kernels.

### TF.js's WebGL backend computes this model incorrectly by default

The salience map came back squashed into `[0.0001, 0.0239]` instead of reaching 0.99, yielding zero
detections. Not a precision fallback -- `WEBGL_RENDER_FLOAT32_ENABLED` was true. The fault is in the
**packed im2col convolution path**:

| configuration | max salience | verdict |
|---|---|---|
| defaults | 0.023851 | wrong |
| `WEBGL_CONV_IM2COL=false` | 0.966290 | correct (CPU: 0.966290) |
| `WEBGL_PACK=false` | 0.966290 | correct, but unusable (see below) |

`worker/backend.js` sets `WEBGL_CONV_IM2COL=false`. `WEBGL_PACK=false` is not an alternative: an
unpacked im2col matrix loses packing's 2x texture headroom and fails outright with
`Requested texture size [20365x20365]`.

Both implementations produced *identical* wrong numbers before the fix, which is what proved the
fault was in TF.js rather than in either of ours.

Attempts to keep im2col (the fast path) and merely shrink the convolutions did **not** recover
correctness, so there is no threshold to steer by:

| sharedDim | numCols | peaks (reference: 466) |
|---|---|---|
| 8512 | 8640 | correct (small synthetic fixture) |
| 15872 | 20160 | 84 -- wrong, despite both dimensions under 16384 |
| 23040 | 20160 | 45 -- wrong |
| 1536 | 100800 | 466 -- correct, but 74 ms/frame |

### The correctness fix cost 3.5x until the right flag was found

Disabling im2col drops TF.js from the *packed* im2col+GEMM path to `Conv2DProgram`, the **unpacked**
direct convolution -- one float per RGBA texel instead of four, and each output recomputing its
whole receptive window instead of reusing loaded values across outputs the way a tiled matmul does.
This architecture is punished unusually hard by that: `harm1`/`harm2` are 70x3 over 32 channels
(6720 taps per output) and `distribution` is 360x1 over 64 channels (23040 taps).

`WEBGL_EXP_CONV=true` selects `Conv2DPackedProgram` instead -- a *packed* direct convolution, which
avoids im2col while keeping packing. TF.js consults it before `WEBGL_CONV_IM2COL`, so it takes
precedence for every convolution in this model (all stride 1, channels-last). Both flags are set in
`worker/backend.js`: EXP_CONV for speed, `CONV_IM2COL=false` so anything falling through lands on the
correct unpacked path rather than the broken one.

| path | ms/frame | real-time | correct |
|---|---|---|---|
| im2col (default) | ~47 | 0.25x | no |
| `CONV_IM2COL=false` | 188 | 0.06x | yes |
| `EXP_CONV=true` | **54** | **0.20x** | yes |

So correctness now costs essentially nothing against the broken path. A four-minute recording takes
about 18 minutes end to end, still short of usable but no longer absurd. Two levers remain: relaxing
the graph's frozen 50-frame axis would recover most of the 1.92x overlap waste (~28 ms/frame), and
WebGPU avoids this code path entirely. WebGPU could not be measured here because headless Chrome
cannot obtain an adapter on this machine; `tests/test-backend-parity.html` exists to answer that in
a real browser tab.

### Verified end to end

With the fix, on a 2 s excerpt: salience max 0.9906 against Python's 0.9910, and 466 detected peaks
against Python's 469 -- the same 466 the interpreter produces on the CPU backend in Node.

## 8. Known limitations, stated up front

- **Cents resolution** is 20 cents unless sub-bin refinement is enabled (§2.4).
- **Frequency range** is C1–C7 (32.7–2068.8 Hz), fixed by the model. Notes above C7 are invisible;
  in practice this is not a constraint for choral repertoire.
- **Analysis speed** is worse than §2.1 predicted: 0.20x real-time on WebGL with the correct
  convolution path, so a 4-minute recording takes about 18 minutes. See §7a. Still the main open
  problem; WebGPU and relaxing the graph's frozen time axis are the two ways out.
- **Unisons and octaves** partially merge into a single detection — inherent to single-microphone
  multi-F0, unchanged from the earlier discussion.
- **No voice-part attribution.** By design (decision 1); the conductor maps notes to parts.
- The model was trained on vocal quartets and the Choral Singing Dataset. A large reverberant
  ensemble in your rehearsal room is out of its training distribution; a benchmark clip from the
  actual room remains the honest test.

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
exact comparison against `predict_on_audio.py`.

### CSV format

One row per detected peak, so the file is directly comparable to the reference implementation's
output while carrying the extra columns needed for evaluation:

```
time_s,freq_hz,bin,salience,note,note_hz,cents,ensemble_drift_cents,in_band
0.104,220.31,180,0.83,A3,220.00,2.4,-3.1,1
```

`freq_hz` is refined unless refinement is toggled off, in which case it is the bin centre and
`cents` collapses to the {0, ±20, ±40} set described in §2.4. `bin` and `salience` are kept so the
raw model output can always be recovered. A second, wide-format export
(`time_s,freq1,freq2,…`) matching `utils_train.save_multif0_output` is emitted alongside it for a
direct diff against `predict_on_audio.py`.
