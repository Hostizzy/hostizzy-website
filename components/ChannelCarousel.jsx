'use client';
import React from 'react';
import { motion } from 'framer-motion';

const channels = [
    { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png', height: '36px' },
    { name: 'Booking.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png', height: '30px' },
    { name: 'MakeMyTrip', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/MakeMyTrip_Logo.svg/2560px-MakeMyTrip_Logo.svg.png', height: '30px' },
    { name: 'Agoda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Agoda_logo.svg/2560px-Agoda_logo.svg.png', height: '28px' },
    { name: 'Expedia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Expedia_2023.svg/2560px-Expedia_2023.svg.png', height: '30px' },
    { name: 'VRBO', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Vrbo_logo.svg/2560px-Vrbo_logo.svg.png', height: '28px' },
    { name: 'TripAdvisor', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Tripadvisor_Logo.svg/2560px-Tripadvisor_Logo.svg.png', height: '30px' },
    { name: 'Google Vacation Rentals', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png', height: '28px' },
    { name: 'Goibibo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Goibibo_Logo.svg/2560px-Goibibo_Logo.svg.png', height: '28px' },
    { name: 'Marriott Homes & Villas', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Marriott_Bonvoy_Logo.svg/2560px-Marriott_Bonvoy_Logo.svg.png', height: '24px' },
];

const ChannelCarousel = () => {
    return (
        <div style={{ padding: '4rem 0', background: 'white', overflow: 'hidden' }}>
            <div className="container" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div className="badge mb-sm" style={{ backgroundColor: 'rgba(254, 88, 88, 0.1)', color: 'var(--color-primary)' }}>Global Distribution</div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Listed Everywhere. Booked Always.</h2>
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
                            opacity: 0.7,
                            transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                            cursor: 'default'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.transform = 'scale(1.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '0.7';
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
