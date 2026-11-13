'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';


import ScrollReveal from '../../components/ScrollReveal';
import { PROPERTY_COUNT } from '../../lib/products';
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
    Leadership: '#FE5858',
};

const Career = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [openings, setOpenings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedJob, setExpandedJob] = useState(null);
    const [applyRole, setApplyRole] = useState('');
    const [applyForm, setApplyForm] = useState({ firstName: '', lastName: '', phone: '', email: '', linkedin: '', resume: '', message: '' });
    const [applyStatus, setApplyStatus] = useState(''); // '' | 'sending' | 'sent'
    const [honeypot, setHoneypot] = useState('');
    const formLoadedAt = useRef(Date.now());

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

            {/* ── Current Openings + Apply Form (Two-Column) ── */}
            <style>{`
                @media (max-width: 768px) {
                    .career-two-col { flex-direction: column !important; }
                    .career-apply-col { width: 100% !important; position: static !important; }
                }
            `}</style>
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container">
                    <ScrollReveal>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>Current Openings</h2>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                                {loading ? 'Loading...' : `${filteredOpenings.length} role${filteredOpenings.length !== 1 ? 's' : ''} available`}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="career-two-col" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                        {/* Left Column — Accordion Job Listings */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} style={{
                                        background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0',
                                        padding: '1.25rem 1.5rem', marginBottom: '0.75rem'
                                    }}>
                                        <div style={{ height: '1.1rem', width: '55%', background: '#e2e8f0', borderRadius: '6px', marginBottom: '0.5rem' }} />
                                        <div style={{ height: '0.85rem', width: '30%', background: '#f1f5f9', borderRadius: '999px' }} />
                                    </div>
                                ))
                            ) : (
                                <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                    {filteredOpenings.map((job, i) => {
                                        const deptColor = DEPT_COLORS[job.department] || '#64748b';
                                        const isExpanded = expandedJob === (job.id || i);
                                        return (
                                            <div key={job.id || i} style={{ borderBottom: i < filteredOpenings.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                                                {/* Accordion Header */}
                                                <button
                                                    onClick={() => setExpandedJob(isExpanded ? null : (job.id || i))}
                                                    style={{
                                                        width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                                                        padding: '1.1rem 1.5rem', background: 'none', border: 'none',
                                                        cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                                                        transition: 'background 0.15s ease',
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    <div style={{ width: '4px', height: '28px', borderRadius: '2px', background: deptColor, flexShrink: 0 }} />
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, lineHeight: 1.3, color: '#0f172a' }}>{job.role}</h3>
                                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                                                            <span style={{ fontSize: '0.78rem', color: deptColor, fontWeight: 600 }}>{job.department}</span>
                                                            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{job.location}</span>
                                                        </div>
                                                    </div>
                                                    <span style={{ fontSize: '1.3rem', color: '#94a3b8', flexShrink: 0, fontWeight: 300, lineHeight: 1 }}>
                                                        {isExpanded ? '\u2212' : '+'}
                                                    </span>
                                                </button>

                                                {/* Accordion Body */}
                                                {isExpanded && (
                                                    <div style={{ padding: '0 1.5rem 1.5rem 2.75rem' }}>
                                                        {job.tagline && (
                                                            <p style={{ fontStyle: 'italic', color: '#64748b', fontSize: '0.92rem', margin: '0 0 1rem 0', lineHeight: 1.6 }}>
                                                                {job.tagline}
                                                            </p>
                                                        )}

                                                        {/* Metadata pills */}
                                                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                                                            <span style={{
                                                                fontSize: '0.8rem', padding: '0.25rem 0.7rem', borderRadius: '999px',
                                                                background: '#f1f5f9', color: '#475569',
                                                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                                                            }}>
                                                                <MapPin size={12} /> {job.location}
                                                            </span>
                                                            <span style={{
                                                                fontSize: '0.8rem', padding: '0.25rem 0.7rem', borderRadius: '999px',
                                                                background: '#f1f5f9', color: '#475569',
                                                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                                                            }}>
                                                                <Briefcase size={12} /> {job.experience}
                                                            </span>
                                                            {job.commitment && (
                                                                <span style={{
                                                                    fontSize: '0.8rem', padding: '0.25rem 0.7rem', borderRadius: '999px',
                                                                    background: '#f1f5f9', color: '#475569',
                                                                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                                                                }}>
                                                                    <Clock size={12} /> {job.commitment}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Responsibilities */}
                                                        {job.responsibilities && job.responsibilities.length > 0 && (
                                                            <div style={{ marginBottom: '1.25rem' }}>
                                                                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FE5858', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                                    Role &amp; Responsibilities
                                                                </h4>
                                                                <ul style={{ margin: 0, paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                                                    {job.responsibilities.map((item, ri) => (
                                                                        <li key={ri} style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{item}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {/* Who Should Apply */}
                                                        {job.whoShouldApply && job.whoShouldApply.length > 0 && (
                                                            <div style={{ marginBottom: '1.25rem' }}>
                                                                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
                                                                    Who should apply?
                                                                </h4>
                                                                <ul style={{ margin: 0, paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                                                    {job.whoShouldApply.map((item, wi) => (
                                                                        <li key={wi} style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>{item}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        <button
                                                            onClick={() => {
                                                                setApplyRole(job.role);
                                                                if (window.innerWidth < 768) {
                                                                    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                                                                }
                                                            }}
                                                            className="btn btn-gradient"
                                                            style={{
                                                                padding: '0.6rem 1.4rem', fontSize: '0.88rem', fontWeight: 600,
                                                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                                                cursor: 'pointer', border: 'none',
                                                            }}
                                                        >
                                                            Apply for this role <ArrowRight size={15} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                    {filteredOpenings.length === 0 && (
                                        <div style={{ padding: '2.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.95rem' }}>
                                            No openings found for this department.
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Why Hostizzy mini section */}
                            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0f172a' }}>Why Hostizzy?</h4>
                                <ul style={{ margin: 0, paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <li style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                                        High-growth startup with {PROPERTY_COUNT} properties and Rs 12 Cr+ GMV -- be part of the journey from the ground up.
                                    </li>
                                    <li style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                                        Flat hierarchy with zero bureaucracy -- your ideas ship in days, not months.
                                    </li>
                                    <li style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                                        Flexible work, learning budget, epic offsites, and a culture that values craft over clock-watching.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Column — Sticky Apply Form */}
                        <div id="apply-form" className="career-apply-col" style={{ width: '380px', flexShrink: 0, position: 'sticky', top: '100px' }}>
                            {applyStatus === 'sent' ? (
                                <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Application Received!</h3>
                                    <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>We&apos;ll review your application and get back to you within 5 business days.</p>
                                    <button onClick={() => { setApplyStatus(''); setApplyForm({ firstName: '', lastName: '', phone: '', email: '', linkedin: '', resume: '', message: '' }); setApplyRole(''); }}
                                        style={{ padding: '0.55rem 1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                                        Submit Another
                                    </button>
                                </div>
                            ) : (
                                <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem', color: '#0f172a' }}>Apply Now</h3>
                                    {/* Honeypot */}
                                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                                        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
                                    </div>

                                    {/* First Name + Last Name */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>First Name *</label>
                                            <input type="text" placeholder="First name" value={applyForm.firstName}
                                                onChange={e => setApplyForm(p => ({ ...p, firstName: e.target.value }))}
                                                style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Last Name</label>
                                            <input type="text" placeholder="Last name" value={applyForm.lastName}
                                                onChange={e => setApplyForm(p => ({ ...p, lastName: e.target.value }))}
                                                style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Contact + Email */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Contact *</label>
                                            <input type="tel" placeholder="Phone number" value={applyForm.phone}
                                                onChange={e => setApplyForm(p => ({ ...p, phone: e.target.value }))}
                                                style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Email *</label>
                                            <input type="email" placeholder="Email address" value={applyForm.email}
                                                onChange={e => setApplyForm(p => ({ ...p, email: e.target.value }))}
                                                style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Applying For */}
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Applying For *</label>
                                        <select value={applyRole} onChange={e => setApplyRole(e.target.value)}
                                            style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box' }}>
                                            <option value="">Select a role</option>
                                            {openings.map(o => <option key={o.id} value={o.role}>{o.role}</option>)}
                                            <option value="Open Application">Open Application</option>
                                        </select>
                                    </div>

                                    {/* LinkedIn */}
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>LinkedIn Profile</label>
                                        <input type="url" placeholder="https://linkedin.com/in/..." value={applyForm.linkedin}
                                            onChange={e => setApplyForm(p => ({ ...p, linkedin: e.target.value }))}
                                            style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                                        />
                                    </div>

                                    {/* Resume / Portfolio */}
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Resume / Portfolio Link</label>
                                        <input type="url" placeholder="Google Drive / Dropbox link" value={applyForm.resume}
                                            onChange={e => setApplyForm(p => ({ ...p, resume: e.target.value }))}
                                            style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Message / Cover Note</label>
                                        <textarea placeholder="Tell us why you'd be a great fit..." rows={3} value={applyForm.message}
                                            onChange={e => setApplyForm(p => ({ ...p, message: e.target.value }))}
                                            style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
                                        />
                                    </div>

                                    <button
                                        disabled={!applyForm.firstName || !applyForm.phone || !applyForm.email || !applyRole || applyStatus === 'sending'}
                                        onClick={async () => {
                                            setApplyStatus('sending');
                                            try {
                                                await fetch('/api/contact', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        name: `${applyForm.firstName} ${applyForm.lastName}`.trim(),
                                                        email: applyForm.email,
                                                        phone: applyForm.phone,
                                                        message: `[Job Application: ${applyRole}]${applyForm.linkedin ? `\nLinkedIn: ${applyForm.linkedin}` : ''}${applyForm.resume ? `\nResume: ${applyForm.resume}` : ''}${applyForm.message ? `\n\n${applyForm.message}` : ''}`,
                                                        department: 'careers',
                                                        departmentEmail: 'founder@hostizzy.com',
                                                        subject: `Job Application: ${applyRole}`,
                                                        _hp_website: honeypot,
                                                        _formLoadedAt: formLoadedAt.current,
                                                    }),
                                                });
                                                setApplyStatus('sent');
                                            } catch {
                                                setApplyStatus('');
                                                alert('Something went wrong. Please try again or email careers@hostizzy.com');
                                            }
                                        }}
                                        className="btn btn-gradient"
                                        style={{
                                            width: '100%', padding: '0.75rem', fontSize: '0.95rem', fontWeight: 700,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                            opacity: (!applyForm.firstName || !applyForm.phone || !applyForm.email || !applyRole || applyStatus === 'sending') ? 0.5 : 1,
                                            cursor: (!applyForm.firstName || !applyForm.phone || !applyForm.email || !applyRole || applyStatus === 'sending') ? 'not-allowed' : 'pointer',
                                            border: 'none',
                                        }}
                                    >
                                        {applyStatus === 'sending' ? 'Submitting...' : 'Apply Now'}
                                        {applyStatus !== 'sending' && <ArrowRight size={18} />}
                                    </button>
                                </div>
                            )}
                        </div>
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
                            desc: `${PROPERTY_COUNT} properties, \u20b912 Cr+ GMV, and we're just getting started. Grow with us.`,
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
