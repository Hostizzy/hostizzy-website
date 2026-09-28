export const metadata = {
  title: 'HostSuite | Smart Property Management System | Hostizzy',
  description: 'All-in-one PMS for Indian hospitality. GST invoicing, WhatsApp inbox, AI dynamic pricing, guest & owner portals. Built for Indian vacation rentals, homestays and hotels.',
  keywords: ['property management system india', 'hospitality pms', 'hotel management software'],
  openGraph: {
    title: 'HostSuite | Smart Property Management System | Hostizzy',
    description: 'All-in-one PMS for Indian hospitality. GST invoicing, WhatsApp inbox, AI dynamic pricing, guest & owner portals. Built for Indian vacation rentals, homestays and hotels.',
    url: 'https://www.hostizzy.com/products/hostos',
    siteName: 'Hostizzy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/products/hostos',
  },
};

export default function HostSuiteLayout({ children }) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HostSuite",
    "applicationCategory": "Property Management Software",
    "operatingSystem": "Web",
    "description": "Smart property management system with GST invoicing, WhatsApp inbox, AI dynamic pricing, and guest/owner portals.",
    "provider": { "@type": "Organization", "name": "Hostizzy" },
    "url": "https://hostos.hostizzy.com"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Technology", "item": "https://www.hostizzy.com/technology" },
      { "@type": "ListItem", "position": 3, "name": "HostSuite", "item": "https://www.hostizzy.com/products/hostos" }
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
