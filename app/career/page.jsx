'use client';

import React from 'react';
import Link from 'next/link';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import { ArrowRight, MapPin, Briefcase, Coffee, Plane, BookOpen, Users, Rocket, Heart, Zap, Target } from 'lucide-react';

const Career = () => {
    const openings = [
        {
            role: 'Content Creator / Social Media Manager',
            loc: 'Hybrid (Gurgaon/Remote)',
            exp: '2+ years',
            desc: 'Plan content calendars, capture reels, write compelling copy, and run social campaigns for Hostizzy & NextStop brands.'
        },
        {
            role: 'SEO Strategist (Organic Growth Lead)',
            loc: 'Hybrid (Gurgaon/Remote)',
            exp: '2+ years',
            desc: 'Develop full-funnel SEO strategy, execute technical audits, build backlinks, and grow organic traffic across our platforms.'
        },
        {
            role: 'WordPress Developer',
            loc: 'Hybrid (Gurgaon/Remote)',
            exp: '2+ years',
            desc: 'Build and maintain our property marketplace, integrate payment gateways, optimize site speed, and implement custom themes/plugins.'
        },
        {
            role: 'Performance Marketer (Google Ads)',
            loc: 'Hybrid (Gurgaon/Remote)',
            exp: '2+ years',
            desc: 'Plan and launch Google Ads campaigns, optimize ROAS, A/B test creatives, and drive direct bookings for our properties.'
        },
        {
            role: 'Full Stack Developer',
            loc: 'Remote / Gurgaon',
            exp: '2-5 years',
            desc: 'Architect our website, APIs, booking flows, and internal dashboards. Work with React, Node, Next.js, and modern cloud infrastructure.'
        }
    ];

    const perks = [
        {
            title: 'Flexible Work',
            text: 'No rigid dress codes, no 9-to-5 policing. Results matter, not hours logged. Work remotely or from our Gurgaon office.'
        },
        {
            title: 'Zero Bureaucracy',
            text: 'Flat hierarchy. Speak directly with founders. Your ideas can ship in days, not months.'
        },
        {
            title: 'Coffee & Chai Fuel',
            text: 'Unlimited coffee, chai, and snacks at the office. Work better when you\'re comfortable.'
        },
        {
            title: 'Epic Offsites',
            text: 'Annual team trips to our managed properties. Work hard, travel harder.'
        },
        {
            title: 'Learning Budget',
            text: 'Courses, conferences, books—whatever helps you upskill. We\'ll cover it.'
        },
        {
            title: 'Bring Your Own Title',
            text: 'Hate "Junior Executive"? Pick a title you actually want on your LinkedIn.'
        }
    ];

    const values = [
        {
            title: 'Work as one',
            text: 'We\'re a small, tight-knit team. Collaboration beats silos. Help wherever needed.'
        },
        {
            title: 'Humble',
            text: 'No room for ego. Stay curious, admit mistakes, learn fast.'
        },
        {
            title: 'Creative',
            text: 'Generic doesn\'t cut it. Think outside the box. Experiment often.'
        },
        {
            title: 'Resilient',
            text: 'Hospitality is hard. Startups are harder. We don\'t quit when things get tough.'
        }
    ];

    return (
        <>
            <SEO title="Careers at Hostizzy - Join India\'s Leading VRM Company" />

            {/* Hero Section */}
            <section className="section bg-primary text-white text-center" style={{
                padding: 'calc(var(--header-height) + 2rem) 0 4rem',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            }}>
                <div className="container">
                    <ScrollReveal>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Join the Hostizzy Team</h1>
                        <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
                            We\'re building the future of vacation rental management in India. Join us and make an impact from day one.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Why Hostizzy */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center mb-lg">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Hostizzy?</h2>
                        <p style={{ maxWidth: '700px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem' }}>
                            We\'re not your typical corporate gig. We\'re a high-growth startup where your work actually matters.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                    {[
                        {
                            icon: <Rocket size={32} />,
                            title: 'High Growth',
                            desc: '45+ properties, ₹15 Cr+ GMV, and we\'re just getting started. Grow with us.'
                        },
                        {
                            icon: <Heart size={32} />,
                            title: 'Meaningful Work',
                            desc: 'Build products that impact thousands of travelers and property owners across India.'
                        },
                        {
                            icon: <Zap size={32} />,
                            title: 'Move Fast',
                            desc: 'No endless approval chains. Ship fast, iterate faster. See your ideas come to life quickly.'
                        }
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                                <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Current Openings */}
            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Current Openings</h2>
                            <p style={{ maxWidth: '650px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem' }}>
                                We\'re hiring across marketing, tech, and operations. If you\'re scrappy, ambitious, and hungry to learn—let\'s talk.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {openings.map((job, i) => (
                            <ScrollReveal key={i} delay={i * 0.05}>
                                <div className="card" style={{
                                    padding: '2rem',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '2rem',
                                    flexWrap: 'wrap'
                                }}>
                                    <div style={{ flex: 1, minWidth: '280px' }}>
                                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{job.role}</h3>
                                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                <MapPin size={16} /> {job.loc}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                <Briefcase size={16} /> {job.exp}
                                            </span>
                                        </div>
                                        <p style={{ color: '#475569', lineHeight: 1.6 }}>{job.desc}</p>
                                    </div>
                                    <Link href="/contact" className="btn btn-gradient" style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}>
                                        Apply Now <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                                    </Link>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Perks & Little Extras */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center mb-lg">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Perks & Little Extras</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem' }}>
                            It\'s the small things that make work enjoyable.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                    {perks.map((perk, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="card" style={{ padding: '2rem' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                                    {i === 0 && <Coffee size={32} color="var(--color-primary)" />}
                                    {i === 1 && <Target size={32} color="var(--color-primary)" />}
                                    {i === 2 && <Coffee size={32} color="var(--color-primary)" />}
                                    {i === 3 && <Plane size={32} color="var(--color-primary)" />}
                                    {i === 4 && <BookOpen size={32} color="var(--color-primary)" />}
                                    {i === 5 && <Users size={32} color="var(--color-primary)" />}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{perk.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{perk.text}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Our Values */}
            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Values</h2>
                            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem' }}>
                                These aren\'t just words on a wall—they\'re how we operate every day.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-2-col" style={{ gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                        {values.map((value, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="card" style={{ padding: '2rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>{value.title}</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.6 }}>{value.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section container text-center">
                <ScrollReveal>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Join?</h2>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Don\'t see your exact role? We\'re always looking for exceptional talent. Send us your portfolio or resume—let\'s chat.
                        </p>
                        <Link href="/contact" className="btn btn-gradient" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            Get in Touch <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </>
    );
};

export default Career;
