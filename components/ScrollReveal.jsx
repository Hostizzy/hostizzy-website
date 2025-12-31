'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollReveal = ({ children, delay = 0, width = "100%", x = 0, y = 50 }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <div ref={ref} style={{ width, overflow: 'hidden' }}>
            <motion.div
                initial={{ opacity: 0, x, y }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
                transition={{ duration: 0.8, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
