import { OG_IMAGE } from '@/lib/og';

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

export default function FAQLayout({ children }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I list my property with Hostizzy?",
        "acceptedAnswer": { "@type": "Answer", "text": "Simply visit our 'Management' page or contact us directly. We'll schedule a property audit to see if your home fits our portfolio." }
      },
      {
        "@type": "Question",
        "name": "What is your commission rate?",
        "acceptedAnswer": { "@type": "Answer", "text": "Our full-service management fee ranges between 15-20% depending on the property location and services required." }
      },
      {
        "@type": "Question",
        "name": "Do you handle guest vetting?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, we use strict verification processes across all booking platforms to ensure high-quality guests." }
      },
      {
        "@type": "Question",
        "name": "What happens if a guest damages my property?",
        "acceptedAnswer": { "@type": "Answer", "text": "We collect security deposits and assist with insurance claims through platforms like Airbnb AirCover." }
      },
      {
        "@type": "Question",
        "name": "Can I use my own property?",
        "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! You can block dates for personal use anytime through our Owner Portal (ResIQ)." }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hostizzy.com" },
      { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://www.hostizzy.com/faq" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
