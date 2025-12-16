import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { MonitorPlay, Smartphone, Database, Lock, Check } from 'lucide-react';

const Technology = () => {
    return (
        <>
            <SEO
                title="Technology & Innovation"
                description="Explore HostOS and ResIQ - Hostizzy's proprietary technology stack for advanced property management and real-time analytics."
            />

            <section className="section" style={{ background: 'linear-gradient(to right, var(--color-primary), #1e40af)', color: 'white', padding: '6rem 0' }}>
                <div className="container text-center">
                    <ScrollReveal>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Technology at Hostizzy</h1>
                        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', opacity: 0.9 }}>
                            We don't just manage properties; we engineer success. Our proprietary SaaS platforms perform heavy lifting so you don't have to.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* HostOS Section */}
            <section className="section container">
                <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '5rem' }}>
                    <ScrollReveal x={-30}>
                        <div>
                            <div style={{ textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '1px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                Property Management System
                            </div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>HostOS Platform</h2>
                            <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
                                The central nervous system of our operations. HostOS integrates every aspect of vacation rental management into one seamless interface.
                            </p>

                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    "Unified Calendar for all channels (Airbnb, Booking.com, etc.)",
                                    "Automated Guest Communication workflows",
                                    "Digital Guest Welcome Books & Local Guides",
                                    "Maintenance Tracking & Vendor Management"
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.05rem', color: '#334155' }}>
                                        <div style={{ background: '#dbeafe', padding: '4px', borderRadius: '50%' }}><Check size={16} color="var(--color-primary)" /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* Visual Representation */}
                    <ScrollReveal x={30} delay={0.2}>
                        <div className="glass" style={{
                            borderRadius: '1.5rem',
                            padding: '2.5rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            background: 'rgba(255,255,255,0.8)',
                            transform: 'rotateY(-5deg) rotateX(5deg)',
                            perspective: '1000px'
                        }}>
                            <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '4px solid #16a34a' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: 700, color: '#1e293b' }}>Reservation #1284</div>
                                    <div style={{ padding: '0.25rem 0.75rem', background: '#dcfce7', color: '#166534', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>Confirmed</div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#f1f5f9', borderRadius: '50%' }}></div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '1rem' }}>Sarah Jenkins</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Check-in: Today, 2:00 PM</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '4px solid #ef4444' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: 700, color: '#1e293b' }}>Maintenance Alert</div>
                                    <div style={{ padding: '0.25rem 0.75rem', background: '#fee2e2', color: '#991b1b', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>High Priority</div>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#334155' }}>AC Service required for Villa 4B - Master Bedroom</div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ResIQ Section */}
            <section className="section" style={{ backgroundColor: '#f8fafc' }}>
                <div className="container">
                    <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '5rem' }}>
                        {/* Visual */}
                        <ScrollReveal x={-30}>
                            <div style={{ order: 1 }}>
                                <div className="glass" style={{
                                    borderRadius: '1.5rem',
                                    padding: '2.5rem',
                                    border: '1px solid rgba(255,255,255,0.6)',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                    background: 'white'
                                }}>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Revenue (This Month)</div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0' }}>₹ 4,25,000</div>
                                        <div style={{ fontSize: '0.9rem', color: '#16a34a', fontWeight: 600 }}>+12.5% vs Last Month</div>
                                    </div>
                                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                                        {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                                            <div key={i} style={{
                                                flex: 1,
                                                backgroundColor: i === 6 ? 'var(--color-primary)' : '#e2e8f0',
                                                borderRadius: '6px 6px 0 0',
                                                height: `${h}%`,
                                                transition: 'height 1s ease-out'
                                            }}></div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal x={30} delay={0.2}>
                            <div style={{ order: 2 }}>
                                <div style={{ textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '1px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                    Analytics & Intelligence
                                </div>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>ResIQ Dashboard</h2>
                                <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                                    Data is power. ResIQ provides property owners with transparent, real-time access to financial performance, occupancy trends, and future projections.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    {[
                                        { icon: <MonitorPlay size={32} color="var(--color-primary)" />, title: "Real-time Data", desc: "Instant visibility into bookings." },
                                        { icon: <Smartphone size={32} color="var(--color-primary)" />, title: "Mobile First", desc: "Access from anywhere." },
                                        { icon: <Database size={32} color="var(--color-primary)" />, title: "Market Insights", desc: "Competitive analysis." },
                                        { icon: <Lock size={32} color="var(--color-primary)" />, title: "Secure & Private", desc: "Bank-grade security." }
                                    ].map((f, i) => (
                                        <div key={i}>
                                            <div style={{ marginBottom: '0.75rem' }}>{f.icon}</div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{f.title}</h4>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Technology;
