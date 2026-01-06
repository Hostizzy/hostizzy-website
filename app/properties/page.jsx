'use client';

import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import PropertyFilters from '../../components/PropertyFilters';
import { PropertyCardSkeleton } from '../../components/Skeleton';
import { Star, Heart, Search, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        searchQuery: '',
        location: 'All',
        propertyTypes: [],
        priceRange: { min: 0, max: 100000 },
        bedrooms: 'All',
        guests: 'All',
        amenities: [],
        sortBy: 'featured'
    });

    useEffect(() => {
        fetch('/api/properties')
            .then(res => res.json())
            .then(data => {
                setProperties(data);
                setLoading(false);
            })
            .catch(err => console.error("Failed to fetch properties", err));
    }, []);

    // Apply filters and sorting
    const getFilteredAndSortedProperties = () => {
        let filtered = [...properties];

        // Search query filter
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.title?.toLowerCase().includes(query) ||
                p.location?.toLowerCase().includes(query)
            );
        }

        // Location filter
        if (filters.location !== 'All') {
            filtered = filtered.filter(p => p.location?.includes(filters.location));
        }

        // Property type filter
        if (filters.propertyTypes.length > 0) {
            filtered = filtered.filter(p => filters.propertyTypes.includes(p.type));
        }

        // Price range filter
        if (filters.priceRange.min > 0 || filters.priceRange.max < 100000) {
            filtered = filtered.filter(p =>
                p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
            );
        }

        // Bedrooms filter
        if (filters.bedrooms !== 'All') {
            const minBedrooms = parseInt(filters.bedrooms);
            filtered = filtered.filter(p => p.bedrooms >= minBedrooms);
        }

        // Guests filter
        if (filters.guests !== 'All') {
            const minGuests = parseInt(filters.guests);
            filtered = filtered.filter(p => p.guests >= minGuests);
        }

        // Amenities filter
        if (filters.amenities.length > 0) {
            filtered = filtered.filter(p =>
                filters.amenities.every(amenity =>
                    p.amenities?.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
                )
            );
        }

        // Sorting
        switch (filters.sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'featured':
            default:
                // Keep original order or add featured logic
                break;
        }

        return filtered;
    };

    const filteredProperties = getFilteredAndSortedProperties();

    // Count active filters
    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.searchQuery) count++;
        if (filters.location !== 'All') count++;
        if (filters.propertyTypes.length > 0) count += filters.propertyTypes.length;
        if (filters.bedrooms !== 'All') count++;
        if (filters.guests !== 'All') count++;
        if (filters.amenities.length > 0) count += filters.amenities.length;
        return count;
    };

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

            <section className="section bg-secondary" style={{ padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '4rem 0 2rem' : '6rem 0 4rem' }}>
                <div className="container text-center">
                    <ScrollReveal>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                            Find Your Perfect <span className="text-primary">Getaway</span>
                        </h1>
                        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.15rem', color: '#64748b', lineHeight: 1.6 }}>
                            Browse our exclusive collection of professionally managed homes. Whether you seek the solitude of the Himalayas or the vibrancy of Goa,
                            every Hostizzy home guarantees premium amenities, 24/7 support, and verified quality.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Property Filters */}
            <PropertyFilters
                properties={properties}
                onFilterChange={setFilters}
                activeFiltersCount={getActiveFiltersCount()}
            />

            <section className="section" style={{ paddingTop: '2rem', background: 'white' }}>
                <div className="container">

                    {/* Results Count */}
                    {!loading && (
                        <div style={{ marginBottom: '2rem', color: '#64748b', fontSize: '0.95rem', fontWeight: 500 }}>
                            Showing {filteredProperties.length} of {properties.length} properties
                        </div>
                    )}

                    {loading ? (
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem 1.5rem' }}>
                            {[...Array(6)].map((_, i) => (
                                <PropertyCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem 1.5rem' }}>
                            {filteredProperties.length > 0 ? (
                                filteredProperties.map((property, index) => (
                                    <ScrollReveal key={property.id} delay={index * 0.05}>
                                        <Link href={`/properties/${property.slug || property.id}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
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
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No properties found matching your criteria.</h3>
                                    <p style={{ marginBottom: '1.5rem' }}>Try adjusting your filters to see more results.</p>
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
