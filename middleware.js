import { NextResponse } from 'next/server';

export function middleware(request) {
    const hostname = request.headers.get('host') || '';

    // If accessing via admin.hostizzy.com, rewrite to /admin routes
    if (hostname.startsWith('admin.')) {
        const url = request.nextUrl.clone();
        const path = url.pathname;

        // Don't rewrite API routes or static files
        if (path.startsWith('/api/') || path.startsWith('/_next/') || path.startsWith('/images/')) {
            return NextResponse.next();
        }

        // Root of admin subdomain → /admin
        if (path === '/') {
            url.pathname = '/admin';
            return NextResponse.rewrite(url);
        }

        // admin.hostizzy.com/blogs → /admin (single page app handles tabs)
        // admin.hostizzy.com/anything → /admin
        if (!path.startsWith('/admin')) {
            url.pathname = '/admin';
            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
