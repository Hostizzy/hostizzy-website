'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '../../components/ScrollReveal';
import ChannelCarousel from '../../components/ChannelCarousel';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { HOSTSUITE, RESIQ, JUXTRAVEL, PROPERTY_COUNT } from '../../lib/products';

// Site tokens only.
const INK = 'var(--color-foreground)';
const CORAL = 'var(--color-primary)';
const CORAL_TEXT = 'var(--color-primary-text)';
const MUTED = 'var(--color-muted)';
const RULE = 'var(--color-border)';
const GROUND = 'var(--color-secondary)';

// Copy per product lives here; names, statuses and URLs come from lib/products.js.
const PRODUCTS = [
    {
        ...HOSTSUITE,
        logoSrc: HOSTSUITE.logo.symbol,
        line: 'The property management system for hosting businesses.',
        body: `Bookings, guests, payments and the team in one place, with GST-compliant invoicing and an AI inbox that answers in ten Indian languages. Open to any host as self-serve software, from ${HOSTSUITE.priceFrom} with a 14-day free trial.`,
        does: [
            'Turns OTA confirmation emails from seven channels into bookings',
            'Keeps calendars in step with bidirectional iCal sync and a reliability dashboard',
            'Answers guests through the AI Concierge and Niva; your team approves discounts',
            'Splits CGST, SGST and IGST on every invoice, with owner statements and payouts',
        ],
        externalLabel: 'Start free trial',
        external: HOSTSUITE.signupUrl,
    },
    {
        ...RESIQ,
        logoSrc: RESIQ.logo.icon,
        line: 'The app for owners who run their own place.',
        body: 'For an independent homestay, villa or farmstay owner, usually with a caretaker on site. Bookings, payments and guest verification, built to keep working when the network does not.',
        does: [
            'Creates and edits bookings with the connection down',
            'Tracks cash, UPI, gateway and bank transfers against the booking',
            'Verifies guests by QR, with documents deleted after sixty days',
            'Lets the caretaker check guests in without seeing the money',
        ],
        externalLabel: 'Open ResIQ',
        external: RESIQ.url,
    },
    {
        ...JUXTRAVEL,
        logoSrc: JUXTRAVEL.logo.mark,
        line: 'Discovery, from the traveller’s side.',
        body: 'An Android app where travellers describe the trip they want rather than filtering a list. Independent hosts only — the family-run stays that rarely surface on the large platforms.',
        does: [
            'Matches travellers to stays by how they actually travel',
            'Shows the honest trade-offs before booking, not after arrival',
            'Plans the trip, coordinates the group and helps on the go',
            'Keeps a personal record of every trip taken',
        ],
        externalLabel: 'Get it on Google Play',
        external: JUXTRAVEL.playUrl,
    },
];

// Who uses which product. Three separate products for three different people.
const FIT = [
    {
        who: 'Hosting businesses and their teams',
        whoNote: 'Including Hostizzy’s own operation',
        product: HOSTSUITE,
        logoSrc: HOSTSUITE.logo.symbol,
        reaches: ['Airbnb, Booking.com, MakeMyTrip and other OTAs', 'Its own booking site, such as book.hostizzy.com', 'Owner statements and payouts'],
    },
    {
        who: 'An owner running their own homestay',
        whoNote: 'Usually with a caretaker on site',
        product: RESIQ,
        logoSrc: RESIQ.logo.icon,
        reaches: ['Their bookings, payments and guest IDs', 'OTA calendars and Gmail booking emails, imported', 'A caretaker login without the money'],
    },
    {
        who: 'Travellers',
        whoNote: 'Looking for a stay that fits the trip',
        product: JUXTRAVEL,
        logoSrc: JUXTRAVEL.logo.mark,
        reaches: ['Independent homestays and villas only', 'Listed by their own hosts, on equal terms'],
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
                        Every tool here started because a property we manage needed it first. HostSuite is the system
                        our own operation runs on, across {PROPERTY_COUNT} properties. ResIQ and JuxTravel come from the same
                        team, built for independent owners and for the travellers looking for them.
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
                                            <img
                                                src={p.logoSrc}
                                                alt=""
                                                width={40}
                                                height={40}
                                                style={{ display: 'block', alignSelf: 'center', borderRadius: 8, objectFit: 'contain' }}
                                            />
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
                                                {p.statusLine}
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
                                                href={p.path}
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
                                                {p.externalLabel} <ArrowUpRight size={15} strokeWidth={2} />
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

                    <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: MUTED, margin: '-1.5rem 0 2.75rem', maxWidth: '58ch' }}>
                        They do not plug into each other. Three separate products for three different people, built by
                        one team that runs properties every day.
                    </p>

                    <ol className="tech-fit" aria-label="Who uses which product">
                        {FIT.map((f) => (
                            <li key={f.product.key} className="tech-fit-row">
                                <div className="tech-fit-who">
                                    <span className="tech-fit-label">Who</span>
                                    <strong style={{ display: 'block', fontSize: '1.02rem', color: INK }}>{f.who}</strong>
                                    <span style={{ fontSize: '0.88rem', color: MUTED }}>{f.whoNote}</span>
                                </div>
                                <span className="tech-fit-arrow" aria-hidden="true" />
                                <Link href={f.product.path} className="tech-fit-product tech-link">
                                    <img src={f.logoSrc} alt="" width={36} height={36} style={{ display: 'block', borderRadius: 8, objectFit: 'contain' }} />
                                    <span>
                                        <strong style={{ display: 'block', fontSize: '1.1rem', color: INK }}>{f.product.name}</strong>
                                        <span style={{ fontSize: '0.8rem', color: MUTED }}>{f.product.category}</span>
                                    </span>
                                </Link>
                                <span className="tech-fit-arrow" aria-hidden="true" />
                                <ul className="tech-fit-reaches">
                                    {f.reaches.map((r) => (
                                        <li key={r}>{r}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
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
                .tech-fit { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.25rem; }
                .tech-fit-row {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 2.5rem minmax(0, 14rem) 2.5rem minmax(0, 1.2fr);
                    align-items: center;
                    padding: 1.5rem 1.75rem;
                    border: 1px solid ${RULE};
                    border-radius: 1rem;
                    background: ${GROUND};
                }
                .tech-fit-label {
                    display: block;
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: ${CORAL_TEXT};
                    margin-bottom: 0.3rem;
                }
                .tech-fit-arrow { position: relative; height: 2px; background: ${MUTED}; opacity: 0.45; margin: 0 0.4rem; }
                .tech-fit-arrow::after {
                    content: '';
                    position: absolute;
                    right: -1px;
                    top: -4px;
                    border: 5px solid transparent;
                    border-left: 7px solid ${MUTED};
                    border-right: 0;
                }
                .tech-fit-product {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.85rem 1rem;
                    background: #fff;
                    border: 1px solid ${RULE};
                    border-radius: 0.75rem;
                    text-decoration: none;
                    line-height: 1.2;
                }
                .tech-fit-reaches { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.35rem; }
                .tech-fit-reaches li { font-size: 0.92rem; line-height: 1.45; color: ${MUTED}; padding-left: 0.9rem; position: relative; }
                .tech-fit-reaches li::before { content: ''; position: absolute; left: 0; top: 0.6em; width: 5px; height: 5px; border-radius: 50%; background: ${CORAL}; }
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
                    .tech-fit-row { grid-template-columns: 1fr; gap: 0; padding: 1.25rem; }
                    .tech-fit-arrow { width: 2px; height: 1.5rem; margin: 0.5rem 0 0.5rem 1.4rem; }
                    .tech-fit-arrow::after { right: auto; left: -4px; top: auto; bottom: -1px; border: 5px solid transparent; border-top: 7px solid ${MUTED}; border-bottom: 0; }
                    .tech-fit-product { justify-self: start; }
                }
            `}</style>
        </>
    );
}
