import { NextResponse, NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const url = request.nextUrl;
    let hostname = request.headers.get('host') || '';
    const rootDomain = 'digimunea.de';
    const isLocalhost = hostname?.includes('localhost');
    let subdomain = '';

    if (!isLocalhost && hostname.endsWith(`.${rootDomain}`)) {
        subdomain = hostname.replace(`.${rootDomain}`, '').split('.')[0];
    }

    if (!subdomain || subdomain === 'www' || hostname === rootDomain || isLocalhost) {
        return NextResponse.rewrite(new URL(`/home`, request.url));
    }

    // Rewrite subdomains to /apps/[subdomain]
    return NextResponse.rewrite(new URL(`/apps/${subdomain}`, request.url));
}

export const config = {
    matcher: '/((?api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
};
