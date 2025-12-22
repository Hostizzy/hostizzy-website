import React from 'react';
import { motion } from 'framer-motion';

const channels = [
    { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_Bélo.svg/2560px-Airbnb_Logo_Bélo.svg.png' },
    { name: 'Booking.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png' },
    { name: 'Expedia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Expedia_Logo_2023.svg/2560px-Expedia_Logo_2023.svg.png' },
    { name: 'VRBO', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Vrbo_logo.svg/2560px-Vrbo_logo.svg.png' },
    { name: 'TripAdvisor', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Tripadvisor_Logo.svg/2560px-Tripadvisor_Logo.svg.png' },
    { name: 'Marriott Bonvoy', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Marriott_Bonvoy_Logo.svg/2560px-Marriott_Bonvoy_Logo.svg.png' },
    { name: 'MakeMyTrip', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/MakeMyTrip_Logo.svg/2560px-MakeMyTrip_Logo.svg.png' },
    { name: 'Agoda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Agoda_logo.svg/2560px-Agoda_logo.svg.png' }
];

const ChannelCarousel = () => {
    return (
        <div style={{ padding: '4rem 0', background: 'white', overflow: 'hidden' }}>
            <div className="container" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div className="badge mb-sm" style={{ backgroundColor: 'rgba(254, 88, 88, 0.1)', color: 'var(--color-primary)' }}>Global Distribution</div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Listed Everywhere. Booked Always.</h2>
                <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem' }}>We distribute your property to 20+ major travel channels automatically.</p>
            </div>

            <div style={{ position: 'relative', width: '100%' }}>
                {/* Gradient Masks */}
                <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px',
                    background: 'linear-gradient(to right, white, transparent)', zIndex: 2
                }}></div>
                <div style={{
                    position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px',
                    background: 'linear-gradient(to left, white, transparent)', zIndex: 2
                }}></div>

                <motion.div
                    style={{ display: 'flex', gap: '5rem', width: 'max-content' }}
                    animate={{ x: [0, -1500] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear"
                        }
                    }}
                >
                    {[...channels, ...channels].map((channel, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', height: '60px', opacity: 0.6, transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}>
                            <img
                                src={channel.logo}
                                alt={channel.name}
                                style={{
                                    height: channel.name.includes('Airbnb') ? '40px' : '30px',
                                    width: 'auto',
                                    filter: 'grayscale(100%) brightness(0.5)'
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
