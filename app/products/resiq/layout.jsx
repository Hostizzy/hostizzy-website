export const metadata = {
  title: 'ResIQ | Operations Platform | Hostizzy',
  description: 'Staff-facing operations dashboard for reservations, payments, guest KYC & team coordination. Works offline. Built for Indian hospitality.',
  keywords: ['hotel operations dashboard', 'reservation management india', 'hospitality operations'],
  openGraph: {
    title: 'ResIQ | Operations Platform | Hostizzy',
    description: 'Staff-facing operations dashboard for reservations, payments, guest KYC & team coordination. Works offline. Built for Indian hospitality.',
    url: 'https://www.hostizzy.com/products/resiq',
    siteName: 'Hostizzy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/products/resiq',
  },
};

export default function ResIQLayout({ children }) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ResIQ",
    "applicationCategory": "Hotel Operations Software",
    "operatingSystem": "Web",
    "description": "Daily operations dashboard for reservations, payments, guest KYC, and team coordination. Works offline as a PWA.",
    "provider": { "@type": "Organization", "name": "Hostizzy" },
    "url": "https://resiq.hostizzy.com"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Technology", "item": "https://www.hostizzy.com/technology" },
      { "@type": "ListItem", "position": 3, "name": "ResIQ", "item": "https://www.hostizzy.com/products/resiq" }
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
