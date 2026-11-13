'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import StayWithHostizzy from './StayWithHostizzy';

const HomeBanners = () => {
    return (
        <section className="section container">
            {/* Guest exit: deep links to specific booking-site pages
                rather than one generic "Book Now" to its home page. */}
            <ScrollReveal>
                <StayWithHostizzy />
            </ScrollReveal>

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

                        {/* Video Embed */}
                        <div style={{
                            aspectRatio: '16/9',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                        }}>
                            <iframe
                                src="https://www.youtube.com/embed/0c07HfA1tQw?rel=0"
                                title="India's Host Story — Why Hostizzy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ width: '100%', height: '100%', border: 'none' }}
                            />
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default HomeBanners;
