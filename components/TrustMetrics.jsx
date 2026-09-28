'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Building2, TrendingUp, Users, Star } from 'lucide-react';
import { REVIEW_RATING, REVIEW_COUNT, REVIEWS_UPDATED } from '@/lib/reviews';

const TrustMetrics = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3
    });

    const metrics = [
        {
            icon: Building2,
            value: 45,
            suffix: '+',
            label: 'Properties Managed',
            color: '#3b82f6'
        },
        {
            icon: TrendingUp,
            value: 12,
            prefix: '₹',
            suffix: 'Cr+',
            label: 'GMV',
            color: '#22c55e'
        },
        {
            icon: Users,
            value: 30000,
            suffix: '+',
            label: 'Happy Guests',
            color: '#f59e0b',
            format: (val) => val.toLocaleString()
        },
        {
            // The precise figure, not a rounded one, because it is attributed
            // in the source line below the grid. HostSuite production, Sep 2026:
            // Airbnb 238 @ 4.87, MakeMyTrip 14 @ 4.93, Google 1 @ 5.0 = 253 @ 4.87.
            icon: Star,
            value: REVIEW_RATING,
            suffix: '★',
            label: 'Average Rating',
            color: '#FE5858',
            decimals: 2
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

                {/* Attribution for the rating. A published average needs to say
                    what it is an average of — and this one cannot go in
                    aggregateRating schema (see the note in app/layout.jsx), so
                    visible text credited to the platforms is the way it is
                    shown. "Last updated" describes when the figure was
                    compiled, not how recent the reviews are: the Airbnb import
                    currently runs to April 2026, so the true count is higher. */}
                <p style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.6
                }}>
                    Average rating based on {REVIEW_COUNT} guest reviews across Airbnb, MakeMyTrip and Google.
                    Last updated {REVIEWS_UPDATED}.
                </p>
            </div>
        </section>
    );
};

const MetricCard = ({ metric, inView, delay }) => {
    // Start at the real figure, not zero. Server render, no-JS, crawlers, link
    // previews and slow devices all see the true number; the count-up only
    // replays it for people whose browser actually runs the animation.
    const [count, setCount] = useState(metric.value);
    const Icon = metric.icon;

    useEffect(() => {
        if (!inView) return;
        if (typeof window === 'undefined') return;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

        setCount(0);
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
