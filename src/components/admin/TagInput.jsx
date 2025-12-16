import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const TagInput = ({ value = [], onChange, placeholder = "Add tag..." }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const addTag = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {value.map(tag => (
                    <span key={tag} style={{
                        background: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.75rem',
                        borderRadius: '999px', fontSize: '0.875rem', fontWeight: 500,
                        display: 'flex', alignItems: 'center', gap: '0.25rem'
                    }}>
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            style={{ border: 'none', background: 'transparent', color: 'inherit', padding: 0, cursor: 'pointer', display: 'flex' }}
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                />
                <button
                    type="button"
                    onClick={addTag}
                    style={{
                        padding: '0.5rem 1rem', background: '#f1f5f9', border: '1px solid #cbd5e1',
                        borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 600, color: '#475569'
                    }}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default TagInput;
