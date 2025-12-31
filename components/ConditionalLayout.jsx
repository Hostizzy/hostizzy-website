'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingConcierge from './FloatingConcierge';
import BookingTicker from './BookingTicker';
import LiveChat from './LiveChat';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Hide header/footer for admin and login pages
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

  if (isAdminRoute) {
    // Admin/Login pages - no header/footer
    return children;
  }

  // Public pages - with header/footer
  return (
    <div className="app">
      <Navbar />
      <BookingTicker />
      <main style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        {children}
      </main>
      <Footer />
      <FloatingConcierge />
      <LiveChat />
    </div>
  );
}
