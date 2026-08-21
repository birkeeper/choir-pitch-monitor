// Cache-first service worker, so the app works offline once installed.
//
// Simpler than the one in Choir-practice-midi-player: there is no settings store and no range-
// request synthesis here, just static assets. The assets are worth caching aggressively though --
// the model weights and filter bank are about 5.3 MB, and TF.js another 1 MB.

const CACHE_NAME = "choir-pitch-monitor-v0.2";

// Everything needed to run offline. The model assets are listed explicitly because a cold start
// without them fails in a confusing way (the worker loads, then cannot fetch its weights).
const PRECACHE = [
    "./",
    "./pitch_monitor.html",
    "./pitch_monitor.css",
    "./pitch_monitor.js",
    "./constants.js",
    "./manifest.json",
    "./icons/pitchmonitor-icon.svg",
    "./js/audio-source.js",
    "./worker/analysis-worker.js",
    "./worker/hcqt.js",
    "./worker/fft.js",
    "./worker/model.js",
    "./worker/graph-model.js",
    "./worker/backend.js",
    "./worker/device-plan.js",
    "./worker/notes.js",
    "./libraries/tfjs/tfjs.js",
    "./model/manifest.json",
    "./model/weights.bin",
    "./model/filters.json",
    "./model/filters.bin",
    "./model/exp3multif0_tfjs/model.json",
    "./model/exp3multif0_tfjs/group1-shard1of2.bin",
    "./model/exp3multif0_tfjs/group1-shard2of2.bin",
];

self.addEventListener("install", (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        // addAll is atomic: one missing asset fails the whole install rather than leaving a cache
        // that is quietly incomplete.
        await cache.addAll(PRECACHE);
        await self.skipWaiting();
    })());
});

self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(
            names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)),
        );
        await self.clients.claim();
    })());
});

self.addEventListener("fetch", (event) => {
    const request = event.request;
    if (request.method !== "GET") { return; }

    event.respondWith((async () => {
        const cached = await caches.match(request);
        if (cached) { return cached; }

        try {
            const response = await fetch(request);
            // Cache successful same-origin responses and the CDN's opaque ones alike: Bootstrap is
            // loaded cross-origin, and an opaque response still replays correctly offline.
            if (response && (response.ok || response.type === "opaque")) {
                const cache = await caches.open(CACHE_NAME);
                cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            // Offline and not cached. Returning a real error beats a hanging request.
            return new Response(`Offline and not cached: ${request.url}`, {
                status: 504,
                headers: { "Content-Type": "text/plain" },
            });
        }
    })());
});
