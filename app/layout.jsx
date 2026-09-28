import Script from 'next/script';
import { Providers } from './providers';
import ConditionalLayout from '../components/ConditionalLayout';
import './globals.css';

export const metadata = {
  title: 'Hostizzy | Premier Vacation Rental Management India',
  description: "India's leading Airbnb & vacation rental management company. AI-powered pricing, 15+ OTA channels, full property management across Delhi NCR, Himachal, Uttarakhand & Rajasthan.",
  keywords: ['vacation rental management india', 'airbnb property management india', 'holiday home management', 'property management company india'],
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  metadataBase: new URL('https://www.hostizzy.com'),
  openGraph: {
    title: 'Hostizzy | Premier Vacation Rental Management India',
    description: "India's leading Airbnb & vacation rental management company. AI-powered pricing, 15+ OTA channels, full property management across Delhi NCR, Himachal, Uttarakhand & Rajasthan.",
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.hostizzy.com',
    siteName: 'Hostizzy',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hostizzy - India\'s Premier Vacation Rental Management',
      },
    ],
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
    <html lang="en">
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
            repo already uses a raw script tag; this one now matches. */}
        <script id="schema-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://www.hostizzy.com/#organization",
              "name": "Hostizzy",
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
                      "description": "OTA channel management (₹15,000-40,000/month)"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Hybrid Core",
                      "description": "Commission-based co-hosting (18% of net revenue)"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "TotalCare360",
                      "description": "Complete villa and farmhouse management (30% profit share)"
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
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "stay@hostizzy.com",
                "telephone": "+91-95604-94001",
                "availableLanguage": ["en", "hi"]
              }
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
