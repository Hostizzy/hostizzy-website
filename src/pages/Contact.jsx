import React, { useState } from 'react';
import { useToast } from '../components/Toast';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { Mail, Send } from 'lucide-react';
import AuditWizard from '../components/AuditWizard';

const Contact = () => {
    const { settings } = useSettings();
    const [userType, setUserType] = useState('owner'); // 'owner', 'guest', or 'business'
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', inquiryType: '' });
    const [status, setStatus] = useState('');
    const { addToast } = useToast();

    const departments = {
        owner: {
            email: 'stay@hostizzy.com',
            title: 'Owner Relations',
            desc: 'Start your journey with India\'s premier management experts.',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
        },
        guest: {
            email: settings.supportEmail || 'stay@hostizzy.com',
            title: 'Guest Concierge',
            desc: 'Inquire about stay details or upcoming reservations.',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
        },
        business: {
            email: 'partnerships@hostizzy.com',
            title: 'Strategic Growth',
            desc: 'Collaborations, marketing, and institutional partners.',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
        }
    };

    const businessDepts = {
        partnerships: { email: 'partnerships@hostizzy.com', title: 'Partnerships' },
        marketing: { email: 'marketing@hostizzy.com', title: 'Marketing & PR' },
        founders: { email: 'founders@hostizzy.com', title: 'Founders Office' }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            addToast("Your inquiry has been routed to our team!", "success");
            setFormData({ name: '', email: '', phone: '', message: '', inquiryType: '' });
        }, 1500);
    };

    return (
        <div style={{ background: '#fafafa' }}>
            <SEO title="Concierge Desk | Contact Hostizzy" />

            {/* Premium Immersive Hero */}
            <section style={{
                position: 'relative',
                height: '35vh',
                minHeight: '350px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                background: '#000',
                paddingTop: 'var(--header-height)'
            }}>
                <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2000"
                    alt="Luxury Hospitality"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.6,
                        filter: 'brightness(0.7) contrast(1.1)'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ maxWidth: '750px' }}>
                            <div className="badge badge-primary" style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', boxShadow: '0 4px 15px rgba(254, 88, 88, 0.4)' }}>Personalized Excellence</div>
                            <h1 style={{
                                fontSize: '4.2rem',
                                fontWeight: 900,
                                marginBottom: '1.2rem',
                                lineHeight: 1.1,
                                color: 'white',
                                textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                            }}>Concierge Services</h1>
                            <p style={{
                                fontSize: '1.4rem',
                                color: 'rgba(255,255,255,0.95)',
                                lineHeight: 1.6,
                                maxWidth: '600px',
                                textShadow: '0 2px 10px rgba(0,0,0,0.6)'
                            }}>How can our specialists assist you today?</p>
                        </div>
                    </ScrollReveal>
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '120px',
                    background: 'linear-gradient(to top, #fafafa, transparent)'
                }}></div>
            </section>

            {/* Main Content Area */}
            <section className="section bg-primary text-white" style={{ padding: 'calc(var(--header-height) + 2rem) 0 4rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="container">

                    {/* Concierge Desk Navigation */}
                    <div className="grid desktop-3-col" style={{ gap: '2rem', marginBottom: '3rem' }}>
                        {[
                            { id: 'owner', label: 'Property Owner', image: departments.owner.image, tag: 'Earnings & Growth' },
                            { id: 'guest', label: 'Guest / Traveler', image: departments.guest.image, tag: 'Support & Booking' },
                            { id: 'business', label: 'Partner / Investor', image: departments.business.image, tag: 'Strategic Growth' }
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
                                    <div className="card shadow-premium" style={{
                                        position: 'relative',
                                        height: '260px',
                                        borderRadius: '2.5rem',
                                        overflow: 'hidden',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transform: userType === role.id ? 'translateY(-10px)' : 'none',
                                        background: '#000',
                                        border: userType === role.id ? '2px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <img
                                            src={role.image}
                                            alt={role.label}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: userType === role.id ? 'scale(1.1)' : 'scale(1)', opacity: userType === role.id ? 1 : 0.7 }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: userType === role.id
                                                ? 'linear-gradient(135deg, var(--color-primary) 0%, #E54F4F 100%)'
                                                : 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                                        }}></div>
                                        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', color: 'white' }}>
                                            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.9, marginBottom: '0.5rem' }}>{role.tag}</div>
                                            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white' }}>{role.label}</h3>
                                        </div>
                                        {userType === role.id && (
                                            <div style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'white', color: 'var(--color-primary)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'currentColor' }}></div>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Funnel Content Grid */}
                    <div className="grid desktop-2-col" style={{ gap: '3rem', alignItems: 'flex-start' }}>

                        {/* Left: Branding & Info */}
                        <div style={{ position: 'sticky', top: '120px' }}>
                            <div className="badge badge-outline" style={{ marginBottom: '1.5rem', borderColor: 'var(--color-primary)', color: 'var(--color-primary)', fontWeight: 800 }}>Premium Advisory</div>
                            <h3 style={{ fontSize: '2.8rem', marginBottom: '1.2rem', fontWeight: 900, color: '#1e293b', lineHeight: 1.1 }}>
                                {userType === 'owner' ? 'Maximize Your Property Yield' : userType === 'guest' ? 'Elite Guest Experience' : 'Strategic Growth Network'}
                            </h3>
                            <p style={{ lineHeight: 1.8, color: '#64748b', marginBottom: '2rem', fontSize: '1.2rem' }}>
                                {userType === 'owner'
                                    ? "Our specialized growth team handles end-to-end asset optimization for luxury villas and high-end apartments across India."
                                    : userType === 'guest'
                                        ? "From chauffeur services to private villa setups, our concierge desk is dedicated to your absolute comfort."
                                        : "Join forces with the technology leader in Indian alternative accommodation. Our partners are eager to explore visionary projects."}
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {userType === 'business' ? (
                                    <>
                                        {Object.values(businessDepts).map(dept => (
                                            <div key={dept.email} className="glass shadow-premium" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid rgba(0,0,0,0.05)', background: 'white' }}>
                                                <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '1rem', color: '#0369a1' }}><Mail size={24} /></div>
                                                <div>
                                                    <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>{dept.title}</div>
                                                    <a href={`mailto:${dept.email}`} style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.1rem' }}>{dept.email}</a>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="glass shadow-premium" style={{ padding: '2.5rem', borderRadius: '2rem', border: '1px solid rgba(0,0,0,0.05)', background: 'white' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: 'rgba(254, 88, 88, 0.1)', padding: '1.2rem', borderRadius: '1.2rem', color: 'var(--color-primary)' }}><Mail size={32} /></div>
                                            <div>
                                                <div style={{ fontWeight: 800, color: '#64748b', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Department Direct Desk</div>
                                                <a href={`mailto:${userType === 'owner' ? departments.owner.email : departments.guest.email}`} style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 900 }}>
                                                    {userType === 'owner' ? departments.owner.email : departments.guest.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Interactive Hook (Wizard or Form) */}
                        <div>
                            <ScrollReveal y={30} delay={0.2}>
                                {userType === 'owner' ? (
                                    <div style={{ transform: 'scale(1.02)' }}>
                                        <AuditWizard />
                                    </div>
                                ) : (
                                    <div className="glass shadow-premium" style={{ padding: '3.5rem', borderRadius: '2.5rem', background: 'white', border: '1px solid rgba(0,0,0,0.05)' }}>
                                        <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem', fontWeight: 900, textAlign: 'center' }}>
                                            {userType === 'guest' ? 'Concierge Inquiry' : 'Strategic Proposal'}
                                        </h3>
                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                                <div>
                                                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Full Name</label>
                                                    <input id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" required style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} placeholder="John Doe" />
                                                </div>
                                                <div>
                                                    <label htmlFor="inquiryType" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Inquiry Category</label>
                                                    <select id="inquiryType" name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="form-input" required style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
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
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                                <div>
                                                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Email Address</label>
                                                    <input id="email" name="email" value={formData.email} onChange={handleChange} type="email" className="form-input" required style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} placeholder="john@example.com" />
                                                </div>
                                                <div>
                                                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Phone Number</label>
                                                    <input id="phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" className="form-input" style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} placeholder="+91 98765 43210" />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Message Body</label>
                                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="form-input" required rows={4} style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc', resize: 'vertical' }} placeholder="How can we assist you?"></textarea>
                                            </div>
                                            <button className="btn btn-primary" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', borderRadius: '1rem', fontSize: '1rem', fontWeight: 800 }}>
                                                Send to Concierge <Send size={20} />
                                            </button>
                                            {status && <div style={{ textAlign: 'center', color: '#166534', fontWeight: 700, padding: '1.25rem', background: '#dcfce7', borderRadius: '1rem', marginTop: '1rem' }}>
                                                {status === 'sending' ? 'Connecting...' : '✓ Inquiry Successfully Routed'}
                                            </div>}
                                        </form>
                                    </div>
                                )}
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
