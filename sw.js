const CACHE_NAME = 'yono-map-v1';
const URLS_TO_CACHE = [
  './index.html',
  './manifest.json',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  // GASのAPIへの通信はキャッシュせず、常にネットワークに取りに行く
  if (event.request.url.includes('script.google.com')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
