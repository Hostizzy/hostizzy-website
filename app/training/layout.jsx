export const metadata = {
  title: 'Host Training Programs | Hostizzy Academy',
  description: 'Free and premium training for vacation rental hosts. Learn pricing, guest management, OTA optimization & hospitality best practices.',
  keywords: ['host training india', 'airbnb hosting course', 'vacation rental training'],
  openGraph: {
    title: 'Host Training Programs | Hostizzy Academy',
    description: 'Free and premium training for vacation rental hosts. Learn pricing, guest management, OTA optimization & hospitality best practices.',
    url: 'https://www.hostizzy.com/training',
    siteName: 'Hostizzy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/training',
  },
};

export default function TrainingLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Host Academy", "item": "https://www.hostizzy.com/training" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
