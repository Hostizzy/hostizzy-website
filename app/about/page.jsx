'use client';

import React from 'react';
import Link from 'next/link';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import {
    Award, Users, Target, Sparkles, TrendingUp, Shield,
    ArrowRight, Star, ExternalLink, Linkedin, CheckCircle
} from 'lucide-react';

const About = () => {
    const advantages = [
        {
            icon: <Target size={28} />,
            title: 'Property-First Approach',
            text: "We don't co-brand. Every property retains its unique identity. We enhance and develop it into a distinct brand."
        },
        {
            icon: <Users size={28} />,
            title: 'Personalized Management',
            text: "Each property gets a tailored strategy. A rustic farmstay gets a different approach than a luxury beachfront villa."
        },
        {
            icon: <Sparkles size={28} />,
            title: 'Curation & Hospitality',
            text: "From local gourmet food experiences to bespoke adventure tours, we design hospitality that matches the property's character."
        },
        {
            icon: <Shield size={28} />,
            title: 'Commitment to Excellence',
            text: "Maintaining the highest standards across all properties. We provide not just service, but an experience that stands out."
        },
        {
            icon: <Users size={28} />,
            title: 'Our Team',
            text: "Led by founders with deep industry expertise, our team is skilled in real estate, hospitality, technology, and customer relations."
        },
        {
            icon: <TrendingUp size={28} />,
            title: 'Revenue Optimization',
            text: "Data-driven pricing, demand forecasting, and clear reporting. Owners always know how their home is doing and why."
        }
    ];

    const milestones = [
        {
            year: '2019',
            title: 'Hostizzy is Born',
            text: 'Started managing 5 properties in Goa and Gurgaon with a vision to professionalize vacation rental management in India.'
        },
        {
            year: '2021',
            title: 'Expansion',
            text: 'Scaled to 20+ properties across North and South India. Launched our proprietary tech stack, HostOS, to streamline operations.'
        },
        {
            year: '2023',
            title: 'Financial Success',
            text: 'Crossed \u20B910 Cr+ GMV. Expanded team to 15+ members. Hosted 20,000+ guests with a 4.8+ average rating across platforms.'
        },
        {
            year: '2024',
            title: 'Celebrating Success',
            text: '50+ properties under management. \u20B915 Cr+ GMV milestone. Launched NextStop (experiential travel) and doubled team size.'
        }
    ];

    const awards = [
        {
            title: 'Start-Up India',
            text: 'Proud to be part of the Start-Up India initiative, demonstrating our commitment to innovation and excellence.',
            color: '#3b82f6'
        },
        {
            title: 'DPIIT Certification',
            text: 'Our operations meet high standards of quality and service, ensuring trust and reliability.',
            color: '#22c55e'
        },
        {
            title: "India's Favourite Homestays Awards",
            text: "Finalists at IFHA by MakeMyTrip, with a win for 'Best Individual Host'.",
            color: '#f59e0b'
        },
        {
            title: '300+ Guest Reviews',
            text: 'Over 300 positive reviews across Airbnb, MakeMyTrip, and Google with exceptional ratings.',
            color: '#a855f7'
        }
    ];

    // YouTube embed helper
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId('https://www.youtube.com/watch?v=0c07HfA1tQw');

    return (
        <>
            <SEO
                title="About Hostizzy - Our Story | Premier Vacation Rental Management India"
                description="Learn about Hostizzy's journey from managing 3 properties to 50+. Founded by ex-Airbnb professionals, we've hosted 40,000+ guests with a 4.9-star rating."
            />

            {/* ── Hero Section ── */}
            <section className="section text-white text-center" style={{
                padding: 'calc(var(--header-height) + 3rem) 0 4rem',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            }}>
                <div className="container">
                    <ScrollReveal>
                        <span className="badge" style={{
                            background: 'rgba(254, 88, 88, 0.15)',
                            color: '#FE5858',
                            marginBottom: '1.25rem',
                            display: 'inline-block'
                        }}>
                            Since 2019
                        </span>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '3.5rem',
                            marginBottom: '1rem',
                            fontWeight: 700
                        }}>
                            Our Story
                        </h1>
                        <p style={{
                            maxWidth: '550px',
                            margin: '0 auto',
                            fontSize: '1.2rem',
                            opacity: 0.85,
                            lineHeight: 1.6
                        }}>
                            Building meaningful stays, together.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── About + Founder Video (2-column) ── */}
            <section className="section container">
                <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '3.5rem' }}>
                    <ScrollReveal>
                        <div>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.25rem',
                                marginBottom: '1.5rem',
                                lineHeight: 1.25
                            }}>
                                Your Property Deserves Its Own Story
                            </h2>
                            <div style={{ lineHeight: 1.8, fontSize: '1.05rem', color: '#334155' }}>
                                <p style={{ marginBottom: '1.25rem' }}>
                                    When guests stay at a property we manage, they remember the breathtaking sunrise from that Mukteshwar villa, the warm hospitality of that Rajasthan haveli, or the serene mornings at that Goa beachfront home. They don't remember us. And that's exactly how it should be.
                                </p>
                                <p style={{ marginBottom: '1.25rem' }}>
                                    <strong>Ethan Barman</strong> and <strong>Ashutosh Karn</strong>, both ex-Airbnb professionals, founded Hostizzy in 2019 with a radical idea: What if property management wasn't about building the management company's brand, but about elevating each property's unique identity?
                                </p>
                                <p>
                                    Starting in 2019 as a hospitality startup, we've grown from managing 3 properties to over 50, generated <strong>{'\u20B9'}15 Cr+ in GMV</strong>, hosted over <strong>40,000 guests</strong>, and maintain a <strong>4.9{'\u2605'} average rating</strong>. Our approach combines technology-driven operations with genuine, personalized hospitality.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <div>
                            <div style={{
                                position: 'relative',
                                paddingTop: '56.25%',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                                backgroundColor: '#000'
                            }}>
                                {videoId && (
                                    <iframe
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            border: 0
                                        }}
                                        src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0`}
                                        title="How Hostizzy Started: The Untold Founder Story"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )}
                            </div>
                            <p style={{
                                textAlign: 'center',
                                marginTop: '1rem',
                                fontSize: '0.95rem',
                                color: '#64748b',
                                fontWeight: 500
                            }}>
                                How Hostizzy Started: The Untold Founder Story
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Our Vision ── */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center" style={{ maxWidth: '720px', margin: '0 auto' }}>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                marginBottom: '0.75rem'
                            }}>
                                Our Vision
                            </h2>
                            <p style={{
                                fontSize: '1.15rem',
                                color: '#FE5858',
                                fontWeight: 600,
                                marginBottom: '1.25rem'
                            }}>
                                Redefining Hospitality in India
                            </p>
                            <p style={{
                                fontSize: '1.05rem',
                                color: '#475569',
                                lineHeight: 1.8
                            }}>
                                We're building India's first vertically integrated hospitality ecosystem -- from property management and technology to guest experiences and travel. Our vision is to transform how India discovers, books, and experiences stays by putting the property and its story at the center of everything we do.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── The Hostizzy Advantage (6 cards, 3x2 grid) ── */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                marginBottom: '1rem'
                            }}>
                                The Hostizzy Advantage
                            </h2>
                            <p style={{
                                maxWidth: '650px',
                                margin: '0 auto',
                                color: '#64748b',
                                fontSize: '1.1rem'
                            }}>
                                We're not just another property management company -- we're your partners in success.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-3-col" style={{ gap: '1.5rem' }}>
                        {advantages.map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <div className="card" style={{
                                    padding: '2rem',
                                    height: '100%',
                                    borderTop: '3px solid #FE5858',
                                    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '';
                                    }}
                                >
                                    <div style={{
                                        color: '#FE5858',
                                        marginBottom: '1rem'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        marginBottom: '0.75rem',
                                        fontWeight: 700
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{
                                        color: '#64748b',
                                        lineHeight: 1.7,
                                        fontSize: '0.95rem'
                                    }}>
                                        {item.text}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Powered by Technology ── */}
            <section style={{ background: '#0f172a', color: 'white', padding: '5rem 0' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
                                Powered by Technology
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                                Our proprietary tech stack powers every aspect of vacation rental management
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-3-col" style={{ gap: '2rem', marginBottom: '3rem' }}>
                        {[
                            {
                                title: 'HostOS',
                                subtitle: 'Property Management System',
                                desc: 'The central nervous system of hospitality. Unified calendar, automated guest messaging, maintenance tracking, and built-in CRM — all in one platform.',
                                badge: 'Live',
                                badgeColor: '#22c55e',
                                accentColor: '#3b82f6',
                                href: 'https://hostos.hostizzy.com/',
                                linkText: 'Explore HostOS',
                                external: true
                            },
                            {
                                title: 'ResIQ',
                                subtitle: 'Revenue Intelligence Dashboard',
                                desc: 'Real-time financial performance, occupancy forecasting, and channel analytics. Complete transparency for property owners.',
                                badge: 'Live',
                                badgeColor: '#22c55e',
                                accentColor: '#FE5858',
                                href: 'https://resiq.hostizzy.com/',
                                linkText: 'Explore ResIQ',
                                external: true
                            },
                            {
                                title: 'JuxTravel',
                                subtitle: 'Travel Marketplace',
                                desc: 'AI-powered travel marketplace connecting luxury hosts with discerning guests. Direct bookings, lower commissions, community trust.',
                                badge: 'Coming Soon',
                                badgeColor: '#8b5cf6',
                                accentColor: '#8b5cf6',
                                href: '/products/juxtravel',
                                linkText: 'Learn More',
                                external: false
                            }
                        ].map((product, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '1.5rem',
                                    padding: '2.5rem 2rem',
                                    borderTop: `3px solid ${product.accentColor}`,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', margin: 0 }}>{product.title}</h3>
                                        <span style={{
                                            padding: '0.25rem 0.75rem', borderRadius: '999px',
                                            background: `${product.badgeColor}20`, color: product.badgeColor,
                                            fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
                                        }}>
                                            {product.badge}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: product.accentColor, fontWeight: 600, marginBottom: '1rem' }}>{product.subtitle}</p>
                                    <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem', flex: 1 }}>{product.desc}</p>
                                    {product.external ? (
                                        <a href={product.href} target="_blank" rel="noopener noreferrer" style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                            color: product.accentColor, fontWeight: 600, fontSize: '0.9rem',
                                            textDecoration: 'none', marginTop: '1.5rem'
                                        }}>
                                            {product.linkText} <ArrowRight size={16} />
                                        </a>
                                    ) : (
                                        <Link href={product.href} style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                            color: product.accentColor, fontWeight: 600, fontSize: '0.9rem',
                                            textDecoration: 'none', marginTop: '1.5rem'
                                        }}>
                                            {product.linkText} <ArrowRight size={16} />
                                        </Link>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Link href="/technology" style={{ color: '#94a3b8', fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                            See the full platform <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Growth & Milestones (Timeline) ── */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                marginBottom: '1rem'
                            }}>
                                Growth & Milestones
                            </h2>
                            <p style={{
                                maxWidth: '600px',
                                margin: '0 auto',
                                color: '#64748b',
                                fontSize: '1.1rem'
                            }}>
                                Our journey from a small startup to India's fastest-growing vacation rental company.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Vertical timeline */}
                    <div style={{
                        position: 'relative',
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: '0 1rem'
                    }}>
                        {/* Center line */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            width: '2px',
                            background: 'linear-gradient(to bottom, #FE5858, #f0abab)',
                            transform: 'translateX(-50%)'
                        }} />

                        {milestones.map((m, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <ScrollReveal key={i} delay={i * 0.12}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: isLeft ? 'flex-start' : 'flex-end',
                                        position: 'relative',
                                        marginBottom: i < milestones.length - 1 ? '2.5rem' : 0,
                                        paddingLeft: isLeft ? 0 : '52%',
                                        paddingRight: isLeft ? '52%' : 0
                                    }}>
                                        {/* Year dot on center line */}
                                        <div style={{
                                            position: 'absolute',
                                            left: '50%',
                                            top: '1.5rem',
                                            transform: 'translateX(-50%)',
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            background: '#FE5858',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: 800,
                                            fontSize: '0.8rem',
                                            zIndex: 2,
                                            boxShadow: '0 4px 12px rgba(254, 88, 88, 0.3)'
                                        }}>
                                            {m.year}
                                        </div>

                                        {/* Content card */}
                                        <div className="card" style={{
                                            padding: '1.5rem 1.75rem',
                                            width: '100%'
                                        }}>
                                            <h3 style={{
                                                fontSize: '1.25rem',
                                                marginBottom: '0.5rem',
                                                fontWeight: 700
                                            }}>
                                                {m.title}
                                            </h3>
                                            <p style={{
                                                color: '#64748b',
                                                lineHeight: 1.7,
                                                fontSize: '0.95rem',
                                                margin: 0
                                            }}>
                                                {m.text}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                    {/* Mobile-friendly stacked fallback via CSS media query inline */}
                    <style jsx>{`
                        @media (max-width: 768px) {
                            div[style*="left: 50%"][style*="width: 2px"] {
                                left: 24px !important;
                            }
                            div[style*="left: 50%"][style*="width: 48px"] {
                                left: 24px !important;
                            }
                            div[style*="paddingLeft"] {
                                padding-left: 60px !important;
                                padding-right: 0 !important;
                            }
                            div[style*="paddingRight"] {
                                padding-left: 60px !important;
                                padding-right: 0 !important;
                            }
                        }
                    `}</style>
                </div>
            </section>

            {/* ── Recognition & Awards ── */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                marginBottom: '1rem'
                            }}>
                                Recognition & Achievements
                            </h2>
                            <p style={{
                                maxWidth: '600px',
                                margin: '0 auto',
                                color: '#64748b',
                                fontSize: '1.1rem'
                            }}>
                                Awards and certifications that validate our commitment to excellence.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-4-col" style={{ gap: '1.5rem' }}>
                        {awards.map((award, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="card" style={{
                                    padding: '2rem 1.75rem',
                                    height: '100%',
                                    borderLeft: `4px solid ${award.color}`,
                                    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '';
                                    }}
                                >
                                    <Award size={24} color={award.color} style={{ marginBottom: '1rem' }} />
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        marginBottom: '0.75rem',
                                        fontWeight: 700
                                    }}>
                                        {award.title}
                                    </h3>
                                    <p style={{
                                        color: '#64748b',
                                        lineHeight: 1.7,
                                        fontSize: '0.9rem',
                                        margin: 0
                                    }}>
                                        {award.text}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Leadership Team ── */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                marginBottom: '1rem'
                            }}>
                                Leadership
                            </h2>
                            <p style={{
                                maxWidth: '600px',
                                margin: '0 auto',
                                color: '#64748b',
                                fontSize: '1.1rem'
                            }}>
                                Meet the people steering the ship.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <div style={{
                            maxWidth: '480px',
                            margin: '0 auto'
                        }}>
                            <div className="card" style={{
                                padding: '2.5rem',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '130px',
                                    height: '130px',
                                    margin: '0 auto 1.5rem',
                                    borderRadius: '50%',
                                    background: 'url("/images/team.png") center / cover',
                                    border: '4px solid #FE5858',
                                    boxShadow: '0 8px 24px rgba(254, 88, 88, 0.2)'
                                }} />
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '0.35rem',
                                    fontWeight: 700
                                }}>
                                    Ethan Barman
                                </h3>
                                <p style={{
                                    color: '#FE5858',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    marginBottom: '1rem'
                                }}>
                                    Founder & CEO
                                </p>
                                <p style={{
                                    color: '#64748b',
                                    lineHeight: 1.7,
                                    fontSize: '0.95rem',
                                    marginBottom: '1.25rem'
                                }}>
                                    Ex-Airbnb professional with deep expertise in hospitality and real estate. Ethan leads Hostizzy's vision of transforming vacation rental management in India through technology and personalized service.
                                </p>
                                <a
                                    href="https://www.linkedin.com/in/ethanbarman/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#0077b5',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        textDecoration: 'none',
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                >
                                    <Linkedin size={18} />
                                    Connect on LinkedIn
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="section text-white text-center" style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                padding: '4rem 0'
            }}>
                <div className="container">
                    <ScrollReveal>
                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '2.5rem',
                            marginBottom: '1rem'
                        }}>
                            Ready to Partner With Us?
                        </h2>
                        <p style={{
                            maxWidth: '500px',
                            margin: '0 auto 2rem',
                            fontSize: '1.15rem',
                            opacity: 0.85,
                            lineHeight: 1.6
                        }}>
                            Let's build something extraordinary together.
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <Link href="/contact" className="btn btn-gradient" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                Partner With Us
                                <ArrowRight size={18} />
                            </Link>
                            <a
                                href="https://book.hostizzy.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn"
                                style={{
                                    border: '2px solid rgba(255,255,255,0.4)',
                                    color: 'white',
                                    background: 'transparent',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.25s ease'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                Book a Stay
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
};

export default About;
