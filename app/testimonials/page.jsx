import React from 'react';
import { Star, Quote } from 'lucide-react';
import reviews from '../../server/data/testimonials.json';

// Server component on purpose. This page used to fetch /api/testimonials from
// the browser, so crawlers and link previews saw an empty shell — the reviews
// existed but were invisible to search. The data is a static JSON file in the
// repo, so importing it renders the real text into the HTML.
export default function Testimonials() {
    return (
        <>
            <section className="section text-center bg-secondary" style={{ padding: 'calc(var(--header-height) + 3rem) 0 4rem' }}>
                <div className="container">
                    <h1>What People Say</h1>
                    <p className="subtitle">Real stories from our community.</p>
                </div>
            </section>

            <section className="section container">
                <div className="grid desktop-3-col" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {reviews.map(review => (
                        <figure key={review.id} className="card" style={{ margin: 0, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Quote size={32} color="var(--color-primary)" style={{ opacity: 0.3 }} />
                            <blockquote style={{ margin: 0, fontStyle: 'italic', lineHeight: 1.6, flexGrow: 1 }}>
                                &ldquo;{review.text}&rdquo;
                            </blockquote>

                            <div style={{ display: 'flex', gap: '0.25rem' }} aria-label={`${Number(review.rating) || 5} out of 5 stars`}>
                                {[...Array(Number(review.rating) || 5)].map((_, i) => (
                                    <Star key={i} size={16} fill="#FFD700" stroke="none" aria-hidden="true" />
                                ))}
                            </div>

                            <figcaption style={{ marginTop: '0.5rem' }}>
                                <div style={{ fontWeight: 700 }}>{review.name}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{review.role}</div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>
        </>
    );
}
