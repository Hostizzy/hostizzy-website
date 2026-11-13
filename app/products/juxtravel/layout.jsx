import { OG_IMAGE } from '@/lib/og';
import { JUXTRAVEL, ORG_ID, SITE_URL, productSchemaId } from '@/lib/products';

const PAGE_URL = `${SITE_URL}${JUXTRAVEL.path}`;
const TITLE = 'JuxTravel | Trip-Matching App for Indian Travellers | Hostizzy';
const DESCRIPTION = "Don't just find a stay, find the trip that fits. Jux Fit matching, an honest Reality Layer and Passport. Independent hosts only. Live across India on Android since 15 Sep 2026.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['juxtravel', 'travel app india', 'homestay matching india', 'independent homestays', 'trip planning india'],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function JuxTravelLayout({ children }) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": productSchemaId(JUXTRAVEL),
    "name": JUXTRAVEL.name,
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Android",
    "installUrl": JUXTRAVEL.playUrl,
    "datePublished": JUXTRAVEL.launchDateISO,
    "description": "Trip-matching app for Indian travellers. Jux Fit matches travellers to independent homestays by travel style, the Reality Layer shows honest trade-offs before booking, and Passport keeps a personal record of every trip.",
    "provider": { "@id": ORG_ID },
    "url": JUXTRAVEL.url
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Technology", "item": `${SITE_URL}/technology` },
      { "@type": "ListItem", "position": 3, "name": JUXTRAVEL.name, "item": PAGE_URL }
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
