const staticCacheName = "site-static-v1";
const cacheAssets = [
  "/",
  "../../home.html",
  "../../vendors/css/bootstrap.min.css",
  "../css/home page/style.css",
  "/manifest.json",
  "/script.js",
  "../../vendors/js/bootstrap.min.js",
  "../../vendors/js/jquery.waypoints.min.js",
  "../html/common/login.html",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        console.log("caching assets...");
        cache.addAll(cacheAssets);
      })
      .catch((err) => {})
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((res) => {
        return res || fetch(evt.request);
      })
      .catch((err) => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("../html/common/login.html");
        }
      })
  );
});
