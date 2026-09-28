# Design: SEO Overhaul + AI Chatbot + Performance Optimization

**Date:** 2026-04-11
**Status:** Approved

---

## Feature 1: SEO Overhaul

### Problem
All 22 pages use client-side `<SEO>` component via `react-helmet-async`. Google sees only the global layout.jsx metadata until JS executes, so every page competes with the same title/description.

### Solution

**1a. Server-side metadata via `generateMetadata()`**
- Each page exports `generateMetadata()` returning unique title, description, keywords, OpenGraph, canonical URL
- Remove dependency on client-side `react-helmet-async` SEO component
- Target keywords: "vacation rental management India", "Airbnb property management [city]", "holiday home management [region]"

**1b. Enhanced sitemap**
- `lastmod` dates based on content
- `<image:image>` tags for visual pages
- Separate sitemaps: pages, locations, products
- Blog post entries (when content exists)

**1c. Per-page structured data**
- `FAQPage` on /faq
- `Service` on /services with all 5 plans
- `Product` on /products/hostos, /products/resiq
- `LocalBusiness` on each location page
- `BreadcrumbList` on all pages

**1d. Fix robots.txt**
- Consolidate public/robots.txt and dist/robots.txt
- Single source of truth via next-sitemap config

**1e. Keyword-optimized meta per page**
- Unique title + description targeting specific keywords per page
- Location pages target "Airbnb management [city]" long-tail keywords

### Files Modified
- All 22 page files under `/app/` (add `generateMetadata()`)
- `/next-sitemap.config.cjs` (enhanced config)
- `/public/robots.txt` (remove, let next-sitemap generate)
- `/app/layout.jsx` (structured data additions)
- Per-page schema additions

---

## Feature 2: AI Chatbot (FloatingConcierge Upgrade)

### Problem
FloatingConcierge is a WhatsApp redirect. No intelligence, no lead qualification, no value before user leaves.

### Solution

**2a. Chat UI**
- Replace 2-step WhatsApp flow with real chat interface
- Message bubbles, typing indicator, conversation history
- 380px wide, 500px tall (mobile: full-screen)
- Dark header, brand colors, smooth framer-motion animations
- WhatsApp fallback button always visible

**2b. API route: `/api/chat`**
- POST: receives `{ message, history }`, returns AI response
- OpenAI GPT-4o-mini (existing integration)
- System prompt with: all 5 plans + pricing, service areas, FAQs, lead qualification instructions
- Escalation triggers to WhatsApp

**2c. Lead capture**
- AI naturally asks for property details during conversation
- Auto-saves partial leads to Firebase `chat-leads` collection
- "Complete your profile" CTA linking to PropertyLeadWizard with pre-filled data

**2d. Persistence**
- Chat history in localStorage, 24h TTL
- Returning visitors see previous conversation

### Files Modified
- `/components/FloatingConcierge.jsx` (complete rewrite)
- `/app/api/chat/route.js` (new)
- System prompt content sourced from site data

---

## Feature 3: Performance Optimization

### Problem
No dynamic imports. All framer-motion (15 files), Recharts, and heavy components load upfront on every page.

### Solution

**3a. Dynamic imports**
- Recharts on /calculator (dynamic import)
- FloatingConcierge (lazy load after page interactive)
- PropertyLeadWizard (below fold, lazy load)
- AuditWizard (below fold, lazy load)
- ChannelCarousel (below fold, lazy load)

**3b. Image optimization**
- Convert `<img>` to Next.js `<Image>` where missing
- `loading="lazy"` on below-fold images
- `priority` prop on hero images
- ImageKit URL params for quality + format

**3c. Bundle analysis**
- Add @next/bundle-analyzer
- Verify lucide-react tree-shaking (named imports only)

**3d. Core Web Vitals targets**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

### Files Modified
- `/app/layout.jsx` or `/components/ConditionalLayout.jsx` (dynamic FloatingConcierge)
- `/app/calculator/page.jsx` (dynamic Recharts)
- Pages using PropertyLeadWizard, AuditWizard, ChannelCarousel
- Image tags across all pages
- `/next.config.mjs` (bundle analyzer config)
