export const metadata = {
  title: 'Hospitality Technology Platform | HostOS & ResIQ | Hostizzy',
  description: 'Purpose-built technology for Indian hospitality. HostOS smart PMS with GST invoicing, WhatsApp inbox & AI pricing. ResIQ operations dashboard for reservations & payments.',
  keywords: ['hospitality technology india', 'property management software', 'hotel pms india', 'vacation rental software'],
  openGraph: {
    title: 'Hospitality Technology Platform | HostOS & ResIQ | Hostizzy',
    description: 'Purpose-built technology for Indian hospitality. HostOS smart PMS with GST invoicing, WhatsApp inbox & AI pricing. ResIQ operations dashboard for reservations & payments.',
    url: 'https://www.hostizzy.com/technology',
    siteName: 'Hostizzy',
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
