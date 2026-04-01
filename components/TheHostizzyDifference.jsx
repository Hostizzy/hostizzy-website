'use client';
import React from 'react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import { Sparkles, Wifi, Shield, Clock } from 'lucide-react';

const TheHostizzyDifference = () => {
    const features = [
        {
            icon: <Sparkles size={24} color="#ca8a04" />,
            title: "Professionally Managed Homes",
            desc: "Every villa, farmhouse, and homestay is maintained to the highest standards — what you see is exactly what you get."
        },
        {
            icon: <Wifi size={24} color="#ca8a04" />,
            title: "Home Comforts, Elevated",
            desc: "Full kitchens, private pools, spacious living areas, fast WiFi — all the comforts of home with none of the hotel constraints."
        },
        {
            icon: <Clock size={24} color="#ca8a04" />,
            title: "Local Experiences Built In",
            desc: "From bonfire nights to curated local food experiences — every stay comes with memories, not just a bed."
        },
        {
            icon: <Shield size={24} color="#ca8a04" />,
            title: "Book With Confidence",
            desc: "Verified properties, transparent pricing, and a dedicated host team available 24/7 throughout your stay."
        }
    ];

    return (
        <section className="section bg-secondary">
            <div className="container">
                <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '4rem' }}>
                    <ScrollReveal>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                            It's a vacation home,<br />
                            <span style={{ color: 'var(--color-primary)' }}>but better.</span>
                        </h2>
                        <p style={{ fontSize: '1.125rem', opacity: 0.8, marginBottom: '2rem' }}>
                            Stay in handpicked villas, farmhouses, and boutique homes — professionally managed for an experience that goes beyond a typical vacation rental.
                        </p>
                        <a href="https://book.hostizzy.com/" target="_blank" rel="noopener noreferrer" className="btn btn-gradient" style={{ textDecoration: 'none' }}>Find Your Happy Place</a>
                    </ScrollReveal>

                    <div className="grid desktop-2-col" style={{ gap: '1.5rem' }}>
                        {features.map((f, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="card glass card-feature" style={{ padding: '1.5rem' }}>
                                    <div style={{
                                        marginBottom: '1rem',
                                        background: 'rgba(202, 138, 4, 0.1)',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '0.75rem'
                                    }}>
                                        {f.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{f.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                                        {f.desc}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TheHostizzyDifference;
