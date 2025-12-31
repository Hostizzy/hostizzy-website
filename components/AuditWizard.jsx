'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, TrendingUp, Home, MapPin, Bed, Calculator } from 'lucide-react';

const steps = [
    {
        id: 'start',
        title: 'Free Property Audit',
        subtitle: 'Our AI analyzes your property to predict its true earning potential.',
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
        subtitle: 'Our algorithm has processed your data.',
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

    const handleNext = () => {
        if (currentStep === steps.length - 2) {
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setCurrentStep(prev => prev + 1);
            }, 2000);
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
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#166534', marginBottom: '0.5rem' }}>Predicted Annual Revenue</div>
                            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#15803d', letterSpacing: '-1px' }}>₹ 18L - 24L</div>
                            <p style={{ color: '#166534', marginTop: '1rem', opacity: 0.8 }}>We've sent a detailed breakdown to {formData.email}.</p>
                            <button className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }} onClick={() => setCurrentStep(0)}>Run Another Audit</button>
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
