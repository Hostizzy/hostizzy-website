export const metadata = {
  title: 'Refund & Cancellation Policy | Hostizzy',
  description: 'Refund and cancellation policies for Hostizzy bookings and management services.',
  alternates: { canonical: 'https://www.hostizzy.com/refund-policy' },
  openGraph: {
    title: 'Refund & Cancellation Policy | Hostizzy',
    description: 'Refund and cancellation policies for Hostizzy bookings and management services.',
    url: 'https://www.hostizzy.com/refund-policy',
    siteName: 'Hostizzy',
    type: 'website',
  },
};

export default function RefundPolicyLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Refund & Cancellation Policy", "item": "https://www.hostizzy.com/refund-policy" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
