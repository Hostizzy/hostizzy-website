import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import TheHostizzyDifference from '../components/TheHostizzyDifference';
import Services from '../components/Services';
import HomeBanners from '../components/HomeBanners';
import FloatingConcierge from '../components/FloatingConcierge';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import VideoSection from '../components/VideoSection';
import InstagramFeed from '../components/InstagramFeed';
const EarningsCalculator = React.lazy(() => import('../components/EarningsCalculator'));

const Home = () => {
    return (
        <>
            <SEO
                title="Hostizzy | Premier Airbnb & Vacation Rental Management India"
                description="Expert Airbnb Property Management & Vacation Rental services in India. We maximize revenue for villas in Goa, Uttarakhand & beyond. Your trusted OTA expert."
            />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Hostizzy",
                    "url": "https://hostizzy.com",
                    "logo": "https://hostizzy.com/logo.png",
                    "sameAs": [
                        "https://www.facebook.com/hostizzy",
                        "https://www.instagram.com/hostizzy_official",
                        "https://www.linkedin.com/company/hostizzy"
                    ],
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91-9876543210",
                        "contactType": "customer service"
                    }
                })}
            </script>

            <Hero />

            <VideoSection
                url="https://www.youtube.com/watch?v=Z7-NlFyVMz4"
                title="Experience Hostizzy"
                subtitle="See what makes our properties special."
                bgColor="#f8fafc"
            />

            {/* Why Choose Us - Scraped & Enhanced */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Why Choose Us</h2>
                        <p style={{ fontSize: '1.25rem', color: '#64748b' }}>Experience the Difference with Hostizzy</p>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                    {[
                        { title: "Exclusive Branding", desc: "Every property, a unique micro brand. We don't just list; we build an identity." },
                        { title: "Transparency & Security", desc: "Stay updated with real-time insights via our ResIQ Dashboard." },
                        { title: "Flexible Plans", desc: "Custom solutions for every property type - from DIY to full service." },
                        { title: "Optimized Listings", desc: "Maximize visibility and appeal with professional photography and SEO." },
                        { title: "Exceptional Hospitality", desc: "Seamless experiences for every guest, leading to 5-star reviews." },
                        { title: "Local Expertise", desc: "Specialized knowledge for luxury homes in key Indian markets." }
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="card card-feature">
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>{item.title}</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* What Hostizzy Offers */}
            <section className="section bg-secondary">
                <div className="container">
                    <ScrollReveal>
                        <h2 className="text-center mb-lg" style={{ fontSize: '2.5rem' }}>Comprehensive Vacation Rental Management</h2>
                    </ScrollReveal>
                    <div className="grid desktop-2-col" style={{ gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#334155', marginBottom: '2.5rem' }}>
                                As India's premier <strong>Airbnb Property Management</strong> company and <strong>OTA experts</strong>, we handle everything from listing optimization to guest concierge. We ensure your vacation rental stands out on platforms like Airbnb, Booking.com, and Agoda.
                            </p>
                            <div className="grid desktop-2-col" style={{ gap: '1.5rem' }}>
                                {[
                                    { t: "Booking Management", d: "Efficient handling." },
                                    { t: "Guest Communication", d: "Inquiry to checkout." },
                                    { t: "Property Maintenance", d: "Meticulous detail." },
                                    { t: "Performance Reporting", d: "Maximize returns." }
                                ].map((offer, i) => (
                                    <div key={i} className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--color-primary)' }}>
                                        <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>{offer.t}</strong>
                                        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{offer.d}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card glass shadow-premium" style={{ padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1, letterSpacing: '-2px' }}>₹10 Cr+</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.5rem' }}>Gross Revenue</div>
                            </div>
                            <div style={{ width: '100%', height: '1px', background: '#e2e8f0', margin: '2rem 0' }}></div>
                            <div className="grid desktop-2-col" style={{ gap: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1e293b' }}>25k+</div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Guests Hosted</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1e293b' }}>100+</div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Properties</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SaaS Innovations (Scraped) */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center mb-lg">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our SaaS Innovations & Investment</h2>
                        <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>Technology that powers modern hospitality.</p>
                    </div>
                </ScrollReveal>
                <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                    <ScrollReveal delay={0.1}>
                        <div className="card card-feature" style={{ background: '#f8fafc', border: 'none' }}>
                            <div>
                                <div className="badge badge-outline" style={{ marginBottom: '1rem' }}>Pre Production</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>ResIQ Dashboard</h3>
                                <ul style={{ paddingLeft: '1.2rem', color: '#64748b', lineHeight: 1.6 }}>
                                    <li>Real-time performance metrics</li>
                                    <li>Multi-channel payment management</li>
                                    <li>Role-based access control</li>
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="card card-feature" style={{ background: '#f8fafc', border: 'none' }}>
                            <div>
                                <div className="badge badge-outline" style={{ marginBottom: '1rem' }}>Pre Production</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>HostOS Platform</h3>
                                <ul style={{ paddingLeft: '1.2rem', color: '#64748b', lineHeight: 1.6 }}>
                                    <li>PMS for 14+ property types</li>
                                    <li>Guest portal with meal ordering</li>
                                    <li>Advanced KYC compliance</li>
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <div className="card card-feature bg-primary text-white" style={{ border: 'none', background: 'var(--color-primary)', color: 'white' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Invest in Hostizzy</h3>
                                <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                                    Join us in capturing India's high-growth alternative accommodation market with our tech-driven approach.
                                </p>
                            </div>
                            <a href="/invest" className="btn" style={{ background: 'white', color: 'var(--color-primary)', width: '100%' }}>View Opportunity</a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Services />

            <HomeBanners />

            <InstagramFeed />

            <FloatingConcierge />
        </>
    );
};

export default Home;
