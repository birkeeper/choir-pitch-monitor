// The time axis shared by the charts: the recording's length, the fisheye zoom, the playhead and the
// cursor. One TimeAxis serves every chart, so that they stay aligned and the cursor in one is the
// cursor in all of them.
//
// Playhead and cursor are held at frame resolution: whatever time they are given is moved to the
// nearest analysis frame, the finest step the data has.

import { FRAME_DURATION, FISHEYE_D_MAX } from '../constants.js';

export class TimeAxis {
    #duration = 0;       // s
    #frames = 0;
    #zoom = 0;           // fisheye distortion d
    #playhead = 0;       // s, on the frame grid
    #cursor = null;      // s, on the frame grid; null while the pointer is not over a chart
    #listeners = [];

    get duration() { return this.#duration; }
    get frames() { return this.#frames; }
    get zoom() { return this.#zoom; }
    get playhead() { return this.#playhead; }
    get cursor() { return this.#cursor; }

    /** Frame number of the cursor, or null. */
    get cursorFrame() {
        return this.#cursor === null ? null : Math.round(this.#cursor / FRAME_DURATION);
    }

    /** The time the fisheye is centred on: the cursor while there is one, else the playhead. */
    get focus() { return this.#cursor ?? this.#playhead; }

    /** Call `listener` whenever anything about the axis changes. */
    subscribe(listener) { this.#listeners.push(listener); }

    #notify() { for (const listener of this.#listeners) { listener(); } }

    /** A new recording (or none, with 0 frames). */
    setRecording(duration, frames) {
        this.#duration = duration;
        this.#frames = frames;
        this.#playhead = 0;
        this.#cursor = null;
        this.#notify();
    }

    /** Fisheye distortion d; 0 is a linear axis. */
    setZoom(distortion) {
        if (distortion === this.#zoom) { return; }
        this.#zoom = distortion;
        this.#notify();
    }

    setPlayhead(seconds) {
        const snapped = this.snap(seconds);
        if (snapped === this.#playhead) { return; }
        this.#playhead = snapped;
        this.#notify();
    }

    /** @param {number|null} seconds null when the pointer leaves */
    setCursor(seconds) {
        const snapped = seconds === null || this.#frames === 0 ? null : this.snap(seconds);
        if (snapped === this.#cursor) { return; }
        this.#cursor = snapped;
        this.#notify();
    }

    /** The time of the nearest frame. */
    snap(seconds) {
        if (this.#frames === 0) { return 0; }
        const frame = Math.min(this.#frames - 1, Math.max(0, Math.round(seconds / FRAME_DURATION)));
        return frame * FRAME_DURATION;
    }

    /** The time at a fraction of the linear axis. */
    timeAtFraction(fraction) {
        return Math.min(this.#duration, Math.max(0, fraction * this.#duration));
    }

    /**
     * Distance from the focus to the edge of the lens on the side of `delta` (seconds from the
     * focus): D_max, or the distance to the end of the recording if that is nearer.
     */
    #reach(delta, focus) {
        return Math.min(FISHEYE_D_MAX, delta >= 0 ? this.#duration - focus : focus);
    }

    /**
     * Where the fisheye puts a time, as a time on the linear axis: Sarkar & Brown's
     * G(x) = (d + 1) x / (d x + 1) on the distance from the focus, scaled by the lens reach. The
     * focus and the lens edges stay where they are, so the lens blends into the rest of the axis.
     *
     * @param {number} seconds
     * @param {number} focus the focus the chart was last drawn with
     */
    map(seconds, focus) {
        const d = this.#zoom;
        const delta = seconds - focus;
        const reach = this.#reach(delta, focus);
        if (d <= 0 || reach <= 0 || Math.abs(delta) >= reach) { return seconds; }
        const x = Math.abs(delta) / reach;
        return focus + Math.sign(delta) * ((d + 1) * x / (d * x + 1)) * reach;
    }

    /** G'(x) = (d + 1) / (d x + 1)^2: how much the fisheye stretches the axis at a time. */
    magnification(seconds, focus) {
        const d = this.#zoom;
        const delta = seconds - focus;
        const reach = this.#reach(delta, focus);
        if (d <= 0 || reach <= 0 || Math.abs(delta) >= reach) { return 1; }
        return (d + 1) / (d * Math.abs(delta) / reach + 1) ** 2;
    }
}
