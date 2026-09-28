export const metadata = {
  title: 'Revenue Calculator | Estimate Your Property Earnings | Hostizzy',
  description: 'Free AI-powered revenue calculator for vacation rentals across 40+ Indian cities. Instant estimates for villas, apartments & farmhouses.',
  keywords: ['vacation rental revenue calculator', 'airbnb income estimator india', 'property earnings calculator'],
  openGraph: {
    title: 'Revenue Calculator | Estimate Your Property Earnings | Hostizzy',
    description: 'Free AI-powered revenue calculator for vacation rentals across 40+ Indian cities. Instant estimates for villas, apartments & farmhouses.',
    url: 'https://www.hostizzy.com/calculator',
    siteName: 'Hostizzy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/calculator',
  },
};

export default function CalculatorLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.hostizzy.com/services" },
      { "@type": "ListItem", "position": 3, "name": "Revenue Calculator", "item": "https://www.hostizzy.com/calculator" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
