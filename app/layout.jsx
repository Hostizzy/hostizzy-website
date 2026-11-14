import Script from 'next/script';
import { OG_IMAGE } from '@/lib/og';
import { Providers } from './providers';
import ConditionalLayout from '../components/ConditionalLayout';
import './globals.css';

export const metadata = {
  title: 'Hostizzy | Premier Vacation Rental Management India',
  description: "India's leading Airbnb & vacation rental management company. AI-powered pricing, 10+ booking channels, full property management across Delhi NCR, Himachal, Uttarakhand & Uttar Pradesh, and co-hosting across India.",
  keywords: ['vacation rental management india', 'airbnb property management india', 'holiday home management', 'property management company india'],
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  metadataBase: new URL('https://www.hostizzy.com'),
  openGraph: {
    title: 'Hostizzy | Premier Vacation Rental Management India',
    description: "India's leading Airbnb & vacation rental management company. AI-powered pricing, 10+ booking channels, full property management across Delhi NCR, Himachal, Uttarakhand & Uttar Pradesh, and co-hosting across India.",
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.hostizzy.com',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
  },
  alternates: {
    canonical: 'https://www.hostizzy.com',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hostizzy',
    creator: '@hostizzy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-29EDHJHTDF';

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Google Analytics 4.
            GA measurement IDs are public by design (they ship in the client
            HTML), so the real ID is the default here. The env var still wins
            where one is set, and if both are somehow empty the tag is not
            rendered at all — a placeholder ID silently records nothing while
            looking installed, which is worse than no analytics. */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}

        {/* Organization schema, global.
            This is a plain <script>, not next/script. With next/script the
            markup never reached the HTML as a parseable ld+json tag — it went
            into the RSC payload and was injected by the Next runtime instead,
            so the address, rating, areaServed and offer catalogue were invisible
            to anything reading the served HTML. Every per-page schema in this
            repo already uses a raw script tag; this one now matches.

            There is deliberately no aggregateRating in here — do not add one
            back. It used to claim 4.9 from 150 reviews and nobody could source
            the 150; the repo held six hand-written testimonials. The real
            figures (HostSuite production, Sep 2026) are 4.87 from 253 reviews,
            and they still do not belong in this block: Google's review-snippet
            rules forbid aggregating ratings collected on other sites, and these
            are Airbnb and MakeMyTrip; and reviews about a business served on
            that business's own site are self-serving, so they are not eligible
            for star snippets on Organization or LocalBusiness regardless. The
            markup buys nothing and risks a manual action. Show the figure as
            visible text credited to the OTAs with an as-of date instead. */}
        <script id="schema-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://www.hostizzy.com/#organization",
              "name": "Hostizzy",
              "legalName": "Hostsphere India Private Limited",
              "brand": [
                { "@type": "Brand", "name": "HostSuite" },
                { "@type": "Brand", "name": "ResIQ" },
                { "@type": "Brand", "name": "JuxTravel" }
              ],
              "additionalType": [
                "https://en.wikipedia.org/wiki/Property_management",
                "https://en.wikipedia.org/wiki/Vacation_rental"
              ],
              "description": "India's leading vacation rental and Airbnb management company, for villa, farmstay and apartment owners across India.",
              "makesOffer": {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Vacation Rental Management",
                  "serviceType": [
                    "Vacation rental management",
                    "Short-term rental management",
                    "Airbnb management",
                    "Homestay management"
                  ],
                  "provider": { "@id": "https://www.hostizzy.com/#organization" },
                  "areaServed": { "@type": "Country", "name": "India" }
                }
              },
              "url": "https://www.hostizzy.com",
              "logo": "https://www.hostizzy.com/images/logo.jpg",
              "image": "https://www.hostizzy.com/images/og-image.jpg",
              "sameAs": [
                "https://www.instagram.com/hostizzy",
                "https://www.facebook.com/hostizzy",
                "https://www.linkedin.com/company/hostizzy",
                "https://twitter.com/hostizzy"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "E 13/29, 1st Floor, Harsha Bhawan, Connaught Place",
                "addressLocality": "New Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110001",
                "addressCountry": "IN"
              },
              "priceRange": "₹₹₹",
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Manali",
                  "containedInPlace": { "@type": "State", "name": "Himachal Pradesh" }
                },
                {
                  "@type": "City",
                  "name": "Shimla",
                  "containedInPlace": { "@type": "State", "name": "Himachal Pradesh" }
                },
                {
                  "@type": "City",
                  "name": "Kasauli",
                  "containedInPlace": { "@type": "State", "name": "Himachal Pradesh" }
                },
                {
                  "@type": "City",
                  "name": "Mukteshwar",
                  "containedInPlace": { "@type": "State", "name": "Uttarakhand" }
                },
                {
                  "@type": "City",
                  "name": "Nainital",
                  "containedInPlace": { "@type": "State", "name": "Uttarakhand" }
                },
                {
                  "@type": "City",
                  "name": "Jaipur",
                  "containedInPlace": { "@type": "State", "name": "Rajasthan" }
                },
                {
                  "@type": "City",
                  "name": "Udaipur",
                  "containedInPlace": { "@type": "State", "name": "Rajasthan" }
                },
                {
                  "@type": "Place",
                  "name": "Delhi NCR"
                },
                {
                  "@type": "City",
                  "name": "Sohna",
                  "containedInPlace": { "@type": "State", "name": "Haryana" }
                },
                {
                  "@type": "State",
                  "name": "Uttar Pradesh"
                },
                {
                  "@type": "Place",
                  "name": "North East India"
                },
                {
                  "@type": "State",
                  "name": "Goa"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Hostizzy Service Plans",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "SmartStart",
                      "description": "One-time onboarding setup for new hosts (₹14,999)"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "ChannelPro",
                      "description": "OTA channel management (₹15,000-40,000/month or 15% of net revenue)"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Hybrid Core",
                      "description": "Commission-based co-hosting (20% of net revenue)"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "TotalCare360",
                      "description": "Complete villa and farmhouse management (30% of net revenue)"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "StayPrime",
                      "description": "Full apartment management (50-50 revenue split)"
                    }
                  }
                ]
              },
              "knowsAbout": [
                "vacation rental management",
                "Airbnb management",
                "property management India",
                "hospitality technology",
                "revenue optimization",
                "dynamic pricing",
                "guest experience management"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "reservations",
                  "email": "stay@hostizzy.com",
                  "telephone": "+91-95604-94001",
                  "availableLanguage": ["en", "hi"]
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "sales",
                  "name": "Host onboarding and owner queries",
                  "email": "partnerships@hostizzy.com",
                  "telephone": "+91-95604-93335",
                  "availableLanguage": ["en", "hi"]
                }
              ]
            }
          ` }} />
      </head>
      <body>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
