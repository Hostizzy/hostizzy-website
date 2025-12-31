'use client';

import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from '../components/Toast';
import { SettingsProvider } from '../context/SettingsContext';

export function Providers({ children }) {
  return (
    <HelmetProvider>
      <SettingsProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </SettingsProvider>
    </HelmetProvider>
  );
}
