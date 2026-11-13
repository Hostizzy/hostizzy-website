import React from 'react';
import { STAY_CITIES, STAY_COLLECTIONS, BOOKING_SITE } from '../lib/bookingLinks';

// Guest-facing "Stay with Hostizzy" link block. Secondary to the owner pitch:
// it sits low on the home page and in the footer. Plain <a href> links so
// crawlers follow them into book.hostizzy.com's city and collection pages.
//
// variant="section" — full block for the home page (light background)
// variant="footer"  — compact columns for the dark footer

const StayWithHostizzy = ({ variant = 'section' }) => {
    if (variant === 'footer') {
        const listStyle = { listStyle: 'none', padding: 0, margin: 0, opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' };
        const headStyle = { fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, margin: '0 0 0.75rem', fontWeight: 600 };
        return (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', marginBottom: '2.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#f8fafc' }}>Stay with Hostizzy</h4>
                <p style={{ opacity: 0.7, fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
                    Planning a trip rather than listing a home? Book our managed villas and farmstays directly.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                    <div>
                        <p style={headStyle}>By destination</p>
                        <ul style={listStyle}>
                            {STAY_CITIES.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
                        </ul>
                    </div>
                    <div>
                        <p style={headStyle}>By occasion</p>
                        <ul style={listStyle}>
                            {STAY_COLLECTIONS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    const chip = {
        display: 'inline-block',
        padding: '0.55rem 1rem',
        borderRadius: '999px',
        background: 'white',
        border: '1px solid #bae6fd',
        color: '#0c4a6e',
        fontSize: '0.95rem',
        fontWeight: 500,
        textDecoration: 'none',
    };
    const listStyle = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0.6rem' };
    const headStyle = { fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0369a1', fontWeight: 700, margin: '0 0 0.75rem' };

    return (
        <div style={{
            padding: 'clamp(1.75rem, 4vw, 3rem)',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            border: '1px solid #bae6fd',
        }}>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.75rem', color: '#0369a1' }}>Stay with Hostizzy</h3>
            <p style={{ color: '#334155', lineHeight: 1.6, maxWidth: '640px', margin: '0 0 2rem' }}>
                Looking for a getaway rather than a management partner? Book the villas, farmhouses and hill homes we manage — directly, on our booking site.
            </p>
            <div style={{ display: 'grid', gap: '1.75rem' }}>
                <div>
                    <p style={headStyle}>By destination</p>
                    <ul style={listStyle}>
                        {STAY_CITIES.map((l) => <li key={l.href}><a href={l.href} style={chip}>{l.label}</a></li>)}
                    </ul>
                </div>
                <div>
                    <p style={headStyle}>By occasion</p>
                    <ul style={listStyle}>
                        {STAY_COLLECTIONS.map((l) => <li key={l.href}><a href={l.href} style={chip}>{l.label}</a></li>)}
                    </ul>
                </div>
            </div>
            <p style={{ margin: '2rem 0 0', fontSize: '0.95rem' }}>
                <a href={`${BOOKING_SITE}/stays`} style={{ color: '#0284c7', fontWeight: 600 }}>Browse all Hostizzy stays &rarr;</a>
            </p>
        </div>
    );
};

export default StayWithHostizzy;
