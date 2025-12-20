import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Push Notifications [P15Ns]',
    description: 'A push notification service for hobby projects.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="font-sans mt-16 mb-12 max-w-xl px-4 m-auto">{children}</div>;
}
