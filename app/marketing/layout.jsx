export const metadata = {
  title: 'Digital Marketing for Vacation Rentals | Hostizzy',
  description: "Professional social media, content marketing & digital strategy for vacation rental properties. Boost bookings with Hostizzy's marketing packages.",
  keywords: ['vacation rental marketing', 'airbnb marketing india', 'property digital marketing'],
  openGraph: {
    title: 'Digital Marketing for Vacation Rentals | Hostizzy',
    description: "Professional social media, content marketing & digital strategy for vacation rental properties. Boost bookings with Hostizzy's marketing packages.",
    url: 'https://www.hostizzy.com/marketing',
    siteName: 'Hostizzy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/marketing',
  },
};

export default function MarketingLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.hostizzy.com/services" },
      { "@type": "ListItem", "position": 3, "name": "Digital Marketing", "item": "https://www.hostizzy.com/marketing" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
