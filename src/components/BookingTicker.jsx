import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, User } from 'lucide-react';

const activities = [
    { type: 'booking', location: 'Manali', days: 4, name: 'Siddharth' },
    { type: 'review', rating: 5, location: 'Goa', name: 'Anya' },
    { type: 'booking', location: 'Shimla', days: 2, name: 'Rahul' },
    { type: 'inquiry', location: 'Mussoorie', name: 'Priya' },
    { type: 'booking', location: 'Lonavala', days: 3, name: 'Vikram' },
    { type: 'review', rating: 5, location: 'Kasauli', name: 'Meera' },
    { type: 'booking', location: 'Alibaug', days: 5, name: 'Kabir' }
];

const BookingTicker = () => {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % activities.length);
                setIsVisible(true);
            }, 600);
        }, 10000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    const activity = activities[index];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -50, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.4 } }}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        left: '2rem',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                >
                    <div className="glass" style={{
                        padding: '1rem 1.5rem',
                        borderRadius: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        backgroundColor: 'rgba(255,255,255,0.85)',
                        minWidth: '280px'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: activity.type === 'review' ? '#f59e0b' : 'var(--color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            flexShrink: 0
                        }}>
                            {activity.type === 'review' ? <Star size={20} fill="currentColor" /> : <ShoppingBag size={20} />}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-foreground)' }}>
                                {activity.name} {activity.type === 'booking' ? 'just booked!' : activity.type === 'review' ? 'left a 5★ review' : 'inquiring now...'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>
                                {activity.location} {activity.days ? `• ${activity.days} Nights` : ''}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookingTicker;
