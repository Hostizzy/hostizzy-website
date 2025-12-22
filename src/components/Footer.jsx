import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrustBadges from './TrustBadges';
import { useSettings } from '../context/SettingsContext';

const Footer = () => {
    const { settings } = useSettings();

    return (
        <footer style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}>
            <TrustBadges />
            <div style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="container">
                    <div className="grid desktop-4-col" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                        {/* Brand & Social */}
                        <div>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--color-primary)', fontWeight: 800 }}>{settings.siteName}</h3>
                            <p style={{ opacity: 0.8, marginBottom: '2rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                                {settings.footerTagline}
                            </p>
                            <div style={{ display: 'flex', gap: '1.25rem' }}>
                                <a href={settings.facebookUrl || "https://facebook.com/hostizzy"} target="_blank" rel="noopener noreferrer" style={{ color: 'white', opacity: 0.6 }}><Facebook size={22} /></a>
                                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'white', opacity: 0.6 }}><Instagram size={22} /></a>
                                <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'white', opacity: 0.6 }}><Linkedin size={22} /></a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#f8fafc' }}>Quick Links</h4>
                            <ul style={{ listStyle: 'none', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/services">Plans & Pricing</Link></li>
                                <li><a href="https://hostizzy.dtravel.com/" target="_blank" rel="noreferrer">JuxTravel</a></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#f8fafc' }}>Contact Us</h4>
                            <ul style={{ listStyle: 'none', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '0.75rem' }}>
                                    <MapPin size={18} style={{ flexShrink: 0, marginTop: '4px' }} />
                                    <span>E 13/29, 1st Floor, Harsha Bhawan, Connaught Place, New Delhi 110001</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <Mail size={18} />
                                    <a href={`mailto:${settings.supportEmail}`}>{settings.supportEmail}</a>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <Phone size={18} />
                                    <a href={`tel:${(settings.supportPhone || '').replace(/\s+/g, '')}`}>{settings.supportPhone}</a>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#f8fafc' }}>Legal</h4>
                            <ul style={{ listStyle: 'none', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <li><Link to="/privacy">Privacy Policy</Link></li>
                                <li><Link to="/terms">Terms & Conditions</Link></li>
                                <li><Link to="/faq">FAQs</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', opacity: 0.6, fontSize: '0.875rem' }}>
                        © 2025 Hostizzy / Hostsphere India Pvt Ltd. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
