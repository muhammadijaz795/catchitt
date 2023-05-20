'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "2dda091534935bfcc9866f04a7000090",
"index.html": "dfd43c812aee3e369c019450dc48988c",
"/": "dfd43c812aee3e369c019450dc48988c",
"main.dart.js": "30c7cd03aa3e0f3fa464bf3aa3c552c4",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "31e52632b672532e35f01dad9a90019e",
"assets/AssetManifest.json": "25d0c49beacb3868a4608eebb28dcf7b",
"assets/NOTICES": "037c050907f3392fd403178ed94b72d9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/giphy_get/assets/img/GIPHY_light.png": "7c7ed0e459349435c6694a720236d5f4",
"assets/packages/giphy_get/assets/img/poweredby_dark.png": "e4fe68503ab5d004deb31e43636a0a7c",
"assets/packages/giphy_get/assets/img/poweredby_light.png": "439da1ed3ca70fb090eb98698485c21e",
"assets/packages/giphy_get/assets/img/GIPHY_dark.png": "13139c9681ad6a03a0f4a45030aee388",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_sound_web/js/flutter_sound/flutter_sound_recorder.js": "f7ac74c4e0fd5cd472d86c3fe93883fc",
"assets/packages/flutter_sound_web/js/flutter_sound/flutter_sound_player.js": "ab009562c726b262f996cb55447ef32a",
"assets/packages/flutter_sound_web/js/flutter_sound/flutter_sound.js": "aecd83c80bf4faace0bcea4cd47ab307",
"assets/packages/flutter_sound_web/js/howler/howler.js": "2bba823e6b4d71ea019d81d384672823",
"assets/packages/flutter_sound_web/js/howler/howler.spatial.min.js": "28305f7b4898c9b49d523b2e80293ec8",
"assets/packages/flutter_sound_web/js/howler/howler.min.js": "0245b64fba989b9e3fd5b253f683d0e4",
"assets/packages/flutter_sound_web/js/howler/howler.core.min.js": "55e0af0319483be8a7371a2cceacf921",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "b9366edfe1908ba5fc178528dbe85645",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/gallery.png": "286dc5fc58fa91d1de95a01014b7d9da",
"assets/assets/images/app-logo.png": "6207eef62a03ebcf1b7e5e2846b9eb3e",
"assets/assets/images/user.png": "ff6f4b306cca3098b243509657017999",
"assets/assets/images/birthdate.png": "66cc5da57301100895577df30ed001f3",
"assets/assets/images/likes.png": "22eda42245bfac4af34d0f4a2cacb97d",
"assets/assets/images/logo.png": "58b4fdc5f09970e96d4e7e062db0c60e",
"assets/assets/icons/like.svg": "904a47aa83a87bdf6ae4d9807d9d90d3",
"assets/assets/icons/liked.svg": "250f388e2adf99b7fa3c964e99717027",
"assets/assets/icons/home.svg": "e979afb24e0beffd2c2e9e018948ef04",
"assets/assets/icons/logout.svg": "a807ecfc5842dbb9583c8dd77c008a2c",
"assets/assets/icons/discard.svg": "71ebdb5af734c345104f03adff66127d",
"assets/assets/icons/post.svg": "322dccbc4cc57d02339f06f5c7cf85c7",
"assets/assets/icons/instagram.svg": "82ee87faf54afc9d64a04f6155c7b778",
"assets/assets/icons/profile-filled.svg": "7b1afe0d78ad52cb8f305920c773a653",
"assets/assets/icons/download.svg": "c208ffc56ec56bed6025d2eceeda9364",
"assets/assets/icons/discover.svg": "ed47c1c393e90f3909a3fefa9a02c671",
"assets/assets/icons/stop.svg": "540eb4aebfc80e466232986230d29691",
"assets/assets/icons/record.svg": "2a883a8928a04b75ee0c752567144de0",
"assets/assets/icons/home-filled.svg": "899cd32cd50e6ac1d1e2df3383c8b039",
"assets/assets/icons/proceed.svg": "b40e7f1e9d6cfce1c974b5ca54193d60",
"assets/assets/icons/copy.svg": "31e376ae6c45e06f72774acb401ae5ac",
"assets/assets/icons/save.svg": "f3a1627d3d73e4e8c10dd123b432b2d1",
"assets/assets/icons/chat-filled.svg": "b843bfbab00ae894e12b40ad387b3c14",
"assets/assets/icons/report.svg": "37465c7dd6f5b9a865b77f2a0eedb7c9",
"assets/assets/icons/chat.svg": "4b6828ac06fb336ae6924050b90fb436",
"assets/assets/icons/facebook.svg": "fd2a063852e1768f3f47328bfca1a8cb",
"assets/assets/icons/google.svg": "d44733046e69f5722a7de9d2640dd7f9",
"assets/assets/icons/more.svg": "d2a32d6c251ca12bf8e641d4443c4f10",
"assets/assets/icons/media.svg": "2d890842d28a53d38cb41d4fb87da838",
"assets/assets/icons/collection.svg": "485af62a3e7a60a7adbe415588efb296",
"assets/assets/icons/language.svg": "adc67bdfbdcfb11fddd05d50bf1a7918",
"assets/assets/icons/start-chat.svg": "17c8c50f4b654651a8c6cda47c14e29b",
"assets/assets/icons/success.svg": "3c3d461779b83f0c4aa48f8c794dff52",
"assets/assets/icons/inbox.gif": "53f12e3c8a5e56e5b4fe309d8eb7a7cf",
"assets/assets/icons/profile.svg": "df9b0bc5e963fb457fcd4d89fb1e42d9",
"assets/assets/icons/share.svg": "7f8b1a1c930a8235627cd273251f113f",
"assets/assets/icons/twitter.svg": "6a9c8560b02ec799a0e0ba92d0d3f2de",
"assets/assets/icons/comment.svg": "be37b33589a65c7fabd88b980549a37e",
"assets/assets/icons/discover-filled.svg": "c493010c732b8ebffd2ec11fe7c01d94",
"assets/assets/icons/apple.svg": "28c27222c9ef644a0c77cce2a2546c85",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
