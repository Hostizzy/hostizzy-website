'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import {
    Home, Building2, Trees, House, Sparkles, ArrowRight, TrendingUp,
    BarChart3, Info, Lock, Check, Star, MapPin, IndianRupee, Zap
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

// --- MARKET DATA (20+ Indian markets) ---
const MARKET_DATA = {
    'Manali': { base: 6500, occ: 68, grade: 'A', seas: [40, 50, 60, 90, 100, 100, 70, 60, 50, 70, 60, 80], region: 'Himalayan' },
    'Shimla': { base: 6000, occ: 65, grade: 'A-', seas: [40, 45, 60, 85, 100, 90, 60, 50, 50, 70, 60, 85], region: 'Himalayan' },
    'Mussoorie': { base: 5800, occ: 62, grade: 'B+', seas: [35, 45, 65, 90, 100, 90, 50, 40, 50, 70, 60, 80], region: 'Himalayan' },
    'Rishikesh': { base: 5500, occ: 72, grade: 'A', seas: [60, 70, 80, 80, 60, 50, 40, 40, 70, 90, 80, 70], region: 'Himalayan' },
    'Dharamshala': { base: 5200, occ: 60, grade: 'B', seas: [30, 40, 60, 80, 90, 80, 40, 30, 50, 70, 60, 50], region: 'Himalayan' },
    'Gangtok': { base: 5000, occ: 55, grade: 'B', seas: [40, 50, 70, 90, 100, 60, 50, 40, 60, 90, 80, 60], region: 'Himalayan' },

    'Goa (North)': { base: 9000, occ: 75, grade: 'A+', seas: [95, 85, 60, 50, 40, 30, 30, 40, 50, 70, 90, 100], region: 'Coastal' },
    'Goa (South)': { base: 8500, occ: 70, grade: 'A', seas: [90, 80, 55, 45, 30, 20, 20, 30, 40, 60, 85, 95], region: 'Coastal' },
    'Lonavala': { base: 7500, occ: 65, grade: 'A', seas: [60, 50, 50, 60, 80, 100, 100, 90, 70, 60, 70, 90], region: 'Coastal' },
    'Alibaug': { base: 8000, occ: 60, grade: 'A-', seas: [60, 50, 50, 60, 70, 50, 40, 40, 50, 70, 80, 100], region: 'Coastal' },
    'Mahabaleshwar': { base: 6000, occ: 55, grade: 'B+', seas: [50, 50, 60, 70, 90, 60, 50, 50, 40, 60, 70, 90], region: 'Coastal' },
    'Nasik': { base: 5500, occ: 50, grade: 'B', seas: [60, 60, 50, 50, 50, 60, 80, 70, 60, 60, 70, 80], region: 'Coastal' },
    'Varkala': { base: 5000, occ: 60, grade: 'B', seas: [80, 80, 60, 50, 40, 30, 30, 40, 50, 60, 70, 90], region: 'Coastal' },

    'Coorg': { base: 7000, occ: 68, grade: 'A', seas: [70, 70, 70, 80, 90, 70, 60, 60, 50, 70, 80, 100], region: 'Southern' },
    'Wayanad': { base: 6200, occ: 64, grade: 'B+', seas: [70, 70, 70, 80, 90, 60, 50, 50, 60, 70, 80, 90], region: 'Southern' },
    'Ooty': { base: 5800, occ: 66, grade: 'B+', seas: [60, 60, 70, 90, 100, 70, 60, 50, 60, 70, 60, 80], region: 'Southern' },
    'Munnar': { base: 6000, occ: 70, grade: 'A-', seas: [70, 70, 70, 80, 90, 60, 50, 50, 60, 70, 80, 100], region: 'Southern' },
    'Pondicherry': { base: 6500, occ: 72, grade: 'A-', seas: [90, 80, 60, 50, 60, 50, 60, 70, 60, 70, 70, 100], region: 'Southern' },

    'Jaipur': { base: 5500, occ: 60, grade: 'B+', seas: [80, 90, 70, 50, 30, 20, 30, 40, 60, 80, 90, 90], region: 'Northern' },
    'Udaipur': { base: 6500, occ: 62, grade: 'A-', seas: [80, 90, 70, 50, 30, 20, 30, 40, 60, 90, 100, 90], region: 'Northern' },
    'Delhi': { base: 4500, occ: 75, grade: 'B+', seas: [80, 90, 80, 70, 60, 50, 50, 60, 70, 90, 100, 90], region: 'Northern' },
};

const REGIONS = ['Himalayan', 'Coastal', 'Southern', 'Northern'];

const PROPERTY_TYPES = [
    { key: 'villa', label: 'Villa', icon: Home, emoji: '' },
    { key: 'apartment', label: 'Apartment', icon: Building2, emoji: '' },
    { key: 'farmhouse', label: 'Farmhouse', icon: Trees, emoji: '' },
    { key: 'cottage', label: 'Cottage', icon: House, emoji: '' },
];

const FINISH_LEVELS = [
    { key: 'standard', label: 'Standard', stars: 0, boost: 'Base rate', pct: '' },
    { key: 'premium', label: 'Premium', stars: 1, boost: '+6% ADR', pct: '+6%' },
    { key: 'luxury', label: 'Luxury', stars: 2, boost: '+12% ADR', pct: '+12%' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// --- ANIMATED COUNTER ---
const AnimatedCounter = ({ value, prefix = '\u20B9', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!value) return;
        let start = 0;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else { setCount(Math.floor(start)); }
        }, 16);
        return () => clearInterval(timer);
    }, [value, duration]);
    return <span>{prefix}{count.toLocaleString('en-IN')}</span>;
};

// --- CONFIDENCE SCORE ---
const getConfidenceScore = (cityData, occupancy) => {
    let score = 0;
    const gradePoints = { 'A+': 4, 'A': 3.5, 'A-': 3, 'B+': 2.5, 'B': 2, 'B-': 1.5, 'C+': 1, 'C': 0.5 };
    score += gradePoints[cityData.grade] || 2;

    if (occupancy >= 75) score += 3;
    else if (occupancy >= 65) score += 2.5;
    else if (occupancy >= 55) score += 2;
    else score += 1;

    const avgSeason = cityData.seas.reduce((a, b) => a + b, 0) / 12;
    const variance = cityData.seas.reduce((sum, val) => sum + Math.pow(val - avgSeason, 2), 0) / 12;
    const stability = Math.max(0, 3 - (variance / 500));
    score += stability;

    return Math.min(10, Math.max(0, score)).toFixed(1);
};

export default function Calculator() {
    // --- STATE ---
    const [selectedCity, setSelectedCity] = useState('Manali');
    const [activeRegion, setActiveRegion] = useState('Himalayan');
    const [propertyType, setPropertyType] = useState('villa');
    const [bedrooms, setBedrooms] = useState(3);
    const [finishes, setFinishes] = useState('luxury');

    // Results state
    const [showResults, setShowResults] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    // Lead capture state
    const [emailUnlocked, setEmailUnlocked] = useState(false);
    const [leadEmail, setLeadEmail] = useState('');
    const [emailSubmitting, setEmailSubmitting] = useState(false);

    // AI integration state
    const [aiLoading, setAiLoading] = useState(false);
    const [aiData, setAiData] = useState(null);
    const [aiError, setAiError] = useState(false);

    // --- CALCULATION ENGINE ---
    const calculate = () => {
        const cityData = MARKET_DATA[selectedCity] || MARKET_DATA['Manali'];
        const typeMult = propertyType === 'villa' ? 1.2 : (propertyType === 'farmhouse' ? 1.15 : 1.0);
        const bedMult = 1 + (bedrooms - 1) * 0.15;
        const finishMult = finishes === 'luxury' ? 1.12 : (finishes === 'premium' ? 1.06 : 1.0);

        const avgNightlyRate = Math.round(cityData.base * typeMult * bedMult * finishMult);
        const annualOccupancy = Math.min(cityData.occ + (finishes === 'luxury' ? 3 : 0), 85);
        const daysBooked = 365 * (annualOccupancy / 100);

        const grossRev = avgNightlyRate * daysBooked;
        const hostizzyFee = grossRev * 0.20;
        const otaCommission = grossRev * 0.18;
        const opsCost = grossRev * 0.15;
        const netIncome = grossRev - hostizzyFee - otaCommission - opsCost;

        // Self-managed calculation
        const selfOccupancy = Math.max(annualOccupancy - 15, 30);
        const selfDaysBooked = 365 * (selfOccupancy / 100);
        const selfGross = avgNightlyRate * 0.85 * selfDaysBooked; // No dynamic pricing = 15% lower rate
        const selfOtaFee = selfGross * 0.18;
        const selfNet = selfGross - selfOtaFee;

        const confidenceScore = getConfidenceScore(cityData, annualOccupancy);

        return {
            adr: avgNightlyRate,
            occupancy: annualOccupancy,
            daysBooked: Math.round(daysBooked),
            revpar: Math.round(grossRev / 365),
            grossRevenue: Math.round(grossRev),
            netIncome: Math.round(netIncome),
            confidenceScore,
            marketGrade: cityData.grade,
            seas: cityData.seas,
            breakdown: {
                net: Math.round(netIncome),
                fee: Math.round(hostizzyFee),
                ota: Math.round(otaCommission),
                ops: Math.round(opsCost),
            },
            self: {
                occupancy: selfOccupancy,
                grossRevenue: Math.round(selfGross),
                netIncome: Math.round(selfNet),
            },
            difference: Math.round(netIncome - selfNet),
            differencePercent: Math.round(((netIncome - selfNet) / selfNet) * 100),
        };
    };

    const [results, setResults] = useState(null);

    const handleCalculate = async () => {
        setIsCalculating(true);
        setAiData(null);
        setAiError(false);

        // Simulate brief calculation delay for UX
        await new Promise(r => setTimeout(r, 800));

        const calcResults = calculate();
        setResults(calcResults);
        setShowResults(true);
        setIsCalculating(false);

        // Fire AI estimate in background
        fetchAIEstimate();
    };

    const fetchAIEstimate = async () => {
        setAiLoading(true);
        setAiError(false);
        try {
            const res = await fetch('/api/ai-estimate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    city: selectedCity,
                    propertyType,
                    bedrooms,
                    finishLevel: finishes,
                }),
            });
            const data = await res.json();
            if (data.fallback || data.error) {
                setAiError(true);
                setAiData(null);
            } else {
                setAiData(data);
            }
        } catch {
            setAiError(true);
            setAiData(null);
        } finally {
            setAiLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!leadEmail) return;
        setEmailSubmitting(true);
        try {
            const res = await fetch('/api/calculator-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: leadEmail,
                    city: selectedCity,
                    propertyType,
                    bedrooms,
                    finishes,
                    revenue: results?.grossRevenue,
                    netIncome: results?.netIncome,
                }),
            });
            if (res.ok) {
                setEmailUnlocked(true);
            }
        } catch {
            // Fallback: unlock anyway
            setEmailUnlocked(true);
        } finally {
            setEmailSubmitting(false);
        }
    };

    // Derived values for display
    const displayNet = aiData ? aiData.netIncome : results?.netIncome;
    const displayGross = aiData ? aiData.grossRevenue : results?.grossRevenue;
    const displayOcc = aiData ? aiData.occupancy : results?.occupancy;
    const confidenceLabel = results?.confidenceScore >= 7.5 ? 'Strong Market' : results?.confidenceScore >= 6 ? 'Moderate Market' : 'Emerging Market';
    const confidenceColor = results?.confidenceScore >= 7.5 ? '#10b981' : results?.confidenceScore >= 6 ? '#f59e0b' : '#ef4444';

    const citiesInRegion = Object.entries(MARKET_DATA).filter(([, d]) => d.region === activeRegion).map(([name]) => name);

    const seasonalData = results ? results.seas.map((val, idx) => ({
        month: MONTHS[idx],
        demand: val,
        revenue: Math.round((results.adr * val / 100) * (results.occupancy / 100) * 30),
    })) : [];

    return (
        <>
            <SEO title="Revenue Calculator | Hostizzy" description="AI-powered vacation rental revenue calculator for 20+ Indian markets. Estimate your property earnings with Hostizzy." />

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                .calc-fade-in { animation: fadeInUp 0.6s ease-out both; }
                .calc-fade-in-delay { animation: fadeInUp 0.6s ease-out 0.2s both; }
                .calc-fade-in-delay-2 { animation: fadeInUp 0.6s ease-out 0.4s both; }
                .calc-region-pill { padding: 0.5rem 1.25rem; border-radius: 999px; border: 1.5px solid #e2e8f0; background: white; cursor: pointer; font-size: 0.875rem; font-weight: 600; color: #64748b; transition: all 0.2s ease; }
                .calc-region-pill:hover { border-color: #cbd5e1; color: #334155; }
                .calc-region-pill.active { background: var(--color-primary); border-color: var(--color-primary); color: white; }
                .calc-city-chip { padding: 0.4rem 1rem; border-radius: 999px; border: 1.5px solid #e2e8f0; background: white; cursor: pointer; font-size: 0.8rem; font-weight: 500; color: #475569; transition: all 0.2s ease; }
                .calc-city-chip:hover { border-color: var(--color-primary-light); background: #fff5f5; }
                .calc-city-chip.active { background: linear-gradient(135deg, #FE5858 0%, #FF8A80 100%); border-color: var(--color-primary); color: white; font-weight: 600; }
                .calc-type-card { padding: 1rem 1.25rem; border-radius: 1rem; border: 2px solid #e2e8f0; background: white; cursor: pointer; text-align: center; transition: all 0.2s ease; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; min-width: 100px; }
                .calc-type-card:hover { border-color: #fca5a5; background: #fff5f5; }
                .calc-type-card.active { border-color: var(--color-primary); background: linear-gradient(135deg, #fff5f5, #ffe4e4); box-shadow: 0 0 0 3px rgba(254,88,88,0.15); }
                .calc-bed-chip { width: 44px; height: 44px; border-radius: 12px; border: 2px solid #e2e8f0; background: white; cursor: pointer; font-size: 1rem; font-weight: 700; color: #475569; transition: all 0.15s ease; display: flex; align-items: center; justify-content: center; }
                .calc-bed-chip:hover { border-color: #fca5a5; }
                .calc-bed-chip.active { border-color: var(--color-primary); background: var(--color-primary); color: white; }
                .calc-finish-card { flex: 1; padding: 1rem; border-radius: 1rem; border: 2px solid #e2e8f0; background: white; cursor: pointer; text-align: center; transition: all 0.2s ease; }
                .calc-finish-card:hover { border-color: #fca5a5; }
                .calc-finish-card.active { border-color: var(--color-primary); background: linear-gradient(135deg, #fff5f5, #ffe4e4); box-shadow: 0 0 0 3px rgba(254,88,88,0.15); }
                .calc-bar-segment { height: 14px; transition: width 0.8s ease; }
                .calc-comparison-card { flex: 1; padding: 2rem; border-radius: 1.5rem; border: 2px solid #e2e8f0; background: white; }
                .calc-comparison-card.highlighted { border-color: var(--color-primary); background: linear-gradient(160deg, #fffbfb, #fff5f5); box-shadow: 0 8px 30px rgba(254,88,88,0.12); }
                @media (max-width: 768px) {
                    .calc-comparison-row { flex-direction: column !important; }
                    .calc-dash-grid { grid-template-columns: 1fr !important; }
                    .calc-type-row { flex-wrap: wrap !important; }
                    .calc-bed-row { flex-wrap: wrap !important; }
                    .calc-finish-row { flex-direction: column !important; }
                }
            `}</style>

            {/* ===== 1. HERO SECTION ===== */}
            <section style={{
                background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
                padding: '5rem 0 4rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Subtle grid overlay */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.04,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                }} />
                <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
                    <ScrollReveal>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            background: 'linear-gradient(135deg, rgba(254,88,88,0.15), rgba(139,92,246,0.15))',
                            border: '1px solid rgba(254,88,88,0.3)',
                            padding: '0.4rem 1rem', borderRadius: '999px', marginBottom: '1.5rem',
                            color: '#FF8A80', fontSize: '0.8rem', fontWeight: 600,
                        }}>
                            <Sparkles size={14} /> AI-Powered
                        </div>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                            fontWeight: 700,
                            color: 'white',
                            lineHeight: 1.15,
                            marginBottom: '1rem',
                        }}>
                            How Much Can Your Property Earn?
                        </h1>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#94a3b8',
                            maxWidth: '520px',
                            margin: '0 auto',
                            lineHeight: 1.6,
                        }}>
                            AI-powered revenue estimates for 20+ Indian markets
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== 2. INPUT SECTION ===== */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container" style={{ maxWidth: '880px' }}>

                    {/* Step 1: Select Market */}
                    <ScrollReveal>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    background: 'var(--color-primary)', color: 'white', fontSize: '0.8rem', fontWeight: 700,
                                }}>1</span>
                                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Select Market</span>
                            </div>

                            {/* Region pills */}
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                {REGIONS.map(region => (
                                    <button
                                        key={region}
                                        className={`calc-region-pill ${activeRegion === region ? 'active' : ''}`}
                                        onClick={() => setActiveRegion(region)}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>

                            {/* City chips */}
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {citiesInRegion.map(city => (
                                    <button
                                        key={city}
                                        className={`calc-city-chip ${selectedCity === city ? 'active' : ''}`}
                                        onClick={() => setSelectedCity(city)}
                                    >
                                        <MapPin size={12} style={{ marginRight: '0.25rem', verticalAlign: '-1px' }} />
                                        {city}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Step 2: Property Details */}
                    <ScrollReveal>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    background: 'var(--color-primary)', color: 'white', fontSize: '0.8rem', fontWeight: 700,
                                }}>2</span>
                                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Property Details</span>
                            </div>

                            {/* Property Type */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Property Type</div>
                                <div className="calc-type-row" style={{ display: 'flex', gap: '0.75rem' }}>
                                    {PROPERTY_TYPES.map(pt => {
                                        const Icon = pt.icon;
                                        return (
                                            <button
                                                key={pt.key}
                                                className={`calc-type-card ${propertyType === pt.key ? 'active' : ''}`}
                                                onClick={() => setPropertyType(pt.key)}
                                            >
                                                <Icon size={22} strokeWidth={1.8} style={{ color: propertyType === pt.key ? 'var(--color-primary)' : '#64748b' }} />
                                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: propertyType === pt.key ? '#1e293b' : '#64748b' }}>{pt.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bedrooms */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bedrooms</div>
                                <div className="calc-bed-row" style={{ display: 'flex', gap: '0.5rem' }}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <button
                                            key={n}
                                            className={`calc-bed-chip ${bedrooms === n ? 'active' : ''}`}
                                            onClick={() => setBedrooms(n)}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Finish Level */}
                            <div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Finish Level</div>
                                <div className="calc-finish-row" style={{ display: 'flex', gap: '0.75rem' }}>
                                    {FINISH_LEVELS.map(fl => (
                                        <button
                                            key={fl.key}
                                            className={`calc-finish-card ${finishes === fl.key ? 'active' : ''}`}
                                            onClick={() => setFinishes(fl.key)}
                                        >
                                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: finishes === fl.key ? '#1e293b' : '#475569', marginBottom: '0.2rem' }}>
                                                {fl.label}
                                                {fl.stars > 0 && <span style={{ color: '#f59e0b', marginLeft: '0.3rem' }}>{'★'.repeat(fl.stars)}</span>}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: finishes === fl.key ? 'var(--color-primary)' : '#94a3b8', fontWeight: 500 }}>
                                                {fl.boost}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Step 3: Calculate Button */}
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
                            <button
                                onClick={handleCalculate}
                                disabled={isCalculating}
                                className="btn btn-gradient"
                                style={{
                                    padding: '1.1rem 3rem',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    borderRadius: '999px',
                                    opacity: isCalculating ? 0.7 : 1,
                                    cursor: isCalculating ? 'wait' : 'pointer',
                                    boxShadow: '0 8px 30px rgba(254,88,88,0.3)',
                                }}
                            >
                                {isCalculating ? (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ width: '18px', height: '18px', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                                        Analyzing {selectedCity} market with AI...
                                    </span>
                                ) : (
                                    <>Calculate My Earnings</>
                                )}
                            </button>
                            {!isCalculating && (
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                                    <Sparkles size={12} /> Get AI-Powered Estimate
                                </div>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== 3. RESULTS SECTION ===== */}
            {showResults && results && (
                <>
                    {/* --- Primary Result Card --- */}
                    <section style={{
                        background: 'linear-gradient(135deg, #FE5858 0%, #d83a3a 50%, #b91c1c 100%)',
                        padding: '3.5rem 0',
                    }}>
                        <div className="container calc-fade-in" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                                Estimated Annual Net Income
                                {aiData && (
                                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', marginLeft: '0.5rem', verticalAlign: 'middle' }}>AI Enhanced</span>
                                )}
                            </div>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                                fontWeight: 800,
                                color: 'white',
                                lineHeight: 1,
                                marginBottom: '1rem',
                            }}>
                                <AnimatedCounter value={displayNet} />
                            </div>

                            {/* Confidence badge */}
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                background: 'rgba(255,255,255,0.15)',
                                padding: '0.4rem 1rem', borderRadius: '999px',
                                color: 'white', fontSize: '0.85rem', fontWeight: 600,
                                marginBottom: '0.75rem',
                                backdropFilter: 'blur(8px)',
                            }}>
                                <span style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: confidenceColor, display: 'inline-block',
                                }} />
                                {confidenceLabel} ({results.confidenceScore}/10)
                            </div>

                            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                                {'\u20B9'}{(displayNet * 0.85).toLocaleString('en-IN')} &ndash; {'\u20B9'}{(displayNet * 1.15).toLocaleString('en-IN')} (85% confidence interval)
                            </div>
                        </div>
                    </section>

                    {/* --- Comparison Cards --- */}
                    <section className="section" style={{ background: 'white' }}>
                        <div className="container" style={{ maxWidth: '920px' }}>
                            <ScrollReveal>
                                <div className="calc-comparison-row" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>

                                    {/* Self-Managed */}
                                    <div className="calc-comparison-card" style={{ opacity: 0.85 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Self-Managed</div>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#475569', marginBottom: '0.5rem' }}>
                                            {'\u20B9'}{results.self.netIncome.toLocaleString('en-IN')}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>Net after {results.self.occupancy}% occupancy & 18% OTA fees</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
                                                <span>Occupancy</span><span style={{ fontWeight: 600 }}>{results.self.occupancy}%</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
                                                <span>Gross Revenue</span><span style={{ fontWeight: 600 }}>{'\u20B9'}{results.self.grossRevenue.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
                                                <span>Pricing</span><span style={{ fontWeight: 600 }}>Static</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* With Hostizzy */}
                                    <div className="calc-comparison-card highlighted" style={{ position: 'relative' }}>
                                        <div style={{
                                            position: 'absolute', top: '-12px', right: '1.5rem',
                                            background: 'linear-gradient(135deg, #FE5858, #FF8A80)',
                                            color: 'white', fontSize: '0.65rem', fontWeight: 800,
                                            padding: '0.3rem 0.8rem', borderRadius: '999px',
                                            textTransform: 'uppercase', letterSpacing: '0.08em',
                                        }}>
                                            Recommended
                                        </div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>With Hostizzy</div>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
                                            {'\u20B9'}{results.netIncome.toLocaleString('en-IN')}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>Net after {results.occupancy}% occupancy & professional management</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                                                <span>Occupancy</span><span style={{ fontWeight: 600 }}>{results.occupancy}%</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                                                <span>Gross Revenue</span><span style={{ fontWeight: 600 }}>{'\u20B9'}{results.grossRevenue.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                                                <span>Pricing</span><span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Dynamic AI</span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid #fecaca', paddingTop: '1rem' }}>
                                            {['Dynamic Pricing', 'Professional Photos', '24/7 Guest Support', 'Multi-channel Distribution'].map(item => (
                                                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#475569' }}>
                                                    <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} /> {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Difference callout */}
                                {results.difference > 0 && (
                                    <div style={{
                                        textAlign: 'center',
                                        background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
                                        border: '1px solid #bbf7d0',
                                        borderRadius: '1rem',
                                        padding: '1rem 1.5rem',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        color: '#15803d',
                                    }}>
                                        <Zap size={16} style={{ verticalAlign: '-3px', marginRight: '0.35rem' }} />
                                        With Hostizzy, you earn {'\u20B9'}{results.difference.toLocaleString('en-IN')} more per year (+{results.differencePercent}%)
                                    </div>
                                )}
                            </ScrollReveal>
                        </div>
                    </section>

                    {/* ===== 4. DETAIL DASHBOARD ===== */}
                    <section className="section" style={{ background: '#f8fafc', paddingTop: '2rem' }}>
                        <div className="container" style={{ maxWidth: '960px' }}>
                            <ScrollReveal>
                                <div className="calc-dash-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: '1.5rem',
                                }}>
                                    {/* Column 1: Key Metrics */}
                                    <div className="card" style={{ padding: '1.5rem', borderRadius: '1.25rem', background: 'white' }}>
                                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <BarChart3 size={16} style={{ color: 'var(--color-primary)' }} /> Key Metrics
                                        </h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {[
                                                { label: 'ADR (Avg Daily Rate)', value: `\u20B9${results.adr.toLocaleString('en-IN')}` },
                                                { label: 'Annual Occupancy', value: `${displayOcc}%` },
                                                { label: 'RevPAR', value: `\u20B9${(aiData ? Math.round(aiData.grossRevenue / 365) : results.revpar).toLocaleString('en-IN')}` },
                                                { label: 'Days Booked', value: `${results.daysBooked} / 365` },
                                                { label: 'Market Grade', value: results.marketGrade },
                                            ].map(m => (
                                                <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.label}</span>
                                                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>{m.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Column 2: Revenue Breakdown */}
                                    <div className="card" style={{ padding: '1.5rem', borderRadius: '1.25rem', background: 'white' }}>
                                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <IndianRupee size={16} style={{ color: 'var(--color-primary)' }} /> Revenue Breakdown
                                        </h3>

                                        {/* Stacked bar */}
                                        <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                                            <div className="calc-bar-segment" style={{ width: '47%', background: '#10b981' }} />
                                            <div className="calc-bar-segment" style={{ width: '20%', background: '#3b82f6' }} />
                                            <div className="calc-bar-segment" style={{ width: '18%', background: '#f59e0b' }} />
                                            <div className="calc-bar-segment" style={{ width: '15%', background: '#ef4444' }} />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                            {[
                                                { label: 'Net Income', pct: '47%', color: '#10b981', amount: results.breakdown.net },
                                                { label: 'Management', pct: '20%', color: '#3b82f6', amount: results.breakdown.fee },
                                                { label: 'OTA Fees', pct: '18%', color: '#f59e0b', amount: results.breakdown.ota },
                                                { label: 'Operations', pct: '15%', color: '#ef4444', amount: results.breakdown.ops },
                                            ].map(item => (
                                                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.color, flexShrink: 0 }} />
                                                    <span style={{ flex: 1, fontSize: '0.8rem', color: '#64748b' }}>{item.label}</span>
                                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{item.pct}</span>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', minWidth: '80px', textAlign: 'right' }}>{'\u20B9'}{item.amount.toLocaleString('en-IN')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Column 3: AI Insight / Methodology */}
                                    <div className="card" style={{
                                        padding: '1.5rem', borderRadius: '1.25rem',
                                        background: aiData ? 'linear-gradient(160deg, #eff6ff, #f0f9ff)' : 'white',
                                        border: aiData ? '1px solid #bfdbfe' : undefined,
                                    }}>
                                        {aiData ? (
                                            <>
                                                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <Sparkles size={16} /> Market Insight
                                                </h3>
                                                <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6, marginBottom: '1rem' }}>
                                                    {aiData.marketInsight}
                                                </p>
                                                {aiData.recommendations && (
                                                    <>
                                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.5rem' }}>Recommendations</div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                                            {aiData.recommendations.map((rec, i) => (
                                                                <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.4rem', fontSize: '0.8rem', color: '#334155' }}>
                                                                    <Check size={13} style={{ color: '#22c55e', marginTop: '2px', flexShrink: 0 }} /> {rec}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <Info size={16} style={{ color: 'var(--color-primary)' }} /> Market Intelligence
                                                </h3>
                                                {aiLoading ? (
                                                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                                        <div style={{ width: '32px', height: '32px', border: '3px solid #e2e8f0', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 0.75rem' }} />
                                                        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Generating AI insights...</p>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                        {[
                                                            { label: 'Data Source', value: 'Hostizzy proprietary database (2,500+ properties)' },
                                                            { label: 'Update Frequency', value: 'Monthly rolling average' },
                                                            { label: 'Methodology', value: 'Conservative multi-layer projections' },
                                                        ].map(item => (
                                                            <div key={item.label} style={{ borderLeft: '3px solid #e2e8f0', paddingLeft: '0.75rem' }}>
                                                                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                                                                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.15rem' }}>{item.value}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {aiError && (
                                                    <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.75rem' }}>AI estimation unavailable. Showing formula-based results.</p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </section>

                    {/* ===== 5. SEASONAL CHART (Gated) ===== */}
                    <section className="section" style={{ background: 'white' }}>
                        <div className="container" style={{ maxWidth: '800px' }}>
                            <ScrollReveal>
                                <div style={{ position: 'relative' }}>
                                    {/* Chart content */}
                                    <div style={{
                                        filter: !emailUnlocked ? 'blur(6px)' : 'none',
                                        pointerEvents: !emailUnlocked ? 'none' : 'auto',
                                        transition: 'filter 0.4s ease',
                                    }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <TrendingUp size={18} style={{ color: 'var(--color-primary)' }} /> Seasonal Revenue Trend
                                        </h3>
                                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Month-by-month demand index for {selectedCity}</p>
                                        {seasonalData.length > 0 && (
                                            <ResponsiveContainer width="100%" height={280}>
                                                <LineChart data={aiData?.seasonalTrend ? aiData.seasonalTrend.map((val, idx) => ({ month: MONTHS[idx], demand: val, revenue: Math.round((results.adr * val / 100) * (results.occupancy / 100) * 30) })) : seasonalData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                                    <Line type="monotone" dataKey="demand" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} name="Demand Index" />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        )}
                                    </div>

                                    {/* Gate overlay */}
                                    {!emailUnlocked && (
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            zIndex: 10,
                                        }}>
                                            <div style={{
                                                background: 'white',
                                                padding: '2rem',
                                                borderRadius: '1.5rem',
                                                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                                                maxWidth: '380px',
                                                textAlign: 'center',
                                                border: '1px solid #e2e8f0',
                                            }}>
                                                <Lock size={28} style={{ color: 'var(--color-primary)', marginBottom: '0.75rem' }} />
                                                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.4rem' }}>Unlock Seasonal Insights</h4>
                                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                                                    Enter your email to see month-by-month projections and download a PDF report.
                                                </p>
                                                <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder="you@email.com"
                                                        value={leadEmail}
                                                        onChange={(e) => setLeadEmail(e.target.value)}
                                                        style={{
                                                            flex: 1,
                                                            padding: '0.7rem 1rem',
                                                            borderRadius: '0.75rem',
                                                            border: '1.5px solid #e2e8f0',
                                                            fontSize: '0.85rem',
                                                            outline: 'none',
                                                        }}
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={emailSubmitting}
                                                        className="btn btn-gradient"
                                                        style={{
                                                            padding: '0.7rem 1.25rem',
                                                            fontSize: '0.85rem',
                                                            borderRadius: '0.75rem',
                                                            whiteSpace: 'nowrap',
                                                            opacity: emailSubmitting ? 0.7 : 1,
                                                        }}
                                                    >
                                                        {emailSubmitting ? '...' : 'Unlock'}
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        </div>
                    </section>

                    {/* ===== 6. BOTTOM CTA ===== */}
                    <section style={{
                        background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
                        padding: '4rem 0',
                    }}>
                        <div className="container" style={{ textAlign: 'center' }}>
                            <ScrollReveal>
                                <h2 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                    fontWeight: 700,
                                    color: 'white',
                                    marginBottom: '0.75rem',
                                }}>
                                    Want this exact performance?
                                </h2>
                                <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
                                    Get a verified audit from our revenue management team.
                                </p>
                                <Link
                                    href={`/contact?type=owner&loc=${selectedCity}&rev=${displayGross}`}
                                    className="btn btn-gradient"
                                    style={{
                                        padding: '1rem 2.5rem',
                                        fontSize: '1.05rem',
                                        fontWeight: 700,
                                        borderRadius: '999px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 8px 30px rgba(254,88,88,0.3)',
                                    }}
                                >
                                    Get Verified Property Audit <ArrowRight size={18} />
                                </Link>
                            </ScrollReveal>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
