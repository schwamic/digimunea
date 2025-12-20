import { NextResponse, NextRequest } from 'next/server';

const DOMAIN = 'digimunea.de';
const LOCALHOST = 'localhost';

export function middleware(request: NextRequest) {
    const host = request.headers.get('host') ?? '';
    const pathname = request.nextUrl.pathname;
    const hostname = host.split(':')[0];

    // ROOT
    if (hostname === DOMAIN || hostname === `www.${DOMAIN}` || hostname === LOCALHOST) {
        const url = request.nextUrl.clone();
        url.pathname = `/home${pathname}`;
        return NextResponse.rewrite(url);
    }

    // SUBDOMAIN
    const isLocalhost = hostname.endsWith(`.${LOCALHOST}`);
    const isDomain = hostname.endsWith(`.${DOMAIN}`);
    if (isDomain || isLocalhost) {
        const subdomain = isDomain ? hostname.replace(`.${DOMAIN}`, '') : hostname.replace(`.${LOCALHOST}`, '');
        const url = request.nextUrl.clone();
        url.pathname = `/apps/${subdomain}${pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|_static|_vercel|.*\\..+).*)'],
};
