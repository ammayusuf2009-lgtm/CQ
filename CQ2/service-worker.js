const CACHE_NAME = "cq2-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/home.html",
  "/login.html",
  "/profile.html",
  "/style.css",
  "/script.js",
  "/assets/Logo.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
