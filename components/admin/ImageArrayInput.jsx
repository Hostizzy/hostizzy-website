'use client';
import React from 'react';
import { Plus, Trash2, Image as ImageIcon, X } from 'lucide-react';

const ImageArrayInput = ({ value = [], onChange }) => {
    // value is array of strings (urls)

    const handleAdd = () => {
        onChange([...value, '']);
    };

    const handleRemove = (index) => {
        const newValue = value.filter((_, i) => i !== index);
        onChange(newValue);
    };

    const handleChange = (index, val) => {
        const newValue = [...value];
        newValue[index] = val;
        onChange(newValue);
    };

    return (
        <div className="space-y-3">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                {value.map((url, index) => (
                    <div key={index} style={{ position: 'relative', width: '150px', height: '100px', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        {url ? (
                            <img src={url} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                        ) : (
                            <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: '#cbd5e1' }}><ImageIcon size={24} /></div>
                        )}
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            style={{
                                position: 'absolute', top: '4px', right: '4px',
                                background: 'rgba(0,0,0,0.5)', color: 'white',
                                border: 'none', borderRadius: '50%', width: '24px', height: '24px',
                                display: 'grid', placeItems: 'center', cursor: 'pointer'
                            }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {value.map((url, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder="https://..."
                            className="form-input"
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            style={{ padding: '0.5rem', color: '#ef4444', background: 'transparent', border: '1px solid #ef4444', borderRadius: '0.375rem', cursor: 'pointer' }}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAdd}
                    style={{
                        padding: '0.5rem 1rem', border: '1px dashed #cbd5e1', borderRadius: '0.5rem',
                        color: 'var(--color-primary)', background: '#F8FAFC', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 500
                    }}
                >
                    <Plus size={16} /> Add Image URL
                </button>
            </div>
        </div>
    );
};

export default ImageArrayInput;
