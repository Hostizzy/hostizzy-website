import React, { useState } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [userType, setUserType] = useState('owner'); // 'owner' or 'guest'
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', propertyLocation: '', propertyType: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <>
            <SEO title="Contact Hostizzy - Property Management & Support" />

            <section className="section bg-secondary" style={{ padding: '6rem 0 4rem', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Get in Touch</h1>
                    <p style={{ fontSize: '1.2rem', color: '#64748b' }}>We're here to help you grow.</p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>

                    {/* Role Toggle */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '3rem', display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => setUserType('owner')}
                                style={{
                                    padding: '0.75rem 2rem',
                                    borderRadius: '2.5rem',
                                    border: 'none',
                                    background: userType === 'owner' ? 'var(--color-primary)' : 'transparent',
                                    color: userType === 'owner' ? 'white' : '#64748b',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                I'm a Property Owner
                            </button>
                            <button
                                onClick={() => setUserType('guest')}
                                style={{
                                    padding: '0.75rem 2rem',
                                    borderRadius: '2.5rem',
                                    border: 'none',
                                    background: userType === 'guest' ? 'black' : 'transparent',
                                    color: userType === 'guest' ? 'white' : '#64748b',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                I'm a Guest / Traveler
                            </button>
                        </div>
                    </div>

                    <div className="grid desktop-2-col" style={{ gap: '4rem' }}>

                        {/* Left: Contact Info */}
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                                {userType === 'owner' ? 'Partner with Hostizzy' : 'Support & Inquiries'}
                            </h3>
                            <p style={{ lineHeight: 1.6, color: '#475569', marginBottom: '2rem' }}>
                                {userType === 'owner'
                                    ? "Maximize your rental income with our data-driven management. Schedule a free property audit today."
                                    : "Need help with a booking or want to plan your next NextStop adventure? Our team is ready to assist."}
                            </p>

                            <div style={{ background: '#e0f2fe', padding: '1rem', borderRadius: '1rem', color: '#0369a1' }}><Mail size={24} /></div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Email</div>
                                <div style={{ fontSize: '1rem', color: 'var(--color-muted)' }}>stay@hostizzy.com</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ background: '#e0f2fe', padding: '1rem', borderRadius: '1rem', color: '#0369a1' }}><MapPin size={24} /></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: '#e0f2fe', padding: '1rem', borderRadius: '1rem', color: '#0369a1' }}><Mail size={24} /></div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Email</div>
                                    <div style={{ fontSize: '1rem', color: 'var(--color-muted)' }}>stay@hostizzy.com</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ background: '#e0f2fe', padding: '1rem', borderRadius: '1rem', color: '#0369a1' }}><MapPin size={24} /></div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Headquarters</div>
                                    <div style={{ fontSize: '1rem', color: 'var(--color-muted)' }}>E 13/29, 1st Floor, Harsha Bhawan,<br />Connaught Place, New Delhi 110001</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section container">
                <ScrollReveal x={30} delay={0.2}>
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1)', maxWidth: '800px', margin: '0 auto' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', textAlign: 'center' }}>Send Message</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Name</label>
                                <input id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" required style={{ width: '100%', padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)' }} placeholder="John Doe" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Email</label>
                                    <input id="email" name="email" value={formData.email} onChange={handleChange} type="email" className="form-input" required style={{ width: '100%', padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)' }} placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Phone</label>
                                    <input id="phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" className="form-input" style={{ width: '100%', padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)' }} placeholder="+91 98765 43210" />
                                </div>
                            </div>

                            {userType === 'owner' && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label htmlFor="propertyLocation" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Property Location</label>
                                        <input id="propertyLocation" name="propertyLocation" value={formData.propertyLocation} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)' }} placeholder="e.g. Manali" />
                                    </div>
                                    <div>
                                        <label htmlFor="propertyType" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Property Type</label>
                                        <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)' }}>
                                            <option value="">Select Type</option>
                                            <option value="villa">Villa / Farmhouse</option>
                                            <option value="apartment">Apartment</option>
                                            <option value="hotel">Hotel</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Message</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="form-input" required rows={4} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', resize: 'vertical' }} placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="btn btn-primary" style={{ padding: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                {userType === 'owner' ? 'Get Free Audit' : 'Send Message'} <Send size={18} />
                            </button>
                            {status && <div style={{ textAlign: 'center', color: '#166534', fontWeight: 600, padding: '0.5rem', background: '#dcfce7', borderRadius: '0.5rem' }}>{status}</div>}
                        </form>
                    </div>
                </ScrollReveal>
            </section>
        </>
    );
};

export default Contact;
