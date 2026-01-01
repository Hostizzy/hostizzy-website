'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
const variants = {
    fadeUp: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    },
    fadeDown: {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 }
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    },
    fadeRight: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    },
    scaleDown: {
        hidden: { opacity: 0, scale: 1.2 },
        visible: { opacity: 1, scale: 1 }
    },
    rotateIn: {
        hidden: { opacity: 0, rotate: -10, scale: 0.9 },
        visible: { opacity: 1, rotate: 0, scale: 1 }
    },
    slideUp: {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 }
    }
};

const ScrollReveal = ({
    children,
    delay = 0,
    width = "100%",
    x = 0,
    y = 50,
    variant = "fadeUp",
    duration = 0.8,
    threshold = 0.1,
    triggerOnce = true
}) => {
    const [ref, inView] = useInView({
        triggerOnce,
        threshold
    });

    // Use custom x, y if provided, otherwise use variant
    const animation = variant && variants[variant]
        ? variants[variant]
        : { hidden: { opacity: 0, x, y }, visible: { opacity: 1, x: 0, y: 0 } };

    return (
        <div ref={ref} style={{ width, overflow: 'hidden' }}>
            <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={animation}
                transition={{ duration, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

// Additional scroll animation components
export const ScrollScale = ({ children, delay = 0 }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export const ScrollStagger = ({ children, staggerDelay = 0.1 }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.5 }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};

export const ParallaxScroll = ({ children, speed = 0.5 }) => {
    const [ref, inView] = useInView({ triggerOnce: false, threshold: 0 });
    const [scrollY, setScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            ref={ref}
            style={{
                transform: inView ? `translateY(${scrollY * speed}px)` : 'translateY(0)',
                transition: 'transform 0.1s ease-out'
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
