# Product Refresh + Calculator Rework Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring all product content in line with the live products, rename HostOS to HostSuite, remove unverifiable claims, and replace the calculator's flat-rate revenue model with a deterministic month-by-month engine.

**Architecture:** Two independent workstreams. Part A is content-only across ~20 files, driven by a single canonical description per product. Part B extracts the calculator maths into a pure, testable module (`lib/revenue-model.js`), rewires the page to consume it, and demotes the OpenAI call to qualitative insight so identical inputs always yield identical numbers.

**Tech Stack:** Next.js 16 App Router, React 19, Recharts, OpenAI (gpt-5-mini), inline styles, Vercel.

**Design doc:** `docs/plans/2026-04-27-products-calculator-design.md`

**No test suite exists in this repo.** Verification is `npm run build` plus manual browser checks. Build command:

```bash
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH" && cd "/Users/ethan-personal/Desktop/AntiGravity (Google)/hostizzy-website" && npm run build
```

Deploy command (must be on the `hostizzydev` Vercel scope — check with `npx vercel whoami`):

```bash
npx vercel --prod --yes
```

---

## Canonical Reference — use these exact strings everywhere

Copy these verbatim. Do not paraphrase per file; inconsistency across files is the specific bug this plan fixes.

**HostSuite**
- Name: `HostSuite` (never "HostOS", never "HostSuite by HostOS")
- Short: `Smart PMS for Indian vacation rentals, homestays and hotels`
- Long: `Manage bookings, guests, payments and your team from one place — with GST-compliant invoicing, an AI Concierge that speaks 10 Indian languages, and email intelligence that reads OTA confirmations automatically.`
- URL: `https://hostos.hostizzy.com/` (URL unchanged despite rename)
- Status: `Live`

**ResIQ**
- Name: `ResIQ`
- Short: `Operations platform proven across our portfolio`
- Long: `Reservations, payments, guest KYC and team coordination in one place. Offline-first, built for properties where networks don't reach.`
- URL: `https://resiq.hostizzy.com/`
- Status: `In production`
- **Never** describe as "revenue analytics", "market analytics", or "revenue intelligence"

**JuxTravel**
- Name: `JuxTravel`
- Short: `Trip-matching discovery for Indian travellers`
- Long: `Don't just find a stay — find the trip that fits. Jux Fit matches travellers to homestays by travel style, the Reality Layer shows honest trade-offs before booking, and Passport keeps a personal record of every trip.`
- URL: `https://www.juxtravel.com`
- Status: `Early access — full launch 1 September 2026`

**Booking site**
- Name: `Hostizzy Direct` (referred to as "our direct booking site")
- Short: `Our D2C booking brand`
- Long: `Villas, farmstays and homes across Delhi NCR, Uttarakhand, Himachal and Rajasthan — all managed by us, all booked direct. No cleaning fees, every home walked by our team.`
- URL: `https://book.hostizzy.com`

**Canonical stats** — use this set everywhere, replacing every other figure:
- `45+` properties managed
- `15` cities
- `₹12 Cr+` GMV
- `30,000+` guests
- `4.9★` average rating

**Strings to delete on sight:**
`94% AI Accuracy` · `99.9% Uptime` · `95+ Lighthouse` · `2,500+ properties` · `Live Simulation` · `app.hostizzy.io` · `TripMind AI` · `same standards used by enterprise hospitality platforms` · `Hostizzy proprietary database`

---

# PART A — Product Content

## Task 1: Rename HostOS → HostSuite and rewrite its product page

**Files:**
- Modify: `app/products/hostos/page.jsx`
- Modify: `app/products/hostos/layout.jsx`

**Step 1: Find every "HostOS" occurrence in the two files**

```bash
grep -n "HostOS\|HostSuite" "app/products/hostos/page.jsx" "app/products/hostos/layout.jsx"
```

**Step 2: Update the page props**

In `app/products/hostos/page.jsx`, set:
- `title="HostSuite"`
- `badge="Smart Property Management System"`
- `description` = the HostSuite Long string from the canonical reference above
- `externalUrl="https://hostos.hostizzy.com/"` (unchanged)

**Step 3: Replace the stats array**

Current stats claim `35+ Properties Managed`, `₹2 Cr+ Revenue Tracked`, `100% GST Compliant`. Replace with:

```jsx
stats={[
    { value: '45+', label: 'Properties Managed' },
    { value: '15', label: 'Cities' },
    { value: '10', label: 'Indian Languages' },
]}
```

**Step 4: Replace the features array with the current live feature set**

The live product has three features our page never mentions: AI Concierge, Email Intelligence, and the Enquiries Pipeline. Full replacement array:

```jsx
features={[
    { title: 'AI Concierge', desc: 'Handles guest messages across 10 Indian languages, drafting replies your team can send in one tap.' },
    { title: 'Email Intelligence', desc: 'Reads OTA confirmation emails automatically and turns them into bookings — no manual entry.' },
    { title: 'Smart Calendar', desc: 'Unified booking calendar across all OTAs and direct channels with real-time availability sync.' },
    { title: 'GST Invoicing', desc: 'Automatic GST-compliant invoicing with CGST/SGST/IGST and HSN codes for every booking.' },
    { title: 'Enquiries Pipeline', desc: 'A 7-stage hospitality pipeline that takes an enquiry from first contact to confirmed booking.' },
    { title: 'WhatsApp + Instagram Inbox', desc: 'Manage all guest conversations from WhatsApp and Instagram DMs in one unified inbox.' },
    { title: 'Guest & Owner Portals', desc: 'Self-service check-in, KYC and payments for guests; live performance and payouts for owners.' },
    { title: 'AI Dynamic Pricing', desc: 'Rate optimisation based on demand, seasons, local events and competition.' },
    { title: 'SignFlow', desc: 'Digital agreements with WhatsApp OTP verification and e-signatures.' },
]}
```

**Step 5: Update the hero mockup**

The `HostSuiteMockup` component (currently `HostOSMockup`) hard-codes `26 Properties` and `₹10K Revenue`, which contradicts the stats above it. Change the stat cards to `45 Properties`, `12 Active Bookings`, `3 Check-ins Today`, `₹8.4L Revenue (Month)`. Rename the component to `HostSuiteMockup`. The brand label inside the mockup already reads "HostSuite" — leave it.

**Step 6: Update detailedInfo sections**

Keep the three existing sections but update:
- Section 1 heading stays "Three Portals, One Platform" — remove the "Mobile App — Coming soon to Play Store" bullet unless confirmed
- Section 3 "Made in India" — change the Hindi bullet to `AI Concierge speaks 10 Indian languages, not just Hindi and English`

**Step 7: Update the layout metadata**

In `app/products/hostos/layout.jsx`, replace every "HostOS" with "HostSuite" in `title`, `description`, `keywords`, `openGraph`, and the `SoftwareApplication` JSON-LD `name` field. Keep `alternates.canonical` as `https://www.hostizzy.com/products/hostos` — **the route does not change**, only the display name.

**Step 8: Verify no "HostOS" string remains in these two files**

```bash
grep -c "HostOS" "app/products/hostos/page.jsx" "app/products/hostos/layout.jsx"
```
Expected: `0` for both.

**Step 9: Build**

Run the build command. Expected: success, `/products/hostos` still generated.

---

## Task 2: Rewrite the JuxTravel product page

**Files:**
- Modify: `app/products/juxtravel/page.jsx`
- Modify: `app/products/juxtravel/layout.jsx`

**Context:** JuxTravel is no longer a marketplace or booking engine. It is a trip-matching discovery platform. The current page and its layout metadata describe two *different* wrong products — the layout claims it is a "Direct Booking Engine" live at `book.hostizzy.com`.

**Step 1: Replace the page props**

```jsx
title="JuxTravel"
badge="Trip-Matching Discovery"
description="Don't just find a stay — find the trip that fits. JuxTravel matches Indian travellers to independent homestays by travel style, then shows the honest trade-offs before they book."
comingSoon={true}
externalUrl="https://www.juxtravel.com"
```

**Step 2: Replace the stats**

Delete `AI Accuracy: 94%` — it is an invented figure for an unlaunched product. Replace the whole array:

```jsx
stats={[
    { value: 'Sept 2026', label: 'Full Launch' },
    { value: 'India', label: 'Market' },
    { value: '100%', label: 'Independent Hosts' },
]}
```

**Step 3: Replace the features array**

```jsx
features={[
    { title: 'Jux Fit', desc: 'Describe the trip you want and get matched to stays that actually suit it — not a generic list.' },
    { title: 'Reality Layer', desc: 'Honest trade-offs before you book: how far it really is, what the vibe is, what the reviews leave out.' },
    { title: 'Trip Planning', desc: 'Add local experiences and coordinate with everyone travelling with you, in one place.' },
    { title: 'Passport', desc: 'A personal travel journal that remembers your trips, your moments and what to try next.' },
    { title: 'Independent Hosts Only', desc: 'No chains. Family-run homestays and villas that rarely get found on the big platforms.' },
    { title: 'Made in India, for India', desc: 'Built around how Indians actually travel — solo, couples, families, friends, seniors, workations and celebrations.' },
]}
```

**Step 4: Replace the detailedInfo section**

Replace the existing "Guest-Centric Experience" section with:

```jsx
detailedInfo={[
    {
        title: 'Why We Built It',
        body: "Independent hosts run some of India's best stays, but they don't have the marketing budgets of the chains. JuxTravel puts them in front of travellers who are looking for exactly what they offer — and gives those travellers a straight answer about what a stay is really like before they commit.",
        points: [
            'Travellers describe the trip, not just the dates and the city',
            'Reality Layer sets expectations honestly before booking',
            'Hosts get training and support, not just a listing',
        ],
    },
]}
```

Match the prop shape used by the existing `ProductPage` component — read `components/ProductPage.jsx` first to confirm whether it expects `body`/`points` or different keys, and adapt.

**Step 5: Fix the layout metadata**

`app/products/juxtravel/layout.jsx` currently describes a "Direct Booking Engine" and its JSON-LD points at `book.hostizzy.com`. Replace with:

```jsx
export const metadata = {
  title: 'JuxTravel | Trip-Matching Discovery for Indian Travellers | Hostizzy',
  description: "Don't just find a stay — find the trip that fits. Jux Fit matching, honest Reality Layer trade-offs and Passport travel journal. Independent hosts only. Launching September 2026.",
  keywords: ['travel discovery india', 'homestay matching', 'independent homestays india', 'trip planning india'],
  openGraph: {
    title: 'JuxTravel | Trip-Matching Discovery',
    description: "Don't just find a stay — find the trip that fits. Independent hosts only. Launching September 2026.",
    url: 'https://www.hostizzy.com/products/juxtravel',
    siteName: 'Hostizzy',
    type: 'website',
  },
  alternates: { canonical: 'https://www.hostizzy.com/products/juxtravel' },
};
```

Update the JSON-LD `applicationCategory` to `"Travel Discovery Platform"` and its `url` to `https://www.juxtravel.com`.

**Step 6: Build and confirm**

```bash
grep -n "Booking Engine\|book.hostizzy\|94%" app/products/juxtravel/
```
Expected: no matches. Then run the build.

---

## Task 3: Make ResIQ consistent across the site

**Files:**
- Modify: `app/products/resiq/page.jsx`
- Modify: `components/Navbar.jsx` (line ~45)
- Modify: `components/ProductDemo.jsx` (line ~13)
- Modify: `app/about/page.jsx` (~line 340s, the product card)
- Modify: `app/invest/page.jsx` (~lines 46, 90-92)
- Modify: `app/page.jsx` (~lines 82, 139)

**Context:** ResIQ is currently described as an operations dashboard in some files, "Revenue & Market Analytics" in others, and "our owner portal" in the legal pages. Only the operations description is correct.

**Step 1: Find every ResIQ description**

```bash
grep -rn "ResIQ" app/ components/ --include="*.jsx" | grep -i "analytic\|revenue intelligence\|owner portal\|market"
```

**Step 2: Replace each with the canonical short description**

Use `Operations platform proven across our portfolio` or the Long variant, sized to the slot. Specifically:
- `components/Navbar.jsx` — change `"Revenue & Market Analytics"` to `"Operations Platform"`
- `components/ProductDemo.jsx` — change `"Analytics & Revenue Optimization"` to `"Operations & Reservations"`
- `app/about/page.jsx` product card — change subtitle `"Revenue Intelligence Dashboard"` to `"Operations Platform"` and its description to the canonical Long string
- `app/invest/page.jsx` — change `"Data-driven revenue management & analytics"` to `"Operations platform running our portfolio"`
- `app/page.jsx` — change `"real-time insights via our ResIQ Dashboard"` to `"real-time operations tracking via ResIQ"`; fix the image alt from `"ResIQ revenue analytics dashboard"` to `"ResIQ operations dashboard"`

**Step 3: Fix the ResIQ product page stats**

Remove `99.9% Uptime` — unmeasured. Replace the stats array:

```jsx
stats={[
    { value: '45+', label: 'Properties Running On It' },
    { value: '15', label: 'Cities' },
    { value: '3', label: 'Portals' },
]}
```

**Step 4: Remove the unverifiable security and Lighthouse claims**

In `app/products/resiq/page.jsx`:
- In the "Works Offline (PWA)" feature description, delete `95+ Lighthouse score` — reword to `Progressive Web App that keeps working when the network doesn't — built for rural India.`
- In the "Enterprise-Grade Security" detailedInfo section, change the heading to `Security & Data Handling` and delete the phrase `the same standards used by enterprise hospitality platforms`. Keep the concrete, verifiable bullets (HTTPS/TLS, role-based access, 60-day document auto-delete, token-based guest sessions).

**Step 5: Leave the legal pages alone**

`app/privacy/page.jsx`, `app/terms/page.jsx`, `app/faq/page.jsx` and `app/data-deletion/page.jsx` describe ResIQ as the owner portal. This is accurate in a data-handling context — owners do access their data through it. **Do not change the legal pages**; changing legal copy has consequences beyond consistency.

**Step 6: Build**

---

## Task 4: Technology page, about page, and services page

**Files:**
- Modify: `app/technology/page.jsx`
- Modify: `app/about/page.jsx`
- Modify: `app/services/page.jsx`
- Modify: `components/ProductDemo.jsx`

**Step 1: Remove TripMind AI from the technology page**

TripMind AI appears as a node in the ecosystem diagram but has no page, no nav entry, and exists nowhere else except `llms-full.txt`. Delete the node. The diagram becomes three nodes: HostSuite, ResIQ, JuxTravel.

**Step 2: Fix the JuxTravel node in the diagram**

It currently sits as the un-badged centre hub labelled "MARKETPLACE", implying it is live and central. Change the badge to `EARLY ACCESS` and the description to the JuxTravel Short string. Move HostSuite to the centre — it is the product that actually connects the others.

**Step 3: Update the HostOS section on the technology page**

Rename heading and all references to HostSuite. Update the checklist to include `AI Concierge — 10 Indian Languages` and `Email Intelligence` in place of two existing items.

**Step 4: Remove the "Live Simulation" badge**

In `components/ProductDemo.jsx`, the badge reads `Live Simulation` over fabricated dashboard data, and the fake browser chrome shows `app.hostizzy.io` — a domain we do not own or use. Change the badge to `Product Preview` and the URL to `hostos.hostizzy.com`.

**Step 5: Fix the about page timeline contradiction**

`app/about/page.jsx` currently says "HostOS in pre-production" in the 2025 entry and "HostOS in production" in the 2026 entry. Rename both to HostSuite. That sequence is correct as a timeline — leave the progression, just fix the name.

**Step 6: Update the about page product cards**

Three cards: HostSuite (Live), ResIQ (In production), JuxTravel (Early access). Use canonical descriptions. Currently the JuxTravel card says "AI-powered travel marketplace… Direct bookings, lower commissions, community trust" — all wrong.

**Step 7: Fix the services page JuxTravel mention**

`app/services/page.jsx` line ~177 says "JuxTravel is our upcoming open marketplace for unique stays. Once launched, all Hostizzy-managed properties will get featured listing priority." Replace:

> JuxTravel is our upcoming discovery platform for independent stays. Once it launches, Hostizzy-managed properties will be featured to travellers whose trip matches what they offer.

**Step 8: Build**

---

## Task 5: Machine-readable files and the chatbot prompt

**Files:**
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`
- Modify: `app/api/chat/route.js`
- Modify: `server/data/seo.json`

**Step 1: Reconcile llms.txt and llms-full.txt**

These two files currently describe HostOS and ResIQ *differently from each other*. Rewrite both product sections in each file using the canonical descriptions. Remove TripMind AI entirely from both.

**Step 2: Fix the stats block in llms-full.txt**

It currently claims `50+ Properties Managed, ₹15 Crore+ Revenue Generated, 40,000+ Happy Guests`. Replace with the canonical set: `45+ Properties Managed, 15 Cities, ₹12 Crore+ GMV, 30,000+ Guests, 4.9★ Average Rating`.

**Step 3: Update the JuxTravel section in llms-full.txt**

Replace the "AI-powered travel marketplace connecting luxury hosts with discerning guests" description with the canonical JuxTravel Long string, and note the September 2026 launch.

**Step 4: Update the chatbot system prompt**

In `app/api/chat/route.js`, the prompt currently says HostOS "handles bookings, pricing, and channel sync" and ResIQ is an "Operations dashboard for real-time performance tracking". Update to the canonical descriptions and rename to HostSuite. Add JuxTravel with its launch date so the bot answers correctly when asked.

**Step 5: Update seo.json**

`server/data/seo.json` line ~23 references "From ResIQ to HostOS" — rename to HostSuite.

**Step 6: Final sweep for stale strings**

```bash
grep -rn "HostOS\|TripMind\|94% \|99.9%\|2,500+\|app.hostizzy.io\|Live Simulation" app/ components/ public/ server/ --include="*.jsx" --include="*.js" --include="*.txt" --include="*.json"
```

Expected: only matches inside `docs/`, `CLAUDE.md`, `README.md` (documentation, not user-facing) and the `hostos.hostizzy.com` URL / `app/products/hostos/` route path, which intentionally stay.

**Step 7: Build and deploy**

Run build, then deploy. Verify in a browser:
- `www.hostizzy.com/products/hostos` shows "HostSuite" with AI Concierge and Email Intelligence
- `www.hostizzy.com/products/juxtravel` shows Jux Fit / Reality Layer / Passport, no "94%"
- `www.hostizzy.com/technology` has three nodes, no TripMind

---

# PART B — Calculator

## Task 6: Build the deterministic revenue engine

**Files:**
- Create: `lib/revenue-model.js`

This is a pure module with no React and no network calls, so it can be reasoned about and later unit-tested in isolation. All maths lives here; the page becomes a thin presentation layer.

**Step 1: Create the file with the cost constants**

```js
/**
 * Deterministic vacation-rental revenue model for Indian markets.
 * Pure functions only — no network, no randomness. Same inputs always
 * produce the same output, so the figure a user sees is reproducible.
 */

// Nights per month, and how many of those are weekend nights (Fri + Sat).
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEKEND_NIGHTS_PER_MONTH = 8.7; // 52 weeks x 2 nights / 12 months

// Weekend rate premium by market character. Drive-to markets earn most of
// their revenue across roughly nine nights a month.
const WEEKEND_PREMIUM = {
  driveTo: 1.55,   // Sohna, Lonavala, Alibaug, Kasauli, Mukteshwar
  standard: 1.25,  // most leisure markets
  urban: 1.10,     // Delhi, Gurgaon, Noida — business travel flattens the week
};

// Cost model. Split by how the cost actually behaves, not as a flat
// percentage of gross — this is what lets margin fall at low occupancy.
const COSTS = {
  otaCommissionRate: 0.16,     // blended across Airbnb / Booking / MMT
  directBookingShare: 0.25,    // share of nights booked direct (0% commission)
  cleaningPerStay: 1200,       // linen, consumables, housekeeping per turnover
  avgLengthOfStayNights: 2.4,  // determines turnovers per booked night
  fixedMonthlyPerProperty: 18000, // caretaker, utilities, connectivity
  managementFeeRate: 0.18,     // Hostizzy Hybrid Core
  maintenanceReserveRate: 0.03,// wear, damage, replacements
};

// GST on room tariff. India charges by per-night slab.
const GST_SLAB_THRESHOLD = 7500;
const GST_BELOW = 0.12;
const GST_ABOVE = 0.18;
```

**Step 2: Add the seasonality helpers**

The `seas` arrays in `MARKET_DATA` are a 0–100 demand index. Both occupancy and rate must respond to it — in a peak month a property is both fuller *and* dearer.

```js
/**
 * Convert a 0-100 demand index into that month's occupancy.
 * Anchored so the mean across the year equals the market's annual occupancy.
 */
export function monthlyOccupancy(demandIndex, annualOccupancyPct, seasonalityArray) {
  const meanDemand = seasonalityArray.reduce((a, b) => a + b, 0) / 12;
  if (meanDemand === 0) return 0;
  const ratio = demandIndex / meanDemand;
  // Dampen so a 2x demand month isn't a 2x occupancy month — occupancy is
  // bounded by inventory in a way that rate is not.
  const damped = 1 + (ratio - 1) * 0.65;
  return clamp(annualOccupancyPct * damped, 8, 92);
}

/**
 * Peak months command a higher nightly rate. Applied more gently than
 * occupancy — a 3x demand month is not a 3x rate month.
 */
export function monthlyRateMultiplier(demandIndex, seasonalityArray) {
  const meanDemand = seasonalityArray.reduce((a, b) => a + b, 0) / 12;
  if (meanDemand === 0) return 1;
  const ratio = demandIndex / meanDemand;
  return clamp(1 + (ratio - 1) * 0.40, 0.70, 1.85);
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}
```

**Step 3: Add the base rate calculation**

Preserves the existing multipliers but fixes cottage, which currently shares apartment's 1.0 and so does nothing when selected.

```js
const TYPE_MULTIPLIER = {
  villa: 1.20,
  farmhouse: 1.15,
  cottage: 1.05,   // was silently 1.0, identical to apartment
  apartment: 1.00,
};

const FINISH_MULTIPLIER = { luxury: 1.12, premium: 1.06, standard: 1.00 };

export function baseNightlyRate({ cityBase, propertyType, bedrooms, finish }) {
  const type = TYPE_MULTIPLIER[propertyType] ?? 1.0;
  // Sub-linear bedroom scaling — an 8BHK does not fetch 2x a 1BHK per night.
  const bed = 1 + Math.pow(Math.max(0, bedrooms - 1), 0.85) * 0.14;
  const finishMult = FINISH_MULTIPLIER[finish] ?? 1.0;
  return Math.round(cityBase * type * bed * finishMult);
}

/**
 * Larger properties have a thinner demand pool and run lower occupancy.
 */
export function occupancyPenaltyForSize(bedrooms) {
  if (bedrooms <= 3) return 0;
  return Math.min((bedrooms - 3) * 2.0, 10); // percentage points, capped
}
```

**Step 4: Add the core month-by-month engine**

```js
/**
 * Full-year revenue model, computed month by month.
 * Returns per-month detail plus annual totals.
 */
export function calculateRevenue({
  cityBase,
  annualOccupancy,
  seasonality,        // 12-element 0-100 demand index
  propertyType,
  bedrooms,
  finish,
  marketCharacter = 'standard',
  monthlyRunningCosts = 0,
}) {
  const baseRate = baseNightlyRate({ cityBase, propertyType, bedrooms, finish });
  const sizePenalty = occupancyPenaltyForSize(bedrooms);
  const effectiveAnnualOcc = Math.max(annualOccupancy - sizePenalty, 10);
  const weekendPremium = WEEKEND_PREMIUM[marketCharacter] ?? WEEKEND_PREMIUM.standard;

  const months = seasonality.map((demand, i) => {
    const nights = DAYS_IN_MONTH[i];
    const weekendNights = WEEKEND_NIGHTS_PER_MONTH;
    const weekdayNights = nights - weekendNights;

    const occ = monthlyOccupancy(demand, effectiveAnnualOcc, seasonality) / 100;
    const rateMult = monthlyRateMultiplier(demand, seasonality);

    // Weekend nights fill first and price higher.
    const weekdayRate = baseRate * rateMult;
    const weekendRate = weekdayRate * weekendPremium;
    const weekendOcc = Math.min(occ * 1.35, 0.95);
    const weekdayOcc = Math.max((occ * nights - weekendOcc * weekendNights) / weekdayNights, 0);

    const weekendBooked = weekendNights * weekendOcc;
    const weekdayBooked = weekdayNights * weekdayOcc;
    const bookedNights = weekendBooked + weekdayBooked;

    const gross = weekendBooked * weekendRate + weekdayBooked * weekdayRate;
    const blendedAdr = bookedNights > 0 ? gross / bookedNights : 0;

    // Costs
    const otaNights = bookedNights * (1 - COSTS.directBookingShare);
    const otaCommission = (gross / Math.max(bookedNights, 1)) * otaNights * COSTS.otaCommissionRate;
    const turnovers = bookedNights / COSTS.avgLengthOfStayNights;
    const cleaning = turnovers * COSTS.cleaningPerStay;
    const fixed = COSTS.fixedMonthlyPerProperty;
    const maintenance = gross * COSTS.maintenanceReserveRate;

    const netBeforeMgmt = gross - otaCommission - cleaning - fixed - maintenance;
    const managementFee = Math.max(netBeforeMgmt, 0) * COSTS.managementFeeRate;
    const net = netBeforeMgmt - managementFee - monthlyRunningCosts;

    return {
      monthIndex: i,
      occupancy: Math.round(occ * 100),
      adr: Math.round(blendedAdr),
      bookedNights: Math.round(bookedNights),
      gross: Math.round(gross),
      otaCommission: Math.round(otaCommission),
      cleaning: Math.round(cleaning),
      fixed: Math.round(fixed),
      maintenance: Math.round(maintenance),
      managementFee: Math.round(managementFee),
      net: Math.round(net),
    };
  });

  const sum = (k) => months.reduce((a, m) => a + m[k], 0);
  const annualGross = sum('gross');
  const annualNet = sum('net');
  const annualBookedNights = sum('bookedNights');

  return {
    months,
    annual: {
      gross: annualGross,
      net: annualNet,
      otaCommission: sum('otaCommission'),
      cleaning: sum('cleaning'),
      fixed: sum('fixed'),
      maintenance: sum('maintenance'),
      managementFee: sum('managementFee'),
      bookedNights: annualBookedNights,
      occupancy: Math.round((annualBookedNights / 365) * 100),
      adr: annualBookedNights > 0 ? Math.round(annualGross / annualBookedNights) : 0,
      netMargin: annualGross > 0 ? Math.round((annualNet / annualGross) * 100) : 0,
    },
    baseRate,
  };
}
```

**Step 5: Add the range and GST helpers**

```js
/**
 * Conservative / expected / optimistic band. Presenting a single number
 * invites owners to read an estimate as a quote.
 */
export function calculateRange(params) {
  const expected = calculateRevenue(params);
  const conservative = calculateRevenue({ ...params, annualOccupancy: params.annualOccupancy * 0.85 });
  const optimistic = calculateRevenue({ ...params, annualOccupancy: Math.min(params.annualOccupancy * 1.12, 88) });
  return { conservative, expected, optimistic };
}

/**
 * GST on room tariff, by per-night slab.
 */
export function gstOnTariff(nightlyRate, annualGross) {
  const rate = nightlyRate >= GST_SLAB_THRESHOLD ? GST_ABOVE : GST_BELOW;
  return { rate, slab: nightlyRate >= GST_SLAB_THRESHOLD ? 'above' : 'below', amount: Math.round(annualGross * rate) };
}

export { COSTS, GST_SLAB_THRESHOLD };
```

**Step 6: Sanity-check the model by hand**

Create a scratch file and run it with node to confirm the model behaves. This is the closest thing to a test in this repo — **do not skip it**.

```bash
cat > /tmp/check-model.mjs <<'EOF'
import { calculateRevenue } from './lib/revenue-model.js';

// Ranthambore: brutal seasonality, closed in monsoon
const ranthambore = calculateRevenue({
  cityBase: 6500, annualOccupancy: 55,
  seasonality: [90, 85, 70, 45, 25, 10, 10, 15, 40, 80, 95, 92],
  propertyType: 'villa', bedrooms: 3, finish: 'premium',
});
console.log('Ranthambore Jun occ:', ranthambore.months[5].occupancy, '% (expect <25)');
console.log('Ranthambore Nov occ:', ranthambore.months[10].occupancy, '% (expect >70)');
console.log('Annual margin:', ranthambore.annual.netMargin, '%');

// Low occupancy must crush margin — the old model always returned 47%
const lowOcc = calculateRevenue({
  cityBase: 5000, annualOccupancy: 30,
  seasonality: Array(12).fill(50),
  propertyType: 'apartment', bedrooms: 2, finish: 'standard',
});
console.log('30% occupancy margin:', lowOcc.annual.netMargin, '% (expect well under 47)');
EOF
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH" && cd "/Users/ethan-personal/Desktop/AntiGravity (Google)/hostizzy-website" && node /tmp/check-model.mjs
```

**Expected:** June occupancy well below November's; the 30%-occupancy margin materially below 47% (likely near zero or negative for a small standard apartment). If the low-occupancy margin still comes out near 47%, the fixed-cost path is not wired correctly — stop and fix before continuing.

---

## Task 7: Rewire the calculator page onto the engine

**Files:**
- Modify: `app/calculator/page.jsx`

**Step 1: Import the engine and delete the duplicated maths**

The calculation currently exists twice — once in the `calculate()` useCallback (~lines 184-236) and again inline in `handleCalculate` (~lines 264-310). Delete both and call `calculateRange` from the module.

**Step 2: Add market character to MARKET_DATA**

Drive-to weekend markets need the higher weekend premium. Add a `character` key to each city record: `'driveTo'` for Sohna, Lonavala, Alibaug, Kasauli, Mukteshwar, Bir Billing, Lansdowne; `'urban'` for Delhi, Gurgaon, Noida, Lucknow; `'standard'` for everything else.

**Step 3: Fix the occupancy slider cap**

The slider allows up to 90 but the old formula capped at 85, so the top 5% did nothing. Set the slider `max` to `88` and let the engine's own clamps handle the rest, so the control and the maths agree.

**Step 4: Stop the AI overwriting the numbers**

Delete these three lines and every downstream use:

```js
const rawDisplayNet   = aiData ? aiData.netIncome    : results?.netIncome;
const rawDisplayGross = aiData ? aiData.grossRevenue : results?.grossRevenue;
const displayOcc      = aiData ? aiData.occupancy    : results?.occupancy;
```

Display values come from the engine only. This fixes the dead-slider bug as a side effect — the slider drives the engine, and nothing overrides it afterwards.

**Step 5: Replace the headline with a range**

Show `expected.annual.net` as the headline with `conservative` and `optimistic` as the band beneath it, labelled clearly as an estimate range.

**Step 6: Fix the ADR display**

The `₹0 – ₹0` bug came from reading the AI's `adrRange` object as an array. ADR now comes from the engine: `expected.annual.adr`, with the range from `conservative.annual.adr` to `optimistic.annual.adr`.

**Step 7: Replace the hardcoded breakdown bar**

The stacked bar is hardcoded to `47% / 20% / 18% / 15%`. Derive every segment from `expected.annual` — gross, OTA commission, cleaning, fixed costs, maintenance, management fee, net — so the bar always sums to the headline figure, including when advanced running costs are entered.

**Step 8: Add the GST line**

Call `gstOnTariff(expected.annual.adr, expected.annual.gross)` and show the slab and amount, noting that the rate changes at ₹7,500/night.

**Step 9: Fix the self-managed comparison**

The current comparison gives the self-managed owner **zero operating costs** while charging Hostizzy 15%, which is not a fair basis for the "+N% more" claim. Recompute both sides through the same engine, varying only:
- Self-managed: `directBookingShare: 0.05`, occupancy −12pp, ADR −10%, `managementFeeRate: 0`
- Hostizzy: the standard parameters

Both sides then carry real cleaning, fixed and maintenance costs.

**Step 10: Add the disclaimer**

Below the headline: *"Estimate based on market averages and seasonal patterns. Actual earnings vary with property condition, reviews, pricing strategy and local events. Not a guarantee."*

**Step 11: Delete the fabricated data claim**

Remove the "Market Intelligence" panel text claiming a *"Hostizzy proprietary database (2,500+ properties)"*. No such database is queried anywhere in the code. Replace with an honest description: estimates derived from market rate benchmarks and seasonal demand patterns across the cities we operate in.

**Step 12: Build and check in the browser**

Verify: ADR shows real numbers · slider moves the result · June and November differ sharply for Ranthambore · breakdown sums to the headline.

---

## Task 8: Demote the AI endpoint to qualitative insight

**Files:**
- Modify: `app/api/ai-estimate/route.js`
- Modify: `components/AuditWizard.jsx`

**Step 1: Fix the broken service-model detection**

Lines ~59-66 test whether a **city** string contains a **state** name, so `isFullManagement` is false for every input except the literal string "Delhi". Replace with an explicit city→service-model lookup, or accept `serviceModel` from the client, which already knows it from `MARKET_DATA`.

**Step 2: Strip the numeric fields from the prompt**

Remove requests for ADR, occupancy, gross revenue, net income, and the hardcoded "assume 20% management fee, 18% OTA, 15% operations = 53%" instruction — that line forces the model to reproduce the exact flaw this rework removes.

Keep only: `marketInsight`, `marketContext`, and `recommendations`.

**Step 3: Update the response schema**

```json
{
  "marketInsight": "string",
  "marketContext": "string",
  "recommendations": ["string", "string", "string"]
}
```

Update the validation, which currently throws unless `adr`, `grossRevenue` and `netIncome` are present — those fields no longer exist.

**Step 4: Update AuditWizard**

`components/AuditWizard.jsx` (line ~78) also calls this endpoint and reads the numeric fields. Point it at the shared engine for numbers and use the endpoint only for the insight text.

**Step 5: Build**

---

## Task 9: Fix the seasonal chart

**Files:**
- Modify: `app/calculator/page.jsx`

**Step 1: Plot money instead of the demand index**

The chart currently plots `demand` — a 0–100 index — so the Y axis is not currency. A `revenue` field is computed and never used. Plot `months[i].net` from the engine.

**Step 2: Label the axis and tooltip in rupees**

Format the Y axis as `₹Xk` / `₹XL` and the tooltip as full rupees with the month name.

**Step 3: Keep the email gate**

The gate on the chart is unchanged — it is working lead capture and is out of scope.

**Step 4: Build, deploy, verify**

Deploy and check on the live site that the chart shows a realistic seasonal revenue curve — for a Himalayan or Rajasthan market it should visibly collapse in monsoon and peak in season.

---

## Task 10: Final sweep and deploy

**Step 1: Confirm no stale strings survive**

```bash
grep -rn "HostOS\|TripMind\|94% \|99.9%\|2,500+\|app.hostizzy.io\|Live Simulation" app/ components/ public/ server/ --include="*.jsx" --include="*.js" --include="*.txt" --include="*.json"
```

Only `hostos.hostizzy.com` URLs and the `app/products/hostos/` route path should remain.

**Step 2: Build**

**Step 3: Confirm the Vercel account before deploying**

```bash
npx vercel whoami
```

Must print `hostizzy`. If it prints anything else, stop and ask the user to run `npx vercel login` — deploying to the wrong scope has happened before in this project.

**Step 4: Deploy**

**Step 5: Verify on the live site**

- `/products/hostos` — HostSuite, AI Concierge, Email Intelligence, no ₹ pricing
- `/products/juxtravel` — Jux Fit / Reality Layer / Passport, no "94%"
- `/products/resiq` — no "99.9% uptime", no Lighthouse claim
- `/technology` — three products, no TripMind, no "Live Simulation"
- `/calculator` — real ADR, working slider, seasonal chart in rupees, breakdown sums correctly, disclaimer present
- Run the same calculator inputs twice and confirm identical output
