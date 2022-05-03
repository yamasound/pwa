// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
	'/pwa/',
	'/pwa/css/style.css',
	'/pwa/drawer.js'
];

// インストール処理
function my_install(event) {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(urlsToCache);
			})
	);
}
self.addEventListener('install', my_install)

// リソースフェッチ時のキャッシュロード処理
function my_fetch(event) {
	event.respondWith(
		caches
			.match(event.request)
			.then(function(response) {
				return response ? response : fetch(event.request);
			})
	);
}
self.addEventListener('fetch', my_fetch)
