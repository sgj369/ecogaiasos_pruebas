const CACHE_NAME = 'ecoguiasos-v1';
const urlsToCache = [
    './',
    './index.html',
    './Efectos.html',
    './pages/nosotros.html',
    './assets/css/global.css',
    './assets/css/style.css',
    './assets/css/nosotros.css',
    './assets/js/script.js',
    './assets/gif/EGSlg.webp'
];

// Instalar el Service Worker y almacenar en caché los recursos básicos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos cacheados exitosamente');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar las peticiones y responder con caché si hay conexión offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Devolver valor desde la caché
                }
                return fetch(event.request); // Si no está en caché, hacer petición de red
            })
    );
});

// Actualizar el caché si hay versiones nuevas
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Borrar caché antigua
                    }
                })
            );
        })
    );
});
