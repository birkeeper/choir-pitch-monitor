// The one place the app version lives. Loaded as a classic script by both the page (a <script> tag
// ahead of pitch_monitor.js) and the service worker (importScripts), so the version shown on the
// page and the cache name cannot disagree. Bump it whenever a cached asset changes: browsers
// byte-compare imported scripts when checking for a service worker update, so editing this file
// alone is enough to install a fresh cache.
self.APP_VERSION = 'v0.4';
