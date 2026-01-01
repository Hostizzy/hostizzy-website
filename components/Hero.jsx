'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, IndianRupee } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="hero" style={{
            position: 'relative',
            height: '100vh',
            minHeight: '800px', // Increased height for content
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            paddingTop: 'var(--header-height)'
        }}>
            {/* Parallax Background */}
            {/* Background Image - Premium Property */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}>
                <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2400"
                    alt="Luxury Hospitality"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>

            {/* Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, padding: '2rem 1rem' }}>
                <div className="grid desktop-2-col" style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    alignItems: 'center',
                    gap: '4rem' // Gap between Text and Calculator
                }}>
                    {/* Left Column: Text content */}
                    <motion.div
                        style={{ y: yText, opacity: opacityText }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            style={{
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                fontWeight: 900,
                                lineHeight: 1.1,
                                marginBottom: '1.5rem',
                                color: '#FFFFFF',
                                textShadow: '0 0 20px rgba(255,255,255,0.3), 0 2px 10px rgba(0,0,0,0.5)',
                                textAlign: 'left',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Empowering Owners.<br />
                            <span style={{ color: '#FFD700' }}>Enriching Guests.</span><br />
                            <span style={{ color: 'white', opacity: 0.8 }}>Engineering the Future.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            style={{
                                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                                color: 'rgba(255,255,255,0.9)',
                                maxWidth: '600px',
                                marginBottom: '2.5rem',
                                lineHeight: '1.6',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                textAlign: 'left'
                            }}
                        >
                            Hostizzy is building the world's first fully vertically integrated hospitality ecosystem. From HostOS for owners to JuxTravel for guests—we are redefining how the world stays.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
                        >
                            <a href="#contact" className="btn btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                Partner With Us <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </a>
                            <Link href="/experiences" className="btn" style={{
                                padding: '1rem 2rem',
                                fontSize: '1.1rem',
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255,255,255,0.5)',
                                color: 'white'
                            }}>
                                Explore Stays
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Calculator CTA */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="card"
                            style={{
                                padding: '3rem',
                                textAlign: 'center',
                                background: 'rgba(255, 255, 255, 0.98)',
                                borderRadius: '2rem',
                                boxShadow: 'var(--shadow-premium)',
                                maxWidth: '450px',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            <div style={{
                                width: '72px',
                                height: '72px',
                                background: 'linear-gradient(135deg, var(--color-primary), #FF7D7D)',
                                borderRadius: '1.5rem',
                                display: 'grid',
                                placeItems: 'center',
                                margin: '0 auto 2.5rem',
                                color: 'white',
                                boxShadow: '0 10px 20px rgba(254, 88, 88, 0.3)'
                            }}>
                                <IndianRupee size={36} />
                            </div>
                            <h3 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a', letterSpacing: '-0.5px' }}>
                                Unlock Your Property's Potential
                            </h3>
                            <p style={{ color: '#64748b', marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1.1rem' }}>
                                Ever wondered how much your vacation rental could earn? Our AI-driven market analysis tool estimates your income based on location, size, and seasonal demand.
                            </p>
                            <Link href="/calculator" className="btn btn-gradient" style={{
                                width: '100%',
                                padding: '1.25rem',
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                borderRadius: '1rem'
                            }}>
                                Try ROI Calculator <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    opacity: 0.7
                }}
            >
                <div style={{ width: '30px', height: '50px', border: '2px solid white', borderRadius: '15px', display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                    <div style={{ width: '4px', height: '8px', background: 'white', borderRadius: '2px' }} />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

