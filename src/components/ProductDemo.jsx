import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, BarChart, Server, Activity, Monitor } from 'lucide-react';
import ResIQPreview from './previews/ResIQPreview';
import HostOSPreview from './previews/HostOSPreview';

const ProductDemo = () => {
    const [activeTab, setActiveTab] = useState('hostos');

    const tabs = [
        { id: 'hostos', label: 'HostOS', icon: <Server size={18} />, desc: 'Operations & Property Management' },
        { id: 'resiq', label: 'ResIQ', icon: <Activity size={18} />, desc: 'Analytics & Revenue Optimization' }
    ];

    return (
        <section className="product-demo-section" style={{ padding: '2rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>Live Simulation</div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Test-Drive Our Ecosystem</h2>
                    <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        Experience the power of our vertically integrated stack. Switch between tools to see how they connect.
                    </p>
                </div>

                <div className="product-demo-container" style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    background: '#fff',
                    borderRadius: '2rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0'
                }}>
                    {/* Fake Browser Top Bar */}
                    <div style={{
                        background: '#f8fafc',
                        padding: '1rem 1.5rem',
                        borderBottom: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                        </div>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: '#fff',
                            padding: '0.4rem 2rem',
                            borderRadius: '100px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <Monitor size={14} /> app.hostizzy.io
                        </div>
                        <div style={{ width: '50px' }}></div>
                    </div>

                    {/* Content Area */}
                    <div className="grid desktop-12-col" style={{ gridTemplateColumns: '300px 1fr', minHeight: '650px' }}>
                        {/* Sidebar Navigation */}
                        <div style={{
                            background: '#f1f5f9',
                            borderRight: '1px solid #e2e8f0',
                            padding: '2rem 1.5rem'
                        }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>Platform Suite</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                padding: '1rem',
                                                borderRadius: '1rem',
                                                border: 'none',
                                                background: activeTab === tab.id ? '#fff' : 'transparent',
                                                color: activeTab === tab.id ? 'var(--color-primary)' : '#475569',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                transition: 'all 0.3s ease',
                                                boxShadow: activeTab === tab.id ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                                            }}
                                        >
                                            <div style={{
                                                background: activeTab === tab.id ? 'rgba(254, 88, 88, 0.1)' : '#cbd5e1',
                                                padding: '0.6rem',
                                                borderRadius: '0.75rem',
                                                color: activeTab === tab.id ? 'var(--color-primary)' : '#fff'
                                            }}>
                                                {tab.icon}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: '1rem' }}>{tab.label}</div>
                                                <div style={{ fontSize: '0.7rem', opacity: 0.7, lineHeight: 1.2, marginTop: '2px' }}>{tab.id === 'hostos' ? 'Operations' : 'Analytics'}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                                <div style={{
                                    padding: '1.5rem',
                                    background: 'var(--color-primary)',
                                    borderRadius: '1.5rem',
                                    color: 'white',
                                    boxShadow: '0 20px 25px -5px rgba(254, 88, 88, 0.3)'
                                }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Want a live tour?</h4>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '1.5rem', lineHeight: 1.5 }}>Our experts can show you how this scales for your specific portfolio.</p>
                                    <button style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'white',
                                        color: 'var(--color-primary)',
                                        border: 'none',
                                        borderRadius: '0.75rem',
                                        fontWeight: 800,
                                        fontSize: '0.9rem',
                                        cursor: 'pointer'
                                    }}>Book Strategy Call</button>
                                </div>
                            </div>
                        </div>

                        {/* Simulator Content */}
                        <div style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, scale: 0.98, x: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 1.02, x: -20 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ height: '100%' }}
                                >
                                    {activeTab === 'hostos' ? <HostOSPreview /> : <ResIQPreview />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDemo;
