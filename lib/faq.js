// FAQ content for /faq. One list feeds both the page and its FAQPage
// schema, so what Google reads always matches what visitors see.
// Plan terms must match app/services/page.jsx.

export const FAQS = [
    {
        q: 'How do I list my property with Hostizzy?',
        a: 'Tell us about it through the property form on our contact page, or after using the revenue calculator. Our team calls you within 24 hours, looks at the property, recommends a plan, and then sets up your listings, photos and pricing.',
    },
    {
        q: 'What do your plans cost?',
        a: 'SmartStart is ₹14,999 one-time to get you listed. ChannelPro is ₹15,000–40,000 a month fixed, or 15% of net revenue. Hybrid Core is 20% of net revenue. TotalCare360 is 30% of net revenue, with you paying running costs. StayPrime, for apartments, is a 50-50 revenue split with Hostizzy paying running costs. Signature, our premium plan for villas and farmhouses with 3 or more bedrooms, is 30% of net revenue plus 15% of any revenue above a yearly target we agree with you, and adds paid ads for direct bookings. On SmartStart, ChannelPro and Hybrid Core, the direct booking site and channel manager are extra and billed at actual cost; TotalCare360, StayPrime and Signature include them.',
    },
    {
        q: 'How is revenue share calculated?',
        a: 'On net revenue: the gross booking value minus the booking sites’ service fees. ChannelPro’s revenue option is 15%, Hybrid Core 20% and TotalCare360 30% of it; StayPrime is a 50-50 split of it. Signature is 30% of it, plus 15% of whatever goes above the yearly target we agree with you.',
    },
    {
        q: 'Where do you offer full management?',
        a: 'Complete management (TotalCare360, StayPrime and Signature) is available in Delhi NCR, Uttarakhand, Himachal Pradesh and Uttar Pradesh, and is coming soon to Rajasthan, Goa and North East India. Co-hosting plans are available across India, including Goa, Kerala and Karnataka.',
    },
    {
        q: 'Which booking sites will my property be on?',
        a: 'We list on 10+ booking channels, including Airbnb, Booking.com, MakeMyTrip, Goibibo and Agoda, and on our own booking site, book.hostizzy.com, where guests book direct without a booking-site commission.',
    },
    {
        q: 'How much can my property earn?',
        a: 'It depends on the town, size and how busy the home is. Our revenue calculator uses what similar homes in 33 Indian markets actually earned in the last 12 months, and shows a quiet, typical and strong year with every fee taken out.',
    },
    {
        q: 'Do you provide housekeeping and maintenance?',
        a: 'Yes, on TotalCare360 and StayPrime we run housekeeping, laundry and maintenance. On StayPrime Hostizzy also pays for staff and supplies. On co-hosting plans you run the property on site and we handle bookings, pricing and guests.',
    },
    {
        q: 'Do you handle guest vetting?',
        a: 'Yes. We verify guests across all booking platforms before confirming stays.',
    },
    {
        q: 'What happens if a guest damages my property?',
        a: 'We collect security deposits where the booking allows it, and help with claims through the booking platform, such as Airbnb AirCover.',
    },
    {
        q: 'Can I still use my property myself?',
        a: 'Yes. Tell your Hostizzy manager the dates and we block them on every channel.',
    },
    {
        q: 'Is there a minimum contract period?',
        a: 'Standard contracts are one year, which gives us time to tune pricing and reviews. You can switch plans with 30 days’ notice.',
    },
    {
        q: 'I want to book a stay. Where do I go?',
        a: 'Browse and book Hostizzy homes directly at book.hostizzy.com.',
    },
];

export const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};
