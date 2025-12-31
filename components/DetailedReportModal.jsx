'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X as LucideX, Mail as LucideMail, CheckCircle as LucideCheckCircle, ArrowRight as LucideArrowRight, Lock as LucideLock, FileText as LucideFileText, BarChart as LucideBarChart, ShieldCheck as LucideShieldCheck } from 'lucide-react';

const DetailedReportModal = ({ isOpen, onClose, onSubmit, city, propertyType }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        await onSubmit(email);
        setIsSubmitting(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="card bg-white"
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            padding: '2.5rem',
                            borderRadius: '2rem',
                            position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: '#f1f5f9',
                                border: 'none',
                                borderRadius: '50%',
                                padding: '0.5rem',
                                cursor: 'pointer',
                                color: '#64748b'
                            }}
                        >
                            <LucideX size={20} />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                background: 'rgba(254, 88, 88, 0.1)',
                                borderRadius: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'var(--color-primary)'
                            }}>
                                <LucideLock size={32} style={{ margin: 'auto' }} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
                                Unlock Full Performance Report
                            </h2>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                                Get 12-month projections and seasonal demand breakdown for your property in <strong>{city}</strong>.
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569' }}>
                                    <div style={{ color: '#10b981' }}><LucideCheckCircle size={18} /></div>
                                    <span style={{ fontSize: '0.9rem' }}>Detailed seasonal revenue heatmap</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569' }}>
                                    <div style={{ color: '#10b981' }}><LucideCheckCircle size={18} /></div>
                                    <span style={{ fontSize: '0.9rem' }}>Month-by-month occupancy projections</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569' }}>
                                    <div style={{ color: '#10b981' }}><LucideCheckCircle size={18} /></div>
                                    <span style={{ fontSize: '0.9rem' }}>Comprehensive expense breakdown audit</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                                    Business Email Address
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <LucideMail size={18} style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8'
                                    }} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem 0.875rem 3rem',
                                            borderRadius: '1rem',
                                            border: '1.5px solid #e2e8f0',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                        className="form-input-focus"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '1rem',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isSubmitting ? 'Generating Report...' : (
                                    <>Access Full Analysis <LucideArrowRight size={18} /></>
                                )}
                            </button>
                        </form>

                        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                            <LucideShieldCheck size={14} /> Built on verified market data from 2,500+ properties.
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DetailedReportModal;
