'use client';
import React from 'react';
import { ShieldCheck, Star, Award, HeartHandshake } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const TrustBadges = () => {
    const badges = [
        {
            icon: <Star size={32} fill="#FFD700" color="#FFD700" />,
            title: "Superhost Status",
            desc: "Top-rated hospitality"
        },
        {
            icon: <ShieldCheck size={32} color="#10b981" />,
            title: "Verified Stays",
            desc: "In-person quality checks"
        },
        {
            icon: <Award size={32} color="#3b82f6" />,
            title: "Premium Service",
            desc: "24/7 guest support"
        },
        {
            icon: <HeartHandshake size={32} color="#ec4899" />,
            title: "Trusted Partner",
            desc: "Official platform partners"
        }
    ];

    return (
        <section className="section" style={{ background: 'var(--color-background)', borderTop: '1px solid var(--glass-border)' }}>
            <div className="container">
                <div className="grid desktop-4-col" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    {badges.map((badge, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1.5rem',
                                background: 'white',
                                borderRadius: '1rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #f3f4f6'
                            }}>
                                <div style={{ flexShrink: 0 }}>
                                    {badge.icon}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{badge.title}</h4>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>{badge.desc}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
