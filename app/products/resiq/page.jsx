'use client';

import React from 'react';
import {
    Opening, RowPanel, Steps, Blocks, Terms, Close,
    PrimaryLink, ProductStyles,
} from '../../../components/product-sections';

const URL = 'https://resiq.hostizzy.com/';

/*
  ResIQ composition: a field tool, not a system. The page leads with the
  CONDITIONS it works under rather than a feature register, because that is
  what actually distinguishes it — and it carries no signup push, per the
  confirmed decision that ResIQ is technology proof on this site.
*/
export default function ResIQ() {
    return (
        <>
            <Opening
                variant="split"
                question="Put the spreadsheet down."
                answer="Bookings, payments, guest IDs and messages in one place — instead of a notebook, four chat threads and a spreadsheet that only one person understands."
                cta={<PrimaryLink href={URL}>Look at ResIQ</PrimaryLink>}
                ctaNote="Running across our own properties every day."
                panel={
                    <RowPanel
                        title="Conditions it works under"
                        meta="In production"
                        rows={[
                            { label: 'The network is down', state: 'Still works' },
                            { label: 'The caretaker is not technical', state: 'Built for it' },
                            { label: 'Payment arrived as cash', state: 'Tracked' },
                            { label: 'Guest ID sitting in a chat', state: 'Never' },
                            { label: 'Documents after 60 days', state: 'Deleted' },
                        ]}
                    />
                }
            />

            <Steps
                heading="A day at a property, in four moves"
                note="This is the sequence ResIQ was shaped around — not a feature list, the actual order things happen in."
                steps={[
                    { title: 'The enquiry', desc: 'It arrives by WhatsApp, a call, or an OTA. It goes on the board before anyone forgets it existed.' },
                    { title: 'The money', desc: 'Cash, UPI, gateway or bank transfer, recorded against the booking. What is still outstanding is visible without a reconciliation session.' },
                    { title: 'The arrival', desc: 'A QR code opens the guest portal. Aadhaar or passport, a selfie, done — with nothing landing in anyone’s personal chat.' },
                    { title: 'The handover', desc: 'Notes logged against the booking, so whoever is on shift tomorrow can see what was already said.' },
                ]}
            />

            <Blocks
                heading="Why it holds up in the field"
                columns="two"
                background="var(--color-secondary)"
                items={[
                    { title: 'Offline is the normal condition', desc: 'At a hill property, losing signal is routine rather than exceptional. Bookings can be created and edited with the connection down, and reconcile when it returns.' },
                    { title: 'Everyone sees only their own view', desc: 'Owner, caretaker and guest each get what belongs to them and nothing more. Permissions are set by you, not inherited from a role someone picked once.' },
                    { title: 'Documents do not linger', desc: 'Identity documents are deleted automatically sixty days after the stay — held as long as they are needed and no longer.' },
                    { title: 'It speaks the way the team does', desc: 'Templated messages in English or Hindi, logged against the booking rather than scattered across four phones.' },
                ]}
            />

            <Terms
                items={[
                    { q: 'What happens when the network drops?', a: 'You keep working. Bookings can be created and edited offline, and they reconcile once the connection comes back. This was built for hill and rural properties where losing signal is routine.' },
                    { q: 'Who is it for?', a: 'Owners who run their own homestay, villa or farmstay, usually alongside a caretaker on site. It was not built for management companies running someone else’s portfolio.' },
                    { q: 'Where has it been proven?', a: 'Across forty-five Hostizzy properties in fifteen Indian cities. It is the system our own field teams use, which is why it handles the awkward cases.' },
                    { q: 'What happens to guest documents?', a: 'They are deleted automatically sixty days after the stay. Identity documents are held for as long as they are needed and no longer.' },
                ]}
            />

            <Close line="The tool our field teams reach for first." />

            <ProductStyles />
        </>
    );
}
