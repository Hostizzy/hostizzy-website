import { NextResponse } from 'next/server';

// admin.hostizzy.com used to serve this site's admin panel. The panel is
// gone (website leads go to HostSuite), so the subdomain sends people there.
export function middleware(request) {
    const hostname = request.headers.get('host') || '';
    if (hostname.startsWith('admin.')) {
        return NextResponse.redirect('https://hostos.hostizzy.com', 307);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
