import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import TheHostizzyDifference from '../components/TheHostizzyDifference';
import Services from '../components/Services';
import HomeBanners from '../components/HomeBanners';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import VideoSection from '../components/VideoSection';
import InstagramFeed from '../components/InstagramFeed';
import ChannelCarousel from '../components/ChannelCarousel';
import AuditWizard from '../components/AuditWizard';

const Home = () => {
    return (
        <>
            <SEO
                title="Premier Vacation Rental Management Company India | Airbnb Property Management"
                description="Expert Airbnb property management India. End-to-end vacation rental management services for villas in Goa, Uttarakhand & beyond. Professional hosting services with 4.8★ rating."
                keywords={[
                    'vacation rental management company',
                    'Airbnb property management India',
                    'villa management company India',
                    'short term rental management',
                    'professional hosting services India',
                    'vacation rental management India',
                    'Airbnb management services'
                ]}
                image="https://hostizzy.com/og-home.jpg"
            />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "Hostizzy",
                    "description": "Premier vacation rental management company in India specializing in Airbnb property management and professional hosting services",
                    "url": "https://hostizzy.com",
                    "logo": "https://hostizzy.com/images/logo.jpg",
                    "image": "https://hostizzy.com/og-home.jpg",
                    "priceRange": "₹₹₹",
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "IN"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.8",
                        "reviewCount": "150",
                        "bestRating": "5",
                        "worstRating": "1"
                    },
                    "sameAs": [
                        "https://www.facebook.com/hostizzy",
                        "https://www.instagram.com/hostizzy_official",
                        "https://www.linkedin.com/company/hostizzy"
                    ],
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91-95604-94001",
                        "contactType": "customer service",
                        "areaServed": "IN",
                        "availableLanguage": ["English", "Hindi"]
                    },
                    "serviceArea": {
                        "@type": "GeoCircle",
                        "geoMidpoint": {
                            "@type": "GeoCoordinates",
                            "latitude": "28.6139",
                            "longitude": "77.2090"
                        }
                    }
                })}
            </script>

            <Hero />

            {/* Credibility Stats - Moved Up */}
            <section className="bg-secondary" style={{ padding: '3rem 0' }}>
                <div className="container">
                    <div className="card glass shadow-premium" style={{ padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))' }}>
                        <div className="grid desktop-3-col" style={{ gap: '2rem', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>15CR</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginTop: '0.5rem' }}>GMV Generated</div>
                            </div>
                            <div className="border-left-desktop border-right-desktop" style={{ padding: '0 2rem' }}>
                                <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>30k+</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginTop: '0.5rem' }}>Guests Hosted</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>4.8 ★</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginTop: '0.5rem' }}>Across All Platforms</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                            <div>
                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>45+</span>
                                <span style={{ marginLeft: '0.5rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>Managed Properties</span>
                            </div>
                            <div>
                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>20+</span>
                                <span style={{ marginLeft: '0.5rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>Active Markets</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
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

            <TheHostizzyDifference />

            <Services />

            <HowItWorks />

            <VideoSection
                url="https://www.youtube.com/watch?v=Z7-NlFyVMz4"
                title="Experience Hostizzy"
                subtitle="See what makes our properties special."
                bgColor="#f8fafc"
            />

            {/* What We're Building - Trust & Transparency Section */}
            <section className="section container">
                <ScrollReveal>
                    <div className="text-center mb-lg">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>How We Help You Succeed</h2>
                        <p style={{ color: '#64748b', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                            End-to-end support across technology, operations, and marketing to maximize your property's potential.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid desktop-3-col" style={{ gap: '2rem', marginBottom: '3rem' }}>

                    {/* Technology & Tools */}
                    <ScrollReveal delay={0.1}>
                        <div className="card" style={{ padding: '2.5rem', background: 'white', border: '1px solid #e2e8f0', height: '100%' }}>
                            <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Technology & Tools</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                Custom dashboards, analytics, and automation tools to streamline your operations.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#334155', fontSize: '0.95rem' }}>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>ResIQ revenue analytics dashboard</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>HostOS property management system</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>Multi-channel booking synchronization</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>Automated pricing optimization</span>
                                </li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* Hospitality & Operations */}
                    <ScrollReveal delay={0.2}>
                        <div className="card" style={{ padding: '2.5rem', background: 'white', border: '1px solid #e2e8f0', height: '100%' }}>
                            <div style={{ width: '48px', height: '48px', background: '#fef3c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Hospitality & Operations</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                Professional property management ensuring 5-star guest experiences every time.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#334155', fontSize: '0.95rem' }}>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>24/7 guest communication & support</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>Professional housekeeping coordination</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>Maintenance & vendor management</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>Quality control & inspections</span>
                                </li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* Marketing & Digital Presence */}
                    <ScrollReveal delay={0.3}>
                        <div className="card" style={{ padding: '2.5rem', background: 'white', border: '1px solid #e2e8f0', height: '100%' }}>
                            <div style={{ width: '48px', height: '48px', background: '#fce7f3', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Marketing & Digital</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                Professional content creation and strategic marketing to maximize bookings.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#334155', fontSize: '0.95rem' }}>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>Professional photography & videography</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>Social media management & content</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>Custom property websites & branding</span>
                                </li>
                                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
                                    <span>SEO-optimized listing descriptions</span>
                                </li>
                            </ul>
                        </div>
                    </ScrollReveal>

                </div>

                {/* Results Card */}
                <ScrollReveal delay={0.4}>
                    <div className="card" style={{ padding: '3rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', border: 'none' }}>
                        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
                            <div className="badge" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#86efac', border: 'none', marginBottom: '1rem' }}>Proven Results</div>
                            <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.75rem', color: 'white' }}>Real Impact Across India</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
                                Our comprehensive approach delivers measurable results for property owners
                            </p>
                        </div>

                        <div className="grid desktop-4-col" style={{ gap: '2rem' }}>
                            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#86efac', marginBottom: '0.5rem' }}>45+</div>
                                <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>Properties Managed</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#86efac', marginBottom: '0.5rem' }}>30k+</div>
                                <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>Guests Hosted</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#86efac', marginBottom: '0.5rem' }}>15CR</div>
                                <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>GMV Generated</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#86efac', marginBottom: '0.5rem' }}>4.8★</div>
                                <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>Average Rating</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                            <a href="/contact" className="btn" style={{ background: 'white', color: '#0f172a', padding: '1rem 2.5rem', fontWeight: 800, marginRight: '1rem' }}>
                                Get Started
                            </a>
                            <a href="/invest" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontWeight: 800, borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                                Invest in Growth
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Home Page Audit Wizard Section */}
            <section className="section bg-secondary" style={{ padding: '6rem 0' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="text-center mb-lg">
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>See Your Earning Potential</h2>
                            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Our AI benchmarks your property against 10,000+ data points instantly.</p>
                        </div>
                    </ScrollReveal>
                    <AuditWizard />
                </div>
            </section>

            {/* Instagram Section removed per user request */}

            <ChannelCarousel />

            <HomeBanners />
        </>
    );
};

export default Home;
