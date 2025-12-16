import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { Calendar, Map, CheckCircle, ArrowRight } from 'lucide-react';

const NextStop = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetch('/api/experiences')
            .then(res => res.json())
            .then(data => setPackages(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <SEO
                title="NextStop Adventures | Hostizzy"
                description="Curated group trips and adventure retreats managed by Hostizzy."
            />

            <section className="section bg-secondary" style={{ textAlign: 'center', padding: '6rem 0 4rem' }}>
                <div className="container">
                    <ScrollReveal>
                        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>NextStop</h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-muted)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600 }}>
                            Curated Adventures & Retreats
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {packages.map((pkg, index) => (
                        <ScrollReveal key={pkg.id} delay={index * 0.2}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                                gap: '4rem',
                                marginBottom: '6rem',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    borderRadius: '2rem',
                                    overflow: 'hidden',
                                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                    height: '500px'
                                }}>
                                    <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>

                                <div>
                                    <span style={{
                                        backgroundColor: 'var(--color-primary)',
                                        color: 'white',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '2rem',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase'
                                    }}>
                                        Limited Slots
                                    </span>
                                    <h2 style={{ fontSize: '3rem', marginTop: '1.5rem', marginBottom: '0.5rem', lineHeight: 1.1 }}>{pkg.title}</h2>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-muted)', marginBottom: '2rem' }}>{pkg.subtitle}</h3>

                                    <p style={{ fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2rem', color: '#475569' }}>
                                        {pkg.description}
                                    </p>

                                    <div className="glass" style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', padding: '2rem', borderRadius: '1.5rem', flexWrap: 'wrap' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>Dates</div>
                                            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                                <Calendar size={20} color="var(--color-primary)" /> {pkg.dates}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>Location</div>
                                            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                                <Map size={20} color="var(--color-primary)" /> Himalayas
                                            </div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>Price</div>
                                            <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.25rem' }}>₹ {pkg.price.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 700 }}>Trip Highlights</h4>
                                    <ul style={{ marginBottom: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        {pkg.itinerary.map(item => (
                                            <li key={item.day} style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', color: '#334155' }}>
                                                <CheckCircle size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                <span style={{ fontWeight: 500 }}>{item.title}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                        Book This Adventure <ArrowRight />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>
        </>
    );
};

export default NextStop;
