import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Terms & Conditions | Hostizzy',
  description: "Terms of service for Hostizzy's vacation rental management platform and services.",
  openGraph: {
    title: 'Terms & Conditions | Hostizzy',
    description: "Terms of service for Hostizzy's vacation rental management platform and services.",
    url: 'https://www.hostizzy.com/terms',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/terms',
  },
};

export default function TermsLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Terms & Conditions", "item": "https://www.hostizzy.com/terms" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
