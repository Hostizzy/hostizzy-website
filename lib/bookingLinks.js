// Deep links into the guest booking site (book.hostizzy.com).
//
// hostizzy.com sells to property owners; the booking site is a separate
// guest-facing domain on purpose (the two audiences should not mix). These
// links send guests who land here to a specific, relevant booking page
// instead of the booking site's bare home page — which also passes topical
// relevance to those pages, since they get almost no other links.
//
// Every URL below returned 200 when checked on 2026-11-13. Only add a path
// after checking it live: state pages such as /stays/haryana were still 404
// at that time, and /stays/neemrana redirects (308), so they are left out.
// Anchor text names the place or theme — never "Book now".

export const BOOKING_SITE = 'https://book.hostizzy.com';

const url = (path) => `${BOOKING_SITE}${path}`;

export const STAY_CITIES = [
    { label: 'Stays in Gurugram', href: url('/stays/gurugram') },
    { label: 'Stays in New Delhi', href: url('/stays/new-delhi') },
    { label: 'Weekend stays in Sohna', href: url('/stays/sohna') },
    { label: 'Hill stays in Mussoorie', href: url('/stays/mussoorie') },
    { label: 'Stays in Dehradun', href: url('/stays/dehradun') },
    { label: 'Mountain stays in Mukteshwar', href: url('/stays/mukteshwar') },
    { label: 'Hill stays in Shimla', href: url('/stays/shimla') },
    { label: 'Stays in Jawai, Rajasthan', href: url('/stays/jawai') },
];

export const STAY_COLLECTIONS = [
    { label: 'Villas with a private pool near Delhi', href: url('/collections/private-pool-villas-near-delhi') },
    { label: 'Farmhouses in Gurugram', href: url('/collections/farmhouses-in-gurugram') },
    { label: 'Pet-friendly farmhouses near Delhi', href: url('/collections/pet-friendly-farmhouses-near-delhi') },
    { label: 'Party and celebration villas near Delhi', href: url('/collections/celebration-villas-near-delhi') },
    { label: 'Villas for large groups near Delhi', href: url('/collections/large-group-villas-near-delhi') },
    { label: 'Wedding venues and farmhouses near Delhi', href: url('/collections/wedding-venues-near-delhi') },
    { label: 'Hill villas and homestays from Delhi', href: url('/collections/hill-escapes') },
];

// Guest pages that match each owner-facing /locations/<slug> page.
// Rajasthan has no live state page yet; Jawai is its only live city page.
export const LOCATION_STAYS = {
    'delhi-ncr': [
        { label: 'Stays in Gurugram', href: url('/stays/gurugram') },
        { label: 'Stays in New Delhi', href: url('/stays/new-delhi') },
        { label: 'Villas with a private pool near Delhi', href: url('/collections/private-pool-villas-near-delhi') },
    ],
    'himachal-pradesh': [
        { label: 'Hill stays in Shimla', href: url('/stays/shimla') },
        { label: 'Stays in Barog', href: url('/stays/barog') },
    ],
    'uttarakhand': [
        { label: 'Hill stays in Mussoorie', href: url('/stays/mussoorie') },
        { label: 'Stays in Dehradun', href: url('/stays/dehradun') },
        { label: 'Mountain stays in Mukteshwar', href: url('/stays/mukteshwar') },
    ],
    'rajasthan': [
        { label: 'Stays in Jawai', href: url('/stays/jawai') },
    ],
};
