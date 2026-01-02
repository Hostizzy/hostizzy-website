'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Calculator, Phone } from 'lucide-react';

const ExitIntentPopup = ({
    type = 'default', // 'default', 'calculator', 'discount'
    delay = 5000 // Minimum time on page before showing (in ms)
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if already shown in this session
        const shown = sessionStorage.getItem('exit-intent-shown');
        if (shown) {
            setHasShown(true);
            return;
        }

        let timeoutId;
        let isDelayPassed = false;

        // Wait for minimum time on page
        timeoutId = setTimeout(() => {
            isDelayPassed = true;
        }, delay);

        const handleMouseLeave = (e) => {
            // Detect if cursor is moving towards top of viewport (exit intent)
            if (
                e.clientY <= 0 &&
                !hasShown &&
                !isDismissed &&
                isDelayPassed
            ) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem('exit-intent-shown', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [delay, hasShown, isDismissed]);

    const handleClose = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    const popupContent = {
        default: {
            title: 'Wait! Before You Go...',
            subtitle: 'Unlock Your Property\'s Revenue Potential',
            description: 'Get a free consultation with our property management experts. Learn how we can maximize your rental income.',
            buttonText: 'Schedule Free Consultation',
            buttonLink: '/contact',
            icon: <Phone size={48} color="#FE5858" />
        },
        calculator: {
            title: 'Curious About Your Earnings?',
            subtitle: 'Free Revenue Calculator',
            description: 'See how much your property could earn with professional management. No commitment required.',
            buttonText: 'Calculate Potential Income',
            buttonLink: '/calculator',
            icon: <Calculator size={48} color="#FE5858" />
        },
        discount: {
            title: 'Special Offer!',
            subtitle: 'Get 10% Off Setup Fees',
            description: 'Limited time offer for new property partners. Let us help you start earning more from your rental property.',
            buttonText: 'Claim Your Discount',
            buttonLink: '/contact?promo=SAVE10',
            icon: <Gift size={48} color="#FE5858" />
        }
    };

    const content = popupContent[type] || popupContent.default;

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 9998,
                            cursor: 'pointer'
                        }}
                    />

                    {/* Popup Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 9999,
                            backgroundColor: 'white',
                            borderRadius: '1.5rem',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                            maxWidth: '550px',
                            width: '90%',
                            maxHeight: '90vh',
                            overflow: 'auto'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            aria-label="Close"
                            style={{
                                position: 'absolute',
                                top: '1.25rem',
                                right: '1.25rem',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#64748b',
                                padding: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f1f5f9';
                                e.currentTarget.style.color = '#0f172a';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#64748b';
                            }}
                        >
                            <X size={24} />
                        </button>

                        {/* Content */}
                        <div style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
                            {/* Icon */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    width: '96px',
                                    height: '96px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #FE5858 0%, #FF8A80 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 30px rgba(254, 88, 88, 0.3)'
                                }}>
                                    {content.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h2 style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                marginBottom: '0.5rem',
                                color: '#0f172a',
                                lineHeight: 1.2
                            }}>
                                {content.title}
                            </h2>

                            {/* Subtitle */}
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: '#FE5858',
                                marginBottom: '1.5rem'
                            }}>
                                {content.subtitle}
                            </h3>

                            {/* Description */}
                            <p style={{
                                fontSize: '1.05rem',
                                color: '#64748b',
                                lineHeight: 1.7,
                                marginBottom: '2.5rem'
                            }}>
                                {content.description}
                            </p>

                            {/* CTA Button */}
                            <Link
                                href={content.buttonLink}
                                className="btn btn-gradient"
                                style={{
                                    width: '100%',
                                    padding: '1rem 2rem',
                                    fontSize: '1.1rem',
                                    justifyContent: 'center'
                                }}
                                onClick={handleClose}
                            >
                                {content.buttonText}
                            </Link>

                            {/* Skip Link */}
                            <button
                                onClick={handleClose}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#94a3b8',
                                    fontSize: '0.9rem',
                                    marginTop: '1rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                No thanks, maybe later
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ExitIntentPopup;
