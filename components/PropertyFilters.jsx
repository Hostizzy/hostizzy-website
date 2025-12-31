'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const PropertyFilters = ({
    properties = [],
    onFilterChange,
    activeFiltersCount = 0
}) => {
    const [showMobileFilters, setShowMobileFilters] = useState(false);
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

    // Extract unique values from properties
    const uniqueLocations = ['All', ...new Set(properties.map(p => p.location).filter(Boolean))];
    const propertyTypeOptions = ['Villa', 'Apartment', 'Farmstay', 'Cottage', 'Resort'];
    const amenityOptions = ['Pool', 'WiFi', 'Pet-friendly', 'Kitchen', 'Parking', 'AC'];

    // Get price range from actual properties
    const prices = properties.map(p => p.price).filter(Boolean);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 100000;

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handlePropertyTypeToggle = (type) => {
        const newTypes = filters.propertyTypes.includes(type)
            ? filters.propertyTypes.filter(t => t !== type)
            : [...filters.propertyTypes, type];
        handleFilterChange('propertyTypes', newTypes);
    };

    const handleAmenityToggle = (amenity) => {
        const newAmenities = filters.amenities.includes(amenity)
            ? filters.amenities.filter(a => a !== amenity)
            : [...filters.amenities, amenity];
        handleFilterChange('amenities', newAmenities);
    };

    const handleClearFilters = () => {
        const resetFilters = {
            searchQuery: '',
            location: 'All',
            propertyTypes: [],
            priceRange: { min: minPrice, max: maxPrice },
            bedrooms: 'All',
            guests: 'All',
            amenities: [],
            sortBy: 'featured'
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    const isFiltersActive = () => {
        return filters.searchQuery !== '' ||
            filters.location !== 'All' ||
            filters.propertyTypes.length > 0 ||
            filters.bedrooms !== 'All' ||
            filters.guests !== 'All' ||
            filters.amenities.length > 0;
    };

    return (
        <>
            {/* Search and Filter Header */}
            <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 'var(--header-height)', zIndex: 30 }}>
                <div className="container" style={{ padding: '1.5rem var(--container-padding)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Search Bar */}
                        <div style={{ flex: '1 1 300px', position: 'relative' }}>
                            <Search
                                size={20}
                                style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#64748b'
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Search by title or location..."
                                value={filters.searchQuery}
                                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 3rem',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '50px',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            style={{
                                padding: '0.75rem 2.5rem 0.75rem 1rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '50px',
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                background: 'white',
                                appearance: 'none',
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%2364748b\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1rem center'
                            }}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rating</option>
                        </select>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="mobile-only"
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '50px',
                                background: isFiltersActive() ? 'var(--color-primary)' : 'white',
                                color: isFiltersActive() ? 'white' : 'var(--color-foreground)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.95rem',
                                fontWeight: 600
                            }}
                        >
                            <SlidersHorizontal size={18} />
                            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Filters */}
            <div className="desktop-only" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <div className="container" style={{ padding: '1.5rem var(--container-padding)' }}>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>

                        {/* Location */}
                        <div style={{ flex: '0 0 180px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                                Location
                            </label>
                            <select
                                value={filters.location}
                                onChange={(e) => handleFilterChange('location', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem 0.75rem',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    background: 'white'
                                }}
                            >
                                {uniqueLocations.map(loc => (
                                    <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
                                ))}
                            </select>
                        </div>

                        {/* Property Types */}
                        <div style={{ flex: '1 1 250px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                                Property Type
                            </label>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {propertyTypeOptions.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => handlePropertyTypeToggle(type)}
                                        style={{
                                            padding: '0.4rem 1rem',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '50px',
                                            background: filters.propertyTypes.includes(type) ? 'var(--color-primary)' : 'white',
                                            color: filters.propertyTypes.includes(type) ? 'white' : '#64748b',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            fontWeight: 500,
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bedrooms */}
                        <div style={{ flex: '0 0 120px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                                Bedrooms
                            </label>
                            <select
                                value={filters.bedrooms}
                                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem 0.75rem',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    background: 'white'
                                }}
                            >
                                <option value="All">Any</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                            </select>
                        </div>

                        {/* Guests */}
                        <div style={{ flex: '0 0 120px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                                Guests
                            </label>
                            <select
                                value={filters.guests}
                                onChange={(e) => handleFilterChange('guests', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem 0.75rem',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    background: 'white'
                                }}
                            >
                                <option value="All">Any</option>
                                <option value="2">2+</option>
                                <option value="4">4+</option>
                                <option value="6">6+</option>
                                <option value="8">8+</option>
                            </select>
                        </div>

                        {/* Clear Filters */}
                        {isFiltersActive() && (
                            <button
                                onClick={handleClearFilters}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: 'none',
                                    background: 'transparent',
                                    color: 'var(--color-primary)',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    textDecoration: 'underline',
                                    alignSelf: 'flex-end'
                                }}
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>

                    {/* Amenities */}
                    <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                            Amenities
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {amenityOptions.map(amenity => (
                                <button
                                    key={amenity}
                                    onClick={() => handleAmenityToggle(amenity)}
                                    style={{
                                        padding: '0.4rem 1rem',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '50px',
                                        background: filters.amenities.includes(amenity) ? 'var(--color-primary)' : 'white',
                                        color: filters.amenities.includes(amenity) ? 'white' : '#64748b',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {amenity}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filters Panel */}
            {showMobileFilters && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setShowMobileFilters(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 999
                        }}
                    />

                    {/* Panel */}
                    <div
                        className="mobile-only"
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'white',
                            borderTopLeftRadius: '1.5rem',
                            borderTopRightRadius: '1.5rem',
                            zIndex: 1000,
                            maxHeight: '80vh',
                            overflow: 'auto',
                            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1.5rem',
                            borderBottom: '1px solid #e2e8f0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'sticky',
                            top: 0,
                            background: 'white',
                            zIndex: 1
                        }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Filters</h3>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    padding: '0.5rem'
                                }}
                            >
                                <X size={24} color="#64748b" />
                            </button>
                        </div>

                        {/* Filter Content */}
                        <div style={{ padding: '1.5rem' }}>
                            {/* Location */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                                    Location
                                </label>
                                <select
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {uniqueLocations.map(loc => (
                                        <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Property Types */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                                    Property Type
                                </label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {propertyTypeOptions.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => handlePropertyTypeToggle(type)}
                                            style={{
                                                padding: '0.5rem 1.25rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '50px',
                                                background: filters.propertyTypes.includes(type) ? 'var(--color-primary)' : 'white',
                                                color: filters.propertyTypes.includes(type) ? 'white' : '#64748b',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bedrooms & Guests */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                                        Bedrooms
                                    </label>
                                    <select
                                        value={filters.bedrooms}
                                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        <option value="All">Any</option>
                                        <option value="1">1+</option>
                                        <option value="2">2+</option>
                                        <option value="3">3+</option>
                                        <option value="4">4+</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                                        Guests
                                    </label>
                                    <select
                                        value={filters.guests}
                                        onChange={(e) => handleFilterChange('guests', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        <option value="All">Any</option>
                                        <option value="2">2+</option>
                                        <option value="4">4+</option>
                                        <option value="6">6+</option>
                                        <option value="8">8+</option>
                                    </select>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                                    Amenities
                                </label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {amenityOptions.map(amenity => (
                                        <button
                                            key={amenity}
                                            onClick={() => handleAmenityToggle(amenity)}
                                            style={{
                                                padding: '0.5rem 1.25rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '50px',
                                                background: filters.amenities.includes(amenity) ? 'var(--color-primary)' : 'white',
                                                color: filters.amenities.includes(amenity) ? 'white' : '#64748b',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {amenity}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div style={{
                            padding: '1.5rem',
                            borderTop: '1px solid #e2e8f0',
                            display: 'flex',
                            gap: '1rem',
                            position: 'sticky',
                            bottom: 0,
                            background: 'white'
                        }}>
                            <button
                                onClick={handleClearFilters}
                                style={{
                                    flex: 1,
                                    padding: '0.875rem',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '50px',
                                    background: 'white',
                                    color: 'var(--color-foreground)',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    fontWeight: 600
                                }}
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="btn btn-primary"
                                style={{
                                    flex: 2,
                                    padding: '0.875rem'
                                }}
                            >
                                Show Results
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default PropertyFilters;
