'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '../../components/ScrollReveal';
import {
    Check, ArrowRight, Zap, Star, Shield, TrendingUp, Smartphone, Globe,
    Home, Building, Palmtree, Crown, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Services() {
    const [activeTab, setActiveTab] = useState('full'); // 'diy', 'shared', 'full'

    const propertyCategories = [
        {
            title: "Hostizzy® Stays",
            desc: "Ideal for traditional vacation rentals like apartments and homes.",
            icon: <Home size={32} color="#FE5858" />
        },
        {
            title: "Hostizzy® Retreats",
            desc: "Perfect for cabins, beach houses, and experiential stays.",
            icon: <Palmtree size={32} color="#FE5858" />
        },
        {
            title: "Hostizzy® Urban Spaces",
            desc: "City apartments and lofts for urban explorers & business travelers.",
            icon: <Building size={32} color="#FE5858" />
        },
        {
            title: "Hostizzy® Luxe",
            desc: "Luxury properties delivering premium accommodations & exclusive services.",
            icon: <Crown size={32} color="#FE5858" />
        },
    ];

    const plans = {
        diy: [
            {
                name: "SmartStart",
                price: "₹9,999",
                period: "One-time setup fee",
                features: [
                    "One-time listing creation & OTA setup",
                    "90-day pricing strategy & optimization",
                    "Guest communication templates",
                    "House rules & cleaning checklists",
                    "Two 45-minute coaching calls"
                ],
                cta: "Get Started",
                popular: false
            },
            {
                name: "Listing Optimizer",
                price: "₹3,000",
                period: "Per month",
                features: [
                    "Quarterly audit of listing & pricing",
                    "Review prompts & response templates",
                    "Monthly performance check-in call",
                    "Access to knowledge base resources"
                ],
                cta: "Learn More",
                popular: false
            }
        ],
        shared: [
            {
                name: "ChannelPro",
                price: "15-20%",
                period: "Of net revenue",
                features: [
                    "Multi-OTA channel management & sync",
                    "Dynamic pricing & revenue optimization",
                    "24/7 guest messaging & reservations",
                    "Monthly performance actionable reports"
                ],
                cta: "Choose Plan",
                popular: false
            },
            {
                name: "Hybrid Core",
                price: "20% + ₹2k",
                period: "Of net revenue + base",
                features: [
                    "Everything in ChannelPro",
                    "Festival & surge pricing management",
                    "Dedicated account manager",
                    "Inventory supply coordination",
                    "Priority customer support"
                ],
                cta: "Choose Plan",
                popular: true
            }
        ],
        full: [
            {
                name: "TotalCare360",
                price: "25-30%",
                period: "Of gross/net revenue",
                features: [
                    "End-to-end guest & reservation mgmt",
                    "Professional cleaning & turnover mgmt",
                    "Dynamic pricing across channels",
                    "Maintenance coordination & resolution",
                    "Quarterly strategy review sessions"
                ],
                cta: "Choose Plan",
                popular: true
            },
            {
                name: "StayPrime",
                price: "30%",
                period: "Of net revenue",
                features: [
                    "Everything in TotalCare360",
                    "Concierge services (F&B, Transport)",
                    "Premium listing exposure on Luxury OTAs",
                    "Advanced yield management for peaks",
                    "VIP guest relations & reputation mgmt"
                ],
                cta: "Choose Plan",
                popular: false
            }
        ]
    };

    const addons = [
        {
            title: "Digital Presence",
            price: "₹5,000 / mo",
            features: ["Branded landing page", "Direct booking widget", "SEO & Analytics", "Email marketing to past guests"]
        },
        {
            title: "Influencer & Social",
            price: "₹7,500 / mo",
            features: ["Monthly content calendar", "Quarterly micro-influencer collab", "Paid ads management", "Reputation monitoring"]
        },
        {
            title: "BrandEngage Pro",
            price: "₹12,000 / mo",
            features: ["Everything in Influencer & Social", "PR outreach & Press features", "Annual pro photo/video shoot", "Brand storytelling strategy"]
        }
    ];

    const steps = [
        { title: "Discovery Call", desc: "We learn about your property and recommend the best plan." },
        { title: "Onboarding & Setup", desc: "We optimize listings, pricing, and provide templates." },
        { title: "Go Live & Manage", desc: "We handle channels, guests, and operations seamlessly." },
        { title: "Report & Grow", desc: "Regular reports and strategy sessions to maximize revenue." }
    ];

    const faqs = [
        { q: "How is revenue share calculated?", a: "Revenue share is calculated typically on the payout received from platforms after their fees, or on Gross booking value depending on the plan." },
        { q: "Can I upgrade or downgrade my plan later?", a: "Yes! We offer flexibility. You can switch plans with 30 days notice to suit your changing needs." },
        { q: "What if I only need marketing services?", a: "Our Add-ons like 'Digital Presence' or 'BrandEngage Pro' are perfect for hosts who need marketing boost without full management." },
        { q: "Do you provide housekeeping and maintenance?", a: "Yes, our 'TotalCare360' and 'StayPrime' plans include full coordination of housekeeping, laundry, and maintenance." },
        { q: "How does JuxTravel relate to Hostizzy?", a: "JuxTravel is our open marketplace for unique stays. All Hostizzy-managed properties get featured listing priority on JuxTravel." },
        { q: "What locations do you serve?", a: "We currently serve key leisure markets across India including Goa, Manali, Shimla, and major urban metros." },
        { q: "Is there a minimum contract period?", a: "Standard contracts are 1 year, ensuring we have time to optimize and grow your property's performance effectively." }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="section text-center" style={{
                padding: '10rem 0 7rem',
                position: 'relative',
                background: '#0f172a',
                overflow: 'hidden',
                color: 'white'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2400"
                        alt="Background"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9))'
                    }} />
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <h1 className="page-header" style={{ color: 'white' }}>Property Management, <br /><span style={{ color: 'var(--color-primary)' }}>Evolved.</span></h1>
                        <p className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>
                            Hostizzy® blends high-touch hospitality with high-tech optimization to transform your property into a five-star asset. Explore our end-to-end management models.
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

            {/* Pricing Tabs */}
            <section className="section bg-light" id="pricing">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Choose Your Model</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                            {[
                                { id: 'diy', label: 'Starter Setup (DIY)' },
                                { id: 'shared', label: 'Shared Responsibility' },
                                { id: 'full', label: 'Complete Management' }
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
                    </div>

                    <div className="container" style={{ maxWidth: '1000px' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid desktop-2-col"
                                style={{ gap: '2rem', alignItems: 'flex-start' }}
                            >
                                {plans[activeTab].map((plan, i) => (
                                    <div key={i} className="card" style={{
                                        position: 'relative',
                                        background: 'white',
                                        borderRadius: '2rem',
                                        border: plan.popular ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                                        transform: plan.popular ? 'scale(1.02)' : 'none',
                                        boxShadow: plan.popular ? '0 30px 60px -12px rgba(254, 88, 88, 0.15)' : 'var(--shadow-sm)',
                                        overflow: 'hidden'
                                    }}>
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
                                            <div style={{ marginBottom: '2.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                                                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-foreground)' }}>{plan.price}</span>
                                                </div>
                                                <div style={{ fontSize: '1rem', color: 'var(--color-muted)', fontWeight: 500 }}>{plan.period}</div>
                                            </div>
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
                                            <Link href="/contact" className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`} style={{
                                                width: '100%',
                                                padding: '1.25rem',
                                                borderRadius: '1rem',
                                                fontSize: '1.1rem',
                                                fontWeight: 700
                                            }}>
                                                {plan.cta}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Add-ons */}
            <section className="section container">
                <ScrollReveal>
                    <h2 className="text-center" style={{ fontSize: '2rem', marginBottom: '3rem' }}>Marketing Add-Ons</h2>
                </ScrollReveal>
                <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                    {addons.map((addon, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="card glass" style={{ padding: '2rem', height: '100%' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{addon.title}</h3>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1.5rem' }}>{addon.price}</div>
                                <ul style={{ fontSize: '0.9rem', color: '#64748b' }}>
                                    {addon.features.map((f, idx) => (
                                        <li key={idx} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1', marginTop: '7px' }}></div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                                    <Link href="/contact" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Add to Plan →</Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
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

            {/* JuxTravel Promo */}
            <section className="section container">
                <ScrollReveal>
                    <div className="card shadow-premium" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: 'white', padding: '4rem 2rem', textAlign: 'center', borderRadius: '2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Looking to Travel Instead of Host?</h2>
                        <p style={{ maxWidth: '700px', margin: '0 auto 2rem', fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.7 }}>
                            Discover unique stays across India on <strong>JuxTravel</strong>—our open marketplace featuring villas, retreats, urban lofts and luxe homes.
                            Browse Hostizzy-managed properties alongside independents.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="btn" style={{ background: 'white', color: '#0f172a' }}>Explore JuxTravel</button>
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
