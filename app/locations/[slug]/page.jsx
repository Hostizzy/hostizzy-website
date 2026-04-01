'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ScrollReveal from '../../../components/ScrollReveal';
import SEO from '../../../components/SEO';
import { getLocation } from '@/lib/locations';
import {
    Check, ArrowRight, MapPin, Home, Star, TrendingUp, Calendar,
    Building, Phone, MessageCircle
} from 'lucide-react';

const propertyTypeDescriptions = {
    'Farmhouses': 'Spacious farmhouses perfect for weekend getaways, events, and corporate retreats.',
    'Villas': 'Luxury villas offering premium amenities and private living spaces.',
    'Apartments': 'Modern apartments ideal for short and medium-term stays in urban areas.',
    'Boutique Homes': 'Unique, character-rich homes that deliver memorable guest experiences.',
    'Mountain Cottages': 'Cozy cottages nestled in the hills with stunning mountain views.',
    'Boutique Homestays': 'Warm, locally-inspired homestays with authentic hospitality.',
    'Heritage Homes': 'Historic properties restored and managed for heritage tourism.',
    'Mountain Retreats': 'Secluded retreats offering peace, nature, and rejuvenation.',
    'Farmstays': 'Rural properties blending agriculture tourism with comfortable stays.',
    'Wellness Properties': 'Properties designed for yoga, meditation, and wellness tourism.',
    'Riverside Homes': 'Properties along rivers offering scenic views and adventure access.',
    'Heritage Havelis': 'Traditional Rajasthani havelis converted into heritage vacation rentals.',
    'Luxury Villas': 'High-end villas with premium design, pools, and concierge services.',
    'Desert Camps': 'Unique desert glamping and camping experiences with luxury touches.',
    'Palace Stays': 'Royal palace properties offering regal accommodation experiences.'
};

const fullManagementServices = [
    'Multi-platform listing creation and optimization',
    'Dynamic pricing and revenue management',
    '24/7 guest communication and support',
    'Professional photography and content creation',
    'Housekeeping and turnover coordination',
    'Maintenance management and vendor coordination',
    'Monthly performance reports and strategy reviews',
    'Direct booking website and marketing'
];

const sharedServices = [
    'Multi-platform listing optimization',
    'Dynamic pricing and revenue management',
    'Channel management across OTAs',
    'Performance analytics and reporting',
    'Marketing strategy and execution',
    'Guest communication templates and support'
];

export default function LocationPage() {
    const params = useParams();
    const slug = params?.slug;
    const location = getLocation(slug);

    if (!location) {
        return (
            <section className="section text-center" style={{
                padding: 'calc(var(--header-height) + 6rem) 0 6rem',
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Location Not Found</h1>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>The location you are looking for does not exist.</p>
                    <Link href="/locations" className="btn btn-gradient">View All Locations</Link>
                </div>
            </section>
        );
    }

    const isFull = location.serviceModel === 'full';
    const services = isFull ? fullManagementServices : sharedServices;

    const localBusinessSchema = {
        "@type": "LocalBusiness",
        "name": `Hostizzy - ${location.name}`,
        "description": location.description,
        "url": `https://www.hostizzy.com/locations/${location.slug}`,
        "telephone": "+91-9220-4444-08",
        "email": "hello@hostizzy.com",
        "areaServed": {
            "@type": "State",
            "name": location.name
        },
        "parentOrganization": {
            "@type": "Organization",
            "name": "Hostizzy",
            "url": "https://www.hostizzy.com"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "E 13/29, 1st Floor, Harsha Bhawan, Connaught Place",
            "addressLocality": "New Delhi",
            "addressRegion": "Delhi",
            "postalCode": "110001",
            "addressCountry": "IN"
        }
    };

    return (
        <>
            <SEO
                title={location.heroTitle}
                description={location.heroSubtitle}
                keywords={location.keywords}
                schema={localBusinessSchema}
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
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.4rem 1.2rem',
                                borderRadius: '2rem',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                background: isFull ? 'rgba(34, 197, 94, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                                color: isFull ? '#4ade80' : '#60a5fa',
                                border: `1px solid ${isFull ? 'rgba(34, 197, 94, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                            }}>
                                {isFull ? 'Full Management' : 'Shared Services'}
                            </span>
                        </div>
                        <h1 className="page-header" style={{
                            color: 'white',
                            fontFamily: 'var(--font-serif, Georgia, serif)',
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            lineHeight: 1.15,
                            marginBottom: '1.5rem'
                        }}>
                            {location.heroTitle}
                        </h1>
                        <p className="section-subtitle" style={{
                            maxWidth: '750px',
                            margin: '0 auto 2.5rem',
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '1.15rem',
                            lineHeight: 1.7
                        }}>
                            {location.heroSubtitle}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href={`/contact?loc=${slug}`} className="btn btn-gradient" style={{
                                padding: '1rem 2.5rem',
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                borderRadius: '0.75rem'
                            }}>
                                Partner With Us
                            </Link>
                            <Link href="/calculator" className="btn btn-outline" style={{
                                padding: '1rem 2.5rem',
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                borderRadius: '0.75rem',
                                borderColor: 'rgba(255,255,255,0.3)',
                                color: 'white'
                            }}>
                                Calculate Earnings
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Stats Row */}
            <section style={{ background: '#f8fafc', padding: '2.5rem 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem',
                        textAlign: 'center'
                    }}>
                        {[
                            { icon: <Building size={22} color="var(--color-primary)" />, label: 'Properties', value: location.stats.properties },
                            { icon: <TrendingUp size={22} color="var(--color-primary)" />, label: 'Avg Occupancy', value: location.stats.avgOccupancy },
                            { icon: <Star size={22} color="var(--color-primary)" />, label: 'Guest Rating', value: location.stats.avgRating },
                            { icon: <Calendar size={22} color="var(--color-primary)" />, label: 'Peak Season', value: location.stats.peakSeason }
                        ].map((stat, i) => (
                            <div key={i} style={{
                                padding: '1.25rem',
                                background: 'white',
                                borderRadius: '1rem',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                            }}>
                                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-foreground)' }}>{stat.value}</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About This Market */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '3rem', textAlign: 'center' }}>
                            About the {location.name} Market
                        </h2>
                    </ScrollReveal>
                    <div className="grid desktop-2-col" style={{ gap: '3rem', alignItems: 'flex-start' }}>
                        <ScrollReveal>
                            <div>
                                <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.8, marginBottom: '2rem' }}>
                                    {location.description}
                                </p>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>Market Highlights</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {location.marketHighlights.map((highlight, i) => (
                                        <li key={i} style={{
                                            display: 'flex',
                                            gap: '0.75rem',
                                            marginBottom: '1rem',
                                            fontSize: '0.95rem',
                                            color: '#334155',
                                            alignItems: 'flex-start'
                                        }}>
                                            <div style={{
                                                marginTop: '3px',
                                                background: 'rgba(34, 197, 94, 0.1)',
                                                borderRadius: '50%',
                                                padding: '3px',
                                                flexShrink: 0
                                            }}>
                                                <Check size={14} color="#22c55e" strokeWidth={3} />
                                            </div>
                                            <span style={{ lineHeight: 1.5 }}>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1}>
                            <div className="card" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={20} color="var(--color-primary)" /> Cities We Serve
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    {location.cities.map((city, i) => (
                                        <span key={i} style={{
                                            display: 'inline-block',
                                            padding: '0.5rem 1.25rem',
                                            background: 'rgba(254, 88, 88, 0.08)',
                                            color: 'var(--color-primary)',
                                            borderRadius: '2rem',
                                            fontSize: '0.9rem',
                                            fontWeight: 600
                                        }}>
                                            {city}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Property Types We Manage */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <ScrollReveal>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '3rem', textAlign: 'center' }}>
                            Property Types We Manage
                        </h2>
                    </ScrollReveal>
                    <div className="grid desktop-4-col" style={{ gap: '1.5rem' }}>
                        {location.propertyTypes.map((type, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="card" style={{
                                    padding: '2rem',
                                    borderRadius: '1.5rem',
                                    textAlign: 'center',
                                    height: '100%',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <div style={{
                                        marginBottom: '1rem',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: '0.75rem',
                                        background: 'rgba(254, 88, 88, 0.1)',
                                        borderRadius: '1rem',
                                        width: 'fit-content',
                                        margin: '0 auto 1rem'
                                    }}>
                                        <Home size={28} color="var(--color-primary)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-foreground)' }}>
                                        {type}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                                        {propertyTypeDescriptions[type] || `Professional management for ${type.toLowerCase()} in ${location.name}.`}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Available */}
            <section className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <ScrollReveal>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center' }}>
                            Services Available in {location.name}
                        </h2>
                        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '3rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                            {isFull
                                ? 'We offer end-to-end property management so you can earn passive income without the operational hassle.'
                                : 'We offer revenue management and marketing services to help you maximize your property\'s earning potential.'}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal>
                        <div className="card" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {services.map((service, i) => (
                                    <li key={i} style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        marginBottom: i < services.length - 1 ? '1.25rem' : 0,
                                        fontSize: '1rem',
                                        color: '#334155',
                                        alignItems: 'flex-start'
                                    }}>
                                        <div style={{
                                            marginTop: '3px',
                                            background: 'rgba(254, 88, 88, 0.1)',
                                            borderRadius: '50%',
                                            padding: '4px',
                                            flexShrink: 0
                                        }}>
                                            <Check size={14} color="var(--color-primary)" strokeWidth={3} />
                                        </div>
                                        <span style={{ lineHeight: 1.5 }}>{service}</span>
                                    </li>
                                ))}
                            </ul>
                            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <Link href="/services" style={{
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    color: 'var(--color-primary)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}>
                                    View all services and pricing <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Revenue Calculator CTA */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container text-center">
                    <ScrollReveal>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
                            How much can your {location.name} property earn?
                        </h2>
                        <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                            Use our free revenue calculator to estimate your property&apos;s earning potential with professional management.
                        </p>
                        <Link href="/calculator" className="btn btn-gradient" style={{
                            padding: '1rem 3rem',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            borderRadius: '0.75rem'
                        }}>
                            Calculate Earnings
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="section" style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                color: 'white',
                padding: '5rem 0'
            }}>
                <div className="container text-center">
                    <ScrollReveal>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>
                            Ready to maximize your {location.name} property?
                        </h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem', opacity: 0.85, lineHeight: 1.7 }}>
                            Join property owners across {location.name} who trust Hostizzy to deliver exceptional returns and five-star guest experiences.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href={`/contact?loc=${slug}`} className="btn" style={{
                                background: 'white',
                                color: '#0f172a',
                                padding: '1rem 2.5rem',
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                borderRadius: '0.75rem',
                                textDecoration: 'none'
                            }}>
                                Partner With Us
                            </Link>
                            <a
                                href="https://wa.me/919220444408?text=Hi%20Hostizzy%2C%20I%20have%20a%20property%20I%27d%20like%20to%20discuss."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    color: 'white',
                                    padding: '1rem 2.5rem',
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    borderRadius: '0.75rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    textDecoration: 'none'
                                }}
                            >
                                <MessageCircle size={18} /> WhatsApp Us
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Mobile Stats Responsive Override */}
            <style jsx>{`
                @media (max-width: 768px) {
                    section > div > div[style*="grid-template-columns: repeat(4"] {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </>
    );
}
