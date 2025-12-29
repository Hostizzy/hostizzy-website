import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { Award, CheckCircle2, Shield, Star, TrendingUp, Users, Sparkles, BadgeCheck, ArrowRight, Zap, Globe, Heart, Target, Crown } from 'lucide-react';

const Certification = () => {
    const [selectedTier, setSelectedTier] = useState('gold');

    const tiers = [
        {
            id: 'bronze',
            name: 'Bronze Host',
            color: '#CD7F32',
            requirements: ['Basic property inspection', 'Essential amenities checklist', 'Responsive communication'],
            benefits: ['Hostizzy Badge on listings', 'Priority support access', 'Basic analytics dashboard']
        },
        {
            id: 'gold',
            name: 'Gold Host',
            color: '#FFD700',
            requirements: ['Full property audit', 'Professional photography', 'Guest experience training', 'Sustainability practices'],
            benefits: ['Premium badge visibility', 'Featured in curated collections', 'Revenue optimization tools', 'Marketing support']
        },
        {
            id: 'platinum',
            name: 'Platinum Host',
            color: '#E5E4E2',
            requirements: ['Luxury standards compliance', 'Concierge-level service', 'Brand partnership ready', 'Exclusive amenities'],
            benefits: ['Elite marketplace positioning', 'Corporate booking priority', 'Dedicated account manager', 'PR & media features']
        }
    ];

    const stats = [
        { value: '32%', label: 'Higher Booking Rates', icon: <TrendingUp size={24} /> },
        { value: '4.9★', label: 'Average Guest Rating', icon: <Star size={24} /> },
        { value: '₹2.1L', label: 'Avg. Annual Revenue Boost', icon: <Sparkles size={24} /> }
    ];

    return (
        <>
            <SEO
                title="Hostizzy Certified | Host Improvement & Quality Badging Program"
                description="Elevate your hosting standards with the Hostizzy Certified program. Improve your property, enhance guest experiences, and earn a badge that signals quality."
                keywords={['host certification India', 'vacation rental badge', 'premium homestay certification', 'Airbnb superhost alternative', 'quality host program']}
            />

            {/* Hero Section */}
            <section style={{
                background: '#ffffff',
                color: 'var(--color-foreground)',
                padding: 'calc(var(--header-height) + 4rem) 0 6rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                background: 'rgba(255, 215, 0, 0.1)',
                                border: '1px solid rgba(255, 215, 0, 0.3)',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '100px'
                            }}>
                                <Award size={20} color="#FFD700" />
                                <span style={{ fontWeight: 800, color: '#FFD700', letterSpacing: '1px', fontSize: '0.85rem' }}>HOST IMPROVEMENT PROGRAM</span>
                            </div>
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            marginBottom: '1.5rem',
                            fontWeight: 900,
                            lineHeight: 1.15,
                            maxWidth: '900px',
                            margin: '0 auto 1.5rem'
                        }}>
                            Elevate Your Property.<br />
                            <span style={{ color: '#FFD700' }}>Earn Your Badge.</span>
                        </h1>
                        <p style={{
                            maxWidth: '700px',
                            margin: '0 auto 3rem',
                            fontSize: '1.25rem',
                            opacity: 0.85,
                            lineHeight: 1.7
                        }}>
                            The Hostizzy Certified program helps you improve your listing quality, enhance guest experiences, and stand out with a badge that signals trust and excellence.
                        </p>

                        {/* Hero Badge Visual */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                            <div style={{
                                position: 'relative',
                                width: '180px',
                                height: '180px',
                                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 80px rgba(255, 215, 0, 0.4)'
                            }}>
                                <div style={{
                                    width: '150px',
                                    height: '150px',
                                    background: '#ffffff',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}>
                                    <BadgeCheck size={44} color="#FFD700" />
                                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#FFD700', marginTop: '0.5rem', letterSpacing: '2px' }}>CERTIFIED</span>
                                </div>
                            </div>
                        </div>

                        {/* Value Pillars instead of Stats */}
                        <div className="grid desktop-3-col" style={{ gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                            {[
                                { icon: <Star size={22} />, title: 'Higher Quality Standards', desc: 'Improve your property with expert guidance.' },
                                { icon: <Shield size={22} />, title: 'Guest Trust & Confidence', desc: 'A badge that signals verified excellence.' },
                                { icon: <TrendingUp size={22} />, title: 'Better Listing Performance', desc: 'Optimized for visibility and bookings.' }
                            ].map((item, i) => (
                                <div key={i} style={{
                                    padding: '1.5rem',
                                    background: '#f8fafc',
                                    borderRadius: '1.5rem',
                                    border: '1px solid #e2e8f0',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ color: '#FFD700', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>{item.title}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Why Get Certified */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center mb-lg">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Why Get Certified?</h2>
                        <p style={{ color: '#64748b', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }}>
                            The Hostizzy Certified badge is more than a logo—it's a competitive advantage.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                    {[
                        { icon: <Target size={28} />, title: 'Stand Out on OTAs', desc: 'Your certified badge appears on Airbnb, Booking.com, and all major platforms—signaling quality to guests instantly.' },
                        { icon: <TrendingUp size={28} />, title: 'Command Premium Rates', desc: 'Certified hosts charge 15-25% more than non-certified competitors while maintaining higher occupancy.' },
                        { icon: <Users size={28} />, title: 'Join a Curated Network', desc: 'Be featured in our "Certified Collection" marketing campaigns, reaching high-intent travelers.' },
                        { icon: <Shield size={28} />, title: 'Build Guest Trust', desc: 'Guests book with confidence knowing your property meets Hostizzy\'s rigorous quality standards.' },
                        { icon: <Zap size={28} />, title: 'Priority Support', desc: 'Get dedicated support channels and faster response times for operational issues.' },
                        { icon: <Heart size={28} />, title: 'Community Pride', desc: 'Join a community of India\'s best hosts, share knowledge, and grow together.' }
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="card" style={{ padding: '2.5rem', height: '100%', border: '1px solid #f1f5f9' }}>
                                <div style={{
                                    color: 'var(--color-primary)',
                                    background: 'rgba(254, 88, 88, 0.1)',
                                    padding: '1rem',
                                    borderRadius: '1rem',
                                    display: 'inline-flex',
                                    marginBottom: '1.5rem'
                                }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>{item.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.7 }}>{item.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Certification Tiers */}
            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Certification Tiers</h2>
                            <p style={{ color: '#64748b', fontSize: '1.15rem' }}>Choose your path to excellence.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                        {tiers.map((tier, i) => (
                            <ScrollReveal key={tier.id} delay={i * 0.15}>
                                <div
                                    onClick={() => setSelectedTier(tier.id)}
                                    className="card"
                                    style={{
                                        padding: '2.5rem',
                                        cursor: 'pointer',
                                        height: '100%',
                                        background: selectedTier === tier.id ? 'white' : '#f8fafc',
                                        border: selectedTier === tier.id ? `2px solid ${tier.color}` : '2px solid transparent',
                                        boxShadow: selectedTier === tier.id ? `0 20px 40px -15px ${tier.color}40` : 'none',
                                        transition: 'all 0.4s ease'
                                    }}
                                >
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        background: `linear-gradient(135deg, ${tier.color}, ${tier.color}cc)`,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1.5rem',
                                        boxShadow: `0 10px 25px -5px ${tier.color}50`
                                    }}>
                                        <Crown size={28} color="#0f172a" />
                                    </div>

                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>{tier.name}</h3>
                                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>
                                        {tier.id === 'bronze' && 'Perfect for new hosts starting their journey.'}
                                        {tier.id === 'gold' && 'For established hosts seeking growth.'}
                                        {tier.id === 'platinum' && 'For luxury properties and elite operators.'}
                                    </p>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <div style={{ fontWeight: 800, fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Requirements</div>
                                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {tier.requirements.map((req, j) => (
                                                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                                                    <CheckCircle2 size={16} color={tier.color} /> {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Benefits</div>
                                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {tier.benefits.map((ben, j) => (
                                                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                                                    <Sparkles size={16} color="#22c55e" /> {ben}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center mb-lg">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>How to Get Certified</h2>
                        <p style={{ color: '#64748b', fontSize: '1.15rem' }}>A simple 4-step journey to your badge.</p>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-4-col" style={{ gap: '1.5rem' }}>
                    {[
                        { step: '01', title: 'Apply Online', desc: 'Fill out a short application with your property details.' },
                        { step: '02', title: 'Property Audit', desc: 'Our team conducts a virtual or on-site quality assessment.' },
                        { step: '03', title: 'Complete Training', desc: 'Access our Host Excellence modules and pass the quiz.' },
                        { step: '04', title: 'Earn Your Badge', desc: 'Receive your badge and get listed in the Certified Collection.' }
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{
                                    fontSize: '3rem',
                                    fontWeight: 900,
                                    color: 'var(--color-primary)',
                                    opacity: 0.2,
                                    marginBottom: '1rem'
                                }}>{item.step}</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section container text-center">
                <ScrollReveal>
                    <div className="card" style={{
                        padding: '5rem 2rem',
                        background: 'linear-gradient(135deg, #FE5858 0%, #ff8a8a 100%)',
                        color: 'white',
                        borderRadius: '2.5rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <Award size={48} style={{ marginBottom: '1.5rem', opacity: 0.9 }} />
                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1.5rem', color: 'white' }}>
                                Ready to Elevate Your Hosting?
                            </h2>
                            <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem', opacity: 0.95 }}>
                                Join hundreds of certified hosts who are earning more, stressing less, and building lasting guest relationships.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/contact" className="btn" style={{ background: 'white', color: 'var(--color-primary)', padding: '1rem 2.5rem', fontWeight: 800 }}>
                                    Apply for Certification <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                </Link>
                                <Link to="/services" className="btn btn-outline" style={{ borderColor: 'white', color: 'white', padding: '1rem 2.5rem', fontWeight: 800 }}>
                                    Learn About Our Services
                                </Link>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </>
    );
};

export default Certification;
