'use client';

import React from 'react';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import VideoSection from '../../components/VideoSection';
import { Target, Users, Award, Lightbulb } from 'lucide-react';

const About = () => {
    return (
        <>
            <SEO title="About Hostizzy - Premier Vacation Rental Management Company India" />

            {/* Hero Section */}
            <section className="section bg-primary text-white text-center" style={{
                padding: 'calc(var(--header-height) + 2rem) 0 4rem',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            }}>
                <div className="container">
                    <ScrollReveal>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>About Hostizzy</h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
                            India's fastest-growing vacation rental management company.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Story Section */}
            <section className="section container">
                <ScrollReveal>
                    <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Our Story</h2>
                            <div style={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#334155' }}>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    <strong>Hostizzy</strong> was born from a simple observation: property owners in India struggled to maximize their vacation rental potential while maintaining exceptional guest standards. We set out to change that.
                                </p>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Founded in 2019 by hospitality veterans, we've grown from managing a handful of properties to overseeing 45+ premium listings across India's most sought-after destinations. Our approach combines cutting-edge technology with old-school hospitality values.
                                </p>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Today, we've generated <b>₹15 Cr+ in GMV</b>, hosted over <b>30,000 guests</b>, and maintained an average rating of <b>4.8+ stars</b> across platforms. But numbers only tell part of the story.
                                </p>
                                <p>
                                    What truly drives us is creating unforgettable experiences—for both property owners who trust us with their investments and guests who choose to stay with us.
                                </p>
                            </div>
                        </div>
                        <div className="card shadow-premium" style={{
                            height: '500px',
                            background: 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '1rem'
                        }}></div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Video Section */}
            <VideoSection
                url="https://www.youtube.com/watch?v=Z7-NlFyVMz4"
                title="Our Vision"
                subtitle="Redefining Hospitality in India."
            />

            {/* Hostizzy Advantage */}
            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Hostizzy Advantage</h2>
                            <p style={{ maxWidth: '650px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem' }}>
                                We're not just another property management company—we're your partners in success.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-2-col" style={{ gap: '2rem' }}>
                        {[
                            {
                                title: 'Property-First Approach',
                                text: 'Every property is unique. We craft custom strategies for pricing, marketing, and guest experience—ensuring your listing stands out and performs at its peak.'
                            },
                            {
                                title: 'Personalized Management',
                                text: 'No cookie-cutter solutions here. From property photography to operational workflows, we tailor our services to match your property\'s character and your goals.'
                            },
                            {
                                title: 'Curation and Hospitality',
                                text: 'We handpick properties that meet our quality standards. Once onboarded, we maintain those standards through meticulous operations and genuine hospitality.'
                            },
                            {
                                title: 'Commitment to Excellence',
                                text: 'Our 4.8+ average rating isn\'t luck—it\'s the result of obsessive attention to detail, proactive communication, and a team that genuinely cares.'
                            }
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="card" style={{ padding: '2.5rem', height: '100%' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{item.title}</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.7 }}>{item.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Growth & Milestones */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center mb-lg">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Growth & Milestones</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem' }}>
                            Our journey so far.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-2-col" style={{ gap: '3rem' }}>
                    {[
                        {
                            year: '2019',
                            title: 'Hostizzy® is Born',
                            text: 'Started with a vision to professionalize vacation rental management in India. Managed our first 5 properties in Goa and Gurgaon.'
                        },
                        {
                            year: '2021',
                            title: 'Expansion',
                            text: 'Scaled to 20+ properties across North and South India. Launched our proprietary tech stack (HostOS) to streamline operations.'
                        },
                        {
                            year: '2023',
                            title: 'Financial Success',
                            text: 'Crossed ₹10 Cr+ in GMV. Expanded team to 15+ members. Hosted 20,000+ guests with a 4.8+ average rating.'
                        },
                        {
                            year: '2024',
                            title: 'Celebrating Success',
                            text: '45+ properties under management. ₹15 Cr+ GMV milestone. Launched NextStop (experiential travel) and doubled our team size.'
                        }
                    ].map((milestone, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 900,
                                    color: 'var(--color-primary)',
                                    lineHeight: 1,
                                    minWidth: '90px'
                                }}>{milestone.year}</div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{milestone.title}</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.7 }}>{milestone.text}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Team Leadership */}
            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Leadership Team</h2>
                            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem' }}>
                                Meet the people steering the ship.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid desktop-4-col" style={{ gap: '2rem' }}>
                        {[
                            {
                                name: 'Ethan Barman',
                                role: 'Founder',
                                img: 'https://i.pravatar.cc/300?img=12'
                            },
                            {
                                name: 'Ashutosh Karn',
                                role: 'Co-Founder',
                                img: 'https://i.pravatar.cc/300?img=13'
                            },
                            {
                                name: 'Vikas Kumar',
                                role: 'Operations',
                                img: 'https://i.pravatar.cc/300?img=33'
                            },
                            {
                                name: 'Rishi Tripathi',
                                role: 'Operations',
                                img: 'https://i.pravatar.cc/300?img=14'
                            }
                        ].map((member, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="card text-center" style={{ padding: '2rem' }}>
                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        margin: '0 auto 1.5rem',
                                        borderRadius: '50%',
                                        background: `url("${member.img}")`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        border: '4px solid var(--color-primary)'
                                    }}></div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{member.name}</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.95rem' }}>{member.role}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
