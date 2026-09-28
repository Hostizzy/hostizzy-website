import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Reviews & Testimonials | Hostizzy',
  description: "What property owners say about Hostizzy's vacation rental management. Real reviews from hosts across India.",
  keywords: ['hostizzy reviews', 'vacation rental management reviews'],
  openGraph: {
    title: 'Reviews & Testimonials | Hostizzy',
    description: "What property owners say about Hostizzy's vacation rental management. Real reviews from hosts across India.",
    url: 'https://www.hostizzy.com/testimonials',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/testimonials',
  },
};

export default function TestimonialsLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Testimonials", "item": "https://www.hostizzy.com/testimonials" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
