'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

export default function Terms() {
    return (
        <>
            <div className="container section" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
                <ScrollReveal>
                    <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Terms & Conditions</h1>
                    <div style={{ lineHeight: 1.7, color: '#334155' }}>
                        <p style={{ marginBottom: '1.5rem' }}>Last Updated: January 2025</p>

                        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>1. Acceptance of Terms</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            By accessing and using Hostizzy.com, you agree to comply with and be bound by these Terms and Conditions.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>2. Booking & Cancellation</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            All bookings are subject to availability and confirmation. Cancellation policies vary by property and are clearly stated at the time of booking. Hostizzy reserves the right to cancel bookings in unforeseen circumstances, offering a full refund.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>3. User Conduct</h2>
                        <p style={{ marginBottom: '1rem' }}>
                            Guests are expected to respect the property and house rules. Any damage caused during the stay will be charged to the guest's payment method on file.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </>
    );
}
