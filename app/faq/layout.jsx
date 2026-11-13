import { OG_IMAGE } from '@/lib/og';
import { faqSchema } from '@/lib/faq';

export const metadata = {
  title: 'FAQ | Vacation Rental Management Questions | Hostizzy',
  description: "Answers to common questions about listing your property, management fees, guest vetting, pricing & Hostizzy's vacation rental services across India.",
  keywords: ['vacation rental faq', 'airbnb management questions', 'property management help'],
  openGraph: {
    title: 'FAQ | Vacation Rental Management Questions | Hostizzy',
    description: "Answers to common questions about listing your property, management fees, guest vetting, pricing & Hostizzy's vacation rental services across India.",
    url: 'https://www.hostizzy.com/faq',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/faq',
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
    { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://www.hostizzy.com/faq" }
  ]
};

export default function FAQLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
