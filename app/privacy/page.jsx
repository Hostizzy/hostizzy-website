'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

export default function Privacy() {
    return (
        <>
            <div className="container section" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
                <ScrollReveal>
                    <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Privacy Policy</h1>
                    <div style={{ lineHeight: 1.7, color: '#334155' }}>
                        <p style={{ marginBottom: '1.5rem' }}>Last Updated: January 2025</p>

                        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>1. Information We Collect</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            We collect information you provide directly to us when you book a stay, request property management services, or contact our support team. This includes your name, email address, phone number, and payment information.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>2. How We Use Your Information</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            We use your information to facilitate bookings, communicate with you regarding your stay, and improve our platform's services. We do not sell your personal data to third parties.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>3. Data Security</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>4. Contact Us</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@hostizzy.com" style={{ color: 'var(--color-primary)' }}>privacy@hostizzy.com</a>.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </>
    );
}
