'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Building2, TrendingUp, Users, Star } from 'lucide-react';

const TrustMetrics = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3
    });

    const metrics = [
        {
            icon: Building2,
            value: 50,
            suffix: '+',
            label: 'Properties Managed',
            color: '#3b82f6'
        },
        {
            icon: TrendingUp,
            value: 15,
            prefix: '₹',
            suffix: 'Cr+',
            label: 'Revenue Generated',
            color: '#22c55e'
        },
        {
            icon: Users,
            value: 40000,
            suffix: '+',
            label: 'Happy Guests',
            color: '#f59e0b',
            format: (val) => val.toLocaleString()
        },
        {
            icon: Star,
            value: 4.9,
            suffix: '★',
            label: 'Average Rating',
            color: '#FE5858',
            decimals: 1
        }
    ];

    return (
        <section className="section bg-secondary" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="container">
                <div
                    ref={ref}
                    className="grid desktop-4-col tablet-2-col"
                    style={{ gap: '2rem' }}
                >
                    {metrics.map((metric, index) => (
                        <MetricCard
                            key={index}
                            metric={metric}
                            inView={inView}
                            delay={index * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const MetricCard = ({ metric, inView, delay }) => {
    const [count, setCount] = useState(0);
    const Icon = metric.icon;

    useEffect(() => {
        if (!inView) return;

        const timeout = setTimeout(() => {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepValue = metric.value / steps;
            const stepDuration = duration / steps;
            let currentStep = 0;

            const interval = setInterval(() => {
                currentStep++;
                if (currentStep <= steps) {
                    setCount(stepValue * currentStep);
                } else {
                    setCount(metric.value);
                    clearInterval(interval);
                }
            }, stepDuration);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [inView, metric.value, delay]);

    const formatValue = () => {
        if (metric.format) {
            return metric.format(Math.floor(count));
        }
        if (metric.decimals) {
            return count.toFixed(metric.decimals);
        }
        return Math.floor(count).toLocaleString();
    };

    return (
        <div
            className="card"
            style={{
                padding: '2.5rem 2rem',
                textAlign: 'center',
                background: 'white',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
                cursor: 'default'
            }}
        >
            {/* Icon */}
            <div
                style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 1.5rem',
                    background: `${metric.color}15`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Icon size={32} color={metric.color} strokeWidth={2} />
            </div>

            {/* Animated Number */}
            <div style={{ marginBottom: '0.75rem' }}>
                <span
                    style={{
                        fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                        fontWeight: 800,
                        color: metric.color,
                        lineHeight: 1,
                        fontFamily: 'var(--font-display)'
                    }}
                >
                    {metric.prefix}{formatValue()}{metric.suffix}
                </span>
            </div>

            {/* Label */}
            <div
                style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}
            >
                {metric.label}
            </div>
        </div>
    );
};

export default TrustMetrics;
