import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { Calendar, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch blogs:", err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <SEO title="Blog - Hostizzy Insights" description="Expert insights on vacation rental management, Airbnb hosting tips, and travel trends." />

            <section className="section bg-secondary" style={{ padding: '6rem 0 4rem', textAlign: 'center' }}>
                <div className="container">
                    <ScrollReveal>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Hostizzy Insights</h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-muted)', fontSize: '1.2rem' }}>
                            Expert advice for property owners and travel enthusiasts.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                            <Loader className="animate-spin" size={32} color="var(--color-primary)" />
                        </div>
                    ) : (
                        <div className="grid desktop-2-col" style={{ gap: '2rem' }}>
                            {blogs.map((blog, i) => (
                                <ScrollReveal key={blog.id} delay={i * 0.1}>
                                    <div className="card" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                                            <motion.img
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.5 }}
                                                src={blog.image || '/images/hero.png'}
                                                alt={blog.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                                <Calendar size={16} />
                                                {new Date(blog.date).toLocaleDateString()}
                                            </div>
                                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: 1.3 }}>{blog.title}</h2>
                                            <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                                                {blog.excerpt}
                                            </p>
                                            <a href="#" className="btn-link" style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
                                                Read Article <ArrowRight size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Blogs;
