'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

export default function RefundPolicy() {
  const sectionHeading = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1.5rem',
    marginTop: '2.5rem',
    marginBottom: '1rem',
    color: '#1e293b',
  };

  const subHeading = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1.15rem',
    marginTop: '1.5rem',
    marginBottom: '0.75rem',
    color: '#334155',
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
              Refund &amp; Cancellation Policy
            </h1>
            <p style={{ fontSize: '1.15rem', opacity: 0.85, maxWidth: '650px', margin: '0 auto' }}>
              Transparent policies for guest bookings and property management services.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="container section" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '3rem', paddingBottom: '4rem' }}>
        <ScrollReveal>
          <p style={{ ...bodyText, marginBottom: '0.5rem', fontStyle: 'italic' }}>Last Updated: April 2026</p>
          <p style={bodyText}>
            This policy outlines the refund and cancellation terms for bookings made through Hostizzy-managed properties and for property management services provided by Hostsphere India Pvt Ltd (brand: Hostizzy).
          </p>

          {/* Guest Booking Cancellations */}
          <h2 style={sectionHeading}>1. Guest Booking Cancellations</h2>
          <p style={bodyText}>
            Cancellation policies are set by individual property owners and may vary by property. Hostizzy-managed properties generally follow one of three standard cancellation tiers:
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
              <thead>
                <tr>
                  <th style={tableHeader}>Policy</th>
                  <th style={tableHeader}>Cancellation Terms</th>
                  <th style={tableHeader}>Refund</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>Flexible</td>
                  <td style={tableCell}>Cancel up to 48 hours before check-in</td>
                  <td style={tableCell}>Full refund (minus processing fees)</td>
                </tr>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>Moderate</td>
                  <td style={tableCell}>Cancel up to 7 days before check-in</td>
                  <td style={tableCell}>Full refund. Within 7 days: 50% refund</td>
                </tr>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>Strict</td>
                  <td style={tableCell}>Cancel up to 14 days before check-in</td>
                  <td style={tableCell}>50% refund. Within 14 days: no refund</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={bodyText}>
            The applicable cancellation policy is displayed at the time of booking. Please review it carefully before confirming your reservation. For bookings made through third-party platforms (Airbnb, Booking.com, etc.), the platform&apos;s cancellation policy may supersede the above.
          </p>

          {/* Management Service Cancellation */}
          <h2 style={sectionHeading}>2. Management Service Cancellation</h2>
          <p style={bodyText}>
            Property owners enrolled in Hostizzy management plans may terminate their agreement subject to the following terms:
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
              <thead>
                <tr>
                  <th style={tableHeader}>Plan</th>
                  <th style={tableHeader}>Cancellation Terms</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>SmartStart</td>
                  <td style={tableCell}>One-time setup fee is non-refundable once onboarding has commenced</td>
                </tr>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>ChannelPro</td>
                  <td style={tableCell}>30-day written notice required. Pro-rated refund for unused portion of prepaid months</td>
                </tr>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>Hybrid Core</td>
                  <td style={tableCell}>60-day written notice required. Existing bookings will be honoured through checkout</td>
                </tr>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>TotalCare360</td>
                  <td style={tableCell}>60-day written notice required. Existing bookings will be honoured through checkout</td>
                </tr>
                <tr>
                  <td style={{ ...tableCell, fontWeight: 600 }}>StayPrime</td>
                  <td style={tableCell}>60-day written notice required. Existing bookings will be honoured through checkout. Inventory and consumables reconciliation at exit</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={bodyText}>
            Cancellation requests for management services must be sent in writing to{' '}
            <a href="mailto:partnerships@hostizzy.com" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              partnerships@hostizzy.com
            </a>.
          </p>

          {/* Refund Processing */}
          <h2 style={sectionHeading}>3. Refund Processing</h2>
          <ul style={{ ...bodyText, paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Approved refunds are processed within <strong>7-10 business days</strong></li>
            <li style={{ marginBottom: '0.5rem' }}>Refunds are issued to the original payment method unless otherwise agreed</li>
            <li style={{ marginBottom: '0.5rem' }}>GST adjustments will be made in accordance with applicable tax regulations; credit notes will be issued where required</li>
            <li style={{ marginBottom: '0.5rem' }}>Payment gateway processing fees (typically 2-3%) are non-refundable</li>
            <li style={{ marginBottom: '0.5rem' }}>International refunds may take an additional 5-7 business days depending on the issuing bank</li>
          </ul>

          {/* Force Majeure */}
          <h2 style={sectionHeading}>4. Force Majeure</h2>
          <p style={bodyText}>
            In the event of circumstances beyond reasonable control -- including but not limited to natural disasters, government-imposed travel restrictions, pandemics, civil unrest, or severe weather events -- the following applies:
          </p>
          <ul style={{ ...bodyText, paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Guests will be offered a full refund or the option to reschedule at no additional cost</li>
            <li style={{ marginBottom: '0.5rem' }}>Property owners will not be charged management fees for the affected period</li>
            <li style={{ marginBottom: '0.5rem' }}>Force majeure claims must be supported by verifiable evidence (government advisory, weather alert, etc.)</li>
          </ul>

          {/* Disputes */}
          <h2 style={sectionHeading}>5. Disputes &amp; Grievance Resolution</h2>
          <p style={bodyText}>
            If you believe a refund has been incorrectly denied or processed, please contact us within <strong>7 days</strong> of receiving the decision:
          </p>
          <ul style={{ ...bodyText, paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Guest booking disputes:</strong>{' '}
              <a href="mailto:stay@hostizzy.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>stay@hostizzy.com</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Management service disputes:</strong>{' '}
              <a href="mailto:partnerships@hostizzy.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>partnerships@hostizzy.com</a>
            </li>
          </ul>
          <p style={bodyText}>
            We aim to acknowledge all disputes within 48 hours and resolve them within 15 business days. If a resolution cannot be reached, the matter will be subject to arbitration in accordance with the Arbitration and Conciliation Act, 1996, with New Delhi as the seat of arbitration.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p style={{ ...bodyText, marginTop: '2.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            Hostsphere India Pvt Ltd (brand: Hostizzy) -- E 13/29, 1st Floor, Harsha Bhawan, Connaught Place, New Delhi 110001.
            For questions regarding this policy, contact{' '}
            <a href="mailto:stay@hostizzy.com" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              stay@hostizzy.com
            </a>.
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
