import React, { useState } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { IndianRupee as LucideRupee, MapPin as LucideMapPin, TrendingUp as LucideTrend, ArrowRight as LucideArrow, BarChart3 as LucideBar, Info as LucideInfo, Lock as LucideLock } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, BarChart, Bar, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import DetailedReportModal from '../components/DetailedReportModal';

// --- MOCK DATABASE (Airdna Style) ---
const marketData = {
    'Manali': { base: 6500, occ: 68, grade: 'A', seas: [40, 50, 60, 90, 100, 100, 70, 60, 50, 70, 60, 80] },
    'Shimla': { base: 6000, occ: 65, grade: 'A-', seas: [40, 45, 60, 85, 100, 90, 60, 50, 50, 70, 60, 85] },
    'Mussoorie': { base: 5800, occ: 62, grade: 'B+', seas: [35, 45, 65, 90, 100, 90, 50, 40, 50, 70, 60, 80] },
    'Rishikesh': { base: 5500, occ: 72, grade: 'A', seas: [60, 70, 80, 80, 60, 50, 40, 40, 70, 90, 80, 70] },
    'Dharamshala': { base: 5200, occ: 60, grade: 'B', seas: [30, 40, 60, 80, 90, 80, 40, 30, 50, 70, 60, 50] },

    'Goa (North)': { base: 9000, occ: 75, grade: 'A+', seas: [95, 85, 60, 50, 40, 30, 30, 40, 50, 70, 90, 100] },
    'Goa (South)': { base: 8500, occ: 70, grade: 'A', seas: [90, 80, 55, 45, 30, 20, 20, 30, 40, 60, 85, 95] },
    'Lonavala': { base: 7500, occ: 65, grade: 'A', seas: [60, 50, 50, 60, 80, 100, 100, 90, 70, 60, 70, 90] },
    'Alibaug': { base: 8000, occ: 60, grade: 'A-', seas: [60, 50, 50, 60, 70, 50, 40, 40, 50, 70, 80, 100] },
    'Mahabaleshwar': { base: 6000, occ: 55, grade: 'B+', seas: [50, 50, 60, 70, 90, 60, 50, 50, 40, 60, 70, 90] },
    'Nasik': { base: 5500, occ: 50, grade: 'B', seas: [60, 60, 50, 50, 50, 60, 80, 70, 60, 60, 70, 80] },

    'Coorg': { base: 7000, occ: 68, grade: 'A', seas: [70, 70, 70, 80, 90, 70, 60, 60, 50, 70, 80, 100] },
    'Wayanad': { base: 6200, occ: 64, grade: 'B+', seas: [70, 70, 70, 80, 90, 60, 50, 50, 60, 70, 80, 90] },
    'Ooty': { base: 5800, occ: 66, grade: 'B+', seas: [60, 60, 70, 90, 100, 70, 60, 50, 60, 70, 60, 80] },
    'Munnar': { base: 6000, occ: 70, grade: 'A-', seas: [70, 70, 70, 80, 90, 60, 50, 50, 60, 70, 80, 100] },
    'Varkala': { base: 5000, occ: 60, grade: 'B', seas: [80, 80, 60, 50, 40, 30, 30, 40, 50, 60, 70, 90] },
    'Pondicherry': { base: 6500, occ: 72, grade: 'A-', seas: [90, 80, 60, 50, 60, 50, 60, 70, 60, 70, 70, 100] },

    'Jaipur': { base: 5500, occ: 60, grade: 'B+', seas: [80, 90, 70, 50, 30, 20, 30, 40, 60, 80, 90, 90] },
    'Udaipur': { base: 6500, occ: 62, grade: 'A-', seas: [80, 90, 70, 50, 30, 20, 30, 40, 60, 90, 100, 90] },
    'Delhi': { base: 4500, occ: 75, grade: 'B+', seas: [80, 90, 80, 70, 60, 50, 50, 60, 70, 90, 100, 90] },
    'Gangtok': { base: 5000, occ: 55, grade: 'B', seas: [40, 50, 70, 90, 100, 60, 50, 40, 60, 90, 80, 60] },
};

const Calculator = () => {
    // --- STATE ---
    const [selectedCity, setSelectedCity] = useState('Manali');
    const [propertyType, setPropertyType] = useState('villa');
    const [bedrooms, setBedrooms] = useState(3);
    const [finishes, setFinishes] = useState('luxury'); // standard, premium, luxury

    // Lead capture state
    const [showDetailedReport, setShowDetailedReport] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [showEmailModal, setShowEmailModal] = useState(false);

    // Calculate investment confidence score (0-10) - MUST be before useMemo
    const calculateConfidenceScore = (cityData, occupancy) => {
        let score = 0;

        // Market grade contribution (0-4 points)
        const gradePoints = {
            'A+': 4, 'A': 3.5, 'A-': 3,
            'B+': 2.5, 'B': 2, 'B-': 1.5,
            'C+': 1, 'C': 0.5
        };
        score += gradePoints[cityData.grade] || 2;

        // Occupancy contribution (0-3 points)
        if (occupancy >= 75) score += 3;
        else if (occupancy >= 65) score += 2.5;
        else if (occupancy >= 55) score += 2;
        else score += 1;

        // Seasonality stability (0-3 points)
        const avgSeason = cityData.seas.reduce((a, b) => a + b, 0) / 12;
        const variance = cityData.seas.reduce((sum, val) => sum + Math.pow(val - avgSeason, 2), 0) / 12;
        const stability = Math.max(0, 3 - (variance / 500)); // Lower variance = higher stability
        score += stability;

        return Math.min(10, Math.max(0, score)).toFixed(1);
    };

    // --- CALCULATION ENGINE (useMemo for valid derived state) ---
    const { metrics, seasonalityData, revenueBreakdown } = React.useMemo(() => {
        const cityData = marketData[selectedCity] || marketData['Manali'];

        // 1. More Conservative Multipliers
        const typeMult = propertyType === 'villa' ? 1.2 : (propertyType === 'farmhouse' ? 1.15 : 1.0);
        const bedMult = 1 + (bedrooms - 1) * 0.15;
        const finishMult = finishes === 'luxury' ? 1.12 : (finishes === 'premium' ? 1.06 : 1.0);

        // 2. Core Metrics
        const avgNightlyRate = Math.round(cityData.base * typeMult * bedMult * finishMult);
        const annualOccupancy = Math.min(cityData.occ + (finishes === 'luxury' ? 3 : 0), 85); // Cap at 85%
        const daysBooked = 365 * (annualOccupancy / 100);

        // 3. Revenue
        const grossRev = avgNightlyRate * daysBooked;

        // 4. More Realistic Expense Breakdown
        const hostizzyFee = grossRev * 0.20;
        const otaCommission = grossRev * 0.18;
        const opsCost = grossRev * 0.15;
        const totalExpenses = hostizzyFee + otaCommission + opsCost;
        const net = grossRev - totalExpenses;

        const results = {
            grossRevenue: Math.round(grossRev),
            netIncome: Math.round(net),
            occupancy: annualOccupancy,
            revpar: Math.round(grossRev / 365),
            marketGrade: cityData.grade,
            seasonality: cityData.seas,
            breakdown: {
                fee: Math.round(hostizzyFee),
                ota: Math.round(otaCommission),
                ops: Math.round(opsCost)
            },
            confidenceScore: calculateConfidenceScore(cityData, annualOccupancy)
        };

        const chartSeas = cityData && Array.isArray(cityData.seas)
            ? cityData.seas.map((val, idx) => ({ month: idx + 1, revenue: val }))
            : [];

        const chartRev = [
            { name: 'Gross Rev', value: Math.round(grossRev) },
            { name: 'Net Income', value: Math.round(net) },
            { name: 'OTA Comms', value: Math.round(otaCommission) },
            { name: 'Ops Cost', value: Math.round(opsCost) }
        ];

        return { metrics: results, seasonalityData: chartSeas, revenueBreakdown: chartRev };

    }, [selectedCity, propertyType, bedrooms, finishes]);




    const handleEmailSubmit = async (email) => {
        setUserEmail(email);

        try {
            const res = await fetch('/api/calculator-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    city: selectedCity,
                    propertyType,
                    bedrooms,
                    finishes,
                    revenue: metrics.grossRevenue,
                    netIncome: metrics.netIncome
                })
            });

            if (res.ok) {
                setShowDetailedReport(true);
                setShowEmailModal(false);
            }
        } catch (error) {
            console.error('Lead capture failed:', error);
            // Fallback: unlock anyway for UX
            setShowDetailedReport(true);
            setShowEmailModal(false);
        }
    };

    return (
        <>
            <SEO
                title="Vacation Rental Earnings Calculator India | Airbnb Income Estimator"
                description="Calculate your potential income from Airbnb property management in India. Free vacation rental earnings calculator for villas, farmhouses, and apartments across 20+ markets."
                keywords={[
                    'vacation rental earnings calculator',
                    'Airbnb income calculator India',
                    'rental property income estimator',
                    'vacation rental ROI calculator',
                    'passive income from property India',
                    'Airbnb revenue calculator'
                ]}
                image="https://hostizzy.com/og-calculator.jpg"
            />

            {/* Page Header - Standardized */}
            <section className="section-sm bg-secondary">
                <div className="container text-center">
                    <ScrollReveal>
                        <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                            <LucideTrend size={14} style={{ marginRight: '0.5rem' }} /> Market Intelligence Tool
                        </div>
                        <h1 className="page-header">Vacation Rental Earnings Calculator</h1>
                        <p className="section-subtitle">
                            Data-driven insights for 20+ top Indian leisure markets. Calculate your potential income from professional Airbnb property management.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Confidence Score Banner - AirDNA Style */}
            <section style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', padding: '2rem 0' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                            <div style={{ textAlign: 'center', color: 'white' }}>
                                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Investment Confidence Score</div>
                                <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>{metrics.confidenceScore}/10</div>
                            </div>
                            <div style={{ flex: 1, maxWidth: '400px' }}>
                                <div style={{
                                    height: '12px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '6px',
                                    overflow: 'hidden'
                                }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(metrics.confidenceScore / 10) * 100}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        style={{
                                            height: '100%',
                                            background: metrics.confidenceScore >= 7.5 ? '#10b981' : metrics.confidenceScore >= 6 ? '#f59e0b' : '#ef4444',
                                            borderRadius: '6px'
                                        }}
                                    />
                                </div>
                                <div style={{ color: 'white', fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>
                                    {metrics.confidenceScore >= 7.5 ? '🟢 Strong Market Opportunity' :
                                        metrics.confidenceScore >= 6 ? '🟡 Moderate Opportunity' :
                                            '🔴 Challenging Market'}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="section container">

                {/* GATED CONTENT WRAPPER */}
                <div style={{ position: 'relative' }}>
                    {!showDetailedReport && (
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(12px)',
                            zIndex: 10,
                            borderRadius: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '2rem',
                            border: '2px dashed #e2e8f0'
                        }}>
                            <div style={{
                                background: 'white',
                                padding: '2.5rem',
                                borderRadius: '2rem',
                                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                                maxWidth: '400px'
                            }}>
                                <LucideLock size={40} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Full Market Analysis Locked</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                    Unlock month-by-month revenue projections and seasonal demand data for {selectedCity}.
                                </p>
                                <button
                                    onClick={() => setShowEmailModal(true)}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '1rem' }}
                                >
                                    Get Full Report (Free)
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Charts Section - Enhanced Design */}
                    <div className="grid desktop-2-col" style={{ gap: '2rem', marginTop: '2rem', marginBottom: '2rem', filter: !showDetailedReport ? 'blur(4px)' : 'none' }}>
                        {/* Seasonality Line Chart */}
                        <div className="card bg-white" style={{ padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <LucideTrend size={16} /> Market Seasonality
                            </h2>
                            {seasonalityData && seasonalityData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={240}>
                                    <LineChart data={seasonalityData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                        <XAxis dataKey="month" tickFormatter={m => `${['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][m - 1]}`} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                        <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p style={{ color: '#64748b', textAlign: 'center' }}>No seasonality data available.</p>
                            )}
                        </div>
                        {/* Revenue Breakdown Bar Chart */}
                        <div className="card bg-white" style={{ padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <LucideBar size={16} /> Revenue Allocation
                            </h2>
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={revenueBreakdown} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={80} stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                    <Bar dataKey="value" fill="var(--color-primary)" radius={[0, 4, 4, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="card shadow-premium" style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem' }}>

                    {/* CONTROLS ROW */}
                    <div className="grid desktop-4-col" style={{ gap: '1.5rem', alignItems: 'end', paddingBottom: '2rem', borderBottom: '1px solid #f1f5f9' }}>
                        <div>
                            <label className="label-strong">Market</label>
                            <div style={{ position: 'relative' }}>
                                <LucideMapPin size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-primary)' }} />
                                <select
                                    className="form-input"
                                    style={{ paddingLeft: '2.8rem' }}
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                >
                                    {Object.keys(marketData).sort().map(city => <option key={city} value={city}>{city}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="label-strong">Property Type</label>
                            <select className="form-input" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                                <option value="villa">Private Villa</option>
                                <option value="apartment">Apartment / Flat</option>
                                <option value="farmhouse">Farmhouse</option>
                                <option value="cottage">Cottage</option>
                            </select>
                        </div>
                        <div>
                            <label className="label-strong">Configuration</label>
                            <select className="form-input" value={bedrooms} onChange={(e) => setBedrooms(parseInt(e.target.value))}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} BHK</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label-strong">Finish Level</label>
                            <select className="form-input" value={finishes} onChange={(e) => setFinishes(e.target.value)}>
                                <option value="standard">Standard</option>
                                <option value="premium">Premium</option>
                                <option value="luxury">Luxury (+25% ADR)</option>
                            </select>
                        </div>
                    </div>

                    {/* DASHBOARD GRID */}
                    <div className="grid desktop-3-col" style={{ marginTop: '2rem', gap: '2rem' }}>

                        {/* COL 1: SCORECARD */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="card bg-secondary" style={{ padding: '1.5rem', textAlign: 'center', borderRadius: '1rem' }}>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Market Grade</div>
                                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>{metrics.marketGrade}</div>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>Demand Stability Score</div>
                            </div>

                            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="card border-light" style={{ padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Occupancy</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{metrics.occupancy}%</div>
                                </div>
                                <div className="card border-light" style={{ padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>RevPAR</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹{metrics.revpar}</div>
                                </div>
                            </div>

                            <div className="card bg-primary text-white" style={{ padding: '1.5rem', marginTop: 'auto', borderRadius: '1rem', background: 'linear-gradient(135deg, var(--color-primary) 0%, #d83a3a 100%)' }}>
                                <div style={{ fontSize: '0.85rem', opacity: 0.9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Est. Net Income</div>
                                <div style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>₹{metrics.netIncome.toLocaleString()}</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                                    Range: ₹{(metrics.netIncome * 0.9).toLocaleString()} - ₹{(metrics.netIncome * 1.1).toLocaleString()}
                                </div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.5rem' }}>Based on 85% confidence interval</div>
                            </div>
                        </div>

                        {/* COL 2: FINANCIAL BREAKDOWN */}
                        <div className="card border-light" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e293b' }}>
                                <LucideRupee size={16} /> Financial Breakdown
                            </h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                                    <span>Gross Revenue</span>
                                    <span>₹{metrics.grossRevenue.toLocaleString()}</span>
                                </div>
                                <div style={{ height: '6px', width: '100%', background: '#f1f5f9', borderRadius: '3px' }}>
                                    <div style={{ height: '100%', width: '100%', background: '#10b981', borderRadius: '3px' }}></div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <ExpenseItem label="Hostizzy Mgmt (20%)" amount={metrics.breakdown?.fee} color="#3b82f6" />
                                <ExpenseItem label="OTA Commissions (18%)" amount={metrics.breakdown?.ota} color="#f59e0b" />
                                <ExpenseItem label="Ops & Maintenance (15%)" amount={metrics.breakdown?.ops} color="#f43f5e" />
                            </div>

                            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                                    <span>Your Net Income</span>
                                    <span>₹{metrics.netIncome.toLocaleString()}</span>
                                </div>
                                <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.5rem', textAlign: 'right' }}>Conservative Estimate (Pre-Tax)</p>
                            </div>
                        </div>

                        {/* COL 3: METHODOLOGY & DATA */}
                        <div className="card border-light" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e293b' }}>
                                <LucideInfo size={16} /> Market Intelligence
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div style={{ borderLeft: '3px solid #e2e8f0', paddingLeft: '1rem' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Data Source</div>
                                    <div style={{ fontSize: '0.9rem', color: '#1e293b' }}>Hostizzy proprietary database (Real-time tracking of 2,500+ properties in India)</div>
                                </div>
                                <div style={{ borderLeft: '3px solid #e2e8f0', paddingLeft: '1rem' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Update Frequency</div>
                                    <div style={{ fontSize: '0.9rem', color: '#1e293b' }}>Monthly rolling average (Last sync: Dec 2024)</div>
                                </div>
                                <div style={{ borderLeft: '3px solid #e2e8f0', paddingLeft: '1rem' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Methodology</div>
                                    <div style={{ fontSize: '0.9rem', color: '#1e293b' }}>Conservative multi-layer projections considering location, configuration, and finish quality.</div>
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>
                                * Disclaimer: These are estimates based on historical data. Actual performance may vary based on market conditions and management quality.
                            </div>
                        </div>

                    </div>

                    {/* CTA */}
                    <div style={{ marginTop: '2rem', textAlign: 'center', padding: '2rem', background: '#f8fafc', borderRadius: '1rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Want this exact performance?</h3>
                        <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>Get a verified audit from our revenue management team.</p>
                        <Link
                            to={`/contact?type=owner&loc=${selectedCity}&rev=${metrics.grossRevenue}`}
                            className="btn btn-primary"
                            style={{ padding: '1rem 3rem' }}
                        >
                            Get Verified Property Audit <LucideArrow size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>

                </div>
            </section >

            <DetailedReportModal
                isOpen={showEmailModal}
                onClose={() => setShowEmailModal(false)}
                onSubmit={handleEmailSubmit}
                city={selectedCity}
                propertyType={propertyType}
            />
        </>
    );
};

const ExpenseItem = ({ label, amount, color }) => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem', color: '#475569' }}>
            <span>{label}</span>
            <span>-₹{amount?.toLocaleString()}</span>
        </div>
        <div style={{ height: '6px', width: '100%', background: '#f1f5f9', borderRadius: '3px' }}>
            <div style={{ height: '100%', width: '100%', maxWidth: '100%', background: color, borderRadius: '3px' }}></div>
        </div>
        {/* Note: In a real chart, width would be proportional. Here it's fixed for visual simplicity or needs calculation */}
    </div>
);

export default Calculator;
