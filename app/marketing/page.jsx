'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '../../components/ScrollReveal';
import SEO from '../../components/SEO';
import {
    Check, ArrowRight, MessageCircle, Camera, Target,
    TrendingUp, Globe, Megaphone, BarChart3
} from 'lucide-react';

const packages = [
    {
        name: 'Social Media',
        price: '\u20B920,000',
        period: '/month',
        terms: '3-month minimum commitment',
        popular: false,
        features: [
            '12 Reels per month',
            '5 Carousel/Posts per month',
            'Professional shoot, edit & ideation',
            'Daily stories management',
            'Monthly meetup & performance review',
            'Assurance: Impressions & Queries guaranteed'
        ]
    },
    {
        name: 'Full Digital',
        price: '\u20B930,000',
        period: ' + 5% ad spend',
        terms: null,
        popular: true,
        features: [
            'Everything in Social Media',
            'Influencer marketing campaigns',
            'Meta & Google Ads management',
            'Performance reporting & optimization',
            'Campaign strategy & A/B testing'
        ]
    },
    {
        name: 'Premium Digital',
        price: '\u20B950,000',
        period: '/month',
        terms: null,
        popular: false,
        features: [
            'Everything in Full Digital',
            'Dedicated website & landing pages',
            'SEO strategy & execution',
            'Google Ads management',
            'Complete digital presence management',
            'Monthly strategy reviews'
        ]
    }
];

const included = [
    {
        icon: <Camera size={28} />,
        title: 'Content Creation',
        desc: 'Professional Reels, Carousels, and Stories crafted to showcase your property and attract guests.'
    },
    {
        icon: <Megaphone size={28} />,
        title: 'Advertising',
        desc: 'Meta Ads, Google Ads, and Influencer campaigns designed to drive direct bookings and visibility.'
    },
    {
        icon: <TrendingUp size={28} />,
        title: 'Growth',
        desc: 'SEO strategy, dedicated website, and analytics to build long-term organic reach and revenue.'
    }
];

const steps = [
    {
        num: '01',
        title: 'Strategy Call',
        desc: 'We understand your property and goals'
    },
    {
        num: '02',
        title: 'Content & Campaigns',
        desc: 'Our team creates and manages everything'
    },
    {
        num: '03',
        title: 'Report & Optimize',
        desc: 'Monthly reviews and performance optimization'
    }
];

const Marketing = () => {
    return (
        <>
            <SEO
                title="Digital Marketing for Vacation Rentals | Hostizzy"
                description="Professional social media, advertising, and SEO services for vacation rental properties across India. Packages from \u20B920,000/month."
                keywords={[
                    'vacation rental marketing India',
                    'Airbnb marketing services',
                    'property social media management',
                    'hospitality digital marketing',
                    'vacation rental SEO'
                ]}
            />

            {/* ── Hero Section ── */}
            <section style={{
                padding: 'calc(var(--header-height) + 3rem) 0 4rem',
                background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Dot pattern overlay */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.05,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />

                {/* Radial glow */}
                <div style={{
                    position: 'absolute', top: '20%', right: '10%',
                    width: '300px', height: '300px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(254,88,88,0.12) 0%, transparent 70%)',
                    filter: 'blur(150px)',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
                            <span className="badge" style={{
                                background: 'rgba(254,88,88,0.15)', color: '#fca5a5',
                                border: '1px solid rgba(254,88,88,0.3)',
                                padding: '0.4rem 1rem', borderRadius: '999px',
                                fontSize: '0.85rem', fontWeight: 500, display: 'inline-block', marginBottom: '1.5rem'
                            }}>
                                Marketing Services
                            </span>
                            <h1 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2.4rem, 5vw, 3.75rem)', fontWeight: 800, lineHeight: 1.1,
                                marginBottom: '1.25rem', letterSpacing: '-0.02em',
                                textShadow: '0 2px 20px rgba(0,0,0,0.5)'
                            }}>
                                Digital Marketing for Vacation Rentals
                            </h1>
                            <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto' }}>
                                Professional social media, advertising, and SEO services to maximize your property&apos;s visibility and bookings.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Package Cards ── */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center" style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>Choose Your Package</h2>
                            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0.75rem auto 0' }}>
                                Flexible marketing solutions built specifically for vacation rental properties.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-3-col" style={{ gap: '2rem', alignItems: 'stretch' }}>
                        {packages.map((pkg, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="card" style={{
                                    position: 'relative',
                                    background: 'white',
                                    borderRadius: '2rem',
                                    border: pkg.popular ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                                    boxShadow: pkg.popular ? '0 30px 60px -12px rgba(254, 88, 88, 0.15)' : 'var(--shadow-sm)',
                                    overflow: 'hidden',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {pkg.popular && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            background: 'var(--color-primary)',
                                            color: 'white',
                                            padding: '0.5rem 1.5rem',
                                            fontSize: '0.85rem',
                                            fontWeight: 800,
                                            borderBottomLeftRadius: '1.5rem',
                                            letterSpacing: '0.05em'
                                        }}>
                                            MOST POPULAR
                                        </div>
                                    )}
                                    <div style={{ padding: '3rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>{pkg.name}</h3>
                                        <div style={{ marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)' }}>{pkg.price}</span>
                                            <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>{pkg.period}</span>
                                        </div>
                                        {pkg.terms && (
                                            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>{pkg.terms}</p>
                                        )}
                                        {!pkg.terms && <div style={{ marginBottom: '1.5rem' }} />}

                                        <div style={{ height: '1px', background: '#f1f5f9', marginBottom: '2rem' }} />

                                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', flex: 1 }}>
                                            {pkg.features.map((feat, idx) => (
                                                <li key={idx} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.95rem', color: '#334155', alignItems: 'flex-start' }}>
                                                    <div style={{ marginTop: '2px', background: 'rgba(254, 88, 88, 0.1)', borderRadius: '50%', padding: '4px', flexShrink: 0 }}>
                                                        <Check size={14} color="var(--color-primary)" strokeWidth={3} />
                                                    </div>
                                                    <span style={{ lineHeight: 1.4 }}>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link href="/contact" className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline'}`} style={{
                                            width: '100%',
                                            padding: '1.1rem',
                                            borderRadius: '1rem',
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            Get Started <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What's Included ── */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>What&apos;s Included</h2>
                        <p style={{ color: '#64748b', maxWidth: '600px', margin: '0.75rem auto 0' }}>
                            Every package is backed by a full-stack marketing team dedicated to your property.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                    {included.map((item, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div style={{
                                textAlign: 'center',
                                padding: '2.5rem 2rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--color-border)',
                                background: 'white',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0,0,0,0.08)';
                                    e.currentTarget.style.borderColor = 'var(--color-primary-light)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                }}
                            >
                                <div style={{
                                    display: 'flex', justifyContent: 'center', marginBottom: '1.25rem'
                                }}>
                                    <div style={{
                                        background: 'rgba(254, 88, 88, 0.1)',
                                        borderRadius: '1rem',
                                        padding: '1rem',
                                        color: 'var(--color-primary)'
                                    }}>
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-foreground)' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center" style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>How It Works</h2>
                            <p style={{ color: '#64748b' }}>Simple, transparent, results-driven.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                        {steps.map((step, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div style={{ position: 'relative', paddingLeft: '1rem' }}>
                                    <div style={{
                                        fontSize: '4rem', fontWeight: 900,
                                        color: 'rgba(254, 88, 88, 0.08)',
                                        position: 'absolute', top: '-1.5rem', left: 0, zIndex: 0
                                    }}>
                                        {step.num}
                                    </div>
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>{step.title}</h3>
                                        <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6 }}>{step.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="card" style={{
                            background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                            color: 'white',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            borderRadius: '2rem'
                        }}>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                                marginBottom: '1rem'
                            }}>
                                Ready to grow your property&apos;s online presence?
                            </h2>
                            <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem', opacity: 0.85, lineHeight: 1.7 }}>
                                Let our team handle your digital marketing so you can focus on delivering great guest experiences.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href="/contact" className="btn" style={{
                                    background: 'white', color: '#0f172a', textDecoration: 'none',
                                    padding: '1rem 2.5rem', fontSize: '1.05rem', fontWeight: 700,
                                    borderRadius: '0.75rem',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                    Partner With Us <ArrowRight size={18} />
                                </Link>
                                <a
                                    href="https://wa.me/919560493335?text=Hi%20Hostizzy%2C%20I%27m%20interested%20in%20your%20digital%20marketing%20services%20for%20my%20vacation%20rental%20property."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                    style={{
                                        borderColor: 'white', color: 'white', textDecoration: 'none',
                                        padding: '1rem 2.5rem', fontSize: '1.05rem', fontWeight: 700,
                                        borderRadius: '0.75rem',
                                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    <MessageCircle size={18} /> WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
};

export default Marketing;
