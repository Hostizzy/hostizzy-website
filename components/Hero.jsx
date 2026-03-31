'use client';

import Link from 'next/link';
import { ArrowRight, Star, Building2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const propertyImages = [
  {
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    alt: 'Luxury villa with pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80',
    alt: 'Hotel pool area',
  },
  {
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80',
    alt: 'Tropical resort',
  },
  {
    src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=80',
    alt: 'Modern hotel room',
  },
  {
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
    alt: 'Luxury pool at sunset',
  },
];

const trustBadges = [
  { icon: Star, label: '4.9 Rating' },
  { icon: Building2, label: '50+ Properties' },
  { icon: Users, label: '40,000+ Guests' },
];

const tileStyle = {
  borderRadius: '1rem',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.35s ease',
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const Hero = () => {
  return (
    <section
      className="hero-split"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#fafafa',
        paddingTop: 'var(--header-height)',
        overflow: 'hidden',
      }}
    >
      <div className="container hero-split__grid">
        {/* Left Column -- Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ maxWidth: '640px' }}
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="badge"
            style={{
              display: 'inline-block',
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              background: 'rgba(254,88,88,0.1)',
              color: 'var(--color-primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
              letterSpacing: '0.01em',
            }}
          >
            Vacation rental made easy
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'var(--color-foreground)',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            India&apos;s Premier
            <br />
            Vacation Rental
            <br />
            Management
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.7,
              color: 'var(--color-muted)',
              marginBottom: '1.75rem',
              maxWidth: '540px',
            }}
          >
            We empower property owners with technology-driven management and
            deliver exceptional guest experiences across India&apos;s most
            desirable destinations.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: '2rem',
              alignItems: 'center',
            }}
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.9rem',
                  color: 'var(--color-muted)',
                  fontWeight: 500,
                }}
              >
                <Icon size={16} strokeWidth={2.2} />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <Link href="/contact" className="btn btn-gradient">
              Partner With Us{' '}
              <ArrowRight size={18} style={{ marginLeft: '0.35rem' }} />
            </Link>
            <a
              href="https://book.hostizzy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Explore Stays
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column -- Property Mosaic */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          className="hero-mosaic"
        >
          {/* Image 1 -- large, spans 2 cols + 2 rows */}
          <div className="hero-mosaic__tile hero-mosaic__tile--large" style={tileStyle}>
            <img src={propertyImages[0].src} alt={propertyImages[0].alt} style={imgStyle} />
          </div>

          {/* Image 2 */}
          <div className="hero-mosaic__tile" style={tileStyle}>
            <img src={propertyImages[1].src} alt={propertyImages[1].alt} style={imgStyle} />
          </div>

          {/* Image 3 */}
          <div className="hero-mosaic__tile" style={tileStyle}>
            <img src={propertyImages[2].src} alt={propertyImages[2].alt} style={imgStyle} />
          </div>

          {/* Image 4 */}
          <div className="hero-mosaic__tile" style={tileStyle}>
            <img src={propertyImages[3].src} alt={propertyImages[3].alt} style={imgStyle} />
          </div>

          {/* Image 5 */}
          <div className="hero-mosaic__tile" style={tileStyle}>
            <img src={propertyImages[4].src} alt={propertyImages[4].alt} style={imgStyle} />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero-split__grid {
          display: grid;
          grid-template-columns: 55% 45%;
          align-items: center;
          gap: 3rem;
          padding: 4rem 1.5rem;
        }

        .hero-mosaic {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 190px 190px;
          gap: 0.75rem;
        }

        .hero-mosaic__tile--large {
          grid-column: 1 / 3;
          grid-row: 1 / 3;
        }

        .hero-mosaic__tile:hover {
          transform: scale(1.02);
        }

        /* Images 4 & 5 sit in a third row on desktop */
        .hero-mosaic__tile:nth-child(4) {
          grid-column: 1 / 2;
        }
        .hero-mosaic__tile:nth-child(5) {
          grid-column: 2 / 4;
        }

        @media (max-width: 768px) {
          .hero-split__grid {
            grid-template-columns: 1fr !important;
            padding: 2.5rem 1.25rem !important;
            gap: 2.5rem !important;
          }

          .hero-mosaic {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 170px 170px !important;
          }

          /* Hide the large image on mobile */
          .hero-mosaic__tile--large {
            display: none !important;
          }

          /* Reset grid placement for remaining tiles */
          .hero-mosaic__tile:nth-child(2),
          .hero-mosaic__tile:nth-child(3),
          .hero-mosaic__tile:nth-child(4),
          .hero-mosaic__tile:nth-child(5) {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
