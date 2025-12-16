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
        <div className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>How much could you earn?</h2>
                <p style={{ color: '#64748b' }}>Estimate your potential earnings with Hostizzy management.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Location */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Property Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary)' }} />
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '1rem', appearance: 'none', background: 'white' }}
                            >
                                {Object.keys(locationMultipliers).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Bedroom Count (Slider) */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Bedrooms</label>
                            <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{bedrooms} BHK</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="6"
                            step="1"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                        />
                    </div>

                    {/* Occupancy (Slider) */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Expected Occupancy</label>
                            <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{occupancy}%</span>
                        </div>
                        <input
                            type="range"
                            min="30"
                            max="90"
                            step="5"
                            value={occupancy}
                            onChange={(e) => setOccupancy(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                        />
                    </div>

                    {/* Nightly Rate (Slider) */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Avg. Nightly Rate</label>
                            <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₹{nightlyRate.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min="2000"
                            max="50000"
                            step="1000"
                            value={nightlyRate}
                            onChange={(e) => setNightlyRate(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                        />
                    </div>

                </div>

                {/* Result Display */}
                <div style={{
                    background: 'var(--color-secondary)',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '1rem', color: '#64748b', marginBottom: '0.5rem' }}>Potential Annual Revenue</div>
                    <motion.div
                        key={annualRevenue}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-primary"
                        style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2 }}
                    >
                        ₹{(annualRevenue).toLocaleString()}
                    </motion.div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '1rem' }}>
                        *Estimate based on {location} market data. <br />Actual earnings may vary.
                    </div>

                    <button className="btn btn-primary" style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}>
                        Get Free Audit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EarningsCalculator;
