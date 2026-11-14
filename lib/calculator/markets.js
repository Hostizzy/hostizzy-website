// Market benchmarks for the revenue calculator.
//
// Every number here comes from public short-term-rental data for entire
// homes, checked on 14 Nov 2026:
//   - AirROI city pages (airroi.com/airbnb-data/india/...), trailing 12 months
//     Nov 2025 – Oct 2026. Used for nightly rate by bedroom count (medians)
//     and for the "low" occupancy case (average across all active listings,
//     which includes part-year listings and so runs low).
//   - Airbtics (airbtics.com), Sep 2025 – Aug 2026. Used for the "typical"
//     occupancy case (median active listing) where it covers the city.
// No Hostizzy portfolio data is used.
//
// adr:   nightly rate in ₹ for 1, 2, 3, 4, 5+ bedrooms.
//        basis 'bedroom' = AirROI per-bedroom medians for that city.
//        basis 'city'    = only a city average is published; the per-bedroom
//                          rates are spread from it with BEDROOM_CURVE.
// occ:   [low, typical] annual occupancy %. "Strong" is derived in the model.
// est:   indexes of bedroom counts with no published median, filled from
//        the 2-bedroom rate with BEDROOM_CURVE.
// peak / low: months as reported by AirROI.

export const DATA_PERIOD = 'Nov 2025 – Oct 2026';
export const DATA_CHECKED = '14 Nov 2026';

// Average ratio of each bedroom count's rate to a 2-bedroom's, taken from
// the cities that publish per-bedroom medians (Gurugram, Manali, Jaipur,
// Candolim, Udaipur, Pondicherry).
export const BEDROOM_CURVE = [0.6, 1, 1.8, 2.6, 4.4];

const fromCity = (twoBr) => BEDROOM_CURVE.map((r) => Math.round((twoBr * r) / 50) * 50);

export const REGIONS = [
    { key: 'ncr', label: 'Delhi NCR', season: [1.1, 1.25, 1.0, 0.85, 0.7, 0.75, 0.8, 0.8, 0.85, 1.05, 1.2, 1.25] },
    { key: 'hills', label: 'Himachal & Uttarakhand', season: [0.8, 0.75, 0.9, 1.05, 1.45, 1.6, 0.8, 0.6, 0.65, 0.95, 0.95, 1.25] },
    { key: 'rajasthan', label: 'Rajasthan', season: [1.3, 1.15, 0.95, 0.6, 0.55, 0.55, 0.65, 0.7, 0.75, 1.2, 1.4, 1.6] },
    { key: 'goa', label: 'Goa', season: [1.35, 1.15, 1.0, 0.85, 0.65, 0.6, 0.6, 0.7, 0.75, 0.95, 1.2, 1.6] },
    { key: 'maharashtra', label: 'Maharashtra getaways', season: [1.0, 0.8, 0.85, 0.9, 1.0, 1.15, 1.2, 1.15, 0.8, 0.9, 1.0, 1.35] },
    { key: 'south', label: 'South India', season: [1.05, 0.85, 0.9, 1.05, 1.3, 1.05, 0.9, 0.85, 0.8, 0.75, 0.95, 1.35] },
    { key: 'northeast', label: 'North East', season: [0.8, 0.85, 1.0, 1.2, 1.4, 0.95, 0.7, 0.65, 0.7, 1.15, 1.2, 1.4] },
];

export const MARKETS = {
    // ---- Delhi NCR ----
    'New Delhi': { region: 'ncr', basis: 'city', adr: fromCity(4800), occ: [31, 44], peak: 'Feb', low: 'May' },
    'Gurugram': { region: 'ncr', basis: 'bedroom', adr: [3460, 6296, 10744, 16837, 30750], occ: [24, 30], peak: 'Dec', low: 'May' },
    'Noida': { region: 'ncr', basis: 'city', adr: fromCity(3900), occ: [24, 31], peak: 'Nov', low: 'May' },

    // ---- Himachal & Uttarakhand ----
    'Manali': { region: 'hills', basis: 'bedroom', adr: [3915, 6287, 12273, 13695, 28937], occ: [25, 35], peak: 'Jun', low: 'Aug' },
    'Shimla': { region: 'hills', basis: 'bedroom', adr: [4216, 6260, 10045, 15842, 25559], occ: [22, 29], peak: 'May–Jun', low: 'Aug' },
    'Kasauli': { region: 'hills', basis: 'bedroom', adr: [7980, 8311, 16728, 37979, 50797], occ: [18, 25], peak: 'Jun', low: 'Mar' },
    'Dharamshala': { region: 'hills', basis: 'city', adr: fromCity(5000), occ: [27, 34], peak: 'May–Jun', low: 'Aug' },
    'Mussoorie': { region: 'hills', basis: 'bedroom', adr: [5606, 8694, 16719, 21055, 32637], occ: [26, 33], peak: 'Jun', low: 'Sep' },
    'Rishikesh': { region: 'hills', basis: 'bedroom', adr: [3056, 6377, 8674, 16874, 15282], occ: [24, 33], peak: 'Mar', low: 'Aug' },
    'Nainital': { region: 'hills', basis: 'bedroom', adr: [4249, 7925, 15050, 20600, 34850], est: [3, 4], occ: [25, 29], peak: 'Jun', low: 'Aug' },
    'Dehradun': { region: 'hills', basis: 'city', adr: fromCity(4250), occ: [24, 31], peak: 'Jun', low: 'Sep' },
    'Mukteshwar': { region: 'hills', basis: 'city', adr: fromCity(8350), occ: [20, 27], peak: 'Jun', low: 'Feb' },

    // ---- Rajasthan ----
    'Jaipur': { region: 'rajasthan', basis: 'bedroom', adr: [2738, 4801, 7829, 14313, 19235], occ: [25, 32], peak: 'Nov', low: 'Apr' },
    'Udaipur': { region: 'rajasthan', basis: 'bedroom', adr: [3303, 6331, 10238, 14075, 23809], occ: [24, 31], peak: 'Dec', low: 'Sep' },
    'Jodhpur': { region: 'rajasthan', basis: 'city', adr: fromCity(5100), occ: [23, 30], peak: 'Dec', low: 'Apr' },

    // ---- Goa ----
    'North Goa': { region: 'goa', basis: 'bedroom', adr: [4308, 6932, 14313, 20248, 37439], occ: [35, 48], peak: 'Dec', low: 'Jul' },
    'South Goa': { region: 'goa', basis: 'city', adr: fromCity(6300), occ: [38, 48], peak: 'Dec', low: 'Apr' },

    // ---- Maharashtra ----
    'Lonavala': { region: 'maharashtra', basis: 'bedroom', adr: [5703, 8012, 13963, 19100, 34283], occ: [22, 30], peak: 'Dec', low: 'Feb' },
    'Alibag': { region: 'maharashtra', basis: 'bedroom', adr: [6469, 9752, 18994, 23166, 40099], occ: [23, 30], peak: 'Dec', low: 'Sep' },
    'Mahabaleshwar': { region: 'maharashtra', basis: 'city', adr: fromCity(11900), occ: [23, 30], peak: 'Dec', low: 'Aug' },

    // ---- South India ----
    'Coorg': { region: 'south', basis: 'bedroom', adr: [4937, 5387, 7135, 13126, 23700], est: [4], occ: [22, 29], peak: 'Dec', low: 'Feb' },
    'Ooty': { region: 'south', basis: 'bedroom', adr: [6232, 8333, 12815, 20227, 36650], est: [4], occ: [26, 33], peak: 'May', low: 'Oct' },
    'Munnar': { region: 'south', basis: 'city', adr: fromCity(7000), occ: [25, 32], peak: 'May', low: 'Jul' },
    'Wayanad': { region: 'south', basis: 'city', adr: fromCity(6550), occ: [22, 29], peak: 'Dec', low: 'Oct' },
    'Pondicherry': { region: 'south', basis: 'bedroom', adr: [3943, 5937, 8957, 13608, 16430], occ: [27, 34], peak: 'Dec', low: 'Apr' },

    // ---- North East ----
    'Gangtok': { region: 'northeast', basis: 'bedroom', adr: [2249, 4259, 7088, 11662, 18750], est: [4], occ: [26, 33], peak: 'May', low: 'Sep' },
    'Shillong': { region: 'northeast', basis: 'bedroom', adr: [3168, 4365, 8437, 11350, 19200], est: [3, 4], occ: [29, 36], peak: 'Dec', low: 'Aug' },
    'Darjeeling': { region: 'northeast', basis: 'bedroom', adr: [2888, 4089, 5677, 10650, 18000], est: [3, 4], occ: [27, 34], peak: 'May', low: 'Sep' },
};

// The cities where Hostizzy offers full on-ground management today
// (see CLAUDE.md "Service Model"). Elsewhere it is remote co-hosting.
// TotalCare360 and StayPrime. Uttar Pradesh also has full management but no
// market in this dataset; Rajasthan, Goa and the North East are coming soon.
export const FULL_MANAGEMENT_REGIONS = ['ncr', 'hills'];

export const SOURCES = [
    { name: 'AirROI market data', url: 'https://www.airroi.com/', period: 'Nov 2025 – Oct 2026' },
    { name: 'Airbtics market data', url: 'https://airbtics.com/', period: 'Sep 2025 – Aug 2026' },
    { name: 'Airbnb host service fees', url: 'https://www.airbnb.co.in/help/article/1857', period: 'checked Nov 2026' },
    { name: 'GST on accommodation, Notification 15/2025-CT(Rate)', url: 'https://cbic-gst.gov.in/', period: 'from 22 Sep 2025' },
];
