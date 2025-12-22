import React from 'react';
import ProductPage from './ProductPage';

const ResIQ = () => {
    return (
        <ProductPage
            title="ResIQ Analytics"
            badge="Intelligence Module"
            description="Intelligence that drives revenue. ResIQ provides property owners with transparent, real-time access to financial performance, occupancy trends, and future projections."
            accentColor="#FE5858"
            image="/products/resiq.png"
            stats={[
                { label: 'Revenue Accuracy', value: '100%' },
                { label: 'Active Keys', value: '450+' },
                { label: 'Real-time Sync', value: '<2s' }
            ]}
            features={[
                { title: 'Dynamic Revenue Reporting', desc: 'Real-time visibility into your earnings across all booking channels.' },
                { title: 'Occupancy Forecasting', desc: 'Predictive analytics to help you optimize seasons and nightly rates.' },
                { title: 'Channel Performance', desc: 'Detailed breakdown of where your guests come from (Airbnb, Booking.com, Direct).' }
            ]}
            detailedInfo={[
                {
                    title: "The 'Missing Middle' Solved",
                    content: "ResIQ bridges the gap between raw booking data and actionable business intelligence. We provide the transparency owners have always asked for.",
                    bullets: ["Real-time daily payouts tracking", "Automated commission calculations", "Historical performance comparison"]
                }
            ]}
        />
    );
};

export default ResIQ;
