// Handle incoming push notifications

const channel = new BroadcastChannel('sw-p15ns-messages');

self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            title: data.title,
            body: data.body,
            tag: 'p15ns',
            renotify: true,
            icon: data.icon || '/apps/notifications/icon-192x192.png',
            badge: '/apps/notifications/badge-96x96.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2',
            },
        };
        channel.postMessage({
            metadata: options.data,
            body: { message: options.body, title: options.title },
        });
        event.waitUntil(self.registration.showNotification(data.title, options));
    }
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    const dataString = encodeURIComponent(
        JSON.stringify({
            metadata: event.notification.data,
            body: { message: event.notification.body, title: event.notification.title },
        }),
    );
    event.waitUntil(clients.openWindow(`https://notifications.digimunea.de?source=sw&data=${dataString}`));
});
