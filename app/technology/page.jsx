'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '../../components/ScrollReveal';
import ChannelCarousel from '../../components/ChannelCarousel';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

// Site tokens only.
const INK = 'var(--color-foreground)';
const CORAL = 'var(--color-primary)';
const CORAL_TEXT = 'var(--color-primary-text)';
const MUTED = 'var(--color-muted)';
const RULE = 'var(--color-border)';
const GROUND = 'var(--color-secondary)';

const PRODUCTS = [
    {
        name: 'HostSuite',
        status: 'Live',
        line: 'The property management system.',
        body: 'Bookings, guests, payments and team coordination in one place, with GST-compliant invoicing and an AI Concierge that works the inbox across ten Indian languages.',
        does: [
            'Reads OTA confirmation emails and turns them into bookings',
            'Keeps four channel calendars in step, both directions',
            'Splits CGST, SGST and IGST on every invoice',
            'Carries an enquiry through seven stages to a paid booking',
        ],
        href: '/products/hostos',
        external: 'https://hostos.hostizzy.com/',
    },
    {
        name: 'ResIQ',
        status: 'In production',
        line: 'The field layer.',
        body: 'What the people at the property actually use. Reservations, payments and guest verification, built to keep working when the network does not.',
        does: [
            'Creates and edits bookings with the connection down',
            'Tracks cash, UPI, gateway and bank transfers against the booking',
            'Verifies guests by QR, with documents deleted after sixty days',
            'Gives owner, caretaker and guest each their own view',
        ],
        href: '/products/resiq',
        external: 'https://resiq.hostizzy.com/',
    },
    {
        name: 'JuxTravel',
        status: 'Early access · launches 1 Sept 2026',
        line: 'Discovery, from the traveller’s side.',
        body: 'Travellers describe the trip they want rather than filtering a list. Independent hosts only — the family-run stays that rarely surface on the large platforms.',
        does: [
            'Matches travellers to stays by how they actually travel',
            'Shows the honest trade-offs before booking, not after arrival',
            'Plans the trip and coordinates the group in one place',
            'Keeps a personal record of every trip taken',
        ],
        href: '/products/juxtravel',
        external: 'https://www.juxtravel.com',
    },
];

export default function Technology() {
    return (
        <>
            {/* ── Opening ── */}
            <section style={{ background: 'var(--color-dark-gradient)', color: '#fff' }}>
                <div
                    className="container"
                    style={{ paddingTop: 'calc(var(--header-height) + 5rem)', paddingBottom: '5rem' }}
                >
                    <h1
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 5.2vw, 4.25rem)',
                            lineHeight: 1.05,
                            letterSpacing: '-0.035em',
                            margin: 0,
                            maxWidth: '18ch',
                            textWrap: 'balance',
                        }}
                    >
                        We run properties. So we built the software.
                    </h1>
                    <p
                        style={{
                            marginTop: '1.75rem',
                            fontSize: '1.15rem',
                            lineHeight: 1.65,
                            color: 'rgba(255,255,255,0.72)',
                            maxWidth: '58ch',
                        }}
                    >
                        Every tool here exists because a property we manage needed it first. Nothing on this page is a
                        prototype waiting for a customer — it is the stack our own operation runs on, across
                        forty-five properties in fifteen cities.
                    </p>
                </div>
            </section>

            {/* ── The three products ── */}
            <section style={{ background: GROUND, borderBottom: `1px solid ${RULE}` }}>
                <div className="container" style={{ paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
                        {PRODUCTS.map((p) => (
                            <ScrollReveal key={p.name}>
                                <article className="tech-product" style={{ borderTop: `1px solid ${RULE}`, paddingTop: '2rem' }}>
                                    <div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                gap: '1rem',
                                                flexWrap: 'wrap',
                                                marginBottom: '0.85rem',
                                            }}
                                        >
                                            <h2
                                                style={{
                                                    fontFamily: 'var(--font-display)',
                                                    fontSize: 'clamp(1.85rem, 3.2vw, 2.6rem)',
                                                    letterSpacing: '-0.03em',
                                                    color: INK,
                                                    margin: 0,
                                                    lineHeight: 1.1,
                                                }}
                                            >
                                                {p.name}
                                            </h2>
                                            <span
                                                style={{
                                                    fontSize: '0.72rem',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.04em',
                                                    textTransform: 'uppercase',
                                                    color: CORAL_TEXT,
                                                }}
                                            >
                                                {p.status}
                                            </span>
                                        </div>

                                        <p style={{ fontSize: '1.05rem', fontWeight: 700, color: INK, margin: '0 0 0.6rem' }}>
                                            {p.line}
                                        </p>
                                        <p style={{ fontSize: '0.98rem', lineHeight: 1.65, color: MUTED, margin: '0 0 1.5rem', maxWidth: '50ch' }}>
                                            {p.body}
                                        </p>

                                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                            <Link
                                                href={p.href}
                                                className="tech-link"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.45rem',
                                                    color: INK,
                                                    fontWeight: 600,
                                                    fontSize: '0.95rem',
                                                    textDecoration: 'none',
                                                    borderBottom: `1px solid ${INK}`,
                                                    paddingBottom: '2px',
                                                }}
                                            >
                                                How it works <ArrowRight size={15} strokeWidth={2} />
                                            </Link>
                                            <a
                                                href={p.external}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="tech-link"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.45rem',
                                                    color: MUTED,
                                                    fontWeight: 600,
                                                    fontSize: '0.95rem',
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                Open {p.name} <ArrowUpRight size={15} strokeWidth={2} />
                                            </a>
                                        </div>
                                    </div>

                                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                        {p.does.map((d, i) => (
                                            <li
                                                key={d}
                                                style={{
                                                    padding: '0.85rem 0',
                                                    borderBottom: i < p.does.length - 1 ? `1px solid ${RULE}` : 'none',
                                                    fontSize: '0.93rem',
                                                    lineHeight: 1.55,
                                                    color: MUTED,
                                                }}
                                            >
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How they fit together ── */}
            <section style={{ background: '#fff', borderBottom: `1px solid ${RULE}` }}>
                <div className="container" style={{ paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
                    <h2
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.9rem, 3.4vw, 2.75rem)',
                            letterSpacing: '-0.03em',
                            color: INK,
                            margin: '0 0 2.75rem',
                            maxWidth: '20ch',
                            lineHeight: 1.12,
                        }}
                    >
                        How the three fit together
                    </h2>

                    <div className="tech-fit">
                        <div>
                            <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: INK, margin: '0 0 0.5rem' }}>
                                A booking arrives
                            </h3>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.62, color: MUTED, margin: 0, maxWidth: '44ch' }}>
                                From an OTA, a direct enquiry or a WhatsApp message. HostSuite records it, prices it and
                                invoices it, whichever way it came in.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: INK, margin: '0 0 0.5rem' }}>
                                Someone has to deliver it
                            </h3>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.62, color: MUTED, margin: 0, maxWidth: '44ch' }}>
                                ResIQ is what the caretaker opens on site — the guest arriving, the ID to verify, the
                                balance still to collect. It keeps working when the signal drops.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: INK, margin: '0 0 0.5rem' }}>
                                The next guest has to find you
                            </h3>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.62, color: MUTED, margin: 0, maxWidth: '44ch' }}>
                                JuxTravel approaches that from the traveller&apos;s side, matching independent stays to
                                the trip someone is actually trying to have.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Distribution ── */}
            <ChannelCarousel />

            {/* ── Close ── */}
            <section style={{ background: 'var(--color-dark-gradient)' }}>
                <div className="container" style={{ paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
                    <div className="tech-close">
                        <h2
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(1.9rem, 3.6vw, 3rem)',
                                letterSpacing: '-0.032em',
                                color: '#fff',
                                margin: 0,
                                lineHeight: 1.1,
                                maxWidth: '20ch',
                            }}
                        >
                            Built by people who still run the properties.
                        </h2>
                        <Link
                            href="/contact"
                            className="btn btn-primary"
                            style={{ textDecoration: 'none', padding: '0.9rem 1.75rem', justifySelf: 'start', alignSelf: 'center' }}
                        >
                            Talk to us <ArrowRight size={17} strokeWidth={2} />
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                .tech-product {
                    display: grid;
                    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
                    gap: 3rem;
                    align-items: start;
                }
                .tech-fit {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
                    gap: 2.5rem 3rem;
                }
                .tech-close {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) auto;
                    gap: 2.5rem;
                    align-items: center;
                }
                .tech-link { transition: opacity 0.2s ease; }
                .tech-link:hover { opacity: 0.65; }
                .tech-cta { transition: transform 0.22s cubic-bezier(0.16,1,0.3,1), opacity 0.22s ease; }
                .tech-cta:hover { transform: translateY(-2px); opacity: 0.92; }
                .tech-link:focus-visible,
                .tech-cta:focus-visible { outline: 2px solid ${CORAL}; outline-offset: 3px; }

                @media (max-width: 900px) {
                    .tech-product,
                    .tech-close { grid-template-columns: 1fr; gap: 2rem; }
                }
            `}</style>
        </>
    );
}
