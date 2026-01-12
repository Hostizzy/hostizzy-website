'use client';
import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, User, CreditCard, CheckCircle, ChevronLeft, Minus, Plus, Mail, Phone, Info } from 'lucide-react';
import { useToast } from './Toast';
import { format, differenceInDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const GuestSelector = ({ guests, setGuests }) => {
    const updateCount = (type, delta) => {
        setGuests(prev => ({
            ...prev,
            [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + delta)
        }));
    };

    const categories = [
        { key: 'adults', label: 'Adults', sub: 'Age 13+' },
        { key: 'children', label: 'Children', sub: 'Ages 2–12' },
        { key: 'infants', label: 'Infants', sub: 'Under 2' },
        { key: 'pets', label: 'Pets', sub: 'Bringing a service animal?' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {categories.map((cat) => (
                <div key={cat.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{cat.label}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{cat.sub}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            type="button"
                            onClick={() => updateCount(cat.key, -1)}
                            disabled={guests[cat.key] <= (cat.key === 'adults' ? 1 : 0)}
                            style={{ width: '32px', height: '32px', border: '1px solid #cbd5e1', borderRadius: '50%', background: 'none', cursor: 'pointer', opacity: guests[cat.key] <= (cat.key === 'adults' ? 1 : 0) ? 0.4 : 1 }}
                        >
                            <Minus size={16} />
                        </button>
                        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 600 }}>{guests[cat.key]}</span>
                        <button
                            type="button"
                            onClick={() => updateCount(cat.key, 1)}
                            style={{ width: '32px', height: '32px', border: '1px solid #cbd5e1', borderRadius: '50%', background: 'none', cursor: 'pointer' }}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const BookingModal = ({ isOpen, onClose, title, price, type }) => {
    const { addToast } = useToast();
    const [step, setStep] = useState(1); // 1: Selection, 2: Guest Info, 3: Review, 4: Success
    const [range, setRange] = useState({ from: undefined, to: undefined });
    const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
    const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '', purpose: 'vacation', message: '' });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const totalGuests = guests.adults + guests.children;
    const nightCount = range.from && range.to ? differenceInDays(range.to, range.from) : 0;
    const totalPrice = price && nightCount > 0 ? (parseInt(price.replace(/[^0-9]/g, '')) * nightCount) : 0;

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...personalInfo,
                    guests,
                    checkIn: range.from,
                    checkOut: range.to,
                    propertyTitle: title,
                    itemType: type,
                    totalPrice,
                    status: 'Inquiry'
                })
            });

            if (res.ok) {
                setStep(4);
                addToast(`Enquiry for ${title} submitted!`, "success");
            }
        } catch (err) {
            console.error(err);
            addToast("Failed to send enquiry", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
            backdropFilter: 'blur(8px)', padding: '1rem'
        }}>
            <style>
                {`
                    .rdp { --rdp-accent-color: var(--color-primary); --rdp-background-color: #f1f5f9; margin: 0; }
                    .rdp-day_selected { background-color: var(--color-primary) !important; color: white !important; }
                    .form-step { animation: fadeIn 0.4s ease-out; }
                    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                `}
            </style>
            <div style={{ background: 'white', borderRadius: '1.5rem', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }}>

                {/* Header */}
                <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {step > 1 && step < 4 && (
                            <button onClick={() => setStep(step - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '0.5rem', marginLeft: '-0.75rem' }}>
                                <ChevronLeft size={24} />
                            </button>
                        )}
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>
                            {step === 4 ? 'Enquiry Sent!' : step === 3 ? 'Review & Request' : step === 2 ? 'Guest Information' : `Book ${title}`}
                        </h3>
                    </div>
                    <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', color: '#64748b', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={20} />
                    </button>
                </div>

                <div style={{ overflowY: 'auto', flex: 1, padding: '2rem' }}>
                    <div className="form-step">
                        {step === 1 && (
                            <div className="grid desktop-2-col" style={{ gap: '3rem', alignItems: 'start' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CalendarIcon size={18} /> Select Dates
                                    </h4>
                                    <div style={{ background: '#f8fafc', borderRadius: '1rem', padding: '1rem', border: '1px solid #e2e8f0' }}>
                                        <DayPicker
                                            mode="range"
                                            selected={range}
                                            onSelect={setRange}
                                            numberOfMonths={1}
                                            disabled={{ before: new Date() }}
                                        />
                                    </div>
                                    <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                                        {range.from && range.to ? (
                                            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{format(range.from, 'MMM d')} – {format(range.to, 'MMM d')} ({nightCount} nights)</span>
                                        ) : 'Select check-in and check-out dates'}
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={18} /> Who's Coming?
                                    </h4>
                                    <div style={{ background: '#f8fafc', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
                                        <GuestSelector guests={guests} setGuests={setGuests} />
                                    </div>
                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!range.from || !range.to}
                                        className="btn btn-primary"
                                        style={{ width: '100%', marginTop: '2.5rem', py: '1rem', opacity: (!range.from || !range.to) ? 0.6 : 1 }}
                                    >
                                        Next Details
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1rem', color: '#1e293b' }}>Full Name</label>
                                        <input
                                            value={personalInfo.name}
                                            onChange={e => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                                            className="form-input"
                                            placeholder="John Doe"
                                            required
                                            style={{ padding: '1rem', fontSize: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', width: '100%' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1rem', color: '#1e293b' }}>Phone Number</label>
                                        <input
                                            value={personalInfo.phone}
                                            onChange={e => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                            className="form-input"
                                            placeholder="+91 98765 43210"
                                            required
                                            style={{ padding: '1rem', fontSize: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', width: '100%' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1rem', color: '#1e293b' }}>Email Address</label>
                                    <input
                                        value={personalInfo.email}
                                        onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                        className="form-input"
                                        placeholder="john@example.com"
                                        required
                                        style={{ padding: '1rem', fontSize: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', width: '100%' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1rem', color: '#1e293b' }}>Purpose of Visit</label>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {['vacation', 'work', 'event'].map(p => (
                                            <button
                                                key={p}
                                                type="button"
                                                onClick={() => setPersonalInfo({ ...personalInfo, purpose: p })}
                                                style={{
                                                    flex: 1, padding: '1rem', borderRadius: '0.75rem', border: '2px solid #e2e8f0',
                                                    background: personalInfo.purpose === p ? 'var(--color-primary)' : 'white',
                                                    color: personalInfo.purpose === p ? 'white' : '#64748b',
                                                    fontWeight: 600, textTransform: 'capitalize', cursor: 'pointer', transition: 'all 0.2s',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1rem', color: '#1e293b' }}>Message for Host</label>
                                    <textarea
                                        value={personalInfo.message}
                                        onChange={e => setPersonalInfo({ ...personalInfo, message: e.target.value })}
                                        rows={5}
                                        className="form-input"
                                        placeholder="Tell us about your trip..."
                                        style={{ padding: '1rem', fontSize: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', width: '100%', resize: 'vertical' }}
                                    ></textarea>
                                </div>
                                <button onClick={() => setStep(3)} className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', fontWeight: 600, borderRadius: '0.75rem' }}>Review Summary</button>
                            </div>
                        )}

                        {step === 3 && (
                            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                                <div style={{ background: '#f8fafc', borderRadius: '1.5rem', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                                    <h4 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Booking Summary</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                                            <span style={{ color: '#64748b' }}>Dates</span>
                                            <span style={{ fontWeight: 600 }}>{format(range.from, 'MMM d')} – {format(range.to, 'MMM d, yyyy')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                                            <span style={{ color: '#64748b' }}>Guests</span>
                                            <span style={{ fontWeight: 600 }}>{totalGuests} guest{totalGuests > 1 ? 's' : ''}{guests.pets > 0 ? `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}` : ''}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                                            <span style={{ color: '#64748b' }}>Purpose</span>
                                            <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{personalInfo.purpose}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem' }}>
                                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Estimated Total</span>
                                            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>₹{totalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', background: '#fffbeb', padding: '1rem', borderRadius: '1rem', border: '1px solid #fef3c7', color: '#92400e', fontSize: '0.9rem' }}>
                                    <Info size={18} style={{ flexShrink: 0 }} />
                                    <span>You won't be charged yet. We will review your request and contact you to confirm the booking.</span>
                                </div>
                                <button onClick={handleSubmit} disabled={loading} className="btn btn-primary" style={{ width: '100%', py: '1rem' }}>
                                    {loading ? 'Submitting...' : 'Request to Book'}
                                </button>
                            </div>
                        )}

                        {step === 4 && (
                            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                <div style={{ width: '100px', height: '100px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 2rem' }}>
                                    <CheckCircle size={50} />
                                </div>
                                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1e293b', fontWeight: 800 }}>Inquiry Received!</h2>
                                <p style={{ color: '#64748b', marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
                                    We've received your request for **{title}**. Our team will contact you shortly to finalize details.
                                </p>
                                <button onClick={onClose} className="btn btn-primary" style={{ width: '200px' }}>Close</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
