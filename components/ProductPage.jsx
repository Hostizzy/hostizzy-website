'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const ProductPage = ({
    title,
    badge,
    description,
    features,
    image,
    stats,
    accentColor = 'var(--color-primary)',
    detailedInfo = []
}) => {
    return (
        <>
            {/* Hero Section */}
            <section style={{
                padding: '10rem 0 6rem',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container grid desktop-2-col" style={{ alignItems: 'center', gap: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="badge mb-sm" style={{ background: 'white', color: accentColor, fontWeight: 700 }}>{badge}</div>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a', lineHeight: 1.1 }}>{title}</h1>
                        <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '2.5rem', lineHeight: 1.6 }}>{description}</p>
                        <div style={{ display: 'flex', gap: '1.25rem' }}>
                            <button className="btn btn-primary" style={{ background: accentColor, padding: '1rem 2rem' }}>Request Demo</button>
                            <button className="btn" style={{ padding: '1rem 2rem', background: 'white' }}>Documentation</button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ position: 'relative' }}
                    >
                        {image ? (
                            <img
                                src={image}
                                alt={title}
                                style={{
                                    width: '100%',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 50px 100px -20px rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.8)'
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                aspectRatio: '16/10',
                                background: '#1e293b',
                                borderRadius: '1.5rem',
                                display: 'grid',
                                placeItems: 'center',
                                color: 'white',
                                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.2)'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', fontWeight: 800 }}>{title}</div>
                                    <div style={{ opacity: 0.6 }}>Interface Preview</div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Stats Sidebar/Bottom */}
            <section style={{ padding: '4rem 0', background: 'white', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap' }}>
                        {stats.map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>{stat.value}</div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Features */}
            <section className="section container">
                <div className="text-center mb-xl">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Core Capabilities</h2>
                </div>
                <div className="grid desktop-3-col" style={{ gap: '2rem' }}>
                    {features.map((feature, i) => (
                        <div key={i} className="card" style={{ padding: '2rem', border: '1px solid #f1f5f9', background: '#f8fafc' }}>
                            <div style={{ background: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'grid', placeItems: 'center', marginBottom: '1.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                                <Check size={20} color={accentColor} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>{feature.title}</h3>
                            <p style={{ color: '#64748b', lineHeight: 1.6 }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* In-depth Row */}
            {detailedInfo.map((info, i) => (
                <section key={i} style={{ padding: '6rem 0', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                    <div className="container">
                        <div className="grid desktop-2-col" style={{ alignItems: 'center', gap: '4rem' }}>
                            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>{info.title}</h2>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: 1.7, marginBottom: '2rem' }}>{info.content}</p>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {info.bullets.map((b, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                                            <div style={{ width: '6px', height: '6px', background: accentColor, borderRadius: '50%' }}></div>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                                <div style={{
                                    aspectRatio: '16/10',
                                    background: '#fff',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 30px 60px -12px rgba(0,0,0,0.1)',
                                    border: '1px solid #e2e8f0',
                                    display: 'grid',
                                    placeItems: 'center'
                                }}>
                                    <div style={{ color: '#cbd5e1', fontWeight: 700 }}>{info.title} Visual</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* CTA */}
            <section style={{ padding: '6rem 0', background: '#0f172a', color: 'white' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Ready to Scale Your Property Business?</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Experience how {title} can transform your operations. Schedule a personalized walkthrough today.
                    </p>
                    <button className="btn btn-primary" style={{ background: accentColor, padding: '1.25rem 3rem', fontSize: '1.1rem' }}>Book a Demo <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} /></button>
                </div>
            </section>
        </>
    );
};

export default ProductPage;
