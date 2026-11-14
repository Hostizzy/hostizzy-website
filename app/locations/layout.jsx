import { OG_IMAGE } from '@/lib/og';

export const metadata = {
  title: 'Vacation Rental Management Locations | Hostizzy',
  description: 'Professional vacation rental management across India. Full management in Delhi NCR, Himachal Pradesh, Uttarakhand & Uttar Pradesh; co-hosting across India.',
  keywords: ['vacation rental management locations', 'property management india locations', 'airbnb management cities india'],
  openGraph: {
    title: 'Vacation Rental Management Locations | Hostizzy',
    description: 'Professional vacation rental management across India. Full management in Delhi NCR, Himachal Pradesh, Uttarakhand & Uttar Pradesh; co-hosting across India.',
    url: 'https://www.hostizzy.com/locations',
    siteName: 'Hostizzy',
    images: OG_IMAGE,
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.hostizzy.com/locations',
  },
};

// The Home › Locations breadcrumb lives on app/locations/page.jsx, so the
// city pages (which add their own 3-level breadcrumb) don't carry two.
export default function LocationsLayout({ children }) {
  return children;
}
