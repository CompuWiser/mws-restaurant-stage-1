var staticCacheName = "restaurant-cache-v1";

var urlsToCache = [
    "/",
    "./index.html",
    "./restaurant.html",
    "./css/styles.css",
    "./js/dbhelper.js",
    "./js/main.js",
    "./js/restaurant_info.js",
    "./data/restaurants.json",
    "./img/1.jpg",
    "./img/2.jpg",
    "./img/3.jpg",
    "./img/4.jpg",
    "./img/5.jpg",
    "./img/6.jpg",
    "./img/7.jpg",
    "./img/8.jpg",
    "./img/9.jpg",
    "./img/10.jpg",
];


// Start caching website elements when new SW file is successfully installed
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(staticCacheName)
            .then(function (cache) {
                console.log("Installed Cache");
                return cache.addAll(urlsToCache);
            })
    );
});

// Delete older cache files if new 
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(
                    cacheNames.filter(function (cacheName) {
                        // Add only unused caches to an array of to-be-deleted
                        return cacheName.startsWith("restaurant-cache") && cacheName != staticCacheName;
                    }).map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
                );
            })
    );
});

// Provide content from cache when available
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
            .catch(console.log)
    );
});