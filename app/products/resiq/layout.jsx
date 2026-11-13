import { OG_IMAGE } from '@/lib/og';
import { RESIQ, RESIQ_PUBLIC_SIGNUP, ORG_ID, SITE_URL, productSchemaId } from '@/lib/products';

const PAGE_URL = `${SITE_URL}${RESIQ.path}`;
const TITLE = 'ResIQ | Homestay & Villa Booking App for Owners | Hostizzy';
const DESCRIPTION = 'Bookings, payments, guest IDs and WhatsApp templates in one app for homestay, villa and farmstay owners. Works offline. Android + web.'
  + (RESIQ_PUBLIC_SIGNUP ? ' First property free for founding owners.' : '');

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['homestay management app', 'villa booking app for owners', 'homestay software india', 'guest kyc app'],
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

export default function ResIQLayout({ children }) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": productSchemaId(RESIQ),
    "name": RESIQ.name,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Android, Web",
    "description": "App for independent homestay, villa and farmstay owners: bookings, payments, guest ID verification and WhatsApp templates, with a caretaker login. Works offline.",
    "installUrl": RESIQ.playUrl,
    "provider": { "@id": ORG_ID },
    "url": RESIQ.url
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Technology", "item": `${SITE_URL}/technology` },
      { "@type": "ListItem", "position": 3, "name": RESIQ.name, "item": PAGE_URL }
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
