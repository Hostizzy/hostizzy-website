import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Blog | Vacation Rental Insights | Hostizzy',
  description: 'Expert insights on vacation rental management, Airbnb hosting tips, revenue optimization & Indian hospitality industry trends.',
  keywords: ['vacation rental blog', 'airbnb tips india', 'property management insights'],
  openGraph: {
    title: 'Blog | Vacation Rental Insights | Hostizzy',
    description: 'Expert insights on vacation rental management, Airbnb hosting tips, revenue optimization & Indian hospitality industry trends.',
    url: 'https://www.hostizzy.com/blogs',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/blogs',
  },
};

export default function BlogsLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.hostizzy.com/blogs" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
