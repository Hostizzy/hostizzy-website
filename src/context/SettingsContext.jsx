import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        siteName: 'Hostizzy',
        logoUrl: '/images/logo.jpg',
        supportEmail: 'stay@hostizzy.com',
        supportPhone: '+91 95604 94001',
        footerTagline: "India's leading vacation rental management firm. We transform properties into premium hospitality brands.",
        instagramUrl: 'https://www.instagram.com/hostizy/',
        linkedinUrl: 'https://www.linkedin.com/company/hostizzy',
        whatsappNumber: '919560494001'
    });

    const refreshSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            if (data && Object.keys(data).length > 0) {
                setSettings(prev => ({ ...prev, ...data }));
            }
        } catch (err) {
            console.error("Failed to load settings:", err);
        }
    };

    useEffect(() => {
        refreshSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, refreshSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
