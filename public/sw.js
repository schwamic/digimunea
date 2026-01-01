// Handle incoming push notifications
self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: data.icon || '/apps/notifications/icon-192x192.png',
            badge: '/apps/notifications/badge-96x96.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2',
            },
        };
        event.waitUntil(self.registration.showNotification(data.title, options));
    }
});

// Handle if push notification is clicked
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    console.log(event.notification.data);
    event.waitUntil(
        clients.openWindow(
            'https://notifications.digimunea.de?source=sw&data=' + JSON.stringify(event.notification.data),
        ),
    );
});
