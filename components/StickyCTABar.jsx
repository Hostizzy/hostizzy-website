'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Calculator, Phone } from 'lucide-react';

const StickyCTABar = ({
    type = 'default', // 'default', 'calculator', 'contact', 'booking'
    scrollThreshold = 500
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if user has previously dismissed this session
        const dismissed = sessionStorage.getItem('sticky-cta-dismissed');
        if (dismissed) {
            setIsDismissed(true);
        }

        const handleScroll = () => {
            if (!dismissed) {
                setIsVisible(window.scrollY > scrollThreshold);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollThreshold]);

    const handleDismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem('sticky-cta-dismissed', 'true');
    };

    const ctaContent = {
        default: {
            text: 'Ready to maximize your property revenue?',
            buttonText: 'Partner With Us',
            buttonLink: '/contact',
            icon: <ArrowRight size={20} />
        },
        calculator: {
            text: 'Curious about your earning potential?',
            buttonText: 'Try ROI Calculator',
            buttonLink: '/calculator',
            icon: <Calculator size={20} />
        },
        contact: {
            text: 'Questions? Our team is here to help!',
            buttonText: 'Get In Touch',
            buttonLink: '/contact',
            icon: <Phone size={20} />
        },
        booking: {
            text: 'Find your perfect getaway today',
            buttonText: 'Browse Properties',
            buttonLink: '/properties',
            icon: <ArrowRight size={20} />
        }
    };

    const content = ctaContent[type] || ctaContent.default;

    return (
        <AnimatePresence>
            {isVisible && !isDismissed && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 999,
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        color: 'white',
                        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
                        padding: '1rem 0'
                    }}
                >
                    <div className="container" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1.5rem',
                        flexWrap: 'wrap'
                    }}>
                        {/* Text Content */}
                        <div style={{ flex: '1 1 auto', minWidth: '250px' }}>
                            <p style={{
                                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                margin: 0,
                                fontWeight: 600,
                                color: 'white'
                            }}>
                                {content.text}
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link
                                href={content.buttonLink}
                                className="btn btn-gradient"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {content.buttonText}
                                {content.icon}
                            </Link>

                            {/* Dismiss Button */}
                            <button
                                onClick={handleDismiss}
                                aria-label="Dismiss"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyCTABar;
