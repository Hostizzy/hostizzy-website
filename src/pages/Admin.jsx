import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useSettings } from '../context/SettingsContext';
import {
    LayoutDashboard,
    Home,
    MapPin,
    FileText,
    MessageCircle,
    Settings,
    LogOut,
    Plus,
    Search,
    Edit,
    Trash2,
    ExternalLink,
    Calendar,
    Instagram,
    Mail,
    Globe
} from 'lucide-react';
import ImageArrayInput from '../components/admin/ImageArrayInput';
import ItineraryBuilder from '../components/admin/ItineraryBuilder';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Total Guests', value: '1,248', trend: '+12%' },
        { label: 'Total Revenue', value: '₹42.5L', trend: '+8%' },
        { label: 'Active Bookings', value: '18', trend: '+5%' },
        { label: 'Avg Rating', value: '4.9', trend: '+2%' }
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.reload();
    };

    return (
        <>
            <SEO title="Admin Console" description="Hostizzy Management Dashboard" />
            <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
                {/* Sidebar */}
                <aside style={{ width: '280px', background: 'white', borderRight: '1px solid #e2e8f0', padding: '2rem', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
                    <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', background: 'var(--color-primary)', borderRadius: '0.5rem' }}></div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>HOSTIZZY</span>
                    </div>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                        <NavButton icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                        <NavButton icon={<Home size={20} />} label="Properties" active={activeTab === 'properties'} onClick={() => setActiveTab('properties')} />
                        <NavButton icon={<MapPin size={20} />} label="Experiences" active={activeTab === 'experiences'} onClick={() => setActiveTab('experiences')} />
                        <NavButton icon={<FileText size={20} />} label="Blogs" active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} />
                        <NavButton icon={<MessageCircle size={20} />} label="Testimonials" active={activeTab === 'testimonials'} onClick={() => setActiveTab('testimonials')} />
                        <NavButton icon={<Instagram size={20} />} label="Social Info" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
                        <NavButton icon={<Calendar size={20} />} label="Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
                        <NavButton icon={<Mail size={20} />} label="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
                        <NavButton icon={<Globe size={20} />} label="SEO Settings" active={activeTab === 'seo'} onClick={() => setActiveTab('seo')} />
                        <NavButton icon={<Settings size={20} />} label="Brand Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                        <div style={{ margin: '1rem 0', borderTop: '1px solid #f1f5f9' }}></div>
                        <NavButton icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
                    </nav>

                    <div style={{ marginTop: 'auto', padding: '1rem', background: '#f1f5f9', borderRadius: '1rem' }}>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>PRO PLAN</p>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Hostizzy Enterprise</div>
                    </div>
                </aside>

                {/* Main Content */}
                <main style={{ flex: 1, padding: '3rem', background: '#f8fafc', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                            <p style={{ color: '#64748b' }}>Welcome to your Hostizzy management console.</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'var(--color-primary)', color: 'white', display: 'grid', placeItems: 'center', fontWeight: 700 }}>H</div>
                        </div>
                    </div>

                    {activeTab === 'overview' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {/* Stats Grid */}
                            <div className="grid desktop-4-col" style={{ gap: '1.5rem' }}>
                                {stats.map((stat, i) => (
                                    <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>{stat.label}</span>
                                            <span style={{ color: stat.trend.includes('+') ? '#10b981' : '#ef4444', fontSize: '0.75rem', fontWeight: 700, background: stat.trend.includes('+') ? '#d1fae5' : '#fee2e2', padding: '2px 8px', borderRadius: '100px' }}>{stat.trend}</span>
                                        </div>
                                        <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-1px' }}>{stat.value}</h3>
                                    </div>
                                ))}
                            </div>

                            {/* Revenue Chart Mockup */}
                            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Revenue Performance</h3>
                                    <select style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                                        <option>Last 7 Days</option>
                                        <option>Last 30 Days</option>
                                    </select>
                                </div>
                                <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '2.5rem', paddingBottom: '1rem', borderBottom: '2px solid #f1f5f9' }}>
                                    {[30, 50, 40, 90, 60, 80, 70].map((h, i) => (
                                        <div key={i} style={{
                                            flex: 1,
                                            background: i === 3 ? 'var(--color-primary)' : '#e2e8f0',
                                            height: `${h}%`,
                                            borderRadius: '0.75rem 0.75rem 0 0',
                                            transition: 'height 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                        }}></div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'properties' && <DataManager key="prop" endpoint="/api/properties" title="Property" fields={['title', 'location', 'type', 'price']} />}
                    {activeTab === 'experiences' && <DataManager key="exp" endpoint="/api/experiences" title="Experience" fields={['title', 'location', 'duration', 'price']} />}
                    {activeTab === 'blogs' && <DataManager key="blogs" endpoint="/api/blogs" title="Blog" fields={['title', 'date', 'excerpt']} />}
                    {activeTab === 'testimonials' && <DataManager key="testi" endpoint="/api/testimonials" title="Testimonial" fields={['name', 'role', 'rating']} />}
                    {activeTab === 'social' && <DataManager key="social" endpoint="/api/social/instagram" title="Social Post" fields={['caption', 'platform']} />}
                    {activeTab === 'bookings' && <DataManager key="bookings" endpoint="/api/bookings" title="Enquiry" fields={['itemTitle', 'name', 'checkIn', 'totalPrice', 'status']} />}
                    {activeTab === 'messages' && <DataManager key="msgs" endpoint="/api/contacts" title="Message" fields={['name', 'email', 'subject', 'timestamp']} />}
                    {activeTab === 'seo' && <DataManager key="seo" endpoint="/api/seo" title="SEO Page" fields={['path', 'title', 'description']} />}
                    {activeTab === 'settings' && <DataManager key="settings" endpoint="/api/settings" title="Setting" fields={['siteName', 'supportEmail', 'supportPhone']} isSingleObject={true} />}
                </main>
            </div>
        </>
    );
};

const NavButton = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            width: '100%',
            padding: '0.85rem 1rem',
            border: 'none',
            background: active ? 'rgba(254, 88, 88, 0.1)' : 'transparent',
            color: active ? 'var(--color-primary)' : '#64748b',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            fontWeight: active ? 700 : 500,
            transition: 'all 0.2s'
        }}
    >
        {icon}
        <span style={{ fontSize: '0.95rem' }}>{label}</span>
    </button>
);

const DataManager = ({ endpoint, title, fields, isSingleObject = false }) => {
    const [data, setData] = useState([]);
    const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const { refreshSettings } = useSettings();

    // Fetch Data
    const fetchData = React.useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(endpoint, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await res.json();
            setData(isSingleObject ? [json] : (Array.isArray(json) ? json : []));
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
        const token = localStorage.getItem('adminToken');
        await fetch(`${endpoint}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!isSingleObject) fetchData();
        else setView('list');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isSingleObject ? 'PUT' : (view === 'add' ? 'POST' : 'PUT');
        const url = (isSingleObject || view === 'add') ? endpoint : `${endpoint}/${formData.id}`;

        try {
            const token = localStorage.getItem('adminToken');
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (title === 'Setting') refreshSettings();
            setView('list');
            if (isSingleObject) {
                setData([formData]);
            } else {
                fetchData();
            }
        } catch (err) {
            console.error(err);
            alert('Failed to save');
        }
    };

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
                    image: meta.image,
                    price: meta.price || prev.price
                }));
                alert("Imported! Review details in the form.");
            }
        } catch (e) {
            console.error(e);
            alert("Import failed.");
        }
    };

    const handleMagicPaste = async () => {
        const text = prompt("Paste full listing description/details here (AI will parse it):");
        if (!text) return;

        try {
            const res = await fetch('/api/parse-listing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            const data = await res.json();
            setFormData(prev => ({
                ...prev,
                ...data
            }));
            alert("Magic Paste successful! Please review the details.");
        } catch (e) {
            console.error(e);
            alert("Parsing failed.");
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
                            style={{ padding: '0.75rem 1rem 0.75rem 3.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', width: '320px', outline: 'none' }}
                        />
                    </div>
                    {title !== 'Message' && title !== 'Enquiry' && !isSingleObject && (
                        <button className="btn btn-primary" onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={20} /> Add {title}
                        </button>
                    )}
                </div>
            )}

            {/* List View */}
            {view === 'list' ? (
                <div style={{ background: 'white', borderRadius: '1.25rem', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                {fields.map(f => (
                                    <th key={f} style={{ padding: '1.25rem 1rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f}</th>
                                ))}
                                <th style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    {fields.map(f => (
                                        <td key={f} style={{ padding: '1.25rem 1rem', color: '#334155', fontWeight: 500 }}>
                                            {f === 'totalPrice' ? `₹${(item[f] || 0).toLocaleString()}` :
                                                (f === 'checkIn' || f === 'checkOut') && item[f] ? new Date(item[f]).toLocaleDateString() :
                                                    typeof item[f] === 'object' ? JSON.stringify(item[f]).substring(0, 30) + '...' : String(item[f] || 'N/A')}
                                        </td>
                                    ))}
                                    <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                                        {title !== 'Message' && title !== 'Enquiry' && (
                                            <button onClick={() => handleEdit(item)} style={{ marginRight: '1rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}><Edit size={18} /></button>
                                        )}
                                        <button onClick={() => handleDelete(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={fields.length + 1} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>No {title.toLowerCase()}s found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* Form View */
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{view === 'add' ? 'Add New' : 'Edit'} {title}</h2>
                        {view === 'add' && title === 'Property' && (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={handleImport} style={{ color: 'var(--color-primary)', background: '#fff1f1', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-primary)', cursor: 'pointer', fontWeight: 700 }}>✨ Auto-Fill URL</button>
                                <button onClick={handleMagicPaste} style={{ color: '#10b981', background: '#f0fdf4', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #10b981', cursor: 'pointer', fontWeight: 700 }}>🪄 Magic Paste</button>
                            </div>
                        )}
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

const FormTabs = ({ formData, setFormData, title, onSubmit, onCancel }) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = title === 'Property' ? [
        { name: 'Basic Info', fields: ['title', 'price', 'type', 'guests', 'bedrooms', 'bathrooms'] },
        { name: 'Location', fields: ['location', 'video_url'] },
        { name: 'Photos', fields: ['image', 'gallery'] },
        { name: 'Details', fields: ['description'] },
        { name: 'Policies', fields: ['cancellation_policy'] }
    ] : title === 'Experience' ? [
        { name: 'Overview', fields: ['title', 'subtitle', 'price', 'dates', 'duration', 'location', 'video_url'] },
        { name: 'Media', fields: ['image'] },
        { name: 'Itinerary', fields: ['itinerary'] }
    ] : title === 'Testimonial' ? [
        { name: 'Details', fields: ['name', 'role', 'rating', 'text'] }
    ] : title === 'SEO Page' ? [
        { name: 'Settings', fields: ['path', 'title', 'description', 'keywords'] }
    ] : [
        { name: 'Content', fields: Object.keys(formData).length > 0 ? Object.keys(formData) : ['title', 'excerpt', 'image', 'content'] }
    ];

    return (
        <form onSubmit={onSubmit}>
            <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #f1f5f9', marginBottom: '2.5rem' }}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveTab(index)}
                        style={{
                            padding: '1rem 0',
                            border: 'none',
                            background: 'transparent',
                            borderBottom: activeTab === index ? '3px solid var(--color-primary)' : '3px solid transparent',
                            color: activeTab === index ? 'var(--color-primary)' : '#94a3b8',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.95rem'
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

            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '1rem' }}>Save {title}</button>
                <button type="button" className="btn" onClick={onCancel} style={{ flex: 1, background: '#f1f5f9', padding: '1rem' }}>Cancel</button>
            </div>
        </form>
    );
};

const FormField = ({ name, value, onChange }) => {
    if (name === 'gallery') return <div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: '#0f172a' }}>Gallery Images</label><ImageArrayInput value={value || []} onChange={onChange} /></div>;
    if (name === 'itinerary') return <div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: '#0f172a' }}>Itinerary</label><ItineraryBuilder value={value || []} onChange={onChange} /></div>;

    if (name === 'description' || name === 'content' || name === 'text') {
        return (
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: '#0f172a', textTransform: 'capitalize' }}>{name.replace('_', ' ')}</label>
                <textarea
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    rows={6}
                    style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }}
                />
            </div>
        );
    }

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: '#0f172a', textTransform: 'capitalize' }}>{name.replace('_', ' ')}</label>
            <input
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }}
            />
        </div>
    );
};

export default Admin;
