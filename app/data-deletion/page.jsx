'use client';

import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from '../../components/ScrollReveal';

const DATA_TYPES = [
  { id: 'website', label: 'Website account & contact form submissions' },
  { id: 'hostos', label: 'HostOS property management data' },
  { id: 'resiq', label: 'ResIQ owner portal data' },
  { id: 'booking', label: 'Booking platform & reservation data' },
  { id: 'whatsapp', label: 'WhatsApp messages & chat logs' },
  { id: 'all', label: 'All data associated with my account' },
];

export default function DataDeletion() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState('idle');
  const [honeypot, setHoneypot] = useState('');
  const formLoadedAt = useRef(Date.now());

  const toggleType = (id) => {
    if (id === 'all') {
      setSelected(selected.includes('all') ? [] : ['all']);
      return;
    }
    const without = selected.filter((s) => s !== 'all' && s !== id);
    if (selected.includes(id)) {
      setSelected(without);
    } else {
      setSelected([...without, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || selected.length === 0) return;

    setStatus('sending');
    const labels = selected.map((id) => DATA_TYPES.find((d) => d.id === id)?.label || id);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: `Data Deletion Request: ${labels.join(', ')}`,
          department: 'privacy',
          departmentEmail: 'privacy@hostizzy.com',
          subject: 'Data Deletion Request',
          _hp_website: honeypot,
          _formLoadedAt: formLoadedAt.current,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setSelected([]);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

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
              Data Deletion Request
            </h1>
            <p style={{ fontSize: '1.15rem', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>
              Your privacy matters. Request the deletion of your personal data from Hostizzy services.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="container section" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '3rem', paddingBottom: '4rem' }}>
        <ScrollReveal>
          <p style={{ ...bodyText, marginBottom: '0.5rem', fontStyle: 'italic' }}>Last Updated: April 2026</p>

          <h2 style={sectionHeading}>What Data We Hold</h2>
          <p style={bodyText}>
            Depending on how you have interacted with Hostizzy, we may hold the following categories of personal data:
          </p>
          <ul style={{ ...bodyText, paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Account & contact information</strong> -- name, email, phone number submitted via our website forms</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Property management data</strong> -- property details, revenue reports, and owner portal (ResIQ) records</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Booking & reservation data</strong> -- guest booking history, payment records processed through our platform</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Communication logs</strong> -- WhatsApp messages, AI chatbot conversations, and email correspondence</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Technical data</strong> -- browser cookies, analytics identifiers, and chat session storage</li>
          </ul>

          <h2 style={sectionHeading}>How to Request Deletion</h2>
          <p style={bodyText}>
            Use the form below to submit a data deletion request. Please provide the email address associated with your Hostizzy account or interactions, and select which categories of data you would like deleted.
          </p>
          <p style={bodyText}>
            Alternatively, you can email us directly at{' '}
            <a href="mailto:privacy@hostizzy.com" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              privacy@hostizzy.com
            </a>{' '}
            with the subject line &quot;Data Deletion Request.&quot;
          </p>

          <h2 style={sectionHeading}>What Happens After You Submit</h2>
          <p style={bodyText}>
            Once we receive your request, our team will verify your identity and process the deletion within <strong>30 business days</strong>. You will receive a confirmation email once the deletion is complete. During this period, your data may still be retained in encrypted backups which are purged on a rolling 90-day cycle.
          </p>

          <h2 style={sectionHeading}>Data We Are Required to Retain</h2>
          <p style={bodyText}>
            Certain data may be retained where required by law or legitimate business obligation, including:
          </p>
          <ul style={{ ...bodyText, paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Financial transaction records (as required under the Income Tax Act, 1961 and GST regulations) -- retained for a minimum of 8 years</li>
            <li style={{ marginBottom: '0.5rem' }}>Guest identity verification records (as required under local police and tourism regulations)</li>
            <li style={{ marginBottom: '0.5rem' }}>Active contractual obligations -- data related to ongoing management agreements cannot be deleted until the contract is terminated</li>
          </ul>
          <p style={bodyText}>
            In such cases, we will inform you of the specific data retained and the legal basis for retention.
          </p>
        </ScrollReveal>

        {/* Deletion Request Form */}
        <ScrollReveal delay={0.1}>
          <div
            style={{
              marginTop: '3rem',
              padding: '2.5rem',
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
            }}
          >
            <h2 style={{ ...sectionHeading, marginTop: 0 }}>Submit a Deletion Request</h2>

            {status === 'success' ? (
              <div
                style={{
                  padding: '1.5rem',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '0.75rem',
                  color: '#166534',
                  lineHeight: 1.7,
                }}
              >
                <strong>Request submitted successfully.</strong> Our team will review your request and respond within 30 business days. A confirmation has been sent to your email.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Honeypot — hidden from real users, bots fill it */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                  <input type="text" name="website_url" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your full name"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email associated with your Hostizzy account"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#1e293b' }}>
                    Data to Delete *
                  </label>
                  {DATA_TYPES.map((type) => (
                    <label
                      key={type.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 0',
                        cursor: 'pointer',
                        color: '#475569',
                        fontSize: '0.95rem',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(type.id)}
                        onChange={() => toggleType(type.id)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>

                {status === 'error' && (
                  <div
                    style={{
                      padding: '1rem',
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '0.5rem',
                      color: '#991b1b',
                      marginBottom: '1rem',
                      fontSize: '0.95rem',
                    }}
                  >
                    Something went wrong. Please try again or email us at privacy@hostizzy.com.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || !name || !email || selected.length === 0}
                  style={{
                    background: status === 'sending' ? '#94a3b8' : 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.85rem 2.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  {status === 'sending' ? 'Submitting...' : 'Submit Deletion Request'}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
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
