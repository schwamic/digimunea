import type { MetadataRoute } from 'next';

// https://nextjs.org/docs/app/guides/progressive-web-apps#3-implementing-server-actions

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Push Notifications',
        short_name: 'P15Ns',
        description: 'A push notification service for hobby projects.',
        start_url: '/',
        display: 'standalone',
        background_color: '#bad7de',
        theme_color: '#213e45',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    };
}
