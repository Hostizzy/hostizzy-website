'use client';

import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import { Heart, Users, Camera, Sparkles, MapPin, Bed, User, Star, Calendar, ArrowRight, Check, Send } from 'lucide-react';

const Weddings = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        weddingDate: '',
        guestCount: '',
        message: '',
        propertyInterest: ''
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await fetch('/api/properties');
            const data = await res.json();
            // Filter properties suitable for weddings (large capacity or wedding-specific)
            const weddingVenues = data.filter(p =>
                p.bedrooms >= 4 ||
                p.title.toLowerCase().includes('villa') ||
                p.title.toLowerCase().includes('estate') ||
                p.title.toLowerCase().includes('resort')
            );
            setProperties(weddingVenues);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    subject: `Wedding Inquiry - ${formData.name}`,
                    type: 'wedding'
                })
            });

            if (response.ok) {
                alert('Thank you! Our wedding specialist will contact you within 24 hours.');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    weddingDate: '',
                    guestCount: '',
                    message: '',
                    propertyInterest: ''
                });
            }
        } catch (error) {
            alert('Something went wrong. Please try calling us directly.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const features = [
        {
            icon: <Heart size={32} />,
            title: 'Dream Destination Weddings',
            description: 'Create unforgettable memories at stunning venues across India - from beachfront villas to palace estates'
        },
        {
            icon: <Users size={32} />,
            title: 'Accommodates 50-200 Guests',
            description: 'Spacious properties with multiple rooms perfect for hosting your entire wedding party and family'
        },
        {
            icon: <Camera size={32} />,
            title: 'Instagram-Worthy Locations',
            description: 'Breathtaking backdrops for your wedding photos that will make your celebration truly memorable'
        },
        {
            icon: <Sparkles size={32} />,
            title: 'Full-Service Support',
            description: 'Dedicated wedding coordinator, vendor connections, decoration setup, and end-to-end management'
        }
    ];

    const services = [
        'Venue setup and decoration coordination',
        'Guest accommodation management',
        'Local vendor partnerships (caterers, decorators, photographers)',
        'Event planning consultation',
        'Multi-day booking flexibility',
        'Pre-wedding photoshoot access',
        'Mehndi & Sangeet ceremony spaces',
        'On-site event coordination',
        'Customizable packages for your needs',
        'Exclusive property access for your events'
    ];

    return (
        <>
            <SEO
                title="Wedding Venues & Destination Wedding Properties | Hostizzy"
                description="Book stunning destination wedding venues across India. Exclusive villas, resorts, and estates perfect for your dream wedding. Full-service wedding planning support included."
            />

            {/* Hero Section */}
            <section className="section bg-primary text-white" style={{
                padding: 'calc(var(--header-height) + 4rem) 0 5rem',
                background: 'linear-gradient(135deg, #FE5858 0%, #EE4B4B 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1.5rem',
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '2rem',
                                marginBottom: '2rem',
                                border: '1px solid rgba(255, 255, 255, 0.3)'
                            }}>
                                <Heart size={18} />
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Premium Destination Wedding Venues</span>
                            </div>

                            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem', fontWeight: 900, lineHeight: 1.1, color: 'white' }}>
                                Say "I Do" in Paradise
                            </h1>

                            <p style={{ fontSize: '1.3rem', opacity: 0.95, marginBottom: '3rem', lineHeight: 1.6, color: 'white' }}>
                                Exclusive wedding venues & destination properties across India
                                <br />Perfect for intimate ceremonies to grand celebrations
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <a href="#venues" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                                    Explore Venues
                                </a>
                                <a href="#inquiry" className="btn btn-outline" style={{
                                    fontSize: '1.1rem',
                                    padding: '1rem 2.5rem',
                                    background: 'rgba(255,255,255,0.15)',
                                    color: 'white',
                                    border: '2px solid rgba(255,255,255,0.4)'
                                }}>
                                    Plan My Wedding
                                </a>
                            </div>

                            {/* Trust Stats */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                gap: '2rem',
                                marginTop: '4rem',
                                padding: '2.5rem 2rem',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '1.5rem',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>25+</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Wedding Venues</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>150+</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Weddings Hosted</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>4.9★</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Guest Rating</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>50-200</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Guest Capacity</div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Features Section */}
            <section className="section container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Choose Hostizzy for Your Wedding</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '700px', margin: '0 auto' }}>
                            We make destination weddings effortless with premium venues and full-service support
                        </p>
                    </div>

                    <div className="grid desktop-2-col" style={{ gap: '2rem' }}>
                        {features.map((feature, index) => (
                            <div key={index} className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto 1.5rem',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #FE5858 0%, #FF8888 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Services Included */}
            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Full-Service Wedding Support</h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '700px', margin: '0 auto' }}>
                                Everything you need for a perfect celebration, taken care of
                            </p>
                        </div>

                        <div className="grid desktop-2-col" style={{ gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
                            {services.map((service, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.25rem',
                                    background: 'white',
                                    borderRadius: '0.75rem',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: '#22C55E',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Check size={14} color="white" />
                                    </div>
                                    <span style={{ fontWeight: 500 }}>{service}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Venues Section */}
            <section id="venues" className="section container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Wedding Venues</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)' }}>
                            Exclusive properties perfect for your special day
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <div className="spinner"></div>
                            <p style={{ marginTop: '1rem', color: 'var(--color-muted)' }}>Loading venues...</p>
                        </div>
                    ) : properties.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)' }}>
                                Wedding venues coming soon. Contact us for availability.
                            </p>
                        </div>
                    ) : (
                        <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                            {properties.slice(0, 6).map((property) => (
                                <Link href={`/properties/${property.id}`} key={property.id} style={{ textDecoration: 'none' }}>
                                    <div className="card" style={{
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        height: '100%'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    }}>
                                        <div style={{ position: 'relative', paddingTop: '66.67%', overflow: 'hidden' }}>
                                            <img
                                                src={property.images?.[0] || '/placeholder.jpg'}
                                                alt={property.title}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: '1rem',
                                                right: '1rem',
                                                background: 'rgba(254, 88, 88, 0.95)',
                                                color: 'white',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '2rem',
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.3rem'
                                            }}>
                                                <Heart size={14} />
                                                Wedding Venue
                                            </div>
                                        </div>
                                        <div style={{ padding: '1.5rem' }}>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-foreground)' }}>
                                                {property.title}
                                            </h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                                <MapPin size={16} />
                                                <span>{property.location}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Bed size={16} color="var(--color-muted)" />
                                                    <span>{property.bedrooms} Bedrooms</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <User size={16} color="var(--color-muted)" />
                                                    <span>Up to {property.bedrooms * 3} Guests</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Starting from</div>
                                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                                        ₹{property.price ? property.price.toLocaleString() : 'Contact'}
                                                    </div>
                                                </div>
                                                <ArrowRight size={20} color="var(--color-primary)" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {properties.length > 6 && (
                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <Link href="/properties" className="btn btn-outline">
                                View All Venues
                            </Link>
                        </div>
                    )}
                </ScrollReveal>
            </section>

            {/* Inquiry Form */}
            <section id="inquiry" className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Plan Your Dream Wedding</h2>
                                <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)' }}>
                                    Tell us about your vision and our wedding specialist will contact you within 24 hours
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem' }}>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div className="grid desktop-2-col" style={{ gap: '1.5rem' }}>
                                        <div className="form-group">
                                            <label>Your Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid desktop-2-col" style={{ gap: '1.5rem' }}>
                                        <div className="form-group">
                                            <label>Phone Number *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Wedding Date</label>
                                            <input
                                                type="date"
                                                name="weddingDate"
                                                value={formData.weddingDate}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Expected Guest Count</label>
                                        <select name="guestCount" value={formData.guestCount} onChange={handleChange}>
                                            <option value="">Select guest count</option>
                                            <option value="50-100">50-100 guests</option>
                                            <option value="100-150">100-150 guests</option>
                                            <option value="150-200">150-200 guests</option>
                                            <option value="200+">200+ guests</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Preferred Property (Optional)</label>
                                        <select name="propertyInterest" value={formData.propertyInterest} onChange={handleChange}>
                                            <option value="">Any available venue</option>
                                            {properties.map(p => (
                                                <option key={p.id} value={p.title}>{p.title} - {p.location}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Tell us about your wedding vision</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            placeholder="Share details about your dream wedding, preferred dates, budget, specific requirements..."
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-gradient" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        <Send size={18} />
                                        Send Wedding Inquiry
                                    </button>

                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', textAlign: 'center', marginTop: '0.5rem' }}>
                                        Our wedding specialist will contact you within 24 hours with venue options and pricing
                                    </p>
                                </div>
                            </form>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section container">
                <ScrollReveal>
                    <div className="card glass" style={{
                        padding: '4rem 3rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(254, 88, 88, 0.1), rgba(254, 88, 88, 0.05))'
                    }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Plan Your Dream Wedding?</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Our team has helped couples create magical wedding experiences. Let us make your special day unforgettable.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="tel:+919876543210" className="btn btn-gradient" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                                Call Us Now
                            </a>
                            <a href="https://wa.me/919876543210?text=Hi,%20I'm%20interested%20in%20booking%20a%20wedding%20venue" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </>
    );
};

export default Weddings;
