'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    BarChart3, Home, MapPin, FileText, MessageCircle, Settings, LogOut, Globe,
    Plus, Edit, Trash2, Save, Calendar, Mail, Users, TrendingUp, Star, DollarSign,
    Activity, ChevronRight, Package, Download, Search, Filter, X
} from 'lucide-react';
import SEO from '../../components/SEO';
import EnhancedDataManager from '../../components/admin/EnhancedDataManager';

// Field Schemas
const PROPERTY_SCHEMA = [
    // Basic Information
    { key: 'id', label: 'ID', type: 'number', required: false, group: 'Basic Information' },
    { key: 'title', label: 'Property Title', type: 'text', required: true, placeholder: 'Luxury Villa in Manali', group: 'Basic Information' },
    { key: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Mashobra, Shimla', group: 'Basic Information' },
    { key: 'type', label: 'Property Type', type: 'select', required: true, options: [
        { value: 'Villa', label: 'Villa' },
        { value: 'Apartment', label: 'Apartment' },
        { value: 'Farmstay', label: 'Farmstay' },
        { value: 'Cottage', label: 'Cottage' },
        { value: 'Resort', label: 'Resort' }
    ], group: 'Basic Information' },
    { key: 'description', label: 'Description', type: 'textarea', required: true, rows: 6, placeholder: 'Detailed property description...', group: 'Basic Information' },

    // Pricing & Capacity
    { key: 'price', label: 'Price per Night (₹)', type: 'number', required: true, placeholder: '5000', group: 'Pricing & Capacity' },
    { key: 'guests', label: 'Maximum Guests', type: 'number', required: true, placeholder: '6', group: 'Pricing & Capacity' },
    { key: 'bedrooms', label: 'Bedrooms', type: 'number', required: true, placeholder: '3', group: 'Pricing & Capacity' },
    { key: 'bathrooms', label: 'Bathrooms', type: 'number', required: true, placeholder: '2', group: 'Pricing & Capacity' },

    // Ratings & Status
    { key: 'rating', label: 'Rating', type: 'number', required: false, placeholder: '4.5', step: 0.1, min: 0, max: 5, group: 'Ratings & Status' },
    { key: 'reviews', label: 'Number of Reviews', type: 'number', required: false, placeholder: '124', group: 'Ratings & Status' },
    { key: 'superhost', label: 'Superhost Property', type: 'boolean', required: false, group: 'Ratings & Status' },

    // Images
    { key: 'image', label: 'Main Image URL', type: 'image', required: true, placeholder: 'https://example.com/image.jpg', group: 'Images' },
    { key: 'gallery', label: 'Image Gallery', type: 'gallery', required: false, group: 'Images' },

    // Amenities & Rules
    { key: 'amenities_grouped', label: 'Amenities (Grouped)', type: 'object', required: false, group: 'Amenities & Rules' },
    { key: 'house_rules', label: 'House Rules', type: 'array', required: false, group: 'Amenities & Rules' },

    // Additional Details
    { key: 'cancellation_policy', label: 'Cancellation Policy', type: 'textarea', required: false, rows: 3, group: 'Additional Details' },
    { key: 'map_coordinates', label: 'Map Coordinates', type: 'coordinates', required: false, group: 'Additional Details' }
];

const EXPERIENCE_SCHEMA = [
    // Basic Information
    { key: 'id', label: 'Experience ID', type: 'text', required: true, placeholder: 'manali-nye-2025', group: 'Basic Information' },
    { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Manali Mountain Escape', group: 'Basic Information' },
    { key: 'subtitle', label: 'Subtitle', type: 'text', required: false, placeholder: 'New Year Himalayan Bash', group: 'Basic Information' },
    { key: 'description', label: 'Description', type: 'textarea', required: true, rows: 6, group: 'Basic Information' },

    // Dates & Pricing
    { key: 'dates', label: 'Dates', type: 'text', required: true, placeholder: 'Dec 28 - Jan 02', group: 'Dates & Pricing' },
    { key: 'duration', label: 'Duration', type: 'text', required: true, placeholder: '6 Days', group: 'Dates & Pricing' },
    { key: 'price', label: 'Price (₹)', type: 'number', required: true, placeholder: '24999', group: 'Dates & Pricing' },

    // Location & Details
    { key: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Manali, Himachal Pradesh', group: 'Location & Details' },
    { key: 'meeting_point', label: 'Meeting Point', type: 'text', required: false, placeholder: 'Majnu Ka Tila, New Delhi', group: 'Location & Details' },

    // Ratings
    { key: 'rating', label: 'Rating', type: 'number', required: false, step: 0.1, min: 0, max: 5, group: 'Ratings' },
    { key: 'reviews', label: 'Number of Reviews', type: 'number', required: false, group: 'Ratings' },

    // Media
    { key: 'image', label: 'Main Image URL', type: 'image', required: true, group: 'Media' },

    // Tags & Categories
    { key: 'tags', label: 'Tags', type: 'array', required: false, group: 'Tags & Categories' },

    // Itinerary
    { key: 'itinerary', label: 'Day-by-Day Itinerary', type: 'itinerary', required: false, group: 'Itinerary' },

    // Inclusions & Exclusions
    { key: 'inclusions', label: 'Inclusions', type: 'array', required: false, group: 'Inclusions & Exclusions' },
    { key: 'exclusions', label: 'Exclusions', type: 'array', required: false, group: 'Inclusions & Exclusions' },

    // Additional Info
    { key: 'important_notes', label: 'Important Notes', type: 'array', required: false, group: 'Additional Info' },
    { key: 'highlights', label: 'Highlights', type: 'array', required: false, group: 'Additional Info' }
];

const BLOG_SCHEMA = [
    { key: 'id', label: 'Blog ID', type: 'number', required: false, group: 'Basic Information' },
    { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Your Blog Title', group: 'Basic Information' },
    { key: 'excerpt', label: 'Excerpt', type: 'textarea', required: true, rows: 3, placeholder: 'Short summary of the blog post', group: 'Basic Information' },
    { key: 'content', label: 'Content', type: 'textarea', required: true, rows: 10, placeholder: 'Full blog content...', group: 'Basic Information' },
    { key: 'date', label: 'Publication Date', type: 'text', required: true, placeholder: '2024-12-01', group: 'Meta Information' },
    { key: 'author', label: 'Author', type: 'text', required: false, placeholder: 'John Doe', group: 'Meta Information' },
    { key: 'image', label: 'Featured Image URL', type: 'image', required: true, group: 'Media' }
];

const TESTIMONIAL_SCHEMA = [
    { key: 'id', label: 'ID', type: 'number', required: false, group: 'Basic Information' },
    { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Customer Name', group: 'Basic Information' },
    { key: 'role', label: 'Role', type: 'select', required: true, options: [
        { value: 'Guest', label: 'Guest' },
        { value: 'Property Owner', label: 'Property Owner' },
        { value: 'Partner', label: 'Partner' }
    ], group: 'Basic Information' },
    { key: 'text', label: 'Testimonial Text', type: 'textarea', required: true, rows: 4, placeholder: 'Customer feedback...', group: 'Content' },
    { key: 'rating', label: 'Rating', type: 'number', required: true, min: 1, max: 5, placeholder: '5', group: 'Rating' }
];

const SETTINGS_SCHEMA = [
    { key: 'siteName', label: 'Site Name', type: 'text', required: true, group: 'General Settings' },
    { key: 'logoUrl', label: 'Logo URL', type: 'image', required: false, group: 'General Settings' },
    { key: 'supportEmail', label: 'Support Email', type: 'email', required: true, group: 'Contact Information' },
    { key: 'supportPhone', label: 'Support Phone', type: 'text', required: true, group: 'Contact Information' },
    { key: 'whatsappNumber', label: 'WhatsApp Number', type: 'text', required: false, group: 'Contact Information' },
    { key: 'footerTagline', label: 'Footer Tagline', type: 'textarea', required: false, rows: 2, group: 'Branding' },
    { key: 'instagramUrl', label: 'Instagram URL', type: 'url', required: false, group: 'Social Media' },
    { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'url', required: false, group: 'Social Media' }
];

export default function Admin() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [seoData, setSeoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingPath, setEditingPath] = useState(null);
    const [formData, setFormData] = useState({ path: '', title: '', description: '', keywords: '', image: '' });
    const [dashboardStats, setDashboardStats] = useState({
        properties: 0,
        experiences: 0,
        blogs: 0,
        testimonials: 0,
        bookings: 0
    });
    const [inquiriesData, setInquiriesData] = useState({
        contacts: [],
        bookings: [],
        calculatorLeads: [],
        loading: false
    });
    const [inquiriesTab, setInquiriesTab] = useState('contacts');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        if (activeTab === 'seo') {
            fetchSEOData();
        } else if (activeTab === 'dashboard') {
            fetchDashboardStats();
        } else if (activeTab === 'inquiries') {
            fetchInquiriesData();
        }
    }, [activeTab]);

    const fetchSEOData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/seo');
            const data = await res.json();
            // Convert object to array format for easier handling
            const seoArray = Array.isArray(data) ? data : [];
            setSeoData(seoArray);
        } catch (err) {
            console.error('Failed to fetch SEO data:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const headers = { 'Authorization': `Bearer ${token}` };

            const [properties, experiences, blogs, testimonials, bookings] = await Promise.all([
                fetch('/api/properties', { headers }).then(r => r.json()),
                fetch('/api/experiences', { headers }).then(r => r.json()),
                fetch('/api/blogs', { headers }).then(r => r.json()),
                fetch('/api/testimonials', { headers }).then(r => r.json()),
                fetch('/api/bookings', { headers }).then(r => r.json())
            ]);

            setDashboardStats({
                properties: Array.isArray(properties) ? properties.length : 0,
                experiences: Array.isArray(experiences) ? experiences.length : 0,
                blogs: Array.isArray(blogs) ? blogs.length : 0,
                testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
                bookings: bookings?.bookings?.length || 0
            });
        } catch (err) {
            console.error('Failed to fetch dashboard stats:', err);
        }
    };

    const fetchInquiriesData = async () => {
        setInquiriesData(prev => ({ ...prev, loading: true }));
        try {
            const token = localStorage.getItem('adminToken');
            const headers = { 'Authorization': `Bearer ${token}` };

            const [contacts, bookings, calculatorLeads] = await Promise.all([
                fetch('/api/contacts', { headers }).then(r => r.json()),
                fetch('/api/bookings', { headers }).then(r => r.json()),
                fetch('/api/calculator-leads', { headers }).then(r => r.json())
            ]);

            setInquiriesData({
                contacts: Array.isArray(contacts) ? contacts : [],
                bookings: Array.isArray(bookings) ? bookings : (bookings?.bookings || []),
                calculatorLeads: Array.isArray(calculatorLeads) ? calculatorLeads : [],
                loading: false
            });
        } catch (err) {
            console.error('Failed to fetch inquiries:', err);
            setInquiriesData(prev => ({ ...prev, loading: false }));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        router.push('/login');
    };

    const handleAddSEO = () => {
        setFormData({ path: '', title: '', description: '', keywords: '', image: '' });
        setEditingPath('new');
    };

    const handleEditSEO = (item) => {
        setFormData({
            path: item.path,
            title: item.title || '',
            description: item.description || '',
            keywords: item.keywords || '',
            image: item.image || ''
        });
        setEditingPath(item.path);
    };

    const handleDeleteSEO = async (path) => {
        if (!confirm('Are you sure you want to delete this SEO entry?')) return;

        const newData = seoData.filter(item => item.path !== path);

        try {
            const token = localStorage.getItem('adminToken');
            await fetch('/api/seo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newData)
            });
            setSeoData(newData);
            alert('SEO entry deleted successfully!');
        } catch (err) {
            console.error('Failed to delete SEO entry:', err);
            alert('Failed to delete SEO entry');
        }
    };

    const handleSaveSEO = async (e) => {
        e.preventDefault();

        if (!formData.path || !formData.title) {
            alert('Path and Title are required');
            return;
        }

        let newData;
        if (editingPath === 'new') {
            // Adding new entry
            newData = [...seoData, {
                path: formData.path,
                title: formData.title,
                description: formData.description,
                keywords: formData.keywords,
                image: formData.image
            }];
        } else {
            // Updating existing entry
            newData = seoData.map(item =>
                item.path === editingPath
                    ? { ...item, ...formData }
                    : item
            );
        }

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch('/api/seo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newData)
            });

            if (res.ok) {
                setSeoData(newData);
                setEditingPath(null);
                setFormData({ path: '', title: '', description: '', keywords: '', image: '' });
                alert('SEO settings saved successfully!');
            } else {
                throw new Error('Failed to save');
            }
        } catch (err) {
            console.error('Failed to save SEO data:', err);
            alert('Failed to save SEO settings');
        }
    };

    const handleCancel = () => {
        setEditingPath(null);
        setFormData({ path: '', title: '', description: '', keywords: '', image: '' });
    };

    const exportToCSV = (data, filename) => {
        if (!data || data.length === 0) {
            alert('No data to export');
            return;
        }

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row =>
                headers.map(header => {
                    const value = row[header];
                    // Escape quotes and wrap in quotes if contains comma
                    const stringValue = String(value || '').replace(/"/g, '""');
                    return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
                }).join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={20} />, color: '#FE5858' },
        { id: 'properties', label: 'Properties', icon: <Home size={20} />, color: '#3b82f6' },
        { id: 'experiences', label: 'Experiences', icon: <MapPin size={20} />, color: '#10b981' },
        { id: 'blogs', label: 'Blogs', icon: <FileText size={20} />, color: '#f59e0b' },
        { id: 'testimonials', label: 'Testimonials', icon: <MessageCircle size={20} />, color: '#8b5cf6' },
        { id: 'bookings', label: 'Bookings', icon: <Calendar size={20} />, color: '#ec4899' },
        { id: 'inquiries', label: 'All Inquiries', icon: <Mail size={20} />, color: '#f97316' },
        { id: 'seo', label: 'SEO Settings', icon: <Globe size={20} />, color: '#06b6d4' },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} />, color: '#64748b' }
    ];

    return (
        <>
            <SEO title="Admin Dashboard - Hostizzy" />
            <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
                {/* Sidebar */}
                <aside style={{
                    width: '280px',
                    background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
                    borderRight: '1px solid #e2e8f0',
                    padding: '2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    height: '100vh',
                    overflowY: 'auto',
                    boxShadow: '2px 0 10px rgba(0,0,0,0.03)'
                }}>
                    {/* Logo */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: 900,
                            background: 'linear-gradient(135deg, #FE5858 0%, #ff7b7b 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.5px'
                        }}>
                            HOSTIZZY
                        </h2>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, marginTop: '0.25rem' }}>
                            Admin Portal
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav style={{ flex: 1 }}>
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                style={{
                                    width: '100%',
                                    padding: '0.9rem 1.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.85rem',
                                    background: activeTab === item.id
                                        ? 'linear-gradient(135deg, rgba(254, 88, 88, 0.1) 0%, rgba(254, 88, 88, 0.05) 100%)'
                                        : 'transparent',
                                    border: activeTab === item.id ? '1px solid rgba(254, 88, 88, 0.2)' : '1px solid transparent',
                                    color: activeTab === item.id ? '#FE5858' : '#64748b',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    fontWeight: activeTab === item.id ? 700 : 600,
                                    borderRadius: '0.75rem',
                                    marginBottom: '0.5rem',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeTab !== item.id) {
                                        e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeTab !== item.id) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = 'transparent';
                                    }
                                }}
                            >
                                <span style={{ color: activeTab === item.id ? item.color : '#94a3b8' }}>
                                    {item.icon}
                                </span>
                                {item.label}
                                {activeTab === item.id && (
                                    <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* User Info */}
                    <div style={{
                        marginTop: '2rem',
                        padding: '1.25rem',
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        borderRadius: '0.75rem',
                        border: '1px solid #e2e8f0'
                    }}>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            LOGGED IN AS
                        </p>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                            Hostizzy Admin
                        </div>
                        <button
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                color: '#64748b',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#fee2e2';
                                e.currentTarget.style.color = '#ef4444';
                                e.currentTarget.style.borderColor = '#fecaca';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.color = '#64748b';
                                e.currentTarget.style.borderColor = '#e2e8f0';
                            }}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main style={{ marginLeft: '280px', flex: 1, padding: '3rem', overflowY: 'auto' }}>
                    <div style={{ maxWidth: '1400px' }}>
                        {/* Breadcrumb & Header */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                                <span>Admin</span>
                                <ChevronRight size={14} />
                                <span style={{ color: '#FE5858', fontWeight: 600 }}>
                                    {navItems.find(item => item.id === activeTab)?.label}
                                </span>
                            </div>
                            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0f172a', letterSpacing: '-0.5px' }}>
                                {activeTab === 'dashboard' && 'Dashboard Overview'}
                                {activeTab === 'properties' && 'Manage Properties'}
                                {activeTab === 'experiences' && 'Manage Experiences'}
                                {activeTab === 'blogs' && 'Manage Blogs'}
                                {activeTab === 'testimonials' && 'Manage Testimonials'}
                                {activeTab === 'bookings' && 'Booking Inquiries'}
                                {activeTab === 'inquiries' && 'All Inquiries'}
                                {activeTab === 'seo' && 'SEO Settings'}
                                {activeTab === 'settings' && 'System Settings'}
                            </h1>
                            <p style={{ color: '#64748b', fontSize: '1rem' }}>
                                {activeTab === 'dashboard' && 'Welcome back! Here\'s what\'s happening with your business today.'}
                                {activeTab === 'properties' && 'Add, edit, and manage all your property listings'}
                                {activeTab === 'experiences' && 'Create and manage curated travel experiences'}
                                {activeTab === 'blogs' && 'Write and publish blog posts to engage your audience'}
                                {activeTab === 'testimonials' && 'Showcase customer reviews and testimonials'}
                                {activeTab === 'bookings' && 'View and manage all booking inquiries'}
                                {activeTab === 'inquiries' && 'View all form submissions in one place - contacts, bookings, and calculator leads'}
                                {activeTab === 'seo' && 'Optimize search engine visibility for all pages'}
                                {activeTab === 'settings' && 'Configure your site settings and preferences'}
                            </p>
                        </div>

                        {/* Dashboard */}
                        {activeTab === 'dashboard' && (
                            <>
                                {/* Stats Cards */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '1.5rem',
                                    marginBottom: '2.5rem'
                                }}>
                                    {[
                                        {
                                            label: 'Properties',
                                            value: dashboardStats.properties,
                                            icon: <Home size={24} />,
                                            color: '#3b82f6',
                                            bgColor: '#eff6ff'
                                        },
                                        {
                                            label: 'Experiences',
                                            value: dashboardStats.experiences,
                                            icon: <MapPin size={24} />,
                                            color: '#10b981',
                                            bgColor: '#f0fdf4'
                                        },
                                        {
                                            label: 'Blog Posts',
                                            value: dashboardStats.blogs,
                                            icon: <FileText size={24} />,
                                            color: '#f59e0b',
                                            bgColor: '#fffbeb'
                                        },
                                        {
                                            label: 'Testimonials',
                                            value: dashboardStats.testimonials,
                                            icon: <Star size={24} />,
                                            color: '#8b5cf6',
                                            bgColor: '#faf5ff'
                                        },
                                        {
                                            label: 'Bookings',
                                            value: dashboardStats.bookings,
                                            icon: <Calendar size={24} />,
                                            color: '#ec4899',
                                            bgColor: '#fdf2f8'
                                        }
                                    ].map((stat, i) => (
                                        <div key={i} className="card" style={{
                                            padding: '1.75rem',
                                            background: 'white',
                                            border: '1px solid #e2e8f0',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '-20px',
                                                right: '-20px',
                                                width: '100px',
                                                height: '100px',
                                                background: stat.bgColor,
                                                borderRadius: '50%',
                                                opacity: 0.3
                                            }} />
                                            <div style={{ position: 'relative', zIndex: 1 }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '1rem'
                                                }}>
                                                    <div style={{
                                                        padding: '0.75rem',
                                                        background: stat.bgColor,
                                                        borderRadius: '0.75rem',
                                                        color: stat.color,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        {stat.icon}
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>
                                                    {stat.label}
                                                </div>
                                                <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a' }}>
                                                    {stat.value}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Actions */}
                                <div className="card" style={{ padding: '2rem', background: 'white', marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>
                                        Quick Actions
                                    </h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        {[
                                            { label: 'Add Property', icon: <Home size={20} />, tab: 'properties', color: '#3b82f6' },
                                            { label: 'Add Experience', icon: <MapPin size={20} />, tab: 'experiences', color: '#10b981' },
                                            { label: 'Write Blog', icon: <FileText size={20} />, tab: 'blogs', color: '#f59e0b' },
                                            { label: 'View Bookings', icon: <Calendar size={20} />, tab: 'bookings', color: '#ec4899' }
                                        ].map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveTab(action.tab)}
                                                style={{
                                                    padding: '1.25rem',
                                                    background: 'white',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '0.75rem',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    transition: 'all 0.2s',
                                                    fontWeight: 700,
                                                    fontSize: '0.95rem',
                                                    color: '#475569'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = action.color;
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = `0 4px 12px ${action.color}20`;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                <div style={{ color: action.color }}>
                                                    {action.icon}
                                                </div>
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="card" style={{ padding: '2rem', background: 'white' }}>
                                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>
                                        System Status
                                    </h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {[
                                            { text: 'All systems operational', icon: <Activity size={18} />, color: '#10b981' },
                                            { text: 'Database connected successfully', icon: <Package size={18} />, color: '#3b82f6' },
                                            { text: 'API endpoints responding normally', icon: <TrendingUp size={18} />, color: '#8b5cf6' }
                                        ].map((item, i) => (
                                            <div key={i} style={{
                                                padding: '1.25rem',
                                                background: '#f8fafc',
                                                borderRadius: '0.75rem',
                                                borderLeft: `4px solid ${item.color}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem'
                                            }}>
                                                <div style={{ color: item.color }}>
                                                    {item.icon}
                                                </div>
                                                <span style={{ fontWeight: 600, color: '#475569' }}>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Properties */}
                        {activeTab === 'properties' && (
                            <EnhancedDataManager
                                endpoint="/api/properties"
                                title="Property"
                                schema={PROPERTY_SCHEMA}
                                displayFields={['title', 'location', 'type', 'price', 'guests', 'bedrooms']}
                            />
                        )}

                        {/* Experiences */}
                        {activeTab === 'experiences' && (
                            <EnhancedDataManager
                                endpoint="/api/experiences"
                                title="Experience"
                                schema={EXPERIENCE_SCHEMA}
                                displayFields={['title', 'location', 'duration', 'price', 'dates']}
                            />
                        )}

                        {/* Blogs */}
                        {activeTab === 'blogs' && (
                            <EnhancedDataManager
                                endpoint="/api/blogs"
                                title="Blog"
                                schema={BLOG_SCHEMA}
                                displayFields={['title', 'date', 'author']}
                            />
                        )}

                        {/* Testimonials */}
                        {activeTab === 'testimonials' && (
                            <EnhancedDataManager
                                endpoint="/api/testimonials"
                                title="Testimonial"
                                schema={TESTIMONIAL_SCHEMA}
                                displayFields={['name', 'role', 'rating']}
                            />
                        )}

                        {/* Bookings */}
                        {activeTab === 'bookings' && (
                            <div className="card" style={{ padding: '2rem', background: 'white' }}>
                                <p style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>
                                    No bookings available yet. Bookings will appear here once customers start making inquiries.
                                </p>
                            </div>
                        )}

                        {/* Inquiries */}
                        {activeTab === 'inquiries' && (
                            <div>
                                {/* Tab Navigation */}
                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    marginBottom: '2rem',
                                    background: 'white',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    {[
                                        { id: 'contacts', label: 'Contact Messages', count: inquiriesData.contacts.length },
                                        { id: 'bookings', label: 'Booking Requests', count: inquiriesData.bookings.length },
                                        { id: 'calculator', label: 'Calculator Leads', count: inquiriesData.calculatorLeads.length }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => {
                                                setInquiriesTab(tab.id);
                                                setSearchQuery('');
                                            }}
                                            style={{
                                                flex: 1,
                                                padding: '0.85rem 1.5rem',
                                                background: inquiriesTab === tab.id
                                                    ? 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)'
                                                    : 'transparent',
                                                color: inquiriesTab === tab.id ? 'white' : '#64748b',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                cursor: 'pointer',
                                                fontWeight: 700,
                                                fontSize: '0.95rem',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (inquiriesTab !== tab.id) {
                                                    e.currentTarget.style.background = '#f8fafc';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (inquiriesTab !== tab.id) {
                                                    e.currentTarget.style.background = 'transparent';
                                                }
                                            }}
                                        >
                                            {tab.label}
                                            <span style={{
                                                padding: '0.25rem 0.6rem',
                                                background: inquiriesTab === tab.id ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                                                color: inquiriesTab === tab.id ? 'white' : '#64748b',
                                                borderRadius: '1rem',
                                                fontSize: '0.8rem',
                                                fontWeight: 800
                                            }}>
                                                {tab.count}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Search and Export Bar */}
                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    marginBottom: '1.5rem',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ position: 'relative', flex: 1 }}>
                                        <Search size={18} style={{
                                            position: 'absolute',
                                            left: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#94a3b8'
                                        }} />
                                        <input
                                            type="text"
                                            placeholder="Search inquiries..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '0.85rem 1.25rem 0.85rem 3rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '0.75rem',
                                                fontSize: '0.95rem',
                                                background: 'white'
                                            }}
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                style={{
                                                    position: 'absolute',
                                                    right: '1rem',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#94a3b8',
                                                    padding: '0.25rem'
                                                }}
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            const data = inquiriesTab === 'contacts'
                                                ? inquiriesData.contacts
                                                : inquiriesTab === 'bookings'
                                                ? inquiriesData.bookings
                                                : inquiriesData.calculatorLeads;
                                            exportToCSV(data, `${inquiriesTab}-${new Date().toISOString().split('T')[0]}.csv`);
                                        }}
                                        className="btn btn-outline"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        <Download size={18} />
                                        Export CSV
                                    </button>
                                </div>

                                {/* Loading State */}
                                {inquiriesData.loading && (
                                    <div className="card" style={{ padding: '3rem', background: 'white', textAlign: 'center' }}>
                                        <div style={{ color: '#64748b', fontSize: '1rem' }}>
                                            Loading inquiries...
                                        </div>
                                    </div>
                                )}

                                {/* Contact Messages */}
                                {!inquiriesData.loading && inquiriesTab === 'contacts' && (
                                    <div className="card" style={{ padding: '2rem', background: 'white', overflowX: 'auto' }}>
                                        {inquiriesData.contacts.length === 0 ? (
                                            <p style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>
                                                No contact messages yet.
                                            </p>
                                        ) : (
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Date</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Name</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Email</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Phone</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Message</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {inquiriesData.contacts
                                                        .filter(contact => {
                                                            if (!searchQuery) return true;
                                                            const query = searchQuery.toLowerCase();
                                                            return (
                                                                contact.name?.toLowerCase().includes(query) ||
                                                                contact.email?.toLowerCase().includes(query) ||
                                                                contact.phone?.toLowerCase().includes(query) ||
                                                                contact.message?.toLowerCase().includes(query)
                                                            );
                                                        })
                                                        .map((contact, index) => (
                                                            <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                                                                    {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', fontWeight: 600, color: '#0f172a' }}>
                                                                    {contact.name || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {contact.email || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {contact.phone || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {contact.message || 'N/A'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                )}

                                {/* Booking Requests */}
                                {!inquiriesData.loading && inquiriesTab === 'bookings' && (
                                    <div className="card" style={{ padding: '2rem', background: 'white', overflowX: 'auto' }}>
                                        {inquiriesData.bookings.length === 0 ? (
                                            <p style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>
                                                No booking requests yet.
                                            </p>
                                        ) : (
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Date</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Name</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Email</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Phone</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Property</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Check-in</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Check-out</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Guests</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {inquiriesData.bookings
                                                        .filter(booking => {
                                                            if (!searchQuery) return true;
                                                            const query = searchQuery.toLowerCase();
                                                            return (
                                                                booking.name?.toLowerCase().includes(query) ||
                                                                booking.email?.toLowerCase().includes(query) ||
                                                                booking.phone?.toLowerCase().includes(query) ||
                                                                booking.propertyTitle?.toLowerCase().includes(query)
                                                            );
                                                        })
                                                        .map((booking, index) => (
                                                            <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                                                                    {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', fontWeight: 600, color: '#0f172a' }}>
                                                                    {booking.name || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {booking.email || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {booking.phone || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>
                                                                    {booking.propertyTitle || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {booking.checkIn || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {booking.checkOut || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {booking.guests || 'N/A'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                )}

                                {/* Calculator Leads */}
                                {!inquiriesData.loading && inquiriesTab === 'calculator' && (
                                    <div className="card" style={{ padding: '2rem', background: 'white', overflowX: 'auto' }}>
                                        {inquiriesData.calculatorLeads.length === 0 ? (
                                            <p style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>
                                                No calculator leads yet.
                                            </p>
                                        ) : (
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Date</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Name</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Email</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Phone</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Location</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Property Type</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Est. Revenue</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {inquiriesData.calculatorLeads
                                                        .filter(lead => {
                                                            if (!searchQuery) return true;
                                                            const query = searchQuery.toLowerCase();
                                                            return (
                                                                lead.name?.toLowerCase().includes(query) ||
                                                                lead.email?.toLowerCase().includes(query) ||
                                                                lead.phone?.toLowerCase().includes(query) ||
                                                                lead.location?.toLowerCase().includes(query) ||
                                                                lead.propertyType?.toLowerCase().includes(query)
                                                            );
                                                        })
                                                        .map((lead, index) => (
                                                            <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                                                                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', fontWeight: 600, color: '#0f172a' }}>
                                                                    {lead.name || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {lead.email || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {lead.phone || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {lead.location || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                                    {lead.propertyType || 'N/A'}
                                                                </td>
                                                                <td style={{ padding: '1rem', fontWeight: 600, color: '#10b981', fontSize: '0.9rem' }}>
                                                                    {lead.estimatedRevenue ? `₹${lead.estimatedRevenue.toLocaleString()}` : 'N/A'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SEO Settings */}
                        {activeTab === 'seo' && (
                            <div>
                                {loading ? (
                                    <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b', background: 'white', borderRadius: '0.75rem' }}>
                                        Loading SEO data...
                                    </div>
                                ) : editingPath ? (
                                    <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', color: '#0f172a' }}>
                                            {editingPath === 'new' ? 'Add New SEO Entry' : 'Edit SEO Entry'}
                                        </h3>
                                        <form onSubmit={handleSaveSEO}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                                                        Page Path *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.path}
                                                        onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                                                        placeholder="/about, /services, etc."
                                                        disabled={editingPath !== 'new'}
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.85rem 1.25rem',
                                                            border: '1px solid #e2e8f0',
                                                            borderRadius: '0.75rem',
                                                            fontSize: '0.95rem',
                                                            background: editingPath !== 'new' ? '#f8fafc' : 'white'
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                                                        SEO Title *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.title}
                                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                        placeholder="Enter SEO title (50-60 characters recommended)"
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.85rem 1.25rem',
                                                            border: '1px solid #e2e8f0',
                                                            borderRadius: '0.75rem',
                                                            fontSize: '0.95rem'
                                                        }}
                                                    />
                                                    <div style={{ fontSize: '0.85rem', color: formData.title.length > 60 ? '#ef4444' : '#64748b', marginTop: '0.5rem' }}>
                                                        {formData.title.length} characters {formData.title.length > 60 && '(Too long!)'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                                                        Meta Description
                                                    </label>
                                                    <textarea
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                        placeholder="Enter meta description (150-160 characters recommended)"
                                                        rows={3}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.85rem 1.25rem',
                                                            border: '1px solid #e2e8f0',
                                                            borderRadius: '0.75rem',
                                                            fontSize: '0.95rem',
                                                            fontFamily: 'inherit',
                                                            resize: 'vertical'
                                                        }}
                                                    />
                                                    <div style={{ fontSize: '0.85rem', color: formData.description.length > 160 ? '#ef4444' : '#64748b', marginTop: '0.5rem' }}>
                                                        {formData.description.length} characters {formData.description.length > 160 && '(Too long!)'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                                                        Keywords (comma-separated)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.keywords}
                                                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                                        placeholder="vacation rental, property management, etc."
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.85rem 1.25rem',
                                                            border: '1px solid #e2e8f0',
                                                            borderRadius: '0.75rem',
                                                            fontSize: '0.95rem'
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                                                        OG Image URL (Optional)
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={formData.image || ''}
                                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                        placeholder="https://example.com/og-image.jpg"
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.85rem 1.25rem',
                                                            border: '1px solid #e2e8f0',
                                                            borderRadius: '0.75rem',
                                                            fontSize: '0.95rem'
                                                        }}
                                                    />
                                                    {formData.image && (
                                                        <div style={{ marginTop: '1rem' }}>
                                                            <img
                                                                src={formData.image}
                                                                alt="OG Preview"
                                                                style={{
                                                                    maxWidth: '300px',
                                                                    maxHeight: '200px',
                                                                    borderRadius: '0.5rem',
                                                                    border: '1px solid #e2e8f0'
                                                                }}
                                                                onError={(e) => e.target.style.display = 'none'}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '150px' }}
                                                    >
                                                        <Save size={18} />
                                                        Save SEO Settings
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleCancel}
                                                        className="btn btn-outline"
                                                        style={{ minWidth: '120px' }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p style={{ color: '#64748b' }}>
                                                Manage SEO metadata for all pages. {seoData.length} entries configured.
                                            </p>
                                            <button
                                                onClick={handleAddSEO}
                                                className="btn btn-primary"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                            >
                                                <Plus size={18} />
                                                Add SEO Entry
                                            </button>
                                        </div>
                                        <div className="card" style={{ padding: '2rem', background: 'white', overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Page Path</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Title</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Description</th>
                                                        <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {seoData.length === 0 ? (
                                                        <tr>
                                                            <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                                                                No SEO entries found. Click "Add SEO Entry" to create one.
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        seoData.map((item, index) => (
                                                            <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                                <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 600, color: '#FE5858' }}>
                                                                    {item.path}
                                                                </td>
                                                                <td style={{ padding: '1rem', fontWeight: 600, color: '#0f172a' }}>{item.title}</td>
                                                                <td style={{
                                                                    padding: '1rem',
                                                                    maxWidth: '300px',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                    color: '#64748b',
                                                                    fontSize: '0.9rem'
                                                                }}>
                                                                    {item.description}
                                                                </td>
                                                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                                        <button
                                                                            onClick={() => handleEditSEO(item)}
                                                                            style={{
                                                                                padding: '0.5rem',
                                                                                background: '#eff6ff',
                                                                                border: 'none',
                                                                                borderRadius: '0.5rem',
                                                                                color: '#3b82f6',
                                                                                cursor: 'pointer',
                                                                                transition: 'all 0.2s'
                                                                            }}
                                                                        >
                                                                            <Edit size={16} />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteSEO(item.path)}
                                                                            style={{
                                                                                padding: '0.5rem',
                                                                                background: '#fee2e2',
                                                                                border: 'none',
                                                                                borderRadius: '0.5rem',
                                                                                color: '#ef4444',
                                                                                cursor: 'pointer',
                                                                                transition: 'all 0.2s'
                                                                            }}
                                                                        >
                                                                            <Trash2 size={16} />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Settings */}
                        {activeTab === 'settings' && (
                            <EnhancedDataManager
                                endpoint="/api/settings"
                                title="Settings"
                                schema={SETTINGS_SCHEMA}
                                displayFields={['siteName', 'supportEmail', 'supportPhone']}
                                isSingleObject={true}
                            />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
