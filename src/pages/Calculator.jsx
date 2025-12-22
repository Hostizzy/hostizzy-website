import React, { useState } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { IndianRupee, MapPin, Home, Users, Check, TrendingUp, Calendar, ArrowRight, Star, PieChart, BarChart3, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

    // --- CALCULATION ENGINE (useMemo for valid derived state) ---
    const metrics = React.useMemo(() => {
        const cityData = marketData[selectedCity] || marketData['Manali'];

        // 1. Multipliers
        const typeMult = propertyType === 'villa' ? 1.5 : (propertyType === 'farmhouse' ? 1.3 : 1.0);
        const bedMult = 1 + (bedrooms - 1) * 0.3; // +30% per extra room
        const finishMult = finishes === 'luxury' ? 1.25 : (finishes === 'premium' ? 1.1 : 1.0);

        // 2. Core Metrics
        const avgNightlyRate = Math.round(cityData.base * typeMult * bedMult * finishMult);
        const annualOccupancy = cityData.occ + (finishes === 'luxury' ? 5 : 0); // Luxury gets better occ
        const daysBooked = 365 * (annualOccupancy / 100);

        // 3. Revenue
        const grossRev = avgNightlyRate * daysBooked;

        // 4. Net Income Breakdown (Estimates)
        const hostizzyFee = grossRev * 0.20; // 20%
        const otaCommission = grossRev * 0.15; // 15% (Airbnb/Booking)
        const opsCost = grossRev * 0.12; // 12% (Utilities, Cleaning Supplies, Maintenance)
        const totalExpenses = hostizzyFee + otaCommission + opsCost;
        const net = grossRev - totalExpenses;

        return {
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
            }
        };

    }, [selectedCity, propertyType, bedrooms, finishes]);


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

            <section className="bg-secondary" style={{ padding: '6rem 0 3rem' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <div className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                <TrendingUp size={14} /> Market Intelligence Tool
                            </div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Investment Potential Analysis</h1>
                            <p style={{ color: '#64748b' }}>Data-driven insights for 20+ top Indian leisure markets.</p>
                        </div>
                    </ScrollReveal>

                    <div className="card shadow-premium" style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem' }}>

                        {/* CONTROLS ROW */}
                        <div className="grid desktop-4-col" style={{ gap: '1.5rem', alignItems: 'end', paddingBottom: '2rem', borderBottom: '1px solid #f1f5f9' }}>
                            <div>
                                <label className="label-strong">Market</label>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-primary)' }} />
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
                                <div className="card bg-secondary" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>Market Grade</div>
                                    <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>{metrics.marketGrade}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>Based on demand stability</div>
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

                                <div className="card bg-primary text-white" style={{ padding: '2rem', marginTop: 'auto' }}>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Projected Net Income (NOI)</div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>₹{metrics.netIncome.toLocaleString()}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Does not include taxes</div>
                                </div>
                            </div>

                            {/* COL 2: FINANCIAL BREAKDOWN */}
                            <div className="card border-light" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <IndianRupee size={18} /> Financial Breakdown
                                </h3>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                                        <span>Gross Revenue</span>
                                        <span>₹{metrics.grossRevenue.toLocaleString()}</span>
                                    </div>
                                    <div style={{ height: '8px', width: '100%', background: '#e2e8f0', borderRadius: '4px' }}>
                                        <div style={{ height: '100%', width: '100%', background: '#22c55e', borderRadius: '4px' }}></div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <ExpenseItem label="Hostizzy Mgmt (20%)" amount={metrics.breakdown?.fee} color="#3b82f6" />
                                    <ExpenseItem label="OTA Commissions (15%)" amount={metrics.breakdown?.ota} color="#f59e0b" />
                                    <ExpenseItem label="Ops & Maintenance (12%)" amount={metrics.breakdown?.ops} color="#ef4444" />
                                </div>

                                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                                        <span>Net Operating Income</span>
                                        <span>₹{metrics.netIncome.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* COL 3: SEASONALITY */}
                            <div className="card border-light" style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={18} /> Seasonality Curve
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '6px' }}>
                                    {metrics.seasonality.map((val, i) => (
                                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${val}%` }}
                                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                                style={{
                                                    width: '100%',
                                                    background: val > 80 ? '#22c55e' : (val > 50 ? '#3b82f6' : '#cbd5e1'),
                                                    borderRadius: '4px 4px 0 0',
                                                    opacity: 0.8
                                                }}
                                            />
                                            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
                                    <Info size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                    <strong>{selectedCity}</strong> experiences {metrics.seasonality.filter(x => x > 80).length} peak months. Revenue strategy adjusts pricing dynamically during these windows.
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
                                Get Verified Property Audit <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
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
