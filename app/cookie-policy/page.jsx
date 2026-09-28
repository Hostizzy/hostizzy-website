'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

export default function CookiePolicy() {
  const sectionHeading = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1.5rem',
    marginTop: '2.5rem',
    marginBottom: '1rem',
    color: '#1e293b',
  };

  const bodyText = {
    color: '#475569',
    fontSize: '1rem',
    lineHeight: 1.8,
    marginBottom: '1rem',
  };

  const tableCell = {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#475569',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    verticalAlign: 'top',
  };

  const tableHeader = {
    ...tableCell,
    fontWeight: 700,
    color: '#1e293b',
    background: '#f8fafc',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: 'white',
          padding: 'calc(var(--header-height) + 3rem) 0 4rem',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <ScrollReveal>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
              Cookie Policy
            </h1>
            <p style={{ fontSize: '1.15rem', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>
              How we use cookies and similar technologies on our website.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="container section" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '3rem', paddingBottom: '4rem' }}>
        <ScrollReveal>
          <p style={{ ...bodyText, marginBottom: '0.5rem', fontStyle: 'italic' }}>Last Updated: April 2026</p>
          <p style={bodyText}>
            This Cookie Policy explains how Hostsphere India Pvt Ltd (brand: Hostizzy) uses cookies and similar storage technologies when you visit{' '}
            <a href="https://www.hostizzy.com" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              www.hostizzy.com
            </a>. By continuing to browse the site, you consent to our use of cookies as described below.
          </p>

          {/* What Are Cookies */}
          <h2 style={sectionHeading}>1. What Are Cookies</h2>
          <p style={bodyText}>
            Cookies are small text files placed on your device by a website. They are widely used to make websites function correctly, improve efficiency, and provide information to site operators. Cookies may be &quot;session&quot; cookies (deleted when you close your browser) or &quot;persistent&quot; cookies (remaining on your device for a set period or until you delete them).
          </p>

          {/* Cookies We Use */}
          <h2 style={sectionHeading}>2. Cookies We Use</h2>
          <p style={bodyText}>
            Hostizzy uses a minimal set of cookies. We do <strong>not</strong> use advertising or behavioural tracking cookies.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
              <thead>
                <tr>
                  <th style={tableHeader}>Category</th>
                  <th style={tableHeader}>Cookie / Technology</th>
                  <th style={tableHeader}>Purpose</th>
                  <th style={tableHeader}>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>Essential</td>
                  <td style={tableCell}>Session cookies</td>
                  <td style={tableCell}>Maintain your browsing session, enable form submissions, and keep the site functional</td>
                  <td style={tableCell}>Session (deleted on browser close)</td>
                </tr>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>Analytics</td>
                  <td style={tableCell}>Google Analytics 4 (_ga, _ga_*)</td>
                  <td style={tableCell}>Measure site traffic, page views, and user journeys to improve the website experience</td>
                  <td style={tableCell}>Up to 2 years</td>
                </tr>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>Functional</td>
                  <td style={tableCell}>localStorage (chat history)</td>
                  <td style={tableCell}>Store AI chatbot conversation history locally so you can resume conversations</td>
                  <td style={tableCell}>24 hours (auto-deleted)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* No Advertising Cookies */}
          <h2 style={sectionHeading}>3. No Advertising or Tracking Cookies</h2>
          <p style={bodyText}>
            Hostizzy does <strong>not</strong> use any advertising cookies, retargeting pixels, or cross-site tracking technologies. We do not sell, share, or trade your browsing data with advertisers or data brokers.
          </p>

          {/* Third-Party Cookies */}
          <h2 style={sectionHeading}>4. Third-Party Cookies</h2>
          <p style={bodyText}>
            Certain third-party services embedded on our site may set their own cookies:
          </p>
          <ul style={{ ...bodyText, paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Google Analytics (GA4)</strong> -- used to collect anonymised usage statistics. Google&apos;s privacy policy applies to data collected by their cookies.{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                Google Privacy Policy
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>YouTube embeds</strong> -- if you play an embedded video, YouTube may set cookies on your device.{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                YouTube Privacy Policy
              </a>
            </li>
          </ul>
          <p style={bodyText}>
            We use privacy-enhanced mode for YouTube embeds where possible to minimise cookie usage.
          </p>

          {/* Managing Cookies */}
          <h2 style={sectionHeading}>5. Managing Cookies</h2>
          <p style={bodyText}>
            Most web browsers allow you to control cookies through their settings. You can typically:
          </p>
          <ul style={{ ...bodyText, paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>View and delete existing cookies</li>
            <li style={{ marginBottom: '0.5rem' }}>Block all or specific third-party cookies</li>
            <li style={{ marginBottom: '0.5rem' }}>Set your browser to notify you when a cookie is being set</li>
            <li style={{ marginBottom: '0.5rem' }}>Browse in &quot;private&quot; or &quot;incognito&quot; mode to prevent persistent cookies</li>
          </ul>
          <p style={bodyText}>
            Please note that disabling essential cookies may affect the functionality of the website, including form submissions and session management.
          </p>

          <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
            <p style={{ ...bodyText, marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>Browser cookie settings:</p>
            <ul style={{ ...bodyText, paddingLeft: '1.5rem', marginBottom: 0 }}>
              <li style={{ marginBottom: '0.25rem' }}>Chrome: Settings &gt; Privacy and Security &gt; Cookies</li>
              <li style={{ marginBottom: '0.25rem' }}>Firefox: Settings &gt; Privacy &amp; Security &gt; Cookies</li>
              <li style={{ marginBottom: '0.25rem' }}>Safari: Preferences &gt; Privacy &gt; Manage Website Data</li>
              <li style={{ marginBottom: '0.25rem' }}>Edge: Settings &gt; Cookies and Site Permissions</li>
            </ul>
          </div>

          {/* Local Storage */}
          <h2 style={sectionHeading}>6. Local Storage</h2>
          <p style={bodyText}>
            Our AI-powered concierge chatbot uses your browser&apos;s localStorage to save conversation history. This data is stored entirely on your device and is <strong>not</strong> transmitted to our servers. Chat history is automatically deleted after 24 hours. You can clear it at any time by:
          </p>
          <ul style={{ ...bodyText, paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Clicking the &quot;Clear Chat&quot; option in the chatbot widget</li>
            <li style={{ marginBottom: '0.5rem' }}>Clearing your browser&apos;s site data for hostizzy.com</li>
          </ul>

          {/* Changes */}
          <h2 style={sectionHeading}>7. Changes to This Policy</h2>
          <p style={bodyText}>
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. The &quot;Last Updated&quot; date at the top of this page indicates when the policy was last revised.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p style={{ ...bodyText, marginTop: '2.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            Hostsphere India Pvt Ltd (brand: Hostizzy) -- E 13/29, 1st Floor, Harsha Bhawan, Connaught Place, New Delhi 110001.
            For questions regarding this policy, contact{' '}
            <a href="mailto:privacy@hostizzy.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              privacy@hostizzy.com
            </a>.
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
