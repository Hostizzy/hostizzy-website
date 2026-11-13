// Single source of truth for Hostizzy's products: names, one-liners, URLs,
// statuses and store links. The navbar, technology page, product pages, home
// and structured data all read from here, so a rename or a launch is a
// one-file change.
//
// Facts as of November 2026 (site audit, section 0):
// - HostSuite (formerly HostOS) is the PMS. Self-serve SaaS on
//   hostos.hostizzy.com (the domain did NOT change): from ₹999/month, 14-day
//   free trial, no card. Android app is in Play release prep, not live yet.
// - ResIQ is an app for independent homestay, villa and farmstay owners. Live
//   on Google Play and web. Not aimed at management companies.
// - JuxTravel is the traveller app. Launched 15 September 2026, live across
//   India, Android only.

// How many properties Hostizzy manages. Owner decision (Nov 2026): "35+"
// everywhere, with no city count. Use this constant wherever a page prints
// the number, so the next change is one line.
export const PROPERTY_COUNT = '35+';

// ResIQ public sign-up. When true the ResIQ page shows "Get it on Google
// Play" and "Start free" plus the founding offer; when false it falls back to
// a plain link to the ResIQ site. Owner decision (audit #28).
export const RESIQ_PUBLIC_SIGNUP = false;

export const ORG_ID = 'https://www.hostizzy.com/#organization';
export const SITE_URL = 'https://www.hostizzy.com';

export const HOSTSUITE = {
    key: 'hostsuite',
    name: 'HostSuite',
    lockup: 'HostSuite by Hostizzy',
    formerly: 'HostOS',
    tagline: 'Everything a host needs. Together.',
    navDesc: 'Property management system',
    category: 'Property management system',
    oneLiner: 'The property management system for hosting businesses and their teams. Self-serve from ₹999/month.',
    audience: 'Hosting businesses and their teams',
    status: 'Live',
    statusLine: 'Live · Web · 14-day free trial',
    path: '/products/hostsuite',
    url: 'https://hostos.hostizzy.com',
    signupUrl: 'https://hostos.hostizzy.com/register',
    pricingUrl: 'https://hostos.hostizzy.com/pricing',
    demoUrl: 'https://hostos.hostizzy.com/contact',
    featuresUrl: 'https://hostos.hostizzy.com/features',
    priceFrom: '₹999/month',
    priceFromNumber: 999,
    trial: '14-day free trial, no credit card required',
    playUrl: null,
    appNote: 'Android app coming to Google Play',
    logo: {
        symbol: '/products/hostsuite/hostsuite-symbol.svg',
        symbolWhite: '/products/hostsuite/hostsuite-symbol-white.svg',
        icon: '/products/hostsuite/hostsuite-icon-teal.svg',
    },
    color: '#00737E',
};

export const RESIQ = {
    key: 'resiq',
    name: 'ResIQ',
    navDesc: 'Bookings app for homestay owners',
    category: 'Owner app',
    oneLiner: 'Bookings, payments, guest IDs and WhatsApp templates in one app for independent homestay, villa and farmstay owners.',
    audience: 'Owners running their own homestay, villa or farmstay',
    status: 'Live',
    statusLine: 'Live · Google Play + web · first property free',
    path: '/products/resiq',
    url: 'https://resiq.hostizzy.com',
    webAppUrl: 'https://resiq.hostizzy.com/app',
    signupUrl: 'https://resiq.hostizzy.com/#signup',
    playUrl: 'https://play.google.com/store/apps/details?id=com.hostizzy.resiq',
    offer: 'Founding offer: the first 10 owners keep their first property free, permanently.',
    logo: {
        icon: '/products/resiq/resiq-logo-128.png',
    },
};

export const JUXTRAVEL = {
    key: 'juxtravel',
    name: 'JuxTravel',
    navDesc: 'Trip-matching app for travellers',
    category: 'Traveller app',
    oneLiner: 'A trip-matching app for travellers in India, carrying independent homestays and villas only.',
    audience: 'Travellers looking for independent stays',
    status: 'Live',
    launchDate: '15 September 2026',
    launchDateISO: '2026-09-15',
    statusLine: 'Live across India since 15 September 2026 · Android',
    path: '/products/juxtravel',
    url: 'https://juxtravel.com',
    playUrl: 'https://play.google.com/store/apps/details?id=com.hostsphere.juxtravel',
    hostsUrl: 'https://juxtravel.com/homestay-owners',
    hostConsoleUrl: 'https://app.juxtravel.com/host',
    // JuxTravel brand art: use as supplied. Do not recolour or crop.
    logo: {
        mark: '/products/juxtravel/juxtravel_mark.webp',
        wordmark: '/products/juxtravel/wordmark_color.webp',
        wordmarkWhite: '/products/juxtravel/wordmark_white.webp',
    },
    screens: {
        home: '/products/juxtravel/app-home-129.webp',
        passport: '/products/juxtravel/app-passport-129.webp',
    },
};

// The guest booking site. Guests never see the HostSuite brand.
export const BOOKING_SITE = {
    name: 'book.hostizzy.com',
    url: 'https://book.hostizzy.com',
};

export const PRODUCTS = [HOSTSUITE, RESIQ, JUXTRAVEL];

// Stable JSON-LD @id for each product's SoftwareApplication node.
export const productSchemaId = (p) => `${SITE_URL}${p.path}#software`;
