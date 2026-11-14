import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Revenue Calculator | Estimate Your Property Earnings | Hostizzy',
  description: 'Free holiday-home earnings calculator for 33 Indian markets, built on real 2025–26 short-term rental data. See low, typical and strong cases, every fee, and each Hostizzy plan side by side.',
  keywords: ['vacation rental revenue calculator', 'airbnb income estimator india', 'property earnings calculator'],
  openGraph: {
    title: 'Revenue Calculator | Estimate Your Property Earnings | Hostizzy',
    description: 'Free holiday-home earnings calculator for 33 Indian markets, built on real 2025–26 short-term rental data. See low, typical and strong cases, every fee, and each Hostizzy plan side by side.',
    url: 'https://www.hostizzy.com/calculator',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/calculator',
  },
};

export default function CalculatorLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.hostizzy.com/services" },
      { "@type": "ListItem", "position": 3, "name": "Revenue Calculator", "item": "https://www.hostizzy.com/calculator" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
