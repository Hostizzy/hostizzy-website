'use client';
import React from 'react';
import { CalendarCheck, TrendingUp, MessageSquare, Briefcase, ShieldCheck, BarChart3 } from 'lucide-react';

const services = [
    {
        icon: <CalendarCheck size={32} />,
        title: "Booking Management",
        description: "Efficient and responsive booking handling that keeps your calendar full and your guests happy."
    },
    {
        icon: <TrendingUp size={32} />,
        title: "Property Optimization",
        description: "From stunning photography to appealing descriptions, we ensure your property looks its best."
    },
    {
        icon: <MessageSquare size={32} />,
        title: "Guest Communication",
        description: "We handle all guest interactions from inquiry to checkout, ensuring smooth stays with high guest satisfaction."
    },
    {
        icon: <Briefcase size={32} />,
        title: "Property Maintenance",
        description: "Meticulous attention to detail in keeping your property pristine and welcoming at all times."
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Trust & Safety",
        description: "Guests can book and stay with confidence, knowing they are in good hands with Hostizzy’s quality assurance."
    },
    {
        icon: <BarChart3 size={32} />,
        title: "Performance Reporting",
        description: "Regular and detailed reports on your property’s performance, helping you make informed decisions."
    }
];

const Services = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>What Hostizzy Offers</h2>
                    <p style={{ color: 'var(--color-muted)', fontSize: '1.125rem' }}>Comprehensive solutions for modern property management</p>
                </div>

                <div className="grid desktop-3-col" style={{ gap: '2.5rem' }}>
                    {services.map((service, index) => (
                        <div key={index} className="card" style={{ padding: '2.5rem' }}>

                            <div style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: 'var(--color-secondary)',
                                color: 'var(--color-primary)',
                                borderRadius: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                {service.icon}
                            </div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{service.title}</h3>
                            <p style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
