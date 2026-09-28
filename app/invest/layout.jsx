import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Invest in Hostizzy | Pre-Seed Round',
  description: "Investment opportunity in India's premier vacation rental management platform. Technology-driven hospitality with proven traction.",
  keywords: ['hostizzy investment', 'vacation rental startup india'],
  openGraph: {
    title: 'Invest in Hostizzy | Pre-Seed Round',
    description: "Investment opportunity in India's premier vacation rental management platform. Technology-driven hospitality with proven traction.",
    url: 'https://www.hostizzy.com/invest',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/invest',
  },
};

export default function InvestLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Invest", "item": "https://www.hostizzy.com/invest" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
