export const metadata = {
  title: 'Contact Us | Partner With Hostizzy',
  description: "List your property with India's premier vacation rental manager. Property owners, guests & business partners welcome. Response within 24 hours.",
  keywords: ['contact hostizzy', 'list property airbnb india', 'vacation rental partner', 'property listing india'],
  openGraph: {
    title: 'Contact Us | Partner With Hostizzy',
    description: "List your property with India's premier vacation rental manager. Property owners, guests & business partners welcome. Response within 24 hours.",
    url: 'https://www.hostizzy.com/contact',
    siteName: 'Hostizzy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/contact',
  },
};

export default function ContactLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.hostizzy.com/contact" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
