importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.setConfig({debug: false});

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1'},
    { url: '/package-lock.json', revision: '1'},
    { url: '/index.html', revision: '2' },
    { url: '/nav.html', revision: '1' },
    { url: '/404.html', revision: '1' },
    { url: '/manifest.json', revision: '1'},
    { url: '/pages/404.html', revision: '1'},
    { url: '/pages/home.html', revision: '1'},
    { url: '/pages/standings.html', revision: '1'},
    { url: '/pages/matches.html', revision: '1'},
    { url: '/pages/savedTeams.html', revision: '1'},
    { url: '/teamdetail.html', revision: '2'},
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/index.js', revision: '1' },
    { url: '/detail.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/notif.js', revision: '1' },
    { url: '/js/getSavedMain.js', revision: '1' },
    { url: '/js/notifPermiss.js', revision: '1' },
    { url: '/js/registSW.js', revision: '1' },
    { url: '/img/icon-home-v1.png', revision: '1' },
    { url: '/img/UEFA-Champ-2021.webp', revision: '1' },
    { url: '/img/maskable_icon_x48.png', revision: '1' },
    { url: '/img/maskable_icon_x72.png', revision: '1' },
    { url: '/img/maskable_icon_x96.png', revision: '1' },
    { url: '/img/maskable_icon_x128.png', revision: '1' },
    { url: '/img/icon-152x152.png', revision: '1' },
    { url: '/img/icon-512x512.png', revision: '1' },
    { url: '/img/maskable_icon_x192.png', revision: '1' },
    { url: '/img/maskable_icon_x384.png', revision: '1' },
    { url: '/img/maskable_icon_x512.png', revision: '1' },
  ],
  { ignoreUrlParametersMatching: [/.*/] }
);

workbox.routing.registerRoute(
    new RegExp('http://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'data',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60*60*24*365,
            }),
        ]
    })
)

workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com/icon?family=Material+Icons'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'icon',
    plugins: [
      new workbox.expiration.Plugin({
          maxAgeSeconds: 60*60*24*365,
      }),
  ]
  })
)
