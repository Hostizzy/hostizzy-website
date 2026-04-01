'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '../../components/Toast';
import { useSettings } from '../../context/SettingsContext';
import ScrollReveal from '../../components/ScrollReveal';
import { Mail, Send, Phone } from 'lucide-react';
import PropertyLeadWizard from '../../components/PropertyLeadWizard';

export default function Contact() {
    const { settings } = useSettings();
    const [userType, setUserType] = useState('owner'); // 'owner', 'guest', or 'business'
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', inquiryType: '' });
    const [status, setStatus] = useState('');
    const { addToast } = useToast();

    const departments = {
        owner: {
            email: 'partnerships@hostizzy.com',
            phone: '+919560493335',
            whatsapp: '919560493335',
            title: 'Property Owner',
            desc: 'List your property with India\'s premier management company.',
            tag: 'Maximize Revenue',
            icon: '\u{1F3E0}'
        },
        guest: {
            email: 'stay@hostizzy.com',
            phone: '+919560494001',
            whatsapp: '919560494001',
            title: 'Guest / Traveler',
            desc: 'Book a stay or get help with your reservation.',
            tag: 'Book Your Stay',
            icon: '\u{2708}\u{FE0F}'
        },
        business: {
            email: 'founder@hostizzy.com',
            phone: '+919560493335',
            whatsapp: '919560493335',
            title: 'Business / Partner',
            desc: 'Explore partnerships, marketing, and investment opportunities.',
            tag: 'Grow Together',
            icon: '\u{1F91D}'
        }
    };

    const businessDepts = {
        founders: { email: 'founder@hostizzy.com', title: 'Founders Office' },
        marketing: { email: 'marketing@hostizzy.com', title: 'Marketing & PR' }
    };

    const whatsappMessages = {
        owner: 'Hi, I\'m interested in listing my property with Hostizzy.',
        guest: 'Hi, I need help with a booking at Hostizzy.',
        business: 'Hi, I\'m interested in a business partnership with Hostizzy.'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    department: userType,
                    departmentEmail: departments[userType].email,
                    timestamp: new Date().toISOString()
                })
            });
            if (res.ok) {
                setStatus('success');
                addToast("Your inquiry has been sent! We'll respond within 24 hours.", "success");
                setFormData({ name: '', email: '', phone: '', message: '', inquiryType: '' });
            } else {
                setStatus('');
                addToast("Something went wrong. Please try again.", "error");
            }
        } catch (err) {
            setStatus('');
            addToast("Something went wrong. Please try again.", "error");
        }
    };

    const dept = departments[userType];

    return (
        <div style={{ background: '#fafafa' }}>
            {/* Premium Immersive Hero */}
            <section style={{
                position: 'relative',
                padding: 'calc(var(--header-height) + 3rem) 0 4rem',
                background: '#0f172a',
                color: 'white',
                overflow: 'hidden'
            }}>
                {/* Background Blobs */}
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(254, 88, 88, 0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ maxWidth: '800px' }}>
                            <div className="badge badge-primary" style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', background: 'rgba(254, 88, 88, 0.1)', color: 'var(--color-primary)', border: 'none' }}>We're Here to Help</div>
                            <h1 style={{
                                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                                fontWeight: 900,
                                marginBottom: '1.5rem',
                                lineHeight: 1.1,
                                color: 'white'
                            }}>Get in Touch</h1>
                            <p style={{
                                fontSize: '1.25rem',
                                color: '#94a3b8',
                                lineHeight: 1.6,
                                maxWidth: '600px'
                            }}>
                                Whether you're a property owner, a guest, or a potential partner — reach out and we'll connect you with the right team.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="section" style={{ padding: '4rem 0', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #fafafa 0%, #f8fafc 50%, #ffffff 100%)' }}>
                {/* Subtle Background Decoration */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(254, 88, 88, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}></div>
                <div className="container">

                    {/* Concierge Desk Navigation */}
                    <div className="grid desktop-3-col" style={{ gap: '1.5rem', marginBottom: '4rem' }}>
                        {[
                            { id: 'owner', label: 'Property Owner', icon: '\u{1F3E0}', tag: 'Maximize Revenue', color: 'var(--color-primary)', lightColor: '#fee2e2' },
                            { id: 'guest', label: 'Guest / Traveler', icon: '\u{2708}\u{FE0F}', tag: 'Book Your Stay', color: 'var(--color-primary)', lightColor: '#fee2e2' },
                            { id: 'business', label: 'Business / Partner', icon: '\u{1F91D}', tag: 'Grow Together', color: 'var(--color-primary)', lightColor: '#fee2e2' }
                        ].map(role => (
                            <ScrollReveal key={role.id}>
                                <button
                                    onClick={() => setUserType(role.id)}
                                    style={{
                                        width: '100%',
                                        padding: 0,
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    <div style={{
                                        position: 'relative',
                                        padding: '2rem',
                                        borderRadius: '1.5rem',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transform: userType === role.id ? 'translateY(-4px)' : 'translateY(0)',
                                        background: userType === role.id
                                            ? `linear-gradient(135deg, ${role.lightColor} 0%, white 100%)`
                                            : 'white',
                                        border: userType === role.id ? `2px solid ${role.color}` : '2px solid #e2e8f0',
                                        boxShadow: userType === role.id
                                            ? `0 12px 28px -8px ${role.color}50, 0 0 0 4px ${role.color}10`
                                            : '0 2px 8px rgba(0,0,0,0.04)',
                                        minHeight: '180px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}>
                                        {/* Top Section - Icon & Tag */}
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '1.25rem',
                                                background: userType === role.id
                                                    ? `linear-gradient(135deg, ${role.color} 0%, ${role.color}dd 100%)`
                                                    : role.lightColor,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '2rem',
                                                transition: 'all 0.3s',
                                                transform: userType === role.id ? 'rotate(-5deg) scale(1.1)' : 'rotate(0) scale(1)',
                                                boxShadow: userType === role.id ? `0 8px 20px -6px ${role.color}60` : 'none'
                                            }}>
                                                {userType === role.id ? '\u{2713}' : role.icon}
                                            </div>
                                            <div style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '100px',
                                                background: userType === role.id ? `${role.color}20` : '#f8fafc',
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                color: userType === role.id ? role.color : '#64748b',
                                                border: `1px solid ${userType === role.id ? `${role.color}40` : '#e2e8f0'}`,
                                                transition: 'all 0.3s'
                                            }}>
                                                {userType === role.id ? 'Selected' : role.tag}
                                            </div>
                                        </div>

                                        {/* Bottom Section - Title */}
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.5rem',
                                                fontWeight: 900,
                                                color: '#0f172a',
                                                lineHeight: 1.2,
                                                marginBottom: '0.5rem'
                                            }}>
                                                {role.label}
                                            </h3>
                                            <p style={{
                                                fontSize: '0.9rem',
                                                color: '#64748b',
                                                lineHeight: 1.5,
                                                margin: 0
                                            }}>
                                                {role.id === 'owner'
                                                    ? 'List your property with us'
                                                    : role.id === 'guest'
                                                        ? 'Find your perfect stay'
                                                        : 'Explore partnership opportunities'}
                                            </p>
                                        </div>

                                        {/* Selection Indicator - Bottom Border */}
                                        {userType === role.id && (
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '80%',
                                                height: '4px',
                                                background: `linear-gradient(90deg, transparent, ${role.color}, transparent)`,
                                                borderRadius: '4px 4px 0 0'
                                            }}></div>
                                        )}
                                    </div>
                                </button>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Funnel Content Grid */}
                    <div className="grid desktop-2-col" style={{ gap: '3rem', alignItems: 'flex-start' }}>

                        {/* Left: Branding & Info */}
                        <div style={{ position: 'sticky', top: '140px' }}>
                            <div className="badge" style={{
                                marginBottom: '1.5rem',
                                background: 'linear-gradient(135deg, #FE585810, #FE585805)',
                                color: 'var(--color-primary)',
                                fontWeight: 800,
                                border: '1px solid #FE585830',
                                padding: '0.6rem 1.2rem'
                            }}>{userType === 'owner' ? '\u{1F3E0} Property Owners' : userType === 'guest' ? '\u{2708}\u{FE0F} Guests' : '\u{1F91D} Business'}</div>
                            <h3 style={{ fontSize: '2.8rem', marginBottom: '1.2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
                                {userType === 'owner' ? 'Partner With Hostizzy' : userType === 'guest' ? 'How Can We Help?' : 'Let\u2019s Build Together'}
                            </h3>
                            <div style={{ lineHeight: 1.8, color: '#64748b', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                                {userType === 'owner' ? (
                                    "Our team manages 50+ premium properties across India. From villas and farmhouses to boutique homes \u2014 we handle everything so you earn more."
                                ) : userType === 'guest' ? (
                                    <>
                                        Whether you're planning a stay or need help with an existing booking, our concierge team is here for you.
                                        <div style={{ marginTop: '1rem' }}>
                                            <a href="https://book.hostizzy.com/" target="_blank" rel="noopener noreferrer" style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: 'var(--color-primary)',
                                                fontWeight: 700,
                                                fontSize: '1.05rem',
                                                textDecoration: 'none'
                                            }}>
                                                Looking to book? Visit book.hostizzy.com &rarr;
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    "Interested in partnerships, marketing collaborations, or investment? Our founders and team are eager to connect."
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {userType === 'business' ? (
                                    <>
                                        {Object.values(businessDepts).map((bdept) => (
                                            <div key={bdept.email} className="card" style={{
                                                padding: '1.75rem',
                                                borderRadius: '1.25rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1.25rem',
                                                border: '2px solid #e2e8f0',
                                                background: 'white',
                                                transition: 'all 0.3s',
                                                cursor: 'pointer'
                                            }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = '#3b82f6';
                                                    e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.2)';
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                }}>
                                                <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '0.875rem', color: '#3b82f6', flexShrink: 0 }}><Mail size={22} /></div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>{bdept.title}</div>
                                                    <a href={`mailto:${bdept.email}`} style={{ color: '#0f172a', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>{bdept.email}</a>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Phone for business */}
                                        <div className="card" style={{
                                            padding: '1.75rem',
                                            borderRadius: '1.25rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1.25rem',
                                            border: '2px solid #e2e8f0',
                                            background: 'white'
                                        }}>
                                            <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '0.875rem', color: '#3b82f6', flexShrink: 0 }}><Phone size={22} /></div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>Phone</div>
                                                <a href={`tel:${dept.phone}`} style={{ color: '#0f172a', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>+91 95604 93335</a>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="card" style={{
                                        padding: '2rem',
                                        borderRadius: '1.5rem',
                                        border: '2px solid #e2e8f0',
                                        background: 'white',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                                <div style={{
                                                    background: 'linear-gradient(135deg, #FE585815, #FE585808)',
                                                    padding: '1.25rem',
                                                    borderRadius: '1rem',
                                                    color: 'var(--color-primary)',
                                                    border: '2px solid #FE585820',
                                                    flexShrink: 0
                                                }}><Mail size={28} /></div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>Email</div>
                                                    <a href={`mailto:${dept.email}`} style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: 800, textDecoration: 'none' }}>
                                                        {dept.email}
                                                    </a>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                                <div style={{
                                                    background: 'linear-gradient(135deg, #FE585815, #FE585808)',
                                                    padding: '1.25rem',
                                                    borderRadius: '1rem',
                                                    color: 'var(--color-primary)',
                                                    border: '2px solid #FE585820',
                                                    flexShrink: 0
                                                }}><Phone size={28} /></div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>Phone</div>
                                                    <a href={`tel:${dept.phone}`} style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: 800, textDecoration: 'none' }}>
                                                        {userType === 'owner' ? '+91 95604 93335' : '+91 95604 94001'}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* WhatsApp Button */}
                                <a
                                    href={`https://wa.me/${dept.whatsapp}?text=${encodeURIComponent(whatsappMessages[userType])}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '0.75rem',
                                        background: '#25D366',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '0.95rem',
                                        textDecoration: 'none',
                                        marginTop: '0.5rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {'\u{1F4AC}'} Chat on WhatsApp
                                </a>

                                {/* Office Address Card */}
                                <div className="card" style={{ padding: '1.5rem', borderRadius: '1rem', marginTop: '0.5rem', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>Office</div>
                                    <p style={{ color: '#334155', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                                        E 13/29, 1st Floor, Harsha Bhawan,<br />
                                        Connaught Place, New Delhi 110001
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Interactive Hook (Wizard or Form) */}
                        <div>
                            <ScrollReveal y={30} delay={0.2}>
                                {userType === 'owner' ? (
                                    <div>
                                        <PropertyLeadWizard source="contact" />
                                    </div>
                                ) : (
                                    <div className="card" style={{
                                        padding: '3rem',
                                        borderRadius: '2rem',
                                        background: 'white',
                                        border: '2px solid #e2e8f0',
                                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)'
                                    }}>
                                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                            <div style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '1.25rem',
                                                background: 'linear-gradient(135deg, #FE585815, #FE585808)',
                                                border: '2px solid #FE585820',
                                                marginBottom: '1.25rem'
                                            }}>
                                                <Send size={28} color="var(--color-primary)" />
                                            </div>
                                            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>
                                                {userType === 'guest' ? 'Concierge Inquiry' : 'Strategic Proposal'}
                                            </h3>
                                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Fill out the form and we'll get back to you within 24 hours</p>
                                        </div>
                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                                <div>
                                                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a' }}>Full Name *</label>
                                                    <input id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" required style={{
                                                        width: '100%',
                                                        padding: '0.875rem 1rem',
                                                        borderRadius: '0.75rem',
                                                        border: '2px solid #e2e8f0',
                                                        background: '#ffffff',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.2s',
                                                        outline: 'none'
                                                    }}
                                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                                        placeholder="John Doe" />
                                                </div>
                                                <div>
                                                    <label htmlFor="inquiryType" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a' }}>Inquiry Type *</label>
                                                    <select id="inquiryType" name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="form-input" required style={{
                                                        width: '100%',
                                                        padding: '0.875rem 1rem',
                                                        borderRadius: '0.75rem',
                                                        border: '2px solid #e2e8f0',
                                                        background: '#ffffff',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.2s',
                                                        outline: 'none'
                                                    }}
                                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}>
                                                        <option value="">Select Category</option>
                                                        {userType === 'guest' ? (
                                                            <>
                                                                <option value="booking">New / Existing Booking</option>
                                                                <option value="refund">Refund / Cancellation</option>
                                                                <option value="experience">Experience Feedback</option>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <option value="partnership">Strategic Partnership</option>
                                                                <option value="marketing">Marketing & PR</option>
                                                                <option value="investor">Founders Office / Investment</option>
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                                <div>
                                                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a' }}>Email Address *</label>
                                                    <input id="email" name="email" value={formData.email} onChange={handleChange} type="email" className="form-input" required style={{
                                                        width: '100%',
                                                        padding: '0.875rem 1rem',
                                                        borderRadius: '0.75rem',
                                                        border: '2px solid #e2e8f0',
                                                        background: '#ffffff',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.2s',
                                                        outline: 'none'
                                                    }}
                                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                                        placeholder="john@example.com" />
                                                </div>
                                                <div>
                                                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a' }}>Phone Number</label>
                                                    <input id="phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" className="form-input" style={{
                                                        width: '100%',
                                                        padding: '0.875rem 1rem',
                                                        borderRadius: '0.75rem',
                                                        border: '2px solid #e2e8f0',
                                                        background: '#ffffff',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.2s',
                                                        outline: 'none'
                                                    }}
                                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                                        placeholder="+91 98765 43210" />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a' }}>Your Message *</label>
                                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="form-input" required rows={5} style={{
                                                    width: '100%',
                                                    padding: '0.875rem 1rem',
                                                    borderRadius: '0.75rem',
                                                    border: '2px solid #e2e8f0',
                                                    background: '#ffffff',
                                                    fontSize: '0.95rem',
                                                    resize: 'vertical',
                                                    transition: 'all 0.2s',
                                                    outline: 'none',
                                                    fontFamily: 'inherit'
                                                }}
                                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                                    placeholder="How can we assist you?"></textarea>
                                            </div>
                                            <button className="btn btn-gradient" type="submit" disabled={status === 'sending'} style={{
                                                padding: '1.25rem',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                borderRadius: '0.875rem',
                                                fontSize: '1rem',
                                                fontWeight: 800,
                                                marginTop: '0.5rem',
                                                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                                opacity: status === 'sending' ? 0.7 : 1
                                            }}>
                                                {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={20} />
                                            </button>
                                            {status === 'success' && <div style={{
                                                textAlign: 'center',
                                                color: '#166534',
                                                fontWeight: 700,
                                                padding: '1.25rem',
                                                background: 'linear-gradient(135deg, #dcfce715, #dcfce708)',
                                                borderRadius: '0.875rem',
                                                border: '2px solid #86efac40',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.75rem'
                                            }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                Message sent successfully! We'll respond within 24 hours.
                                            </div>}
                                        </form>
                                    </div>
                                )}
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add animation keyframes */}
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(0.95);
                    }
                }
            `}</style>
        </div>
    );
}
