// Decoding a chosen file into the two forms the app needs.
//
// The WebAudio API covers all three requested formats without a decoder library: decodeAudioData
// handles WAV and MP3 everywhere, and FLAC in Chrome, Firefox and Safari 11+.
//
// Analysis needs mono at exactly 22050 Hz, which is the model's training rate. decodeAudioData
// resamples to the context's own rate, so decoding on an OfflineAudioContext constructed at 22050
// gets the resampling done by the browser's resampler in the same step.
//
// Playback needs the file at its original rate and channel count, which is what the <audio> element
// gets from an object URL.

import { SAMPLE_RATE } from '../constants.js';

export class AudioSource {
    /**
     * @param {File} file
     * @param {Float32Array} samples mono, 22050 Hz
     * @param {string} objectUrl for an <audio> element; revoke with dispose()
     * @param {object} info original format details, for display
     */
    constructor(file, samples, objectUrl, info) {
        this.file = file;
        this.samples = samples;
        this.objectUrl = objectUrl;
        this.info = info;
    }

    get duration() { return this.samples.length / SAMPLE_RATE; }

    static async load(file) {
        const data = await file.arrayBuffer();

        // decodeAudioData detaches the buffer it is given, and the analysis path needs a second
        // decode is not required -- but the buffer must be copied before the first call if it were.
        // Only one decode happens here, so pass it straight through.
        const context = new OfflineAudioContext(1, Math.ceil(SAMPLE_RATE), SAMPLE_RATE);
        let decoded;
        try {
            decoded = await context.decodeAudioData(data);
        } catch (error) {
            throw new Error(
                `could not decode ${file.name}. Supported: WAV, MP3, and FLAC in Chrome, `
                + `Firefox and Safari 11+. (${error.message || error.name})`);
        }

        const samples = downmix(decoded);
        const objectUrl = URL.createObjectURL(file);
        return new AudioSource(file, samples, objectUrl, {
            name: file.name,
            bytes: file.size,
            decodedChannels: decoded.numberOfChannels,
            // decodeAudioData already resampled to the context rate, so this is 22050 by
            // construction; reported anyway so a browser that ignores the request is visible.
            decodedSampleRate: decoded.sampleRate,
        });
    }

    dispose() {
        URL.revokeObjectURL(this.objectUrl);
    }
}

/**
 * Average all channels, matching librosa.load(mono=True).
 *
 * decodeAudioData was asked for a 1-channel context but still returns the file's own channel
 * count, so the downmix has to happen here.
 */
function downmix(buffer) {
    if (buffer.numberOfChannels === 1) {
        return buffer.getChannelData(0).slice();
    }
    const length = buffer.length;
    const output = new Float32Array(length);
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const data = buffer.getChannelData(channel);
        for (let i = 0; i < length; i++) { output[i] += data[i]; }
    }
    const scale = 1 / buffer.numberOfChannels;
    for (let i = 0; i < length; i++) { output[i] *= scale; }
    return output;
}
