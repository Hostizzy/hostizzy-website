'use client';

import React from 'react';
import {
    Opening, Steps, Blocks, Terms, Close,
    PrimaryLink, ProductStyles,
} from '../../../components/product-sections';

const URL = 'https://www.juxtravel.com';

/*
  JuxTravel composition: deliberately NOT the Handover frame. A traveller has
  no asset to hand over, so give/keep does not apply and the retained-control
  panel is absent. The page is a matching flow instead — describe the trip,
  see what comes back — with a wider hero, more air, and no dense register.
  Audience note: this is the one product page addressed to a traveller rather
  than a property owner, because the product is.
*/
export default function JuxTravel() {
    return (
        <>
            <Opening
                variant="wide"
                question="Don’t just find a stay. Find the trip that fits."
                answer="Every booking site starts with a city and two dates. JuxTravel starts with the trip you are trying to have — then works backwards to the independent homestays that actually suit it, and tells you the trade-offs before you book rather than after you arrive."
                cta={<PrimaryLink href={URL}>Visit JuxTravel</PrimaryLink>}
                ctaNote="Early access is open. Full launch 1 September 2026."
            />

            <Steps
                heading="How the matching works"
                background="var(--color-secondary)"
                steps={[
                    { title: 'Describe the trip', desc: 'Not filters and a price band. The kind of trip you want, who is coming, and what would make it worth the journey.' },
                    { title: 'Jux Fit answers', desc: 'Stays that suit that trip, rather than everything within range ordered by whoever paid the most to sit at the top.' },
                    { title: 'The Reality Layer', desc: 'Before you commit: how far it really is, what the effort actually costs you, and what the five-star reviews quietly left out.' },
                    { title: 'Passport remembers', desc: 'Your trips and the moments in them, kept as a personal record that shapes what gets suggested next time.' },
                ]}
            />

            <Blocks
                heading="Independent hosts only"
                note="No chains. The family-run homestays and villas that rarely surface on the large platforms, because nobody is paying to put them there."
                columns="two"
                items={[
                    { title: 'Built for how Indians actually travel', desc: 'Solo, couples, families, friends, seniors, workations and celebrations — each of which wants a different thing from the same house.' },
                    { title: 'Plan it with everyone coming', desc: 'Add local experiences and coordinate the group in one place, instead of a chat thread nobody can scroll back through.' },
                    { title: 'Hosts get support, not a form', desc: 'Independent hosts receive training and help rather than a listing page and silence.' },
                    { title: 'Honest before booking, not after', desc: 'The Reality Layer exists because the gap between the listing and the arrival is where trips go wrong.' },
                ]}
            />

            <Terms
                background="var(--color-secondary)"
                items={[
                    { q: 'When can I use it?', a: 'Early access is open now. The full launch across India is 1 September 2026.' },
                    { q: 'Who lists on JuxTravel?', a: 'Independent hosts only — no chains. The platform exists because family-run stays do not have the marketing budgets the chains do.' },
                    { q: 'How is this different from a booking site?', a: 'A booking site starts with dates and a city. JuxTravel starts with the trip you are trying to have, and works backwards to the stay that fits it.' },
                    { q: 'Is it connected to Hostizzy properties?', a: 'JuxTravel is built by the same team. Hostizzy-managed homes appear alongside other independent stays, matched on the same terms as everyone else.' },
                ]}
            />

            <Close
                line="Early access is open."
                cta={<PrimaryLink href={URL}>Visit JuxTravel</PrimaryLink>}
            />

            <ProductStyles />
        </>
    );
}
