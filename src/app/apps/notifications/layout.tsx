import type { Metadata } from 'next';
import ReactQueryProvider from '@src/lib/client/ReactQueryProvider';
import { Footer } from '@src/app/apps/notifications/_components';
import '@src/lib/client/styles/apps/notifications/global.css';

export const metadata: Metadata = {
    title: 'Push Notifications [P15Ns]',
    description: 'A push notification service for hobby projects.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReactQueryProvider>
            <main className="font-sans mt-16 mb-12 max-w-2xl px-4 m-auto">{children}</main>
            <Footer />
        </ReactQueryProvider>
    );
}
