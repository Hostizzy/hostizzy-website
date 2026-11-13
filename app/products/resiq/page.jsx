'use client';

import React from 'react';
import {
    Opening, RowPanel, Steps, Blocks, Terms, Close,
    PrimaryLink, OutlineLink, StoreLink, ProductMark, ProductStyles,
} from '../../../components/product-sections';
import { RESIQ, RESIQ_PUBLIC_SIGNUP, PROPERTY_COUNT } from '../../../lib/products';

/*
  ResIQ composition: a field tool, not a system. The page leads with the
  CONDITIONS it works under rather than a feature register, because that is
  what actually distinguishes it.
  ResIQ is its own product for independent owners (one owner plus a
  caretaker), not the on-site layer of HostSuite. Whether the page pushes
  sign-up is an owner decision, switched by RESIQ_PUBLIC_SIGNUP in
  lib/products.js.
*/
export default function ResIQ() {
    const heroCta = RESIQ_PUBLIC_SIGNUP ? (
        <>
            <StoreLink href={RESIQ.playUrl} />
            <OutlineLink href={RESIQ.signupUrl} onDark>Start free</OutlineLink>
        </>
    ) : (
        <PrimaryLink href={RESIQ.url}>Look at ResIQ</PrimaryLink>
    );

    return (
        <>
            <Opening
                variant="split"
                brand={<ProductMark src={RESIQ.logo.icon} name={RESIQ.name} sub="For homestay, villa and farmstay owners" />}
                question="Put the spreadsheet down."
                answer="One app for owners who run their own homestay, villa or farmstay: bookings, payments, guest IDs and WhatsApp messages in one place — instead of a notebook, four chat threads and a spreadsheet that only one person understands."
                cta={heroCta}
                ctaNote={RESIQ_PUBLIC_SIGNUP
                    ? `${RESIQ.offer} Accounts are approved by our team, usually the same day.`
                    : 'Live on Google Play and the web.'}
                panel={
                    <RowPanel
                        title="Conditions it works under"
                        meta="Live · Google Play + web"
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
                    { title: 'The enquiry', desc: 'It arrives by WhatsApp, a call, or an OTA. It goes on the board before anyone forgets it existed, and OTA bookings arrive on their own.' },
                    { title: 'The money', desc: 'Cash, UPI, gateway or bank transfer, recorded against the booking. What is still outstanding is visible, and ResIQ sends the reminder.' },
                    { title: 'The arrival', desc: 'A QR code opens the guest portal. Aadhaar or passport, a selfie, meal choices, done — with nothing landing in anyone’s personal chat.' },
                    { title: 'The handover', desc: 'Notes logged against the booking, so whoever is on shift tomorrow can see what was already said.' },
                ]}
            />

            <Blocks
                heading="Why it holds up in the field"
                columns="two"
                background="var(--color-secondary)"
                items={[
                    { title: 'Offline is the normal condition', desc: 'At a hill property, losing signal is routine rather than exceptional. Bookings, payments and check-ins work with the connection down, and sync when it returns.' },
                    { title: 'Your caretaker sees only their part', desc: 'Your caretaker can check guests in without seeing revenue, payouts or bank details. Invite by email, revoke in one tap.' },
                    { title: 'Documents do not linger', desc: 'Identity documents are deleted automatically sixty days after the stay — held as long as they are needed and no longer.' },
                    { title: 'It speaks the way you do', desc: 'Templated WhatsApp messages in English or Hindi, logged against the booking rather than scattered across four phones.' },
                ]}
            />

            <Blocks
                heading="Calendars, money and the app"
                columns="two"
                background="white"
                items={[
                    { title: 'Calendars and booking emails', desc: 'ResIQ reads the calendar feeds from Airbnb, Booking.com, Agoda, MakeMyTrip and Goibibo and blocks those dates for you, and imports booking confirmation emails from Gmail. The sync is one-way, into ResIQ, today; two-way sync is in testing.' },
                    { title: 'Payments that add up', desc: 'Advances and balances across cash, UPI, gateway and bank transfer, with payment reminders sent for you.' },
                    { title: 'Earnings you will actually read', desc: 'What you earned, what it cost, and which months fill and which sit empty, so next season is priced on evidence.' },
                    { title: 'On Android and web', desc: 'A native Android app on Google Play with offline mode, push notifications and biometric login, or the web app on any phone, tablet or laptop.' },
                ]}
            />

            <Terms
                background="var(--color-secondary)"
                items={[
                    { q: 'Who is it for?', a: 'Owners who run their own homestay, villa or farmstay, usually alongside a caretaker on site. It is not aimed at management companies running other people’s places; that is what HostSuite is for.' },
                    { q: 'What happens when the network drops?', a: 'You keep working. Bookings, payments and check-ins can be done offline, and they sync once the connection comes back. This was built for hill and rural properties where losing signal is routine.' },
                    ...(RESIQ_PUBLIC_SIGNUP
                        ? [{ q: 'What does it cost?', a: `${RESIQ.offer} Not a trial, and no card. If you add more properties later there is a paid plan, and the price is shared before anything changes.` }]
                        : []),
                    { q: 'Where has it been proven?', a: `It was built inside Hostizzy, which manages ${PROPERTY_COUNT} properties, and then shaped for one owner and a caretaker.` },
                    { q: 'What happens to guest documents?', a: 'They are deleted automatically sixty days after the stay. Identity documents are held for as long as they are needed and no longer.' },
                ]}
            />

            <Close
                line="Built for one owner and a caretaker."
                cta={RESIQ_PUBLIC_SIGNUP ? (
                    <>
                        <StoreLink href={RESIQ.playUrl} />
                        <OutlineLink href={RESIQ.signupUrl} onDark>Start free</OutlineLink>
                    </>
                ) : (
                    <PrimaryLink href={RESIQ.url}>Look at ResIQ</PrimaryLink>
                )}
            />

            <ProductStyles />
        </>
    );
}
