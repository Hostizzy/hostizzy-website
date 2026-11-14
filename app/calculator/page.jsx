'use client';

// Revenue calculator for property owners.
//
// Built on public market data (lib/calculator/markets.js) and Hostizzy's
// published plan terms (lib/calculator/model.js). Four plain questions on
// the left, a live answer on the right: what you'd keep, and where every
// ₹100 a guest pays ends up. Sliders start at the city's typical figures
// and show the low / typical / strong marks so owners can see the range.

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Check, Info, MessageCircle } from 'lucide-react';
import { MARKETS, REGIONS, SOURCES, DATA_PERIOD, DATA_CHECKED } from '../../lib/calculator/markets';
import {
    PROPERTY_TYPES, FINISH_LEVELS, ASSUMPTIONS, defaultCosts, eligiblePlans,
    nightlyRate, scenarios, planResult, breakEvenOccupancy,
} from '../../lib/calculator/model';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const C = {
    ink: '#1E293B', muted: '#64748B', line: '#E2E8F0', surface: '#F8FAFC',
    coral: '#FE5858', coralText: '#C0392F', keep: '#0E9F6E', cost: '#D97706', ota: '#94A3B8',
};

const inr = (n) => '₹' + Math.round(n || 0).toLocaleString('en-IN');
const lakhs = (n) => {
    const v = (n || 0) / 1e5;
    return `₹${Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2)} lakh`;
};
const nightsPerMonth = (occ) => Math.round((occ * 30.4) / 100);

// Eases a displayed number towards its new value after a change.
function useTween(value, ms = 450) {
    const [shown, setShown] = useState(value);
    const from = useRef(value);
    useEffect(() => {
        const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        if (reduce) { setShown(value); from.current = value; return; }
        const start = performance.now();
        const a = from.current;
        let raf;
        const step = (t) => {
            const k = Math.min(1, (t - start) / ms);
            const v = a + (value - a) * (1 - Math.pow(1 - k, 3));
            setShown(v);
            if (k < 1) raf = requestAnimationFrame(step);
            else from.current = value;
        };
        raf = requestAnimationFrame(step);
        return () => { cancelAnimationFrame(raf); from.current = value; };
    }, [value, ms]);
    return shown;
}

const Step = ({ n, title, hint, children }) => (
    <section style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0 1rem', padding: '1.75rem 0', borderTop: `1px solid ${C.line}` }}>
        <span aria-hidden="true" style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: `1.5px solid ${C.coral}`, color: C.coralText, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '0.9rem' }}>{n}</span>
        <div>
            <h2 className="calc-step-title" style={{ color: C.ink, margin: '0.15rem 0 0.25rem' }}>{title}</h2>
            {hint && <p style={{ margin: '0 0 1rem', color: C.muted, fontSize: '0.92rem' }}>{hint}</p>}
            {!hint && <div style={{ height: '0.75rem' }} />}
            {children}
        </div>
    </section>
);

const Pill = ({ active, onClick, children }) => (
    <button type="button" onClick={onClick} aria-pressed={active} className="calc-pill" style={{
        padding: '0.5rem 0.95rem', borderRadius: '999px', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer',
        border: `1.5px solid ${active ? C.coral : C.line}`, background: active ? '#FFF1F1' : 'white', color: active ? C.coralText : C.ink,
    }}>{children}</button>
);

const Row = ({ label, children }) => (
    <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.88rem', color: C.muted, marginBottom: '0.5rem' }}>{label}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>{children}</div>
    </div>
);

// A range slider with labelled market marks underneath.
const Slider = ({ id, label, value, display, min, max, step, onChange, marks }) => (
    <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
            <label htmlFor={id} style={{ fontSize: '0.92rem', color: C.ink, fontWeight: 600 }}>{label}</label>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: C.ink, fontVariantNumeric: 'tabular-nums' }}>{display}</span>
        </div>
        <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="calc-range" style={{ width: '100%', accentColor: C.coral, margin: '0.6rem 0 0' }} />
        <div style={{ position: 'relative', height: '2.4rem' }}>
            {marks.map((m, i) => {
                const left = ((m.value - min) / (max - min)) * 100;
                // Close marks would overlap, so every other label sits a line lower.
                const crowded = i > 0 && Math.abs(m.value - marks[i - 1].value) / (max - min) < 0.12;
                return (
                    <button key={m.label} type="button" onClick={() => onChange(m.value)} title={`Set to ${m.label.toLowerCase()}`} style={{
                        position: 'absolute', left: `${left}%`, transform: 'translateX(-50%)', top: crowded && i % 2 === 1 ? '1rem' : 0, background: 'none', border: 'none', padding: '0.15rem 0.25rem', cursor: 'pointer',
                        fontSize: '0.75rem', color: m.value === value ? C.coralText : C.muted, fontWeight: m.value === value ? 700 : 500, textAlign: 'center', lineHeight: 1.25, whiteSpace: 'nowrap',
                    }}>
                        <span aria-hidden="true" style={{ display: 'block', width: 1, height: 6, background: 'currentColor', margin: '0 auto 2px' }} />
                        {m.label}
                    </button>
                );
            })}
        </div>
    </div>
);

export default function Calculator() {
    const [regionKey, setRegionKey] = useState('ncr');
    const [city, setCity] = useState('Gurugram');
    const [propertyType, setPropertyType] = useState('villa');
    const [bedrooms, setBedrooms] = useState(3);
    const [finish, setFinish] = useState('premium');
    const [planKey, setPlanKey] = useState('totalcare');
    const [occOverride, setOccOverride] = useState(null);
    const [adrOverride, setAdrOverride] = useState(null);
    const [costOverride, setCostOverride] = useState(null);
    const [currentEarnings, setCurrentEarnings] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [leadState, setLeadState] = useState('idle');

    // Start from the homepage widget's choices: ?city=&type=&br=
    useEffect(() => {
        const q = new URLSearchParams(window.location.search);
        const c = q.get('city');
        if (c && MARKETS[c]) { setCity(c); setRegionKey(MARKETS[c].region); }
        const t = q.get('type');
        if (t && PROPERTY_TYPES.some((p) => p.key === t)) setPropertyType(t);
        const b = Number(q.get('br'));
        if (b >= 1 && b <= 5) setBedrooms(b);
    }, []);

    // Any change to the home resets the sliders to that market's figures.
    const reset = () => { setOccOverride(null); setAdrOverride(null); setCostOverride(null); };
    const pickRegion = (key) => { setRegionKey(key); setCity(Object.entries(MARKETS).find(([, m]) => m.region === key)[0]); reset(); };

    const market = MARKETS[city];
    const region = REGIONS.find((r) => r.key === market.region);
    const occ = scenarios(city);
    const marketRate = nightlyRate(city, bedrooms, propertyType, finish);
    const adr = adrOverride ?? marketRate;
    const occupancy = occOverride ?? occ.typical;
    // Costs follow the market rate, not the price slider, so dragging the
    // price doesn't quietly change the running costs too.
    const costs = costOverride || defaultCosts(propertyType, marketRate, occ.typical);
    const plans = eligiblePlans(city, propertyType);
    const plan = plans.find((p) => p.key === planKey) || plans[plans.length - 1];

    const result = useMemo(() => planResult(plan, { adr, occupancy, costs }), [plan, adr, occupancy, costs]);
    const comparison = useMemo(() => plans.map((p) => ({
        plan: p,
        result: planResult(p, { adr, occupancy, costs }),
        breakEven: breakEvenOccupancy(p, { adr, baseOcc: occupancy, costs }),
    })), [plans, adr, occupancy, costs]);
    const bestKeep = Math.max(...comparison.map((c) => c.result.owner), 1);

    const seasonSum = region.season.reduce((a, b) => a + b, 0);
    const monthly = region.season.map((s, i) => ({ m: MONTHS[i], v: Math.round((result.gross * s) / seasonSum) }));
    const peakIdx = region.season.indexOf(Math.max(...region.season));

    const shownYear = useTween(result.owner);
    const g = result.gross || 1;
    const split = [
        { key: 'keep', label: 'You keep', value: result.owner, color: C.keep },
        { key: 'fee', label: 'Hostizzy', value: result.fee, color: C.coral },
        { key: 'cost', label: 'Running costs', value: result.ownerCosts, color: C.cost },
        { key: 'ota', label: 'Booking sites & payments', value: result.otaFees, color: C.ota },
    ].filter((s) => s.value > 0);
    const per100 = (v) => Math.round((v / g) * 100);

    const citiesInRegion = Object.entries(MARKETS).filter(([, m]) => m.region === regionKey).map(([name]) => name);
    const current = parseInt(String(currentEarnings).replace(/[^\d]/g, ''), 10) || 0;
    const typeLabel = PROPERTY_TYPES.find((t) => t.key === propertyType).label.toLowerCase();
    const rateMin = Math.max(1000, Math.round((marketRate * 0.4) / 500) * 500);
    const rateMax = Math.round((marketRate * 2.5) / 500) * 500;

    const submitLead = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLeadState('sending');
        try {
            const res = await fetch('/api/calculator-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email, phone, city, propertyType, bedrooms, finishes: finish, plan: plan.name,
                    nightlyRate: adr, occupancy, revenue: result.gross, netIncome: result.owner,
                }),
            });
            setLeadState(res.ok ? 'sent' : 'error');
        } catch {
            setLeadState('error');
        }
    };

    const resultPanel = (
        <div id="calc-result" style={{ background: 'white', border: `1px solid ${C.line}`, borderRadius: '1.25rem', padding: 'clamp(1.25rem, 3vw, 1.75rem)', boxShadow: 'var(--shadow-premium)' }}>
            <p style={{ margin: 0, color: C.muted, fontSize: '0.95rem' }}>
                Your {bedrooms === 5 ? '5+' : bedrooms}-bedroom {typeLabel} in {city} on {plan.name}
            </p>
            <p style={{ margin: '0.75rem 0 0', color: C.ink, fontSize: '1rem' }}>You'd keep about</p>
            <p aria-live="polite" style={{ margin: '0.1rem 0 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, color: result.owner < 0 ? '#B91C1C' : C.ink, fontVariantNumeric: 'tabular-nums' }}>
                {lakhs(shownYear)}
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 500, color: C.muted }}> a year</span>
            </p>
            <p style={{ margin: '0.35rem 0 0', color: C.muted }}>
                {inr(result.owner / 12)} a month on average, from {result.nights} booked nights ({nightsPerMonth(occupancy)} a month) at {inr(adr)} a night.
            </p>

            <div style={{ marginTop: '1.5rem' }}>
                <p style={{ margin: '0 0 0.6rem', fontWeight: 600, color: C.ink }}>Of every ₹100 a guest pays</p>
                <div role="img" aria-label={split.map((s) => `${s.label} ₹${per100(s.value)}`).join(', ')} style={{ display: 'flex', height: '0.9rem', borderRadius: '999px', overflow: 'hidden', background: C.line }}>
                    {split.map((s) => <div key={s.key} className="calc-seg" style={{ width: `${Math.max(0, (s.value / g) * 100)}%`, background: s.color }} />)}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0.9rem 0 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem' }}>
                    {split.map((s) => (
                        <li key={s.key} style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem', fontSize: '0.9rem', color: C.muted }}>
                            <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                            <span>{s.label}</span>
                            <strong style={{ marginLeft: 'auto', color: C.ink, fontVariantNumeric: 'tabular-nums' }}>₹{per100(s.value)}</strong>
                        </li>
                    ))}
                </ul>
                {!plan.ownerPaysCosts && <p style={{ fontSize: '0.85rem', color: C.keep, margin: '0.75rem 0 0' }}>On StayPrime, Hostizzy pays the running costs from its half.</p>}
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: `1px solid ${C.line}`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                {[['Quiet year', occ.low], ['Typical', occ.typical], ['Strong', occ.strong]].map(([name, o]) => {
                    const r = planResult(plan, { adr, occupancy: o, costs });
                    const on = o === occupancy;
                    return (
                        <button key={name} type="button" onClick={() => setOccOverride(o)} style={{ background: on ? '#FFF1F1' : 'transparent', border: `1px solid ${on ? C.coral : 'transparent'}`, borderRadius: '0.75rem', padding: '0.5rem 0.25rem', cursor: 'pointer' }}>
                            <div style={{ fontSize: '0.78rem', color: C.muted }}>{name}</div>
                            <div style={{ fontWeight: 700, color: C.ink, fontVariantNumeric: 'tabular-nums' }}>{lakhs(r.owner).replace(' lakh', 'L')}</div>
                            <div style={{ fontSize: '0.72rem', color: C.muted }}>{nightsPerMonth(o)} nights/mo</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <>
            <style>{`
                .calc-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 3rem; align-items: start; }
                .calc-sticky { position: sticky; top: calc(var(--header-height) + 1rem); }
                .calc-mobile-bar { display: none; }
                .calc-pill:focus-visible, .calc-range:focus-visible, .calc-plan:focus-visible { outline: 3px solid rgba(254,88,88,0.45); outline-offset: 2px; }
                .calc-step-title { font-family: var(--font-display) !important; font-size: 1.35rem !important; font-weight: 700 !important; line-height: 1.3 !important; }
                .calc-seg { transition: width 0.35s cubic-bezier(0.4,0,0.2,1); }
                @media (prefers-reduced-motion: reduce) { .calc-seg { transition: none; } }
                @media (max-width: 900px) {
                    .calc-grid { grid-template-columns: 1fr; gap: 1.5rem; }
                    .calc-sticky { position: static; }
                    .calc-mobile-bar { display: flex; position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; }
                }
            `}</style>

            <section style={{ padding: 'calc(var(--header-height) + 2.5rem) 0 1rem', background: 'white' }}>
                <div className="container" style={{ maxWidth: '1120px' }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 700, color: C.ink, lineHeight: 1.15, margin: '0 0 0.75rem', maxWidth: '18ch' }}>
                        What would your home earn as a holiday rental?
                    </h1>
                    <p style={{ color: C.muted, fontSize: '1.1rem', lineHeight: 1.6, margin: 0, maxWidth: '62ch' }}>
                        Answer four questions. The figures come from what similar homes in {Object.keys(MARKETS).length} Indian markets actually earned ({DATA_PERIOD}), with every fee and cost taken out.
                    </p>
                </div>
            </section>

            <section style={{ padding: '1rem 0 4rem', background: 'white' }}>
                <div className="container calc-grid" style={{ maxWidth: '1120px' }}>
                    {/* Questions */}
                    <div>
                        <Step n={1} title="Where is it?">
                            <Row label="Region">
                                {REGIONS.map((r) => <Pill key={r.key} active={regionKey === r.key} onClick={() => pickRegion(r.key)}>{r.label}</Pill>)}
                            </Row>
                            <Row label="Town">
                                {citiesInRegion.map((c) => <Pill key={c} active={city === c} onClick={() => { setCity(c); reset(); }}>{c}</Pill>)}
                            </Row>
                            <p style={{ fontSize: '0.88rem', color: C.muted, margin: 0 }}>
                                Somewhere else? <Link href="/contact" style={{ color: C.coralText, fontWeight: 600 }}>Ask us for an estimate</Link>.
                            </p>
                        </Step>

                        <Step n={2} title="What kind of home?">
                            <Row label="Type">
                                {PROPERTY_TYPES.map((t) => <Pill key={t.key} active={propertyType === t.key} onClick={() => { setPropertyType(t.key); reset(); }}>{t.label}</Pill>)}
                            </Row>
                            <Row label="Bedrooms">
                                {[1, 2, 3, 4, 5].map((b) => <Pill key={b} active={bedrooms === b} onClick={() => { setBedrooms(b); reset(); }}>{b === 5 ? '5+' : b}</Pill>)}
                            </Row>
                            <Row label="Interiors">
                                {FINISH_LEVELS.map((f) => <Pill key={f.key} active={finish === f.key} onClick={() => { setFinish(f.key); setAdrOverride(null); }}>{f.label}</Pill>)}
                            </Row>
                        </Step>

                        <Step n={3} title="How busy, and at what price?" hint={`We've started you at a typical ${city} home of this size. Drag to try your own numbers.`}>
                            <Slider
                                id="calc-nights" label="Nights booked a month"
                                value={occupancy} display={`${nightsPerMonth(occupancy)} nights · ${occupancy}%`}
                                min={5} max={75} step={1} onChange={setOccOverride}
                                marks={[
                                    { label: 'Quiet', value: occ.low },
                                    { label: 'Typical', value: occ.typical },
                                    { label: 'Strong', value: occ.strong },
                                ]}
                            />
                            <Slider
                                id="calc-rate" label="Price per night"
                                value={adr} display={inr(adr)}
                                min={rateMin} max={rateMax} step={100} onChange={setAdrOverride}
                                marks={[{ label: `${city} median`, value: marketRate }]}
                            />
                            <p style={{ fontSize: '0.85rem', color: C.muted, margin: 0 }}>
                                Busiest month here is {market.peak}, quietest {market.low}. Prices exclude GST, which guests pay on top.
                            </p>
                        </Step>

                        <Step n={4} title="Who runs it?">
                            <div role="radiogroup" aria-label="Plan" style={{ display: 'grid', gap: '0.6rem' }}>
                                {plans.map((p) => {
                                    const on = p.key === plan.key;
                                    return (
                                        <button key={p.key} type="button" role="radio" aria-checked={on} onClick={() => setPlanKey(p.key)} className="calc-plan" style={{
                                            display: 'grid', gridTemplateColumns: '1.25rem 1fr auto', gap: '0.75rem', alignItems: 'start', textAlign: 'left', cursor: 'pointer',
                                            padding: '0.9rem 1rem', borderRadius: '0.9rem', border: `1.5px solid ${on ? C.coral : C.line}`, background: on ? '#FFF7F7' : 'white',
                                        }}>
                                            <span aria-hidden="true" style={{ width: '1.1rem', height: '1.1rem', marginTop: '0.15rem', borderRadius: '50%', border: `2px solid ${on ? C.coral : '#CBD5E1'}`, boxShadow: on ? `inset 0 0 0 3px white, inset 0 0 0 10px ${C.coral}` : 'none' }} />
                                            <span>
                                                <span style={{ display: 'block', fontWeight: 700, color: C.ink }}>{p.name}</span>
                                                <span style={{ display: 'block', fontSize: '0.88rem', color: C.muted, marginTop: '0.15rem' }}>{p.summary}</span>
                                            </span>
                                            <span style={{ fontSize: '0.82rem', color: C.ink, fontWeight: 600, textAlign: 'right', maxWidth: '9rem' }}>{p.price}</span>
                                        </button>
                                    );
                                })}
                            </div>
                            {!plans.some((p) => p.fullManagement) && (
                                <p style={{ fontSize: '0.85rem', color: C.muted, margin: '0.75rem 0 0' }}>In {region.label} we co-host remotely. Full management is available in Delhi NCR, Uttarakhand, Himachal Pradesh and Uttar Pradesh, and coming soon to Rajasthan, Goa and North East India.</p>
                            )}
                            {plans.some((p) => p.fullManagement) && propertyType !== 'apartment' && (
                                <p style={{ fontSize: '0.85rem', color: C.muted, margin: '0.75rem 0 0' }}>StayPrime, where we also pay the running costs, is for apartments.</p>
                            )}
                        </Step>
                    </div>

                    {/* Live answer */}
                    <div className="calc-sticky">{resultPanel}</div>
                </div>
            </section>

            {/* Detail */}
            <section style={{ background: C.surface, padding: '4rem 0' }}>
                <div className="container" style={{ maxWidth: '1120px', display: 'grid', gap: '3rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.ink, margin: '0 0 0.4rem' }}>How the year plays out</h2>
                            <p style={{ color: C.muted, margin: '0 0 1.25rem' }}>Bookings by month in {region.label}. {MONTHS[peakIdx]} is the high point, and busy months cost more to run too: cleaning, laundry, supplies and power follow booked nights.</p>
                            <div style={{ height: 240 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthly} margin={{ top: 4, right: 0, left: -12, bottom: 0 }}>
                                        <XAxis dataKey="m" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} interval={0} />
                                        <YAxis tickFormatter={(v) => (v >= 1e5 ? (v / 1e5).toFixed(1) + 'L' : (v / 1000).toFixed(0) + 'k')} tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
                                        <Tooltip formatter={(v) => [inr(v), 'Bookings']} cursor={{ fill: 'rgba(148,163,184,0.15)' }} />
                                        <Bar dataKey="v" radius={[5, 5, 0, 0]}>
                                            {monthly.map((d, i) => <Cell key={d.m} fill={i === peakIdx ? C.coral : '#FDBABA'} />)}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.ink, margin: '0 0 0.4rem' }}>Every plan at {nightsPerMonth(occupancy)} nights a month</h2>
                            <p style={{ color: C.muted, margin: '0 0 1.25rem' }}>
                                At the same bookings, running it yourself keeps the most. A managed plan pays for itself by filling more nights; the note under each bar shows how many.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                                {comparison.map(({ plan: p, result: r, breakEven }) => (
                                    <li key={p.key}>
                                        <button type="button" onClick={() => setPlanKey(p.key)} style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                                                <span style={{ fontWeight: p.key === plan.key ? 700 : 600, color: C.ink }}>{p.name}</span>
                                                <span style={{ fontWeight: 700, color: C.ink, fontVariantNumeric: 'tabular-nums' }}>{lakhs(r.owner)}</span>
                                            </div>
                                            <div style={{ height: '0.6rem', borderRadius: '999px', background: C.line, overflow: 'hidden' }}>
                                                <div className="calc-seg" style={{ height: '100%', width: `${Math.max(2, (Math.max(0, r.owner) / bestKeep) * 100)}%`, background: p.key === plan.key ? C.keep : '#9FD8C4' }} />
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: C.muted, marginTop: '0.3rem' }}>
                                                {p.key === 'smartstart' ? 'You do everything yourself'
                                                    : breakEven == null ? 'Does not beat running it yourself at this price'
                                                        : breakEven <= occupancy ? 'Already ahead of running it yourself'
                                                            : `Beats running it yourself from ${nightsPerMonth(breakEven)} nights a month`}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.ink, margin: '0 0 0.4rem' }}>Your running costs</h2>
                            <p style={{ color: C.muted, margin: '0 0 1.25rem' }}>Our estimate for a home this size. Change them to match yours.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {[
                                    ['perNight', 'Per booked night', 'Cleaning, laundry, amenities, power', 100],
                                    ['monthly', 'Per month', 'Caretaker, upkeep, internet', 1000],
                                ].map(([k, l, h, s]) => (
                                    <label key={k} style={{ display: 'block' }}>
                                        <span style={{ display: 'block', fontWeight: 600, color: C.ink, fontSize: '0.92rem', marginBottom: '0.35rem' }}>{l}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', border: `1px solid ${C.line}`, borderRadius: '0.7rem', background: 'white', padding: '0 0.75rem' }}>
                                            <span style={{ color: C.muted }}>₹</span>
                                            <input type="number" min="0" step={s} value={costs[k]} onChange={(e) => setCostOverride({ ...costs, [k]: Math.max(0, +e.target.value || 0) })} style={{ width: '100%', border: 'none', outline: 'none', padding: '0.7rem 0.4rem', fontSize: '1rem', background: 'transparent' }} />
                                        </span>
                                        <span style={{ display: 'block', fontSize: '0.8rem', color: C.muted, marginTop: '0.3rem' }}>{h}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.ink, margin: '0 0 0.4rem' }}>Compare with today</h2>
                            <p style={{ color: C.muted, margin: '0 0 1.25rem' }}>Already renting it out? Enter what you take home in a month.</p>
                            <span style={{ display: 'flex', alignItems: 'center', border: `1px solid ${C.line}`, borderRadius: '0.7rem', background: 'white', padding: '0 0.75rem', maxWidth: '20rem' }}>
                                <span style={{ color: C.muted }}>₹</span>
                                <input inputMode="numeric" aria-label="What you take home in a month today" placeholder="e.g. 40,000" value={currentEarnings} onChange={(e) => setCurrentEarnings(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', padding: '0.7rem 0.4rem', fontSize: '1rem', background: 'transparent' }} />
                            </span>
                            {current > 0 && (
                                <p style={{ margin: '0.75rem 0 0', fontWeight: 600, color: result.owner / 12 >= current ? C.keep : C.cost }}>
                                    {result.owner / 12 >= current
                                        ? `About ${inr(result.owner / 12 - current)} a month more than today on ${plan.name}.`
                                        : `About ${inr(current - result.owner / 12)} a month less than today at these numbers. Try the Strong case, or ask us to look at your listing.`}
                                </p>
                            )}
                        </div>
                    </div>

                    <div style={{ background: 'white', border: `1px solid ${C.line}`, borderRadius: '1.25rem', padding: 'clamp(1.5rem, 4vw, 2.5rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem 3rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: C.ink, margin: '0 0 0.5rem' }}>Get a forecast for your own home</h2>
                            <p style={{ color: C.muted, margin: 0 }}>Town averages can't see your view, your pool or your reviews. Our revenue team will send a forecast for your property within 24 hours.</p>
                        </div>
                        {leadState === 'sent' ? (
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: C.keep, fontWeight: 600, margin: 0 }}><Check size={18} /> Sent. We'll email your forecast within 24 hours.</p>
                        ) : (
                            <form onSubmit={submitLead} style={{ display: 'grid', gap: '0.75rem' }}>
                                <input type="email" required placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '0.8rem 1rem', border: `1px solid ${C.line}`, borderRadius: '0.7rem', fontSize: '1rem' }} />
                                <input type="tel" placeholder="Phone (optional)" aria-label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: '0.8rem 1rem', border: `1px solid ${C.line}`, borderRadius: '0.7rem', fontSize: '1rem' }} />
                                <button type="submit" className="btn btn-gradient" disabled={leadState === 'sending'}>{leadState === 'sending' ? 'Sending…' : 'Send my forecast'}</button>
                                {leadState === 'error' && <p style={{ color: '#B91C1C', margin: 0, fontSize: '0.9rem' }}>That didn't go through. Try again, or <Link href="/contact">contact us</Link>.</p>}
                            </form>
                        )}
                    </div>

                    <details style={{ color: C.muted }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 600, color: C.ink, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><Info size={16} /> How these numbers are worked out</summary>
                        <ul style={{ lineHeight: 1.7, fontSize: '0.92rem', margin: '1rem 0', maxWidth: '75ch' }}>
                            {ASSUMPTIONS.map((a) => <li key={a}>{a}</li>)}
                            <li>Holiday-rental supply in India grew 30–100% in the last year while revenue per listing fell in most markets. Treat past results as a guide, not a promise.</li>
                        </ul>
                        <p style={{ fontSize: '0.85rem', margin: 0, maxWidth: '75ch' }}>
                            Sources, checked {DATA_CHECKED}:{' '}
                            {SOURCES.map((s, i) => (
                                <span key={s.url}>{i > 0 && '; '}<a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: C.coralText }}>{s.name}</a> ({s.period})</span>
                            ))}. Estimates are indicative, not a guarantee of earnings.
                        </p>
                    </details>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <Link href="/services" className="btn btn-outline">See what each plan includes</Link>
                        <a href="https://wa.me/919560493335?text=Hi%20Hostizzy%2C%20I%20used%20the%20revenue%20calculator%20and%20would%20like%20to%20talk." target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ gap: '0.4rem' }}>
                            <MessageCircle size={18} /> Talk to us on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* Phone: the answer stays in view while the questions scroll */}
            <a href="#calc-result" className="calc-mobile-bar" style={{ justifyContent: 'flex-start', alignItems: 'baseline', gap: '0.5rem', padding: '0.9rem 6rem 0.9rem 1.25rem', background: C.ink, color: 'white', textDecoration: 'none', boxShadow: '0 -6px 20px rgba(15,23,42,0.18)' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>You'd keep</span>
                <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{inr(result.owner / 12)} a month</span>
            </a>
        </>
    );
}
