import Script from 'next/script';
import { Providers } from './providers';
import ConditionalLayout from '../components/ConditionalLayout';
import './globals.css';

export const metadata = {
  title: 'Hostizzy | Premier Airbnb & Vacation Rental Management India',
  description: 'Hostizzy: Premier Airbnb Property Management and Vacation Rental experts in India. We maximize revenue and guest satisfaction.',
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  metadataBase: new URL('https://www.hostizzy.com'),
  openGraph: {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>

        {/* Organization Schema Markup (Global) */}
        <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Hostizzy",
              "description": "India's leading vacation rental management platform",
              "url": "https://www.hostizzy.com",
              "logo": "https://www.hostizzy.com/images/logo.jpg",
              "image": "https://www.hostizzy.com/images/og-image.jpg",
              "sameAs": [
                "https://www.instagram.com/hostizzy_official",
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
                  "@type": "State",
                  "name": "Goa"
                },
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
                      "name": "StayPrime",
                      "description": "Full-service management for premium properties"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "TotalCare360",
                      "description": "Comprehensive management with marketing"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "BrandEngage Pro",
                      "description": "Marketing and digital presence services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "DIY with Support",
                      "description": "Tools and guidance for self-managing hosts"
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
                "reviewCount": "156",
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
          `}
        </Script>
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
