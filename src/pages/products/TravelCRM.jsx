import React from 'react';
import ProductPage from './ProductPage';

const TravelCRM = () => {
    return (
        <ProductPage
            title="TravelCRM"
            badge="Relationship Module"
            description="Lead-to-booking conversion & guest relationship management. The 'Missing Middle' solution for lead leakage prevention."
            accentColor="#10b981"
            stats={[
                { label: 'Conversion Lift', value: '40%' },
                { label: 'Lead Retention', value: '100%' },
                { label: 'ROI Improvement', value: '20%+' }
            ]}
            features={[
                { title: 'Lead Pipeline', desc: 'Capture inquiries from WhatsApp, Website, and Marketplaces into one qualified funnel.' },
                { title: 'Guest Profiles', desc: 'Deep interaction history and stay preferences for personalized hospitality.' },
                { title: 'Automated Nurturing', desc: 'Post-stay follow-ups and loyalty campaigns that turn one-time guests into repeat stayers.' }
            ]}
            detailedInfo={[
                {
                    title: "Relationship Optimization",
                    content: "TravelCRM enables direct bookings by building lasting relationships with guests captured through marketplaces.",
                    bullets: ["Lead qualification workflows", "Lifetime value tracking", "Multi-channel interaction history"]
                }
            ]}
        />
    );
};

export default TravelCRM;
