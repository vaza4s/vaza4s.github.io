// Temporary self-destruct service worker.
// Removes stale CyberShield PWA caches so all devices fetch the latest frontend.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.registration.unregister(),
      caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    ]).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", () => {
  // No fetch interception: requests go directly to the network.
});
