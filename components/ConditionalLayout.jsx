'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import Footer from './Footer';
const FloatingConcierge = dynamic(() => import('./FloatingConcierge'), { ssr: false });

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    setIsAdmin(pathname?.startsWith('/admin') || hostname.startsWith('admin.'));
  }, [pathname]);

  if (isAdmin) {
    return children;
  }

  return (
    <div className="app">
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        {children}
      </main>
      <Footer />
      <FloatingConcierge />
    </div>
  );
}
