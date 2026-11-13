'use client';

import React from 'react';
import {
    Opening, Steps, Blocks, Terms, Close, CtaBand,
    OutlineLink, StoreLink, TextLink, ProductStyles,
} from '../../../components/product-sections';
import { JUXTRAVEL } from '../../../lib/products';

/*
  JuxTravel composition: deliberately NOT the Handover frame. A traveller has
  no asset to hand over, so give/keep does not apply and the retained-control
  panel is absent. The page is a matching flow instead — describe the trip,
  see what comes back — with the app itself beside the opening line.
  Audience note: this is the one product page addressed to a traveller rather
  than a property owner, because the product is.
  Brand note: JuxTravel art (wordmark, app screens, otter) is used exactly as
  supplied — never recoloured or cropped. Never quote listing counts or
  present Hostizzy's own homes as marketplace traction.
*/
export default function JuxTravel() {
    return (
        <>
            <Opening
                variant="split"
                brand={
                    <img
                        src={JUXTRAVEL.logo.wordmarkWhite}
                        alt="JuxTravel"
                        width={615}
                        height={93}
                        style={{ display: 'block', width: 'auto', height: '30px' }}
                    />
                }
                question="Don’t just find a stay. Find the trip that fits."
                answer="Every booking site starts with a city and two dates. JuxTravel starts with the trip you are trying to have — then works backwards to the independent homestays that actually suit it, and tells you the trade-offs before you book rather than after you arrive."
                cta={
                    <>
                        <StoreLink href={JUXTRAVEL.playUrl} />
                        <OutlineLink href={JUXTRAVEL.url} onDark>Visit juxtravel.com</OutlineLink>
                    </>
                }
                ctaNote={JUXTRAVEL.statusLine}
                panel={
                    <div className="ps-phones">
                        <img
                            src={JUXTRAVEL.screens.home}
                            alt="JuxTravel app home screen: Tell Jux about your trip"
                            width={1080}
                            height={2200}
                            loading="eager"
                        />
                        <img
                            src={JUXTRAVEL.screens.passport}
                            alt="JuxTravel Passport screen with stamps, moments and trip history"
                            width={1080}
                            height={2400}
                            loading="lazy"
                        />
                    </div>
                }
            />

            <Steps
                heading="How the matching works"
                background="var(--color-secondary)"
                steps={[
                    { title: 'Describe the trip', desc: 'Not filters and a price band. The kind of trip you want, who is coming, and what would make it worth the journey.' },
                    { title: 'Jux Fit answers', desc: 'Stays that suit that trip, rather than everything within range ordered by whoever paid the most to sit at the top.' },
                    { title: 'The Reality Layer', desc: 'Before you commit: how far it really is, what the effort actually costs you, and what the five-star reviews quietly left out.' },
                    { title: 'Help on the go', desc: 'Add local experiences, coordinate the group, and ask the AI travel companion when you need help on the road.' },
                    { title: 'Passport remembers', desc: 'Your trips and the moments in them, kept as a personal record that shapes what gets suggested next time.' },
                ]}
            />

            <Blocks
                heading="Independent hosts only"
                note="No chains. The family-run homestays and villas that rarely surface on the large platforms, because nobody is paying to put them there."
                columns="two"
                items={[
                    { title: 'Built for how Indians actually travel', desc: 'Solo, couples, families, friends, seniors, workations, pets and celebrations — each of which wants a different thing from the same house.' },
                    { title: 'Plan it with everyone coming', desc: 'Add local experiences and coordinate the group in one place, instead of a chat thread nobody can scroll back through.' },
                    { title: 'Hosts get support, not a form', desc: 'Onboarding, photography and pricing guidance come with joining, and a person answers when a host asks.' },
                    { title: 'Honest before booking, not after', desc: 'The Reality Layer exists because the gap between the listing and the arrival is where trips go wrong.' },
                ]}
            />

            <CtaBand
                background="var(--color-secondary)"
                heading="Own a homestay or villa?"
                text="List it on JuxTravel and reach travellers looking for exactly your kind of place. Independent hosts only, with onboarding and support from a real person."
                actions={
                    <>
                        <a
                            href={JUXTRAVEL.hostsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ textDecoration: 'none', padding: '0.9rem 1.75rem' }}
                        >
                            List your homestay
                        </a>
                        <TextLink href={JUXTRAVEL.hostConsoleUrl} onDark={false}>Host console</TextLink>
                    </>
                }
            />

            <Terms
                items={[
                    { q: 'When can I use it?', a: `Now. JuxTravel launched on ${JUXTRAVEL.launchDate} and is live across India on Android. There is no iOS app yet.` },
                    { q: 'Who lists on JuxTravel?', a: 'Independent hosts only — no chains. The platform exists because family-run stays do not have the marketing budgets the chains do.' },
                    { q: 'How is this different from a booking site?', a: 'A booking site starts with dates and a city. JuxTravel starts with the trip you are trying to have, and works backwards to the stay that fits it.' },
                    { q: 'Is it connected to Hostizzy?', a: 'Built by the same team. Hostizzy-managed homes are listed on the same terms as any other host.' },
                ]}
            />

            <Close
                line="Live across India. Find the trip that fits."
                cta={<StoreLink href={JUXTRAVEL.playUrl} />}
            />

            <ProductStyles />
        </>
    );
}
