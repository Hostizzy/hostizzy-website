'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Edit, Trash2, X, Image as ImageIcon, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import ImageUpload from './ImageUpload';

/**
 * EnhancedDataManager - A comprehensive data management component
 *
 * Supports multiple field types:
 * - text, textarea, number, select, boolean
 * - array (for tags, amenities, etc.)
 * - object (for grouped data like amenities_grouped)
 * - image (single image URL with preview)
 * - gallery (array of image URLs)
 * - itinerary (special array of objects)
 */

const EnhancedDataManager = ({
    endpoint,
    title,
    schema = [],
    isSingleObject = false,
    displayFields = [] // Fields to show in table view
}) => {
    const [data, setData] = useState([]);
    const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});
    const [collapsedSections, setCollapsedSections] = useState({});

    // Fetch Data
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(endpoint, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await res.json();
            setData(isSingleObject ? [json] : (Array.isArray(json) ? json : []));
        } catch (err) {
            console.error('Fetch error:', err);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [endpoint, isSingleObject]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Initialize form data with default values based on schema
    const initializeFormData = (existingData = {}) => {
        const initialData = { ...existingData };
        schema.forEach(field => {
            if (initialData[field.key] === undefined) {
                switch (field.type) {
                    case 'array':
                    case 'gallery':
                        initialData[field.key] = [];
                        break;
                    case 'object':
                        initialData[field.key] = {};
                        break;
                    case 'boolean':
                        initialData[field.key] = false;
                        break;
                    case 'number':
                        initialData[field.key] = '';
                        break;
                    default:
                        initialData[field.key] = '';
                }
            }
        });
        return initialData;
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        schema.forEach(field => {
            if (field.required) {
                const value = formData[field.key];
                if (value === undefined || value === null || value === '' ||
                    (Array.isArray(value) && value.length === 0)) {
                    newErrors[field.key] = `${field.label} is required`;
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handlers
    const handleAdd = () => {
        setFormData(initializeFormData());
        setErrors({});
        setView('add');
    };

    const handleEdit = (item) => {
        setFormData(initializeFormData(item));
        setErrors({});
        setView('edit');
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`Are you sure you want to delete this ${title.toLowerCase()}?`)) return;

        try {
            const token = localStorage.getItem('adminToken');
            await fetch(`${endpoint}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchData();
            alert(`${title} deleted successfully!`);
        } catch (err) {
            console.error('Delete error:', err);
            alert(`Failed to delete ${title.toLowerCase()}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Please fill in all required fields');
            return;
        }

        const method = isSingleObject ? 'PUT' : (view === 'add' ? 'POST' : 'PUT');
        const url = (isSingleObject || view === 'add') ? endpoint : `${endpoint}/${formData.id}`;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setView('list');
                fetchData();
                alert(`${title} ${view === 'add' ? 'added' : 'updated'} successfully!`);
            } else {
                throw new Error('Failed to save');
            }
        } catch (err) {
            console.error('Save error:', err);
            alert(`Failed to save ${title.toLowerCase()}`);
        }
    };

    const handleCancel = () => {
        setView('list');
        setFormData({});
        setErrors({});
    };

    // Field update handlers
    const updateField = (key, value) => {
        setFormData({ ...formData, [key]: value });
        if (errors[key]) {
            setErrors({ ...errors, [key]: null });
        }
    };

    const updateArrayField = (key, index, value) => {
        const arr = [...(formData[key] || [])];
        arr[index] = value;
        updateField(key, arr);
    };

    const addArrayItem = (key, defaultValue = '') => {
        updateField(key, [...(formData[key] || []), defaultValue]);
    };

    const removeArrayItem = (key, index) => {
        const arr = [...(formData[key] || [])];
        arr.splice(index, 1);
        updateField(key, arr);
    };

    const updateObjectField = (key, subKey, value) => {
        updateField(key, { ...(formData[key] || {}), [subKey]: value });
    };

    const addObjectKey = (key, subKey) => {
        if (!subKey.trim()) return;
        updateField(key, { ...(formData[key] || {}), [subKey]: [] });
    };

    const removeObjectKey = (key, subKey) => {
        const obj = { ...(formData[key] || {}) };
        delete obj[subKey];
        updateField(key, obj);
    };

    const toggleSection = (key) => {
        setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Filter data based on search
    const filteredData = data.filter(item => {
        if (!searchTerm) return true;
        return displayFields.some(field => {
            const value = item[field];
            return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    // Render different field types
    const renderField = (field) => {
        const { key, label, type, placeholder, required, options, group } = field;
        const value = formData[key];
        const error = errors[key];

        const fieldLabel = (
            <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: '#0f172a'
            }}>
                {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
            </label>
        );

        const errorMessage = error && (
            <div style={{ fontSize: '0.85rem', color: '#ef4444', marginTop: '0.25rem' }}>
                {error}
            </div>
        );

        const baseInputStyle = {
            width: '100%',
            padding: '0.75rem 1rem',
            border: error ? '1px solid #ef4444' : '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'border-color 0.2s'
        };

        switch (type) {
            case 'text':
            case 'email':
            case 'url':
                return (
                    <div key={key}>
                        {fieldLabel}
                        <input
                            type={type}
                            value={value || ''}
                            onChange={(e) => updateField(key, e.target.value)}
                            placeholder={placeholder}
                            style={baseInputStyle}
                        />
                        {errorMessage}
                    </div>
                );

            case 'number':
                return (
                    <div key={key}>
                        {fieldLabel}
                        <input
                            type="number"
                            value={value || ''}
                            onChange={(e) => updateField(key, e.target.value ? Number(e.target.value) : '')}
                            placeholder={placeholder}
                            step={field.step || 'any'}
                            min={field.min}
                            max={field.max}
                            style={baseInputStyle}
                        />
                        {errorMessage}
                    </div>
                );

            case 'textarea':
                return (
                    <div key={key}>
                        {fieldLabel}
                        <textarea
                            value={value || ''}
                            onChange={(e) => updateField(key, e.target.value)}
                            placeholder={placeholder}
                            rows={field.rows || 4}
                            style={{
                                ...baseInputStyle,
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                        />
                        {errorMessage}
                    </div>
                );

            case 'select':
                return (
                    <div key={key}>
                        {fieldLabel}
                        <select
                            value={value || ''}
                            onChange={(e) => updateField(key, e.target.value)}
                            style={baseInputStyle}
                        >
                            <option value="">Select {label}</option>
                            {options.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        {errorMessage}
                    </div>
                );

            case 'boolean':
                return (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                            type="checkbox"
                            checked={value || false}
                            onChange={(e) => updateField(key, e.target.checked)}
                            style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                        />
                        <label style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>
                            {label}
                        </label>
                    </div>
                );

            case 'image':
                return (
                    <div key={key}>
                        <ImageUpload
                            value={value || ''}
                            onChange={(url) => updateField(key, url)}
                            label={`${label} ${required ? '*' : ''}`}
                            folder={`hostizzy/${endpoint.split('/').pop()}`}
                            multiple={false}
                        />
                        {errorMessage}
                    </div>
                );

            case 'gallery':
                return (
                    <div key={key}>
                        <ImageUpload
                            value={value || []}
                            onChange={(urls) => updateField(key, urls)}
                            label={`${label} ${required ? '*' : ''}`}
                            folder={`hostizzy/${endpoint.split('/').pop()}`}
                            multiple={true}
                            maxFiles={10}
                        />
                        {errorMessage}
                    </div>
                );

            case 'array':
                return (
                    <div key={key}>
                        {fieldLabel}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {(value || []).map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateArrayField(key, idx, e.target.value)}
                                        placeholder={`${label} ${idx + 1}`}
                                        style={{ ...baseInputStyle, marginBottom: 0 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem(key, idx)}
                                        style={{
                                            padding: '0.75rem',
                                            background: '#fee2e2',
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            color: '#ef4444',
                                            cursor: 'pointer',
                                            flexShrink: 0
                                        }}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem(key, '')}
                                style={{
                                    padding: '0.75rem',
                                    background: '#f1f5f9',
                                    border: '1px dashed #94a3b8',
                                    borderRadius: '0.5rem',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 600
                                }}
                            >
                                + Add Item
                            </button>
                        </div>
                        {errorMessage}
                    </div>
                );

            case 'object':
                const objValue = value || {};
                const isCollapsed = collapsedSections[key];
                return (
                    <div key={key} style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        background: '#f8fafc'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: isCollapsed ? 0 : '1rem',
                            cursor: 'pointer'
                        }} onClick={() => toggleSection(key)}>
                            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a' }}>
                                {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
                            </div>
                            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                        </div>

                        {!isCollapsed && (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {Object.keys(objValue).map(subKey => (
                                        <div key={subKey} style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#475569' }}>
                                                    {subKey}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeObjectKey(key, subKey)}
                                                    style={{
                                                        padding: '0.4rem',
                                                        background: '#fee2e2',
                                                        border: 'none',
                                                        borderRadius: '0.375rem',
                                                        color: '#ef4444',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {(objValue[subKey] || []).map((item, idx) => (
                                                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const arr = [...(objValue[subKey] || [])];
                                                                arr[idx] = e.target.value;
                                                                updateObjectField(key, subKey, arr);
                                                            }}
                                                            placeholder={`Item ${idx + 1}`}
                                                            style={{
                                                                flex: 1,
                                                                padding: '0.5rem 0.75rem',
                                                                border: '1px solid #e2e8f0',
                                                                borderRadius: '0.375rem',
                                                                fontSize: '0.9rem'
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const arr = [...(objValue[subKey] || [])];
                                                                arr.splice(idx, 1);
                                                                updateObjectField(key, subKey, arr);
                                                            }}
                                                            style={{
                                                                padding: '0.5rem',
                                                                background: '#fee2e2',
                                                                border: 'none',
                                                                borderRadius: '0.375rem',
                                                                color: '#ef4444',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        updateObjectField(key, subKey, [...(objValue[subKey] || []), '']);
                                                    }}
                                                    style={{
                                                        padding: '0.5rem',
                                                        background: 'white',
                                                        border: '1px dashed #cbd5e1',
                                                        borderRadius: '0.375rem',
                                                        color: '#64748b',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    + Add Item
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="New category name"
                                        id={`new-key-${key}`}
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.9rem'
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const input = e.target;
                                                addObjectKey(key, input.value);
                                                input.value = '';
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const input = document.getElementById(`new-key-${key}`);
                                            addObjectKey(key, input.value);
                                            input.value = '';
                                        }}
                                        style={{
                                            padding: '0.75rem 1rem',
                                            background: '#FE5858',
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            color: 'white',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        Add Category
                                    </button>
                                </div>
                            </>
                        )}
                        {errorMessage}
                    </div>
                );

            case 'itinerary':
                return (
                    <div key={key} style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        background: '#f8fafc'
                    }}>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a', marginBottom: '1rem' }}>
                            {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {(value || []).map((item, idx) => (
                                <div key={idx} style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <span style={{ fontWeight: 600, color: '#FE5858' }}>Day {item.day || idx + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem(key, idx)}
                                            style={{
                                                padding: '0.4rem',
                                                background: '#fee2e2',
                                                border: 'none',
                                                borderRadius: '0.375rem',
                                                color: '#ef4444',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <input
                                            type="number"
                                            value={item.day || idx + 1}
                                            onChange={(e) => updateArrayField(key, idx, { ...item, day: Number(e.target.value) })}
                                            placeholder="Day number"
                                            style={{
                                                padding: '0.5rem 0.75rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.9rem'
                                            }}
                                        />
                                        <input
                                            type="text"
                                            value={item.title || ''}
                                            onChange={(e) => updateArrayField(key, idx, { ...item, title: e.target.value })}
                                            placeholder="Day title"
                                            style={{
                                                padding: '0.5rem 0.75rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.9rem'
                                            }}
                                        />
                                        <textarea
                                            value={item.desc || ''}
                                            onChange={(e) => updateArrayField(key, idx, { ...item, desc: e.target.value })}
                                            placeholder="Day description"
                                            rows={3}
                                            style={{
                                                padding: '0.5rem 0.75rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.9rem',
                                                fontFamily: 'inherit',
                                                resize: 'vertical'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem(key, { day: (value?.length || 0) + 1, title: '', desc: '' })}
                                style={{
                                    padding: '0.75rem',
                                    background: '#f1f5f9',
                                    border: '1px dashed #94a3b8',
                                    borderRadius: '0.5rem',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 600
                                }}
                            >
                                + Add Day
                            </button>
                        </div>
                        {errorMessage}
                    </div>
                );

            case 'coordinates':
                return (
                    <div key={key}>
                        {fieldLabel}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: '#64748b' }}>
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={value?.lat || ''}
                                    onChange={(e) => updateField(key, { ...(value || {}), lat: Number(e.target.value) })}
                                    placeholder="31.123"
                                    style={baseInputStyle}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: '#64748b' }}>
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    value={value?.lng || ''}
                                    onChange={(e) => updateField(key, { ...(value || {}), lng: Number(e.target.value) })}
                                    placeholder="77.234"
                                    style={baseInputStyle}
                                />
                            </div>
                        </div>
                        {errorMessage}
                    </div>
                );

            default:
                return null;
        }
    };

    // Group fields by their group property
    const groupedFields = schema.reduce((acc, field) => {
        const groupName = field.group || 'Basic Information';
        if (!acc[groupName]) acc[groupName] = [];
        acc[groupName].push(field);
        return acc;
    }, {});

    if (loading && view === 'list' && data.length === 0) {
        return (
            <div style={{
                padding: '3rem',
                textAlign: 'center',
                color: '#94a3b8',
                background: 'white',
                borderRadius: '0.75rem'
            }}>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>Loading {title}s...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Toolbar */}
            {view === 'list' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '300px', maxWidth: '400px' }}>
                        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            placeholder={`Search ${title}s...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 3.25rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #e2e8f0',
                                outline: 'none',
                                fontSize: '0.95rem'
                            }}
                        />
                    </div>
                    {!isSingleObject && (
                        <button
                            className="btn btn-primary"
                            onClick={handleAdd}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Plus size={20} /> Add {title}
                        </button>
                    )}
                </div>
            )}

            {/* List View */}
            {view === 'list' && (
                <div className="card" style={{ padding: '2rem', background: 'white', overflowX: 'auto' }}>
                    {filteredData.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                            {searchTerm ? `No ${title}s found matching "${searchTerm}"` : `No ${title}s found. Click "Add ${title}" to create one.`}
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                    {displayFields.map((field, i) => (
                                        <th key={i} style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontWeight: 700,
                                            color: '#0f172a',
                                            textTransform: 'capitalize',
                                            fontSize: '0.9rem'
                                        }}>
                                            {field.replace(/([A-Z])/g, ' $1').trim()}
                                        </th>
                                    ))}
                                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, i) => (
                                    <tr key={item.id || i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        {displayFields.map((field, j) => {
                                            let displayValue = item[field];
                                            if (Array.isArray(displayValue)) {
                                                displayValue = displayValue.length + ' items';
                                            } else if (typeof displayValue === 'object' && displayValue !== null) {
                                                displayValue = 'Object';
                                            } else if (typeof displayValue === 'boolean') {
                                                displayValue = displayValue ? 'Yes' : 'No';
                                            }
                                            return (
                                                <td key={j} style={{
                                                    padding: '1rem',
                                                    maxWidth: '250px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    color: j === 0 ? '#0f172a' : '#64748b',
                                                    fontSize: '0.95rem',
                                                    fontWeight: j === 0 ? 600 : 400
                                                }}>
                                                    {displayValue || '-'}
                                                </td>
                                            );
                                        })}
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        background: '#eff6ff',
                                                        border: 'none',
                                                        borderRadius: '0.5rem',
                                                        color: '#3b82f6',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                {!isSingleObject && (
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        style={{
                                                            padding: '0.5rem',
                                                            background: '#fee2e2',
                                                            border: 'none',
                                                            borderRadius: '0.5rem',
                                                            color: '#ef4444',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s'
                                                        }}
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Form View (Add/Edit) */}
            {(view === 'add' || view === 'edit') && (
                <div className="card" style={{ padding: '2rem', background: 'white' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#0f172a' }}>
                        {view === 'add' ? `Add New ${title}` : `Edit ${title}`}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {Object.entries(groupedFields).map(([groupName, fields]) => (
                                <div key={groupName}>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        marginBottom: '1.25rem',
                                        color: '#475569',
                                        paddingBottom: '0.5rem',
                                        borderBottom: '2px solid #e2e8f0'
                                    }}>
                                        {groupName}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {fields.map(field => renderField(field))}
                                    </div>
                                </div>
                            ))}

                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginTop: '1rem',
                                paddingTop: '2rem',
                                borderTop: '1px solid #e2e8f0'
                            }}>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ minWidth: '150px' }}
                                >
                                    {view === 'add' ? 'Add' : 'Update'} {title}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="btn btn-outline"
                                    style={{ minWidth: '150px' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EnhancedDataManager;
