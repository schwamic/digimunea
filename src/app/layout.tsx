import { Noto_Sans_Mono, Noto_Sans, Jersey_15 } from 'next/font/google';

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
                {children}
            </body>
        </html>
    );
}
