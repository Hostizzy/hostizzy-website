import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown, Zap, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useSettings } from '../context/SettingsContext';

const Navbar = () => {
    const { settings } = useSettings();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMobileMenuOpen(false);
    }, [location]);

    // Tech Dropdown Links
    const techDropdownLinks = [
        { path: "/technology", name: "Our Tech Stack", icon: <Zap size={16} /> },
        { path: "/calculator", name: "Revenue Calculator", icon: <TrendingUp size={16} /> }
    ];

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
                    maxWidth: isScrolled ? '1320px' : '100%',
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.98)',
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
                    padding: '0 2.5rem',
                    height: isScrolled ? '64px' : '84px',
                    transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>

                    {/* Brand Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <img src={settings.logoUrl} alt={settings.siteName} style={{ height: isScrolled ? '48px' : '64px', width: 'auto', objectFit: 'contain', transition: 'height 0.3s ease' }} />
                    </Link>

                    {/* Desktop Menu - Centered */}
                    <ul className="desktop-menu" style={{
                        display: 'flex',
                        gap: '0.75rem',
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
                        <li>
                            <Link to="/" className="nav-link"
                                onMouseEnter={() => setHoveredPath('/')}
                                onMouseLeave={() => setHoveredPath(null)}
                                style={{
                                    position: 'relative',
                                    padding: '0.6rem 1rem',
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

                        <li
                            onMouseEnter={() => { setHoveredPath('platform'); setIsProductDropdownOpen(true); }}
                            onMouseLeave={() => { setHoveredPath(null); setIsProductDropdownOpen(false); }}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.6rem 1rem',
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
                                        <Link to="/technology" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>Platform Overview</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Explore the Hostizzy Ecosystem</div>
                                        </Link>
                                        <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />
                                        <Link to="/products/hostos" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>HostOS</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Property Management System</div>
                                        </Link>
                                        <Link to="/products/resiq" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>ResIQ</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Revenue & Market Analytics</div>
                                        </Link>
                                        <Link to="/products/juxtravel" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>JuxTravel</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Multi-Channel Marketplace</div>
                                        </Link>
                                        <Link to="/products/travelcrm" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-foreground)', fontSize: '0.9rem' }}>TravelCRM</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Guest Loyalty & Lead Management</div>
                                        </Link>
                                        <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />
                                        <Link to="/calculator" className="dropdown-link" style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}><TrendingUp size={14} /> Revenue Calculator</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '2px' }}>Estimate Your Earnings Potential</div>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        <li>
                            <Link to="/properties" className="nav-link"
                                onMouseEnter={() => setHoveredPath('/properties')}
                                onMouseLeave={() => setHoveredPath(null)}
                                style={{
                                    position: 'relative',
                                    padding: '0.6rem 1rem',
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
                                    padding: '0.6rem 1rem',
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
                                            minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '0.25rem'
                                        }}
                                    >
                                        <Link to="/experiences" style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', color: 'var(--color-foreground)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>All Experiences</Link>
                                        <Link to="/nextstop" style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', color: 'var(--color-foreground)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>NextStop (Travel)</Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        {/* Service Plans Link */}
                        <li>
                            <Link
                                to="/services"
                                onMouseEnter={() => setHoveredPath('/services')}
                                onMouseLeave={() => setHoveredPath(null)}
                                style={{
                                    position: 'relative',
                                    padding: '0.6rem 1rem',
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

                        {/* Company Dropdown */}
                        <li
                            onMouseEnter={() => setHoveredPath('company')}
                            onMouseLeave={() => setHoveredPath(null)}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.6rem 1rem',
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
                                                to={subLink.path}
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
                        <Link to="/contact" className="btn btn-primary" style={{
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
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-foreground)' }}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed',
                            top: isScrolled ? '5.5rem' : '4.5rem',
                            left: '5%',
                            width: '90%',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '2rem',
                            padding: '2.5rem 2rem',
                            marginTop: '10px',
                            boxShadow: 'var(--shadow-premium)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.85rem',
                            border: '1px solid var(--color-border)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                        }}
                    >
                        {[
                            { path: "/", name: "Home" },
                            { path: "/properties", name: "Stays" },
                            { path: "/nextstop", name: "NextStop" },
                            { path: "/services", name: "Plans & Pricing" },
                            { path: "/technology", name: "Platform" },
                            { path: "/calculator", name: "Earnings Calculator" },
                            { path: "/about", name: "Our Story" },
                            { path: "/invest", name: "Invest" },
                            { path: "/career", name: "Career" },
                            { path: "/blogs", name: "Blog" }
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    color: 'var(--color-foreground)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.5rem 0',
                                    borderBottom: '1px solid #f1f5f9',
                                    textDecoration: 'none'
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="btn btn-primary"
                            style={{
                                marginTop: '1rem',
                                borderRadius: '1rem',
                                justifyContent: 'center',
                                textDecoration: 'none'
                            }}
                        >
                            Partner With Us
                        </Link>
                    </motion.div>
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
