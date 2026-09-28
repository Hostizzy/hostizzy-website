export const metadata = {
  title: 'Data Deletion Request | Hostizzy',
  description: 'Request deletion of your personal data from Hostizzy services.',
  alternates: { canonical: 'https://www.hostizzy.com/data-deletion' },
  openGraph: {
    title: 'Data Deletion Request | Hostizzy',
    description: 'Request deletion of your personal data from Hostizzy services.',
    url: 'https://www.hostizzy.com/data-deletion',
    siteName: 'Hostizzy',
    type: 'website',
  },
};

export default function DataDeletionLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Data Deletion Request", "item": "https://www.hostizzy.com/data-deletion" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
