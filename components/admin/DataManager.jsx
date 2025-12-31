'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

const DataManager = ({ endpoint, title, fields, isSingleObject = false }) => {
    const [data, setData] = useState([]);
    const [view, setView] = useState('list'); // 'list' | 'add' | 'edit'
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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
    };

    // Filter data based on search
    const filteredData = data.filter(item => {
        if (!searchTerm) return true;
        return fields.some(field => {
            const value = item[field];
            return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    if (loading && view === 'list' && data.length === 0) {
        return <div style={{ padding: '2rem', color: '#94a3b8' }}>Loading {title}s...</div>;
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
                                    {fields.map((field, i) => (
                                        <th key={i} style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#0f172a', textTransform: 'capitalize' }}>
                                            {field.replace(/([A-Z])/g, ' $1').trim()}
                                        </th>
                                    ))}
                                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, i) => (
                                    <tr key={item.id || i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        {fields.map((field, j) => (
                                            <td key={j} style={{
                                                padding: '1rem',
                                                maxWidth: '250px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                color: j === 0 ? '#0f172a' : '#64748b',
                                                fontSize: '0.95rem'
                                            }}>
                                                {item[field] || '-'}
                                            </td>
                                        ))}
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
                                                        cursor: 'pointer'
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
                                                            cursor: 'pointer'
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
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>
                        {view === 'add' ? `Add New ${title}` : `Edit ${title}`}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {fields.map((field) => (
                                <div key={field}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', textTransform: 'capitalize' }}>
                                        {field.replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    {field.includes('description') || field.includes('excerpt') || field.includes('content') ? (
                                        <textarea
                                            value={formData[field] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                            rows={field === 'content' ? 8 : 3}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.95rem',
                                                fontFamily: 'inherit',
                                                resize: 'vertical'
                                            }}
                                        />
                                    ) : (
                                        <input
                                            type={field.includes('price') || field.includes('rating') ? 'number' : 'text'}
                                            value={formData[field] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.95rem'
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {view === 'add' ? 'Add' : 'Update'} {title}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="btn btn-outline"
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

export default DataManager;
