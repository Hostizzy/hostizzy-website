import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Our Story | About Hostizzy',
  description: "India's technology-driven vacation rental management company. Empowering property owners with professional hospitality management to maximize revenue.",
  keywords: ['about hostizzy', 'vacation rental company india', 'property management team'],
  openGraph: {
    title: 'Our Story | About Hostizzy',
    description: "India's technology-driven vacation rental management company. Empowering property owners with professional hospitality management to maximize revenue.",
    url: 'https://www.hostizzy.com/about',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/about',
  },
};

export default function AboutLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Our Story", "item": "https://www.hostizzy.com/about" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
