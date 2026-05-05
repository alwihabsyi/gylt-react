// Minimal service worker — satisfies Chrome's PWA install criteria
// without caching anything (Firebase auth data always stays fresh)
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// No fetch handler = all requests go straight to network as normal
