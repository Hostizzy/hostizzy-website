import { OG_IMAGE } from '@/lib/og';
import { HOSTSUITE, ORG_ID, SITE_URL, productSchemaId } from '@/lib/products';

const PAGE_URL = `${SITE_URL}${HOSTSUITE.path}`;
const TITLE = 'HostSuite (formerly HostOS) | Property Management System | Hostizzy';
const DESCRIPTION = 'HostSuite by Hostizzy: the PMS for Indian hosts. AI inbox and Niva, OTA email import, iCal sync, GST invoicing and owner statements. From ₹999/month, 14-day free trial.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['hostsuite', 'hostos', 'property management system india', 'hospitality pms', 'vacation rental software india'],
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

export default function HostSuiteLayout({ children }) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": productSchemaId(HOSTSUITE),
    "name": HOSTSUITE.name,
    "alternateName": HOSTSUITE.formerly,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Property management system for hosting businesses: unified inbox with an AI Concierge and the Niva agent, OTA email import, bidirectional iCal sync, GST invoicing, owner statements and payouts.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": String(HOSTSUITE.priceFromNumber),
      "priceCurrency": "INR",
      "offerCount": 3
    },
    "provider": { "@id": ORG_ID },
    "url": HOSTSUITE.url
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Technology", "item": `${SITE_URL}/technology` },
      { "@type": "ListItem", "position": 3, "name": HOSTSUITE.name, "item": PAGE_URL }
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
