import React from 'react';
import ProductPage from './ProductPage';

const HostOS = () => {
    return (
        <ProductPage
            title="HostOS Platform"
            badge="Operations Module"
            description="The central nervous system of hospitality. HostOS integrates every aspect of vacation rental management into one seamless interface."
            accentColor="#3b82f6"
            image="/products/hostos.png"
            stats={[
                { label: 'Daily Ops', value: '24/7' },
                { label: 'Guest Messages', value: '10k+' },
                { label: 'Task Completion', value: '99%' }
            ]}
            features={[
                { title: 'Unified Multi-Calendar', desc: 'Manage dozens of properties across 14+ channels from a single source of truth.' },
                { title: 'Automated Guest Messaging', desc: 'AI-enhanced templates and triggers that ensure guests never wait for a reply.' },
                { title: 'Maintenance & Vendor CRM', desc: 'Coordinate housekeeping and repairs with real-time status updates.' }
            ]}
            detailedInfo={[
                {
                    title: "Operational Excellence",
                    content: "From dynamic pricing to guest communications, HostOS performs the heavy lifting so you can focus on building guest relationships.",
                    bullets: ["Digital Welcome Books", "Smart Lock integrations", "Unified guest inbox"]
                }
            ]}
        />
    );
};

export default HostOS;
