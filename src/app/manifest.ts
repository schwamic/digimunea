import type { MetadataRoute } from 'next';

// https://nextjs.org/docs/app/guides/progressive-web-apps#3-implementing-server-actions

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Push Notifications [P15Ns]',
        short_name: 'P15Ns',
        description: 'A push notification service for hobby projects.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#bad7de',
        theme_color: '#bad7de',
        lang: 'de',
        icons: [
            {
                src: '/apps/notifications/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/apps/notifications/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/apps/notifications/icon.svg',
                type: 'image/svg+xml',
                purpose: 'maskable',
            },
        ],
    };
}
