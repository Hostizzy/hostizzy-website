// The admin login must never be indexed. robots.txt disallows crawling and the
// sitemap excludes it, but a disallowed URL can still be listed if it is linked
// from elsewhere — only a robots meta tag reliably keeps it out of results.
export const metadata = {
    title: 'Admin | Hostizzy',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
    },
};

export default function AdminLayout({ children }) {
    return <>{children}</>;
}
