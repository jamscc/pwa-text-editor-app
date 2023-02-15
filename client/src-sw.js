const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
const { NetworkFirst } = require('workbox-strategies');
const cnm = { cacheName: 'assets' };
const nf = new NetworkFirst(cnm);

const rq = ({ request }) => {
  const { destination } = request;
  switch (destination) {
    case ('document'):
      return true;
    case ('script'):
      return true;
    case ('image'):
      return true;
    case ('worker'):
      return true;
    case ('style'):
      return true;
    default:
      return;
  }
};
registerRoute(rq, nf);