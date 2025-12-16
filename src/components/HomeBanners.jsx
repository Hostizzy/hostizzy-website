import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const HomeBanners = () => {
    return (
        <section className="section container">
            {/* Top Banners */}
            <div className="grid desktop-2-col" style={{ gap: '2rem' }}>
                {/* Banner 1: JuxTravel */}
                <ScrollReveal x={-50}>
                    <div className="glass" style={{
                        padding: '3rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                        border: '1px solid #bae6fd',
                        height: '100%'
                    }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.75rem', color: '#0369a1' }}>Looking to Book or Explore Unique Stays?</h3>
                        <p style={{ marginBottom: '2rem', color: '#334155', lineHeight: 1.6 }}>
                            Visit our sister site <strong>JuxTravel</strong> to discover and book verified properties across India—including stays managed by Hostizzy and unique homes listed by independent hosts.
                        </p>
                        <a href="https://hostizzy.dtravel.com/" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#0284c7', color: 'white' }}>
                            Visit JuxTravel <ExternalLink size={18} style={{ marginLeft: '0.5rem' }} />
                        </a>
                    </div>
                </ScrollReveal>

                {/* Banner 2: Partner */}
                <ScrollReveal x={50}>
                    <div className="glass" style={{
                        padding: '3rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)',
                        border: '1px solid #fde047',
                        height: '100%'
                    }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.75rem', color: '#854d0e' }}>Unlock Your Property's Potential</h3>
                        <p style={{ marginBottom: '2rem', color: '#334155', lineHeight: 1.6 }}>
                            Partner with us to create lasting value. Together, we can turn your space into an opportunity for growth with our comprehensive management.
                        </p>
                        <a href="/contact" className="btn" style={{ background: '#ca8a04', color: 'white' }}>
                            Partner With Us Today <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </a>
                    </div>
                </ScrollReveal>
            </div>

            {/* SEO & Story Section */}
            <div style={{ marginTop: '5rem' }}>
                <ScrollReveal>
                    <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '4rem' }}>
                        <div>
                            <span style={{ color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Why Hostizzy?</span>
                            <h2 style={{ fontSize: '2.5rem', margin: '1rem 0', lineHeight: 1.2 }}>Redefining Vacation Rental Management</h2>
                            <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                We are not just a property management company; we are experience curators. From <strong style={{ color: '#334155' }}>Airbnb optimization</strong> to
                                <strong style={{ color: '#334155' }}> luxury villa staffing</strong>, Hostizzy ensures your property yields maximum returns while guests enjoy 5-star hospitality.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                                {['End-to-End Co-hosting Services', 'Dynamic Pricing & Yield Management', 'Premium Guest Experiences & Concierge'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.05rem', color: '#334155' }}>
                                        <div style={{ width: '8px', height: '8px', background: 'var(--color-primary)', borderRadius: '50%' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Video Story Placeholder */}
                        <div style={{
                            aspectRatio: '16/9',
                            background: '#1e293b',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ textAlign: 'center', color: 'white', zIndex: 10 }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{
                                        marginLeft: '4px',
                                        width: 0,
                                        height: 0,
                                        borderTop: '10px solid transparent',
                                        borderBottom: '10px solid transparent',
                                        borderLeft: '16px solid var(--color-primary)'
                                    }} />
                                </div>
                                <h4 style={{ fontSize: '1.2rem' }}>Watch Our Story</h4>
                            </div>
                            {/* Faux Overlay */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))' }} />
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default HomeBanners;
