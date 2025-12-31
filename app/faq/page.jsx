'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
    const faqs = [
        { q: "How do I list my property with Hostizzy?", a: "Simply visit our 'Management' page or contact us directly. We'll schedule a property audit to see if your home fits our portfolio." },
        { q: "What is your commission rate?", a: "Our full-service management fee ranges between 15-20% depending on the property location and services required." },
        { q: "Do you handle guest vetting?", a: "Yes, we use strict verification processes across all booking platforms to ensure high-quality guests." },
        { q: "What happens if a guest damages my property?", a: "We collect security deposits and assist with insurance claims through platforms like Airbnb AirCover." },
        { q: "Can I use my own property?", a: "Absolutely! You can block dates for personal use anytime through our Owner Portal (ResIQ)." }
    ];

    const [openIndex, setOpenIndex] = React.useState(null);

    return (
        <>
            <section className="section bg-secondary text-center" style={{ padding: '6rem 0 4rem' }}>
                <div className="container">
                    <ScrollReveal>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Freqently Asked Questions</h1>
                        <p className="subtitle">Everything you need to know about hosting with us.</p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="container section" style={{ maxWidth: '800px' }}>
                {faqs.map((item, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <div
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            style={{
                                background: 'white',
                                padding: '1.5rem',
                                marginBottom: '1rem',
                                borderRadius: '1rem',
                                border: '1px solid #e2e8f0',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>{item.q}</h3>
                                {openIndex === i ? <ChevronUp size={20} color="var(--color-primary)" /> : <ChevronDown size={20} />}
                            </div>
                            {openIndex === i && (
                                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', color: '#64748b', lineHeight: 1.6 }}>
                                    {item.a}
                                </div>
                            )}
                        </div>
                    </ScrollReveal>
                ))}
            </section>
        </>
    );
}
