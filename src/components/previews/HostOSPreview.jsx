import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Calendar, Home, CheckCircle2, MoreHorizontal, Send, Shield, Zap } from 'lucide-react';

const HostOSPreview = () => {
    const [selectedView, setSelectedView] = useState('inbox'); // 'inbox', 'calendar', 'tasks'

    const messages = [
        { id: 1, sender: 'Sarah M.', platform: 'Airbnb', text: 'Hi! Is the pool heated for our stay next week?', time: '2m ago', unread: true },
        { id: 2, sender: 'Rahul K.', platform: 'Booking.com', text: 'Requested early check-in for 11:00 AM.', time: '1h ago', unread: false },
        { id: 3, sender: 'James Wilson', platform: 'Direct', text: 'The property was stunning, thank you!', time: 'yesterday', unread: false }
    ];

    const tasks = [
        { id: 1, task: 'Deep Clean - Villa Azure', status: 'In Progress', priority: 'High', worker: 'Elena R.' },
        { id: 2, task: 'Pool Maintenance', status: 'Scheduled', priority: 'Medium', worker: 'Sanjay S.' },
        { id: 3, task: 'Welcome Kit Restock', status: 'Pending', priority: 'Low', worker: 'Anita P.' }
    ];

    return (
        <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Context Navigation */}
            <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', marginBottom: '2rem' }}>
                {['inbox', 'calendar', 'tasks'].map(view => (
                    <button
                        key={view}
                        onClick={() => setSelectedView(view)}
                        style={{
                            padding: '1rem 1.5rem',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            border: 'none',
                            background: 'none',
                            color: selectedView === view ? 'var(--color-primary)' : '#94a3b8',
                            borderBottom: selectedView === view ? '2px solid var(--color-primary)' : '2px solid transparent',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {view}
                    </button>
                ))}
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                    {selectedView === 'inbox' && (
                        <motion.div
                            key="inbox"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Unified Inbox</h4>
                                <div style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', background: '#eff6ff', color: '#3b82f6', borderRadius: '100px', fontWeight: 800 }}>8 Channels Connected</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        style={{
                                            padding: '1.25rem',
                                            background: msg.unread ? '#fff' : '#f8fafc',
                                            border: msg.unread ? '1px solid var(--color-primary)' : '1px solid #e2e8f0',
                                            borderRadius: '1rem',
                                            display: 'flex',
                                            gap: '1rem',
                                            boxShadow: msg.unread ? '0 4px 12px rgba(254, 88, 88, 0.1)' : 'none'
                                        }}
                                    >
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white' }}>
                                            {msg.sender[0]}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                                                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{msg.sender} <span style={{ fontWeight: 500, color: '#94a3b8', marginLeft: '0.5rem', fontSize: '0.75rem' }}>via {msg.platform}</span></div>
                                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{msg.time}</div>
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{msg.text}</div>
                                        </div>
                                        {msg.unread && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', alignSelf: 'center' }}></div>}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Simulated Quick Reply */}
                            <div style={{ marginTop: 'auto', padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '1rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                    {['Template: Welcome', 'Template: Wifi', 'Template: Check-out'].map(t => (
                                        <span key={t} style={{ fontSize: '0.7rem', color: '#64748b', background: '#fff', border: '1px solid #e2e8f0', padding: '0.3rem 0.6rem', borderRadius: '0.5rem', cursor: 'pointer' }}>{t}</span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <input placeholder="Type a professional reply..." style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '0.9rem', outline: 'none' }} />
                                    <button style={{ background: 'var(--color-primary)', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}><Send size={16} /></button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {selectedView === 'calendar' && (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            style={{ height: '100%' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Master Availability</h4>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Shield size={18} style={{ color: '#22c55e' }} />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#22c55e' }}>Zero Double-Booking Protection Active</span>
                                </div>
                            </div>

                            {/* Dummy Calendar Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1px', background: '#e2e8f0', border: '1px solid #e2e8f0', borderRadius: '0.75rem', overflow: 'hidden' }}>
                                <div style={{ background: '#f8fafc', padding: '1rem', fontWeight: 800, fontSize: '0.75rem' }}>Property</div>
                                <div style={{ background: '#f8fafc', display: 'flex' }}>
                                    {[20, 21, 22, 23, 24, 25, 26].map(d => (
                                        <div key={d} style={{ flex: 1, textAlign: 'center', padding: '1rem', fontSize: '0.75rem', fontWeight: 800, borderLeft: '1px solid #e2e8f0' }}>Dec {d}</div>
                                    ))}
                                </div>

                                <div style={{ background: '#fff', padding: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>Villa Azure</div>
                                <div style={{ background: '#fff', position: 'relative', borderLeft: '1px solid #e2e8f0' }}>
                                    <div style={{ position: 'absolute', left: '10%', right: '35%', top: '20%', bottom: '20%', background: 'rgba(254, 88, 88, 0.15)', border: '1px solid var(--color-primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '0 0.5rem', fontSize: '0.65rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                        Booking: #8291 (Airbnb)
                                    </div>
                                    <div style={{ display: 'flex', height: '100%' }}>
                                        {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} style={{ flex: 1, borderLeft: i === 1 ? 'none' : '1px solid #f1f5f9' }}></div>)}
                                    </div>
                                </div>

                                <div style={{ background: '#fff', padding: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>Sky Loft</div>
                                <div style={{ background: '#fff', position: 'relative', borderLeft: '1px solid #e2e8f0' }}>
                                    <div style={{ position: 'absolute', left: '45%', right: '10%', top: '20%', bottom: '20%', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid #3b82f6', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '0 0.5rem', fontSize: '0.65rem', fontWeight: 800, color: '#3b82f6' }}>
                                        Booking: #8304 (Direct)
                                    </div>
                                    <div style={{ display: 'flex', height: '100%' }}>
                                        {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} style={{ flex: 1, borderLeft: i === 1 ? 'none' : '1px solid #f1f5f9' }}></div>)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {selectedView === 'tasks' && (
                        <motion.div
                            key="tasks"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>On-Ground Operations</h4>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <Zap size={16} fill="#f59e0b" color="#f59e0b" />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}>Auto-Dispatching Active</span>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {tasks.map((task, i) => (
                                    <div key={task.id} style={{ padding: '1.25rem', border: '1px solid #e2e8f0', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRadius: '0.75rem', color: '#475569' }}><CheckCircle2 size={18} /></div>
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{task.task}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Assignee: {task.worker}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <span style={{
                                                fontSize: '0.7rem',
                                                fontWeight: 800,
                                                padding: '0.3rem 0.6rem',
                                                borderRadius: '0.5rem',
                                                background: task.status === 'In Progress' ? '#dcfce7' : '#f1f5f9',
                                                color: task.status === 'In Progress' ? '#166534' : '#475569'
                                            }}>{task.status}</span>
                                            <MoreHorizontal size={18} color="#94a3b8" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HostOSPreview;
