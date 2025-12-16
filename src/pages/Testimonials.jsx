import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Star, Quote, Loader } from 'lucide-react';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/testimonials')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load testimonials:", err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <SEO title="Testimonials - Hostizzy" description="What our guests and partners are saying." />
            <section className="section text-center bg-secondary">
                <div className="container">
                    <h1>What People Say</h1>
                    <p className="subtitle">Real stories from our community.</p>
                </div>
            </section>

            <section className="section container">
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                        <Loader className="animate-spin" size={32} color="var(--color-primary)" />
                    </div>
                ) : (
                    <div className="grid desktop-3-col" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {reviews.map(review => (
                            <div key={review.id} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <Quote size={32} color="var(--color-primary)" style={{ opacity: 0.3 }} />
                                <p style={{ fontStyle: 'italic', lineHeight: 1.6, flexGrow: 1 }}>"{review.text}"</p>

                                <div style={{ display: 'flex', gap: '0.25rem' }}>
                                    {[...Array(Number(review.rating) || 5)].map((_, i) => <Star key={i} size={16} fill="#FFD700" stroke="none" />)}
                                </div>

                                <div style={{ marginTop: '0.5rem' }}>
                                    <div style={{ fontWeight: 700 }}>{review.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{review.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default Testimonials;
