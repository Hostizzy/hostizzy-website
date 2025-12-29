import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Calendar, ArrowUpRight, BarChart3, PieChart } from 'lucide-react';

const ResIQPreview = () => {
    const [benchmark, setBenchmark] = useState('market'); // 'market' or 'portfolio'

    const stats = [
        { label: 'RevPAR', value: '₹14,250', growth: '+18.4%', icon: <DollarSign size={20} />, color: '#22c55e' },
        { label: 'Occupancy', value: '84.2%', growth: '+12.1%', icon: <Calendar size={20} />, color: '#3b82f6' },
        { label: 'Avg Guest Rating', value: '4.92', growth: '+0.4', icon: <Users size={20} />, color: '#f59e0b' }
    ];

    const chartData = [45, 65, 55, 85, 75, 95, 80];
    const marketData = [35, 45, 40, 60, 50, 65, 55];

    return (
        <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.25rem' }}>Portfolio Performance</h3>
                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Real-time revenue intelligence powered by ResIQ</p>
                </div>
                <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.4rem', borderRadius: '0.75rem', gap: '0.25rem' }}>
                    <button
                        onClick={() => setBenchmark('market')}
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            border: 'none',
                            borderRadius: '0.5rem',
                            background: benchmark === 'market' ? 'white' : 'transparent',
                            color: benchmark === 'market' ? '#1e293b' : '#64748b',
                            boxShadow: benchmark === 'market' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                            cursor: 'pointer'
                        }}>Market Benchmark</button>
                    <button
                        onClick={() => setBenchmark('portfolio')}
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            border: 'none',
                            borderRadius: '0.5rem',
                            background: benchmark === 'portfolio' ? 'white' : 'transparent',
                            color: benchmark === 'portfolio' ? '#1e293b' : '#64748b',
                            boxShadow: benchmark === 'portfolio' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                            cursor: 'pointer'
                        }}>Internal Avg</button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid desktop-3-col" style={{ gap: '1.5rem' }}>
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="card"
                        style={{ padding: '1.5rem', border: '1px solid #f1f5f9', background: '#fff' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ color: stat.color, background: `${stat.color}15`, padding: '0.6rem', borderRadius: '0.75rem' }}>
                                {stat.icon}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#22c55e', fontSize: '0.8rem', fontWeight: 800 }}>
                                <ArrowUpRight size={14} /> {stat.growth}
                            </div>
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1e293b', marginTop: '0.2rem' }}>{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Main Chart Simulation */}
            <div style={{ flex: 1, background: '#f8fafc', borderRadius: '1.5rem', padding: '2rem', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Revenue Trends (Weekly)</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Comparing your performance against local luxury market segment.</div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)' }}></div> Your Property
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#cbd5e1' }}></div> {benchmark === 'market' ? 'Local Market' : 'Portfolio Avg'}
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '4%', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                    {chartData.map((val, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                {/* Benchmark Bar */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${marketData[i]}%` }}
                                    style={{ width: '25%', background: '#cbd5e1', borderRadius: '4px 4px 0 0', position: 'absolute', left: '20%' }}
                                />
                                {/* Main Bar */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    style={{ width: '25%', background: 'var(--color-primary)', borderRadius: '4px 4px 0 0', position: 'absolute', right: '20%', boxShadow: '0 4px 15px rgba(254, 88, 88, 0.3)' }}
                                />
                            </div>
                            <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8' }}>W{i + 1}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Insight Bar */}
            <div style={{ padding: '1.25rem', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.15)', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: '#22c55e', color: 'white', padding: '0.5rem', borderRadius: '0.5rem' }}>
                    <BarChart3 size={18} />
                </div>
                <div style={{ fontSize: '0.85rem', color: '#166534', fontWeight: 700 }}>
                    <span style={{ fontWeight: 900 }}>AI Insight:</span> Week 4 rev-boost detected. ResIQ suggests increasing weekend premiums by 12% to capture high-intent travelers.
                </div>
            </div>
        </div>
    );
};

export default ResIQPreview;
