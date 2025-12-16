import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingConcierge = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="glass"
                        style={{
                            marginBottom: '1rem',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            width: '300px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h4 style={{ fontWeight: 600 }}>Hostizzy Concierge</h4>
                            <button onClick={() => setIsOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={16} /></button>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                            Hi there! 👋 Needs details on a property or management? We're here 24/7.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #cbd5e1',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <button className="btn btn-primary" style={{ padding: '0.5rem' }}>
                                <Send size={16} />
                            </button>
                        </div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>
                            Typically replies in 2 mins
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-primary"
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 15px -3px rgba(3, 105, 161, 0.3)'
                }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
};

export default FloatingConcierge;
