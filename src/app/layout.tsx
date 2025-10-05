import type { Metadata } from 'next';
import { Noto_Sans_Mono, Noto_Sans, Jersey_15 } from 'next/font/google';
import '@/styles/globals.css';
import Footer from './_components/Footer';

const notoSans = Noto_Sans({
    variable: '--font-noto-sans',
    subsets: ['latin'],
});

const notoSansMono = Noto_Sans_Mono({
    variable: '--font-noto-sans-mono',
    subsets: ['latin'],
});

const jersey15 = Jersey_15({
    weight: ['400'],
    variable: '--font-jersey-15',
    subsets: ['latin'],
});

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
        <html lang="de">
            <body
                className={`${notoSans.variable} ${notoSansMono.variable} ${jersey15.variable} selection:bg-amber-600 antialiased`}
            >
                <div className="font-sans mt-16 mb-12 max-w-xl px-4 m-auto">
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
