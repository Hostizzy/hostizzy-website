'use client';
import React from 'react';
import ScrollReveal from './ScrollReveal';
import { Phone, ClipboardCheck, Rocket, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <Phone size={32} color="white" />,
            title: "Discovery Call",
            desc: "Expert consultation to analyze your property's potential.",
            color: "#3b82f6"
        },
        {
            icon: <ClipboardCheck size={32} color="white" />,
            title: "Onboarding",
            desc: "Professional photoshoot, listing creation, and pricing setup.",
            color: "#8b5cf6"
        },
        {
            icon: <Rocket size={32} color="white" />,
            title: "Go Live",
            desc: "We launch across Airbnb, Booking.com, and 30+ channels.",
            color: "#ec4899"
        },
        {
            icon: <TrendingUp size={32} color="white" />,
            title: "Manage & Grow",
            desc: "Sit back while we handle guests and maximize your revenue.",
            color: "#10b981"
        }
    ];

    return (
        <section className="section container">
            <ScrollReveal>
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>How Hostizzy Works</h2>
                    <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Your journey from empty property to profit-generating asset in 4 simple steps.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid desktop-4-col" style={{ gap: '2rem', position: 'relative' }}>
                {/* Connecting Line - Desktop Only */}
                <div className="desktop-only" style={{
                    position: 'absolute',
                    top: '40px',
                    left: '10%',
                    right: '10%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #10b981)',
                    opacity: 0.2,
                    zIndex: 0
                }} />

                {steps.map((step, i) => (
                    <ScrollReveal key={i} delay={i * 0.2}>
                        <div className="text-center" style={{ position: 'relative', zIndex: 1 }}>

                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: step.color,
                                borderRadius: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                boxShadow: `0 10px 25px -5px ${step.color}80`
                            }}>
                                {step.icon}
                            </div>
                            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{step.title}</h3>
                            <p style={{ color: 'var(--color-muted)', lineHeight: 1.5, fontSize: '0.95rem' }}>{step.desc}</p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
