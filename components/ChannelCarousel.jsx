'use client';
import React from 'react';
import { motion } from 'framer-motion';

const channels = [
    { name: 'Airbnb', logo: '/images/otas/airbnb.svg', height: '40px' },
    { name: 'Booking.com', logo: '/images/otas/booking.svg', height: '34px' },
    { name: 'MakeMyTrip', logo: '/images/otas/makemytrip.png', height: '38px' },
    { name: 'Agoda', logo: '/images/otas/agoda.png', height: '44px' },
    { name: 'Expedia', logo: '/images/otas/expedia.png', height: '36px' },
    { name: 'VRBO', logo: '/images/otas/vrbo.png', height: '48px' },
    { name: 'TripAdvisor', logo: '/images/otas/tripadvisor.svg', height: '36px' },
    { name: 'Google', logo: '/images/otas/google.svg', height: '34px' },
    { name: 'Goibibo', logo: '/images/otas/goibibo.png', height: '64px' },
    { name: 'Dtravel', logo: '/images/otas/dtravel.png', height: '64px' },
];

const ChannelCarousel = () => {
    return (
        <div style={{ padding: '4rem 0', background: 'white', overflow: 'hidden' }}>
            <div className="container" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div className="badge mb-sm" style={{ backgroundColor: 'rgba(254, 88, 88, 0.1)', color: 'var(--color-primary)' }}>Global Distribution</div>
                <h2 style={{ fontWeight: 800 }}>Listed Everywhere. Booked Always.</h2>
                <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem' }}>Your property distributed across 20+ major travel channels automatically.</p>
            </div>

            <div style={{ position: 'relative', width: '100%', padding: '2rem 0' }}>
                {/* Gradient Masks */}
                <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: '200px',
                    background: 'linear-gradient(to right, white, transparent)', zIndex: 2
                }} />
                <div style={{
                    position: 'absolute', right: 0, top: 0, bottom: 0, width: '200px',
                    background: 'linear-gradient(to left, white, transparent)', zIndex: 2
                }} />

                <motion.div
                    style={{ display: 'flex', gap: '5rem', width: 'max-content', alignItems: 'center' }}
                    animate={{ x: [0, -2400] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 45,
                            ease: "linear"
                        }
                    }}
                >
                    {[...channels, ...channels, ...channels].map((channel, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '80px',
                            padding: '0 1.5rem',
                            opacity: 0.75,
                            transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                            cursor: 'default'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.transform = 'scale(1.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '0.75';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <img
                                src={channel.logo}
                                alt={channel.name}
                                loading="lazy"
                                style={{
                                    height: channel.height,
                                    width: 'auto',
                                    objectFit: 'contain',
                                    maxWidth: '180px'
                                }}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ChannelCarousel;
