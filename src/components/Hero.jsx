
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import EarningsCalculator from './EarningsCalculator'; // Import Calculator

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
            {/* Background Video */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                >
                    <source src="https://videos.pexels.com/video-files/7515833/7515833-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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
                                fontWeight: 800,
                                lineHeight: 1.1,
                                marginBottom: '1.5rem',
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                textAlign: 'left',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Empowering Owners,<br />
                            <span style={{ color: '#FFD700' }}>Enriching Experiences</span>
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
                                lineHeight: 1.6,
                                textShadow: '0 1px 5px rgba(0,0,0,0.3)',
                                textAlign: 'left'
                            }}
                        >
                            Hostizzy transforms vacation rentals into high-performing assets with premium management, exclusively branded experiences, and advanced technology.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
                        >
                            <a href="#contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                Partner With Us <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </a>
                            <a href="/experiences" className="btn" style={{
                                padding: '1rem 2rem',
                                fontSize: '1.1rem',
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255,255,255,0.5)',
                                color: 'white'
                            }}>
                                Explore Stays
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Earnings Calculator */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <EarningsCalculator />
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

