import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import { Calendar } from 'lucide-react';
import blogs from '../../server/data/blogs.json';

const formatDate = (value) =>
    new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

// Server component on purpose. This page used to fetch /api/blogs from the
// browser, so crawlers saw a header and nothing else. The posts are a static
// JSON file in the repo, so importing it puts the real copy in the HTML.
//
// Each post is short enough that a dedicated /blogs/[id] page would be thin
// content; the full text is rendered here instead, which is also why there is
// no longer a "Read Article" link pointing at "#".
export default function Blogs() {
    return (
        <>
            <section className="section bg-secondary" style={{ padding: 'calc(var(--header-height) + 3rem) 0 4rem', textAlign: 'center' }}>
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
                    <div className="grid desktop-2-col" style={{ gap: '2rem' }}>
                        {blogs.map((blog, i) => (
                            <ScrollReveal key={blog.id} delay={i * 0.1}>
                                <article
                                    id={`post-${blog.id}`}
                                    className="card"
                                    style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                                >
                                    <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                                        <img
                                            src={blog.image || '/images/hero.png'}
                                            alt={blog.title}
                                            width={1260}
                                            height={750}
                                            loading={i < 2 ? 'eager' : 'lazy'}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                            <Calendar size={16} aria-hidden="true" />
                                            <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                                        </div>
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: 1.3 }}>{blog.title}</h2>
                                        <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '1rem', fontWeight: 500 }}>
                                            {blog.excerpt}
                                        </p>
                                        <p style={{ color: 'var(--color-foreground)', lineHeight: 1.7, flexGrow: 1 }}>
                                            {blog.content}
                                        </p>
                                    </div>
                                </article>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
