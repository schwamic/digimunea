import type { Metadata } from 'next';
import ReactQueryProvider from '@src/lib/client/ReactQueryProvider';
import { Footer } from '@src/app/apps/notifications/_components';
import '@src/lib/client/styles/apps/notifications/global.css';

const APP_NAME = 'P15Ns';
const APP_DEFAULT_TITLE = 'Push Notifications [P15Ns]';
const APP_TITLE_TEMPLATE = `%s - ${APP_NAME}`;
const APP_DESCRIPTION = 'A push notification service for hobby projects.';

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    authors: [{ name: 'Schwarz M.', url: 'https://digimunea.de' }],
    creator: 'Schwarz M.',
    publisher: 'Schwarz M.',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE,
    },
    icons: {
        apple: [{ url: '/apps/notifications/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: 'website',
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: 'summary',
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReactQueryProvider>
            <main className="font-sans mt-16 mb-12 max-w-2xl sm:px-4 m-auto">{children}</main>
            <Footer />
        </ReactQueryProvider>
    );
}
