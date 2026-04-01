'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Home, Building2, TreePine, House, Hotel, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const propertyTypes = [
    { label: 'Villa', icon: <Home size={18} /> },
    { label: 'Farmhouse', icon: <TreePine size={18} /> },
    { label: 'Apartment', icon: <Building2 size={18} /> },
    { label: 'Cottage', icon: <House size={18} /> },
    { label: 'Boutique Home', icon: <Hotel size={18} /> },
];

const bedroomOptions = ['1', '2', '3', '4', '5', '6', '7', '8+'];

const serviceOptions = [
    { value: 'SmartStart', label: 'SmartStart — New host onboarding' },
    { value: 'ChannelPro', label: 'ChannelPro — OTA channel management' },
    { value: 'HybridCore', label: 'Hybrid Core — OTA + Direct bookings' },
    { value: 'TotalCare360', label: 'TotalCare360 — Complete management (villas/farmhouses)' },
    { value: 'StayPrime', label: 'StayPrime — Complete management (apartments)' },
    { value: 'NotSure', label: 'Not Sure — Help me choose' },
];

const revenueOptions = [
    'Not earning yet',
    'Under ₹1 Lakh',
    '₹1-3 Lakhs',
    '₹3-5 Lakhs',
    '₹5 Lakhs+',
];

const PropertyLeadWizard = ({ source = 'homepage', prefilledCity = '' }) => {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: prefilledCity || '',
        propertyType: '',
        bedrooms: '',
        listedOnOTA: '',
        serviceInterest: '',
        currentRevenue: '',
        message: '',
    });

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const goNext = () => {
        setDirection(1);
        setStep(prev => prev + 1);
    };

    const goBack = () => {
        setDirection(-1);
        setStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');
        try {
            const res = await fetch('/api/property-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    source: source,
                    timestamp: new Date().toISOString(),
                }),
            });
            if (!res.ok) throw new Error('Submission failed');
            setDirection(1);
            setStep(4);
        } catch (err) {
            setError('Something went wrong. Please try again or contact us on WhatsApp.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetWizard = () => {
        setFormData({
            name: '',
            phone: '',
            email: '',
            city: prefilledCity || '',
            propertyType: '',
            bedrooms: '',
            listedOnOTA: '',
            serviceInterest: '',
            currentRevenue: '',
            message: '',
        });
        setStep(1);
        setDirection(-1);
        setError('');
    };

    const isStep1Valid = formData.name && formData.phone && formData.email;
    const isStep2Valid = formData.city && formData.propertyType && formData.bedrooms && formData.listedOnOTA;
    const isStep3Valid = formData.serviceInterest;

    const inputStyle = {
        width: '100%',
        padding: '0.875rem 1rem',
        borderRadius: '0.75rem',
        border: '2px solid #e2e8f0',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        fontFamily: 'inherit',
        background: '#fff',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#334155',
        marginBottom: '0.5rem',
        textAlign: 'left',
    };

    const chipStyle = (isSelected) => ({
        padding: '0.5rem 1rem',
        borderRadius: '2rem',
        border: `2px solid ${isSelected ? '#FE5858' : '#e2e8f0'}`,
        background: isSelected ? '#FE5858' : '#fff',
        color: isSelected ? '#fff' : '#334155',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: 600,
        transition: 'all 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
    });

    const btnPrimary = {
        padding: '0.8rem 2rem',
        borderRadius: '0.75rem',
        background: '#FE5858',
        color: '#fff',
        border: 'none',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        justifyContent: 'center',
        minWidth: '140px',
        transition: 'opacity 0.2s',
    };

    const btnSecondary = {
        padding: '0.8rem 1.5rem',
        borderRadius: '0.75rem',
        background: '#f8fafc',
        color: '#334155',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
    };

    const progressDots = (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            {[1, 2, 3].map(s => (
                <div key={s} style={{
                    width: step >= 4 ? '40px' : '40px',
                    height: '6px',
                    borderRadius: '3px',
                    background: s <= (step >= 4 ? 3 : step) ? '#FE5858' : '#e2e8f0',
                    transition: 'background 0.3s',
                }} />
            ))}
        </div>
    );

    const slideVariants = {
        enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: 800,
                textAlign: 'center',
                marginBottom: '1.5rem',
                color: '#0f172a',
            }}>
                List Your Property
            </h2>

            <div style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '2rem',
                padding: isMobile ? '2rem 1.5rem' : '3rem',
                boxShadow: 'var(--shadow-premium)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: isMobile ? '420px' : '460px',
            }}>
                {step < 4 && progressDots}

                <AnimatePresence mode="wait" custom={direction}>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem', textAlign: 'center', color: '#0f172a' }}>
                                Let&apos;s start with your details
                            </h3>
                            <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
                                We&apos;ll use this to get in touch with you.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '440px', margin: '0 auto' }}>
                                <div>
                                    <label style={labelStyle}>Full Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={e => updateField('name', e.target.value)}
                                        style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = '#FE5858'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Phone Number *</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={e => updateField('phone', e.target.value)}
                                        style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = '#FE5858'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Email Address *</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={e => updateField('email', e.target.value)}
                                        style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = '#FE5858'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                <button
                                    onClick={goNext}
                                    disabled={!isStep1Valid}
                                    style={{ ...btnPrimary, opacity: isStep1Valid ? 1 : 0.5, cursor: isStep1Valid ? 'pointer' : 'not-allowed' }}
                                >
                                    Next <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem', textAlign: 'center', color: '#0f172a' }}>
                                Tell us about your property
                            </h3>
                            <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
                                This helps us tailor the right plan for you.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '440px', margin: '0 auto' }}>
                                <div>
                                    <label style={labelStyle}>Property Location / City *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Gurgaon, Manali, Jaipur"
                                        value={formData.city}
                                        onChange={e => updateField('city', e.target.value)}
                                        style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = '#FE5858'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Property Type *</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {propertyTypes.map(pt => (
                                            <button
                                                key={pt.label}
                                                type="button"
                                                onClick={() => updateField('propertyType', pt.label)}
                                                style={chipStyle(formData.propertyType === pt.label)}
                                            >
                                                {pt.icon} {pt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>Number of Bedrooms *</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {bedroomOptions.map(num => (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => updateField('bedrooms', num)}
                                                style={{
                                                    ...chipStyle(formData.bedrooms === num),
                                                    minWidth: '42px',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>Currently listed on any OTA? *</label>
                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        {['Yes', 'No'].map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => updateField('listedOnOTA', opt)}
                                                style={{
                                                    ...chipStyle(formData.listedOnOTA === opt),
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    padding: '0.6rem 1rem',
                                                }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
                                <button onClick={goBack} style={btnSecondary}>
                                    <ArrowLeft size={18} /> Back
                                </button>
                                <button
                                    onClick={goNext}
                                    disabled={!isStep2Valid}
                                    style={{ ...btnPrimary, opacity: isStep2Valid ? 1 : 0.5, cursor: isStep2Valid ? 'pointer' : 'not-allowed' }}
                                >
                                    Next <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem', textAlign: 'center', color: '#0f172a' }}>
                                What are you looking for?
                            </h3>
                            <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
                                Almost done! Just a few more details.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '440px', margin: '0 auto' }}>
                                <div>
                                    <label style={labelStyle}>Which service interests you? *</label>
                                    <select
                                        value={formData.serviceInterest}
                                        onChange={e => updateField('serviceInterest', e.target.value)}
                                        style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
                                        onFocus={e => e.target.style.borderColor = '#FE5858'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    >
                                        <option value="">Select a service</option>
                                        {serviceOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={labelStyle}>Current monthly revenue from property</label>
                                    <select
                                        value={formData.currentRevenue}
                                        onChange={e => updateField('currentRevenue', e.target.value)}
                                        style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
                                        onFocus={e => e.target.style.borderColor = '#FE5858'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    >
                                        <option value="">Select (optional)</option>
                                        {revenueOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={labelStyle}>Any message</label>
                                    <textarea
                                        placeholder="Any special requirements or questions?"
                                        rows={3}
                                        value={formData.message}
                                        onChange={e => updateField('message', e.target.value)}
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                        onFocus={e => e.target.style.borderColor = '#FE5858'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div style={{
                                    background: '#fef2f2',
                                    color: '#dc2626',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.9rem',
                                    textAlign: 'center',
                                    marginTop: '1rem',
                                    maxWidth: '440px',
                                    margin: '1rem auto 0',
                                }}>
                                    {error}
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
                                <button onClick={goBack} disabled={isSubmitting} style={btnSecondary}>
                                    <ArrowLeft size={18} /> Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isStep3Valid || isSubmitting}
                                    style={{
                                        ...btnPrimary,
                                        opacity: (isStep3Valid && !isSubmitting) ? 1 : 0.5,
                                        cursor: (isStep3Valid && !isSubmitting) ? 'pointer' : 'not-allowed',
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span style={{
                                                width: '18px',
                                                height: '18px',
                                                border: '3px solid rgba(255,255,255,0.3)',
                                                borderTopColor: '#fff',
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                animation: 'plw-spin 1s linear infinite',
                                            }} />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>Submit <ArrowRight size={18} /></>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                <CheckCircle size={64} color="#22c55e" strokeWidth={1.5} />
                            </div>
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                                Thank You!
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                                Our team will reach out to you within 24 hours.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '360px', margin: '0 auto' }}>
                                <a
                                    href="https://wa.me/919560493335?text=Hi, I just submitted my property details on Hostizzy. Looking forward to connecting!"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        padding: '0.8rem 1.5rem',
                                        borderRadius: '0.75rem',
                                        background: '#25D366',
                                        color: '#fff',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        textDecoration: 'none',
                                        transition: 'opacity 0.2s',
                                    }}
                                >
                                    <MessageCircle size={20} /> Want to talk now? Chat on WhatsApp
                                </a>

                                <Link
                                    href="/calculator"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.4rem',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '0.75rem',
                                        background: '#f8fafc',
                                        border: '1px solid #e2e8f0',
                                        color: '#334155',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Try our Revenue Calculator <ArrowRight size={16} />
                                </Link>

                                <button
                                    onClick={resetWizard}
                                    style={{
                                        padding: '0.65rem 1.5rem',
                                        borderRadius: '0.75rem',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#FE5858',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '3px',
                                    }}
                                >
                                    Submit Another
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <style>{`
                    @keyframes plw-spin { to { transform: rotate(360deg); } }
                `}</style>
            </div>
        </div>
    );
};

export default PropertyLeadWizard;
