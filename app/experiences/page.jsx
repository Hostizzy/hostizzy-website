'use client';

import React, { useState, useEffect } from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import { Star, Clock, Zap, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Experiences() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/experiences')
            .then(res => res.json())
            .then(data => {
                setExperiences(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <section className="section bg-secondary" style={{ padding: '6rem 0 4rem' }}>
                <div className="container text-center">
                    <ScrollReveal>
                        <div className="badge badge-outline" style={{ marginBottom: '1rem', background: 'white' }}>NextStop by Hostizzy</div>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                            Travel Better, <span className="text-primary">Together</span>
                        </h1>
                        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.2rem', color: '#64748b', lineHeight: 1.6 }}>
                            <b>NextStop</b> is our signature experiential travel division. We curate small-group trips for like-minded travelers who crave more than just sightseeing.
                            Expect boutique stays, offbeat itineraries, and a community of friends you haven't met yet.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="section" style={{ background: '#f5f5f5', minHeight: '60vh' }}>
                <div className="container">
                    {loading ? (
                        <div className="text-center" style={{ padding: '4rem' }}>Loading experiences...</div>
                    ) : (
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                            {experiences.map((exp, i) => (
                                <ScrollReveal key={exp.id} delay={i * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            background: 'white',
                                            borderRadius: '1rem',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            position: 'relative',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {/* Image Header */}
                                        <div style={{ height: '200px', position: 'relative' }}>
                                            <img src={exp.image} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{
                                                position: 'absolute',
                                                top: '1rem',
                                                left: '1rem',
                                                background: '#ff5722', // Klook Orange-ish
                                                color: 'white',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <Zap size={12} fill="white" /> Bestseller
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem', display: 'flex', gap: '1rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {exp.duration}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {exp.location}</span>
                                            </div>

                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.4, flex: 1 }}>{exp.title}</h3>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                                                <Star size={16} fill="#fbbf24" color="#fbbf24" />
                                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{exp.rating}</span>
                                                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>({exp.reviews})</span>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>From</span>
                                                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>₹{exp.price.toLocaleString()}</span>
                                                </div>
                                                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', borderRadius: '0.5rem' }}>
                                                    Book <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
