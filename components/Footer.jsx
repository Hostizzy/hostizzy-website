'use client';
import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import TrustBadges from './TrustBadges';
import StayWithHostizzy from './StayWithHostizzy';
import { useSettings } from '../context/SettingsContext';

// Layout: brand + contact on the left, four link groups (owners, locations,
// technology, company), then the guest booking links, then a bottom bar
// with the copyright and the legal pages.

const GROUPS = [
    {
        title: 'For owners',
        links: [
            { href: '/services', label: 'Plans & pricing' },
            { href: '/calculator', label: 'Revenue calculator' },
            { href: '/marketing', label: 'Marketing packages' },
            { href: '/faq', label: 'FAQ' },
            { href: '/contact', label: 'List your property' },
        ],
    },
    {
        title: 'Locations',
        links: [
            { href: '/locations/delhi-ncr', label: 'Delhi NCR' },
            { href: '/locations/himachal-pradesh', label: 'Himachal Pradesh' },
            { href: '/locations/uttarakhand', label: 'Uttarakhand' },
            { href: '/locations/rajasthan', label: 'Rajasthan' },
            { href: '/locations', label: 'All locations' },
        ],
    },
    {
        title: 'Technology',
        links: [
            { href: '/technology', label: 'Our platform' },
            { href: '/products/hostsuite', label: 'HostSuite' },
            { href: '/products/resiq', label: 'ResIQ' },
            { href: '/products/juxtravel', label: 'JuxTravel' },
        ],
    },
    {
        title: 'Company',
        links: [
            { href: '/about', label: 'About us' },
            { href: '/testimonials', label: 'Testimonials' },
            { href: '/career', label: 'Careers' },
            { href: '/training', label: 'Host Academy' },
            { href: '/certification', label: 'Certification' },
            { href: '/blogs', label: 'Blog' },
        ],
    },
];

const LEGAL = [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/refund-policy', label: 'Refunds' },
    { href: '/cookie-policy', label: 'Cookies' },
    { href: '/data-deletion', label: 'Data deletion' },
];

const Footer = () => {
    const { settings } = useSettings();
    const socials = [
        { href: settings.facebookUrl || 'https://facebook.com/hostizzy', label: 'Facebook', Icon: Facebook },
        { href: settings.instagramUrl, label: 'Instagram', Icon: Instagram },
        { href: settings.linkedinUrl, label: 'LinkedIn', Icon: Linkedin },
    ].filter((s) => s.href);

    return (
        <footer style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}>
            <style>{`
                .ft-grid { display: grid; gap: 2.5rem 2rem; grid-template-columns: 1fr 1fr; margin-bottom: 3rem; }
                .ft-brand { grid-column: 1 / -1; }
                @media (min-width: 1024px) {
                    .ft-grid { grid-template-columns: 1.6fr repeat(4, 1fr); }
                    .ft-brand { grid-column: auto; padding-right: 1.5rem; }
                }
                .ft-head { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin: 0 0 1.1rem; }
                .ft-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.7rem; font-size: 0.95rem; }
                .ft-list a, .ft-legal a, .ft-contact a { color: #cbd5e1; text-decoration: none; transition: color 0.15s; }
                .ft-list a:hover, .ft-legal a:hover, .ft-contact a:hover { color: #fff; }
                .ft-contact { list-style: none; padding: 0; margin: 0 0 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.92rem; color: #cbd5e1; }
                .ft-contact li { display: flex; gap: 0.65rem; align-items: flex-start; }
                .ft-contact svg { flex-shrink: 0; margin-top: 3px; color: var(--color-primary); }
                .ft-note { display: block; font-size: 0.8rem; color: #94a3b8; margin-top: 0.1rem; }
                .ft-social { display: flex; gap: 0.6rem; }
                .ft-social a { display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 999px; background: rgba(255,255,255,0.08); color: #e2e8f0; transition: background 0.15s; }
                .ft-social a:hover { background: var(--color-primary); color: #fff; }
                .ft-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.75rem; display: flex; flex-wrap: wrap; gap: 1rem 2rem; justify-content: space-between; align-items: center; font-size: 0.85rem; color: #94a3b8; }
                @media (max-width: 767px) { .ft-bottom { padding-bottom: 4.5rem; } }
                .ft-legal { display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem; list-style: none; padding: 0; margin: 0; }
            `}</style>
            <TrustBadges />
            <div style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <div className="container">
                    <div className="ft-grid">
                        <div className="ft-brand">
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-primary)', fontWeight: 800 }}>{settings.siteName}</h3>
                            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: '22rem' }}>
                                {settings.footerTagline}
                            </p>
                            <ul className="ft-contact">
                                <li><MapPin size={16} /><span>E 13/29, 1st Floor, Harsha Bhawan, Connaught Place, New Delhi 110001</span></li>
                                <li><Mail size={16} /><a href={`mailto:${settings.supportEmail}`}>{settings.supportEmail}</a></li>
                                <li><Phone size={16} /><span><a href="tel:+919560493335">+91 95604 93335</a><span className="ft-note">Host onboarding &amp; owner queries</span></span></li>
                                <li><Phone size={16} /><span><a href="tel:+919560494001">+91 95604 94001</a><span className="ft-note">Bookings</span></span></li>
                            </ul>
                            <div className="ft-social">
                                {socials.map(({ href, label, Icon }) => (
                                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Hostizzy on ${label}`}><Icon size={18} /></a>
                                ))}
                            </div>
                        </div>

                        {GROUPS.map((g) => (
                            <nav key={g.title} aria-label={g.title}>
                                <h4 className="ft-head">{g.title}</h4>
                                <ul className="ft-list">
                                    {g.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
                                </ul>
                            </nav>
                        ))}
                    </div>

                    <StayWithHostizzy variant="footer" />

                    <div className="ft-bottom">
                        <span>© 2026 Hostizzy / Hostsphere India Pvt Ltd. All rights reserved.</span>
                        <ul className="ft-legal">
                            {LEGAL.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
