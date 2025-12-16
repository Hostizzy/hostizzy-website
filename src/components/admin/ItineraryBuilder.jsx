import React from 'react';
import { Plus, Trash2, GripVertical, Calendar } from 'lucide-react';

const ItineraryBuilder = ({ value = [], onChange }) => {
    // value is array of { day: number, title: string, desc: string }

    const handleAdd = () => {
        onChange([
            ...value,
            { day: value.length + 1, title: '', desc: '' }
        ]);
    };

    const handleRemove = (index) => {
        const newValue = value.filter((_, i) => i !== index);
        // Re-index days
        const reindexed = newValue.map((item, i) => ({ ...item, day: i + 1 }));
        onChange(reindexed);
    };

    const handleChange = (index, field, val) => {
        const newValue = [...value];
        newValue[index] = { ...newValue[index], [field]: val };
        onChange(newValue);
    };

    return (
        <div className="space-y-4">
            {value.map((item, index) => (
                <div key={index} style={{
                    display: 'flex', gap: '1rem', padding: '1rem',
                    background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem',
                    alignItems: 'flex-start'
                }}>
                    <div style={{
                        width: '40px', height: '40px', background: 'var(--color-primary)', color: 'white',
                        borderRadius: '0.5rem', display: 'grid', placeItems: 'center', fontWeight: 'bold', flexShrink: 0
                    }}>
                        {item.day}
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                            placeholder="Day Title (e.g., Arrival & Welcome)"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontWeight: 600 }}
                        />
                        <textarea
                            value={item.desc}
                            onChange={(e) => handleChange(index, 'desc', e.target.value)}
                            placeholder="Description of activities..."
                            rows={3}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', resize: 'vertical' }}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        style={{ padding: '0.5rem', color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        title="Remove Day"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAdd}
                style={{
                    width: '100%', padding: '0.75rem', border: '1px dashed #cbd5e1', borderRadius: '0.5rem',
                    color: 'var(--color-primary)', background: '#F8FAFC', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600
                }}
            >
                <Plus size={18} /> Add Day {value.length + 1}
            </button>
        </div>
    );
};

export default ItineraryBuilder;
