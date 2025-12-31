'use client';

import React, { useState, useEffect } from 'react';
import SEO from '../../../components/SEO';
import ScrollReveal from '../../../components/ScrollReveal';
import { Star, MapPin, Share, Heart, Check, Calendar, Shield, Coffee, Wifi, Car, Utensils } from 'lucide-react';
import BookingModal from '../../../components/BookingModal';

export default function PropertyDetails({ params }) {
    const { id } = params; // Next.js dynamic route params
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBookingOpen, setBookingOpen] = useState(false);

    useEffect(() => {
        fetch(`/api/properties/${id}`)
            .then(res => res.json())
            .then(data => {
                setProperty(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (loading) return <div className="section text-center">Loading...</div>;
    if (!property || property.error) return <div className="section text-center">Property not found</div>;

    // Helper for icons
    const getIcon = (name) => {
        const map = { 'Wi-Fi': <Wifi size={18} />, 'Kitchen': <Utensils size={18} />, 'Parking': <Car size={18} />, 'Breakfast': <Coffee size={18} /> };
        return map[name] || <Check size={18} />;
    };

    return (
        <>
            <SEO title={`${property.title} - Hostizzy`} description={property.description} />

            {/* Gallery Grid */}
            <div className="container" style={{ paddingTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{property.title}</h1>
                        <div style={{ display: 'flex', gap: '1rem', color: '#64748b', fontSize: '0.95rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'underline', fontWeight: 600, color: 'var(--color-foreground)' }}><Star size={16} fill="var(--color-foreground)" /> {property.rating} · {property.reviews} reviews</span>
                            <span>{property.location}</span>
                            {property.superhost && <span style={{ color: '#64748b' }}>· Superhost</span>}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}><Share size={16} style={{ marginRight: '0.5rem' }} /> Share</button>
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}><Heart size={16} style={{ marginRight: '0.5rem' }} /> Save</button>
                    </div>
                </div>

                <div className="grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    gridTemplateRows: '250px 250px',
                    gap: '0.5rem',
                    borderRadius: '1.5rem',
                    overflow: 'hidden'
                }}>
                    <img src={property.image} style={{ gridRow: 'span 2', height: '100%', width: '100%', objectFit: 'cover' }} alt="Main" />
                    {property.gallery && property.gallery.slice(0, 4).map((img, i) => (
                        <img key={i} src={img} style={{ height: '100%', width: '100%', objectFit: 'cover' }} alt={`Gallery ${i}`} />
                    ))}
                </div>
            </div>

            <div className="container section" style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', position: 'relative' }}>

                {/* Main Content */}
                <div style={{ flex: 2 }}>
                    <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{property.type} hosted by Hostizzy</h2>
                        <p style={{ color: '#64748b' }}>{property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms || Math.ceil(property.guests / 2)} bathrooms</p>
                    </div>

                    <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ paddingTop: '4px' }}><Shield size={24} /></div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Self check-in</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Check yourself in with the keypad.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ paddingTop: '4px' }}><Calendar size={24} /></div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Free cancellation for 48 hours</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Get a full refund if you change your mind.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About this place</h2>
                        <p style={{ lineHeight: 1.7, color: '#334155' }}>
                            {property.description}
                        </p>
                    </div>

                    <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>What this place offers</h2>
                        <div className="grid desktop-2-col" style={{ gap: '1rem' }}>
                            {property.amenities_grouped ? (
                                Object.entries(property.amenities_grouped).map(([category, items]) => (
                                    <div key={category}>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#64748b' }}>{category}</h4>
                                        <ul style={{ listStyle: 'none' }}>
                                            {items.map(item => (
                                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: '#334155' }}>
                                                    {getIcon(item)} {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                // Fallback for old data
                                <ul style={{ listStyle: 'none' }}>
                                    {property.amenities?.map(item => (
                                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: '#334155' }}>
                                            {getIcon(item)} {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* House Rules & Policies */}
                    {property.house_rules && (
                        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Things to know</h2>
                            <div className="grid desktop-2-col">
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>House Rules</h4>
                                    <ul style={{ listStyle: 'none', color: '#334155' }}>
                                        {property.house_rules.map((rule, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>· {rule}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Cancellation Policy</h4>
                                    <p style={{ color: '#334155', fontSize: '0.95rem' }}>{property.cancellation_policy}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Sticky Booking Card */}
                <div style={{ flex: 1, position: 'sticky', top: '100px' }}>
                    <div className="card shadow-premium" style={{ padding: '1.5rem', border: '1px solid rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div><span style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹{property.price.toLocaleString()}</span> <span style={{ color: '#64748b' }}>night</span></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}><Star size={14} fill="var(--color-foreground)" /> <span>{property.rating}</span></div>
                        </div>

                        <div style={{ border: '1px solid #cbd5e1', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1' }}>
                                <div style={{ flex: 1, padding: '0.75rem', borderRight: '1px solid #cbd5e1' }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Check-in</div>
                                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Add date</div>
                                </div>
                                <div style={{ flex: 1, padding: '0.75rem' }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Check-out</div>
                                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Add date</div>
                                </div>
                            </div>
                            <div style={{ padding: '0.75rem' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Guests</div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>1 guest</div>
                            </div>
                        </div>

                        <button onClick={() => setBookingOpen(true)} className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', padding: '1rem', fontSize: '1rem' }}>Reserve</button>
                        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>You won't be charged yet</p>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setBookingOpen(false)}
                title={property.title}
                price={typeof property.price === 'string' ? property.price : `₹${property.price}`}
                type="Property"
            />
        </>
    );
}
