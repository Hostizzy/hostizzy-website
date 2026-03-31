'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, TrendingUp, Home, MapPin, Bed, Calculator } from 'lucide-react';

const steps = [
    {
        id: 'start',
        title: 'Free Property Audit',
        subtitle: 'Get an AI-powered estimate of your property\'s earning potential.',
        icon: <Calculator size={48} className="text-primary" />
    },
    {
        id: 'location',
        title: 'Where is it?',
        subtitle: 'Market demand varies significantly by region.',
        field: 'location',
        type: 'text',
        placeholder: 'e.g. Goa, Manali, Alibaug',
        icon: <MapPin size={32} />
    },
    {
        id: 'type',
        title: 'Property Type',
        subtitle: 'This helps us benchmark against similar listings.',
        field: 'type',
        type: 'select',
        options: ['Villa / Independent Home', 'Apartment / Condo', 'Boutique Hotel', 'Farmhouse'],
        icon: <Home size={32} />
    },
    {
        id: 'bedrooms',
        title: 'Inventory',
        subtitle: 'Size is the biggest factor in revenue potential.',
        field: 'bedrooms',
        type: 'number',
        placeholder: 'Number of Bedrooms',
        icon: <Bed size={32} />
    },
    {
        id: 'contact',
        title: 'Almost there!',
        subtitle: 'Where should we send your detailed report?',
        field: 'email',
        type: 'email',
        placeholder: 'Your Email Address',
        icon: <TrendingUp size={32} />
    },
    {
        id: 'result',
        title: 'Audit Complete!',
        subtitle: 'Here\'s what our AI estimates for your property.',
        icon: <CheckCircle2 size={64} className="text-green-500" />
    }
];

const AuditWizard = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({ location: '', type: '', bedrooms: '', email: '' });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [aiResult, setAiResult] = useState(null);

    const handleNext = async () => {
        if (currentStep === steps.length - 2) {
            setIsProcessing(true);
            try {
                // Map property type for API
                const typeMap = { 'Villa / Independent Home': 'villa', 'Apartment / Condo': 'apartment', 'Boutique Hotel': 'villa', 'Farmhouse': 'farmhouse' };
                const res = await fetch('/api/ai-estimate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        city: formData.location,
                        propertyType: typeMap[formData.type] || 'villa',
                        bedrooms: parseInt(formData.bedrooms) || 3,
                        finishLevel: 'premium'
                    })
                });
                const data = await res.json();
                if (data.grossRevenue) {
                    setAiResult(data);
                }
            } catch (err) {
                console.error('AI estimate error:', err);
            }
            // Also capture lead
            try {
                await fetch('/api/calculator-leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, city: formData.location, propertyType: formData.type, bedrooms: formData.bedrooms, source: 'audit-wizard' })
                });
            } catch (err) { /* ignore */ }
            setIsProcessing(false);
            setCurrentStep(prev => prev + 1);
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => setCurrentStep(prev => prev - 1);

    const step = steps[currentStep];

    return (
        <div className="card shadow-premium" style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: isMobile ? '2rem 1.5rem' : '3rem',
            borderRadius: isMobile ? '1.5rem' : '2rem',
            background: 'white',
            minHeight: isMobile ? '400px' : '450px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ textAlign: 'center' }}
                >
                    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', color: 'var(--color-primary)' }}>
                        {step.icon}
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{step.title}</h2>
                    <p style={{ color: 'var(--color-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>{step.subtitle}</p>

                    {step.field && (
                        <div style={{ maxWidth: '400px', margin: '0 auto 2.5rem' }}>
                            {step.type === 'select' ? (
                                <select
                                    className="form-input"
                                    value={formData[step.field]}
                                    onChange={(e) => setFormData({ ...formData, [step.field]: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '2px solid #f1f5f9', fontSize: '1rem' }}
                                >
                                    <option value="">Select an option</option>
                                    {step.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            ) : (
                                <input
                                    type={step.type}
                                    placeholder={step.placeholder}
                                    className="form-input"
                                    value={formData[step.field]}
                                    onChange={(e) => setFormData({ ...formData, [step.field]: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '2px solid #f1f5f9', fontSize: '1rem' }}
                                />
                            )}
                        </div>
                    )}

                    {currentStep === steps.length - 1 ? (
                        <div style={{ padding: '2rem', backgroundColor: '#f0fdf4', borderRadius: '1.5rem', marginTop: '1rem' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#166534', marginBottom: '0.5rem' }}>
                                {aiResult ? '✨ AI-Powered Estimate' : 'Predicted Annual Revenue'}
                            </div>
                            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#15803d', letterSpacing: '-1px' }}>
                                {aiResult ? `₹ ${(aiResult.grossRevenue / 100000).toFixed(1)}L` : '₹ 18L - 24L'}
                            </div>
                            {aiResult && (
                                <div style={{ fontSize: '1rem', color: '#166534', marginTop: '0.5rem', opacity: 0.9 }}>
                                    Net Income: ₹ {(aiResult.netIncome / 100000).toFixed(1)}L/year · ADR: ₹{aiResult.adr?.toLocaleString()}
                                </div>
                            )}
                            {aiResult?.marketInsight && (
                                <p style={{ color: '#334155', marginTop: '1rem', fontSize: '0.9rem', lineHeight: 1.6, textAlign: 'left', background: 'white', padding: '1rem', borderRadius: '0.75rem' }}>
                                    💡 {aiResult.marketInsight}
                                </p>
                            )}
                            <a href="/calculator" className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                                View Detailed Analysis →
                            </a>
                            <button className="btn" style={{ marginTop: '0.5rem', width: '100%', background: '#f8fafc' }} onClick={() => { setCurrentStep(0); setAiResult(null); }}>Run Another Audit</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            {currentStep > 0 && (
                                <button onClick={handleBack} className="btn" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ArrowLeft size={18} /> Back
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                disabled={isProcessing || (step.field && !formData[step.field])}
                                className="btn btn-primary"
                                style={{ padding: '0.75rem 2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '160px', justifyContent: 'center' }}
                            >
                                {isProcessing ? (
                                    <span className="loader" style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>
                                ) : (
                                    <> {currentStep === 0 ? 'Start Audit' : 'Continue'} <ArrowRight size={18} /> </>
                                )}
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div style={{ position: 'absolute', bottom: '1.5rem', left: '0', width: '100%', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    {steps.slice(0, -1).map((_, i) => (
                        <div key={i} style={{ width: '30px', height: '4px', borderRadius: '2px', background: i <= currentStep ? 'var(--color-primary)' : '#f1f5f9', transition: 'all 0.3s' }} />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AuditWizard;
