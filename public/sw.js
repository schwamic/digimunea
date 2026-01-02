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
        event.waitUntil(
            Promise.all([
                sendMessageToClients(options.data, options.body, options.title),
                self.registration.showNotification(data.title, options),
            ]),
        );
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

async function sendMessageToClients(metadata, message, title) {
    const allClients = await self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window',
    });
    allClients.forEach((client) =>
        client.postMessage({
            source: 'sw',
            data: {
                metadata,
                body: { message, title },
            },
        }),
    );
}
