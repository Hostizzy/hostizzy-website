'use client';

/*
  Product surface sections.

  These use the site's own design system — globals.css tokens, .card, .btn,
  .section, --shadow-premium — so a product page reads as part of Hostizzy
  rather than as a separate site. Structure differs per product; the skin
  never does.

  Coral small text uses --color-primary-text, the accessible variant defined
  in globals.css alongside --color-primary. Nothing here defines its own colour.
*/

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

/* ── Opening ─────────────────────────────────────────────
   variant "split" — question left, panel right
   variant "wide"  — question alone, full measure, no panel
   brand — optional product mark set above the question
*/
export function Opening({ variant = 'split', brand, question, answer, cta, ctaNote, panel }) {
    const wide = variant === 'wide';
    return (
        <section
            style={{
                background: 'var(--color-dark-gradient)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* The same dot field and coral glow the other page heroes use. */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                    opacity: 0.5,
                }}
            />
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: '18%',
                    right: '8%',
                    width: '320px',
                    height: '320px',
                    background: 'var(--color-primary)',
                    filter: 'blur(150px)',
                    opacity: 0.15,
                }}
            />

            <div
                className={wide ? 'container' : 'container ps-split'}
                style={{
                    paddingTop: 'calc(var(--header-height) + 2rem)',
                    paddingBottom: '5rem',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <div>
                    {brand && <div style={{ marginBottom: '1.75rem' }}>{brand}</div>}
                    <h1
                        style={{
                            fontFamily: 'var(--font-display)',
                            color: 'white',
                            maxWidth: wide ? '20ch' : '15ch',
                            textWrap: 'balance',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {question}
                    </h1>
                    <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.78)', maxWidth: wide ? '62ch' : '54ch' }}>
                        {answer}
                    </p>
                    <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {cta}
                        {ctaNote && (
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.62)', maxWidth: '30ch', lineHeight: 1.5 }}>
                                {ctaNote}
                            </span>
                        )}
                    </div>
                </div>
                {!wide && panel}
            </div>
        </section>
    );
}

/* ── Panel of rows ───────────────────────────────────────*/
export function RowPanel({ title, meta, rows = [] }) {
    const reduce = useReducedMotion();
    return (
        <div className="card" style={{ boxShadow: 'var(--shadow-premium)', alignSelf: 'start' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1.35rem 1.75rem',
                    borderBottom: '1px solid var(--color-border)',
                }}
            >
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-foreground)' }}>{title}</span>
                {meta && <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{meta}</span>}
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {rows.map((r, i) => (
                    <motion.li
                        key={r.label}
                        initial={reduce ? false : { y: 7 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            gap: '1rem',
                            alignItems: 'baseline',
                            padding: '1.05rem 1.75rem',
                            borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
                        }}
                    >
                        <span style={{ fontSize: '0.95rem', color: 'var(--color-foreground)', lineHeight: 1.5 }}>{r.label}</span>
                        <span
                            style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                                color: 'var(--color-primary-text)',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {r.state}
                        </span>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}

/* ── Pairing ─────────────────────────────────────────────
   Give and keep set adjacent in one viewport, never a scroll apart.
*/
export function Pairing({ leftTitle, leftItems = [], rightTitle, rightMeta, rightRows = [], background = 'white' }) {
    return (
        <section className="section" style={{ background, borderBottom: '1px solid var(--color-border)' }}>
            <div className="container">
                <div className="ps-pairing">
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '2rem', maxWidth: '16ch' }}>{leftTitle}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                            {leftItems.map((it) => (
                                <div key={it.title}>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{it.title}</h3>
                                    <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-muted)', margin: 0, maxWidth: '46ch' }}>
                                        {it.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '2rem', maxWidth: '16ch' }}>{rightTitle}</h2>
                        <RowPanel title={rightMeta || 'Stays with you'} rows={rightRows} />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Blocks ──────────────────────────────────────────────*/
export function Blocks({ heading, note, items = [], columns = 'auto', background = 'var(--color-secondary)' }) {
    return (
        <section className="section" style={{ background, borderBottom: '1px solid var(--color-border)' }}>
            <div className="container">
                <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: note ? '1rem' : '3rem', maxWidth: '20ch' }}>{heading}</h2>
                {note && (
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-muted)', margin: '0 0 3rem', maxWidth: '54ch' }}>
                        {note}
                    </p>
                )}
                <div className={columns === 'two' ? 'ps-blocks is-two' : 'ps-blocks'}>
                    {items.map((it) => (
                        <div key={it.title} className="card card-feature">
                            <h3 style={{ marginBottom: '0.75rem' }}>{it.title}</h3>
                            <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-muted)', margin: 0 }}>{it.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Register ────────────────────────────────────────────
   Dense list for systems with genuinely many parts. Kept as a list
   rather than a card grid so it does not read as more feature cards.
*/
export function Register({ heading, note, items = [], background = 'var(--color-secondary)' }) {
    return (
        <section className="section" style={{ background, borderBottom: '1px solid var(--color-border)' }}>
            <div className="container">
                <div className="ps-reg-head">
                    <h2 style={{ fontFamily: 'var(--font-display)', maxWidth: '16ch' }}>{heading}</h2>
                    {note && (
                        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-muted)', margin: 0, maxWidth: '46ch' }}>{note}</p>
                    )}
                </div>
                <div className="card" style={{ marginTop: '3rem', background: 'white' }}>
                    <dl style={{ margin: 0 }}>
                        {items.map((it, i) => (
                            <div
                                key={it.title}
                                className="ps-reg-row"
                                style={{ borderBottom: i < items.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                            >
                                <dt style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-foreground)' }}>{it.title}</dt>
                                <dd style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-muted)', maxWidth: '62ch' }}>
                                    {it.desc}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}

/* ── Steps ───────────────────────────────────────────────*/
export function Steps({ heading, note, steps = [], background = 'white' }) {
    return (
        <section className="section" style={{ background, borderBottom: '1px solid var(--color-border)' }}>
            <div className="container">
                <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: note ? '1rem' : '3rem', maxWidth: '20ch' }}>{heading}</h2>
                {note && (
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-muted)', margin: '0 0 3rem', maxWidth: '54ch' }}>
                        {note}
                    </p>
                )}
                <div className="ps-steps">
                    {steps.map((s) => (
                        <div key={s.title} className="card card-feature">
                            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}>{s.title}</h3>
                            <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-muted)', margin: 0 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Plain terms ─────────────────────────────────────────*/
export function Terms({ heading = 'In plain terms', items = [], background = 'white' }) {
    return (
        <section className="section" style={{ background, borderBottom: '1px solid var(--color-border)' }}>
            <div className="container">
                <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '3rem', maxWidth: '18ch' }}>{heading}</h2>
                <div className="ps-terms">
                    {items.map((t) => (
                        <div key={t.q}>
                            <h3 style={{ marginBottom: '0.6rem' }}>{t.q}</h3>
                            <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-muted)', margin: 0, maxWidth: '56ch' }}>{t.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Close ───────────────────────────────────────────────*/
export function Close({ line, cta }) {
    return (
        <section className="section" style={{ background: 'var(--color-dark-gradient)', color: 'white' }}>
            <div className="container">
                <div className="ps-close">
                    <h2 style={{ fontFamily: 'var(--font-display)', color: 'white', maxWidth: '20ch' }}>{line}</h2>
                    {cta && <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>{cta}</div>}
                </div>
            </div>
        </section>
    );
}

/* ── Actions — the site's own buttons ────────────────────*/
export function PrimaryLink({ href, children }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.9rem 1.75rem' }}>
            {children} <ArrowUpRight size={17} strokeWidth={2} />
        </a>
    );
}

export function OutlineLink({ href, children, onDark = false }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{
                textDecoration: 'none',
                padding: '0.9rem 1.75rem',
                ...(onDark ? { border: '2px solid rgba(255,255,255,0.4)', color: 'white', background: 'transparent' } : {}),
            }}
        >
            {children} <ArrowRight size={16} strokeWidth={2} />
        </a>
    );
}

/* ── Google Play button ─────────────────────────────────
   Our own button, not Google's badge artwork: the Play glyph plus text.
*/
export function StoreLink({ href, label = 'Get it on Google Play', onDark = true }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
                textDecoration: 'none',
                padding: '0.8rem 1.4rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.7rem',
                background: onDark ? 'white' : 'var(--color-foreground)',
                color: onDark ? 'var(--color-foreground)' : 'white',
                fontWeight: 600,
            }}
        >
            <img src="/products/google-play.svg" alt="" width={20} height={20} style={{ display: 'block' }} />
            {label}
        </a>
    );
}

/* ── Quiet text link for a third action ─────────────────*/
export function TextLink({ href, children, onDark = true }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                color: onDark ? 'rgba(255,255,255,0.85)' : 'var(--color-foreground)',
                borderBottom: onDark ? '1px solid rgba(255,255,255,0.4)' : '1px solid var(--color-foreground)',
                paddingBottom: '2px',
            }}
        >
            {children} <ArrowUpRight size={15} strokeWidth={2} />
        </a>
    );
}

/* ── Product mark: a logo image beside the product name ─*/
export function ProductMark({ src, name, sub, size = 44, onDark = true, radius = 10 }) {
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem' }}>
            <img src={src} alt="" width={size} height={size} style={{ display: 'block', borderRadius: radius }} />
            <div style={{ lineHeight: 1.15 }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em', color: onDark ? 'white' : 'var(--color-foreground)' }}>{name}</div>
                {sub && (
                    <div style={{ fontSize: '0.85rem', color: onDark ? 'rgba(255,255,255,0.65)' : 'var(--color-muted)' }}>{sub}</div>
                )}
            </div>
        </div>
    );
}

/* ── Band with a short pitch and actions ────────────────*/
export function CtaBand({ heading, text, actions, background = 'white' }) {
    return (
        <section className="section" style={{ background, borderBottom: '1px solid var(--color-border)' }}>
            <div className="container">
                <div className="ps-band">
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem', maxWidth: '20ch' }}>{heading}</h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-muted)', margin: 0, maxWidth: '56ch' }}>{text}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>{actions}</div>
                </div>
            </div>
        </section>
    );
}

/* ── Layout rules only — no colour, no type ──────────────*/
export function ProductStyles() {
    return (
        <style>{`
            .ps-split { display: grid; grid-template-columns: minmax(0,1.3fr) minmax(0,1fr); gap: 4rem; align-items: start; }
            .ps-pairing { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 4rem; align-items: start; }
            .ps-blocks { display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem,1fr)); gap: 1.75rem; }
            .ps-blocks.is-two { grid-template-columns: repeat(auto-fit, minmax(min(23rem,100%),1fr)); gap: 2rem; }
            .ps-reg-head { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 2.5rem; align-items: end; }
            .ps-reg-row { display: grid; grid-template-columns: minmax(0,14rem) minmax(0,1fr); gap: 1.5rem; padding: 1.4rem 1.75rem; align-items: baseline; }
            .ps-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem,1fr)); gap: 1.75rem; }
            .ps-terms { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(20rem,100%),1fr)); gap: 2.5rem 3rem; }
            .ps-close { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 2.5rem; align-items: center; }
            .ps-band { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 2.5rem; align-items: center; }
            .ps-phones { display: flex; gap: 1.25rem; justify-content: center; align-items: flex-start; }
            .ps-phones img { width: min(38vw, 220px); height: auto; border-radius: 28px; box-shadow: var(--shadow-premium); display: block; }
            .ps-phones img + img { margin-top: 3rem; }

            @media (max-width: 900px) {
                .ps-split, .ps-pairing, .ps-reg-head, .ps-close, .ps-band { grid-template-columns: 1fr; gap: 2.5rem; }
                .ps-reg-row { grid-template-columns: 1fr; gap: .4rem; padding: 1.2rem 1.5rem; }
            }
        `}</style>
    );
}
