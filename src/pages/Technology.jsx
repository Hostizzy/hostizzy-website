import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { MonitorPlay, Smartphone, Database, Lock, Check, Globe, Users, ArrowRight, AppWindow, CheckCircle2, TrendingUp } from 'lucide-react';
import ChannelCarousel from '../components/ChannelCarousel';
import ProductDemo from '../components/ProductDemo';

const Technology = () => {
    return (
        <>
            <SEO
                title="Hostizzy Platform | Vacation Rental Management Technology & Tools"
                description="Explore HostOS, ResIQ, and our proprietary vacation rental management technology. Revenue optimization, automation, and Airbnb marketing services powered by innovation."
                keywords={[
                    'vacation rental management technology',
                    'Airbnb marketing services',
                    'revenue optimization tools',
                    'property management software India',
                    'passive income from property India'
                ]}
                image="https://hostizzy.com/og-technology.jpg"
            />

            <section className="section" style={{
                background: '#0f172a',
                color: 'white',
                padding: 'calc(var(--header-height) + 4rem) 0 6rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                    opacity: 0.5
                }} />
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'var(--color-primary)',
                    filter: 'blur(150px)',
                    opacity: 0.15,
                    zIndex: 0
                }} />
                <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div className="badge mb-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '100px', letterSpacing: '1px' }}>THE PLATFORM ECOSYSTEM</div>
                        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'white' }}>Engineering The <br /><span style={{ color: 'var(--color-primary)' }}>Future of Hosting.</span></h1>
                        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', opacity: 0.8, lineHeight: 1.7, fontWeight: 400 }}>
                            A vertically integrated suite of hospitality technologies. From high-touch management to data-driven marketplaces, we build the tools that empower modern hospitality.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Interactive Product Demo Section */}
            <ProductDemo />

            {/* HostOS Section */}
            <section className="section container">
                <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '3rem' }}>
                    <ScrollReveal x={-30}>
                        <div>
                            <div className="badge mb-sm" style={{ backgroundColor: 'rgba(254, 88, 88, 0.1)', color: 'var(--color-primary)' }}>HostOS v2.0</div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>The Central Nervous System of Hospitality</h2>
                            <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
                                HostOS integrates every aspect of vacation rental management into one seamless interface. From dynamic pricing to guest communications, everything is automated.
                            </p>

                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                                {[
                                    "Unified Calendar for all channels",
                                    "Automated Guest Communication with AI",
                                    "Digital Guest Welcome Books",
                                    "Smart Maintenance Tracking"
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: 'var(--color-foreground)', fontWeight: 500 }}>
                                        <div style={{ background: 'rgba(254, 88, 88, 0.1)', padding: '6px', borderRadius: '50%', display: 'flex' }}>
                                            <Check size={18} color="var(--color-primary)" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/products/hostos" className="btn btn-primary">Explore HostOS <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></Link>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal x={30} delay={0.2}>
                        <div className="card shadow-premium" style={{
                            borderRadius: '2.5rem',
                            padding: '3rem',
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                            border: '1px solid #e2e8f0',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '150px', height: '150px', background: 'rgba(254, 88, 88, 0.05)', borderRadius: '50%', filter: 'blur(30px)' }} />

                            <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', borderLeft: '6px solid #10b981', background: 'white', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)', borderRadius: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem', letterSpacing: '0.5px' }}>RESERVATION #1284</div>
                                    <div className="badge" style={{ backgroundColor: '#dcfce7', color: '#059669', fontSize: '0.7rem', border: 'none' }}>ACTIVE</div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '44px', height: '44px', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '1rem' }}>SJ</div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>Sarah Jenkins</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 500 }}>Villa Escape • Room 4B</div>
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '1.5rem', borderLeft: '6px solid #ef4444', background: 'white', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)', borderRadius: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>MAINTENANCE ALERT</div>
                                    <div className="badge" style={{ backgroundColor: '#fee2e2', color: '#dc2626', fontSize: '0.7rem' }}>URGENT</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                                    <div style={{ fontSize: '1rem', color: '#334155', fontWeight: 600 }}>
                                        AC Service required: <span style={{ color: 'var(--color-primary)' }}>Luxe Suite 102</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ResIQ Section */}
            <section className="section bg-secondary">
                <div className="container">
                    <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '3rem' }}>
                        <ScrollReveal x={-30}>
                            <div style={{ order: 1 }}>
                                <div className="card shadow-premium" style={{ borderRadius: '2rem', padding: '3rem', background: 'white', border: '1px solid var(--color-border)' }}>
                                    <div style={{ marginBottom: '2.5rem' }}>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Total Revenue</div>
                                        <div style={{ fontSize: '3rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0', letterSpacing: '-1px' }}>₹ 4,25,000</div>
                                        <div style={{ fontSize: '1rem', color: '#16a34a', fontWeight: 700 }}>↑ 12.5% vs Last Month</div>
                                    </div>
                                    <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                                        {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                                            <div key={i} style={{ flex: 1, background: i === 6 ? 'var(--color-primary)' : '#e2e8f0', borderRadius: '4px', height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal x={30} delay={0.2}>
                            <div style={{ order: 2 }}>
                                <div className="badge mb-sm" style={{ backgroundColor: 'rgba(254, 88, 88, 0.1)', color: 'var(--color-primary)' }}>ResIQ Analytics</div>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>Intelligence That Drives Revenue</h2>
                                <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)', marginBottom: '3rem', lineHeight: 1.8 }}>
                                    Dynamic insights for property owners. Real-time access to financial performance, occupancy trends, and future projections.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                                    {[
                                        { icon: <MonitorPlay size={24} />, title: "Real-time" },
                                        { icon: <Database size={24} />, title: "Market Data" },
                                        { icon: <Lock size={24} />, title: "Encrypted" },
                                        { icon: <Smartphone size={24} />, title: "Owners App" }
                                    ].map((f, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ color: 'var(--color-primary)' }}>{f.icon}</div>
                                            <div style={{ fontWeight: 700 }}>{f.title}</div>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/products/resiq" className="btn btn-primary">Deep Dive into ResIQ <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Global Distribution Carousel */}
            <ChannelCarousel />

            {/* Mobile App Previews */}
            <section className="section" style={{ backgroundColor: '#0f172a', color: 'white', padding: '6rem 0', overflow: 'hidden' }}>
                <div className="container">
                    <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '3rem' }}>
                        <ScrollReveal x={-30}>
                            <div>
                                <div className="badge mb-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>Hostizzy Mobile</div>
                                <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.1 }}>Management at Your Fingertips</h2>
                                <p style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '3rem' }}>
                                    Stay connected to your business from anywhere. Our mobile apps for iOS and Android give owners and staff real-time visibility and control.
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {[
                                        { title: "Real-time Notifications", desc: "Never miss a booking inquiry or maintenance alert." },
                                        { title: "Live Revenue Tracker", desc: "Watch your earnings grow in real-time with daily payouts." },
                                        { title: "Staff Coordination", desc: "Assign tasks to housekeeping and maintenance instantly." }
                                    ].map((f, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                                            <div style={{ color: 'var(--color-primary)', marginTop: '4px' }}><CheckCircle2 size={24} /></div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>{f.title}</div>
                                                <div style={{ opacity: 0.7, fontSize: '0.95rem' }}>{f.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal x={30} delay={0.2}>
                            <div style={{ position: 'relative' }}>
                                {/* Floating Glass Card */}
                                <div style={{
                                    position: 'absolute', top: '20%', left: '-10%', zIndex: 10,
                                    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                                    padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.2)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                }}>
                                    <TrendingUp size={32} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                                    <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>Daily Bookings</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>+128%</div>
                                </div>

                                <img
                                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
                                    alt="Hostizzy Mobile App"
                                    style={{
                                        width: '100%',
                                        maxWidth: '400px',
                                        borderRadius: '3rem',
                                        boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)',
                                        border: '10px solid #1e293b',
                                        margin: '0 auto',
                                        display: 'block'
                                    }}
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* JuxTravel & TravelCRM Cards */}
            <section className="section container">
                <div className="grid desktop-2-col" style={{ gap: '3rem' }}>
                    <ScrollReveal y={30}>
                        <div className="card shadow-premium" style={{ padding: '4rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '2.5rem' }}>
                            <div className="badge mb-sm" style={{ background: '#8b5cf6', color: 'white' }}>COMING SOON</div>
                            <Globe size={48} color="#8b5cf6" style={{ marginBottom: '2rem' }} />
                            <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem' }}>JuxTravel Marketplace</h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                                Direct bookings, AI-powered travel recommendations, and a community-driven travel marketplace for India's best villas.
                            </p>
                            <Link to="/products/juxtravel" className="btn" style={{ background: 'white', border: '1px solid #e2e8f0', padding: '1rem 2rem' }}>Experience JuxTravel</Link>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal y={30} delay={0.2}>
                        <div className="card shadow-premium" style={{ padding: '4rem', background: '#0f172a', color: 'white', borderRadius: '2.5rem' }}>
                            <div className="badge mb-sm" style={{ background: '#10b981', color: 'white' }}>LEAD MANAGEMENT</div>
                            <Users size={48} color="#10b981" style={{ marginBottom: '2rem' }} />
                            <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem' }}>TravelCRM</h2>
                            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '2.5rem', lineHeight: 1.7 }}>
                                The "Missing Middle" solution for vacation rentals. Track leaks, convert WhatsApp inquiries, and build guest loyalty.
                            </p>
                            <Link to="/products/travelcrm" className="btn btn-primary" style={{ background: '#10b981', border: 'none', padding: '1rem 2rem' }}>Deep Dive into CRM</Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
};

export default Technology;
