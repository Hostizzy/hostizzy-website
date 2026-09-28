# Design: Product Content Refresh + Calculator Rework

**Date:** 2026-04-27
**Status:** Approved

---

## Context

All four Hostizzy products have moved significantly ahead of what the website claims. Two products have effectively become different things, one has been renamed, and the revenue calculator produces figures that cannot occur in reality.

Source of truth for this design is the live product sites, fetched 2026-04-27.

---

## Part 1 — Product Content

### Reality vs. site claims

| Product | Live reality | Site claimed |
|---|---|---|
| **HostSuite** (was "HostOS") | "Smart Property Management Software for Indian Vacation Rentals, Homestays & Hotels". AI Concierge across 10 Indian languages, email intelligence auto-parsing OTA confirmations, GST invoicing, 7-stage enquiries pipeline, guest/owner portals, SignFlow, AI dynamic pricing. Public pricing ₹999 / ₹2,499 / ₹4,999 per month. | Called "HostOS". Missing AI Concierge, email intelligence, enquiries pipeline. Target stated as vacation rentals only, not hotels/resorts. |
| **ResIQ** | "Run your homestay, not a spreadsheet." Self-serve platform: multi-channel calendar sync, payment tracking, digital guest verification, EN/Hindi templated messaging, offline booking creation, tiered access. Proven across 45 properties in 15 cities. Free first property. Android app on Play Store. | "Daily Operations Dashboard", staff-facing. Described three different ways across the site. |
| **JuxTravel** | "Don't just find a stay, find the trip that fits." Trip-matching discovery platform: Jux Fit recommendations, Reality Layer (honest trade-offs pre-booking), trip planning with experiences, Passport travel journal. Independent hosts only. Early access; full launch 1 Sept 2026. | "Marketplace connecting luxury hosts with discerning guests", "lower commissions", "94% AI Accuracy". Described three different ways. |
| **book.hostizzy.com** | D2C brand. "Stay somewhere we answer for ourselves." 42 homes (31 villas, 3 farmstays, 6 apartments, 1 cottage), ₹18K–₹70K/night, no cleaning fees, in-house video walkthroughs. Delhi NCR, Uttarakhand, Himachal, Rajasthan. | "Direct booking platform for Hostizzy-managed properties". |

### Decisions

1. **Rename HostOS → HostSuite** across all references. URL remains `hostos.hostizzy.com`.
2. **HostSuite** gets a full product page with the complete current feature set. **No pricing on the corporate site** — pricing lives only on the product site. CTA: "Visit HostSuite".
3. **ResIQ** positioned as internal technology proof. No signup push, no free-tier promotion, no Play Store CTA from the corporate site.
4. **JuxTravel** rewritten to the discovery-platform positioning. Status: Early access, launching 1 Sept 2026.
5. **book.hostizzy.com** described as our D2C direct-booking brand.
6. **TripMind AI removed entirely** — it has no page and appears only in the technology-page diagram and `llms-full.txt`.

### Canonical descriptions

Each product gets exactly one description, propagated to every reference. This resolves the current state where ResIQ is simultaneously an "operations dashboard", "revenue & market analytics", and "our owner portal" depending on the file.

- **HostSuite** — Smart PMS for Indian vacation rentals, homestays and hotels. AI Concierge in 10 Indian languages, email intelligence, GST-compliant invoicing, enquiries pipeline, guest and owner portals.
- **ResIQ** — Operations platform proven across our portfolio. Reservations, payments, guest KYC and team coordination, offline-first for properties where networks don't reach.
- **JuxTravel** — Trip-matching discovery platform for Indian travellers. Jux Fit, Reality Layer, Passport. Independent hosts only.
- **book.hostizzy.com** — Our direct-booking brand. Every home managed and walked by our own team.

### Claims to remove

All of these are unverifiable or contradicted by the code:

- "94% AI Accuracy" — stated for an unlaunched product
- "99.9% Uptime" — not measured
- "95+ Lighthouse score" — not verified
- "Hostizzy proprietary database (2,500+ properties)" — **no such database is queried anywhere in the codebase**
- "Live Simulation" badge — sits over fabricated dashboard data
- `app.hostizzy.io` — a domain not used anywhere
- "Enterprise-grade security … same standards used by enterprise hospitality platforms"

### Numbers to reconcile

The site currently states 35+, 45+ and 50+ properties in different places; ₹2 Cr, ₹12 Cr and ₹15 Cr revenue; 30,000 and 40,000 guests. The HostSuite hero mockup shows 26 properties.

Single canonical set: **45+ properties · 15 cities · ₹12 Cr+ GMV · 30,000+ guests**.

---

## Part 2 — Calculator Rework

### Current behaviour

`app/calculator/page.jsx` computes `ADR × 365 × flat occupancy`, then subtracts a fixed 20% management fee, 18% OTA commission and 15% operations cost. Every property in every city therefore nets exactly 47% of gross.

The 12-month seasonality arrays exist in `MARKET_DATA` and drive the chart, but never touch the revenue math. A property in Ranthambore — whose own data shows demand of 10 in June and 95 in November — is modelled at flat occupancy year-round.

An OpenAI call then silently overwrites the headline figures after the fact, so identical inputs can produce materially different numbers across sessions.

### Defects to fix

| Defect | Effect |
|---|---|
| `adrRange` returned as an object, read as an array | ADR renders "₹0 – ₹0" whenever the AI succeeds |
| AI `occupancy` overrides slider, slider never re-applies | Slider appears dead after the AI responds |
| Service model matched by testing city strings against state names | Nearly every city mis-flagged as "shared"; bottom CTA contradicts the badge shown in step 1 |
| Slider allows 90%, formula caps at 85% | Label and math disagree above 85% |
| Calculation duplicated verbatim in two places | Edits to one silently diverge from the other |
| AI `confidence` parsed then discarded | "AI Enhanced" card shows the local formula's score |
| Chart plots the 0–100 demand index | Y axis is not money; a computed `revenue` field is never plotted |

### Modelling changes

1. **Month-by-month engine.** Revenue is summed across twelve months, each with its own occupancy and its own ADR, both driven by the existing seasonality index. Peak season lifts rate and occupancy together; monsoon collapses both.

2. **Weekend/weekday split.** Drive-to markets (Sohna, Lonavala, Alibaug, Kasauli, Mukteshwar) earn most revenue on roughly eight weekend nights a month at a premium. A flat ADR overstates weekday demand and understates weekend rate.

3. **Real cost structure**, replacing percentage-of-gross:
   - *Variable per night* — OTA commission, weighted by channel mix
   - *Per stay* — cleaning and linen, driven by average length of stay
   - *Fixed monthly* — caretaker, utilities, connectivity

   Fixed costs do not scale down with occupancy, so **margin falls at low occupancy** — which is what actually happens, and what the current flat-47% model makes impossible to express.

4. **Range, not a point estimate.** Conservative / expected / optimistic, so the output reads as an estimate rather than a quote.

5. **GST surfaced.** 12% on tariffs under ₹7,500/night, 18% above. Several current outputs cross that boundary with no acknowledgement.

6. **Chart plots rupees** — monthly net revenue.

7. **AI demoted to qualitative insight only** — market context sentence and recommendations. All numbers stay deterministic, so the same inputs always produce the same answer.

8. **Disclaimer added** — "Estimate based on market averages. Not a guarantee of earnings."

### Non-goals

- No change to lead capture or the email gate on the seasonal chart
- No change to `MARKET_DATA` city coverage (44 cities stays as is)
- No new backend services

---

## Files affected

**Products:** `app/products/hostos/`, `app/products/resiq/`, `app/products/juxtravel/`, `app/technology/page.jsx`, `app/about/page.jsx`, `app/page.jsx`, `app/services/page.jsx`, `app/invest/page.jsx`, `app/faq/page.jsx`, `app/privacy/page.jsx`, `app/terms/page.jsx`, `app/data-deletion/page.jsx`, `components/Navbar.jsx`, `components/ProductDemo.jsx`, `components/previews/`, `app/api/chat/route.js`, `public/llms.txt`, `public/llms-full.txt`, `server/data/seo.json`

**Calculator:** `app/calculator/page.jsx`, `app/api/ai-estimate/route.js`, `components/AuditWizard.jsx`
