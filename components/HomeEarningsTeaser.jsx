'use client';

// Homepage entry point to the revenue calculator. Three quick choices give
// a live booking-revenue range from the same market data the calculator
// uses, then hand those choices to /calculator so the owner lands on their
// own numbers rather than the defaults.

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';
import { MARKETS, REGIONS, DATA_PERIOD } from '../lib/calculator/markets';
import { PROPERTY_TYPES, nightlyRate, scenarios } from '../lib/calculator/model';

const lakhs = (n) => {
    const v = (n || 0) / 1e5;
    return `₹${v >= 10 ? v.toFixed(0) : v.toFixed(1)}L`;
};
const yearly = (adr, occ) => adr * Math.round((365 * occ) / 100);

const field = {
    width: '100%', padding: '0.8rem 0.9rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0',
    background: 'white', fontSize: '1rem', color: '#1E293B', fontFamily: 'inherit', appearance: 'auto',
};
const label = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#64748B', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' };

export default function HomeEarningsTeaser() {
    const [city, setCity] = useState('Gurugram');
    const [type, setType] = useState('villa');
    const [bedrooms, setBedrooms] = useState(3);

    const r = useMemo(() => {
        const adr = nightlyRate(city, bedrooms, type, 'premium');
        const s = scenarios(city);
        return { adr, s, low: yearly(adr, s.low), typical: yearly(adr, s.typical), strong: yearly(adr, s.strong) };
    }, [city, type, bedrooms]);

    const href = `/calculator?city=${encodeURIComponent(city)}&type=${type}&br=${bedrooms}`;
    const span = r.strong - r.low || 1;
    const pos = (v) => `${((v - r.low) / span) * 100}%`;

    return (
        <section className="section" style={{ background: 'linear-gradient(180deg, #fff 0%, #FFF5F5 100%)' }}>
            <style>{`
                .het-card { display: grid; gap: 2rem; grid-template-columns: 1fr; background: white; border: 1px solid #FBD5D5; border-radius: 1.5rem; padding: clamp(1.5rem, 4vw, 2.75rem); box-shadow: 0 24px 48px -24px rgba(254,88,88,0.25); }
                @media (min-width: 900px) { .het-card { grid-template-columns: 1.05fr 1fr; gap: 3rem; align-items: center; } }
                .het-fields { display: grid; gap: 0.9rem; grid-template-columns: 1fr 1fr; }
                .het-fields .het-city { grid-column: 1 / -1; }
                .het-cta:hover { transform: translateY(-1px); box-shadow: 0 10px 24px -8px rgba(254,88,88,0.6); }
            `}</style>
            <div className="container">
                <div className="het-card">
                    <div>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: '#C0392F', background: '#FFE4E4', padding: '0.35rem 0.75rem', borderRadius: '999px', marginBottom: '1rem' }}>
                            <Calculator size={14} aria-hidden="true" /> Revenue calculator
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 0.75rem' }}>
                            What could your home earn?
                        </h2>
                        <p style={{ color: '#64748B', fontSize: '1.05rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                            Based on what similar homes in 28 Indian markets actually earned ({DATA_PERIOD}). Pick your home and see the range in seconds.
                        </p>
                        <div className="het-fields">
                            <div className="het-city">
                                <label style={label} htmlFor="het-city">Town or city</label>
                                <select id="het-city" style={field} value={city} onChange={(e) => setCity(e.target.value)}>
                                    {REGIONS.map((reg) => (
                                        <optgroup key={reg.key} label={reg.label}>
                                            {Object.entries(MARKETS).filter(([, m]) => m.region === reg.key).map(([name]) => <option key={name} value={name}>{name}</option>)}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={label} htmlFor="het-type">Property</label>
                                <select id="het-type" style={field} value={type} onChange={(e) => setType(e.target.value)}>
                                    {PROPERTY_TYPES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={label} htmlFor="het-br">Bedrooms</label>
                                <select id="het-br" style={field} value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))}>
                                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n === 5 ? '5+' : n}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: '#1E293B', color: 'white', borderRadius: '1.25rem', padding: 'clamp(1.5rem, 3vw, 2.25rem)' }} aria-live="polite">
                        <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.35rem' }}>Bookings in a typical year</div>
                        <div style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 800, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{lakhs(r.typical)}</div>
                        <div style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '0.5rem' }}>
                            About ₹{r.adr.toLocaleString('en-IN')} a night, booked {Math.round((r.s.typical * 30.4) / 100)} nights a month
                        </div>

                        <div style={{ margin: '1.75rem 0 0.5rem', position: 'relative', height: 8, borderRadius: 999, background: 'linear-gradient(90deg, #475569, #FE5858)' }}>
                            <span aria-hidden="true" style={{ position: 'absolute', top: -5, left: pos(r.typical), width: 18, height: 18, marginLeft: -9, borderRadius: 999, background: 'white', border: '3px solid #FE5858' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8' }}>
                            <span>Quiet year {lakhs(r.low)}</span>
                            <span>Strong year {lakhs(r.strong)}</span>
                        </div>

                        <Link href={href} className="het-cta" style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', background: '#FE5858', color: 'white', padding: '0.95rem 1.25rem', borderRadius: '0.9rem', fontWeight: 700, textDecoration: 'none', transition: 'transform 0.15s, box-shadow 0.15s' }}>
                            See what you'd keep after fees <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                        <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '0.75rem 0 0', textAlign: 'center' }}>
                            Before booking-site fees, running costs and our fee. The full calculator breaks it all down.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
