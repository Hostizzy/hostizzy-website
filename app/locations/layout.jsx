import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Vacation Rental Management Locations | Hostizzy',
  description: 'Professional vacation rental management across India. Delhi NCR, Himachal Pradesh, Uttarakhand, Rajasthan & pan-India co-hosting services.',
  keywords: ['vacation rental management locations', 'property management india locations', 'airbnb management cities india'],
  openGraph: {
    title: 'Vacation Rental Management Locations | Hostizzy',
    description: 'Professional vacation rental management across India. Delhi NCR, Himachal Pradesh, Uttarakhand, Rajasthan & pan-India co-hosting services.',
    url: 'https://www.hostizzy.com/locations',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/locations',
  },
};

export default function LocationsLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://www.hostizzy.com/locations" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
