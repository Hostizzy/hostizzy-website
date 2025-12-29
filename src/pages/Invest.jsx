import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { TrendingUp, ShieldCheck, PieChart, ArrowUpRight, CheckCircle2, Layout, BarChart, Globe } from 'lucide-react';

const Invest = () => {
    return (
        <>
            <SEO
                title="Invest in Hostizzy | Vacation Rental Management Growth Opportunity"
                description="Join India's fastest-growing vacation rental management company. Property management for second homes, passive income opportunities, and hospitality innovation."
                keywords={[
                    'vacation rental management investment',
                    'property management for second homes',
                    'passive income from property India',
                    'hospitality investment India'
                ]}
                image="https://hostizzy.com/og-invest.jpg"
            />

            <section className="section bg-primary text-white" style={{ padding: 'calc(var(--header-height) + 2rem) 0 4rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div className="badge mb-sm" style={{ backgroundColor: 'var(--color-primary)', color: 'white', border: 'none' }}>Pre-Seed Round Now Open</div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.1, color: 'white' }}>
                            Building India's <span style={{ color: 'var(--color-primary)' }}>Integrated</span><br />
                            Vacation Rental Ecosystem
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px', marginBottom: '3rem', lineHeight: 1.6, color: 'white' }}>
                            Hostizzy is raising a <strong>₹1–1.5 Cr pre-seed round</strong> to scale our operations and proprietary technology stack. Join us in capturing India's high-growth hospitality market.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href="https://hostizzy.site/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                View Investor Deck <ArrowUpRight size={20} />
                            </a>
                            <a href="/contact?type=investor" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                                Contact Founder
                            </a>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Background Decor */}
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', background: 'var(--color-primary)', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }}></div>
            </section>

            <section className="section container">
                <div className="grid desktop-2-col" style={{ gap: '3rem', alignItems: 'center' }}>
                    <ScrollReveal>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>A Message from the Founder</h2>
                            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                                "I am Ethan — founder of Hostizzy. We're building more than just a property management firm; we're creating an end-to-end ecosystem that empowers owners and delights guests through technology."
                            </p>
                            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--color-muted)' }}>
                                Our platform integrates <strong>VRM Operations</strong>, the <strong>HostOS PMS</strong>, <strong>ResIQ Analytics</strong>, and our upcoming <strong>JuxTravel Marketplace</strong> into a single, seamless powerhouse.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="card glass shadow-premium" style={{
                            padding: window.innerWidth < 768 ? '2rem 1.5rem' : '3rem',
                            borderLeft: '6px solid var(--color-primary)'
                        }}>
                            <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Ticket Sizes & Participation</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {[
                                    { label: "Individuals", range: "₹5L – ₹25L" },
                                    { label: "Angels / Syndicates", range: "₹25L – ₹75L" },
                                    { label: "Funds", range: "₹75L – ₹1.5 Cr" },
                                    { label: "Strategic Partners", range: "Flexible Equity" }
                                ].map((ticket, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                                        <span style={{ fontWeight: 600, color: '#1e293b' }}>{ticket.label}</span>
                                        <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{ticket.range}</span>
                                    </div>
                                ))}
                            </div>
                            <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-muted)', fontStyle: 'italic' }}>
                                * Equity flexibility is available for the right strategic investor who brings more than just capital to the table.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Four Pillars of Hostizzy</h2>
                            <p style={{ color: 'var(--color-muted)' }}>Our integrated ecosystem designed for scale.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-4-col" style={{ gap: '1.5rem' }}>
                        {[
                            { icon: <TrendingUp size={32} />, title: "VRM Ops", desc: "Expert on-ground management for premium properties." },
                            { icon: <Layout size={32} />, title: "HostOS", desc: "Proprietary PMS handling complex operations." },
                            { icon: <BarChart size={32} />, title: "ResIQ", desc: "Data-driven revenue management & analytics." },
                            { icon: <Globe size={32} />, title: "JuxTravel", desc: "Our exclusive marketplace for curated stays." }
                        ].map((pillar, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="card" style={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
                                    <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{pillar.icon}</div>
                                    <h4 style={{ marginBottom: '1rem', fontWeight: 700 }}>{pillar.title}</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>{pillar.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section container text-center">
                <ScrollReveal>
                    <div className="card glass shadow-premium" style={{
                        padding: window.innerWidth < 768 ? '3rem 1.5rem' : '5rem 2rem',
                        background: 'linear-gradient(135deg, #FE5858, #ffbaba)',
                        color: 'white'
                    }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>Shape the Future of Indian Hospitality</h2>
                        <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 3rem', opacity: 0.9 }}>
                            We are currently reviewing applications for our pre-seed round. Secure your stake in the next generation of vacation rentals.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="https://hostizzy.site/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ background: 'white', border: 'none', color: 'var(--color-primary)', padding: '1rem 3rem' }}>
                                Download Deck
                            </a>
                            <a href="/contact?type=investor" className="btn" style={{ background: 'transparent', border: '2px solid white', color: 'white', padding: '1rem 3rem' }}>
                                Schedule Call
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </>
    );
};

export default Invest;
