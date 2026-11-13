# Hostizzy Website — Project Context

## Overview
Corporate website for Hostizzy — India's premier vacation rental management company. Built with Next.js (App Router) on Vercel. The site targets **property owners (B2B)** as the primary audience, with guest booking redirected to book.hostizzy.com.

**Live:** www.hostizzy.com
**Booking Engine:** book.hostizzy.com (separate site, not in this repo)
**Admin Panel:** admin.hostizzy.com (subdomain rewrite to /admin via middleware.js)

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Hosting:** Vercel (custom domain hostizzy.com)
- **Database:** Firebase Firestore (leads, contacts, careers, blogs, chat-logs)
- **AI:** OpenAI GPT-5-mini (chatbot, calculator estimates, blog writer)
- **Images:** ImageKit (auto WebP, responsive transforms via URL params like `?tr=w-1920,q-80,f-auto`)
- **Email:** Nodemailer + Gmail OAuth2 (GMAIL_USER, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN)
- **Animations:** Framer Motion (ScrollReveal pattern used throughout)
- **Charts:** Recharts (calculator page)
- **Icons:** Lucide React
- **Typography:** Playfair Display (serif headings), Inter (sans-serif body)
- **Primary Color:** #FE5858

## Key Architecture Decisions
- JSON files in `/data/` as fallback when Firebase is unavailable
- API routes use `withAuth` wrapper from `/lib/auth.js` for admin endpoints
- Middleware handles subdomain routing: `admin.hostizzy.com` → `/admin`
- ConditionalLayout in layout.jsx hides navbar/footer on admin subdomain
- `next-sitemap` (config in `next-sitemap.config.cjs`) for auto sitemap generation
- Server-side `generateMetadata()` via per-page `layout.jsx` files (NOT client-side SEO component)
- Per-page JSON-LD structured data: FAQPage, Service, SoftwareApplication, BreadcrumbList schemas
- `after()` from `next/server` for background email sending (form responds instantly, emails send after response)
- Dynamic imports (`next/dynamic`) for below-fold components: PropertyLeadWizard, FloatingConcierge
- Email routing: Owner leads → partnerships@, Guest contacts → stay@, Business → founder@

## Email System
- **Auth:** Gmail OAuth2 (env vars: GMAIL_USER, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN)
- **Fallback:** Legacy App Password support still in code (GMAIL_APP_PASSWORD)
- **Routing:** Contact form routes by department selection. Property leads go to partnerships@. Calculator leads go to partnerships@.
- **Welcome email:** Auto-sent to property owners who submit the lead wizard (branded HTML + Hostizzy Overview.png attachment)
- **Background sending:** All emails use `after()` from next/server so forms respond instantly

## Navigation Structure (Desktop)
Text-only labels (no icons on desktop, icons kept in mobile menu):
- Home
- Services (dropdown): Property Management, Digital Marketing, Revenue Calculator
- Technology (dropdown): Platform Overview, HostOS, ResIQ, JuxTravel
- Host Academy (dropdown): Training Programs, Host Certified
- Careers
- Our Story (dropdown): Our Story, Blog, Invest
- CTAs: [Book a Stay] → book.hostizzy.com | [Partner With Us] → /contact

## Service Model
- **Full Management:** Delhi NCR, Uttarakhand, Rajasthan, Himachal Pradesh, Northeast India, UP
- **Shared Services (Co-Hosting):** Rest of India (pan-India)

## Pricing Plans (on /services)
Tabs: New Host | Co-Hosting | Complete Management
- SmartStart: Rs 14,999 one-time setup
- ChannelPro: Rs 15K-40K/mo channel management
- Hybrid Core: 18% commission
- TotalCare360: 30% profit share (villas)
- StayPrime: 50-50 split (apartments — full management including staff, consumables)

## Contact Emails
- Property Owners: partnerships@hostizzy.com
- Guests: stay@hostizzy.com
- Business/Founders: founder@hostizzy.com, marketing@hostizzy.com
- WhatsApp: +91-9560493335

## Important Files
- `/components/Navbar.jsx` — Main navigation
- `/components/Hero.jsx` — Homepage hero with ImageKit image
- `/components/FloatingConcierge.jsx` — AI chatbot widget (GPT-5-mini, bottom-right)
- `/components/PropertyLeadWizard.jsx` — 4-step owner lead capture form with service plan cards
- `/components/ProductPage.jsx` — Reusable product page with heroMockup prop
- `/app/services/page.jsx` — Pricing/plans page
- `/app/calculator/page.jsx` — AI-powered revenue calculator
- `/app/admin/page.jsx` — Admin panel (blog manager, careers, lead management)
- `/app/marketing/page.jsx` — Digital marketing services page
- `/lib/firebase-admin.js` — Firebase Admin SDK setup
- `/lib/email.js` — Email helpers (OAuth2, contact/calculator/welcome notifications)
- `/lib/auth.js` — Admin auth: env-only credentials, HMAC-signed tokens with 12h expiry (withAuth wrapper). Optional ADMIN_TOKEN_SECRET env; otherwise the key derives from ADMIN_PASSWORD. The repo is public — never commit secrets.
- `/lib/locations.js` — Location data for SEO pages
- `/middleware.js` — Subdomain routing

## API Routes
- `/api/property-leads` — POST (public), GET/PUT/DELETE (auth). Quality routing: high/medium → property-leads, low → contacts
- `/api/contact` — POST (public, sends email via `after()` + saves to Firebase)
- `/api/contacts` — GET/PUT/DELETE (auth)
- `/api/calculator-leads` — POST (public), GET/PUT/DELETE (auth)
- `/api/chat` — POST (public, GPT-5-mini conversational AI with Hostizzy context)
- `/api/ai-estimate` — POST (GPT-5-mini revenue estimation)
- `/api/ai-blog` — POST (GPT-5-mini blog writer)
- `/api/careers` — GET/POST/PUT/DELETE (auth for mutations)
- `/api/blogs` — GET/POST/PUT/DELETE (auth for mutations)
- `/api/login` — POST (admin auth)

## Env Variables
Key vars: ADMIN_USERNAME, ADMIN_PASSWORD, OPENAI_API_KEY, GMAIL_USER, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY

## Property Lead Wizard (4-step flow)
1. Contact Details — name, phone (international OK), email
2. Property Details — city, type, bedrooms, OTA status, property address/Maps link (optional), OTA listing URL (optional)
3. Service Plan Selection — 5 visual plan cards in 2-col grid with pricing, features, POPULAR badges + "Not Sure" option
4. Additional Info — revenue dropdown + message (all optional)
- Quality-based routing: high (plan selected) → Property Leads + welcome email, medium (Not Sure) → Property Leads + welcome email, low (missing details) → Contacts only

## Admin Panel Lead Management
- Status pipeline: New → Contacted → Follow-up → Converted / Lost
- Click any lead row → slide-over detail panel with all fields + notes timeline
- Add notes with timestamps
- Bulk actions: select multiple → bulk status change or bulk delete
- Status filter dropdown
- Delete confirmation modal

## SEO Architecture
- Server-side metadata via `layout.jsx` files in each page directory (NOT client-side react-helmet)
- 20+ layout.jsx files with unique title, description, keywords, OpenGraph, canonical
- Per-page JSON-LD: FAQPage (/faq), Service (/services), SoftwareApplication (/products/*), BreadcrumbList (all pages)
- Enhanced sitemap with per-page priorities and changefreq (next-sitemap.config.cjs)
- robots.txt generated by next-sitemap (NOT in public/)

## Completed Work
- Domain live at www.hostizzy.com
- Full SEO overhaul: server-side metadata on all pages, per-page structured data, enhanced sitemap
- AI chatbot (FloatingConcierge) with GPT-5-mini, chat persistence, WhatsApp fallback
- Email notifications: Gmail OAuth2, department routing, welcome email with attachment
- Lead management: status pipeline, notes, bulk actions, detail panel in admin
- Property Lead Wizard: 4-step with service plan cards, quality routing, location/OTA URL fields
- Performance: dynamic imports for PropertyLeadWizard, FloatingConcierge; image dimension optimization
- HostOS/ResIQ product pages with styled React dashboard mockups
- Technology page updated to match live products
- Schema/structured data: current 5 plans in layout.jsx
- Certification page: "Launching Soon" teaser, waitlist CTA (June 2026 launch)
- Phone/email fixes across all files
- 301 redirects, mobile responsive, Lighthouse audit

## Known Pending Items
- Blog content: AI writer tool built but no blog posts generated yet
- Training/Certification pages: No actual enrollment flow (cert launching June 2026)
- Location page expansion (Goa, Kerala, Maharashtra, etc.)
- A/B testing on CTAs and lead forms
- Rate limiting on public API endpoints

## Development Notes
- `npm` is at `/usr/local/bin/npm`, `node` at `/usr/local/bin/node` — PATH may need explicit setting
- Build: `export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH" && npm run build`
- Deploy: `npx vercel --prod --yes` (MUST be on hostizzydev account — run `npx vercel whoami` to check, if wrong account ask user to run `npx vercel login`)
- Vercel scope: `hostizzydev` — NEVER link to juxtravel scope
- All pages are `'use client'` — metadata must go in separate `layout.jsx` files, not in page.jsx
- `after()` from `next/server` is the correct way to do background work on Vercel (NOT fire-and-forget promises)
- Vercel serverless: `public/` files are NOT on the filesystem at runtime (served via CDN), don't use `fs` to read them
- Preview server config in `.claude/launch.json` uses full node path due to PATH issues

## User Preferences (Ethan Barman, Founder)
- Prefers premium, Marriott/Airbnb-level design quality
- No mention of ADR (internal metric) on public site
- Plan cards should be clickable (entire card), no separate buttons
- No "Not Included" sections on pricing plans
- Green notes on plan cards for key selling points
- Minimum 2-night stay is a pricing option, not a policy
- Homepage should NOT have PropertyLeadWizard — uses "Ready to Maximize" CTA banner instead
- Contact page: no WhatsApp chat section or office address
- Accepts international phone numbers (NRI audience)
- Form submissions must be instant — emails in background via after()
