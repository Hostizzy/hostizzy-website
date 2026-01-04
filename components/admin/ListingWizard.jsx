'use client';

import React, { useState } from 'react';
import {
    Check, ChevronLeft, ChevronRight, Home, Users, Camera, Sparkles,
    FileText, Shield, DollarSign, Eye, Save, MapPin, Bed, Bath
} from 'lucide-react';
import ImageUpload from './ImageUpload';

/**
 * Airbnb-Style Listing Wizard
 *
 * Beautiful multi-step wizard for creating properties and experiences
 * Features:
 * - 8-step guided flow with visual progress
 * - Save as draft functionality
 * - Smooth transitions and animations
 * - Validation at each step
 * - Preview before publishing
 */

const STEPS = [
    {
        id: 'basics',
        title: 'Basics',
        description: 'Tell us about your property',
        icon: <Home size={20} />
    },
    {
        id: 'location',
        title: 'Location',
        description: 'Where is it located?',
        icon: <MapPin size={20} />
    },
    {
        id: 'capacity',
        title: 'Capacity',
        description: 'Bedrooms, bathrooms & guests',
        icon: <Users size={20} />
    },
    {
        id: 'photos',
        title: 'Photos',
        description: 'Show off your space',
        icon: <Camera size={20} />
    },
    {
        id: 'amenities',
        title: 'Amenities',
        description: 'What do you offer?',
        icon: <Sparkles size={20} />
    },
    {
        id: 'description',
        title: 'Description',
        description: 'Describe your property',
        icon: <FileText size={20} />
    },
    {
        id: 'rules',
        title: 'Rules',
        description: 'House rules & policies',
        icon: <Shield size={20} />
    },
    {
        id: 'pricing',
        title: 'Pricing',
        description: 'Set your nightly rate',
        icon: <DollarSign size={20} />
    }
];

const PROPERTY_TYPES = [
    { value: 'Villa', label: 'Villa', emoji: '🏰' },
    { value: 'Apartment', label: 'Apartment', emoji: '🏢' },
    { value: 'Farmstay', label: 'Farmstay', emoji: '🌾' },
    { value: 'Cottage', label: 'Cottage', emoji: '🏡' },
    { value: 'Resort', label: 'Resort', emoji: '🏖️' }
];

const COMMON_AMENITIES = [
    { category: 'Essentials', items: ['WiFi', 'Air Conditioning', 'Heating', 'Kitchen', 'Washer', 'Dryer'] },
    { category: 'Features', items: ['Pool', 'Hot Tub', 'Gym', 'Garden', 'Balcony', 'Terrace'] },
    { category: 'Entertainment', items: ['TV', 'Netflix', 'Board Games', 'BBQ Grill', 'Fire Pit', 'Outdoor Dining'] },
    { category: 'Safety', items: ['Smoke Detector', 'Carbon Monoxide Detector', 'First Aid Kit', 'Fire Extinguisher'] }
];

const ListingWizard = ({ onClose, onSubmit, initialData = {}, mode = 'property' }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        // Basics
        title: '',
        type: '',

        // Location
        location: '',
        address: '',
        coordinates: { lat: '', lng: '' },

        // Capacity
        bedrooms: '',
        bathrooms: '',
        guests: '',

        // Photos
        image: '',
        gallery: [],

        // Amenities
        amenities_grouped: {},

        // Description
        description: '',
        highlights: [],

        // Rules
        house_rules: [],
        cancellation_policy: '',

        // Pricing
        price: '',

        ...initialData
    });

    const [errors, setErrors] = useState({});
    const [isDraft, setIsDraft] = useState(false);

    const updateField = (key, value) => {
        setFormData({ ...formData, [key]: value });
        if (errors[key]) {
            setErrors({ ...errors, [key]: null });
        }
    };

    const validateStep = (stepId) => {
        const newErrors = {};

        switch (stepId) {
            case 'basics':
                if (!formData.title) newErrors.title = 'Property title is required';
                if (!formData.type) newErrors.type = 'Property type is required';
                break;
            case 'location':
                if (!formData.location) newErrors.location = 'Location is required';
                break;
            case 'capacity':
                if (!formData.bedrooms || formData.bedrooms < 1) newErrors.bedrooms = 'At least 1 bedroom required';
                if (!formData.bathrooms || formData.bathrooms < 1) newErrors.bathrooms = 'At least 1 bathroom required';
                if (!formData.guests || formData.guests < 1) newErrors.guests = 'Minimum 1 guest required';
                break;
            case 'photos':
                if (!formData.image) newErrors.image = 'Main image is required';
                break;
            case 'description':
                if (!formData.description || formData.description.length < 50) {
                    newErrors.description = 'Description must be at least 50 characters';
                }
                break;
            case 'pricing':
                if (!formData.price || formData.price < 1) newErrors.price = 'Price is required';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(STEPS[currentStep].id)) {
            if (currentStep < STEPS.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSaveDraft = () => {
        setIsDraft(true);
        onSubmit({ ...formData, draft: true });
    };

    const handlePublish = () => {
        // Validate all required fields
        const allStepsValid = STEPS.every(step => validateStep(step.id));
        if (allStepsValid) {
            setIsDraft(false);
            onSubmit({ ...formData, draft: false });
        } else {
            alert('Please complete all required fields before publishing');
        }
    };

    const toggleAmenity = (category, item) => {
        const current = formData.amenities_grouped || {};
        const categoryItems = current[category] || [];

        const updated = categoryItems.includes(item)
            ? categoryItems.filter(i => i !== item)
            : [...categoryItems, item];

        updateField('amenities_grouped', {
            ...current,
            [category]: updated
        });
    };

    const addListItem = (key, value) => {
        if (!value.trim()) return;
        const current = formData[key] || [];
        updateField(key, [...current, value]);
    };

    const removeListItem = (key, index) => {
        const current = formData[key] || [];
        updateField(key, current.filter((_, i) => i !== index));
    };

    const renderStepContent = () => {
        const step = STEPS[currentStep];

        switch (step.id) {
            case 'basics':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>Property Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                placeholder="e.g., Luxury Villa in Manali"
                                style={inputStyle(errors.title)}
                            />
                            {errors.title && <div style={errorStyle}>{errors.title}</div>}
                        </div>

                        <div>
                            <label style={labelStyle}>Property Type *</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                {PROPERTY_TYPES.map(type => (
                                    <button
                                        key={type.value}
                                        type="button"
                                        onClick={() => updateField('type', type.value)}
                                        style={{
                                            padding: '1.5rem 1rem',
                                            border: formData.type === type.value ? '2px solid #FE5858' : '2px solid #e2e8f0',
                                            borderRadius: '0.75rem',
                                            background: formData.type === type.value ? '#FEF1F1' : 'white',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>{type.emoji}</span>
                                        <span style={{ fontWeight: 600, color: formData.type === type.value ? '#FE5858' : '#0f172a' }}>
                                            {type.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            {errors.type && <div style={errorStyle}>{errors.type}</div>}
                        </div>
                    </div>
                );

            case 'location':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>Location *</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => updateField('location', e.target.value)}
                                placeholder="e.g., Mashobra, Shimla"
                                style={inputStyle(errors.location)}
                            />
                            {errors.location && <div style={errorStyle}>{errors.location}</div>}
                        </div>

                        <div>
                            <label style={labelStyle}>Full Address (Optional)</label>
                            <textarea
                                value={formData.address || ''}
                                onChange={(e) => updateField('address', e.target.value)}
                                placeholder="Enter complete address..."
                                rows={3}
                                style={{ ...inputStyle(), resize: 'vertical', fontFamily: 'inherit' }}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Map Coordinates (Optional)</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <input
                                        type="number"
                                        step="any"
                                        value={formData.coordinates?.lat || ''}
                                        onChange={(e) => updateField('coordinates', { ...formData.coordinates, lat: parseFloat(e.target.value) || '' })}
                                        placeholder="Latitude (31.123)"
                                        style={inputStyle()}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        step="any"
                                        value={formData.coordinates?.lng || ''}
                                        onChange={(e) => updateField('coordinates', { ...formData.coordinates, lng: parseFloat(e.target.value) || '' })}
                                        placeholder="Longitude (77.234)"
                                        style={inputStyle()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'capacity':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                            <div>
                                <label style={labelStyle}>
                                    <Bed size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                    Bedrooms *
                                </label>
                                <input
                                    type="number"
                                    value={formData.bedrooms}
                                    onChange={(e) => updateField('bedrooms', parseInt(e.target.value) || '')}
                                    min="1"
                                    placeholder="3"
                                    style={inputStyle(errors.bedrooms)}
                                />
                                {errors.bedrooms && <div style={errorStyle}>{errors.bedrooms}</div>}
                            </div>

                            <div>
                                <label style={labelStyle}>
                                    <Bath size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                    Bathrooms *
                                </label>
                                <input
                                    type="number"
                                    value={formData.bathrooms}
                                    onChange={(e) => updateField('bathrooms', parseInt(e.target.value) || '')}
                                    min="1"
                                    placeholder="2"
                                    style={inputStyle(errors.bathrooms)}
                                />
                                {errors.bathrooms && <div style={errorStyle}>{errors.bathrooms}</div>}
                            </div>

                            <div>
                                <label style={labelStyle}>
                                    <Users size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                    Max Guests *
                                </label>
                                <input
                                    type="number"
                                    value={formData.guests}
                                    onChange={(e) => updateField('guests', parseInt(e.target.value) || '')}
                                    min="1"
                                    placeholder="6"
                                    style={inputStyle(errors.guests)}
                                />
                                {errors.guests && <div style={errorStyle}>{errors.guests}</div>}
                            </div>
                        </div>
                    </div>
                );

            case 'photos':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <ImageUpload
                            value={formData.image}
                            onChange={(url) => updateField('image', url)}
                            label="Main Property Image *"
                            folder="hostizzy/properties"
                            multiple={false}
                        />
                        {errors.image && <div style={errorStyle}>{errors.image}</div>}

                        <ImageUpload
                            value={formData.gallery || []}
                            onChange={(urls) => updateField('gallery', urls)}
                            label="Image Gallery (Optional)"
                            folder="hostizzy/properties"
                            multiple={true}
                            maxFiles={10}
                        />
                    </div>
                );

            case 'amenities':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {COMMON_AMENITIES.map(category => (
                            <div key={category.category}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#475569' }}>
                                    {category.category}
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                                    {category.items.map(item => {
                                        const isSelected = (formData.amenities_grouped?.[category.category] || []).includes(item);
                                        return (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => toggleAmenity(category.category, item)}
                                                style={{
                                                    padding: '0.75rem 1rem',
                                                    border: isSelected ? '2px solid #FE5858' : '2px solid #e2e8f0',
                                                    borderRadius: '0.5rem',
                                                    background: isSelected ? '#FEF1F1' : 'white',
                                                    color: isSelected ? '#FE5858' : '#64748b',
                                                    cursor: 'pointer',
                                                    fontWeight: isSelected ? 600 : 500,
                                                    fontSize: '0.9rem',
                                                    textAlign: 'left',
                                                    transition: 'all 0.2s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                {isSelected && <Check size={16} />}
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'description':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => updateField('description', e.target.value)}
                                placeholder="Describe your property in detail... (minimum 50 characters)"
                                rows={8}
                                style={{ ...inputStyle(errors.description), resize: 'vertical', fontFamily: 'inherit' }}
                            />
                            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                                {formData.description.length} / 50 characters minimum
                            </div>
                            {errors.description && <div style={errorStyle}>{errors.description}</div>}
                        </div>

                        <div>
                            <label style={labelStyle}>Highlights (Optional)</label>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Add a highlight..."
                                    id="highlight-input"
                                    style={inputStyle()}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addListItem('highlights', e.target.value);
                                            e.target.value = '';
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const input = document.getElementById('highlight-input');
                                        addListItem('highlights', input.value);
                                        input.value = '';
                                    }}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: '#FE5858',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {(formData.highlights || []).map((highlight, idx) => (
                                    <div key={idx} style={{
                                        padding: '0.75rem 1rem',
                                        background: '#f8fafc',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span>{highlight}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeListItem('highlights', idx)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#ef4444',
                                                cursor: 'pointer',
                                                padding: '0.25rem'
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'rules':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>House Rules (Optional)</label>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Add a house rule..."
                                    id="rule-input"
                                    style={inputStyle()}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addListItem('house_rules', e.target.value);
                                            e.target.value = '';
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const input = document.getElementById('rule-input');
                                        addListItem('house_rules', input.value);
                                        input.value = '';
                                    }}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: '#FE5858',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {(formData.house_rules || []).map((rule, idx) => (
                                    <div key={idx} style={{
                                        padding: '0.75rem 1rem',
                                        background: '#f8fafc',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span>{rule}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeListItem('house_rules', idx)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#ef4444',
                                                cursor: 'pointer',
                                                padding: '0.25rem'
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Cancellation Policy (Optional)</label>
                            <textarea
                                value={formData.cancellation_policy || ''}
                                onChange={(e) => updateField('cancellation_policy', e.target.value)}
                                placeholder="Describe your cancellation policy..."
                                rows={4}
                                style={{ ...inputStyle(), resize: 'vertical', fontFamily: 'inherit' }}
                            />
                        </div>
                    </div>
                );

            case 'pricing':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <label style={labelStyle}>Price per Night (₹) *</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => updateField('price', parseInt(e.target.value) || '')}
                                min="1"
                                placeholder="5000"
                                style={{ ...inputStyle(errors.price), fontSize: '1.5rem', fontWeight: 700 }}
                            />
                            {errors.price && <div style={errorStyle}>{errors.price}</div>}
                        </div>

                        <div style={{
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, #FEF1F1 0%, #FCE4E4 100%)',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(254, 88, 88, 0.2)'
                        }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>
                                Pricing Summary
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Your nightly rate</span>
                                    <span style={{ fontWeight: 700, color: '#0f172a' }}>₹{formData.price?.toLocaleString() || 0}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Platform fee (15%)</span>
                                    <span style={{ fontWeight: 600, color: '#ef4444' }}>- ₹{((formData.price || 0) * 0.15).toLocaleString()}</span>
                                </div>
                                <div style={{ borderTop: '2px solid rgba(254, 88, 88, 0.2)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>You earn per night</span>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FE5858' }}>
                                            ₹{((formData.price || 0) * 0.85).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.75rem',
        fontWeight: 600,
        fontSize: '0.95rem',
        color: '#0f172a'
    };

    const inputStyle = (hasError = false) => ({
        width: '100%',
        padding: '0.85rem 1.25rem',
        fontSize: '1rem',
        border: hasError ? '2px solid #ef4444' : '2px solid #e2e8f0',
        borderRadius: '0.75rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    });

    const errorStyle = {
        fontSize: '0.85rem',
        color: '#ef4444',
        marginTop: '0.5rem'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '2rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '1.5rem',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
            }}>
                {/* Header with Progress */}
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid #e2e8f0',
                    background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)'
                }}>
                    {/* Progress Bar */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}>
                            {STEPS.map((step, index) => (
                                <React.Fragment key={step.id}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: index === currentStep
                                                ? 'linear-gradient(135deg, #FE5858 0%, #ff7b7b 100%)'
                                                : index < currentStep
                                                    ? '#10b981'
                                                    : '#e2e8f0',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            transition: 'all 0.3s',
                                            boxShadow: index === currentStep ? '0 4px 12px rgba(254, 88, 88, 0.3)' : 'none'
                                        }}>
                                            {index < currentStep ? <Check size={20} /> : step.icon}
                                        </div>
                                        <div style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 600,
                                            marginTop: '0.5rem',
                                            color: index === currentStep ? '#FE5858' : '#94a3b8',
                                            textAlign: 'center',
                                            display: window.innerWidth > 768 ? 'block' : 'none'
                                        }}>
                                            {step.title}
                                        </div>
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <div style={{
                                            height: '2px',
                                            flex: 1,
                                            background: index < currentStep ? '#10b981' : '#e2e8f0',
                                            transition: 'background 0.3s',
                                            margin: '0 0.5rem'
                                        }} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Step Title */}
                    <div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
                            {STEPS[currentStep].title}
                        </h2>
                        <p style={{ fontSize: '1rem', color: '#64748b' }}>
                            {STEPS[currentStep].description}
                        </p>
                    </div>
                </div>

                {/* Step Content */}
                <div style={{
                    padding: '2rem',
                    flex: 1,
                    overflowY: 'auto'
                }}>
                    {renderStepContent()}
                </div>

                {/* Footer with Navigation */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderTop: '1px solid #e2e8f0',
                    background: '#fafafa',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <button
                        onClick={handleSaveDraft}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'white',
                            border: '2px solid #e2e8f0',
                            borderRadius: '0.5rem',
                            color: '#64748b',
                            cursor: 'pointer',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Save size={18} />
                        Save Draft
                    </button>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={currentStep === 0 ? onClose : handleBack}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'white',
                                border: '2px solid #e2e8f0',
                                borderRadius: '0.5rem',
                                color: '#64748b',
                                cursor: 'pointer',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <ChevronLeft size={18} />
                            {currentStep === 0 ? 'Cancel' : 'Back'}
                        </button>

                        {currentStep === STEPS.length - 1 ? (
                            <button
                                onClick={handlePublish}
                                style={{
                                    padding: '0.75rem 2rem',
                                    background: 'linear-gradient(135deg, #FE5858 0%, #ff7b7b 100%)',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 4px 12px rgba(254, 88, 88, 0.3)'
                                }}
                            >
                                <Eye size={18} />
                                Publish Listing
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                style={{
                                    padding: '0.75rem 2rem',
                                    background: 'linear-gradient(135deg, #FE5858 0%, #ff7b7b 100%)',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                Next
                                <ChevronRight size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingWizard;
