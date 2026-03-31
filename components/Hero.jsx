'use client';

import Link from 'next/link';
import { ArrowRight, Star, Building2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: '#0f172a'
        }}>
            {/* Background Image */}
            <img
                src="https://ik.imagekit.io/hostizzy/Hostizzy%20Web/DJI_0046-Enhanced-NR-Edit%20copy.jpg"
                alt="Waarah Ville Jawai — luxury villa with pool at sunset, managed by Hostizzy"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.85
                }}
            />

            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.35) 50%, rgba(15,23,42,0.6) 100%)'
            }} />

            {/* Content */}
            <div className="container" style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                color: 'white',
                padding: 'calc(var(--header-height) + 2rem) 1.5rem 4rem'
            }}>
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.25rem',
                        borderRadius: '999px',
                        background: 'rgba(254,88,88,0.2)',
                        color: '#ff9a9a',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        border: '1px solid rgba(254,88,88,0.3)'
                    }}>
                        Vacation Rental Made Easy
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        color: 'white',
                        marginBottom: '1.5rem',
                        maxWidth: '900px',
                        margin: '0 auto 1.5rem',
                        textShadow: '0 2px 30px rgba(0,0,0,0.3)'
                    }}
                >
                    Empowering Owners.{' '}
                    <span style={{ color: '#FFD700' }}>Enriching Guests.</span>
                    <br />
                    Engineering the Future.
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    style={{
                        fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                        lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.85)',
                        maxWidth: '680px',
                        margin: '0 auto 2rem',
                        textShadow: '0 1px 10px rgba(0,0,0,0.3)'
                    }}
                >
                    India&apos;s premier vacation rental management company. We combine technology-driven operations with exceptional hospitality to maximize your property&apos;s potential.
                </motion.p>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                        marginBottom: '2.5rem'
                    }}
                >
                    {[
                        { icon: Star, label: '4.9 Rating', color: '#FFD700' },
                        { icon: Building2, label: '50+ Properties', color: '#60a5fa' },
                        { icon: Users, label: '40,000+ Guests', color: '#34d399' }
                    ].map(({ icon: Icon, label, color }) => (
                        <span key={label} style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.95rem',
                            color: 'rgba(255,255,255,0.9)',
                            fontWeight: 500,
                            padding: '0.4rem 1rem',
                            background: 'rgba(255,255,255,0.08)',
                            borderRadius: '999px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <Icon size={16} color={color} strokeWidth={2.2} />
                            {label}
                        </span>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}
                >
                    <Link href="/contact" className="btn btn-gradient" style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1.1rem'
                    }}>
                        Partner With Us <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                    </Link>
                    <a
                        href="https://book.hostizzy.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            color: 'white',
                            textDecoration: 'none'
                        }}
                    >
                        Explore Stays
                    </a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    style={{
                        position: 'absolute',
                        bottom: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            width: '28px',
                            height: '44px',
                            borderRadius: '14px',
                            border: '2px solid rgba(255,255,255,0.3)',
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: '8px'
                        }}
                    >
                        <div style={{
                            width: '4px',
                            height: '10px',
                            borderRadius: '2px',
                            background: 'rgba(255,255,255,0.5)'
                        }} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
