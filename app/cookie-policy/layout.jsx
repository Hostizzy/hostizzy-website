import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Cookie Policy | Hostizzy',
  description: 'How Hostizzy uses cookies and similar technologies.',
  alternates: { canonical: 'https://www.hostizzy.com/cookie-policy' },
  openGraph: {
    title: 'Cookie Policy | Hostizzy',
    description: 'How Hostizzy uses cookies and similar technologies.',
    url: 'https://www.hostizzy.com/cookie-policy',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
};

export default function CookiePolicyLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Cookie Policy", "item": "https://www.hostizzy.com/cookie-policy" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
