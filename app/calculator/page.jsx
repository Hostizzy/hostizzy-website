'use client';

// Revenue calculator for property owners.
//
// Built on public market data (lib/calculator/markets.js) and Hostizzy's
// published plan terms (lib/calculator/model.js). It shows a range (low /
// typical / strong) rather than one number, says where every figure comes
// from, and lets the owner edit the assumptions that matter most.

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowRight, Check, Info, MapPin, MessageCircle } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal';
import { MARKETS, REGIONS, SOURCES, DATA_PERIOD, DATA_CHECKED } from '../../lib/calculator/markets';
import {
    PROPERTY_TYPES, FINISH_LEVELS, ASSUMPTIONS, defaultCosts, estimate, eligiblePlans,
} from '../../lib/calculator/model';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const inr = (n) => '₹' + Math.round(n || 0).toLocaleString('en-IN');
const lakh = (n) => {
    const v = (n || 0) / 1e5;
    return '₹' + (Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2)) + 'L';
};

const card = { background: 'white', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: 'clamp(1.25rem, 3vw, 2rem)' };
const label = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' };
const chip = (active) => ({
    padding: '0.55rem 0.95rem', borderRadius: '999px', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer',
    border: active ? '1.5px solid var(--color-primary)' : '1px solid #cbd5e1',
    background: active ? 'rgba(254,88,88,0.08)' : 'white',
    color: active ? 'var(--color-primary-text, #c53030)' : '#334155',
});
const input = { width: '100%', padding: '0.7rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: '0.6rem', fontSize: '1rem', background: 'white' };

export default function Calculator() {
    const [regionKey, setRegionKey] = useState('ncr');
    const [city, setCity] = useState('Gurugram');
    const [propertyType, setPropertyType] = useState('villa');
    const [bedrooms, setBedrooms] = useState(3);
    const [finish, setFinish] = useState('premium');
    const [planKey, setPlanKey] = useState('totalcare');
    const [costOverride, setCostOverride] = useState(null);
    const [currentEarnings, setCurrentEarnings] = useState('');

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [leadState, setLeadState] = useState('idle');

    const costs = costOverride || defaultCosts(propertyType, bedrooms);
    const plans = eligiblePlans(city, propertyType);
    const activePlanKey = plans.some((p) => p.key === planKey) ? planKey : plans[plans.length - 1].key;

    const est = useMemo(
        () => estimate({ city, bedrooms, propertyType, finish, planKey: activePlanKey, costs }),
        [city, bedrooms, propertyType, finish, activePlanKey, costs.perNight, costs.monthly] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const citiesInRegion = Object.entries(MARKETS).filter(([, m]) => m.region === regionKey).map(([name]) => name);
    const current = parseInt(String(currentEarnings).replace(/[^\d]/g, ''), 10) || 0;

    const pickRegion = (key) => {
        setRegionKey(key);
        setCity(Object.entries(MARKETS).find(([, m]) => m.region === key)[0]);
    };
    const changeProperty = (fn) => { fn(); setCostOverride(null); };

    const submitLead = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLeadState('sending');
        try {
            const res = await fetch('/api/calculator-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email, phone, city, propertyType, bedrooms, finishes: finish, plan: est.plan.name,
                    nightlyRate: est.adr,
                    occupancy: est.occ.typical,
                    revenue: est.typical.gross,
                    netIncome: est.typical.owner,
                }),
            });
            setLeadState(res.ok ? 'sent' : 'error');
        } catch {
            setLeadState('error');
        }
    };

    const breakdown = est && [
        { name: 'You keep', value: est.typical.owner, color: '#10b981' },
        { name: 'Hostizzy fee', value: est.typical.fee, color: '#FE5858' },
        { name: 'Running costs you pay', value: est.typical.ownerCosts, color: '#f59e0b' },
        { name: 'OTA & payment fees', value: est.typical.otaFees, color: '#94a3b8' },
    ].filter((b) => b.value > 0);

    return (
        <>
            {/* Hero */}
            <section style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)', padding: 'calc(var(--header-height) + 3rem) 0 3.5rem' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '760px' }}>
                    <ScrollReveal>
                        <p style={{ display: 'inline-block', padding: '0.35rem 0.9rem', borderRadius: '999px', background: 'rgba(16,185,129,0.15)', color: '#6ee7b7', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                            Based on real market data · {DATA_PERIOD}
                        </p>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.1rem)', fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: '1rem' }}>
                            What could your property really earn?
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                            Honest ranges for {Object.keys(MARKETS).length} Indian holiday markets, built from what similar homes actually earned in the last 12 months, with every fee and cost shown.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Inputs */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container" style={{ maxWidth: '960px', display: 'grid', gap: '1.5rem' }}>
                    <div style={card}>
                        <span style={label}><MapPin size={14} style={{ verticalAlign: '-2px' }} /> Where is the property?</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                            {REGIONS.map((r) => (
                                <button key={r.key} type="button" onClick={() => pickRegion(r.key)} style={chip(regionKey === r.key)}>{r.label}</button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {citiesInRegion.map((c) => (
                                <button key={c} type="button" onClick={() => setCity(c)} style={chip(city === c)}>{c}</button>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '1rem 0 0' }}>
                            City not listed? <Link href="/contact" style={{ color: 'var(--color-primary)' }}>Ask us for a property-specific estimate</Link>.
                        </p>
                    </div>

                    <div style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <span style={label}>Property type</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {PROPERTY_TYPES.map((t) => (
                                    <button key={t.key} type="button" onClick={() => changeProperty(() => setPropertyType(t.key))} style={chip(propertyType === t.key)}>{t.label}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span style={label}>Bedrooms</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {[1, 2, 3, 4, 5].map((b) => (
                                    <button key={b} type="button" onClick={() => changeProperty(() => setBedrooms(b))} style={chip(bedrooms === b)}>{b === 5 ? '5+' : b}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span style={label}>Finish</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {FINISH_LEVELS.map((f) => (
                                    <button key={f.key} type="button" onClick={() => setFinish(f.key)} style={chip(finish === f.key)}>{f.label}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={card}>
                        <span style={label}>Plan</span>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                            {plans.map((p) => (
                                <button key={p.key} type="button" onClick={() => setPlanKey(p.key)} style={{ ...chip(activePlanKey === p.key), borderRadius: '0.75rem', textAlign: 'left', padding: '0.9rem 1rem' }}>
                                    <span style={{ display: 'block', fontWeight: 700 }}>{p.name}</span>
                                    <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#64748b', marginTop: '0.2rem' }}>{p.price}</span>
                                </button>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0.9rem 0 0' }}>{est.plan.summary}</p>
                        {plans.length < 5 && (
                            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.4rem 0 0' }}>
                                {!plans.some((p) => p.fullManagement) && 'Full management is available in Delhi NCR, the hills, Rajasthan and the North East; elsewhere we co-host remotely. '}
                                {plans.some((p) => p.fullManagement) && propertyType !== 'apartment' && 'StayPrime is for apartments only.'}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Results */}
            {est && (
                <section className="section" style={{ paddingTop: 0, background: '#f8fafc' }}>
                    <div className="container" style={{ maxWidth: '960px', display: 'grid', gap: '1.5rem' }}>
                        {/* Headline range */}
                        <div style={{ ...card, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: 'none', color: 'white' }}>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
                                {bedrooms === 5 ? '5+' : bedrooms}-bedroom {PROPERTY_TYPES.find((t) => t.key === propertyType).label.toLowerCase()} in {city} on {est.plan.name}: what you keep each year
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
                                {[['Low', est.low, est.occ.low], ['Typical', est.typical, est.occ.typical], ['Strong', est.strong, est.occ.strong]].map(([name, r, o]) => (
                                    <div key={name} style={{ padding: '1rem', borderRadius: '0.75rem', background: name === 'Typical' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)', border: name === 'Typical' ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.08)' }}>
                                        <div style={{ fontSize: '0.8rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{name} · {o}% booked</div>
                                        <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: r.owner < 0 ? '#fca5a5' : name === 'Typical' ? '#6ee7b7' : 'white', margin: '0.3rem 0' }}>{lakh(r.owner)}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{inr(r.owner / 12)} a month · {lakh(r.gross)} bookings</div>
                                    </div>
                                ))}
                            </div>
                            <p style={{ margin: '1.25rem 0 0', fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                                Nightly rate {inr(est.adr)} (city median for this size{est.market.basis === 'city' || est.market.est?.includes(bedrooms - 1) ? ', estimated from the city average' : ''}). Busiest month {est.market.peak}, quietest {est.market.low}.
                            </p>
                        </div>

                        {/* Breakdown + monthly */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            <div style={card}>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1rem' }}>Where a typical year's bookings go</h2>
                                <div style={{ display: 'flex', height: '14px', borderRadius: '999px', overflow: 'hidden', marginBottom: '1rem' }}>
                                    {breakdown.map((b) => <div key={b.name} style={{ width: `${(b.value / est.typical.gross) * 100}%`, background: b.color }} />)}
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.6rem' }}>
                                    <li style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}><span>Bookings ({est.typical.nights} nights)</span><span>{inr(est.typical.gross)}</span></li>
                                    {breakdown.map((b) => (
                                        <li key={b.name} style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.95rem' }}>
                                            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: b.color, marginRight: 8 }} />{b.name}</span>
                                            <span>{inr(b.value)}</span>
                                        </li>
                                    ))}
                                </ul>
                                {!est.plan.ownerPaysCosts && <p style={{ fontSize: '0.85rem', color: '#059669', margin: '1rem 0 0' }}>On StayPrime, Hostizzy pays the running costs ({inr(est.typical.runningCosts)} a year) out of its share.</p>}
                            </div>
                            <div style={card}>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1rem' }}>Bookings by month, typical year</h2>
                                <div style={{ height: 220 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={est.monthly.map((v, i) => ({ m: MONTHS[i], v }))} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                                            <CartesianGrid vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="m" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                            <YAxis tickFormatter={(v) => (v / 1000).toFixed(0) + 'k'} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                            <Tooltip formatter={(v) => inr(v)} cursor={{ fill: 'rgba(148,163,184,0.15)' }} />
                                            <Bar dataKey="v" fill="#FE5858" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.75rem 0 0' }}>Shape follows the reported peak and quiet months for {est.region.label}.</p>
                            </div>
                        </div>

                        {/* Plan comparison */}
                        <div style={card}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.4rem' }}>Every plan, side by side</h2>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1rem' }}>
                                At the same {est.occ.typical}% occupancy, running it yourself always keeps the most. A managed plan earns its fee by filling more nights and pricing better. The last column shows how far occupancy has to rise for each plan to beat doing it yourself.
                            </p>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem', minWidth: '520px' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                            <th style={{ padding: '0.5rem' }}>Plan</th>
                                            <th style={{ padding: '0.5rem' }}>Who runs the property</th>
                                            <th style={{ padding: '0.5rem', textAlign: 'right' }}>You keep / yr</th>
                                            <th style={{ padding: '0.5rem', textAlign: 'right' }}>Beats self-managing at</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {est.comparison.map(({ plan, result, breakEven }) => (
                                            <tr key={plan.key} style={{ borderTop: '1px solid #e2e8f0', background: plan.key === est.plan.key ? 'rgba(254,88,88,0.05)' : 'transparent' }}>
                                                <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700 }}>{plan.name}<div style={{ fontWeight: 400, fontSize: '0.8rem', color: '#64748b' }}>{plan.price}</div></td>
                                                <td style={{ padding: '0.65rem 0.5rem', color: '#475569' }}>{plan.fullManagement ? 'Hostizzy runs everything' : plan.key === 'smartstart' ? 'You run everything' : 'You; we handle bookings'}</td>
                                                <td style={{ padding: '0.65rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>{lakh(result.owner)}</td>
                                                <td style={{ padding: '0.65rem 0.5rem', textAlign: 'right', color: '#475569' }}>
                                                    {plan.key === 'smartstart' ? 'baseline' : breakEven == null ? 'n/a' : breakEven <= est.occ.typical ? 'already ahead' : `${breakEven}% booked`}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.9rem 0 0' }}>
                                Well-run full-time listings in {city} can reach about {est.occ.strong}%. Running it yourself also costs your time: pricing, messages, check-ins and staff.
                            </p>
                        </div>

                        {/* Edit assumptions */}
                        <div style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Make it yours</h2>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.3rem 0 0' }}>Running costs are our estimate for this size of property. Change them to match yours.</p>
                            </div>
                            <label>
                                <span style={label}>Cost per booked night (₹)</span>
                                <input type="number" min="0" step="100" value={costs.perNight} onChange={(e) => setCostOverride({ ...costs, perNight: Math.max(0, +e.target.value || 0) })} style={input} />
                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Cleaning, laundry, amenities, electricity</span>
                            </label>
                            <label>
                                <span style={label}>Fixed cost per month (₹)</span>
                                <input type="number" min="0" step="1000" value={costs.monthly} onChange={(e) => setCostOverride({ ...costs, monthly: Math.max(0, +e.target.value || 0) })} style={input} />
                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Caretaker, maintenance, internet</span>
                            </label>
                            <label>
                                <span style={label}>What you earn today per month (₹)</span>
                                <input inputMode="numeric" placeholder="Optional" value={currentEarnings} onChange={(e) => setCurrentEarnings(e.target.value)} style={input} />
                                {current > 0 && (
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: est.typical.owner / 12 >= current ? '#059669' : '#b45309' }}>
                                        Typical case on {est.plan.name}: {est.typical.owner / 12 >= current ? '+' : '−'}{inr(Math.abs(est.typical.owner / 12 - current))} a month vs today
                                    </span>
                                )}
                            </label>
                        </div>

                        {/* Lead capture */}
                        <div style={{ ...card, background: 'linear-gradient(135deg, #fff1f1 0%, #fff 100%)', border: '1px solid #fecaca' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.4rem' }}>Get an estimate for your actual property</h2>
                            <p style={{ color: '#475569', margin: '0 0 1.25rem', maxWidth: '620px' }}>
                                City averages can't see your view, your pool or your reviews. Share your details and our revenue team will send a property-specific forecast within 24 hours.
                            </p>
                            {leadState === 'sent' ? (
                                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontWeight: 600, margin: 0 }}><Check size={18} /> Thanks, we'll be in touch within 24 hours.</p>
                            ) : (
                                <form onSubmit={submitLead} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                                    <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} aria-label="Email" />
                                    <input type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} style={input} aria-label="Phone" />
                                    <button type="submit" className="btn btn-gradient" disabled={leadState === 'sending'} style={{ justifyContent: 'center' }}>
                                        {leadState === 'sending' ? 'Sending…' : 'Send my forecast'} <ArrowRight size={18} style={{ marginLeft: 6 }} />
                                    </button>
                                    {leadState === 'error' && <p style={{ gridColumn: '1 / -1', color: '#b91c1c', margin: 0, fontSize: '0.9rem' }}>Something went wrong. Please try again or <Link href="/contact">contact us</Link>.</p>}
                                </form>
                            )}
                        </div>

                        {/* Method */}
                        <details style={card}>
                            <summary style={{ cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Info size={16} /> How we calculated this</summary>
                            <ul style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem', margin: '1rem 0' }}>
                                {ASSUMPTIONS.map((a) => <li key={a}>{a}</li>)}
                                <li>Holiday-rental supply in India grew 30–100% in the last year while revenue per listing fell in most markets, so treat past results as a guide, not a promise.</li>
                            </ul>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                                Sources (checked {DATA_CHECKED}):{' '}
                                {SOURCES.map((s, i) => (
                                    <span key={s.url}>{i > 0 && '; '}<a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>{s.name}</a> ({s.period})</span>
                                ))}.
                                {' '}Estimates are indicative and not a guarantee of earnings.
                            </p>
                        </details>

                        <div style={{ textAlign: 'center', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/services" className="btn btn-outline">Compare plans in detail</Link>
                            <a href="https://wa.me/919560493335?text=Hi%20Hostizzy%2C%20I%20used%20the%20revenue%20calculator%20and%20would%20like%20to%20talk." target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                                <MessageCircle size={18} /> WhatsApp us
                            </a>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
