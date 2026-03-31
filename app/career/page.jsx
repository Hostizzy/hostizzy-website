'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import {
    ArrowRight, MapPin, Briefcase, Coffee, Plane, BookOpen, Users,
    Rocket, Heart, Zap, Target, Search, Building2, Clock, ChevronRight,
    Globe, Sparkles, Shield, Linkedin, Mail
} from 'lucide-react';

const DEPT_COLORS = {
    Marketing: '#22c55e',
    Engineering: '#3b82f6',
    Growth: '#22c55e',
    Operations: '#f59e0b',
};

const Career = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [openings, setOpenings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/careers')
            .then(res => res.json())
            .then(data => {
                setOpenings(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const perks = [
        { icon: <Globe size={24} />, title: 'Flexible Work', text: 'No rigid dress codes, no 9-to-5 policing. Results matter, not hours logged. Work remotely or from our Gurgaon office.' },
        { icon: <Target size={24} />, title: 'Zero Bureaucracy', text: 'Flat hierarchy. Speak directly with founders. Your ideas can ship in days, not months.' },
        { icon: <Coffee size={24} />, title: 'Coffee & Chai Fuel', text: 'Unlimited coffee, chai, and snacks at the office. Work better when you\'re comfortable.' },
        { icon: <Plane size={24} />, title: 'Epic Offsites', text: 'Annual team trips to our managed properties. Work hard, travel harder.' },
        { icon: <BookOpen size={24} />, title: 'Learning Budget', text: 'Courses, conferences, books\u2014whatever helps you upskill. We\'ll cover it.' },
        { icon: <Users size={24} />, title: 'Bring Your Own Title', text: 'Hate "Junior Executive"? Pick a title you actually want on your LinkedIn.' }
    ];

    const values = [
        { title: 'Work as One', text: 'We\'re a small, tight-knit team. Collaboration beats silos. Help wherever needed.', color: '#3b82f6' },
        { title: 'Humble', text: 'No room for ego. Stay curious, admit mistakes, learn fast.', color: '#22c55e' },
        { title: 'Creative', text: 'Generic doesn\'t cut it. Think outside the box. Experiment often.', color: '#a855f7' },
        { title: 'Resilient', text: 'Hospitality is hard. Startups are harder. We don\'t quit when things get tough.', color: '#f59e0b' }
    ];

    const departments = ['All', ...Array.from(new Set(openings.map(o => o.department)))];
    const filteredOpenings = activeFilter === 'All' ? openings : openings.filter(o => o.department === activeFilter);

    const getDaysAgo = (dateStr) => {
        const posted = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
        if (diff <= 0) return 'Today';
        if (diff === 1) return '1 day ago';
        return `${diff} days ago`;
    };

    // JobPosting structured data for Google Jobs
    const jobPostingSchema = openings.map(job => ({
        '@context': 'https://schema.org/',
        '@type': 'JobPosting',
        title: job.role,
        description: job.description,
        datePosted: job.postedDate,
        employmentType: 'FULL_TIME',
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Gurgaon',
                addressRegion: 'Haryana',
                addressCountry: 'IN'
            }
        },
        jobLocationType: job.location.toLowerCase().includes('remote') ? 'TELECOMMUTE' : undefined,
        hiringOrganization: {
            '@type': 'Organization',
            name: 'Hostizzy',
            sameAs: 'https://www.hostizzy.com',
            logo: 'https://www.hostizzy.com/logo.png'
        }
    }));

    return (
        <>
            <SEO title="Careers at Hostizzy - Join India's Leading VRM Company" />

            {/* JobPosting Schema for Google Jobs */}
            {openings.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
                />
            )}

            {/* ── Hero Section ── */}
            <section style={{
                padding: 'calc(var(--header-height) + 3rem) 0 4rem',
                background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Radial gradient accent glow */}
                <div style={{
                    position: 'absolute', top: '20%', right: '10%',
                    width: '300px', height: '300px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                    filter: 'blur(150px)',
                    pointerEvents: 'none'
                }} />

                {/* Dot pattern overlay */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.05,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', paddingBottom: '3rem' }}>
                            <span className="badge" style={{
                                background: 'rgba(59,130,246,0.15)', color: '#93c5fd',
                                border: '1px solid rgba(59,130,246,0.3)',
                                padding: '0.4rem 1rem', borderRadius: '999px',
                                fontSize: '0.85rem', fontWeight: 500, display: 'inline-block', marginBottom: '1.5rem'
                            }}>
                                We&apos;re Hiring
                            </span>
                            <h1 style={{
                                fontSize: 'clamp(2.4rem, 5vw, 3.75rem)', fontWeight: 800, lineHeight: 1.1,
                                marginBottom: '1.25rem', letterSpacing: '-0.02em',
                                textShadow: '0 2px 20px rgba(0,0,0,0.5)'
                            }}>
                                Build the Future of Hospitality
                            </h1>
                            <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto' }}>
                                Join a high-growth startup redefining vacation rental management in India. Ship fast, grow faster, and make an impact from day one.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Stats bar */}
                    <ScrollReveal delay={0.15}>
                        <div style={{
                            display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap',
                            padding: '1.25rem 2rem',
                            background: 'rgba(255,255,255,0.05)',
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px 12px 0 0',
                            fontSize: '0.95rem', color: '#cbd5e1'
                        }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Briefcase size={16} style={{ color: '#3b82f6' }} /> <strong style={{ color: '#fff' }}>{openings.length}</strong> Open Roles
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Globe size={16} style={{ color: '#22c55e' }} /> Hybrid &amp; Remote
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} style={{ color: '#f59e0b' }} /> Gurgaon, India
                            </span>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Search / Filter Bar ── */}
            <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <div className="container" style={{ padding: '1.25rem 1rem' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between'
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '200px', maxWidth: '400px',
                            background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 1rem',
                        }}>
                            <Search size={18} style={{ color: '#94a3b8', flexShrink: 0 }} />
                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Search roles...</span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {departments.map(dept => (
                                <button
                                    key={dept}
                                    onClick={() => setActiveFilter(dept)}
                                    style={{
                                        padding: '0.45rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 500,
                                        border: activeFilter === dept ? '1.5px solid #3b82f6' : '1.5px solid #e2e8f0',
                                        background: activeFilter === dept ? '#eff6ff' : '#fff',
                                        color: activeFilter === dept ? '#2563eb' : '#475569',
                                        cursor: 'pointer', transition: 'all 0.2s ease'
                                    }}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Job Listings ── */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>Open Positions</h2>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                                {loading ? 'Loading...' : `${filteredOpenings.length} role${filteredOpenings.length !== 1 ? 's' : ''} available`}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '960px' }}>
                        {loading ? (
                            // Loading skeletons
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="card" style={{
                                    padding: '1.75rem 2rem',
                                    borderLeft: '4px solid #e2e8f0',
                                }}>
                                    <div style={{ height: '1.2rem', width: '60%', background: '#e2e8f0', borderRadius: '6px', marginBottom: '0.75rem' }} />
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                        <div style={{ height: '1rem', width: '80px', background: '#f1f5f9', borderRadius: '999px' }} />
                                        <div style={{ height: '1rem', width: '120px', background: '#f1f5f9', borderRadius: '999px' }} />
                                        <div style={{ height: '1rem', width: '80px', background: '#f1f5f9', borderRadius: '999px' }} />
                                    </div>
                                    <div style={{ height: '0.9rem', width: '90%', background: '#f1f5f9', borderRadius: '4px', marginBottom: '0.4rem' }} />
                                    <div style={{ height: '0.9rem', width: '70%', background: '#f1f5f9', borderRadius: '4px' }} />
                                </div>
                            ))
                        ) : (
                            filteredOpenings.map((job, i) => {
                                const deptColor = DEPT_COLORS[job.department] || '#64748b';
                                return (
                                    <ScrollReveal key={job.id || i} delay={i * 0.05}>
                                        <div className="card" style={{
                                            padding: '1.75rem 2rem',
                                            borderLeft: `4px solid ${deptColor}`,
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                                            gap: '1.5rem', flexWrap: 'wrap',
                                            transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                                            cursor: 'pointer'
                                        }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                                                e.currentTarget.style.borderLeftWidth = '5px';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.boxShadow = '';
                                                e.currentTarget.style.borderLeftWidth = '4px';
                                            }}
                                        >
                                            <div style={{ flex: 1, minWidth: '260px' }}>
                                                {/* Title row */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{job.role}</h3>
                                                    <span style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                                        fontSize: '0.75rem', fontWeight: 600, color: '#475569',
                                                        background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px'
                                                    }}>
                                                        <Building2 size={12} /> Hostizzy
                                                    </span>
                                                </div>

                                                {/* Tags */}
                                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                                    <span style={{
                                                        fontSize: '0.8rem', padding: '0.2rem 0.65rem', borderRadius: '999px',
                                                        background: `${deptColor}14`, color: deptColor, fontWeight: 600,
                                                        border: `1px solid ${deptColor}30`
                                                    }}>
                                                        {job.department}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '0.8rem', padding: '0.2rem 0.65rem', borderRadius: '999px',
                                                        background: '#f1f5f9', color: '#475569',
                                                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                                                    }}>
                                                        <MapPin size={12} /> {job.location}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '0.8rem', padding: '0.2rem 0.65rem', borderRadius: '999px',
                                                        background: '#f1f5f9', color: '#475569',
                                                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                                                    }}>
                                                        <Briefcase size={12} /> {job.experience}
                                                    </span>
                                                </div>

                                                {/* Desc */}
                                                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.92rem', margin: 0 }}>{job.description}</p>

                                                {/* Posted */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.75rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                                                    <Clock size={13} />
                                                    Posted {getDaysAgo(job.postedDate)}
                                                </div>
                                            </div>

                                            {/* Apply */}
                                            <Link href="/contact" className="btn btn-gradient" style={{
                                                padding: '0.65rem 1.5rem', whiteSpace: 'nowrap',
                                                fontSize: '0.9rem', fontWeight: 600, flexShrink: 0,
                                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
                                            }}>
                                                Apply <ArrowRight size={15} />
                                            </Link>
                                        </div>
                                    </ScrollReveal>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>

            {/* ── Life at Hostizzy ── */}
            <section className="section container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <span style={{
                            fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
                            letterSpacing: '0.1em', color: '#3b82f6', marginBottom: '0.5rem', display: 'block'
                        }}>
                            Life at Hostizzy
                        </span>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                            A Culture That Moves Fast and Cares Deeply
                        </h2>
                        <p style={{ color: '#64748b', lineHeight: 1.75, fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
                            We&apos;re a lean team of builders who value ownership, speed, and craft. No endless meetings. No corporate theatre. Just smart people doing meaningful work with the freedom to do it their way.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-3-col" style={{ gap: '1.25rem' }}>
                    {perks.map((perk, i) => (
                        <ScrollReveal key={i} delay={i * 0.08}>
                            <div className="card" style={{
                                padding: '1.5rem',
                                transition: 'box-shadow 0.2s ease'
                            }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                            >
                                <div style={{ color: '#3b82f6', marginBottom: '0.75rem' }}>{perk.icon}</div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{perk.title}</h4>
                                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{perk.text}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* ── Our Values ── */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <span style={{
                                fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
                                letterSpacing: '0.1em', color: '#3b82f6', marginBottom: '0.5rem', display: 'block'
                            }}>
                                What We Stand For
                            </span>
                            <h2 style={{ fontSize: '2.25rem', fontWeight: 800 }}>Our Values</h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-2-col" style={{ gap: '1.25rem', maxWidth: '960px', margin: '0 auto' }}>
                        {values.map((value, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <div style={{
                                    background: '#fff', borderRadius: '12px', padding: '1.75rem',
                                    borderTop: `3px solid ${value.color}`,
                                    border: '1px solid #e2e8f0',
                                    borderTopColor: value.color,
                                    borderTopWidth: '3px',
                                    transition: 'box-shadow 0.2s ease'
                                }}
                                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                                >
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{value.title}</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>{value.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Join Us ── */}
            <section className="section container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <span style={{
                            fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
                            letterSpacing: '0.1em', color: '#3b82f6', marginBottom: '0.5rem', display: 'block'
                        }}>
                            Why Hostizzy
                        </span>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: 800 }}>Why You Should Join Us</h2>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-3-col" style={{ gap: '1.5rem' }}>
                    {[
                        {
                            icon: <Rocket size={28} />,
                            title: 'High Growth',
                            desc: '45+ properties, \u20b915 Cr+ GMV, and we\'re just getting started. Grow with us.',
                            gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                            iconColor: '#2563eb'
                        },
                        {
                            icon: <Heart size={28} />,
                            title: 'Meaningful Work',
                            desc: 'Build products that impact thousands of travelers and property owners across India.',
                            gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
                            iconColor: '#ec4899'
                        },
                        {
                            icon: <Zap size={28} />,
                            title: 'Move Fast',
                            desc: 'No endless approval chains. Ship fast, iterate faster. See your ideas come to life quickly.',
                            gradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                            iconColor: '#d97706'
                        }
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div style={{
                                background: item.gradient,
                                borderRadius: '16px', padding: '2.25rem',
                                border: '1px solid rgba(0,0,0,0.04)',
                                height: '100%',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '12px',
                                    background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: item.iconColor, marginBottom: '1.25rem',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.6rem' }}>{item.title}</h3>
                                <p style={{ color: '#475569', lineHeight: 1.65, margin: 0, fontSize: '0.95rem' }}>{item.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* ── Open Application CTA ── */}
            <section style={{
                background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
                color: '#fff', padding: '5rem 0', position: 'relative', overflow: 'hidden'
            }}>
                {/* Decorative glow */}
                <div style={{
                    position: 'absolute', top: '-50%', right: '-10%',
                    width: '400px', height: '400px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <ScrollReveal>
                        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                            <Sparkles size={32} style={{ color: '#3b82f6', marginBottom: '1.25rem' }} />
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                                Don&apos;t See Your Role?
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                We&apos;re always looking for exceptional talent. If you&apos;re passionate about hospitality and tech, send us your resume.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                <Link href="/contact" className="btn btn-gradient" style={{
                                    padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 600,
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                    Get in Touch <ChevronRight size={18} />
                                </Link>
                                <a href="mailto:careers@hostizzy.com" style={{
                                    padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 600,
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)',
                                    color: '#fff', textDecoration: 'none',
                                    transition: 'background 0.2s ease'
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <Mail size={18} /> careers@hostizzy.com
                                </a>
                            </div>

                            {/* Social */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                                <a href="https://linkedin.com/company/hostizzy" target="_blank" rel="noopener noreferrer"
                                    style={{
                                        width: '40px', height: '40px', borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#94a3b8', textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.borderColor = '#3b82f6';
                                        e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = '#94a3b8';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
};

export default Career;
