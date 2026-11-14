// Two stacked time charts on one canvas: ensemble drift above, spread below, sharing the time axis
// and a playhead. Separate charts rather than one with two y-scales, because the two measures have
// different ranges and meanings.
//
// The curves are drawn once into an offscreen canvas when the data or the size changes; each
// animation frame only copies that and draws the playhead and hover crosshair over it.

import {
    DRIFT_PLOT_MIN, DRIFT_PLOT_MAX, SPREAD_PLOT_MIN, SPREAD_PLOT_MAX,
    DRIFT_YELLOW, DRIFT_RED, SPREAD_YELLOW, SPREAD_RED, FISHEYE_D_MAX,
} from '../constants.js';

// The app is always in Bootstrap's dark theme, so only the dark steps are needed.
const COLORS = {
    text: 'rgba(222, 226, 230, 0.75)',
    grid: 'rgba(255, 255, 255, 0.08)',
    zero: 'rgba(255, 255, 255, 0.35)',
    playhead: '#f0efec',
    crosshair: 'rgba(255, 255, 255, 0.4)',
};

const MARGIN = { left: 44, right: 10, top: 18, gap: 42, bottom: 22 };
const FONT = '12px system-ui, sans-serif';

// Each segment of a curve is LINE_WIDTH times the fisheye's local magnification wide, so the lines
// thicken where the axis is stretched and thin where it is squeezed, but never below MIN_LINE_WIDTH
// so the squeezed parts stay visible. Without zoom the magnification is 1 everywhere.
const LINE_WIDTH = 2;
const MIN_LINE_WIDTH = 1;

// Trace colour stops, as [r, g, b]: in tune, the first threshold, the second threshold and beyond.
const GREEN = [60, 179, 113];
const YELLOW = [229, 193, 0];
const RED = [229, 72, 77];

const PANELS = [
    { key: 'keyDrift', title: 'drift (cents)', yellow: DRIFT_YELLOW, red: DRIFT_RED,
        min: DRIFT_PLOT_MIN, max: DRIFT_PLOT_MAX, step: 50 },
    { key: 'spread', title: 'spread (cents)', yellow: SPREAD_YELLOW, red: SPREAD_RED,
        min: SPREAD_PLOT_MIN, max: SPREAD_PLOT_MAX, step: 25 },
];

/** Green at 0, yellow at panel.yellow, red from panel.red on, judged by size in either direction. */
function traceColor(panel, value) {
    const size = Math.abs(value);
    const [from, to, fraction] = size <= panel.yellow
        ? [GREEN, YELLOW, size / panel.yellow]
        : [YELLOW, RED, Math.min(1, (size - panel.yellow) / (panel.red - panel.yellow))];
    const channel = (i) => Math.round(from[i] + fraction * (to[i] - from[i]));
    return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
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

export class EnsembleChart {
    #canvas;
    #tooltip;
    #background = document.createElement('canvas');
    // { time, keyDrift, spread } parallel arrays, plus an optional notesAt(index) giving the notes
    // detected at time[index] as [{text, equalCents}], low to high
    #data = null;
    #duration = 0;
    #playhead = 0;
    #hoverX = null;
    #zoom = 0;             // fisheye distortion d
    #focus = 0;            // s, the fisheye focus the background was last rendered with
    #width = 0;
    #height = 0;
    #ratio = 1;

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {HTMLElement} tooltip
     * @param {(seconds:number)=>void} onSeek called when the chart is clicked
     */
    constructor(canvas, tooltip, onSeek) {
        this.#canvas = canvas;
        this.#tooltip = tooltip;

        new ResizeObserver(() => this.#resize()).observe(canvas);
        canvas.addEventListener('pointermove', (event) => {
            this.#hoverX = event.offsetX;
            this.#draw();
        });
        canvas.addEventListener('pointerleave', () => {
            this.#hoverX = null;
            this.#draw();
        });
        canvas.addEventListener('click', (event) => {
            if (this.#duration > 0) { onSeek(this.#timeAt(event.offsetX)); }
        });
    }

    /** Replace the curves. Pass null to clear. */
    setData(data, duration) {
        this.#data = data;
        this.#duration = duration;
        this.#render();
        this.#draw();
    }

    /** Fisheye distortion d; 0 is a linear time axis. */
    setZoom(distortion) {
        this.#zoom = distortion;
        this.#render();
        this.#draw();
    }

    setPlayhead(seconds) {
        this.#playhead = seconds;
        this.#draw();
    }

    #plotWidth() { return this.#width - MARGIN.left - MARGIN.right; }

    #panelHeight() {
        return (this.#height - MARGIN.top - MARGIN.gap - MARGIN.bottom) / PANELS.length;
    }

    #panelTop(index) {
        return MARGIN.top + index * (this.#panelHeight() + MARGIN.gap);
    }

    #x(seconds) {
        return MARGIN.left + (this.#fisheye(seconds) / this.#duration) * this.#plotWidth();
    }

    /** The time the fisheye is centred on: the pointer while it is over the chart, else the playhead. */
    #wantedFocus() {
        return this.#hoverX !== null ? this.#timeAt(this.#hoverX) : this.#playhead;
    }

    /**
     * Distance from the focus to the edge of the lens on the side of `delta` (seconds from the
     * focus): D_max, or the distance to the end of the recording if that is nearer.
     */
    #reach(delta) {
        return Math.min(FISHEYE_D_MAX, delta >= 0 ? this.#duration - this.#focus : this.#focus);
    }

    /**
     * Where the fisheye puts a time, as a time on the linear axis: Sarkar & Brown's
     * G(x) = (d + 1) x / (d x + 1) on the distance from the focus, scaled by the lens reach. The
     * focus and the lens edges stay where they are, so the lens blends into the rest of the axis.
     */
    #fisheye(seconds) {
        const d = this.#zoom;
        const delta = seconds - this.#focus;
        const reach = this.#reach(delta);
        if (d <= 0 || reach <= 0 || Math.abs(delta) >= reach) { return seconds; }
        const x = Math.abs(delta) / reach;
        return this.#focus + Math.sign(delta) * ((d + 1) * x / (d * x + 1)) * reach;
    }

    /** G'(x) = (d + 1) / (d x + 1)^2: how much the fisheye stretches the axis at a time. */
    #magnification(seconds) {
        const d = this.#zoom;
        const delta = seconds - this.#focus;
        const reach = this.#reach(delta);
        if (d <= 0 || reach <= 0 || Math.abs(delta) >= reach) { return 1; }
        return (d + 1) / (d * Math.abs(delta) / reach + 1) ** 2;
    }

    /** Time at a pixel on the linear axis. The focus sits at its linear position, so while the
     *  pointer is the focus this is also the time under it with the fisheye on. */
    #timeAt(x) {
        const fraction = (x - MARGIN.left) / this.#plotWidth();
        return Math.min(this.#duration, Math.max(0, fraction * this.#duration));
    }

    #y(panel, index, value) {
        const top = this.#panelTop(index);
        return top + ((panel.max - value) / (panel.max - panel.min)) * this.#panelHeight();
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
        this.#render();
        this.#draw();
    }

    /** Axes, grid and curves into the offscreen canvas. */
    #render() {
        this.#focus = this.#duration > 0 ? this.#wantedFocus() : 0;
        const context = this.#background.getContext('2d');
        context.setTransform(this.#ratio, 0, 0, this.#ratio, 0, 0);
        context.clearRect(0, 0, this.#width, this.#height);
        if (this.#width <= 0) { return; }
        context.font = FONT;
        const left = MARGIN.left;
        const right = MARGIN.left + this.#plotWidth();

        PANELS.forEach((panel, index) => {
            const top = this.#panelTop(index);
            const bottom = top + this.#panelHeight();

            context.fillStyle = COLORS.text;
            context.textAlign = 'left';
            context.textBaseline = 'bottom';
            context.fillText(panel.title, left, top - 4);

            context.textAlign = 'right';
            context.textBaseline = 'middle';
            for (let value = panel.min; value <= panel.max; value += panel.step) {
                const y = Math.round(this.#y(panel, index, value)) + 0.5;
                context.strokeStyle = value === 0 ? COLORS.zero : COLORS.grid;
                context.lineWidth = 1;
                context.beginPath();
                context.moveTo(left, y);
                context.lineTo(right, y);
                context.stroke();
                context.fillText(String(value), left - 6, y);
            }

            if (!this.#data || this.#duration <= 0) { return; }
            // Values outside the fixed range run off the panel rather than being squashed into it.
            context.save();
            context.beginPath();
            context.rect(left, top, right - left, bottom - top);
            context.clip();
            context.lineCap = 'round';
            // One stroke per segment, its colour blended along it from one value to the next. Round
            // caps close the joins between segments.
            const values = this.#data[panel.key];
            const times = this.#data.time;
            for (let i = 1; i < values.length; i++) {
                // NaN is a gap: no fit could be made there.
                if (Number.isNaN(values[i - 1]) || Number.isNaN(values[i])) { continue; }
                const x0 = this.#x(times[i - 1]);
                const y0 = this.#y(panel, index, values[i - 1]);
                const x1 = this.#x(times[i]);
                const y1 = this.#y(panel, index, values[i]);
                const gradient = context.createLinearGradient(x0, y0, x1, y1);
                gradient.addColorStop(0, traceColor(panel, values[i - 1]));
                gradient.addColorStop(1, traceColor(panel, values[i]));
                context.strokeStyle = gradient;
                context.lineWidth = Math.max(MIN_LINE_WIDTH, LINE_WIDTH
                    * this.#magnification(0.5 * (times[i - 1] + times[i])));
                context.beginPath();
                context.moveTo(x0, y0);
                context.lineTo(x1, y1);
                context.stroke();
            }
            context.restore();
        });

        if (this.#duration > 0) {
            context.fillStyle = COLORS.text;
            context.textBaseline = 'top';
            context.textAlign = 'center';
            const labelTop = this.#height - MARGIN.bottom + 6;
            // Whole seconds, each labelled only if it is a multiple of the step that suits the axis
            // there: finer where the fisheye stretches it, coarser where it squeezes it.
            let lastX = -Infinity;
            for (let t = 0; t <= this.#duration; t++) {
                const step = niceTimeStep(this.#duration / this.#magnification(t), this.#plotWidth());
                if (t % step !== 0) { continue; }
                const x = this.#x(t);
                // Skip a last label that would run off the right edge.
                if (x + 16 > this.#width) { break; }
                if (x - lastX < 40) { continue; }
                context.fillText(formatTime(t), x, labelTop);
                lastX = x;
            }
        }
    }

    #draw() {
        // The lens follows its focus: redraw the curves once it has moved by half a pixel.
        if (this.#zoom > 0 && this.#duration > 0 && this.#plotWidth() > 0
            && Math.abs(this.#wantedFocus() - this.#focus) * this.#plotWidth() / this.#duration >= 0.5) {
            this.#render();
        }
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

        const top = MARGIN.top;
        const bottom = this.#height - MARGIN.bottom;
        const vertical = (x, color, width) => {
            context.strokeStyle = color;
            context.lineWidth = width;
            context.beginPath();
            context.moveTo(x, top);
            context.lineTo(x, bottom);
            context.stroke();
        };

        vertical(this.#x(this.#playhead), COLORS.playhead, 1.5);
        this.#drawHover(vertical);
    }

    /** Crosshair snapped to the nearest fit, with both values in the tooltip. */
    #drawHover(vertical) {
        const inside = this.#hoverX !== null && this.#data && this.#data.time.length > 0
            && this.#hoverX >= MARGIN.left && this.#hoverX <= MARGIN.left + this.#plotWidth();
        if (!inside) {
            this.#tooltip.classList.add('d-none');
            return;
        }
        const times = this.#data.time;
        const t = this.#timeAt(this.#hoverX);
        let index = Math.max(0, latestIndex(times, t));
        if (index + 1 < times.length && times[index + 1] - t < t - times[index]) { index++; }
        const x = this.#x(times[index]);
        vertical(x, COLORS.crosshair, 1);

        const drift = this.#data.keyDrift[index];
        const spread = this.#data.spread[index];
        this.#tooltip.replaceChildren(`${formatTime(times[index])}  drift ${formatCents(drift, true)}`
            + `  spread ${formatCents(spread, false)}`);
        const notes = this.#data.notesAt?.(index);
        if (notes) { this.#tooltip.append('\n', ...notesNodes(notes)); }
        this.#tooltip.classList.remove('d-none');
        // Keep the tooltip inside the chart: to the right of the crosshair unless it would overflow.
        const width = this.#tooltip.offsetWidth;
        const placed = x + 8 + width <= this.#width ? x + 8 : x - 8 - width;
        this.#tooltip.style.left = `${Math.max(0, placed)}px`;
    }
}

/**
 * The detected notes of one frame as tooltip content, separated by " | ". Each is coloured by its
 * deviation from equal temperament (drift included) on the spread panel's scale.
 *
 * @param {{text:string, equalCents:number}[]} notes
 */
function notesNodes(notes) {
    if (notes.length === 0) { return ['–']; }
    const spreadPanel = PANELS.find((panel) => panel.key === 'spread');
    const nodes = [];
    notes.forEach((note, i) => {
        if (i > 0) { nodes.push(' | '); }
        const span = document.createElement('span');
        span.textContent = note.text;
        span.style.color = traceColor(spreadPanel, note.equalCents);
        nodes.push(span);
    });
    return nodes;
}

/** A cents value for display; '–' where there is none. */
export function formatCents(value, signed) {
    if (!Number.isFinite(value)) { return '–'; }
    const rounded = Math.round(value);
    const sign = signed && rounded > 0 ? '+' : '';
    return `${sign}${rounded} ¢`;
}

/** A round label spacing that leaves at least ~70 px between time labels. */
function niceTimeStep(duration, width) {
    const minimum = (70 / Math.max(width, 1)) * duration;
    for (const step of [1, 2, 5, 10, 15, 30, 60, 120, 300, 600]) {
        if (step >= minimum) { return step; }
    }
    return 1200;
}
