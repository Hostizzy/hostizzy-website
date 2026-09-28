// The site's Open Graph image, in one place.
//
// Next.js does not merge a child route's `openGraph` into its parent's — the
// child object replaces it wholesale. So a layout that sets openGraph without
// `images` silently drops the inherited image, which is how 22 of the 23 pages
// here ended up sharing with no preview image at all. Every layout that sets
// openGraph must restate `images: OG_IMAGE`.
//
// The file-based `app/opengraph-image.jpg` convention does not solve this: it
// applies to the root segment but is overridden the same way by any child that
// declares its own openGraph.
export const OG_IMAGE = [
    {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hostizzy — Vacation Rental Made Easy. Empowering Owners. Enriching Guests.',
    },
];
