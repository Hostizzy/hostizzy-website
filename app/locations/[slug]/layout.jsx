import { notFound } from 'next/navigation';
import { getLocation, getAllLocationSlugs } from '@/lib/locations';

// Only the known locations exist. Prerendering them puts them in the
// sitemap; anything else is a real 404 instead of a 200 "not found" page.
export const dynamicParams = false;
export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}
import { OG_IMAGE } from '@/lib/og';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    return {
      title: 'Location Not Found | Hostizzy',
    };
  }

  const title = `Vacation Rental Management in ${location.name} | Hostizzy`;
  const description = `Professional Airbnb & vacation rental management in ${location.name}. Dynamic pricing, 10+ booking channels, ${location.serviceModel === 'full' ? 'full property management' : 'co-hosting'}. List your ${location.name} property today.`;

  return {
    title,
    description,
    keywords: location.keywords || [],
    openGraph: {
      title,
      description,
      url: `https://www.hostizzy.com/locations/${slug}`,
      siteName: 'Hostizzy',
      images: OG_IMAGE,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.hostizzy.com/locations/${slug}`,
    },
  };
}

export default async function LocationSlugLayout({ children, params }) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();
  const locationName = location.name;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://www.hostizzy.com/locations" },
      { "@type": "ListItem", "position": 3, "name": locationName, "item": `https://www.hostizzy.com/locations/${slug}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
