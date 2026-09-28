# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: property owners across India, segmented by portfolio size — not by role.**

The same person may own one homestay or fifteen units; that count, not a job title, determines which product and which service plan fits them. This is a correction to an earlier assumption: none of the products target "property managers" as a distinct professional segment.

- **Single property owner** — owns one villa, farmstay, cottage or apartment. Often self-managing with an on-site caretaker. Wants the property to earn without becoming a second job.
- **Small portfolio owner (2–5 units)** — has outgrown a spreadsheet and four WhatsApp threads. Needs coordination more than software.
- **Multi-unit owner (5–15+ units)** — running a real operation. Needs channel sync, staff permissions and financial reporting.
- **NRI owners** — a material subset. Own property in India, live abroad, cannot be on-site. International phone numbers are normal, not an edge case.

**Secondary: guests** booking direct at book.hostizzy.com. They are the audience for the D2C brand, not for the corporate site or the product pages.

## Product Purpose

Hostizzy manages vacation rentals across India and builds the software that runs them. Owners hand over a property and receive professional hospitality operations, multi-channel distribution and transparent reporting; the software layer is what makes that operation repeatable at scale.

Success for an owner is revenue they did not have to chase and a property they did not have to babysit.

## Positioning

**Vertically integrated: we operate the properties and build the tools, so every product is proven on our own portfolio before anyone else sees it.**

This is the claim a neighbouring company cannot truthfully copy. A pure software vendor has never run the properties. A pure management company has no product. ResIQ and HostSuite were built because the operation needed them, and both run the real portfolio daily.

## Operating Context

**Service coverage**
- **Full management:** Delhi NCR, Uttarakhand, Rajasthan, Himachal Pradesh, Northeast India, Uttar Pradesh
- **Co-hosting / shared services:** pan-India

**Realities the design must respect**
- Properties sit in places with poor connectivity — offline capability is a functional requirement, not a feature bullet
- WhatsApp is the primary channel for guest and owner communication, ahead of email
- GST compliance is mandatory and slab-dependent (12% under ₹7,500/night, 18% above)
- Demand is severely seasonal and regionally divergent — a Himalayan property and a Rajasthan property peak in different months
- Drive-to weekend markets earn most revenue across roughly nine nights a month

## Capabilities and Constraints

**Products**

| Product | What it is | Status |
|---|---|---|
| **HostSuite** | Property management system — AI Concierge across 10 Indian languages, email intelligence that parses OTA confirmations, GST invoicing, enquiries pipeline, guest and owner portals, SignFlow, AI dynamic pricing | Live at hostos.hostizzy.com. Public pricing ₹999 / ₹2,499 / ₹4,999 per month — **pricing is not shown on the corporate site** |
| **ResIQ** | Operations platform — reservations, payments, guest KYC, team coordination, offline-first | In production at resiq.hostizzy.com. Positioned on the corporate site as capability proof, not as a product to sign up for |
| **JuxTravel** | Trip-matching discovery for Indian travellers — Jux Fit, Reality Layer, Passport. Independent hosts only | Early access at juxtravel.com. Full launch 1 September 2026 |
| **Hostizzy Direct** | D2C booking brand — 42 homes, no cleaning fees, every home walked by our team | Live at book.hostizzy.com |

**Service plans** — SmartStart (₹14,999 one-time) · ChannelPro (₹15K–40K/month) · Hybrid Core (18% of net revenue) · TotalCare360 (30% profit share, villas) · StayPrime (50-50 split, apartments)

**Technical constraints**
- Next.js 16 App Router on Vercel; all pages are `'use client'`, so metadata lives in per-route `layout.jsx`
- `public/` files are not on the filesystem at runtime — never read them with `fs`
- Background work uses `after()` from `next/server`; forms must respond instantly
- Vercel deploys must target the `hostizzydev` scope

**Undecided**
- Whether HostSuite pricing ever appears on the corporate site (currently: no)
- Whether ResIQ's free tier and Android app are promoted from hostizzy.com (currently: no)

## Brand Commitments

**Binding.** Product pages stay inside the Hostizzy system. Distinction between products comes from layout, structure and composition — not from new palettes or new typefaces.

- Name: Hostizzy, a brand of Hostsphere India Pvt Ltd
- Primary colour: `#FE5858`
- Typography: Playfair Display (serif, display) + Inter (sans, body)
- Registered address: E 13/29, 1st Floor, Harsha Bhawan, Connaught Place, New Delhi 110001
- Founders: Ethan Barman (Co-founder & CEO), Ashutosh Karn (Co-founder & COO) — both ex-Airbnb
- Voice: premium and plain-spoken. The reference point the founder names is Marriott/Airbnb-level quality, and the operating instinct is understatement over hype.

## Evidence on Hand

**Verified and usable**
- ResIQ deletes guest identity documents automatically 60 days after the stay — confirmed by the founder 2026-04-27, and consistent with the published privacy policy
- 45+ properties under management, 15 cities
- ₹12 Cr+ GMV · 30,000+ guests · 4.9★ average rating
- Airbnb Superhost, consecutively 2024 / 2025 / 2026
- Start-Up India participant · DPIIT-recognised
- India's Favourite Homestays Awards (MakeMyTrip) — finalist, and winner of *Best Individual Host*
- Founder story video on YouTube
- `public/Hostizzy Overview.png`, `public/hostizzy-brochure.pdf`

**Pending**
- Real product screenshots for HostSuite, ResIQ and JuxTravel — the user will provide these. Until they arrive, product visuals are hand-built UI mockups in React and must be labelled honestly, never as live data.

**Absences future work must not fill by invention**

An audit on 2026-04-27 found these claims on the live site with no supporting data anywhere in the codebase. They are being removed and must never return:

- "Hostizzy proprietary database (2,500+ properties)" — no such database is queried anywhere
- "94% AI Accuracy" — stated for an unlaunched product
- "99.9% Uptime" — not measured
- "95+ Lighthouse score" — not verified
- "Live Simulation" — labelled fabricated dashboard data
- Named guests and revenue figures inside UI mockups, which read as real customer records

There are no customer testimonials with attributable names, no case studies with verified figures, and no third-party benchmarks. Do not invent them.

## Product Principles

1. **Proof over promise.** The strongest claim available is that the software runs a real portfolio daily. Lead with what is demonstrably true and drop anything that cannot be sourced.
2. **Portfolio size is the axis.** Segment by how many units someone owns, never by whether they sound like a professional. One villa and fifteen units are different problems for the same kind of person.
3. **Built for where the properties actually are.** Patchy networks, WhatsApp-first communication, GST slabs and violent seasonality are the operating conditions, not edge cases to handle later.
4. **Understate.** The audience is handing over an asset worth crores. Restraint reads as competence; superlatives read as risk.
5. **One product, one description.** Each product gets a single canonical description used everywhere. The failure this replaces is ResIQ having been described three contradictory ways across the same site.

## Accessibility & Inclusion

No formal standard has been established for this project. Known product-specific needs:

- Content must remain usable on poor connections and mid-range Android devices, which is what owners and on-site staff actually use
- The AI Concierge in HostSuite operates across 10 Indian languages; the marketing site is English-only, and no multilingual requirement has been set for it
