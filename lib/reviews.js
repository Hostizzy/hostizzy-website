// Published guest-review figures, in one place so the homepage and the
// testimonials page can never drift apart.
//
// Source: HostSuite production, read 29 September 2026.
//   Airbnb      238 reviews, avg 4.87   (Dec 2019 - Apr 2026)
//   MakeMyTrip   14 reviews, avg 4.93   (Dec 2023 - Mar 2026)
//   Google        1 review,      5.0    (Jun 2026)
//   -> 253 reviews, weighted average 4.87
//
// Excluded: 4 reviews from HostSuite's own post-stay form (avg 3.75). Too few
// to be meaningful and not third-party verifiable, so they are not mixed in.
//
// Two caveats, both live:
//   - Booking.com reads zero because it has never been imported, NOT because
//     there are no reviews there. The real total is higher than 253.
//   - The Airbnb import runs only to April 2026, so this understates. Re-read
//     the Airbnb and MakeMyTrip dashboards before revising these numbers.
//
// These figures deliberately do NOT go into aggregateRating schema; see the
// note above the JSON-LD block in app/layout.jsx for why.
export const REVIEW_RATING = 4.87;
export const REVIEW_COUNT = 253;
export const REVIEWS_UPDATED = 'September 2026';
export const REVIEW_SOURCES = 'Airbnb, MakeMyTrip and Google';
