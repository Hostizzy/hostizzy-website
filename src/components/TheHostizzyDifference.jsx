import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Sparkles, Wifi, Shield, Clock } from 'lucide-react';

const TheHostizzyDifference = () => {
    const features = [
        {
            icon: <Sparkles size={24} color="#ca8a04" />,
            title: "Meticulous Standards",
            desc: "Expertly operated homes. We'll never not look like the pictures."
        },
        {
            icon: <Wifi size={24} color="#ca8a04" />,
            title: "Work-Ready Amenities",
            desc: "Ultra-fast WiFi and dedicated workspaces in every premium stay."
        },
        {
            icon: <Clock size={24} color="#ca8a04" />,
            title: "24/7 Guest Support",
            desc: "Our chat-based Concierge is always available to help, day or night."
        },
        {
            icon: <Shield size={24} color="#ca8a04" />,
            title: "Safety Verified",
            desc: "Industry-leading safety standards for your peace of mind."
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
                            The Hostizzy Difference: Combining the quality of a luxury hotel with the comfort of a private home.
                        </p>
                        <a href="/properties" className="btn btn-primary">Find Your Happy Place</a>
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
