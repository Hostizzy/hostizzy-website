
import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { Star, Heart, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterLocation, setFilterLocation] = useState('All');

    useEffect(() => {
        fetch('/api/properties')
            .then(res => res.json())
            .then(data => {
                setProperties(data);
                setLoading(false);
            })
            .catch(err => console.error("Failed to fetch properties", err));
    }, []);

    // Unique Categories & Locations for filters
    const categories = ['All', ...new Set(properties.map(p => p.type))];


    const filteredProperties = properties.filter(p => {
        const matchCat = filterCategory === 'All' || p.type === filterCategory;
        const matchLoc = filterLocation === 'All' || p.location.includes(filterLocation);
        return matchCat && matchLoc;
    });

    return (
        <>
            <SEO
                title="Managed Properties | Hostizzy Vacation Rentals India"
                description="Browse our portfolio of professionally managed vacation rentals across India. Villa management, homestay management, and short-term rental properties."
                keywords={[
                    'vacation rental properties India',
                    'villa management company',
                    'homestay management services India',
                    'short term rental properties'
                ]}
                image="https://hostizzy.com/og-properties.jpg"
            />

            <section className="section bg-secondary" style={{ padding: '6rem 0 4rem' }}>
                <div className="container text-center">
                    <ScrollReveal>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                            Find Your Perfect <span className="text-primary">Getaway</span>
                        </h1>
                        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.15rem', color: '#64748b', lineHeight: 1.6 }}>
                            Browse our exclusive collection of professionally managed homes. Whether you seek the solitude of the Himalayas or the vibrancy of Goa,
                            every Hostizzy home guarantees premium amenities, 24/7 support, and verified quality.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Filter Bar (Sticky) */}
            <div style={{ position: 'sticky', top: 'var(--header-height)', zIndex: 40, background: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0', marginTop: 'var(--header-height)' }}>
                <div className="container" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
                    {/* Category "Chips" */}
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                padding: '0.5rem 0',
                                marginRight: '1.5rem',
                                color: filterCategory === cat ? 'var(--color-foreground)' : '#64748b',
                                fontWeight: filterCategory === cat ? 700 : 500,
                                borderBottom: filterCategory === cat ? '2px solid var(--color-foreground)' : '2px solid transparent',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                fontSize: '0.95rem'
                            }}
                        >
                            {cat === 'All' ? 'All Homes' : cat}
                        </button>
                    ))}
                </div>
            </div>

            <section className="section" style={{ paddingTop: '2rem', background: 'white' }}>
                <div className="container">

                    {loading ? (
                        <div className="text-center" style={{ padding: '4rem', color: 'var(--color-muted)' }}>Loading stays...</div>
                    ) : (
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem 1.5rem' }}>
                            {filteredProperties.length > 0 ? (
                                filteredProperties.map((property, index) => (
                                    <ScrollReveal key={property.id} delay={index * 0.05}>
                                        <Link to={`/properties/${property.id}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
                                            {/* Image Carousel Mockup */}
                                            <div style={{ position: 'relative', aspectRatio: '1/0.95', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1rem', background: '#f1f5f9' }}>
                                                <motion.img
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ duration: 0.3 }}
                                                    src={property.image}
                                                    alt={property.title || "Property Image"}
                                                    loading="lazy"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                <button style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10 }}>
                                                    <Heart color="white" fill="rgba(0,0,0,0.5)" size={24} />
                                                </button>
                                                {property.reviews > 10 && (
                                                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'white', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 700, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                                        Guest Favorite
                                                    </div>
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, lineHeight: 1.4, maxWidth: '85%' }}>{property.location}, India</h3>
                                                <Star size={14} fill="var(--color-foreground)" />
                                                <span>{property.rating}</span>
                                            </div>
                                            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '2px 0' }}>{property.type} · {property.views || 'Mountain'} views</p>
                                            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '2px 0' }}>{property.dates || 'Available now'}</p>
                                            <div style={{ marginTop: '0.5rem', fontSize: '1rem', color: 'var(--color-foreground)' }}>
                                                <span style={{ fontWeight: 700 }}>₹{property.price.toLocaleString()}</span> <span style={{ fontWeight: 400 }}>night</span>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))
                            ) : (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--color-muted)' }}>
                                    <h3>No properties found matching your criteria.</h3>
                                    <button
                                        onClick={() => { setFilterCategory('All'); setFilterLocation('All'); }}
                                        style={{ marginTop: '1rem', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Properties;
