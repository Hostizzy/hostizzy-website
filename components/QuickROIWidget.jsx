'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, ArrowRight, IndianRupee } from 'lucide-react';

const QuickROIWidget = ({ position = 'bottom-right' }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState({
        bedrooms: '3',
        location: 'Goa'
    });
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();

        // Simple calculation logic (can be made more sophisticated)
        const baseRates = {
            'Goa': 5000,
            'Uttarakhand': 4000,
            'Himachal Pradesh': 4500,
            'Kerala': 4200,
            'Rajasthan': 3800
        };

        const bedroomMultiplier = {
            '1': 0.6,
            '2': 0.8,
            '3': 1,
            '4': 1.3,
            '5+': 1.6
        };

        const baseRate = baseRates[formData.location] || 4000;
        const multiplier = bedroomMultiplier[formData.bedrooms] || 1;
        const avgNightlyRate = baseRate * multiplier;

        // Assuming 65% occupancy and 25 days/month average
        const monthlyIncome = avgNightlyRate * 25 * 0.65;
        const yearlyIncome = monthlyIncome * 12;

        setResult({
            monthly: Math.round(monthlyIncome),
            yearly: Math.round(yearlyIncome),
            nightly: Math.round(avgNightlyRate)
        });
    };

    const positionStyles = {
        'bottom-right': { bottom: '2rem', right: '2rem' },
        'bottom-left': { bottom: '2rem', left: '2rem' },
        'top-right': { top: '6rem', right: '2rem' },
        'top-left': { top: '6rem', left: '2rem' }
    };

    return (
        <motion.div
            initial={false}
            animate={{ width: isExpanded ? '380px' : '60px', height: isExpanded ? 'auto' : '60px' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                ...positionStyles[position],
                zIndex: 900,
                backgroundColor: 'white',
                borderRadius: isExpanded ? '1.5rem' : '30px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden'
            }}
        >
            {!isExpanded ? (
                /* Collapsed State - Floating Button */
                <button
                    onClick={() => setIsExpanded(true)}
                    aria-label="Open ROI Calculator"
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #FE5858 0%, #FF8A80 100%)',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(254, 88, 88, 0.4)'
                    }}
                >
                    <Calculator size={28} color="white" />
                </button>
            ) : (
                /* Expanded State - Calculator Widget */
                <div style={{ padding: '1.5rem' }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #FE5858 0%, #FF8A80 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Calculator size={20} color="white" />
                            </div>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                margin: 0,
                                color: '#0f172a'
                            }}>
                                Quick ROI
                            </h3>
                        </div>
                        <button
                            onClick={() => {
                                setIsExpanded(false);
                                setResult(null);
                            }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#94a3b8',
                                lineHeight: 1
                            }}
                        >
                            ×
                        </button>
                    </div>

                    {!result ? (
                        /* Form */
                        <form onSubmit={handleCalculate}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: '#475569',
                                    marginBottom: '0.5rem'
                                }}>
                                    Bedrooms
                                </label>
                                <select
                                    value={formData.bedrooms}
                                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.75rem',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '0.95rem',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <option value="1">1 Bedroom</option>
                                    <option value="2">2 Bedrooms</option>
                                    <option value="3">3 Bedrooms</option>
                                    <option value="4">4 Bedrooms</option>
                                    <option value="5+">5+ Bedrooms</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: '#475569',
                                    marginBottom: '0.5rem'
                                }}>
                                    Location
                                </label>
                                <select
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.75rem',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '0.95rem',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <option value="Goa">Goa</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-gradient"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem',
                                    fontSize: '0.95rem',
                                    justifyContent: 'center'
                                }}
                            >
                                Calculate Income
                            </button>
                        </form>
                    ) : (
                        /* Results */
                        <div>
                            <div style={{
                                backgroundColor: '#f8fafc',
                                borderRadius: '1rem',
                                padding: '1.25rem',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    <TrendingUp size={20} color="#22c55e" />
                                    <span style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        color: '#22c55e',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Estimated Income
                                    </span>
                                </div>

                                <div style={{ marginBottom: '0.75rem' }}>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: '#64748b',
                                        marginBottom: '0.25rem'
                                    }}>
                                        Monthly
                                    </div>
                                    <div style={{
                                        fontSize: '1.75rem',
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        <IndianRupee size={20} />
                                        {result.monthly.toLocaleString('en-IN')}
                                    </div>
                                </div>

                                <div style={{
                                    paddingTop: '0.75rem',
                                    borderTop: '1px solid #e2e8f0'
                                }}>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: '#64748b',
                                        marginBottom: '0.25rem'
                                    }}>
                                        Yearly Potential
                                    </div>
                                    <div style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: '#0f172a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        <IndianRupee size={16} />
                                        {result.yearly.toLocaleString('en-IN')}
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                marginBottom: '1rem'
                            }}>
                                <button
                                    onClick={() => setResult(null)}
                                    className="btn btn-outline"
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Recalculate
                                </button>
                                <Link
                                    href="/calculator"
                                    className="btn btn-gradient"
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        fontSize: '0.9rem',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    Full Report
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            <p style={{
                                fontSize: '0.75rem',
                                color: '#94a3b8',
                                textAlign: 'center',
                                margin: 0
                            }}>
                                *Estimates based on market data. Actual earnings may vary.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default QuickROIWidget;
