import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async';

// Global API Base URL Configuration for Production
if (import.meta.env.VITE_API_BASE_URL) {
  const originalFetch = window.fetch;
  window.fetch = async (url, options) => {
    if (typeof url === 'string' && url.startsWith('/api')) {
      url = import.meta.env.VITE_API_BASE_URL + url;
    }
    return originalFetch(url, options);
  };
}

import { ToastProvider } from './components/Toast';
import { SettingsProvider } from './context/SettingsContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <ToastProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToastProvider>
      </SettingsProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
