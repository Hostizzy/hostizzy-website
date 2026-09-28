export const metadata = {
  title: 'Privacy Policy | Hostizzy',
  description: 'How Hostizzy collects, uses and protects your personal information. Our commitment to data privacy.',
  openGraph: {
    title: 'Privacy Policy | Hostizzy',
    description: 'How Hostizzy collects, uses and protects your personal information. Our commitment to data privacy.',
    url: 'https://www.hostizzy.com/privacy',
    siteName: 'Hostizzy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/privacy',
  },
};

export default function PrivacyLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://www.hostizzy.com/privacy" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
