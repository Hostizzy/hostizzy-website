'use client';
import React, { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const InstagramFeed = () => {
    const { settings } = useSettings();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/social/instagram')
            .then(res => res.json())
            .then(setPosts)
            .catch(err => console.error("Failed to load insta feed:", err));
    }, []);

    if (posts.length === 0) return null;

    return (
        <section className="section bg-white">
            <div className="container text-center">
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#E1306C' }}>
                        <Instagram size={28} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Follow Us on Instagram</h2>
                    <p className="subtitle">@hostizzy_official</p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0' }}>
                    {posts.slice(0, 6).map(post => (
                        <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '1/1', background: '#e2e8f0' }} className="group">
                            <img
                                src={post.image}
                                alt={post.caption || "Instagram Post"}
                                loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                className="group-hover:scale-110"
                            />
                            <div style={{
                                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                opacity: 0, transition: 'opacity 0.3s', color: 'white', padding: '1rem'
                            }} className="group-hover:opacity-100">
                                <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{post.caption}</p>
                            </div>
                        </a>
                    ))}
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Instagram size={18} /> View More on Instagram
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InstagramFeed;
