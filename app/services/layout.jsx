import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Property Management Plans & Pricing | Hostizzy',
  description: 'Choose from 6 vacation rental management plans, from \u20B914,999 onboarding to full and premium property management. SmartStart, ChannelPro, Hybrid Core, TotalCare360, StayPrime & Signature.',
  keywords: ['property management pricing india', 'airbnb management plans', 'vacation rental co-hosting', 'property management fees'],
  openGraph: {
    title: 'Property Management Plans & Pricing | Hostizzy',
    description: 'Choose from 6 vacation rental management plans, from \u20B914,999 onboarding to full and premium property management. SmartStart, ChannelPro, Hybrid Core, TotalCare360, StayPrime & Signature.',
    url: 'https://www.hostizzy.com/services',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/services',
  },
};

export default function ServicesLayout({ children }) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Vacation Rental Management",
    "provider": { "@type": "Organization", "name": "Hostizzy" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Property Management Plans",
      "itemListElement": [
        { "@type": "Offer", "name": "SmartStart", "description": "One-time onboarding for new hosts", "price": "14999", "priceCurrency": "INR" },
        { "@type": "Offer", "name": "ChannelPro", "description": "OTA channel management: ₹15,000–40,000 a month or 15% of net revenue", "price": "15000", "priceCurrency": "INR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "15000-40000", "priceCurrency": "INR", "unitText": "month" } },
        { "@type": "Offer", "name": "Hybrid Core", "description": "Commission-based co-hosting at 20% of net revenue" },
        { "@type": "Offer", "name": "TotalCare360", "description": "Complete villa and farmhouse management at 30% of net revenue" },
        { "@type": "Offer", "name": "StayPrime", "description": "Full apartment management with 50-50 revenue split" },
        { "@type": "Offer", "name": "Signature", "description": "Premium management for 3+ bedroom villas and farmhouses: 30% of net revenue plus 15% of revenue above an agreed yearly target, with paid ads for direct bookings" }
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.hostizzy.com/services" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
