import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import VideoSection from '../components/VideoSection';

const About = () => {
    return (
        <>
            <SEO
                title="About Hostizzy | India's Premier Vacation Rental Management Company"
                description="Founded by ex-Airbnb experts, Hostizzy specializes in vacation rental management India, property management for second homes, and professional hosting services since 2019."
                keywords={[
                    'vacation rental management India',
                    'property management for second homes',
                    'professional hosting services',
                    'Airbnb alternative hosting',
                    'vacation rental compliance India'
                ]}
                image="https://hostizzy.com/og-about.jpg"
            />

            {/* Hero Section */}
            <section className="section bg-primary text-white text-center" style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, #E54F4F 100%)',
                padding: '8rem 0 6rem'
            }}>
                <div className="container">
                    <ScrollReveal>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontWeight: 800 }}>India's Trusted Vacation Rental<br />Management Experts</h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', fontStyle: 'italic', fontWeight: 500 }}>
                            "Elevating properties into profitable brands. We are the Airbnb management experts you've been looking for."
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Our Story */}
            <section className="section container">
                <ScrollReveal>
                    <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '5rem' }}>
                        <div>
                            <div className="badge mb-sm" style={{ backgroundColor: 'rgba(254, 88, 88, 0.1)', color: 'var(--color-primary)' }}>Our Vision</div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Hostizzy Story</h2>
                            <p style={{ marginBottom: '1.5rem', lineHeight: 1.8, color: 'var(--color-muted)', fontSize: '1.1rem' }}>
                                When guests stay at a property we manage, they remember the breathtaking sunrise from that Mukteshwar villa, the warm hospitality of that Rajasthan haveli, or the serene mornings at that Goa beachfront home. They don’t remember us.
                            </p>
                            <p style={{ marginBottom: '1.5rem', lineHeight: 1.8, color: 'var(--color-muted)', fontSize: '1.1rem' }}>
                                <strong>Meet the Minds Behind Hostizzy</strong><br />
                                Ethan Barman and Ashutosh Karn, both ex-Airbnb professionals, founded Hostizzy in 2019 with a radical idea: What if property management wasn’t about building the management company’s brand, but about elevating each property’s unique identity?
                            </p>
                            <p style={{ lineHeight: 1.8, color: 'var(--color-muted)', fontSize: '1.1rem' }}>
                                Since our inception, we have been committed to elevating the standards of vacation rentals, making us the go-to choice for Airbnb hosts across India. Join the Hostizzy revolution today.
                            </p>
                        </div>
                        <div className="card shadow-premium" style={{
                            height: '500px',
                            background: 'url("https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800") center/cover',
                            borderRadius: '2rem',
                            border: '8px solid white'
                        }}></div>
                    </div>
                </ScrollReveal>
            </section>

            <VideoSection
                url="https://www.youtube.com/watch?v=Z7-NlFyVMz4"
                title="Our Vision"
                subtitle="Redefining Hospitality in India."
            />

            {/* What Makes Us Different */}
            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Hostizzy Advantage</h2>
                            <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem' }}>Why homeowners trust us with their most valuable assets.</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid desktop-2-col" style={{ gap: '2rem' }}>
                        {[
                            {
                                title: "Property-First Approach",
                                text: "Unlike many management companies, we do not co-brand properties. Each property retains its unique identity, giving more power back to the owners and highlighting the property's unique characteristics."
                            },
                            {
                                title: "Personalized Management",
                                text: "Whether it’s a rustic farmstay, a chic urban apartment, or a luxurious beachfront villa, our management approach adapts to the property’s individual identity."
                            },
                            {
                                title: "Curation and Hospitality",
                                text: "We design hospitality services that align with the expected ambiance. From gourmet food experiences in a farmhouse to bespoke adventure tours for a hillside retreat."
                            },
                            {
                                title: "Commitment to Excellence",
                                text: "Our team’s comprehensive understanding of the market allows us to provide not just service, but an experience that stands out in the crowded marketplace."
                            }
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="card" style={{ padding: '2.5rem', height: '100%', background: 'white' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{item.title}</h3>
                                    <p style={{ lineHeight: 1.7, color: 'var(--color-muted)' }}>{item.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Growth & Milestones Timeline */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center mb-lg">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Growth & Milestones</h2>
                        <p style={{ color: 'var(--color-muted)' }}>Our journey from a startup to India's leading management firm.</p>
                    </div>
                </ScrollReveal>
                <div style={{ maxWidth: '800px', margin: '0 auto', borderLeft: '3px solid var(--color-border)', paddingLeft: '4rem', position: 'relative' }}>
                    {[
                        { year: '2019', title: "Hostizzy® is Born", text: "Ethan and Ashutosh started managing 3 properties in Delhi NCR to deeply understand the market." },
                        { year: '2021', title: "Expansion", text: "Formally registered as Hostsphere India Pvt. Ltd. and expanded portfolio to 10 properties." },
                        { year: '2023', title: "Financial Success", text: "Expanded to Rajasthan, Uttarakhand, and Himachal. Reached a revenue milestone of ₹10 Crore GMV." },
                        { year: '2024', title: "Celebrating Success", text: "Managing over 100 properties (55 active + 45 pipeline in Goa). Hosted over 25,000 guests." }
                    ].map((m, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div style={{ marginBottom: '5rem', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute', left: '-5.1rem', top: '0.25rem',
                                    width: '2rem', height: '2rem', background: 'var(--color-primary)',
                                    borderRadius: '50%', border: '6px solid white', boxShadow: 'var(--shadow-md)'
                                }}></div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '2px' }}>{m.year}</span>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-foreground)' }}>{m.title}</h3>
                                    <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>{m.text}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="section bg-secondary">
                <div className="container text-center">
                    <ScrollReveal>
                        <h2 className="mb-lg" style={{ fontSize: '2.5rem' }}>Meet the Leadership</h2>
                    </ScrollReveal>
                    <div className="grid desktop-4-col" style={{ gap: '2rem' }}>
                        {[
                            { name: "Ethan Barman", role: "Founder", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
                            { name: "Ashutosh Karn", role: "Co-Founder", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
                            { name: "Vikas Kumar", role: "Operations", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
                            { name: "Rishi Tripathi", role: "Operations", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" }
                        ].map((member, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="card" style={{ padding: '2.5rem', textAlign: 'center', background: 'white' }}>
                                    <div style={{
                                        width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden',
                                        margin: '0 auto 1.5rem', border: '4px solid white', boxShadow: 'var(--shadow-md)'
                                    }}>
                                        <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontWeight: 700 }}>{member.name}</h3>
                                    <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.role}</p>
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
