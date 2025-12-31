import { Providers } from './providers';
import ConditionalLayout from '../components/ConditionalLayout';
import './globals.css';

export const metadata = {
  title: 'Hostizzy | Premier Airbnb & Vacation Rental Management India',
  description: 'Hostizzy: Premier Airbnb Property Management and Vacation Rental experts in India. We maximize revenue and guest satisfaction.',
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
