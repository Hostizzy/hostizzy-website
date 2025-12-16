import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const Career = () => {
    return (
        <>
            <SEO title="Careers at Hostizzy" description="Join our team and help shape the future of hospitality in India." />

            <section className="section bg-primary text-white text-center" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <ScrollReveal>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Join the Tribe</h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                            We are building a world-class hospitality brand. If you have the passion, we have the platform.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Current Openings */}
            <section className="section container">
                <ScrollReveal>
                    <h2 className="text-center" style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Current Openings</h2>
                </ScrollReveal>

                <div className="grid" style={{ gap: '2rem' }}>
                    {[
                        {
                            role: "Content Creator / Social Media Manager",
                            loc: "Hybrid (Gurgaon/Remote)",
                            exp: "2+ years",
                            desc: "Plan content, capture reels, write copy, and engage with the community."
                        },
                        {
                            role: "SEO Strategist (Organic Growth Lead)",
                            loc: "Hybrid (Gurgaon/Remote)",
                            exp: "2+ years",
                            desc: "Develop full-funnel SEO strategy, technical audits, and link building."
                        },
                        {
                            role: "WordPress Developer",
                            loc: "Hybrid (Gurgaon/Remote)",
                            exp: "2+ years",
                            desc: "Build and maintain marketplace, plugin integrations, and performance."
                        },
                        {
                            role: "Performance Marketer (Google Ads)",
                            loc: "Hybrid (Gurgaon/Remote)",
                            exp: "2+ years",
                            desc: "Plan and launch Google Ads campaigns, analyze ROAS and conversions."
                        },
                        {
                            role: "Full Stack Developer",
                            loc: "Remote / Gurgaon",
                            exp: "2-5 years",
                            desc: "Architect website, APIs, booking flows, and scalable systems."
                        }
                    ].map((job, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="card glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>{job.role}</h3>
                                    <span className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Apply Now</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
                                    <span>{job.loc}</span>
                                    <span>{job.exp}</span>
                                </div>
                                <p style={{ marginTop: '1rem', color: 'var(--color-muted)' }}>{job.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Perks */}
            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <h2 className="text-center" style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Perks & Little Extras</h2>
                    </ScrollReveal>
                    <div className="grid desktop-2-col" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: "Flexible Work", text: "No rigid dress code, no clock-watching—just results and freedom." },
                            { title: "Zero Bureaucracy", text: "You’ll never have to 'schedule a meeting to schedule a meeting.'" },
                            { title: "Coffee & Chai Fuel", text: "Unlimited caffeine and lots of snack breaks." },
                            { title: "Epic Offsites", text: "Team outings, property stays, and workations in the hills." },
                            { title: "Learning Budget", text: "Courses, books, workshops—whatever fuels your curiosity." },
                            { title: "Bring Your Own Title", text: "Make it fun, make it yours!" }
                        ].map((perk, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '10px', height: '10px', background: 'var(--color-primary)', borderRadius: '50%', marginTop: '8px', flexShrink: 0 }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{perk.title}</h4>
                                        <p style={{ color: 'var(--color-muted)' }}>{perk.text}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section container text-center">
                <ScrollReveal>
                    <h2 style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Our Values</h2>
                </ScrollReveal>
                <div className="grid desktop-4-col" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    {[
                        { title: "Work as one", text: "We lean on a decade of experience to compete with the best." },
                        { title: "Humble", text: "We work hard in silence and share success to educate others." },
                        { title: "Creative", text: "We see only opportunities, never impossibilities." },
                        { title: "Resilient", text: "After the hardest climb comes the best views." }
                    ].map((v, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="card glass" style={{ height: '100%', padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{v.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)' }}>{v.text}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Career;
