// Two stacked time charts on one canvas: ensemble drift above, spread below, sharing the time axis
// and a playhead. Separate charts rather than one with two y-scales, because the two measures have
// different ranges and meanings.
//
// The curves are drawn once into an offscreen canvas when the data or the size changes; each
// animation frame only copies that and draws the playhead and hover crosshair over it.

import {
    DRIFT_PLOT_MIN, DRIFT_PLOT_MAX, SPREAD_PLOT_MIN, SPREAD_PLOT_MAX,
} from '../constants.js';

// The app is always in Bootstrap's dark theme, so only the dark steps are needed.
const COLORS = {
    drift: '#3987e5',
    spread: '#d95926',
    text: 'rgba(222, 226, 230, 0.75)',
    grid: 'rgba(255, 255, 255, 0.08)',
    zero: 'rgba(255, 255, 255, 0.35)',
    playhead: '#f0efec',
    crosshair: 'rgba(255, 255, 255, 0.4)',
};

const MARGIN = { left: 44, right: 10, top: 18, gap: 42, bottom: 22 };
const FONT = '12px system-ui, sans-serif';

const PANELS = [
    { key: 'keyDrift', title: 'drift (cents)', color: COLORS.drift,
        min: DRIFT_PLOT_MIN, max: DRIFT_PLOT_MAX, step: 50 },
    { key: 'spread', title: 'spread (cents)', color: COLORS.spread,
        min: SPREAD_PLOT_MIN, max: SPREAD_PLOT_MAX, step: 25 },
];

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
    #data = null;          // { time, keyDrift, spread } parallel arrays
    #duration = 0;
    #playhead = 0;
    #hoverX = null;
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
        return MARGIN.left + (seconds / this.#duration) * this.#plotWidth();
    }

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
            context.strokeStyle = panel.color;
            context.lineWidth = 2;
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.beginPath();
            const values = this.#data[panel.key];
            let drawing = false;
            for (let i = 0; i < values.length; i++) {
                // NaN is a gap: no fit could be made there.
                if (Number.isNaN(values[i])) { drawing = false; continue; }
                const x = this.#x(this.#data.time[i]);
                const y = this.#y(panel, index, values[i]);
                if (drawing) { context.lineTo(x, y); } else { context.moveTo(x, y); }
                drawing = true;
            }
            context.stroke();
            context.restore();
        });

        if (this.#duration > 0) {
            context.fillStyle = COLORS.text;
            context.textBaseline = 'top';
            context.textAlign = 'center';
            const labelTop = this.#height - MARGIN.bottom + 6;
            const step = niceTimeStep(this.#duration, this.#plotWidth());
            for (let t = 0; t <= this.#duration; t += step) {
                const x = this.#x(t);
                // Skip a last label that would run off the right edge.
                if (x + 16 > this.#width) { break; }
                context.fillText(formatTime(t), x, labelTop);
            }
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
        this.#tooltip.textContent = `${formatTime(times[index])}   drift ${formatCents(drift, true)}`
            + `   spread ${formatCents(spread, false)}`;
        this.#tooltip.classList.remove('d-none');
        // Keep the tooltip inside the chart: to the right of the crosshair unless it would overflow.
        const width = this.#tooltip.offsetWidth;
        const placed = x + 8 + width <= this.#width ? x + 8 : x - 8 - width;
        this.#tooltip.style.left = `${Math.max(0, placed)}px`;
    }
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
    for (const step of [5, 10, 15, 30, 60, 120, 300, 600]) {
        if (step >= minimum) { return step; }
    }
    return 1200;
}
