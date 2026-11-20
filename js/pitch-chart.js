// The detected pitches that belong to pitch tracks, over time: one dot per sample, pitch upwards.
// Masked samples (the start of each track) are drawn like the others. Each dot is coloured by its
// deviation from equal temperament, as the pitches in the cursor's tooltip are.

import { FRAME_DURATION } from '../constants.js';
import {
    TimeChart, COLORS, MARGIN, spreadColor, notesNodes, formatTimeFine,
} from './time-chart.js';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const DOT = 3;                 // px, side of a sample's square
const MIN_SPAN = 12;           // semitones; the plot never zooms in on a narrower range
const MIN_LABEL_SPACING = 14;  // px between pitch labels

const noteName = (midi) => `${NOTE_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;

export class PitchChart extends TimeChart {
    // See buildPitchData in pitch_monitor.js: { count, frame, semitone, equalCents, notesAt(frame) }
    #data = null;
    #low = 48;     // semitones (MIDI), the visible range
    #high = 72;

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {HTMLElement} tooltip
     * @param {import('./time-axis.js').TimeAxis} axis
     * @param {(seconds:number)=>void} onSeek called when the chart is clicked
     */
    constructor(canvas, tooltip, axis, onSeek) {
        super(canvas, tooltip, axis, 1, onSeek);
    }

    /** Replace the samples. Pass null to clear. */
    setData(data) {
        this.#data = data;
        if (data && data.count > 0) {
            let low = Infinity;
            let high = -Infinity;
            for (let i = 0; i < data.count; i++) {
                low = Math.min(low, data.semitone[i]);
                high = Math.max(high, data.semitone[i]);
            }
            low = Math.floor(low) - 1;
            high = Math.ceil(high) + 1;
            const missing = MIN_SPAN - (high - low);
            if (missing > 0) { low -= Math.ceil(missing / 2); high += Math.floor(missing / 2); }
            this.#low = low;
            this.#high = high;
        }
        this.refresh();
    }

    #y(semitone) {
        return this.panelTop(0) + ((this.#high - semitone) / (this.#high - this.#low)) * this.panelHeight;
    }

    renderPanels(context) {
        const left = MARGIN.left;
        const right = MARGIN.left + this.plotWidth;
        const top = this.panelTop(0);
        const bottom = top + this.panelHeight;

        context.fillStyle = COLORS.text;
        context.textAlign = 'left';
        context.textBaseline = 'bottom';
        context.fillText('pitch of tracked samples', left, top - 4);

        // A label (and line) every `step` semitones, the smallest that leaves the labels room.
        const perSemitone = this.panelHeight / (this.#high - this.#low);
        const step = [1, 2, 3, 6, 12].find((s) => s * perSemitone >= MIN_LABEL_SPACING) ?? 12;
        context.textAlign = 'right';
        context.textBaseline = 'middle';
        for (let midi = Math.ceil(this.#low / step) * step; midi <= this.#high; midi += step) {
            const y = Math.round(this.#y(midi)) + 0.5;
            context.strokeStyle = midi % 12 === 0 ? COLORS.zero : COLORS.grid;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(left, y);
            context.lineTo(right, y);
            context.stroke();
            context.fillText(noteName(midi), left - 6, y);
        }

        if (!this.#data || this.axis.duration <= 0) { return; }
        context.save();
        context.beginPath();
        context.rect(left, top, right - left, bottom - top);
        context.clip();
        const { count, frame, semitone, equalCents } = this.#data;
        for (let i = 0; i < count; i++) {
            const x = this.x(frame[i] * FRAME_DURATION);
            if (x < left - DOT || x > right + DOT) { continue; }
            context.fillStyle = spreadColor(equalCents[i]);
            context.fillRect(x - DOT / 2, this.#y(semitone[i]) - DOT / 2, DOT, DOT);
        }
        context.restore();
    }

    /** The pitches of the cursor's frame, low to high, as the ensemble chart used to list them. */
    describeCursor(frame, time) {
        if (!this.#data) { return null; }
        return [formatTimeFine(time), '\n', ...notesNodes(this.#data.notesAt(frame))];
    }
}
