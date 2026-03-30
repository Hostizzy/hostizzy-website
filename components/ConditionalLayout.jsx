'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import FloatingConcierge from './FloatingConcierge';
import LiveChat from './LiveChat';

export default function ConditionalLayout({ children }) {
  // Public pages - with header/footer
  return (
    <div className="app">
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        {children}
      </main>
      <Footer />
      <FloatingConcierge />
      <LiveChat />
    </div>
  );
}
