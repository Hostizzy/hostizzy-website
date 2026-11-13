import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Hospitality Technology: HostSuite, ResIQ & JuxTravel | Hostizzy',
  description: 'Three products from Hostizzy: HostSuite, the PMS for hosting businesses (formerly HostOS); ResIQ, the app for independent homestay owners; and JuxTravel, the trip-matching app for travellers.',
  keywords: ['hostsuite', 'resiq', 'juxtravel', 'hospitality technology india', 'property management software', 'hotel pms india', 'vacation rental software'],
  openGraph: {
    title: 'Hospitality Technology: HostSuite, ResIQ & JuxTravel | Hostizzy',
    description: 'Three products from Hostizzy: HostSuite, the PMS for hosting businesses (formerly HostOS); ResIQ, the app for independent homestay owners; and JuxTravel, the trip-matching app for travellers.',
    url: 'https://www.hostizzy.com/technology',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/technology',
  },
};

export default function TechnologyLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Technology", "item": "https://www.hostizzy.com/technology" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
