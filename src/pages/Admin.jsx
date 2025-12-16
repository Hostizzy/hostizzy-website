import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { LayoutDashboard, Home, Mountain, Calendar, LogOut, Plus, Trash2, Edit, BookOpen, Search, X, Quote, Instagram } from 'lucide-react';
import ImageArrayInput from '../components/admin/ImageArrayInput';
import ItineraryBuilder from '../components/admin/ItineraryBuilder';
import TagInput from '../components/admin/TagInput';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Total Guests', value: '1,248', trend: '+12%' },
        { label: 'Total Revenue', value: '₹42.5L', trend: '+8%' },
        { label: 'Active Bookings', value: '18', trend: '+5%' },
        { label: 'Avg Rating', value: '4.9', trend: '+2%' }
    ];

    return (
        <>
            <SEO title="Admin Console" description="Hostizzy Management Dashboard" />
            <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--header-height))', background: '#f8fafc' }}>

                {/* Sidebar */}
                <aside style={{ width: '260px', background: 'white', borderRight: '1px solid #e2e8f0', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                    <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', background: 'var(--color-primary)', borderRadius: '8px' }}></div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>Hostizzy</h2>
                    </div>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                        <NavButton icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                        <div style={{ height: '1px', background: '#e2e8f0', margin: '1rem 0' }}></div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', paddingLeft: '0.75rem', marginBottom: '0.5rem' }}>MANAGEMENT</p>
                        <NavButton icon={<Home size={20} />} label="Properties" active={activeTab === 'properties'} onClick={() => setActiveTab('properties')} />
                        <NavButton icon={<Mountain size={20} />} label="Experiences" active={activeTab === 'experiences'} onClick={() => setActiveTab('experiences')} />
                        <NavButton icon={<BookOpen size={20} />} label="Blogs" active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} />
                        <NavButton icon={<Quote size={20} />} label="Testimonials" active={activeTab === 'testimonials'} onClick={() => setActiveTab('testimonials')} />
                        <NavButton icon={<Instagram size={20} />} label="Social Info" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
                        <NavButton icon={<Calendar size={20} />} label="Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
                    </nav>

                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', color: '#64748b', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                        <LogOut size={20} /> Logout
                    </button>
                </aside>

                {/* ... (Main Content) ... */}
                <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
                    {/* ... (Header) ... */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1e293b' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                            <p style={{ color: '#64748b' }}>Here's what's happening with your business today.</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', display: 'grid', placeItems: 'center' }}>A</div>
                        </div>
                    </div>

                    {activeTab === 'overview' && (
                        /* ... (Stats Grid & Chart - omitted for brevity in replace, effectively keeping them if I target correctly) ... */
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Stats Grid */}
                            <div className="grid desktop-4-col" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                {stats.map((stat, i) => (
                                    <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>{stat.label}</span>
                                            <span style={{ color: stat.trend.includes('+') ? '#10b981' : '#ef4444', fontSize: '0.8rem', fontWeight: 600, background: stat.trend.includes('+') ? '#d1fae5' : '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>{stat.trend}</span>
                                        </div>
                                        <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b' }}>{stat.value}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'properties' && <DataManager key="prop" endpoint="/api/properties" title="Property" fields={['title', 'location', 'type', 'price']} />}
                    {activeTab === 'experiences' && <DataManager key="exp" endpoint="/api/experiences" title="Experience" fields={['title', 'location', 'duration', 'price']} />}
                    {activeTab === 'blogs' && <DataManager key="blogs" endpoint="/api/blogs" title="Blog" fields={['title', 'date', 'excerpt']} />}
                    {activeTab === 'testimonials' && <DataManager key="testi" endpoint="/api/testimonials" title="Testimonial" fields={['name', 'role', 'rating']} />}

                    {activeTab === 'bookings' && <DataManager key="bookings" endpoint="/api/bookings" title="Booking" fields={['itemTitle', 'name', 'date', 'status']} />}
                </main>
            </div>
        </>
    );
};

// --- Helper Components ---

const NavButton = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            width: '100%',
            padding: '0.75rem',
            border: 'none',
            background: active ? '#f1f5f9' : 'transparent',
            color: active ? 'var(--color-primary)' : '#64748b',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: active ? 600 : 500,
            transition: 'all 0.2s'
        }}
    >
        {icon}
        <span style={{ fontSize: '0.95rem' }}>{label}</span>
    </button>
);

const DataManager = ({ endpoint, title, fields }) => {
    const [data, setData] = useState([]);
    const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    // Fetch Data
    const fetchData = React.useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(endpoint);
            const json = await res.json();
            setData(Array.isArray(json) ? json : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handlers
    const handleAdd = () => {
        setFormData({});
        setView('add');
    };

    const handleEdit = (item) => {
        setFormData(item);
        setView('edit');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
        fetchData();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = view === 'add' ? 'POST' : 'PUT';
        const url = view === 'add' ? endpoint : `${endpoint}/${formData.id}`;

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setView('list');
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Failed to save');
        }
    };

    // Airbnb Import Handler
    const handleImport = async () => {
        const url = prompt("Enter Airbnb or Website URL to import details from:");
        if (!url) return;

        try {
            const res = await fetch('/api/import-meta', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            const meta = await res.json();
            if (meta.title) {
                setFormData(prev => ({
                    ...prev,
                    title: meta.title,
                    description: meta.description,
                    image: meta.image
                }));
                alert("Imported! Review details in the form.");
            }
        } catch (e) {
            console.error(e);
            alert("Import failed. Check console.");
        }
    };

    if (loading && view === 'list' && data.length === 0) return <div style={{ padding: '2rem', color: '#94a3b8' }}>Loading {title}s...</div>;

    return (
        <div>
            {/* Toolbar */}
            {view === 'list' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            placeholder={`Search ${title}s...`}
                            style={{ padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', width: '300px', outline: 'none' }}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={20} /> Add {title}
                    </button>
                    {/* Only show import for properties/experiences if needed, simplified here */}
                    {view === 'add' && title === 'Property' && (
                        <button className="btn" onClick={handleImport} style={{ marginLeft: '1rem', border: '1px solid #e2e8f0' }}>Import from URL</button>
                    )}
                </div>
            )}

            {/* List View */}
            {view === 'list' ? (
                <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                {fields.map(f => (
                                    <th key={f} style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textTransform: 'capitalize' }}>{f}</th>
                                ))}
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    {fields.map(f => (
                                        <td key={f} style={{ padding: '1rem', color: '#334155' }}>
                                            {typeof item[f] === 'object' ? JSON.stringify(item[f]).substring(0, 30) + '...' : item[f]}
                                        </td>
                                    ))}
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button onClick={() => handleEdit(item)} style={{ marginRight: '0.75rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={fields.length + 1} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No {title.toLowerCase()}s found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* Form View */
                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{view === 'add' ? 'Add New' : 'Edit'} {title}</h2>
                        {view === 'add' && <button onClick={handleImport} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>✨ Auto-Fill from URL</button>}
                    </div>
                    <FormTabs
                        formData={formData}
                        setFormData={setFormData}
                        title={title}
                        onSubmit={handleSubmit}
                        onCancel={() => setView('list')}
                    />
                </div>
            )}
        </div>
    );
};

// FormTabs Update below
const FormTabs = ({ formData, setFormData, title, onSubmit, onCancel }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Dynamic Tabs based on Content Type
    const tabs = title === 'Property' ? [
        { name: 'Basic Info', fields: ['title', 'price', 'type', 'guests', 'bedrooms', 'bathrooms'] },
        { name: 'Location', fields: ['location', 'map_coordinates', 'video_url'] },
        { name: 'Photos', fields: ['image', 'gallery'] },
        { name: 'Details', fields: ['description', 'amenities_grouped'] },
        { name: 'Policies', fields: ['house_rules', 'cancellation_policy'] }
    ] : title === 'Experience' ? [
        { name: 'Overview', fields: ['title', 'subtitle', 'price', 'dates', 'duration', 'location', 'video_url'] },
        { name: 'Media', fields: ['image'] },
        { name: 'Itinerary', fields: ['itinerary'] },
        { name: 'Inclusions', fields: ['inclusions', 'exclusions'] }
    ] : title === 'Testimonial' ? [
        { name: 'Details', fields: ['name', 'role', 'rating', 'text'] }
    ] : [ // Default (Blogs, etc)
        { name: 'Content', fields: Object.keys(formData).length > 0 ? Object.keys(formData) : ['title', 'excerpt', 'image', 'content', 'date'] }
    ];

    return (
        <form onSubmit={onSubmit}>
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveTab(index)}
                        style={{
                            padding: '0.75rem 0',
                            marginRight: '1rem',
                            border: 'none',
                            background: 'transparent',
                            borderBottom: activeTab === index ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === index ? 'var(--color-primary)' : '#64748b',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            <div style={{ minHeight: '300px' }}>
                {tabs[activeTab].fields.map(field => (
                    <FormField key={field} name={field} value={formData[field]} onChange={(val) => setFormData({ ...formData, [field]: val })} />
                ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save {title}</button>
                <button type="button" className="btn" onClick={onCancel} style={{ flex: 1, background: '#f1f5f9' }}>Cancel</button>
            </div>
        </form>
    );
};

const FormField = ({ name, value, onChange }) => {
    // Custom Builders
    if (name === 'gallery') {
        return (
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155' }}>Gallery Images</label>
                <ImageArrayInput value={value || []} onChange={onChange} />
            </div>
        );
    }

    if (name === 'itinerary') {
        return (
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155' }}>Itinerary</label>
                <ItineraryBuilder value={value || []} onChange={onChange} />
            </div>
        );
    }

    // JSON Fields
    if (['amenities_grouped', 'house_rules', 'tags', 'inclusions', 'exclusions', 'map_coordinates'].includes(name)) {
        return (
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155', textTransform: 'capitalize' }}>
                    {name.replace('_', ' ')} <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>(JSON Format)</span>
                </label>
                <textarea
                    className="form-input"
                    value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value || ''}
                    onChange={e => {
                        try { onChange(JSON.parse(e.target.value)); } catch { /* Allow typing */ }
                    }}
                    rows={6}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'monospace', fontSize: '0.85rem' }}
                />
            </div>
        );
    }

    // Long Text
    if (name === 'description' || name === 'cancellation_policy' || name === 'content' || name === 'excerpt') {
        return (
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155', textTransform: 'capitalize' }}>{name.replace('_', ' ')}</label>
                <textarea
                    className="form-input"
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    rows={4}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }}
                />
            </div>
        );
    }

    // Default Input
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155', textTransform: 'capitalize' }}>{name.replace('_', ' ')}</label>
            <input
                className="form-input"
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }}
            />
        </div>
    );
};

export default Admin;
