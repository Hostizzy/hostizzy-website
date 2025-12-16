import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown, Zap, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                initial={{ y: -100, width: "100%" }}
                animate={{
                    y: 0,
                    width: isScrolled ? "90%" : "100%",
                    top: isScrolled ? "1.5rem" : "0",
                    borderRadius: isScrolled ? "50px" : "0px",
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'fixed',
                    left: '50%',
                    x: '-50%',
                    zIndex: 1000,
                    maxWidth: isScrolled ? '1200px' : '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.90)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: isScrolled ? '0 10px 40px -10px rgba(0,0,0,0.08)' : 'none',
                    border: isScrolled ? '1px solid rgba(255,255,255,0.4)' : 'none',
                    borderBottom: !isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    padding: '0.75rem 0'
                }}
            >
                <div className="container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isScrolled ? '0 1.5rem' : '0 2rem',
                    height: '50px'
                }}>

                    {/* Brand Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src="/images/logo.jpg" alt="Hostizzy" style={{ height: '38px', mixBlendMode: 'multiply' }} />
                    </Link>

                    {/* Desktop Menu - Centered */}
                    <ul className="desktop-menu" style={{
                        display: 'flex',
                        gap: '0.4rem',
                        alignItems: 'center',
                        margin: 0,
                        listStyle: 'none',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>
                        {/* Static Main Links: Home, Stays */}
                        {[
                            { path: "/", name: "Home" },
                            { path: "/properties", name: "Stays" }
                        ].map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    onMouseEnter={() => setHoveredPath(link.path)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                    style={{
                                        position: 'relative',
                                        padding: '0.6rem 1rem',
                                        color: 'var(--color-foreground)',
                                        fontWeight: 500,
                                        fontSize: '0.9rem',
                                        transition: 'color 0.2s',
                                        textDecoration: 'none'
                                    }}
                                >
                                    {hoveredPath === link.path && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                backgroundColor: 'rgba(0,0,0,0.04)',
                                                borderRadius: '2rem',
                                                zIndex: -1
                                            }}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {link.name}
                                </Link>
                            </li>
                        ))}

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
                                    textDecoration: 'none'
                                }}
                            >
                                {hoveredPath === '/services' && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundColor: 'rgba(0,0,0,0.04)',
                                            borderRadius: '2rem',
                                            zIndex: -1
                                        }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                Service Plans
                            </Link>
                        </li>

                        {/* TECH DROPDOWN (NEW) */}
                        <li
                            onMouseEnter={() => setHoveredPath('technology')}
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
                                Tech <ChevronDown size={14} />
                            </span>
                            {hoveredPath === 'technology' && (
                                <motion.div
                                    layoutId="nav-pill"
                                    style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '2rem', zIndex: -1 }}
                                />
                            )}
                            <AnimatePresence>
                                {hoveredPath === 'technology' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute', top: '100%', left: '50%', x: '-50%', marginTop: '0.5rem',
                                            backgroundColor: 'white', borderRadius: '1rem', padding: '0.5rem',
                                            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)',
                                            minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '0.25rem'
                                        }}
                                    >
                                        {techDropdownLinks.map((subLink) => (
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
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-secondary)'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                            >
                                                <span style={{ color: 'var(--color-primary)' }}>{subLink.icon}</span>
                                                {subLink.name}
                                            </Link>
                                        ))}
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
                            top: isScrolled ? '6rem' : '4.5rem',
                            left: '5%',
                            width: '90%',
                            backgroundColor: 'white',
                            borderRadius: '1.5rem',
                            padding: '2rem',
                            marginTop: '10px',
                            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}
                    >
                        {[
                            { path: "/", name: "Home" },
                            { path: "/properties", name: "Stays" },
                            { path: "/nextstop", name: "NextStop" },
                            { path: "/services", name: "Plans & Pricing" },
                            { path: "/technology", name: "Technology" },
                            { path: "/calculator", name: "Revenue Calculator" },
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
