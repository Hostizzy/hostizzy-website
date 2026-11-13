import React from 'react';
import Link from 'next/link';
import { FAQS } from '@/lib/faq';

// Server-rendered so every answer is in the HTML (search engines and the
// FAQPage schema in layout.jsx need the answers visible). <details> gives
// the open/close behaviour without client JavaScript.

export default function FAQ() {
    return (
        <>
            <section className="section bg-secondary text-center" style={{ padding: 'calc(var(--header-height) + 3rem) 0 4rem' }}>
                <div className="container">
                    <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>Frequently asked questions</h1>
                    <p className="subtitle">Plans, fees, operations and what to expect when you host with Hostizzy.</p>
                </div>
            </section>

            <section className="container section" style={{ maxWidth: '800px' }}>
                <style>{`
                    .faq-item { background: white; border: 1px solid #e2e8f0; border-radius: 1rem; margin-bottom: 0.9rem; }
                    .faq-item summary { list-style: none; cursor: pointer; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; font-weight: 600; font-size: 1.05rem; color: #1e293b; }
                    .faq-item summary::-webkit-details-marker { display: none; }
                    .faq-item summary::after { content: '+'; font-size: 1.4rem; line-height: 1; color: var(--color-primary); flex-shrink: 0; }
                    .faq-item[open] summary::after { content: '−'; }
                    .faq-item summary:focus-visible { outline: 3px solid rgba(254,88,88,0.45); outline-offset: 2px; border-radius: 1rem; }
                    .faq-item p { margin: 0; padding: 0 1.5rem 1.35rem; color: #475569; line-height: 1.7; }
                `}</style>
                {FAQS.map((item, i) => (
                    <details key={item.q} className="faq-item" open={i === 0}>
                        <summary>{item.q}</summary>
                        <p>{item.a}</p>
                    </details>
                ))}
                <p style={{ marginTop: '2rem', color: '#64748b', textAlign: 'center' }}>
                    Still have a question? <Link href="/contact" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Contact our team</Link> or <Link href="/calculator" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>see what your home could earn</Link>.
                </p>
            </section>
        </>
    );
}
