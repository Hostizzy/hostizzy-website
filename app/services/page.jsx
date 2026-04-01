'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '../../components/ScrollReveal';
import VideoSection from '../../components/VideoSection';
import {
    Check, ArrowRight, Zap, Star, Shield, TrendingUp, Smartphone, Globe,
    Home, Building, Palmtree, Crown, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Services() {
    const [activeTab, setActiveTab] = useState('cohosting'); // 'newhost', 'cohosting', 'complete'

    const propertyCategories = [
        {
            title: "Hostizzy\u00ae Stays",
            desc: "Ideal for traditional vacation rentals like apartments and homes.",
            icon: <Home size={32} color="#FE5858" />
        },
        {
            title: "Hostizzy\u00ae Retreats",
            desc: "Perfect for cabins, beach houses, and experiential stays.",
            icon: <Palmtree size={32} color="#FE5858" />
        },
        {
            title: "Hostizzy\u00ae Urban Spaces",
            desc: "City apartments and lofts for urban explorers & business travelers.",
            icon: <Building size={32} color="#FE5858" />
        },
        {
            title: "Hostizzy\u00ae Luxe",
            desc: "Luxury properties delivering premium accommodations & exclusive services.",
            icon: <Crown size={32} color="#FE5858" />
        },
    ];

    const overviewCards = [
        {
            key: 'newhost',
            emoji: '\u{1F680}',
            name: 'New Host',
            description: 'Get set up on top platforms with expert guidance',
            fromPrice: 'From \u20B914,999'
        },
        {
            key: 'cohosting',
            emoji: '\u{1F4CA}',
            name: 'Co-Hosting',
            description: 'We manage bookings while you own the experience',
            fromPrice: 'From \u20B915,000/mo'
        },
        {
            key: 'complete',
            emoji: '\u{1F3E0}',
            name: 'Complete Management',
            description: 'Full-service property management, end to end',
            fromPrice: 'From 30%'
        }
    ];

    const tabTaglines = {
        newhost: "Just getting started? We'll set you up for success on the world's biggest travel platforms.",
        cohosting: "You own the property, we manage the bookings. Maximum revenue, minimum effort.",
        complete: "Sit back while we handle everything \u2014 from guest check-in to checkout and beyond."
    };

    const plans = {
        newhost: [
            {
                name: "SmartStart",
                price: "\u20B914,999",
                period: "One-time",
                description: "Perfect for new hosts entering the vacation rental market",
                features: [
                    "Onboarding on 3 major OTA channels",
                    "Professional listing creation & optimization",
                    "90-day pricing strategy",
                    "Guest communication templates",
                    "One-on-one consultation session"
                ],
                cta: "Get Started",
                popular: false
            }
        ],
        cohosting: [
            {
                name: "ChannelPro",
                price: "\u20B915,000 \u2013 \u20B940,000",
                period: "Per month (fixed)",
                description: "Pricing based on your property's nightly rate. Or choose a 2-night stay equivalent or revenue share from 10\u201317%.",
                features: [
                    "Multi-OTA channel management & sync",
                    "Dynamic pricing & revenue optimization",
                    "24/7 guest messaging & reservations",
                    "Monthly performance reports"
                ],
                cta: "Choose Plan",
                popular: false
            },
            {
                name: "Hybrid Core",
                price: "18%",
                period: "Of net revenue (Gross - OTA fees)",
                description: "Everything in ChannelPro plus your own direct booking channel",
                features: [
                    "Everything in ChannelPro",
                    "Direct booking website for your property",
                    "Festival & surge pricing management",
                    "Dedicated account manager",
                    "Priority customer support"
                ],
                cta: "Choose Plan",
                popular: true
            }
        ],
        complete: [
            {
                name: "TotalCare360",
                price: "30%",
                period: "Profit share",
                description: "For villas, farmhouses & boutique homes — we manage everything, you bear the operational costs.",
                features: [
                    "Complete booking & reservation management",
                    "Dynamic pricing across 14+ channels",
                    "24/7 guest communication & support",
                    "Staff & housekeeping coordination",
                    "Maintenance & vendor management",
                    "OTA listing optimization & marketing",
                    "Monthly P&L with transparent accounting",
                    "Quarterly strategy review sessions"
                ],
                note: "Your property, professionally managed. Full operational control by our expert team.",
                cta: "Choose Plan",
                popular: true
            },
            {
                name: "StayPrime",
                price: "50-50",
                period: "Revenue split",
                description: "Complete hands-off hosting for apartments — we manage AND bear all operational costs.",
                features: [
                    "Complete booking & reservation management",
                    "Dynamic pricing across 14+ channels",
                    "24/7 guest communication & support",
                    "Staff hiring & management by Hostizzy",
                    "All consumables & supplies covered",
                    "Housekeeping & maintenance fully paid",
                    "Monthly performance reports",
                    "Zero owner involvement — true passive income"
                ],
                note: "The easiest way to earn from your apartment — we take care of everything.",
                cta: "Choose Plan",
                popular: false
            }
        ]
    };

    const steps = [
        { title: "Discovery Call", desc: "We learn about your property and recommend the best plan." },
        { title: "Onboarding & Setup", desc: "We optimize listings, pricing, and provide templates." },
        { title: "Go Live & Manage", desc: "We handle channels, guests, and operations seamlessly." },
        { title: "Report & Grow", desc: "Regular reports and strategy sessions to maximize revenue." }
    ];

    const faqs = [
        { q: "How is revenue share calculated?", a: "Revenue share is calculated on net revenue (gross booking value minus OTA service fees). For Complete Management plans, it's based on profit share or revenue split depending on your property type." },
        { q: "Can I upgrade or downgrade my plan later?", a: "Yes! We offer flexibility. You can switch plans with 30 days notice to suit your changing needs." },
        { q: "What if I only need marketing services?", a: "Our Add-ons like 'Social Media' or 'Premium Digital' are perfect for hosts who need marketing boost without full management." },
        { q: "Do you provide housekeeping and maintenance?", a: "Yes, our 'TotalCare360' and 'StayPrime' plans include full coordination of housekeeping, laundry, and maintenance." },
        { q: "How does JuxTravel relate to Hostizzy?", a: "JuxTravel is our upcoming open marketplace for unique stays. Once launched, all Hostizzy-managed properties will get featured listing priority." },
        { q: "What locations do you serve?", a: "We offer Complete Management in Delhi NCR, Uttarakhand, Himachal Pradesh, Rajasthan, and North East India. Co-Hosting services are available across all major Indian leisure markets including Goa, Kerala, and Karnataka." },
        { q: "Is there a minimum contract period?", a: "Standard contracts are 1 year, ensuring we have time to optimize and grow your property's performance effectively." }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="section text-center" style={{
                padding: 'calc(var(--header-height) + 3rem) 0 4rem',
                position: 'relative',
                background: '#0f172a',
                overflow: 'hidden',
                color: 'white'
            }}>
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.05,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <h1 className="page-header" style={{ color: 'white' }}>Property Management, <br /><span style={{ color: 'var(--color-primary)' }}>Evolved.</span></h1>
                        <p className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>
                            Hostizzy\u00ae blends high-touch hospitality with high-tech optimization to transform your property into a five-star asset. Explore our end-to-end management models.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Property Categories */}
            <section className="section container">
                <ScrollReveal>
                    <div className="grid desktop-4-col" style={{ gap: '1.5rem' }}>
                        {propertyCategories.map((cat, i) => (
                            <div key={i} className="card-feature" style={{
                                textAlign: 'center',
                                padding: '3rem 2rem',
                                borderRadius: '2rem',
                                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                                border: '1px solid var(--color-border)',
                                cursor: 'default'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.borderColor = 'var(--color-primary-light)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                }}
                            >
                                <div style={{
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: '1rem',
                                    background: 'rgba(254, 88, 88, 0.1)',
                                    borderRadius: '1.25rem',
                                    width: 'fit-content',
                                    margin: '0 auto 1.5rem'
                                }}>{cat.icon}</div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-foreground)' }}>{cat.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Trusted Across India */}
            <section className="section" style={{ background: '#0f172a', color: 'white', padding: '5rem 0' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
                                Trusted Across India
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
                                From the mountains of Himachal to the beaches of Goa — we manage vacation rentals in India's most desirable destinations.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Full Service Regions</p>
                            <div className="grid desktop-4-col" style={{ gap: '1rem' }}>
                                {[
                                    { name: 'Delhi NCR', slug: 'delhi-ncr', cities: 'Delhi, Gurgaon, Noida, Sohna' },
                                    { name: 'Himachal Pradesh', slug: 'himachal-pradesh', cities: 'Shimla, Manali, Kasauli, Dharamshala' },
                                    { name: 'Uttarakhand', slug: 'uttarakhand', cities: 'Mussoorie, Rishikesh, Mukteshwar, Nainital' },
                                    { name: 'Rajasthan', slug: 'rajasthan', cities: 'Jaipur, Udaipur, Jodhpur, Jawai' },
                                ].map((region) => (
                                    <Link key={region.slug} href={`/locations/${region.slug}`} style={{ textDecoration: 'none' }}>
                                        <div style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '1rem',
                                            padding: '1.5rem',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                                <span style={{ fontWeight: 700, color: 'white', fontSize: '1.1rem' }}>{region.name}</span>
                                                <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'rgba(34,197,94,0.15)', color: '#4ade80', fontSize: '0.7rem', fontWeight: 700 }}>Full Service</span>
                                            </div>
                                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{region.cities}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <div>
                            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Co-Hosting — Pan India</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                                {['Goa', 'Kerala', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'North East'].map((state) => (
                                    <span key={state} style={{
                                        padding: '0.4rem 1rem',
                                        borderRadius: '999px',
                                        background: 'rgba(59,130,246,0.1)',
                                        color: '#60a5fa',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        border: '1px solid rgba(59,130,246,0.2)'
                                    }}>
                                        {state}
                                    </span>
                                ))}
                            </div>
                            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', marginTop: '1.5rem' }}>
                                Don't see your location? <Link href="/contact" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>We can help anywhere in India.</Link>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Quick Overview / Partnership Level */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <h2>Choose Your Partnership Level</h2>
                        <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                            Whether you're a first-time host or an established property owner, we have a plan that fits.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-3-col" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                    {overviewCards.map((card, i) => (
                        <ScrollReveal key={card.key} delay={i * 0.1}>
                            <div
                                onClick={() => setActiveTab(card.key)}
                                style={{
                                    background: 'white',
                                    borderRadius: '1.5rem',
                                    padding: '2rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    border: activeTab === card.key ? '2px solid var(--color-primary)' : '2px solid #e2e8f0',
                                    boxShadow: activeTab === card.key ? '0 10px 30px -8px rgba(254, 88, 88, 0.15)' : 'var(--shadow-sm)',
                                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                                    transform: activeTab === card.key ? 'translateY(-4px)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeTab !== card.key) {
                                        e.currentTarget.style.borderColor = 'var(--color-primary-light)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeTab !== card.key) {
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                        e.currentTarget.style.transform = 'none';
                                    }
                                }}
                            >
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{card.emoji}</div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-foreground)' }}>{card.name}</h3>
                                <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1rem', lineHeight: 1.5 }}>{card.description}</p>
                                <div style={{
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    color: 'var(--color-primary)',
                                    background: 'rgba(254, 88, 88, 0.08)',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '2rem',
                                    display: 'inline-block'
                                }}>{card.fromPrice}</div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Pricing Tabs */}
            <section className="section bg-light" id="pricing">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Choose Your Model</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                            {[
                                { id: 'newhost', label: 'New Host' },
                                { id: 'cohosting', label: 'Co-Hosting' },
                                { id: 'complete', label: 'Complete Management' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        padding: '0.8rem 2rem',
                                        borderRadius: '2rem',
                                        border: 'none',
                                        background: activeTab === tab.id ? 'var(--color-primary)' : 'white',
                                        color: activeTab === tab.id ? 'white' : '#64748b',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Tagline */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                style={{
                                    marginTop: '1.5rem',
                                    color: '#64748b',
                                    fontSize: '1.05rem',
                                    maxWidth: '650px',
                                    margin: '1.5rem auto 0',
                                    lineHeight: 1.6
                                }}
                            >
                                {tabTaglines[activeTab]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <div className="container" style={{ maxWidth: '1000px' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={plans[activeTab].length === 1 ? '' : 'grid desktop-2-col'}
                                style={{
                                    gap: '2rem',
                                    alignItems: 'flex-start',
                                    ...(plans[activeTab].length === 1 ? { maxWidth: '520px', margin: '0 auto' } : {})
                                }}
                            >
                                {plans[activeTab].map((plan, i) => (
                                    <Link key={i} href="/contact" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                    <div className="card" style={{
                                        position: 'relative',
                                        background: 'white',
                                        borderRadius: '2rem',
                                        border: plan.popular ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                                        transform: plan.popular ? 'scale(1.02)' : 'none',
                                        boxShadow: plan.popular ? '0 30px 60px -12px rgba(254, 88, 88, 0.15)' : 'var(--shadow-sm)',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = plan.popular ? 'scale(1.04)' : 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px -8px rgba(0,0,0,0.12)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = plan.popular ? 'scale(1.02)' : 'none'; e.currentTarget.style.boxShadow = plan.popular ? '0 30px 60px -12px rgba(254, 88, 88, 0.15)' : 'var(--shadow-sm)'; }}
                                    >
                                        {plan.popular && (
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
                                        <div style={{ padding: '3rem' }}>
                                            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>{plan.name}</h3>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                                                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-foreground)' }}>{plan.price}</span>
                                                </div>
                                                <div style={{ fontSize: '1rem', color: 'var(--color-muted)', fontWeight: 500 }}>{plan.period}</div>
                                            </div>
                                            {plan.description && (
                                                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>{plan.description}</p>
                                            )}
                                            <div style={{ height: '1px', background: '#f1f5f9', marginBottom: '2.5rem' }} />
                                            <ul style={{ marginBottom: '3rem', listStyle: 'none', padding: 0 }}>
                                                {plan.features.map((feat, idx) => (
                                                    <li key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', fontSize: '1rem', color: '#334155', alignItems: 'flex-start' }}>
                                                        <div style={{ marginTop: '2px', background: 'rgba(254, 88, 88, 0.1)', borderRadius: '50%', padding: '4px' }}>
                                                            <Check size={14} color="var(--color-primary)" strokeWidth={3} />
                                                        </div>
                                                        <span style={{ lineHeight: 1.4 }}>{feat}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {plan.note && (
                                                <div style={{
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '0.75rem',
                                                    background: '#f0fdf4',
                                                    border: '1px solid #bbf7d0',
                                                    fontSize: '0.85rem',
                                                    color: '#15803d',
                                                    lineHeight: 1.5,
                                                    marginBottom: '1rem',
                                                    fontWeight: 500
                                                }}>
                                                    {plan.note}
                                                </div>
                                            )}
                                            {plan.notIncluded && (
                                                <div style={{
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '0.75rem',
                                                    background: '#fef2f2',
                                                    border: '1px solid #fecaca',
                                                    marginBottom: '1.5rem'
                                                }}>
                                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Not Included</div>
                                                    {plan.notIncluded.map((item, ni) => (
                                                        <div key={ni} style={{ fontSize: '0.8rem', color: '#dc2626', lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            <span style={{ fontSize: '0.7rem' }}>✕</span> {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',
                                                color: plan.popular ? 'var(--color-primary)' : '#94a3b8',
                                                marginTop: '0.5rem'
                                            }}>
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                    </Link>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <VideoSection
                url="https://www.youtube.com/watch?v=vXaW0NSbsig"
                title="Co-Host Your Home with Hostizzy"
                subtitle="Turn your vacation home into a revenue-generating asset \u2014 without the hassle."
                bgColor="#f8fafc"
            />

            {/* Digital Marketing Banner */}
            <section className="section container">
                <ScrollReveal>
                    <div className="card" style={{
                        padding: '3rem',
                        borderRadius: '2rem',
                        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
                        border: '1px solid #fbcfe8',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Need Marketing?</h2>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                            Professional social media, advertising, and SEO packages to maximize your property's visibility.
                        </p>
                        <Link href="/marketing" className="btn btn-gradient" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
                            Explore Digital Marketing Packages →
                        </Link>
                    </div>
                </ScrollReveal>
            </section>

            {/* How It Works */}
            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center" style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>How It Works</h2>
                            <p style={{ color: '#64748b' }}>Our simple four-step process for success.</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid desktop-4-col" style={{ gap: '2rem' }}>
                        {steps.map((step, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div style={{ position: 'relative', paddingLeft: '1rem' }}>
                                    <div style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(0,0,0,0.05)', position: 'absolute', top: '-1.5rem', left: 0, zIndex: 0 }}>{i + 1}</div>
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

            {/* Booking Promo */}
            <section className="section container">
                <ScrollReveal>
                    <div className="card shadow-premium" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: 'white', padding: '4rem 2rem', textAlign: 'center', borderRadius: '2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Looking to Travel Instead of Host?</h2>
                        <p style={{ maxWidth: '700px', margin: '0 auto 2rem', fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.7 }}>
                            Discover and book Hostizzy-managed stays, experiences, and group trips across India—villas, retreats, urban lofts and luxe homes.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="https://book.hostizzy.com/" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'white', color: '#0f172a', textDecoration: 'none' }}>Book Now</a>
                            <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>List Your Property</Link>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* FAQs */}
            <section className="section bg-light">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <ScrollReveal>
                        <h2 className="text-center" style={{ marginBottom: '3rem' }}>Frequently Asked Questions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {faqs.map((faq, i) => (
                                <div key={i} className="card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <HelpCircle size={18} color="var(--color-primary)" /> {faq.q}
                                    </h4>
                                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginLeft: '1.75rem', lineHeight: 1.6 }}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section className="section text-center" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Ready to Maximize Your Property's Potential?</h2>
                    <p style={{ marginBottom: '2rem', color: '#64748b' }}>Partner with Hostizzy and join hundreds of successful property owners.</p>
                    <Link href="/contact" className="btn btn-gradient" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>Schedule Discovery Call</Link>
                </div>
            </section>
        </>
    );
}
