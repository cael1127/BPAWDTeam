// Service Worker for MindWell Mental Health Campaign
// Provides offline functionality and caching for PWA features

const CACHE_NAME = 'mindwell-v1.0.0';
const STATIC_CACHE = 'mindwell-static-v1';
const DYNAMIC_CACHE = 'mindwell-dynamic-v1';

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/offline.html'
];

// Crisis resources that should always be available
const CRISIS_RESOURCES = [
  '/crisis-helplines.html',
  '/emergency-contacts.html',
  '/crisis-intervention.html'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error caching static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  if (request.method === 'GET') {
    // API requests - network first, then cache
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(handleApiRequest(request));
    }
    // Static assets - cache first, then network
    else if (isStaticAsset(request)) {
      event.respondWith(handleStaticAsset(request));
    }
    // HTML pages - network first, then cache
    else if (request.headers.get('accept').includes('text/html')) {
      event.respondWith(handleHtmlRequest(request));
    }
    // Other resources - cache first
    else {
      event.respondWith(handleOtherRequest(request));
    }
  }
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    // Try network first for fresh data
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed for API request, trying cache');
    
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response for API requests
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'You are currently offline. Some features may not be available.',
        cached: false
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Failed to fetch static asset:', request.url);
    
    // Return a fallback response for images
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="#6b7280" font-family="sans-serif" font-size="14">Image unavailable offline</text></svg>',
        {
          headers: { 'Content-Type': 'image/svg+xml' }
        }
      );
    }
    
    throw error;
  }
}

// Handle HTML requests with network-first strategy
async function handleHtmlRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed for HTML request, trying cache');
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    return caches.match('/offline.html');
  }
}

// Handle other requests with cache-first strategy
async function handleOtherRequest(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Failed to fetch resource:', request.url);
    throw error;
  }
}

// Check if request is for a static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith('/static/') ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/) ||
    url.pathname === '/manifest.json'
  );
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync triggered:', event.tag);
  
  if (event.tag === 'mood-tracking') {
    event.waitUntil(syncMoodData());
  } else if (event.tag === 'appointment-request') {
    event.waitUntil(syncAppointmentRequests());
  }
});

// Sync mood tracking data when back online
async function syncMoodData() {
  try {
    // Get offline mood data from IndexedDB
    const offlineData = await getOfflineMoodData();
    
    if (offlineData.length > 0) {
      console.log('Service Worker: Syncing offline mood data:', offlineData.length, 'entries');
      
      for (const data of offlineData) {
        try {
          await fetch('/api/mood-tracker', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          // Remove from offline storage after successful sync
          await removeOfflineMoodData(data.id);
        } catch (error) {
          console.error('Service Worker: Failed to sync mood data:', error);
        }
      }
    }
  } catch (error) {
    console.error('Service Worker: Error syncing mood data:', error);
  }
}

// Sync appointment requests when back online
async function syncAppointmentRequests() {
  try {
    const offlineRequests = await getOfflineAppointmentRequests();
    
    if (offlineRequests.length > 0) {
      console.log('Service Worker: Syncing offline appointment requests:', offlineRequests.length, 'requests');
      
      for (const request of offlineRequests) {
        try {
          await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
          });
          
          // Remove from offline storage after successful sync
          await removeOfflineAppointmentRequest(request.id);
        } catch (error) {
          console.error('Service Worker: Failed to sync appointment request:', error);
        }
      }
    }
  } catch (error) {
    console.error('Service Worker: Error syncing appointment requests:', error);
  }
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: 'Remember to check in with your mental health today.',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'mood-check',
        title: 'Check My Mood',
        icon: '/mood-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/close-icon.png'
      }
    ]
  };
  
  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.title = data.title || 'MindWell';
  }
  
  event.waitUntil(
    self.registration.showNotification('MindWell', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'mood-check') {
    event.waitUntil(
      clients.openWindow('/?action=mood-check')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions for offline data management
async function getOfflineMoodData() {
  // This would typically use IndexedDB
  // For now, return empty array
  return [];
}

async function removeOfflineMoodData(id) {
  // This would typically use IndexedDB
  console.log('Service Worker: Removing offline mood data:', id);
}

async function getOfflineAppointmentRequests() {
  // This would typically use IndexedDB
  return [];
}

async function removeOfflineAppointmentRequest(id) {
  // This would typically use IndexedDB
  console.log('Service Worker: Removing offline appointment request:', id);
}

// Message handling for communication with main thread
self.addEventListener('message', event => {
  console.log('Service Worker: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('Service Worker: Script loaded successfully');

