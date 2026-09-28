export const metadata = {
  title: 'Careers | Join the Hostizzy Team',
  description: 'Join India\'s fastest-growing vacation rental management company. Open positions in Marketing, Engineering, Growth & Operations.',
  keywords: ['hostizzy careers', 'vacation rental jobs india', 'hospitality jobs'],
  openGraph: {
    title: 'Careers | Join the Hostizzy Team',
    description: 'Join India\'s fastest-growing vacation rental management company. Open positions in Marketing, Engineering, Growth & Operations.',
    url: 'https://www.hostizzy.com/career',
    siteName: 'Hostizzy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/career',
  },
};

export default function CareerLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Careers", "item": "https://www.hostizzy.com/career" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
