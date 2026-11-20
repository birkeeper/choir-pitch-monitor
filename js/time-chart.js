// What the time charts have in common: a canvas with one or more panels stacked on a shared time
// axis (see time-axis.js), a playhead, and a cursor that snaps to frames and is shown in every
// chart. A chart draws its panels; this draws the rest.
//
// The panels are drawn once into an offscreen canvas when the data, the size or the fisheye changes;
// each animation frame only copies that and draws the playhead and cursor over it.

import { FRAME_DURATION, SPREAD_YELLOW, SPREAD_RED } from '../constants.js';

// The app is always in Bootstrap's dark theme, so only the dark steps are needed.
export const COLORS = {
    text: 'rgba(222, 226, 230, 0.75)',
    grid: 'rgba(255, 255, 255, 0.08)',
    zero: 'rgba(255, 255, 255, 0.35)',
    playhead: '#f0efec',
    crosshair: 'rgba(255, 255, 255, 0.4)',
};

export const MARGIN = { left: 44, right: 10, top: 18, gap: 42, bottom: 22 };
export const FONT = '12px system-ui, sans-serif';

// Trace colour stops, as [r, g, b]: in tune, the first threshold, the second threshold and beyond.
const GREEN = [60, 179, 113];
const YELLOW = [229, 193, 0];
const RED = [229, 72, 77];

/** Green at 0, yellow at `yellow`, red from `red` on, judged by size in either direction. */
export function traceColor(yellow, red, value) {
    const size = Math.abs(value);
    const [from, to, fraction] = size <= yellow
        ? [GREEN, YELLOW, size / yellow]
        : [YELLOW, RED, Math.min(1, (size - yellow) / (red - yellow))];
    const channel = (i) => Math.round(from[i] + fraction * (to[i] - from[i]));
    return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

/**
 * The colour of a detected pitch, from its deviation from equal temperament (drift included), on
 * the spread panel's scale. Memoised per whole cent: a chart colours tens of thousands of samples.
 */
const spreadColors = new Map();
export function spreadColor(equalCents) {
    const key = Math.min(SPREAD_RED, Math.round(Math.abs(equalCents)));
    let color = spreadColors.get(key);
    if (color === undefined) {
        color = traceColor(SPREAD_YELLOW, SPREAD_RED, key);
        spreadColors.set(key, color);
    }
    return color;
}

/** Index of the last element of the sorted `times` that is <= t, or -1. */
export function latestIndex(times, t) {
    let low = 0;
    let high = times.length - 1;
    let found = -1;
    while (low <= high) {
        const middle = (low + high) >> 1;
        if (times[middle] <= t) { found = middle; low = middle + 1; } else { high = middle - 1; }
    }
    return found;
}

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(Math.floor(seconds - 60 * minutes)).padStart(2, '0')}`;
}

/** Time to a millisecond, which is finer than a frame (11.6 ms). */
export function formatTimeFine(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds - 60 * minutes).toFixed(3).padStart(6, '0')}`;
}

/** A cents value for display; '–' where there is none. */
export function formatCents(value, signed) {
    if (!Number.isFinite(value)) { return '–'; }
    const rounded = Math.round(value);
    const sign = signed && rounded > 0 ? '+' : '';
    return `${sign}${rounded} ¢`;
}

/**
 * The detected pitches of one frame as tooltip content, separated by " | ", each coloured by its
 * deviation from equal temperament.
 *
 * @param {{text:string, equalCents:number}[]} notes
 */
export function notesNodes(notes) {
    if (notes.length === 0) { return ['–']; }
    const nodes = [];
    notes.forEach((note, i) => {
        if (i > 0) { nodes.push(' | '); }
        const span = document.createElement('span');
        span.textContent = note.text;
        span.style.color = spreadColor(note.equalCents);
        nodes.push(span);
    });
    return nodes;
}

/** A round label spacing that leaves at least ~70 px between time labels. */
function niceTimeStep(duration, width) {
    const minimum = (70 / Math.max(width, 1)) * duration;
    for (const step of [1, 2, 5, 10, 15, 30, 60, 120, 300, 600]) {
        if (step >= minimum) { return step; }
    }
    return 1200;
}

export class TimeChart {
    #canvas;
    #tooltip;
    #axis;
    #panelCount;
    #background = document.createElement('canvas');
    #width = 0;
    #height = 0;
    #ratio = 1;
    // What the offscreen canvas was last rendered with.
    #focus = 0;          // s, the fisheye focus
    #zoom = 0;
    #duration = 0;

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {HTMLElement} tooltip
     * @param {import('./time-axis.js').TimeAxis} axis shared with the other charts
     * @param {number} panelCount panels stacked on the canvas
     * @param {(seconds:number)=>void} onSeek called when the chart is clicked
     */
    constructor(canvas, tooltip, axis, panelCount, onSeek) {
        this.#canvas = canvas;
        this.#tooltip = tooltip;
        this.#axis = axis;
        this.#panelCount = panelCount;

        new ResizeObserver(() => this.#resize()).observe(canvas);
        axis.subscribe(() => this.#onAxisChange());
        canvas.addEventListener('pointermove', (event) => {
            const inside = event.offsetX >= MARGIN.left && event.offsetX <= MARGIN.left + this.plotWidth;
            axis.setCursor(inside && axis.duration > 0 ? this.#timeAt(event.offsetX) : null);
        });
        canvas.addEventListener('pointerleave', () => axis.setCursor(null));
        canvas.addEventListener('click', (event) => {
            if (axis.duration > 0) { onSeek(this.#timeAt(event.offsetX)); }
        });
    }

    // --- For the subclasses ---------------------------------------------------------------------

    /** Draw the panels (axes, grid, data) into `context`, in CSS pixels. Provided by the chart. */
    renderPanels(context) { throw new Error(`${this.constructor.name}.renderPanels is not implemented`); }

    /**
     * The tooltip content for the cursor, or null for none.
     * @param {number} frame the cursor's frame
     * @param {number} time s, the frame's time
     * @returns {(string|Node)[]|null}
     */
    describeCursor(frame, time) { return null; }

    get axis() { return this.#axis; }
    get width() { return this.#width; }
    get plotWidth() { return this.#width - MARGIN.left - MARGIN.right; }
    get panelHeight() {
        return (this.#height - MARGIN.top - MARGIN.bottom - MARGIN.gap * (this.#panelCount - 1))
            / this.#panelCount;
    }

    panelTop(index) { return MARGIN.top + index * (this.panelHeight + MARGIN.gap); }

    /** Horizontal pixel of a time, with the fisheye as it was when the panels were rendered. */
    x(seconds) {
        return MARGIN.left
            + (this.#axis.map(seconds, this.#focus) / this.#duration) * this.plotWidth;
    }

    /** How much the fisheye stretches the axis at a time, as rendered. 1 without zoom. */
    magnification(seconds) { return this.#axis.magnification(seconds, this.#focus); }

    /** Render and draw again, after the chart's data has changed. */
    refresh() {
        this.#render();
        this.#draw();
    }

    // --- Internals ------------------------------------------------------------------------------

    /** Time at a pixel on the linear axis. While the pointer is the focus, also the time under it. */
    #timeAt(x) {
        return this.#axis.timeAtFraction((x - MARGIN.left) / this.plotWidth);
    }

    #resize() {
        const box = this.#canvas.getBoundingClientRect();
        this.#ratio = window.devicePixelRatio || 1;
        this.#width = box.width;
        this.#height = box.height;
        for (const canvas of [this.#canvas, this.#background]) {
            canvas.width = Math.round(box.width * this.#ratio);
            canvas.height = Math.round(box.height * this.#ratio);
        }
        this.refresh();
    }

    #onAxisChange() {
        const axis = this.#axis;
        // The fisheye follows its focus: render the panels again once it has moved half a pixel.
        const moved = axis.zoom > 0 && axis.duration > 0 && this.plotWidth > 0
            && Math.abs(axis.focus - this.#focus) * this.plotWidth / axis.duration >= 0.5;
        if (moved || axis.zoom !== this.#zoom || axis.duration !== this.#duration) {
            this.#render();
        }
        this.#draw();
    }

    #render() {
        const axis = this.#axis;
        this.#focus = axis.duration > 0 ? axis.focus : 0;
        this.#zoom = axis.zoom;
        this.#duration = axis.duration;
        const context = this.#background.getContext('2d');
        context.setTransform(this.#ratio, 0, 0, this.#ratio, 0, 0);
        context.clearRect(0, 0, this.#width, this.#height);
        if (this.#width <= 0) { return; }
        context.font = FONT;
        this.renderPanels(context);
        if (this.#duration > 0) { this.#renderTimeLabels(context); }
    }

    #renderTimeLabels(context) {
        context.fillStyle = COLORS.text;
        context.textBaseline = 'top';
        context.textAlign = 'center';
        const labelTop = this.#height - MARGIN.bottom + 6;
        // Whole seconds, each labelled only if it is a multiple of the step that suits the axis
        // there: finer where the fisheye stretches it, coarser where it squeezes it.
        let lastX = -Infinity;
        for (let t = 0; t <= this.#duration; t++) {
            const step = niceTimeStep(this.#duration / this.magnification(t), this.plotWidth);
            if (t % step !== 0) { continue; }
            const x = this.x(t);
            // Skip a last label that would run off the right edge.
            if (x + 16 > this.#width) { break; }
            if (x - lastX < 40) { continue; }
            context.fillText(formatTime(t), x, labelTop);
            lastX = x;
        }
    }

    #draw() {
        const context = this.#canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        // A zero-sized canvas (not laid out yet) cannot be drawn from.
        if (this.#background.width === 0 || this.#background.height === 0) { return; }
        context.drawImage(this.#background, 0, 0);
        context.setTransform(this.#ratio, 0, 0, this.#ratio, 0, 0);
        if (this.#duration <= 0) {
            this.#tooltip.classList.add('d-none');
            return;
        }

        const vertical = (x, color, width) => {
            context.strokeStyle = color;
            context.lineWidth = width;
            context.beginPath();
            context.moveTo(x, MARGIN.top);
            context.lineTo(x, this.#height - MARGIN.bottom);
            context.stroke();
        };
        vertical(this.x(this.#axis.playhead), COLORS.playhead, 1.5);
        this.#drawCursor(vertical);
    }

    /** Crosshair at the cursor's frame, with the chart's tooltip beside it. */
    #drawCursor(vertical) {
        const frame = this.#axis.cursorFrame;
        const content = frame === null
            ? null : this.describeCursor(frame, frame * FRAME_DURATION);
        if (frame === null) {
            this.#tooltip.classList.add('d-none');
            return;
        }
        const x = this.x(frame * FRAME_DURATION);
        vertical(x, COLORS.crosshair, 1);
        if (!content) {
            this.#tooltip.classList.add('d-none');
            return;
        }
        this.#tooltip.replaceChildren(...content);
        this.#tooltip.classList.remove('d-none');
        // Keep the tooltip inside the chart: to the right of the crosshair unless it would overflow.
        const width = this.#tooltip.offsetWidth;
        const placed = x + 8 + width <= this.#width ? x + 8 : x - 8 - width;
        this.#tooltip.style.left = `${Math.max(0, placed)}px`;
    }
}
