// Earnings model for the revenue calculator. Pure functions, no React.
//
// Inputs come from public market data (./markets.js) and Hostizzy's
// published plan terms (app/services/page.jsx). Anything that is an
// assumption rather than a published number is listed in ASSUMPTIONS and
// shown to the visitor.

import { MARKETS, REGIONS, FULL_MANAGEMENT_REGIONS } from './markets';

export const PROPERTY_TYPES = [
    { key: 'apartment', label: 'Apartment', adj: 0.9 },
    { key: 'cottage', label: 'Cottage / homestay', adj: 0.95 },
    { key: 'villa', label: 'Villa', adj: 1.1 },
    { key: 'farmhouse', label: 'Farmhouse', adj: 1.1 },
];

export const FINISH_LEVELS = [
    { key: 'standard', label: 'Standard', adj: 0.9 },
    { key: 'premium', label: 'Premium', adj: 1.0 },
    { key: 'luxury', label: 'Luxury', adj: 1.25 },
];

// Blended host-side OTA commission. Airbnb host-only fee is 15.5% (14–16%);
// Booking.com 15–20%; MakeMyTrip/Goibibo 18–25%; Agoda 15–22%.
export const OTA_COMMISSION = 0.17;
// Payment gateway fee on direct bookings.
export const GATEWAY_FEE = 0.02;
// Occupancy a well-run, full-time listing can add on top of the median.
export const STRONG_UPLIFT = 12;

export const ASSUMPTIONS = [
    `OTA commission averages ${OTA_COMMISSION * 100}% across Airbnb (15.5%), Booking.com (15–20%) and MakeMyTrip (18–25%).`,
    `Direct bookings pay a ${GATEWAY_FEE * 100}% payment-gateway fee instead of OTA commission.`,
    'Low case: average occupancy of all active listings in the city, which includes part-year listings.',
    'Typical case: occupancy of the median listing.',
    `Strong case: typical plus ${STRONG_UPLIFT} points — what a full-time, professionally run listing can reach. Not guaranteed.`,
    'Property type and finish adjust the city median rate: apartment −10%, cottage −5%, villa/farmhouse +10%; standard −10%, luxury +25%.',
    'Running costs (housekeeping, laundry, consumables, utilities, caretaker, upkeep) are estimates. Edit them to match your property.',
    'Figures exclude GST, which guests pay on top (5% up to ₹7,500 a night, 18% above).',
];

// Published plans. `fee` returns Hostizzy's annual fee; `ownerPaysCosts`
// says who carries running costs; `direct` is the share of bookings
// expected through Hostizzy's own booking site.
export const PLANS = [
    {
        key: 'smartstart', name: 'SmartStart', price: '₹14,999 one-time',
        summary: 'We set up your listings; you run bookings and the property.',
        direct: 0, ownerPaysCosts: true,
        fee: () => 14999,
    },
    {
        key: 'channelpro', name: 'ChannelPro', price: '10–17% revenue share or fixed fee',
        summary: 'We run channels, pricing and guest messaging; you run the property.',
        direct: 0, ownerPaysCosts: true,
        // Revenue-share option, mid-point of the published 10–17%.
        fee: ({ afterOta }) => 0.15 * afterOta,
    },
    {
        key: 'hybrid', name: 'Hybrid Core', price: '18% of revenue after OTA fees',
        summary: 'ChannelPro plus your own direct-booking site and an account manager.',
        direct: 0.2, ownerPaysCosts: true,
        fee: ({ afterOta }) => 0.18 * afterOta,
    },
    {
        key: 'totalcare', name: 'TotalCare360', price: '30% of profit',
        summary: 'Full management; we run everything, you pay running costs.',
        direct: 0.2, ownerPaysCosts: true, fullManagement: true,
        fee: ({ profit }) => Math.max(0, 0.3 * profit),
    },
    {
        key: 'stayprime', name: 'StayPrime', price: '50-50 revenue split',
        summary: 'Apartments only; we run everything and pay the running costs.',
        direct: 0.2, ownerPaysCosts: false, fullManagement: true, apartmentsOnly: true,
        fee: ({ afterOta }) => 0.5 * afterOta,
    },
];

export const CITIES = Object.keys(MARKETS);

export function defaultCosts(propertyType, bedrooms) {
    const perNight = [900, 1300, 2000, 2700, 3500][bedrooms - 1];
    const monthly = propertyType === 'apartment'
        ? 4000 + 1000 * bedrooms
        : 10000 + 5000 * bedrooms;
    return { perNight, monthly };
}

export function nightlyRate(city, bedrooms, propertyType, finish) {
    const m = MARKETS[city];
    if (!m) return null;
    // Keep rates rising with bedrooms even where a small sample dips.
    let rate = 0;
    for (let i = 0; i < bedrooms; i++) rate = Math.max(rate, m.adr[i]);
    const t = PROPERTY_TYPES.find((p) => p.key === propertyType)?.adj ?? 1;
    const f = FINISH_LEVELS.find((p) => p.key === finish)?.adj ?? 1;
    return Math.round((rate * t * f) / 50) * 50;
}

export function scenarios(city) {
    const [low, typical] = MARKETS[city].occ;
    return { low, typical, strong: Math.min(typical + STRONG_UPLIFT, 60) };
}

// Annual money flow for one plan at one occupancy.
export function planResult(plan, { adr, occupancy, costs }) {
    const nights = Math.round((365 * occupancy) / 100);
    const gross = adr * nights;
    const otaFees = gross * (1 - plan.direct) * OTA_COMMISSION;
    const gatewayFees = gross * plan.direct * GATEWAY_FEE;
    const afterOta = gross - otaFees;
    const runningCosts = nights * costs.perNight + costs.monthly * 12;
    const profit = gross - otaFees - gatewayFees - runningCosts;
    const fee = plan.fee({ gross, afterOta, profit });
    const ownerCosts = plan.ownerPaysCosts ? runningCosts : 0;
    const owner = gross - otaFees - gatewayFees - ownerCosts - fee;
    return {
        nights,
        gross: Math.round(gross),
        otaFees: Math.round(otaFees + gatewayFees),
        runningCosts: Math.round(runningCosts),
        ownerCosts: Math.round(ownerCosts),
        fee: Math.round(fee),
        owner: Math.round(owner),
    };
}

// The occupancy at which `plan` leaves the owner as well off as running the
// property themselves (SmartStart) at `baseOcc`. Null if it never does
// below 90%. This is what a managed plan has to deliver to pay for itself.
export function breakEvenOccupancy(plan, { adr, baseOcc, costs }) {
    const self = PLANS[0];
    if (plan.key === self.key) return baseOcc;
    // SmartStart's one-time fee is a set-up cost, not a yearly one.
    const target = planResult(self, { adr, occupancy: baseOcc, costs }).owner + self.fee();
    for (let o = 0; o <= 90; o += 0.5) {
        if (planResult(plan, { adr, occupancy: o, costs }).owner >= target) return o;
    }
    return null;
}

export function eligiblePlans(city, propertyType) {
    const region = MARKETS[city]?.region;
    const full = FULL_MANAGEMENT_REGIONS.includes(region);
    return PLANS.filter((p) => (!p.fullManagement || full) && (!p.apartmentsOnly || propertyType === 'apartment'));
}

export function estimate({ city, bedrooms, propertyType, finish, planKey, costs }) {
    const adr = nightlyRate(city, bedrooms, propertyType, finish);
    if (!adr) return null;
    const occ = scenarios(city);
    const plans = eligiblePlans(city, propertyType);
    const plan = plans.find((p) => p.key === planKey) || plans[plans.length - 1];
    const run = (o) => planResult(plan, { adr, occupancy: o, costs });
    const typical = run(occ.typical);
    const region = REGIONS.find((r) => r.key === MARKETS[city].region);
    const sum = region.season.reduce((a, b) => a + b, 0);
    const monthly = region.season.map((s) => Math.round((typical.gross * s) / sum));
    return {
        adr,
        market: MARKETS[city],
        region,
        occ,
        plan,
        plans,
        low: run(occ.low),
        typical,
        strong: run(occ.strong),
        monthly,
        comparison: plans.map((p) => ({
            plan: p,
            result: planResult(p, { adr, occupancy: occ.typical, costs }),
            breakEven: breakEvenOccupancy(p, { adr, baseOcc: occ.typical, costs }),
        })),
    };
}
