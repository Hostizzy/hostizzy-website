'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, ChevronDown, Zap, TrendingUp, BadgeCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useSettings } from '../context/SettingsContext';

const Navbar = () => {
    const { settings } = useSettings();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState(null);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setMobileActiveDropdown(null);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const companyDropdownLinks = [
        { path: "/about", name: "Our Story" },
        { path: "/invest", name: "Invest" },
        { path: "/career", name: "Career" },
        { path: "/blogs", name: "Blog" },
        { path: "/testimonials", name: "Reviews" }
    ];

    return (
        <React.Fragment>
            <motion.nav
                initial={{ y: -100, x: '-50%' }}
                animate={{
                    y: isScrolled ? 15 : 0,
                    width: isScrolled ? "94%" : "100%",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'fixed',
                    left: '50%',
                    zIndex: 1000,
                    maxWidth: isScrolled ? '1440px' : '100%',
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(25px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                    boxShadow: isScrolled ? '0 20px 40px -15px rgba(0,0,0,0.1)' : '0 1px 0 rgba(0,0,0,0.05)',
                    border: isScrolled ? '1px solid rgba(255,255,255,0.4)' : 'none',
                    borderRadius: isScrolled ? '24px' : '0',
                    padding: isScrolled ? '0.25rem 0' : '0.5rem 0'
                }}
            >
                <div className="container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 1.5rem',
                    height: isScrolled ? '64px' : '84px',
                    transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>

                    {/* Brand Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s', zIndex: 1001 }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <img src={settings.logoUrl} alt={settings.siteName} style={{ height: isScrolled ? '48px' : '64px', width: 'auto', objectFit: 'contain', transition: 'height 0.3s ease' }} />
                    </Link>

                    {/* Desktop Menu - Centered */}
                    <ul className="desktop-menu" style={{
                        display: 'flex',
                        gap: '0.25rem',
                        alignItems: 'center',
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        height: '100%'
                    }}>
                        {/* Home */}
                        <li>
                            <Link href="/" className="nav-link"
                                onMouseEnter={() => setHoveredPath('/')}
                                onMouseLeave={() => setHoveredPath(null)}
                                style={{
                                    position: 'relative',
                                    padding: '0.6rem 0.75rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    transition: 'color 0.2s',
                                    textDecoration: 'none',
                                    display: 'block'
                                }}
                            >
                                {hoveredPath === '/' && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '2rem', zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                Home
                            </Link>
                        </li>

                        {/* Platform Dropdown */}
                        <li
                            onMouseEnter={() => { setHoveredPath('platform'); setIsProductDropdownOpen(true); }}
                            onMouseLeave={() => { setHoveredPath(null); setIsProductDropdownOpen(false); }}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.6rem 0.75rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                Platform <ChevronDown size={14} />
                            </span>
                            {hoveredPath === 'platform' && (
                                <motion.div
                                    layoutId="nav-pill"
                                    style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '2rem', zIndex: -1 }}
                                />
                            )}
                            <AnimatePresence>
                                {isProductDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="dropdown-menu shadow-premium" style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: '50%',
                                            x: '-50%',
                                            marginTop: '0.5rem',
                                            background: 'white',
                                            borderRadius: '1.25rem',
                                            padding: '0.75rem',
                                            minWidth: '280px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.25rem',
                                            zIndex: 100,
                                            boxShadow: '0 20px 50px -12px rgba(0,0,0,0.15)',
                                            border: '1px solid rgba(0,0,0,0.05)'
                                        }}
                                    >
                                        <Link href="/technology" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>Platform Overview</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Explore the Hostizzy Ecosystem</div>
                                        </Link>
                                        <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />
                                        <Link href="/products/hostos" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>HostOS</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Property Management System</div>
                                        </Link>
                                        <Link href="/products/resiq" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>ResIQ</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Revenue & Market Analytics</div>
                                        </Link>
                                        <Link href="/products/juxtravel" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>JuxTravel</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Multi-Channel Marketplace</div>
                                        </Link>
                                        <Link href="/products/travelcrm" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>TravelCRM</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Guest Loyalty & Lead Management</div>
                                        </Link>
                                        <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />
                                        <Link href="/calculator" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}><TrendingUp size={14} /> Revenue Calculator</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Estimate Your Earnings Potential</div>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        {/* Host Academy Dropdown (Training + Certification) */}
                        <li
                            onMouseEnter={() => setHoveredPath('academy')}
                            onMouseLeave={() => setHoveredPath(null)}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.6rem 0.75rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                Host Academy <ChevronDown size={14} />
                            </span>
                            {hoveredPath === 'academy' && (
                                <motion.div
                                    layoutId="nav-pill"
                                    style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '2rem', zIndex: -1 }}
                                />
                            )}
                            <AnimatePresence>
                                {hoveredPath === 'academy' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute', top: '100%', left: '50%', x: '-50%', marginTop: '0.5rem',
                                            backgroundColor: 'white', borderRadius: '1.25rem', padding: '0.75rem',
                                            boxShadow: '0 20px 50px -12px rgba(0,0,0,0.15)', border: '1px solid rgba(0,0,0,0.05)',
                                            minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '0.25rem'
                                        }}
                                    >
                                        <Link href="/training" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>Training Programs</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Learn Professional Hosting</div>
                                        </Link>
                                        <Link href="/certification" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}><BadgeCheck size={14} /> Host Certified™</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Get Certified as a Pro Host</div>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        {/* Service Plans Link */}
                        <li>
                            <Link
                                href="/services"
                                onMouseEnter={() => setHoveredPath('/services')}
                                onMouseLeave={() => setHoveredPath(null)}
                                style={{
                                    position: 'relative',
                                    padding: '0.6rem 0.75rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    transition: 'color 0.2s',
                                    textDecoration: 'none',
                                    display: 'block'
                                }}
                            >
                                {hoveredPath === '/services' && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '2rem', zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                Service Plans
                            </Link>
                        </li>

                        {/* Properties */}
                        <li>
                            <Link href="/properties" className="nav-link"
                                onMouseEnter={() => setHoveredPath('/properties')}
                                onMouseLeave={() => setHoveredPath(null)}
                                style={{
                                    position: 'relative',
                                    padding: '0.6rem 0.75rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    transition: 'color 0.2s',
                                    textDecoration: 'none',
                                    display: 'block'
                                }}
                            >
                                {hoveredPath === '/properties' && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '2rem', zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                Properties
                            </Link>
                        </li>

                        {/* Experiences Dropdown */}
                        <li
                            onMouseEnter={() => setHoveredPath('experiences')}
                            onMouseLeave={() => setHoveredPath(null)}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.6rem 0.75rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                Experiences <ChevronDown size={14} />
                            </span>
                            {hoveredPath === 'experiences' && (
                                <motion.div
                                    layoutId="nav-pill"
                                    style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '2rem', zIndex: -1 }}
                                />
                            )}
                            <AnimatePresence>
                                {hoveredPath === 'experiences' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute', top: '100%', left: '50%', x: '-50%', marginTop: '0.5rem',
                                            backgroundColor: 'white', borderRadius: '1rem', padding: '0.5rem',
                                            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)',
                                            minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.25rem'
                                        }}
                                    >
                                        <Link href="/experiences" style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', color: 'var(--color-foreground)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>All Experiences</Link>
                                        <Link href="/nextstop" style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', color: 'var(--color-foreground)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>NextStop (Travel)</Link>
                                        <Link href="/weddings" style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', borderTop: '1px solid var(--color-border)', marginTop: '0.25rem', paddingTop: '0.75rem' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Wedding Venues ❤️</Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        {/* Company Dropdown */}
                        <li
                            onMouseEnter={() => setHoveredPath('company')}
                            onMouseLeave={() => setHoveredPath(null)}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.6rem 0.75rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                Company <ChevronDown size={14} />
                            </span>

                            {hoveredPath === 'company' && (
                                <motion.div
                                    layoutId="nav-pill"
                                    style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '2rem', zIndex: -1 }}
                                />
                            )}

                            <AnimatePresence>
                                {hoveredPath === 'company' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: '50%',
                                            x: '-50%',
                                            marginTop: '0.5rem',
                                            backgroundColor: 'white',
                                            borderRadius: '1rem',
                                            padding: '0.5rem',
                                            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            minWidth: '160px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.25rem'
                                        }}
                                    >
                                        {companyDropdownLinks.map((subLink) => (
                                            <Link
                                                key={subLink.path}
                                                href={subLink.path}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '0.75rem',
                                                    color: 'var(--color-foreground)',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 500,
                                                    textDecoration: 'none',
                                                    transition: 'background 0.2s',
                                                    display: 'block'
                                                }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                            >
                                                {subLink.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    </ul>

                    {/* Right Side Actions */}
                    <div className="desktop-menu" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <a href="https://hostizzy.dtravel.com/" target="_blank" rel="noopener noreferrer"
                            style={{
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                color: 'var(--color-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                textDecoration: 'none'
                            }}>
                            Book <ArrowUpRight size={14} />
                        </a>
                        <Link href="/contact" className="btn btn-primary" style={{
                            borderRadius: '2rem',
                            padding: '0.6rem 1.4rem',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 12px rgba(254, 88, 88, 0.3)',
                            textDecoration: 'none'
                        }}>
                            Partner With Us
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-foreground)', zIndex: 1001 }}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 998
                            }}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: '85%',
                                maxWidth: '400px',
                                backgroundColor: 'white',
                                zIndex: 999,
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'auto',
                                boxShadow: '-10px 0 50px rgba(0,0,0,0.15)'
                            }}
                        >
                            {/* Header */}
                            <div style={{ padding: '2rem 1.5rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
                                <img src={settings.logoUrl} alt={settings.siteName} style={{ height: '48px', width: 'auto' }} />
                            </div>

                            {/* Menu Items */}
                            <nav style={{ flex: 1, padding: '1rem 0' }}>
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', borderBottom: '1px solid var(--color-border)' }}>
                                    Home
                                    <ChevronRight size={18} color="var(--color-muted)" />
                                </Link>

                                {/* Platform Dropdown */}
                                <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <button
                                        onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'platform' ? null : 'platform')}
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'none', border: 'none', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textAlign: 'left', cursor: 'pointer' }}
                                    >
                                        Platform
                                        <motion.div animate={{ rotate: mobileActiveDropdown === 'platform' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown size={18} color="var(--color-muted)" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {mobileActiveDropdown === 'platform' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                style={{ overflow: 'hidden', backgroundColor: 'var(--color-secondary)' }}
                                            >
                                                <Link href="/technology" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>Platform Overview</Link>
                                                <Link href="/products/hostos" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>HostOS</Link>
                                                <Link href="/products/resiq" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>ResIQ</Link>
                                                <Link href="/products/juxtravel" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>JuxTravel</Link>
                                                <Link href="/products/travelcrm" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>TravelCRM</Link>
                                                <Link href="/calculator" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>Revenue Calculator</Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Host Academy Dropdown */}
                                <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <button
                                        onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'academy' ? null : 'academy')}
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'none', border: 'none', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textAlign: 'left', cursor: 'pointer' }}
                                    >
                                        Host Academy
                                        <motion.div animate={{ rotate: mobileActiveDropdown === 'academy' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown size={18} color="var(--color-muted)" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {mobileActiveDropdown === 'academy' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                style={{ overflow: 'hidden', backgroundColor: 'var(--color-secondary)' }}
                                            >
                                                <Link href="/training" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>Training Programs</Link>
                                                <Link href="/certification" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>Host Certified™</Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', borderBottom: '1px solid var(--color-border)' }}>
                                    Service Plans
                                    <ChevronRight size={18} color="var(--color-muted)" />
                                </Link>

                                <Link href="/properties" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', borderBottom: '1px solid var(--color-border)' }}>
                                    Properties
                                    <ChevronRight size={18} color="var(--color-muted)" />
                                </Link>

                                {/* Experiences Dropdown */}
                                <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <button
                                        onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'experiences' ? null : 'experiences')}
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'none', border: 'none', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textAlign: 'left', cursor: 'pointer' }}
                                    >
                                        Experiences
                                        <motion.div animate={{ rotate: mobileActiveDropdown === 'experiences' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown size={18} color="var(--color-muted)" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {mobileActiveDropdown === 'experiences' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                style={{ overflow: 'hidden', backgroundColor: 'var(--color-secondary)' }}
                                            >
                                                <Link href="/experiences" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>All Experiences</Link>
                                                <Link href="/nextstop" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>NextStop (Travel)</Link>
                                                <Link href="/weddings" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>Wedding Venues ❤️</Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Company Dropdown */}
                                <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <button
                                        onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'company' ? null : 'company')}
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'none', border: 'none', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textAlign: 'left', cursor: 'pointer' }}
                                    >
                                        Company
                                        <motion.div animate={{ rotate: mobileActiveDropdown === 'company' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown size={18} color="var(--color-muted)" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {mobileActiveDropdown === 'company' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                style={{ overflow: 'hidden', backgroundColor: 'var(--color-secondary)' }}
                                            >
                                                {companyDropdownLinks.map((link) => (
                                                    <Link key={link.path} href={link.path} onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 1.5rem 0.75rem 2.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>
                                                        {link.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </nav>

                            {/* Bottom Actions */}
                            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <a href="https://hostizzy.dtravel.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%', textDecoration: 'none', justifyContent: 'center' }}>
                                    Book Property <ArrowUpRight size={16} />
                                </a>
                                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%', textDecoration: 'none', justifyContent: 'center' }}>
                                    Partner With Us
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 1024px) {
                    .desktop-menu { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                }
                @media (min-width: 1025px) {
                    .mobile-menu-btn { display: none !important; }
                }
            `}</style>
        </React.Fragment>
    );
};

export default Navbar;
