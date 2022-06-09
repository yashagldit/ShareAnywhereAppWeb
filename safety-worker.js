/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// tslint:disable:no-console

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());

  event.waitUntil(self.registration.unregister().then(() => {
    console.log('NGSW Safety Worker - unregistered old service worker');
  }));

  event.waitUntil(caches.keys().then(cacheNames => {
    const ngswCacheNames = cacheNames.filter(name => /^ngsw:/.test(name));
    return Promise.all(ngswCacheNames.map(name => caches.delete(name)));
  }));
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // If this is an incoming POST request for the
  // registered "action" URL, respond to it.
  if (event.request.method === 'POST' ) {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const link = formData.get('link') || '';
      console.log(formData);
      
    //  const responseUrl = await saveBookmark(link);
      return Response.redirect('/', 200);
    })());
  }
});