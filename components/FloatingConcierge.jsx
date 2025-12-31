'use client';
import React, { useState } from 'react';
import { MessageSquare, X, Send, User, Home, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingConcierge = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1); // 1: Categories, 2: Message/Action
    const [category, setCategory] = useState(null);

    const categories = [
        { id: 'owner', label: 'List my Property', icon: <Home size={18} />, sub: 'Become a Partner' },
        { id: 'guest', label: 'Book a Stay', icon: <User size={18} />, sub: 'Guest Concierge' },
        { id: 'support', label: 'General Help', icon: <HelpCircle size={18} />, sub: 'Support Desk' }
    ];

    const reset = () => {
        setIsOpen(false);
        setStep(1);
        setCategory(null);
    };

    const handleAction = (message) => {
        const phone = '919560493335';
        const context = category ? `[${category.label}] ` : '';
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(context + (message || 'Hello, I need assistance.'))}`, '_blank');
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            marginBottom: '1.2rem',
                            padding: '1.5rem',
                            borderRadius: '1.5rem',
                            width: '320px',
                            background: 'white',
                            boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.2)',
                            border: '1px solid #f1f5f9'
                        }}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <h4 style={{ fontWeight: 800, margin: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Sparkles size={16} color="var(--color-primary)" /> Concierge Desk
                                </h4>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Typically replies in 2 mins</div>
                            </div>
                            <button onClick={reset} style={{ border: 'none', background: '#f8fafc', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={14} /></button>
                        </div>

                        {step === 1 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.5rem' }}>How can we assist you today?</p>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setCategory(cat);
                                            setStep(2);
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '1rem',
                                            borderRadius: '1rem',
                                            border: '1px solid #f1f5f9',
                                            background: '#f8fafc',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            textAlign: 'left'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ color: 'var(--color-primary)' }}>{cat.icon}</div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>{cat.label}</div>
                                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{cat.sub}</div>
                                            </div>
                                        </div>
                                        <ArrowRight size={14} color="#94a3b8" />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <button
                                    onClick={() => setStep(1)}
                                    style={{ border: 'none', background: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', marginBottom: '1rem', padding: 0 }}
                                >
                                    ← Back to options
                                </button>
                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{category.label}</div>
                                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Starting a secure conversation with our specialist...</p>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <textarea
                                        autoFocus
                                        placeholder="Type your message..."
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '0.9rem',
                                            minHeight: '100px',
                                            resize: 'none',
                                            marginBottom: '0.8rem',
                                            fontFamily: 'inherit'
                                        }}
                                        id="concierge-msg"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleAction(e.target.value);
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={() => handleAction(document.getElementById('concierge-msg').value)}
                                        className="btn btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            borderRadius: '0.75rem',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Start Secure Chat <Send size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    background: '#1e293b',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px -5px rgba(30, 41, 59, 0.4)',
                    border: '2px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer'
                }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} style={{ color: 'var(--color-primary)' }} />}
            </motion.button>
        </div>
    );
};

export default FloatingConcierge;
