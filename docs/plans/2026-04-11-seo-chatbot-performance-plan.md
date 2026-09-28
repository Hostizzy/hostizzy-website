# SEO Overhaul + AI Chatbot + Performance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix server-side SEO metadata across all 22 pages, replace FloatingConcierge with an AI chatbot, and add dynamic imports + lazy loading for performance.

**Architecture:** Three independent workstreams that can be parallelized: (A) SEO — add `generateMetadata()` to every page + enhanced structured data + sitemap, (B) AI Chatbot — new `/api/chat` route + complete FloatingConcierge rewrite, (C) Performance — dynamic imports for heavy components + image optimization.

**Tech Stack:** Next.js 16 App Router, OpenAI GPT-4o-mini, Firebase Firestore, Nodemailer, Framer Motion, Recharts, ImageKit

---

## Workstream A: SEO Overhaul (Tasks 1-5)

### Task 1: Add generateMetadata to all pages (batch 1: high-priority pages)

**Files:**
- Modify: `app/page.jsx` (homepage)
- Modify: `app/services/page.jsx`
- Modify: `app/technology/page.jsx`
- Modify: `app/contact/page.jsx`
- Modify: `app/calculator/page.jsx`
- Modify: `app/about/page.jsx`

**Step 1: Add metadata exports to each page**

Each page that is `'use client'` needs to be split: extract metadata to a wrapper or convert page to server component. For pages that MUST remain client components, create a thin server layout wrapper.

**Pattern for client components** — create `app/[page]/layout.jsx`:
```jsx
export const metadata = {
  title: '...',
  description: '...',
  keywords: ['...'],
  openGraph: { title: '...', description: '...', url: 'https://www.hostizzy.com/[page]' },
  alternates: { canonical: 'https://www.hostizzy.com/[page]' },
};
export default function Layout({ children }) { return children; }
```

**Pattern for server-compatible pages** — add directly:
```jsx
export const metadata = { title: '...', description: '...', ... };
```

**Metadata per page:**

| Page | Title | Description | Keywords |
|------|-------|-------------|----------|
| `/` | Hostizzy \| Premier Vacation Rental Management India | India's leading Airbnb & vacation rental management. AI-powered pricing, 15+ OTA channels, full property management across Delhi NCR, Himachal, Uttarakhand & Rajasthan. | vacation rental management india, airbnb property management, holiday home management india |
| `/services` | Property Management Plans & Pricing \| Hostizzy | Choose from 5 flexible plans: SmartStart onboarding, ChannelPro OTA management, Hybrid Core co-hosting, TotalCare360 villa management, or StayPrime apartment management. | property management pricing india, airbnb management plans, vacation rental co-hosting |
| `/technology` | Hospitality Technology Platform \| HostOS & ResIQ \| Hostizzy | Purpose-built technology for Indian hospitality: HostOS smart PMS with GST, WhatsApp & AI pricing. ResIQ daily operations dashboard for reservations & payments. | hospitality technology india, property management software, hotel pms india |
| `/contact` | Contact Us \| Partner With Hostizzy | List your property with India's premier vacation rental manager. Property owners, guests, and business partners welcome. Response within 24 hours. | contact hostizzy, list property airbnb india, vacation rental partner |
| `/calculator` | Revenue Calculator \| Estimate Your Property Earnings \| Hostizzy | Free AI-powered revenue calculator for vacation rentals across 40+ Indian cities. Get instant estimates for your villa, apartment or farmhouse. | vacation rental revenue calculator, airbnb income estimator india, property earnings calculator |
| `/about` | Our Story \| About Hostizzy | India's technology-driven vacation rental management company. Founded to empower property owners with professional hospitality management and maximize revenue. | about hostizzy, vacation rental company india, property management team |

**Step 2: Remove SEO component imports from these pages**

Remove `import SEO from '@/components/SEO'` and `<SEO ... />` JSX from each page where it exists.

**Step 3: Verify build**

Run: `npm run build`
Expected: Successful build, no errors

**Step 4: Commit**

```bash
git add app/page.jsx app/services/ app/technology/ app/contact/ app/calculator/ app/about/
git commit -m "feat(seo): add server-side metadata to 6 high-priority pages"
```

---

### Task 2: Add generateMetadata to all pages (batch 2: remaining pages)

**Files:**
- Modify: `app/faq/page.jsx`
- Modify: `app/career/page.jsx`
- Modify: `app/marketing/page.jsx`
- Modify: `app/invest/page.jsx`
- Modify: `app/training/page.jsx`
- Modify: `app/certification/page.jsx`
- Modify: `app/blogs/page.jsx`
- Modify: `app/testimonials/page.jsx`
- Modify: `app/privacy/page.jsx`
- Modify: `app/terms/page.jsx`

**Step 1: Add metadata to each page**

Same pattern as Task 1. Metadata per page:

| Page | Title | Description |
|------|-------|-------------|
| `/faq` | FAQ \| Vacation Rental Management Questions \| Hostizzy | Answers to common questions about listing your property, management fees, guest vetting, pricing, and Hostizzy's vacation rental services. |
| `/career` | Careers \| Join the Hostizzy Team | Join India's fastest-growing vacation rental management company. Open positions in Marketing, Engineering, Growth & Operations. |
| `/marketing` | Digital Marketing for Vacation Rentals \| Hostizzy | Professional social media, content marketing & digital strategy for vacation rental properties. Boost bookings with Hostizzy's marketing packages. |
| `/invest` | Invest in Hostizzy \| Pre-Seed Round | Investment opportunity in India's premier vacation rental management platform. Technology-driven hospitality with proven traction. |
| `/training` | Host Training Programs \| Hostizzy Academy | Free and premium training programs for vacation rental hosts. Learn pricing, guest management, OTA optimization & hospitality best practices. |
| `/certification` | Host Certification \| Hostizzy Certified | Earn Bronze, Gold, or Platinum certification. Validate your hosting skills and stand out to guests. Launching June 2026. |
| `/blogs` | Blog \| Vacation Rental Insights \| Hostizzy | Expert insights on vacation rental management, Airbnb hosting tips, revenue optimization, and Indian hospitality industry trends. |
| `/testimonials` | Reviews & Testimonials \| Hostizzy | What property owners say about Hostizzy's vacation rental management. Real reviews from hosts across India. |
| `/privacy` | Privacy Policy \| Hostizzy | How Hostizzy collects, uses, and protects your personal information. |
| `/terms` | Terms & Conditions \| Hostizzy | Terms of service for Hostizzy's vacation rental management platform. |

**Step 2: Remove SEO component imports from these pages**

**Step 3: Verify build, commit**

---

### Task 3: Add generateMetadata to product and location pages

**Files:**
- Modify: `app/products/hostos/page.jsx`
- Modify: `app/products/resiq/page.jsx`
- Modify: `app/products/juxtravel/page.jsx`
- Modify: `app/locations/[slug]/page.jsx`

**Step 1: Product pages — add metadata**

| Page | Title | Description |
|------|-------|-------------|
| `/products/hostos` | HostOS \| Smart Property Management System \| Hostizzy | All-in-one PMS for Indian hospitality. GST invoicing, WhatsApp inbox, AI dynamic pricing, guest & owner portals. Built for Indian property managers. |
| `/products/resiq` | ResIQ \| Daily Operations Dashboard \| Hostizzy | Staff-facing operations dashboard for reservations, payments, guest KYC & team coordination. Works offline. Built for Indian hospitality. |
| `/products/juxtravel` | JuxTravel \| Direct Booking Engine \| Hostizzy | Commission-free direct booking platform for vacation rentals. Own your guest relationships and save 15-25% OTA fees. |

**Step 2: Location pages — use `generateMetadata()` with dynamic slug**

```jsx
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const locationData = getLocationBySlug(slug);
  return {
    title: `Vacation Rental Management in ${locationData.name} | Hostizzy`,
    description: `Professional Airbnb & vacation rental management in ${locationData.name}. AI pricing, 15+ OTA channels, full property management. List your ${locationData.name} property today.`,
    keywords: [`vacation rental management ${locationData.name.toLowerCase()}`, `airbnb management ${locationData.name.toLowerCase()}`, `property management ${locationData.name.toLowerCase()}`],
    openGraph: { title: `${locationData.name} Property Management | Hostizzy`, url: `https://www.hostizzy.com/locations/${slug}` },
    alternates: { canonical: `https://www.hostizzy.com/locations/${slug}` },
  };
}
```

**Step 3: Verify build, commit**

---

### Task 4: Per-page structured data (JSON-LD)

**Files:**
- Modify: `app/faq/page.jsx` — add FAQPage schema
- Modify: `app/services/page.jsx` — add Service schema with 5 plans
- Modify: `app/products/hostos/page.jsx` — add Product/SoftwareApplication schema
- Modify: `app/products/resiq/page.jsx` — add Product/SoftwareApplication schema
- Modify: `app/locations/[slug]/page.jsx` — add LocalBusiness schema
- Modify: `app/layout.jsx` — add BreadcrumbList schema

**Step 1: Add schema to each page**

Pattern — add a `<script type="application/ld+json">` in the page component or in the page's layout:

```jsx
const schema = { "@context": "https://schema.org", "@type": "FAQPage", ... };
// In JSX:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
```

**FAQPage schema** — extract actual FAQ content from the page and structure as `Question`/`Answer` pairs.

**Service schema** — list all 5 plans with name, description, price.

**LocalBusiness schema** — per location with name, area, services offered.

**BreadcrumbList** — dynamic based on URL path, added to layout.jsx.

**Step 2: Verify build, commit**

---

### Task 5: Enhanced sitemap + robots.txt cleanup

**Files:**
- Modify: `next-sitemap.config.cjs` — enhanced config
- Delete: `public/robots.txt` (let next-sitemap generate it)

**Step 1: Update sitemap config**

```js
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.hostizzy.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/api', '/admin'] },
    ],
    additionalSitemaps: [],
  },
  exclude: ['/api/*', '/admin/*'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const priorityMap = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/services': { priority: 0.9, changefreq: 'weekly' },
      '/technology': { priority: 0.9, changefreq: 'weekly' },
      '/calculator': { priority: 0.9, changefreq: 'monthly' },
      '/contact': { priority: 0.8, changefreq: 'monthly' },
      '/about': { priority: 0.8, changefreq: 'monthly' },
      '/products/hostos': { priority: 0.8, changefreq: 'weekly' },
      '/products/resiq': { priority: 0.8, changefreq: 'weekly' },
      '/marketing': { priority: 0.8, changefreq: 'monthly' },
      '/faq': { priority: 0.7, changefreq: 'monthly' },
      '/blogs': { priority: 0.7, changefreq: 'daily' },
      '/training': { priority: 0.7, changefreq: 'monthly' },
      '/certification': { priority: 0.7, changefreq: 'monthly' },
      '/career': { priority: 0.6, changefreq: 'weekly' },
      '/testimonials': { priority: 0.6, changefreq: 'monthly' },
      '/invest': { priority: 0.5, changefreq: 'monthly' },
    };
    // Location pages get high priority
    if (path.startsWith('/locations/')) {
      return { loc: path, lastmod: new Date().toISOString(), priority: 0.85, changefreq: 'weekly' };
    }
    const custom = priorityMap[path] || {};
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      priority: custom.priority || config.priority,
      changefreq: custom.changefreq || config.changefreq,
    };
  },
};
```

**Step 2: Delete public/robots.txt**

**Step 3: Build and verify sitemap.xml output**

Run: `npm run build` then check `public/sitemap-0.xml` and `public/robots.txt`

**Step 4: Commit**

---

## Workstream B: AI Chatbot (Tasks 6-8)

### Task 6: Create chat API route

**Files:**
- Create: `app/api/chat/route.js`

**Step 1: Create the API route**

```jsx
import { NextResponse, after } from 'next/server';
import OpenAI from 'openai';
import { adminDb } from '@/lib/firebase-admin';
import { generateId } from '@/lib/utils';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are Hostizzy's AI assistant — a friendly, knowledgeable concierge for India's premier vacation rental management company.

## Your Role
- Answer questions about Hostizzy's services, pricing, and locations
- Help property owners understand which plan suits them
- Qualify potential leads by naturally asking about their property
- Provide revenue estimates based on location and property type
- Escalate to human team when appropriate

## Services & Pricing
1. SmartStart — ₹14,999 one-time onboarding (3 OTA channels, listing optimization, 90-day pricing strategy)
2. ChannelPro — ₹15,000-40,000/month (multi-OTA sync, dynamic pricing, 24/7 guest messaging)
3. Hybrid Core — 18% of net revenue (everything in ChannelPro + direct booking website, dedicated account manager) — MOST POPULAR
4. TotalCare360 — 30% profit share (complete villa/farmhouse management, staff coordination, monthly P&L)
5. StayPrime — 50-50 revenue split (full apartment management, all operational costs covered, zero owner involvement)

## Service Areas
Full Management: Delhi NCR, Uttarakhand, Rajasthan, Himachal Pradesh, Northeast India, UP
Co-Hosting (Pan-India): Available everywhere in India

## Technology
- HostOS: Smart PMS with GST invoicing, WhatsApp inbox, AI dynamic pricing
- ResIQ: Daily operations dashboard for reservations, payments, guest KYC

## Contact
- Property Owners: partnerships@hostizzy.com
- Guests: stay@hostizzy.com
- WhatsApp: +91-9560493335
- Website: www.hostizzy.com

## Guidelines
- Be conversational, warm, and professional (like a Marriott concierge)
- Keep responses concise (2-4 sentences max unless detail is requested)
- When someone seems interested in listing their property, naturally ask about: location, property type, bedrooms
- After qualifying, suggest they fill out the form at /contact or /services for a personalized plan
- If asked about something you don't know, offer to connect them with the team via WhatsApp
- Never make up information about pricing or services not listed above
- Use ₹ for Indian Rupee amounts`;

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not process that. Please try again.';

    // Save chat interaction to Firebase in background
    after(async () => {
      if (adminDb) {
        try {
          await adminDb.collection('chat-logs').doc(generateId()).set({
            userMessage: message,
            aiReply: reply,
            timestamp: new Date().toISOString(),
          });
        } catch (err) {
          console.error('Chat log save failed:', err.message);
        }
      }
    });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error.message);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
```

**Step 2: Verify build, commit**

---

### Task 7: Rewrite FloatingConcierge as AI chat widget

**Files:**
- Modify: `components/FloatingConcierge.jsx` — complete rewrite

**Step 1: Replace entire component**

New component structure:
- Chat button (bottom-right, 64px)
- Chat window (380px wide, 500px tall, mobile: full-screen)
- Message list with bubbles (user right-aligned, AI left-aligned)
- Input bar with send button
- Typing indicator during API call
- WhatsApp fallback button in header
- localStorage persistence (24h TTL)
- Welcome message on first open

Key states: `isOpen`, `messages[]`, `inputText`, `isTyping`, `sessionId`

Message format: `{ role: 'user'|'assistant', content: string, timestamp: Date }`

On send: POST to `/api/chat` with message + history, show typing indicator, append response.

**Step 2: Verify build, commit**

---

### Task 8: Update ConditionalLayout for dynamic import

**Files:**
- Modify: `components/ConditionalLayout.jsx` — dynamic import FloatingConcierge

**Step 1: Change import to dynamic**

```jsx
import dynamic from 'next/dynamic';
const FloatingConcierge = dynamic(() => import('./FloatingConcierge'), { ssr: false });
```

This ensures the chatbot (now heavier with chat UI) doesn't block initial page load.

**Step 2: Verify build, commit**

---

## Workstream C: Performance (Tasks 9-11)

### Task 9: Dynamic imports for heavy components

**Files:**
- Modify: `app/calculator/page.jsx` — dynamic import Recharts
- Modify: `app/services/page.jsx` — dynamic import PropertyLeadWizard
- Modify: `app/contact/page.jsx` — dynamic import PropertyLeadWizard
- Modify: `app/locations/[slug]/page.jsx` — dynamic import PropertyLeadWizard
- Modify: `components/ConditionalLayout.jsx` — dynamic import FloatingConcierge (done in Task 8)

**Step 1: Dynamic import Recharts in calculator**

In `app/calculator/page.jsx`, replace:
```jsx
import { LineChart, Line, ... } from 'recharts';
```
With:
```jsx
import dynamic from 'next/dynamic';
const RechartsChart = dynamic(() => import('../components/CalculatorChart'), { ssr: false, loading: () => <div style={{height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading chart...</div> });
```
Extract the Recharts chart JSX into a separate `components/CalculatorChart.jsx` component.

**Step 2: Dynamic import PropertyLeadWizard**

In pages that use it, replace:
```jsx
import PropertyLeadWizard from '@/components/PropertyLeadWizard';
```
With:
```jsx
import dynamic from 'next/dynamic';
const PropertyLeadWizard = dynamic(() => import('@/components/PropertyLeadWizard'), {
  ssr: false,
  loading: () => <div style={{minHeight: '460px'}} />
});
```

**Step 3: Verify build, commit**

---

### Task 10: Image optimization audit

**Files:**
- Modify: Any files using `<img>` tags that should use `<Image>` from next/image
- Modify: Hero components to add `priority` prop

**Step 1: Find all img tags**

Run: `grep -rn '<img ' app/ components/ --include='*.jsx'`

For each `<img>` tag:
- If it's above the fold (hero, header): convert to `<Image>` with `priority`
- If it's below the fold: convert to `<Image>` with default lazy loading
- If it uses ImageKit URLs: keep as `<img>` but add `loading="lazy"` and explicit `width`/`height`

**Step 2: Verify build, commit**

---

### Task 11: Final build + deploy + verify

**Step 1: Full build**
Run: `npm run build`
Expected: Successful, no warnings

**Step 2: Deploy**
Run: `npx vercel --prod --yes`

**Step 3: Verify SEO**
- Check page source (View Source) on 3 pages — metadata should be in HTML, not injected by JS
- Check sitemap.xml — all pages listed with correct priorities
- Check robots.txt — single consistent version

**Step 4: Verify chatbot**
- Open FloatingConcierge on any page
- Send a message, verify AI response
- Check typing indicator works
- Test mobile view

**Step 5: Verify performance**
- Run Lighthouse on homepage
- Check that Recharts doesn't load on non-calculator pages
- Verify PropertyLeadWizard lazy loads below fold

**Step 6: Commit all remaining changes**
