import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'JuxTravel | Trip-Matching Discovery for Indian Travellers | Hostizzy',
  description: "Don't just find a stay, find the trip that fits. Jux Fit matching, an honest Reality Layer before you book, and Passport to remember every trip. Independent hosts only.",
  keywords: ['travel discovery india', 'homestay matching india', 'independent homestays', 'trip planning india'],
  openGraph: {
    title: 'JuxTravel | Trip-Matching Discovery for Indian Travellers',
    description: "Don't just find a stay, find the trip that fits. Independent hosts only. Full launch September 2026.",
    url: 'https://www.hostizzy.com/products/juxtravel',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/products/juxtravel',
  },
};

export default function JuxTravelLayout({ children }) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JuxTravel",
    "applicationCategory": "Travel Discovery Platform",
    "operatingSystem": "Web",
    "description": "Trip-matching discovery platform for Indian travellers. Jux Fit matches travellers to independent homestays by travel style, the Reality Layer shows honest trade-offs before booking, and Passport keeps a personal record of every trip.",
    "provider": { "@type": "Organization", "name": "Hostizzy" },
    "url": "https://www.juxtravel.com"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Technology", "item": "https://www.hostizzy.com/technology" },
      { "@type": "ListItem", "position": 3, "name": "JuxTravel", "item": "https://www.hostizzy.com/products/juxtravel" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
