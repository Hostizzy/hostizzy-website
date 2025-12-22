import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, MapPin, Home, Users } from 'lucide-react';

// Basic Multipliers based on Location (Mock Logic for Estimation)
const locationMultipliers = {
    'Manali': 1.0,
    'Goa': 1.2,
    'Jaipur': 0.9,
    'Mukteshwar': 0.85,
    'Shimla': 1.0,
    'Delhi': 1.1
};

const EarningsCalculator = () => {
    const [location, setLocation] = useState('Manali');
    const [bedrooms, setBedrooms] = useState(2);
    const [occupancy, setOccupancy] = useState(60); // Percentage
    const [nightlyRate, setNightlyRate] = useState(8000);


    const annualRevenue = React.useMemo(() => {

        // Bedroom multiplier (each extra bedroom adds ~20% value)
        const bedroomMultiplier = 1 + (bedrooms - 1) * 0.2;

        const rawRevenue = (nightlyRate * 365 * (occupancy / 100)) * bedroomMultiplier;
        return Math.round(rawRevenue);
    }, [location, bedrooms, occupancy, nightlyRate]);

    return (
        <div className="card shadow-premium" style={{ padding: '2.5rem', background: 'white' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>How much could you earn?</h2>
                <p style={{ color: 'var(--color-muted)' }}>Estimate your potential earnings with Hostizzy management.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Location */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.95rem' }}>Property Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary)', zIndex: 2 }} />
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.9rem 1rem 0.9rem 3rem',
                                    borderRadius: '1rem',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '1rem',
                                    appearance: 'none',
                                    background: 'var(--color-secondary)',
                                    cursor: 'pointer',
                                    fontWeight: 500
                                }}
                            >
                                {Object.keys(locationMultipliers).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Bedroom Count (Slider) */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>Bedrooms</label>
                            <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{bedrooms} BHK</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="6"
                            step="1"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(parseInt(e.target.value))}
                            style={{
                                width: '100%',
                                accentColor: 'var(--color-primary)',
                                height: '6px',
                                borderRadius: '3px',
                                appearance: 'none',
                                background: 'var(--color-border)'
                            }}
                        />
                    </div>

                    {/* Occupancy (Slider) */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>Expected Occupancy</label>
                            <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{occupancy}%</span>
                        </div>
                        <input
                            type="range"
                            min="30"
                            max="90"
                            step="5"
                            value={occupancy}
                            onChange={(e) => setOccupancy(parseInt(e.target.value))}
                            style={{
                                width: '100%',
                                accentColor: 'var(--color-primary)',
                                height: '6px',
                                borderRadius: '3px',
                                appearance: 'none',
                                background: 'var(--color-border)'
                            }}
                        />
                    </div>

                    {/* Nightly Rate (Slider) */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>Avg. Nightly Rate</label>
                            <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₹{nightlyRate.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min="2000"
                            max="50000"
                            step="1000"
                            value={nightlyRate}
                            onChange={(e) => setNightlyRate(parseInt(e.target.value))}
                            style={{
                                width: '100%',
                                accentColor: 'var(--color-primary)',
                                height: '6px',
                                borderRadius: '3px',
                                appearance: 'none',
                                background: 'var(--color-border)'
                            }}
                        />
                    </div>

                </div>

                {/* Result Display */}
                <div style={{
                    background: 'linear-gradient(135deg, #FFF1F1 0%, #FFF 100%)',
                    borderRadius: '2rem',
                    padding: '3rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    border: '1px solid rgba(254, 88, 88, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ fontSize: '1rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>Potential Annual Revenue</div>
                    <motion.div
                        key={annualRevenue}
                        initial={{ scale: 0.9, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: 'var(--color-primary)' }}
                    >
                        ₹{(annualRevenue).toLocaleString()}
                    </motion.div>

                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '1.5rem' }}>
                        Estimate based on <strong>{location}</strong> market data with professional Hostizzy management.
                    </div>

                    <a href="#contact" className="btn btn-primary" style={{ marginTop: '2.5rem', width: '100%', padding: '1.1rem' }}>
                        Get Free Property Audit
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EarningsCalculator;
