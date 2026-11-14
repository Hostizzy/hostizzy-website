'use client';

import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import Footer from './Footer';
const FloatingConcierge = dynamic(() => import('./FloatingConcierge'), { ssr: false });

export default function ConditionalLayout({ children }) {
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
