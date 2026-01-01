'use client';

import React from 'react';

// Base Skeleton component
export const Skeleton = ({ width = '100%', height = '20px', borderRadius = '4px', style = {} }) => {
    return (
        <div
            className="skeleton"
            style={{
                width,
                height,
                borderRadius,
                backgroundColor: '#e2e8f0',
                position: 'relative',
                overflow: 'hidden',
                ...style
            }}
        >
            <div className="skeleton-shimmer"></div>
        </div>
    );
};

// Property Card Skeleton
export const PropertyCardSkeleton = () => {
    return (
        <div className="card" style={{ overflow: 'hidden' }}>
            <Skeleton height="240px" borderRadius="1.5rem 1.5rem 0 0" />
            <div style={{ padding: '1.5rem' }}>
                <Skeleton width="70%" height="24px" style={{ marginBottom: '0.75rem' }} />
                <Skeleton width="40%" height="18px" style={{ marginBottom: '1rem' }} />
                <Skeleton width="100%" height="16px" style={{ marginBottom: '0.5rem' }} />
                <Skeleton width="90%" height="16px" style={{ marginBottom: '1.5rem' }} />
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <Skeleton width="60px" height="28px" borderRadius="12px" />
                    <Skeleton width="60px" height="28px" borderRadius="12px" />
                    <Skeleton width="60px" height="28px" borderRadius="12px" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton width="80px" height="28px" />
                    <Skeleton width="100px" height="40px" borderRadius="20px" />
                </div>
            </div>
        </div>
    );
};

// Experience Card Skeleton
export const ExperienceCardSkeleton = () => {
    return (
        <div className="card" style={{ overflow: 'hidden' }}>
            <Skeleton height="300px" borderRadius="1.5rem 1.5rem 0 0" />
            <div style={{ padding: '2rem' }}>
                <Skeleton width="50%" height="20px" style={{ marginBottom: '1rem' }} />
                <Skeleton width="80%" height="28px" style={{ marginBottom: '1rem' }} />
                <Skeleton width="100%" height="16px" style={{ marginBottom: '0.5rem' }} />
                <Skeleton width="95%" height="16px" style={{ marginBottom: '1.5rem' }} />
                <Skeleton width="120px" height="40px" borderRadius="20px" />
            </div>
        </div>
    );
};

// Feature Card Skeleton (for "Why Choose Us" sections)
export const FeatureCardSkeleton = () => {
    return (
        <div className="card card-feature" style={{ padding: '2.5rem' }}>
            <Skeleton width="48px" height="48px" borderRadius="12px" style={{ marginBottom: '1.5rem' }} />
            <Skeleton width="70%" height="24px" style={{ marginBottom: '1rem' }} />
            <Skeleton width="100%" height="16px" style={{ marginBottom: '0.5rem' }} />
            <Skeleton width="90%" height="16px" />
        </div>
    );
};

// Testimonial Card Skeleton
export const TestimonialCardSkeleton = () => {
    return (
        <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Skeleton width="60px" height="60px" borderRadius="50%" />
                <div style={{ flex: 1 }}>
                    <Skeleton width="150px" height="20px" style={{ marginBottom: '0.5rem' }} />
                    <Skeleton width="100px" height="16px" />
                </div>
            </div>
            <Skeleton width="100%" height="16px" style={{ marginBottom: '0.5rem' }} />
            <Skeleton width="100%" height="16px" style={{ marginBottom: '0.5rem' }} />
            <Skeleton width="80%" height="16px" />
        </div>
    );
};

// List Item Skeleton (for blog posts, job openings, etc.)
export const ListItemSkeleton = () => {
    return (
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <Skeleton width="60%" height="24px" style={{ marginBottom: '0.75rem' }} />
            <Skeleton width="100%" height="16px" style={{ marginBottom: '0.5rem' }} />
            <Skeleton width="90%" height="16px" style={{ marginBottom: '1rem' }} />
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Skeleton width="80px" height="32px" borderRadius="16px" />
                <Skeleton width="100px" height="32px" borderRadius="16px" />
            </div>
        </div>
    );
};

// Table Row Skeleton (for admin panels, data tables)
export const TableRowSkeleton = () => {
    return (
        <tr>
            <td style={{ padding: '1rem' }}><Skeleton width="100%" height="20px" /></td>
            <td style={{ padding: '1rem' }}><Skeleton width="100%" height="20px" /></td>
            <td style={{ padding: '1rem' }}><Skeleton width="100%" height="20px" /></td>
            <td style={{ padding: '1rem' }}><Skeleton width="80px" height="32px" borderRadius="16px" /></td>
        </tr>
    );
};

export default Skeleton;
