// Two stacked time charts on one canvas: ensemble drift above, spread below, sharing the time axis
// and a playhead. Separate charts rather than one with two y-scales, because the two measures have
// different ranges and meanings.

import {
    DRIFT_PLOT_MIN, DRIFT_PLOT_MAX, SPREAD_PLOT_MIN, SPREAD_PLOT_MAX,
    DRIFT_YELLOW, DRIFT_RED, SPREAD_YELLOW, SPREAD_RED,
} from '../constants.js';
import {
    TimeChart, COLORS, MARGIN, traceColor, latestIndex, formatCents, formatTimeFine,
} from './time-chart.js';

// Each segment of a curve is LINE_WIDTH times the fisheye's local magnification wide, so the lines
// thicken where the axis is stretched and thin where it is squeezed, but never below MIN_LINE_WIDTH
// so the squeezed parts stay visible. Without zoom the magnification is 1 everywhere.
const LINE_WIDTH = 2;
const MIN_LINE_WIDTH = 1;

const PANELS = [
    { key: 'keyDrift', title: 'drift (cents)', yellow: DRIFT_YELLOW, red: DRIFT_RED,
        min: DRIFT_PLOT_MIN, max: DRIFT_PLOT_MAX, step: 50 },
    { key: 'spread', title: 'spread (cents)', yellow: SPREAD_YELLOW, red: SPREAD_RED,
        min: SPREAD_PLOT_MIN, max: SPREAD_PLOT_MAX, step: 25 },
];

export class EnsembleChart extends TimeChart {
    // { time, keyDrift, spread } parallel arrays, one entry per key fit
    #data = null;

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {HTMLElement} tooltip
     * @param {import('./time-axis.js').TimeAxis} axis
     * @param {(seconds:number)=>void} onSeek called when the chart is clicked
     */
    constructor(canvas, tooltip, axis, onSeek) {
        super(canvas, tooltip, axis, PANELS.length, onSeek);
    }

    /** Replace the curves. Pass null to clear. */
    setData(data) {
        this.#data = data;
        this.refresh();
    }

    #y(panel, index, value) {
        return this.panelTop(index)
            + ((panel.max - value) / (panel.max - panel.min)) * this.panelHeight;
    }

    renderPanels(context) {
        const left = MARGIN.left;
        const right = MARGIN.left + this.plotWidth;

        PANELS.forEach((panel, index) => {
            const top = this.panelTop(index);
            const bottom = top + this.panelHeight;

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

            if (!this.#data || this.axis.duration <= 0) { return; }
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
                const x0 = this.x(times[i - 1]);
                const y0 = this.#y(panel, index, values[i - 1]);
                const x1 = this.x(times[i]);
                const y1 = this.#y(panel, index, values[i]);
                const gradient = context.createLinearGradient(x0, y0, x1, y1);
                gradient.addColorStop(0, traceColor(panel.yellow, panel.red, values[i - 1]));
                gradient.addColorStop(1, traceColor(panel.yellow, panel.red, values[i]));
                context.strokeStyle = gradient;
                context.lineWidth = Math.max(MIN_LINE_WIDTH, LINE_WIDTH
                    * this.magnification(0.5 * (times[i - 1] + times[i])));
                context.beginPath();
                context.moveTo(x0, y0);
                context.lineTo(x1, y1);
                context.stroke();
            }
            context.restore();
        });
    }

    /** The drift and spread of the latest fit at or before the cursor: what a live display would show. */
    describeCursor(frame, time) {
        if (!this.#data) { return null; }
        const index = latestIndex(this.#data.time, time + 1e-9);
        const drift = index >= 0 ? this.#data.keyDrift[index] : NaN;
        const spread = index >= 0 ? this.#data.spread[index] : NaN;
        return [`${formatTimeFine(time)}  drift ${formatCents(drift, true)}`
            + `  spread ${formatCents(spread, false)}`];
    }
}
