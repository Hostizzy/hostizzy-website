import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { TrendingUp, ShieldCheck, PieChart } from 'lucide-react';

const Invest = () => {
    return (
        <>
            <SEO title="Invest in Hostizzy" description="Join the fastest growing hospitality network." />

            <section className="section bg-primary text-white text-center" style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Invest in Hostizzy</h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                        High-growth potential in India's alternative accommodation market driven by technology.
                    </p>
                </div>
                {/* Background Image Overlay */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: 'url("/images/invest.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2,
                    zIndex: 0
                }}></div>
            </section>

            <section className="section container">
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    <div>
                        <TrendingUp size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                        <h3>High-Growth Market</h3>
                        <p style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>
                            Capitalize on the booming staycation and alternative accommodation sector in India.
                        </p>
                    </div>
                    <div>
                        <ShieldCheck size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                        <h3>Proven Track Record</h3>
                        <p style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>
                            Experienced team with specific expertise in hospitality and technology.
                        </p>
                    </div>
                    <div>
                        <PieChart size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                        <h3>Transparent Models</h3>
                        <p style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>
                            Clear revenue models and a future-ready roadmap for expansion.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <h2 className="text-center" style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Exponential Growth</h2>
                    </ScrollReveal>

                    <div className="card glass" style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto' }}>
                        <h3 className="text-center" style={{ marginBottom: '2rem' }}>Properties Under Management (2019 - 2024)</h3>

                        {/* Custom CSS/SVG Chart */}
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '300px', paddingBottom: '1rem', borderBottom: '2px solid #cbd5e1' }}>
                            {[
                                { year: '2019', count: 3, height: '10%' },
                                { year: '2022', count: 10, height: '25%' },
                                { year: '2023', count: 25, height: '45%' },
                                { year: '2024', count: 100, height: '100%' }
                            ].map((d, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '15%' }}>
                                    <ScrollReveal delay={0.2 + (i * 0.2)} width="100%" y={100}>
                                        <div style={{
                                            height: '250px',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                            width: '100%'
                                        }}>
                                            <div style={{
                                                width: '100%',
                                                height: d.height,
                                                background: 'linear-gradient(to top, var(--color-primary), #fbbf24)',
                                                borderRadius: '0.5rem 0.5rem 0 0',
                                                position: 'relative',
                                                transition: 'height 1s ease-out'
                                            }}>
                                                <span style={{ position: 'absolute', top: '-1.5rem', left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold' }}>{d.count}</span>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                    <span style={{ marginTop: '1rem', fontWeight: 600, color: 'var(--color-muted)' }}>{d.year}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-center" style={{ marginTop: '2rem', color: 'var(--color-muted)' }}>
                            From 3 pilot properties to over 100 premium stays across India.
                        </p>
                    </div>

                    <div className="text-center" style={{ marginTop: '4rem' }}>
                        <div style={{ padding: '3rem', backgroundColor: '#f8fafc', borderRadius: '1rem', display: 'inline-block' }}>
                            <h2>Ready to join us?</h2>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                                <button className="btn btn-primary">Download Pitch Deck</button>
                                <button className="btn btn-outline">Contact Investment Team</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Invest;
