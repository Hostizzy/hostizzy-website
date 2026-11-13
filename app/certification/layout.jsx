import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Host Certification | Hostizzy Certified',
  description: 'Earn Bronze, Gold or Platinum hosting certification. Validate your skills and stand out to guests. Join the waitlist for early access.',
  keywords: ['host certification india', 'airbnb host certification'],
  openGraph: {
    title: 'Host Certification | Hostizzy Certified',
    description: 'Earn Bronze, Gold or Platinum hosting certification. Validate your skills and stand out to guests. Join the waitlist for early access.',
    url: 'https://www.hostizzy.com/certification',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/certification',
  },
};

export default function CertificationLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Host Academy", "item": "https://www.hostizzy.com/training" },
      { "@type": "ListItem", "position": 3, "name": "Host Certified", "item": "https://www.hostizzy.com/certification" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
