'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '../../components/ScrollReveal';
import SEO from '../../components/SEO';
import { LOCATIONS } from '@/lib/locations';
import { MapPin, ArrowRight, Building } from 'lucide-react';

const locationList = Object.values(LOCATIONS);

export default function LocationsIndex() {
    return (
        <>
            <SEO
                title="Where We Operate"
                description="Hostizzy provides professional vacation rental management across Delhi NCR, Himachal Pradesh, Uttarakhand, and Rajasthan. Explore our locations."
                keywords={['Hostizzy locations', 'vacation rental management India', 'property management Delhi', 'Airbnb management Himachal', 'villa management Rajasthan']}
            />

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
                        <h1 className="page-header" style={{ color: 'white' }}>
                            Where We <span style={{ color: 'var(--color-primary)' }}>Operate</span>
                        </h1>
                        <p className="section-subtitle" style={{
                            maxWidth: '700px',
                            margin: '0 auto',
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '1.15rem',
                            lineHeight: 1.7
                        }}>
                            Professional vacation rental management across India&apos;s most sought-after destinations. From urban getaways to mountain retreats.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Location Cards */}
            <section className="section">
                <div className="container">
                    <div className="grid desktop-2-col" style={{ gap: '2rem' }}>
                        {locationList.map((loc, i) => (
                            <ScrollReveal key={loc.slug} delay={i * 0.1}>
                                <Link href={`/locations/${loc.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                    <div className="card" style={{
                                        padding: '2.5rem',
                                        borderRadius: '1.5rem',
                                        height: '100%',
                                        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                                        border: '1px solid var(--color-border)',
                                        cursor: 'pointer'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-6px)';
                                            e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0,0,0,0.1)';
                                            e.currentTarget.style.borderColor = 'var(--color-primary-light)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.borderColor = 'var(--color-border)';
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-foreground)', margin: 0 }}>
                                                {loc.name}
                                            </h2>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.3rem 1rem',
                                                borderRadius: '2rem',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                background: loc.serviceModel === 'full' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                                color: loc.serviceModel === 'full' ? '#16a34a' : '#2563eb',
                                                letterSpacing: '0.03em'
                                            }}>
                                                {loc.serviceModel === 'full' ? 'Full Management' : 'Shared Services'}
                                            </span>
                                        </div>

                                        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                            {loc.heroSubtitle}
                                        </p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: '#64748b', fontSize: '0.9rem' }}>
                                            <MapPin size={16} color="var(--color-primary)" />
                                            <span>{loc.cities.length} cities</span>
                                            <span style={{ margin: '0 0.25rem' }}>&middot;</span>
                                            <Building size={16} color="var(--color-primary)" />
                                            <span>{loc.stats.properties} properties</span>
                                        </div>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                            {loc.cities.slice(0, 4).map((city, ci) => (
                                                <span key={ci} style={{
                                                    padding: '0.3rem 0.8rem',
                                                    background: '#f1f5f9',
                                                    borderRadius: '1rem',
                                                    fontSize: '0.8rem',
                                                    color: '#475569',
                                                    fontWeight: 500
                                                }}>
                                                    {city}
                                                </span>
                                            ))}
                                            {loc.cities.length > 4 && (
                                                <span style={{
                                                    padding: '0.3rem 0.8rem',
                                                    background: '#f1f5f9',
                                                    borderRadius: '1rem',
                                                    fontSize: '0.8rem',
                                                    color: '#475569',
                                                    fontWeight: 500
                                                }}>
                                                    +{loc.cities.length - 4} more
                                                </span>
                                            )}
                                        </div>

                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            color: 'var(--color-primary)',
                                            fontWeight: 600,
                                            fontSize: '0.95rem'
                                        }}>
                                            Learn More <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section text-center" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <ScrollReveal>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Don&apos;t see your location?</h2>
                        <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                            We&apos;re expanding rapidly. Get in touch and we&apos;ll let you know if we can manage your property.
                        </p>
                        <Link href="/contact" className="btn btn-gradient" style={{
                            padding: '1rem 3rem',
                            fontSize: '1.1rem',
                            fontWeight: 700
                        }}>
                            Contact Us
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
