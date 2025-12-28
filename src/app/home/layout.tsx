import type { Metadata } from 'next';
import '@src/lib/client/styles/home/global.css';
import Footer from '@src/app/home/_components/Footer';

export const metadata: Metadata = {
    title: 'digimunea – Michael Schwarz M.Sc.',
    description: 'Research & Engineering',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="font-sans mt-16 mb-12 max-w-xl px-4 m-auto">
            {children}
            <Footer className="mt-28" />
        </div>
    );
}
