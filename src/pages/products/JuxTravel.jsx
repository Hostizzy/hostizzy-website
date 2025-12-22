import React from 'react';
import ProductPage from './ProductPage';

const JuxTravel = () => {
    return (
        <ProductPage
            title="JuxTravel Marketplace"
            badge="Demand Module"
            description="The next generation travel marketplace connecting luxury hosts with discerning guests through AI-powered recommendations."
            accentColor="#8b5cf6"
            stats={[
                { label: 'Direct Bookings', value: '30%+' },
                { label: 'AI Accuray', value: '94%' },
                { label: 'Market Reach', value: 'Global' }
            ]}
            features={[
                { title: 'AI Recommendations', desc: 'Personalized travel planning that matches guests to their perfect villa based on intent.' },
                { title: 'Lower Commissions', desc: 'A fairer marketplace that rewards high-quality hosts and repeat guests.' },
                { title: 'Community Trust', desc: 'Enterprise-grade KYC and guest vetting built into the core experience.' }
            ]}
            detailedInfo={[
                {
                    title: "Guest-Centric Experience",
                    content: "JuxTravel isn't just another listing site. It's an intelligent platform that learns guest preferences to simplify the search for luxury stays.",
                    bullets: ["Hyper-local experience bundles", "Verified owner listings", "Seamless payment gateway"]
                }
            ]}
        />
    );
};

export default JuxTravel;
