'use client';

import React, { useState } from 'react';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import { CheckCircle, Award, Users, Clock, Globe, TrendingUp, BookOpen, Video, FileText, MessageCircle, Star, Download, ChevronRight } from 'lucide-react';

const Training = () => {
    const [selectedProgram, setSelectedProgram] = useState('free');

    const freeModules = [
        {
            title: 'Getting Started with Hosting',
            duration: '2 hours',
            topics: ['Understanding the STR market in India', 'Legal basics & licensing', 'Platform comparison (Airbnb, MakeMyTrip, Booking.com)', 'Is hosting right for you?']
        },
        {
            title: 'Property Setup Essentials',
            duration: '3 hours',
            topics: ['Interior design basics', 'Essential amenities checklist', 'Safety requirements', 'Budget-friendly furnishing tips']
        },
        {
            title: 'Creating Your First Listing',
            duration: '2 hours',
            topics: ['Photography with your phone', 'Writing compelling descriptions', 'Pricing your property', 'House rules & policies']
        },
        {
            title: 'Guest Communication Basics',
            duration: '2 hours',
            topics: ['Pre-arrival messages', 'Check-in/check-out process', 'Handling guest inquiries', 'Getting 5-star reviews']
        },
        {
            title: 'Operations Management',
            duration: '2 hours',
            topics: ['Cleaning protocols', 'Maintenance schedules', 'Guest screening', 'Dealing with societies/RWAs']
        },
        {
            title: 'Basic Pricing Strategies',
            duration: '2 hours',
            topics: ['Setting nightly rates', 'Weekend pricing', 'Seasonal adjustments', 'Discount strategies']
        }
    ];

    const paidModules = [
        {
            title: 'Advanced Revenue Optimization',
            duration: '4 hours',
            topics: ['Dynamic pricing algorithms', 'Market analysis tools', 'Occupancy optimization', 'Upselling strategies', 'Direct booking websites']
        },
        {
            title: 'Technology & Automation',
            duration: '4 hours',
            topics: ['Channel managers setup', 'Automated messaging systems', 'Smart home integration', 'PMS selection guide', 'Integration strategies']
        },
        {
            title: 'Scaling Your Hosting Business',
            duration: '5 hours',
            topics: ['Rental arbitrage models', 'Co-hosting strategies', 'Hiring & training staff', 'Virtual assistants', 'Building SOPs', 'Multi-property management']
        },
        {
            title: 'Tax & Legal Mastery (India)',
            duration: '4 hours',
            topics: ['GST registration & filing', 'TDS on OTA bookings', 'Income tax strategies', 'Business structures (LLP vs Proprietorship)', 'State-wise regulations', 'Legal contracts & templates']
        },
        {
            title: 'Marketing & Social Media',
            duration: '3 hours',
            topics: ['Instagram marketing for properties', 'Facebook ads for direct bookings', 'Local SEO optimization', 'Influencer collaborations', 'WhatsApp Business strategies']
        },
        {
            title: 'Platform Mastery',
            duration: '3 hours',
            topics: ['Airbnb algorithm secrets', 'MakeMyTrip optimization', 'Goibibo best practices', 'Multi-platform sync', 'Platform-specific strategies']
        }
    ];

    const features = [
        { icon: <Video size={24} />, title: 'HD Video Lessons', desc: '50+ hours of professional video content' },
        { icon: <FileText size={24} />, title: 'Templates & Tools', desc: '100+ ready-to-use templates & checklists' },
        { icon: <Users size={24} />, title: 'Community Access', desc: 'Join 500+ hosts in our private community' },
        { icon: <Award size={24} />, title: 'Certification', desc: 'Get Host Certified™ badge on completion' },
        { icon: <MessageCircle size={24} />, title: 'Live Q&A Sessions', desc: 'Monthly live sessions with experts' },
        { icon: <Globe size={24} />, title: 'India-First Content', desc: '40% India-specific modules & guidance' }
    ];

    const benefits = [
        'Learn at your own pace with lifetime access',
        'Mobile-friendly platform - learn on the go',
        'Practical assignments & real-world case studies',
        'Access to exclusive vendor network',
        'Priority support for course queries',
        'Job opportunities board for graduates'
    ];

    const testimonials = [
        {
            name: 'Rajesh Kumar',
            role: 'Villa Owner, Lonavala',
            rating: 5,
            text: 'The free course helped me start hosting confidently. I earned ₹45,000 in my first month! Now enrolled in the advanced program to scale further.',
            revenue: '₹45K/month'
        },
        {
            name: 'Priya Sharma',
            role: 'Apartment Host, Bangalore',
            rating: 5,
            text: 'As a complete beginner, the India-specific content was invaluable. The GST and legal modules saved me from costly mistakes.',
            revenue: '₹38K/month'
        },
        {
            name: 'Amit Patel',
            role: 'Managing 4 Properties, Goa',
            rating: 5,
            text: 'Started with the free course, upgraded to advanced. Now managing 4 properties earning ₹2.5L monthly. Best investment I\'ve made!',
            revenue: '₹2.5L/month'
        }
    ];

    return (
        <>
            <SEO
                title="Host Training Program - Become a Professional Airbnb Host | Hostizzy"
                description="Learn to become a successful vacation rental host with Hostizzy\'s comprehensive training program. Free basic course + paid advanced certification for Indian hosts."
            />

            {/* Hero Section */}
            <section className="section bg-primary text-white" style={{
                padding: 'calc(var(--header-height) + 3rem) 0 4rem',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(254, 88, 88, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.5rem 1.5rem',
                                background: 'rgba(254, 88, 88, 0.2)',
                                borderRadius: '2rem',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(254, 88, 88, 0.3)'
                            }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>🎓 India\'s Premier Host Education Platform</span>
                            </div>

                            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 900, lineHeight: 1.1, color: 'white' }}>
                                Become a Professional<br />Vacation Rental Host
                            </h1>

                            <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '2rem', lineHeight: 1.6, color: 'white' }}>
                                Free comprehensive training + Advanced paid programs
                                <br />to build a successful hosting business in India
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                <button className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                                    Join Waitlist - Early Bird Offer
                                </button>
                                <button className="btn btn-outline" style={{
                                    fontSize: '1.1rem',
                                    padding: '1rem 2rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    border: '2px solid rgba(255,255,255,0.3)'
                                }}>
                                    View Course Details
                                </button>
                            </div>

                            {/* Launch Badge */}
                            <div style={{
                                display: 'inline-block',
                                marginTop: '2rem',
                                padding: '1rem 2rem',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '1rem',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>
                                    🚀 Launching Soon
                                </div>
                                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                    Join the waitlist for exclusive early bird pricing
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Program Selector */}
            <section className="section container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Choose Your Learning Path</h2>
                        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                            Start with our free foundation course, then upgrade to advanced programs
                        </p>
                    </div>

                    {/* Program Toggle */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        marginBottom: '3rem',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            onClick={() => setSelectedProgram('free')}
                            className="btn"
                            style={{
                                background: selectedProgram === 'free' ? 'linear-gradient(135deg, #10b981, #059669)' : 'white',
                                color: selectedProgram === 'free' ? 'white' : '#0f172a',
                                border: selectedProgram === 'free' ? 'none' : '2px solid #e2e8f0',
                                padding: '1rem 2rem',
                                fontSize: '1.1rem',
                                fontWeight: 600
                            }}
                        >
                            🎁 Free Foundation Course
                        </button>
                        <button
                            onClick={() => setSelectedProgram('paid')}
                            className="btn"
                            style={{
                                background: selectedProgram === 'paid' ? 'linear-gradient(135deg, #FE5858, #ff4040)' : 'white',
                                color: selectedProgram === 'paid' ? 'white' : '#0f172a',
                                border: selectedProgram === 'paid' ? 'none' : '2px solid #e2e8f0',
                                padding: '1rem 2rem',
                                fontSize: '1.1rem',
                                fontWeight: 600
                            }}
                        >
                            ⭐ Advanced Paid Programs
                        </button>
                    </div>

                    {/* Free Program */}
                    {selectedProgram === 'free' && (
                        <div className="card shadow-premium" style={{ padding: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.5rem 1.5rem',
                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                    color: 'white',
                                    borderRadius: '2rem',
                                    marginBottom: '1rem',
                                    fontWeight: 700
                                }}>
                                    100% FREE
                                </div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Host Foundation Course</h3>
                                <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Everything you need to start hosting successfully</p>
                            </div>

                            <div style={{ marginBottom: '3rem' }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '1.5rem',
                                    marginBottom: '2rem'
                                }}>
                                    <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
                                        <Clock size={32} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
                                        <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>13 Hours</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Video Content</div>
                                    </div>
                                    <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
                                        <BookOpen size={32} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
                                        <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>6 Modules</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Core Topics</div>
                                    </div>
                                    <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
                                        <Download size={32} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
                                        <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>30+</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Templates & Tools</div>
                                    </div>
                                </div>

                                <h4 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Course Curriculum:</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {freeModules.map((module, i) => (
                                        <div key={i} className="card" style={{ padding: '1.5rem', border: '2px solid #e2e8f0' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                                                        Module {i + 1}: {module.title}
                                                    </div>
                                                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                                        <Clock size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                                                        {module.duration}
                                                    </div>
                                                </div>
                                            </div>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {module.topics.map((topic, j) => (
                                                    <li key={j} style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                                        <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.125rem' }} />
                                                        <span style={{ color: '#475569' }}>{topic}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', padding: '2rem', background: '#f0fdf4', borderRadius: '1rem', marginBottom: '2rem' }}>
                                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#065f46' }}>What\'s Included:</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', textAlign: 'left' }}>
                                    {benefits.map((benefit, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                            <CheckCircle size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.125rem' }} />
                                            <span style={{ color: '#065f46' }}>{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <button className="btn btn-gradient" style={{
                                    fontSize: '1.2rem',
                                    padding: '1.25rem 3rem',
                                    background: 'linear-gradient(135deg, #10b981, #059669)'
                                }}>
                                    Enroll in Free Course Now
                                </button>
                                <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                    No credit card required • Instant access • Lifetime access
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Paid Programs */}
                    {selectedProgram === 'paid' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                            {/* Pro Academy */}
                            <div className="card shadow-premium" style={{
                                padding: '2.5rem',
                                border: '3px solid #f59e0b',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-1rem',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    padding: '0.5rem 1.5rem',
                                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                    color: 'white',
                                    borderRadius: '2rem',
                                    fontWeight: 700,
                                    fontSize: '0.9rem'
                                }}>
                                    ⭐ MOST POPULAR
                                </div>

                                <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Pro Host Academy</h3>
                                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>For serious hosts ready to scale</p>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a' }}>₹17,999</span>
                                    </div>
                                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>or 3 × ₹6,499/month</div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <div style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>Everything in Free +</div>
                                    {paidModules.map((module, i) => (
                                        <div key={i} style={{ marginBottom: '1.5rem' }}>
                                            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{module.title}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                                <Clock size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                                                {module.duration}
                                            </div>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                                                {module.topics.slice(0, 3).map((topic, j) => (
                                                    <li key={j} style={{ padding: '0.25rem 0', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                                        <CheckCircle size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '0.125rem' }} />
                                                        <span style={{ color: '#475569' }}>{topic}</span>
                                                    </li>
                                                ))}
                                                {module.topics.length > 3 && (
                                                    <li style={{ padding: '0.25rem 0', color: '#64748b', fontSize: '0.85rem', fontStyle: 'italic' }}>
                                                        + {module.topics.length - 3} more topics
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ padding: '1.5rem', background: '#fffbeb', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                                    <div style={{ fontWeight: 700, marginBottom: '1rem' }}>Bonus Features:</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
                                            <span>Lifetime community access</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
                                            <span>Monthly live Q&A (12 months)</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
                                            <span>Software discounts (PriceLabs, etc.)</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
                                            <span>Pro Host Certification</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-gradient" style={{
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(135deg, #f59e0b, #d97706)'
                                }}>
                                    Enroll in Pro Academy
                                </button>
                            </div>

                            {/* Elite Mastery */}
                            <div className="card shadow-premium" style={{
                                padding: '2.5rem',
                                border: '3px solid #FE5858',
                                position: 'relative',
                                background: 'linear-gradient(180deg, #fff 0%, #fff5f5 100%)'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-1rem',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    padding: '0.5rem 1.5rem',
                                    background: 'linear-gradient(135deg, #FE5858, #ff4040)',
                                    color: 'white',
                                    borderRadius: '2rem',
                                    fontWeight: 700,
                                    fontSize: '0.9rem'
                                }}>
                                    👑 PREMIUM
                                </div>

                                <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Elite Host Mastery</h3>
                                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Premium program with 1-on-1 coaching</p>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a' }}>₹59,999</span>
                                    </div>
                                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>or 3 × ₹20,999/month</div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <div style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem', color: '#FE5858' }}>Everything in Pro +</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={20} style={{ color: '#FE5858', flexShrink: 0 }} />
                                            <span style={{ fontWeight: 600 }}>6 Private 1-on-1 Coaching Sessions (60 min each)</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={20} style={{ color: '#FE5858', flexShrink: 0 }} />
                                            <span style={{ fontWeight: 600 }}>Done-with-you listing optimization</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={20} style={{ color: '#FE5858', flexShrink: 0 }} />
                                            <span style={{ fontWeight: 600 }}>Portfolio review & growth strategy</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={20} style={{ color: '#FE5858', flexShrink: 0 }} />
                                            <span style={{ fontWeight: 600 }}>Vendor network introductions</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={20} style={{ color: '#FE5858', flexShrink: 0 }} />
                                            <span style={{ fontWeight: 600 }}>Master Host Certification</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={20} style={{ color: '#FE5858', flexShrink: 0 }} />
                                            <span style={{ fontWeight: 600 }}>24/7 WhatsApp priority support</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={20} style={{ color: '#FE5858', flexShrink: 0 }} />
                                            <span style={{ fontWeight: 600 }}>Exclusive mastermind community</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <CheckCircle size={20} style={{ color: '#FE5858', flexShrink: 0 }} />
                                            <span style={{ fontWeight: 600 }}>Annual refresher training</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ padding: '1.5rem', background: 'rgba(254, 88, 88, 0.1)', borderRadius: '0.75rem', marginBottom: '2rem', border: '2px solid rgba(254, 88, 88, 0.2)' }}>
                                    <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#FE5858', textAlign: 'center' }}>
                                        💰 Revenue Guarantee
                                    </div>
                                    <div style={{ fontSize: '0.95rem', textAlign: 'center', color: '#0f172a' }}>
                                        2x ROI within 6 months or free coaching extension
                                    </div>
                                </div>

                                <button className="btn btn-gradient" style={{
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(135deg, #FE5858, #ff4040)'
                                }}>
                                    Apply for Elite Program
                                </button>
                                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                                    Limited to 10 students per cohort
                                </p>
                            </div>
                        </div>
                    )}
                </ScrollReveal>
            </section>

            {/* Features Section */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Choose Hostizzy Academy?</h2>
                            <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                                India\'s first comprehensive host training with 40% India-specific content
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {features.map((feature, i) => (
                                <div key={i} className="card shadow-premium" style={{ padding: '2rem', textAlign: 'center' }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        background: 'linear-gradient(135deg, #FE5858, #ff4040)',
                                        borderRadius: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                        color: 'white'
                                    }}>
                                        {feature.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
                                    <p style={{ color: '#64748b', margin: 0 }}>{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Success Stories</h2>
                        <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
                            Hear from hosts who transformed their properties into thriving businesses
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="card shadow-premium" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <Star key={j} size={20} fill="#FE5858" color="#FE5858" />
                                    ))}
                                </div>
                                <p style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem', color: '#475569', fontStyle: 'italic' }}>
                                    "{testimonial.text}"
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                                    <div>
                                        <div style={{ fontWeight: 700 }}>{testimonial.name}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{testimonial.role}</div>
                                    </div>
                                    <div style={{
                                        padding: '0.5rem 1rem',
                                        background: 'linear-gradient(135deg, #10b981, #059669)',
                                        color: 'white',
                                        borderRadius: '0.5rem',
                                        fontWeight: 700,
                                        fontSize: '0.9rem'
                                    }}>
                                        {testimonial.revenue}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* CTA Section */}
            <section className="section" style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: 'white'
            }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Start Your Hosting Journey?</h2>
                            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
                                Be among the first to access India's most comprehensive host training program
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                                    Join Waitlist Now
                                </button>
                                <Link href="/contact" style={{ textDecoration: 'none' }}>
                                    <button className="btn btn-outline" style={{
                                        fontSize: '1.1rem',
                                        padding: '1rem 2rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        border: '2px solid rgba(255,255,255,0.3)'
                                    }}>
                                        Talk to an Advisor
                                    </button>
                                </Link>
                            </div>
                            <p style={{ marginTop: '2rem', opacity: 0.7, fontSize: '0.9rem' }}>
                                Questions? Email us at training@hostizzy.com or WhatsApp: +91 98765 43210
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
};

export default Training;
