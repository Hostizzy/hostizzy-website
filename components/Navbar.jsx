'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, ChevronDown, Zap, TrendingUp, BadgeCheck, ChevronRight, Home, Building2, GraduationCap, Briefcase, MapPin, Heart, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useSettings } from '../context/SettingsContext';

const Navbar = () => {
    const { settings } = useSettings();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
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
        setActiveDropdown(null);
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

    const platformLinks = [
        { path: "/technology", name: "Platform Overview", desc: "Explore the Hostizzy Ecosystem", icon: <Zap size={16} /> },
        { path: "/products/hostos", name: "HostOS", desc: "Property Management System", icon: <Building2 size={16} /> },
        { path: "/products/resiq", name: "ResIQ", desc: "Revenue & Market Analytics", icon: <TrendingUp size={16} /> },
        { path: "/products/juxtravel", name: "JuxTravel", desc: "Multi-Channel Marketplace", icon: <MapPin size={16} /> },
        { path: "/products/travelcrm", name: "TravelCRM", desc: "Guest Loyalty & Lead Management", icon: <Users size={16} /> },
    ];

    const companyLinks = [
        { path: "/about", name: "Our Story", icon: <Users size={16} /> },
        { path: "/invest", name: "Invest", icon: <TrendingUp size={16} /> },
        { path: "/career", name: "Career", icon: <Briefcase size={16} /> },
        { path: "/blogs", name: "Blog", icon: <Users size={16} /> },
        { path: "/testimonials", name: "Reviews", icon: <Users size={16} /> }
    ];

    const isActivePath = (path) => pathname === path;

    return (
        <React.Fragment>
            <motion.nav
                initial={{ y: -100, x: '-50%' }}
                animate={{
                    y: isScrolled ? 12 : 0,
                    width: isScrolled ? "96%" : "100%",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'fixed',
                    left: '50%',
                    top: 0,
                    zIndex: 1000,
                    maxWidth: isScrolled ? '1400px' : '100%',
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)' : '0 1px 0 rgba(0,0,0,0.06)',
                    border: isScrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
                    borderRadius: isScrolled ? '20px' : '0',
                }}
            >
                <div className="container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isScrolled ? '0 1.5rem' : '0 2rem',
                    height: isScrolled ? '68px' : '80px',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>

                    {/* Brand Logo */}
                    <Link href="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'transform 0.3s ease',
                        zIndex: 1001
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <img
                            src={settings.logoUrl}
                            alt={settings.siteName}
                            style={{
                                height: isScrolled ? '42px' : '52px',
                                width: 'auto',
                                objectFit: 'contain',
                                transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))'
                            }}
                        />
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
                        whiteSpace: 'nowrap'
                    }}>
                        {/* Home */}
                        <li>
                            <Link
                                href="/"
                                onMouseEnter={() => setActiveDropdown('home')}
                                onMouseLeave={() => setActiveDropdown(null)}
                                style={{
                                    position: 'relative',
                                    padding: '0.6rem 0.85rem',
                                    color: isActivePath('/') ? 'var(--color-primary)' : 'var(--color-foreground)',
                                    fontWeight: isActivePath('/') ? 600 : 500,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s ease',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    borderRadius: '10px'
                                }}
                            >
                                {activeDropdown === 'home' && (
                                    <motion.div
                                        layoutId="nav-hover"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundColor: 'rgba(254, 88, 88, 0.08)',
                                            borderRadius: '10px',
                                            zIndex: -1
                                        }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <Home size={15} style={{ opacity: 0.7 }} />
                                Home
                            </Link>
                        </li>

                        {/* Platform Dropdown */}
                        <li
                            onMouseEnter={() => setActiveDropdown('platform')}
                            onMouseLeave={() => setActiveDropdown(null)}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.6rem 0.85rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    borderRadius: '10px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Zap size={15} style={{ opacity: 0.7 }} />
                                Platform
                                <motion.div
                                    animate={{ rotate: activeDropdown === 'platform' ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown size={14} style={{ opacity: 0.6 }} />
                                </motion.div>
                            </span>
                            {activeDropdown === 'platform' && (
                                <motion.div
                                    layoutId="nav-hover"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundColor: 'rgba(254, 88, 88, 0.08)',
                                        borderRadius: '10px',
                                        zIndex: -1
                                    }}
                                />
                            )}
                            <AnimatePresence>
                                {activeDropdown === 'platform' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            position: 'absolute',
                                            top: 'calc(100% + 8px)',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'white',
                                            borderRadius: '16px',
                                            padding: '0.5rem',
                                            minWidth: '320px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '2px',
                                            zIndex: 100,
                                            boxShadow: '0 12px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
                                            border: '1px solid rgba(0,0,0,0.06)'
                                        }}
                                    >
                                        {platformLinks.map((link, idx) => (
                                            <Link
                                                key={link.path}
                                                href={link.path}
                                                style={{
                                                    padding: '0.85rem 1rem',
                                                    borderRadius: '10px',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.15s ease',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    borderBottom: idx < platformLinks.length - 1 ? 'none' : 'none'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'rgba(254, 88, 88, 0.06)';
                                                    e.currentTarget.style.transform = 'translateX(4px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.transform = 'translateX(0)';
                                                }}>
                                                <div style={{
                                                    width: '36px',
                                                    height: '36px',
                                                    borderRadius: '10px',
                                                    background: idx === 0 ? 'linear-gradient(135deg, #FE5858 0%, #FF8A80 100%)' : 'var(--color-secondary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                    color: idx === 0 ? 'white' : 'var(--color-primary)'
                                                }}>
                                                    {link.icon}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 600, color: 'var(--color-foreground)', fontSize: '0.9rem', marginBottom: '2px' }}>{link.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', lineHeight: 1.3 }}>{link.desc}</div>
                                                </div>
                                                <ChevronRight size={14} style={{ opacity: 0.3 }} />
                                            </Link>
                                        ))}
                                        <div style={{ margin: '4px 0', height: '1px', background: 'var(--color-border)' }} />
                                        <Link
                                            href="/calculator"
                                            style={{
                                                padding: '0.85rem 1rem',
                                                borderRadius: '10px',
                                                textDecoration: 'none',
                                                transition: 'all 0.15s ease',
                                                background: 'linear-gradient(135deg, rgba(254, 88, 88, 0.08) 0%, rgba(255, 138, 128, 0.08) 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(254, 88, 88, 0.12) 0%, rgba(255, 138, 128, 0.12) 100%)';
                                                e.currentTarget.style.transform = 'translateX(4px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(254, 88, 88, 0.08) 0%, rgba(255, 138, 128, 0.08) 100%)';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                            }}>
                                            <div style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '10px',
                                                background: 'linear-gradient(135deg, #FE5858 0%, #FF8A80 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white'
                                            }}>
                                                <TrendingUp size={16} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '2px' }}>Revenue Calculator</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', lineHeight: 1.3 }}>Estimate Your Earnings Potential</div>
                                            </div>
                                            <ArrowUpRight size={14} style={{ color: 'var(--color-primary)' }} />
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        {/* Host Academy Dropdown */}
                        <li
                            onMouseEnter={() => setActiveDropdown('academy')}
                            onMouseLeave={() => setActiveDropdown(null)}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.6rem 0.85rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    borderRadius: '10px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <GraduationCap size={15} style={{ opacity: 0.7 }} />
                                Host Academy
                                <motion.div
                                    animate={{ rotate: activeDropdown === 'academy' ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown size={14} style={{ opacity: 0.6 }} />
                                </motion.div>
                            </span>
                            {activeDropdown === 'academy' && (
                                <motion.div
                                    layoutId="nav-hover"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundColor: 'rgba(254, 88, 88, 0.08)',
                                        borderRadius: '10px',
                                        zIndex: -1
                                    }}
                                />
                            )}
                            <AnimatePresence>
                                {activeDropdown === 'academy' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            position: 'absolute',
                                            top: 'calc(100% + 8px)',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            backgroundColor: 'white',
                                            borderRadius: '16px',
                                            padding: '0.5rem',
                                            boxShadow: '0 12px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
                                            border: '1px solid rgba(0,0,0,0.06)',
                                            minWidth: '280px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '2px'
                                        }}
                                    >
                                        <Link href="/training" style={{ padding: '0.85rem 1rem', borderRadius: '10px', textDecoration: 'none', transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', gap: '12px' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(254, 88, 88, 0.06)'; e.currentTarget.style.transform = 'translateX(4px)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                                                <GraduationCap size={16} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, color: 'var(--color-foreground)', fontSize: '0.9rem', marginBottom: '2px' }}>Training Programs</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', lineHeight: 1.3 }}>Learn Professional Hosting</div>
                                            </div>
                                        </Link>
                                        <Link href="/certification" style={{ padding: '0.85rem 1rem', borderRadius: '10px', textDecoration: 'none', transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', gap: '12px', background: 'linear-gradient(135deg, rgba(254, 88, 88, 0.08) 0%, rgba(255, 138, 128, 0.08) 100%)' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(254, 88, 88, 0.12) 0%, rgba(255, 138, 128, 0.12) 100%)'; e.currentTarget.style.transform = 'translateX(4px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(254, 88, 88, 0.08) 0%, rgba(255, 138, 128, 0.08) 100%)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #FE5858 0%, #FF8A80 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                                <BadgeCheck size={16} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '2px' }}>Host Certified™</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', lineHeight: 1.3 }}>Get Certified as a Pro Host</div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        {/* Service Plans */}
                        <li>
                            <Link
                                href="/services"
                                onMouseEnter={() => setActiveDropdown('services')}
                                onMouseLeave={() => setActiveDropdown(null)}
                                style={{
                                    position: 'relative',
                                    padding: '0.6rem 0.85rem',
                                    color: isActivePath('/services') ? 'var(--color-primary)' : 'var(--color-foreground)',
                                    fontWeight: isActivePath('/services') ? 600 : 500,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s ease',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    borderRadius: '12px'
                                }}
                            >
                                {activeDropdown === 'services' && (
                                    <motion.div
                                        layoutId="nav-hover"
                                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(254, 88, 88, 0.08)', borderRadius: '12px', zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <Briefcase size={15} style={{ opacity: 0.7 }} />
                                Services
                            </Link>
                        </li>

                        {/* Properties */}
                        <li>
                            <Link
                                href="/properties"
                                onMouseEnter={() => setActiveDropdown('properties')}
                                onMouseLeave={() => setActiveDropdown(null)}
                                style={{
                                    position: 'relative',
                                    padding: '0.6rem 0.85rem',
                                    color: isActivePath('/properties') ? 'var(--color-primary)' : 'var(--color-foreground)',
                                    fontWeight: isActivePath('/properties') ? 600 : 500,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s ease',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    borderRadius: '12px'
                                }}
                            >
                                {activeDropdown === 'properties' && (
                                    <motion.div
                                        layoutId="nav-hover"
                                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(254, 88, 88, 0.08)', borderRadius: '12px', zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <Building2 size={15} style={{ opacity: 0.7 }} />
                                Properties
                            </Link>
                        </li>

                        {/* Experiences Dropdown */}
                        <li
                            onMouseEnter={() => setActiveDropdown('experiences')}
                            onMouseLeave={() => setActiveDropdown(null)}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.6rem 0.85rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    borderRadius: '10px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <MapPin size={15} style={{ opacity: 0.7 }} />
                                Experiences
                                <motion.div animate={{ rotate: activeDropdown === 'experiences' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronDown size={14} style={{ opacity: 0.6 }} />
                                </motion.div>
                            </span>
                            {activeDropdown === 'experiences' && (
                                <motion.div layoutId="nav-hover" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(254, 88, 88, 0.08)', borderRadius: '12px', zIndex: -1 }} />
                            )}
                            <AnimatePresence>
                                {activeDropdown === 'experiences' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
                                            backgroundColor: 'white', borderRadius: '16px', padding: '0.5rem',
                                            boxShadow: '0 12px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)',
                                            minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '2px'
                                        }}
                                    >
                                        <Link href="/experiences" style={{ padding: '0.75rem 1rem', borderRadius: '10px', color: 'var(--color-foreground)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', transition: 'all 0.15s ease' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--color-secondary)'; e.target.style.transform = 'translateX(4px)'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.transform = 'translateX(0)'; }}>All Experiences</Link>
                                        <Link href="/nextstop" style={{ padding: '0.75rem 1rem', borderRadius: '10px', color: 'var(--color-foreground)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', transition: 'all 0.15s ease' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--color-secondary)'; e.target.style.transform = 'translateX(4px)'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.transform = 'translateX(0)'; }}>NextStop (Travel)</Link>
                                        <div style={{ margin: '4px 0', height: '1px', background: 'var(--color-border)' }} />
                                        <Link href="/weddings" style={{ padding: '0.75rem 1rem', borderRadius: '10px', color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s ease' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(254, 88, 88, 0.06)'; e.target.style.transform = 'translateX(4px)'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.transform = 'translateX(0)'; }}>
                                            <Heart size={14} style={{ fill: 'currentColor' }} />
                                            Wedding Venues
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        {/* Company Dropdown */}
                        <li
                            onMouseEnter={() => setActiveDropdown('company')}
                            onMouseLeave={() => setActiveDropdown(null)}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.6rem 0.85rem',
                                    color: 'var(--color-foreground)',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    borderRadius: '10px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Users size={15} style={{ opacity: 0.7 }} />
                                Company
                                <motion.div animate={{ rotate: activeDropdown === 'company' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronDown size={14} style={{ opacity: 0.6 }} />
                                </motion.div>
                            </span>

                            {activeDropdown === 'company' && (
                                <motion.div layoutId="nav-hover" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(254, 88, 88, 0.08)', borderRadius: '12px', zIndex: -1 }} />
                            )}

                            <AnimatePresence>
                                {activeDropdown === 'company' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
                                            backgroundColor: 'white', borderRadius: '16px', padding: '0.5rem',
                                            boxShadow: '0 12px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)',
                                            minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '2px'
                                        }}
                                    >
                                        {companyLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                href={link.path}
                                                style={{
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '10px',
                                                    color: 'var(--color-foreground)',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 500,
                                                    textDecoration: 'none',
                                                    transition: 'all 0.15s ease',
                                                    display: 'block'
                                                }}
                                                onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--color-secondary)'; e.target.style.transform = 'translateX(4px)'; }}
                                                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.transform = 'translateX(0)'; }}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    </ul>

                    {/* Right Side Actions */}
                    <div className="desktop-menu" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginLeft: '0.5rem' }}>
                        <a href="https://hostizzy.dtravel.com/" target="_blank" rel="noopener noreferrer"
                            style={{
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                color: 'var(--color-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                textDecoration: 'none',
                                padding: '0.6rem 0.85rem',
                                borderRadius: '10px',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(254, 88, 88, 0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}>
                            Book <ArrowUpRight size={14} />
                        </a>
                        <Link href="/contact" className="btn btn-primary" style={{
                            borderRadius: '10px',
                            padding: '0.65rem 1.25rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(254, 88, 88, 0.25)',
                            textDecoration: 'none',
                            background: 'linear-gradient(135deg, #FE5858 0%, #FF6B6B 100%)',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(254, 88, 88, 0.35)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(254, 88, 88, 0.25)';
                        }}>
                            Partner With Us
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-foreground)',
                            zIndex: 1001,
                            padding: '8px',
                            borderRadius: '8px',
                            transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
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
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(8px)',
                                zIndex: 998
                            }}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: '85%',
                                maxWidth: '420px',
                                backgroundColor: 'white',
                                zIndex: 999,
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'auto',
                                boxShadow: '-10px 0 50px rgba(0,0,0,0.2)'
                            }}
                        >
                            {/* Header */}
                            <div style={{ padding: '2rem 1.5rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <img src={settings.logoUrl} alt={settings.siteName} style={{ height: '42px', width: 'auto' }} />
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        background: 'var(--color-secondary)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <nav style={{ flex: 1, padding: '0.5rem 0' }}>
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Home size={20} style={{ opacity: 0.6 }} />
                                        Home
                                    </div>
                                    <ChevronRight size={18} color="var(--color-muted)" />
                                </Link>

                                {/* Platform Dropdown */}
                                <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <button
                                        onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'platform' ? null : 'platform')}
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'none', border: 'none', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textAlign: 'left', cursor: 'pointer' }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <Zap size={20} style={{ opacity: 0.6 }} />
                                            Platform
                                        </div>
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
                                                {platformLinks.map(link => (
                                                    <Link key={link.path} href={link.path} onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.85rem 1.5rem 0.85rem 3.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>
                                                        {link.name}
                                                    </Link>
                                                ))}
                                                <Link href="/calculator" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.85rem 1.5rem 0.85rem 3.5rem', color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>
                                                    Revenue Calculator
                                                </Link>
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
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <GraduationCap size={20} style={{ opacity: 0.6 }} />
                                            Host Academy
                                        </div>
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
                                                <Link href="/training" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.85rem 1.5rem 0.85rem 3.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>Training Programs</Link>
                                                <Link href="/certification" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.85rem 1.5rem 0.85rem 3.5rem', color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>Host Certified™</Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Briefcase size={20} style={{ opacity: 0.6 }} />
                                        Services
                                    </div>
                                    <ChevronRight size={18} color="var(--color-muted)" />
                                </Link>

                                <Link href="/properties" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Building2 size={20} style={{ opacity: 0.6 }} />
                                        Properties
                                    </div>
                                    <ChevronRight size={18} color="var(--color-muted)" />
                                </Link>

                                {/* Experiences Dropdown */}
                                <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <button
                                        onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'experiences' ? null : 'experiences')}
                                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'none', border: 'none', color: 'var(--color-foreground)', fontWeight: 600, fontSize: '1rem', textAlign: 'left', cursor: 'pointer' }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <MapPin size={20} style={{ opacity: 0.6 }} />
                                            Experiences
                                        </div>
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
                                                <Link href="/experiences" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.85rem 1.5rem 0.85rem 3.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>All Experiences</Link>
                                                <Link href="/nextstop" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.85rem 1.5rem 0.85rem 3.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>NextStop (Travel)</Link>
                                                <Link href="/weddings" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.85rem 1.5rem 0.85rem 3.5rem', color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>Wedding Venues ❤️</Link>
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
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <Users size={20} style={{ opacity: 0.6 }} />
                                            Company
                                        </div>
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
                                                {companyLinks.map((link) => (
                                                    <Link key={link.path} href={link.path} onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '0.85rem 1.5rem 0.85rem 3.5rem', color: 'var(--color-foreground)', fontSize: '0.95rem', textDecoration: 'none' }}>
                                                        {link.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </nav>

                            {/* Bottom Actions */}
                            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--color-secondary)' }}>
                                <a href="https://hostizzy.dtravel.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%', textDecoration: 'none', justifyContent: 'center', padding: '0.875rem', fontSize: '0.95rem', fontWeight: 600 }}>
                                    Book Property <ArrowUpRight size={16} />
                                </a>
                                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%', textDecoration: 'none', justifyContent: 'center', padding: '0.875rem', fontSize: '0.95rem', fontWeight: 600, background: 'linear-gradient(135deg, #FE5858 0%, #FF6B6B 100%)' }}>
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
