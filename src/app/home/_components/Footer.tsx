'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();

    return (
        <footer className={`${className} flex justify-center space-x-6 text-sm`}>
            {urls.map(
                (url) =>
                    url.href !== pathname && (
                        <Link key={url.href} href={url.href} className="underline">
                            {url.label}
                        </Link>
                    ),
            )}
        </footer>
    );
}

const urls = [
    {
        href: '/home',
        label: 'Startseite',
    },
    {
        href: '/home/references',
        label: 'Referenzen',
    },
    {
        href: '/home/legal-notice',
        label: 'Impressum',
    },
    {
        href: '/home/privacy-policy',
        label: 'Datenschutz',
    },
];
