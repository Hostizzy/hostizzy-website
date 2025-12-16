import React, { useState } from 'react';
import { X, Calendar, User, CreditCard, CheckCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, title, price, type }) => {
    const [step, setStep] = useState(1); // 1: Details, 2: Success
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...bookingData,
                    itemTitle: title,
                    itemType: type,
                    status: 'Inquiry' // Explicitly set as Inquiry
                })
            });

            if (res.ok) {
                setStep(2);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to send enquiry");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{ background: 'white', borderRadius: '1rem', width: '90%', maxWidth: '500px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                        {step === 2 ? 'Enquiry Sent!' : `Enquire about ${title}`}
                    </h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                    {step === 1 && (
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#475569' }}>Full Name</label>
                                <input required className="form-input" value={bookingData.name} onChange={e => setBookingData({ ...bookingData, name: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#475569' }}>Email</label>
                                <input required type="email" className="form-input" value={bookingData.email} onChange={e => setBookingData({ ...bookingData, email: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#475569' }}>Dates (Optional)</label>
                                <input type="date" className="form-input" value={bookingData.date} onChange={e => setBookingData({ ...bookingData, date: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#475569' }}>Message</label>
                                <textarea
                                    className="form-input"
                                    rows="3"
                                    placeholder="I'm interested in..."
                                    value={bookingData.message}
                                    onChange={e => setBookingData({ ...bookingData, message: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}
                                />
                            </div>

                            <button disabled={loading} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                {loading ? 'Sending...' : 'Send Enquiry'}
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{ width: '80px', height: '80px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 1.5rem' }}>
                                <CheckCircle size={40} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>Request Received!</h2>
                            <p style={{ color: '#64748b', marginBottom: '2rem' }}>We'll get back to you shortly regarding {title}.</p>
                            <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>Done</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
