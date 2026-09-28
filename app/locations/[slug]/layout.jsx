import { getLocation, getAllLocationSlugs } from '@/lib/locations';
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
  const description = `Professional Airbnb & vacation rental management in ${location.name}. AI pricing, 15+ OTA channels, full property management. List your ${location.name} property today.`;

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
  const locationName = location ? location.name : slug;

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
