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
        daysRequired: '',
        budget: '',
        message: '',
        propertyInterest: ''
    });

    // Calculator state
    const [calculator, setCalculator] = useState({
        guests: 50,
        needRooms: false,
        meals: 2,
        decoration: 'basic'
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
            title: 'Lawn Capacity Up to 800 Guests',
            description: 'Spacious outdoor lawns perfect for grand celebrations, accommodating intimate gatherings to large wedding ceremonies'
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
                background: 'linear-gradient(135deg, rgba(254, 88, 88, 0.95) 0%, rgba(238, 75, 75, 0.90) 100%)',
                backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'multiply',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
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

                            {/* Real Performance Stats */}
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
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>40+</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Weddings Hosted</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>15,000+</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Guests Served</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>₹1.5 CR</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total GMV</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>4-5</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Exclusive Venues</div>
                                </div>
                            </div>

                            {/* Expansion Badge */}
                            <div style={{
                                marginTop: '2rem',
                                padding: '1.25rem 2rem',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                                borderRadius: '1rem',
                                border: '1px solid rgba(255,255,255,0.25)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                                    🚀 Now Expanding to Delhi NCR
                                </div>
                                <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                                    Exclusive & non-exclusive venues coming soon
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
            <section id="inquiry" className="section" style={{
                background: 'linear-gradient(135deg, #FEF1F1 0%, #FCE4E4 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(254, 88, 88, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-100px',
                    left: '-100px',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(254, 88, 88, 0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                            {/* Header */}
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1.5rem',
                                    background: 'rgba(254, 88, 88, 0.1)',
                                    borderRadius: '2rem',
                                    marginBottom: '1.5rem',
                                    border: '1px solid rgba(254, 88, 88, 0.2)'
                                }}>
                                    <Heart size={16} color="#FE5858" />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FE5858' }}>Let's Make It Magical</span>
                                </div>
                                <h2 style={{ fontSize: '2.75rem', marginBottom: '1rem', fontWeight: 900, color: '#0f172a' }}>
                                    Plan Your Dream Wedding
                                </h2>
                                <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                                    Share your vision with us and our wedding specialist will contact you within 24 hours with personalized venue options
                                </p>
                            </div>

                            {/* Form & Calculator Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '2rem', alignItems: 'start' }} className="form-calculator-grid">
                                {/* Form Card */}
                                <form onSubmit={handleSubmit} style={{
                                    background: 'white',
                                    borderRadius: '1.5rem',
                                    padding: '3rem',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                                    border: '1px solid rgba(254, 88, 88, 0.1)'
                                }}>
                                <div style={{ display: 'grid', gap: '2.5rem' }}>
                                    {/* Row 1: Name & Email */}
                                    <div className="grid desktop-2-col" style={{ gap: '1.5rem' }}>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.75rem',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                color: '#0f172a'
                                            }}>
                                                Your Name <span style={{ color: '#FE5858' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your full name"
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem 1.25rem',
                                                    fontSize: '1rem',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '0.75rem',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#FE5858'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            />
                                        </div>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.75rem',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                color: '#0f172a'
                                            }}>
                                                Email Address <span style={{ color: '#FE5858' }}>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="your@email.com"
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem 1.25rem',
                                                    fontSize: '1rem',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '0.75rem',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#FE5858'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Phone & Wedding Date */}
                                    <div className="grid desktop-2-col" style={{ gap: '1.5rem' }}>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.75rem',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                color: '#0f172a'
                                            }}>
                                                Phone Number <span style={{ color: '#FE5858' }}>*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+91 98765 43210"
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem 1.25rem',
                                                    fontSize: '1rem',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '0.75rem',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#FE5858'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            />
                                        </div>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.75rem',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                color: '#0f172a'
                                            }}>
                                                Wedding Date
                                            </label>
                                            <input
                                                type="date"
                                                name="weddingDate"
                                                value={formData.weddingDate}
                                                onChange={handleChange}
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem 1.25rem',
                                                    fontSize: '1rem',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '0.75rem',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#FE5858'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Guest Count & Days Required */}
                                    <div className="grid desktop-2-col" style={{ gap: '1.5rem' }}>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.75rem',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                color: '#0f172a'
                                            }}>
                                                Expected Guest Count <span style={{ color: '#FE5858' }}>*</span>
                                            </label>
                                            <select
                                                name="guestCount"
                                                value={formData.guestCount}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem 1.25rem',
                                                    fontSize: '1rem',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '0.75rem',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none',
                                                    backgroundColor: 'white',
                                                    cursor: 'pointer'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#FE5858'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            >
                                                <option value="">Select guest count</option>
                                                <option value="50-100">50-100 guests</option>
                                                <option value="100-150">100-150 guests</option>
                                                <option value="150-200">150-200 guests</option>
                                                <option value="200-300">200-300 guests</option>
                                                <option value="300+">300+ guests</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.75rem',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                color: '#0f172a'
                                            }}>
                                                Days Required <span style={{ color: '#FE5858' }}>*</span>
                                            </label>
                                            <select
                                                name="daysRequired"
                                                value={formData.daysRequired}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem 1.25rem',
                                                    fontSize: '1rem',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '0.75rem',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none',
                                                    backgroundColor: 'white',
                                                    cursor: 'pointer'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#FE5858'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            >
                                                <option value="">Select duration</option>
                                                <option value="1">1 Day</option>
                                                <option value="2">2 Days</option>
                                                <option value="3">3 Days</option>
                                                <option value="4">4 Days</option>
                                                <option value="5+">5+ Days</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 4: Budget & Preferred Venue */}
                                    <div className="grid desktop-2-col" style={{ gap: '1.5rem' }}>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.75rem',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                color: '#0f172a'
                                            }}>
                                                Your Budget <span style={{ color: '#FE5858' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                required
                                                placeholder="e.g., ₹10-12 Lakhs or ₹15 Lakhs"
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem 1.25rem',
                                                    fontSize: '1rem',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '0.75rem',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#FE5858'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            />
                                        </div>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.75rem',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                color: '#0f172a'
                                            }}>
                                                Preferred Venue
                                            </label>
                                            <select
                                                name="propertyInterest"
                                                value={formData.propertyInterest}
                                                onChange={handleChange}
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem 1.25rem',
                                                    fontSize: '1rem',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '0.75rem',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none',
                                                    backgroundColor: 'white',
                                                    cursor: 'pointer'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#FE5858'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            >
                                                <option value="">Any available venue</option>
                                                <option value="Sunahari Bagh Gurgaon">Sunahari Bagh - Gurgaon</option>
                                                <option value="Evergreen Woods Sohna">Evergreen Woods - Sohna</option>
                                                {properties.map(p => (
                                                    <option key={p.id} value={p.title}>{p.title} - {p.location}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 5: Message */}
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            marginBottom: '0.75rem',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            color: '#0f172a'
                                        }}>
                                            Tell Us About Your Wedding Vision
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="6"
                                            placeholder="Share your dream wedding details: themes, cultural preferences, special requirements, or any specific requests you have in mind..."
                                            style={{
                                                width: '100%',
                                                padding: '1rem 1.25rem',
                                                fontSize: '1rem',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '0.75rem',
                                                transition: 'all 0.3s ease',
                                                outline: 'none',
                                                lineHeight: '1.6',
                                                resize: 'vertical',
                                                fontFamily: 'inherit'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#FE5858'}
                                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-gradient"
                                        style={{
                                            width: '100%',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            padding: '1.25rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.75rem',
                                            borderRadius: '0.75rem',
                                            boxShadow: '0 10px 30px rgba(254, 88, 88, 0.3)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <Send size={20} />
                                        Send Wedding Inquiry
                                    </button>

                                    {/* Footer Note */}
                                    <div style={{
                                        padding: '1.25rem',
                                        background: 'linear-gradient(135deg, #FEF1F1 0%, #FCE4E4 100%)',
                                        borderRadius: '0.75rem',
                                        textAlign: 'center',
                                        border: '1px solid rgba(254, 88, 88, 0.1)'
                                    }}>
                                        <p style={{
                                            fontSize: '0.95rem',
                                            color: '#64748b',
                                            margin: 0,
                                            lineHeight: 1.6
                                        }}>
                                            <strong style={{ color: '#FE5858' }}>✓</strong> Our wedding specialist will contact you within 24 hours with personalized venue options and pricing
                                        </p>
                                    </div>
                                </div>
                            </form>

                            {/* Budget Calculator Widget */}
                            <div style={{
                                background: 'white',
                                borderRadius: '1.5rem',
                                padding: '2rem',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(254, 88, 88, 0.1)',
                                position: 'sticky',
                                top: '100px'
                            }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f172a' }}>
                                    Budget Calculator
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '2rem' }}>
                                    Get an approximate cost estimate
                                </p>

                                {/* Calculator Inputs */}
                                <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                                    {/* Guest Count */}
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>
                                            Number of Guests
                                        </label>
                                        <input
                                            type="number"
                                            value={calculator.guests}
                                            onChange={(e) => setCalculator({...calculator, guests: parseInt(e.target.value) || 0})}
                                            min="1"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                fontSize: '0.95rem',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '0.5rem',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Rooms Needed */}
                                    <div>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={calculator.needRooms}
                                                onChange={(e) => setCalculator({...calculator, needRooms: e.target.checked})}
                                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                            />
                                            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>
                                                Need accommodation (rooms)?
                                            </span>
                                        </label>
                                        {calculator.needRooms && (
                                            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                                                {calculator.guests <= 60
                                                    ? `Accommodation available for up to ${Math.min(calculator.guests, 60)} guests (max 50-60)`
                                                    : 'Maximum 50-60 guests accommodation available. External arrangements needed for additional guests.'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Meals */}
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>
                                            Number of Meals/Person
                                        </label>
                                        <select
                                            value={calculator.meals}
                                            onChange={(e) => setCalculator({...calculator, meals: parseInt(e.target.value)})}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                fontSize: '0.95rem',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '0.5rem',
                                                outline: 'none',
                                                backgroundColor: 'white',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="1">1 Meal</option>
                                            <option value="2">2 Meals</option>
                                            <option value="3">3 Meals</option>
                                            <option value="4">4 Meals</option>
                                        </select>
                                    </div>

                                    {/* Decoration */}
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>
                                            Decoration Level
                                        </label>
                                        <select
                                            value={calculator.decoration}
                                            onChange={(e) => setCalculator({...calculator, decoration: e.target.value})}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                fontSize: '0.95rem',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '0.5rem',
                                                outline: 'none',
                                                backgroundColor: 'white',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="basic">Basic (₹4L)</option>
                                            <option value="standard">Standard (₹8L)</option>
                                            <option value="premium">Premium (₹12L)</option>
                                            <option value="luxury">Luxury (₹15L)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Cost Breakdown */}
                                <div style={{
                                    padding: '1.5rem',
                                    background: 'linear-gradient(135deg, #FEF1F1 0%, #FCE4E4 100%)',
                                    borderRadius: '0.75rem',
                                    border: '1px solid rgba(254, 88, 88, 0.1)'
                                }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>
                                        Estimated Cost
                                    </h4>

                                    {(() => {
                                        // Venue rental: Flat 75k for <70 guests, ₹1000/guest for 70+
                                        const venueRental = calculator.guests < 70 ? 75000 : calculator.guests * 1000;

                                        const foodCost = calculator.guests * 1500 * calculator.meals;
                                        const decorationCost = calculator.decoration === 'basic' ? 400000
                                            : calculator.decoration === 'standard' ? 800000
                                            : calculator.decoration === 'premium' ? 1200000 : 1500000;

                                        // Room charges: Max 20 guests accommodation, extra charges for 20+
                                        let roomCharges = 0;
                                        if (calculator.needRooms && calculator.guests > 20) {
                                            const extraGuests = calculator.guests - 20;
                                            roomCharges = extraGuests * 2000; // ₹2000/extra guest beyond 20
                                        }

                                        const total = venueRental + foodCost + decorationCost + roomCharges;

                                        return (
                                            <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(254, 88, 88, 0.1)' }}>
                                                    <span style={{ color: '#64748b' }}>
                                                        {calculator.guests < 70 ? 'Venue Rental (Flat)' : `Venue Rental (${calculator.guests} × ₹1,000)`}
                                                    </span>
                                                    <span style={{ fontWeight: 600, color: '#0f172a' }}>₹{(venueRental / 100000).toFixed(2)}L</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(254, 88, 88, 0.1)' }}>
                                                    <span style={{ color: '#64748b' }}>Food ({calculator.guests} × {calculator.meals} × ₹1,500)</span>
                                                    <span style={{ fontWeight: 600, color: '#0f172a' }}>₹{(foodCost / 100000).toFixed(1)}L</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(254, 88, 88, 0.1)' }}>
                                                    <span style={{ color: '#64748b' }}>Decoration ({calculator.decoration})</span>
                                                    <span style={{ fontWeight: 600, color: '#0f172a' }}>₹{(decorationCost / 100000).toFixed(0)}L</span>
                                                </div>
                                                {calculator.needRooms && calculator.guests > 20 && (
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(254, 88, 88, 0.1)' }}>
                                                        <span style={{ color: '#64748b' }}>Extra Room Charges ({calculator.guests - 20} guests)</span>
                                                        <span style={{ fontWeight: 600, color: '#0f172a' }}>₹{(roomCharges / 100000).toFixed(1)}L</span>
                                                    </div>
                                                )}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                                                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Total Estimate</span>
                                                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FE5858' }}>₹{(total / 100000).toFixed(1)}L</span>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '1rem', fontStyle: 'italic' }}>
                                        * This is an approximate estimate. Actual costs may vary based on specific requirements, seasonality, and customization.
                                    </p>
                                </div>

                                {/* Notes */}
                                <div style={{
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    background: '#f8fafc',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.8rem',
                                    color: '#64748b',
                                    lineHeight: 1.6
                                }}>
                                    <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>Pricing Details:</strong>
                                    • Venue: Flat ₹75,000 for &lt;70 guests, ₹1,000/head for 70+ guests<br />
                                    • Accommodation: Up to 20 guests included<br />
                                    • Extra room charges for 20+ guests (₹2,000/guest)<br />
                                    • Food: ₹1,500/head per meal<br />
                                    • Decoration: ₹4L-₹15L based on preference
                                </div>
                            </div>
                            </div>
                            {/* End of Form & Calculator Grid */}
                        </div>

                        <style dangerouslySetInnerHTML={{__html: `
                            @media (min-width: 1024px) {
                                .form-calculator-grid {
                                    grid-template-columns: 1fr 380px !important;
                                }
                            }
                            @media (max-width: 1023px) {
                                .form-calculator-grid {
                                    grid-template-columns: 1fr !important;
                                }
                            }
                        `}} />
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
