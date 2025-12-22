import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { Calendar, MapPin, Clock, Users, Check, X, Star } from 'lucide-react';
import BookingModal from '../components/BookingModal';

const ExperienceDetails = () => {
    const { id } = useParams();
    const [exp, setExp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBookingOpen, setBookingOpen] = useState(false);

    useEffect(() => {
        fetch(`/api/experiences/${id}`)
            .then(res => res.json())
            .then(data => {
                setExp(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (loading) return <div className="section text-center">Loading experience...</div>;
    if (!exp || exp.error) return <div className="section text-center">Experience not found</div>;

    return (
        <>
            <SEO title={`${exp.title} - NextStop`} description={exp.description} />

            {/* Hero Section */}
            <section style={{
                height: '60vh',
                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${exp.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'end',
                paddingBottom: '4rem',
                color: 'white'
            }}>
                <div className="container">
                    <span style={{ background: 'var(--color-primary)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>NextStop Exclusive</span>
                    <h1 style={{ fontSize: '3.5rem', marginTop: '1rem', marginBottom: '0.5rem', maxWidth: '800px' }}>{exp.title}</h1>
                    <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>{exp.subtitle}</p>
                </div>
            </section>

            <div className="container section" style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', position: 'relative' }}>

                {/* Main */}
                <div style={{ flex: 2 }}>

                    {/* Quick Stats */}
                    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', background: '#f8fafc', borderRadius: '1rem', marginBottom: '3rem' }}>
                        <QuickStat icon={<Clock size={24} />} label="Duration" value={exp.duration} />
                        <QuickStat icon={<Calendar size={24} />} label="Dates" value={exp.dates} />
                        <QuickStat icon={<MapPin size={24} />} label="Location" value={exp.location} />
                        <QuickStat icon={<Users size={24} />} label="Group Size" value="12-20 People" />
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>About this trip</h2>
                        <p style={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#334155' }}>{exp.description}</p>
                    </div>

                    {/* Itinerary Timeline */}
                    {exp.itinerary && (
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Itinerary</h2>
                            <div style={{ paddingLeft: '1rem', borderLeft: '2px solid #e2e8f0' }}>
                                {exp.itinerary.map((day, i) => (
                                    <div key={i} style={{ marginBottom: '2rem', paddingLeft: '2rem', position: 'relative' }}>
                                        <div style={{
                                            position: 'absolute', left: '-11px', top: '0',
                                            width: '20px', height: '20px', background: 'var(--color-primary)',
                                            borderRadius: '50%', border: '4px solid white'
                                        }}></div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Day {day.day}: {day.title}</h4>
                                        <p style={{ color: '#64748b' }}>{day.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Inclusions */}
                    <div className="grid desktop-2-col" style={{ gap: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={20} color="green" /> What's Included</h3>
                            <ul style={{ listStyle: 'none' }}>
                                {exp.inclusions?.map((inc, i) => (
                                    <li key={i} style={{ marginBottom: '0.5rem', color: '#334155', display: 'flex', gap: '0.5rem' }}>
                                        <Check size={16} color="green" style={{ marginTop: '4px', flexShrink: 0 }} /> <span>{inc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><X size={20} color="red" /> What's Not Included</h3>
                            <ul style={{ listStyle: 'none' }}>
                                {exp.exclusions?.map((exc, i) => (
                                    <li key={i} style={{ marginBottom: '0.5rem', color: '#334155', display: 'flex', gap: '0.5rem' }}>
                                        <X size={16} color="red" style={{ marginTop: '4px', flexShrink: 0 }} /> <span>{exc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Sidebar */}
                <div style={{ flex: 1, position: 'sticky', top: '100px' }}>
                    <div className="card shadow-premium" style={{ padding: '2rem' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>₹{exp.price.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 400, color: '#64748b' }}>/ person</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1.5rem', color: '#64748b' }}>
                            <Star size={16} fill="var(--color-foreground)" color="var(--color-foreground)" /> <b>{exp.rating}</b> ({exp.reviews} reviews)
                        </div>

                        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.25rem' }}>Next Trip</p>
                            <p style={{ fontWeight: 600 }}>{exp.dates}</p>
                        </div>

                        <button onClick={() => setBookingOpen(true)} className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Book Now</button>
                        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>Limited spots available</p>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setBookingOpen(false)}
                title={exp.title}
                price={typeof exp.price === 'string' ? exp.price : `₹${exp.price}`}
                type="Experience"
            />
        </>
    );
};

const QuickStat = ({ icon, label, value }) => (
    <div>
        <div style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{icon}</div>
        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{label}</div>
        <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
);

export default ExperienceDetails;
