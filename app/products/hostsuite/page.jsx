'use client';

import React from 'react';
import {
    Opening, Pairing, Register, Terms, Close,
    PrimaryLink, OutlineLink, TextLink, ProductMark, ProductStyles,
} from '../../../components/product-sections';
import { HOSTSUITE, PROPERTY_COUNT } from '../../../lib/products';

/*
  HostSuite composition: a large system, so the page is dense and the
  give/keep split is set structurally — two columns against each other in
  one viewport, which is the promise the contract makes.
  HostSuite was called HostOS until 2026; the product still lives on
  hostos.hostizzy.com, and /products/hostos redirects here.
*/
export default function HostSuite() {
    return (
        <>
            <Opening
                variant="wide"
                brand={<ProductMark src={HOSTSUITE.logo.icon} name={HOSTSUITE.name} sub={`by Hostizzy · formerly ${HOSTSUITE.formerly}`} />}
                question="Hand over the admin. Keep every decision."
                answer={`HostSuite runs the daily machinery of a hosting business — messages, invoices, calendars, follow-ups — while the calls that matter stay with you. It is the system our own operation runs on, across ${PROPERTY_COUNT} properties, and it is now open to other hosts as self-serve software.`}
                cta={
                    <>
                        <PrimaryLink href={HOSTSUITE.signupUrl}>Start 14-day free trial</PrimaryLink>
                        <OutlineLink href={HOSTSUITE.pricingUrl} onDark>See pricing</OutlineLink>
                        <TextLink href={HOSTSUITE.demoUrl}>Book a demo</TextLink>
                    </>
                }
                ctaNote={`From ${HOSTSUITE.priceFrom}. No credit card needed for the trial.`}
            />

            <Pairing
                leftTitle="What it takes off your hands"
                rightTitle="What stays yours"
                rightMeta="Unchanged by any of it"
                leftItems={[
                    { title: 'Guest messages, in ten languages', desc: 'The AI Concierge drafts replies in the guest’s own language, across ten Indian languages. Set it to Off, Suggest or Autopilot, so you decide how much it sends by itself.' },
                    { title: 'Niva, the AI agent', desc: 'Niva answers guests on WhatsApp and Instagram, quotes, holds dates and sends payment links. Your team approves any discount.' },
                    { title: 'Booking emails you never open', desc: 'Email Intelligence reads confirmations from Airbnb, Booking.com, MakeMyTrip, Goibibo, Agoda, Expedia and VRBO and turns them into bookings. Nobody retypes a reservation.' },
                    { title: 'GST, done correctly', desc: 'CGST, SGST and IGST split automatically with HSN codes, ready to file rather than ready to fix.' },
                    { title: 'Calendars kept in step', desc: 'Bidirectional iCal sync with a reliability dashboard, so a double booking stops being a category of problem.' },
                    { title: 'Enquiries that would have gone cold', desc: 'A seven-stage pipeline carries an enquiry to a confirmed booking without depending on anyone remembering.' },
                ]}
                rightRows={[
                    { label: 'Your OTA accounts and listings', state: 'Unchanged' },
                    { label: 'Guest contact details and history', state: 'Yours' },
                    { label: 'The final say on every rate', state: 'Your call' },
                    { label: 'Any discount Niva offers', state: 'Your approval' },
                    { label: 'GST invoices in your name', state: 'Compliant' },
                    { label: 'A live view of bookings and payouts', state: 'Always on' },
                ]}
            />

            <Register
                heading="Everything it does"
                note="Built for vacation rentals, homestays, boutique hotels, villas, farmstays and resorts — whether that is one property or a large portfolio."
                items={[
                    { title: 'Unified inbox', desc: 'WhatsApp through the official Meta Cloud API, Instagram DMs, webchat and Gmail, in one inbox.' },
                    { title: 'AI Concierge', desc: 'Off, Suggest or Autopilot. Drafts in the guest’s language across ten Indian languages, with a lead parser, a polish button and hot-lead alerts.' },
                    { title: 'Niva', desc: 'The AI agent that answers guests on WhatsApp and Instagram, quotes, holds dates and sends payment links. Your team approves discounts.' },
                    { title: 'Email Intelligence', desc: 'Confirmation emails from seven OTAs become reservations, with the payout, commission, GST, TDS and TCS pulled out of each one.' },
                    { title: 'Channel sync', desc: 'Bidirectional iCal sync with any channel that publishes a calendar feed, and a dashboard that shows when a feed stops updating.' },
                    { title: 'GST invoicing', desc: 'GST and non-GST invoices. Automatic CGST, SGST and IGST breakdown with HSN codes, slab-aware for tariffs above and below ₹7,500 a night. Razorpay payment links for collecting.' },
                    { title: 'Enquiries pipeline', desc: 'A seven-stage hospitality pipeline from first contact through to a confirmed, paid reservation.' },
                    { title: 'Owner portal', desc: 'Statements, payouts and P&L for whoever owns the property, without a monthly PDF.' },
                    { title: 'Guest portal', desc: 'Check-in, ID verification, meal pre-order, payment and review, reached by QR rather than an app install.' },
                    { title: 'Direct booking website', desc: 'A booking site for your own properties. It is what powers book.hostizzy.com.' },
                    { title: 'Reviews', desc: 'Imports reviews from Airbnb, Booking.com, MakeMyTrip and Google, with AI summaries of what guests keep saying.' },
                    { title: 'Broadcasts', desc: 'Send one update to past guests and leads, instead of the same message one chat at a time.' },
                    { title: 'Dynamic pricing', desc: 'AI rate optimisation reading demand, season, local events and competition — proposing, never overriding.' },
                    { title: 'SignFlow', desc: 'Digital agreements with WhatsApp OTP verification and e-signature capture.' },
                    { title: 'English and Hindi', desc: 'The whole interface in either language, for whoever on the team is using it.' },
                    { title: 'Mobile app', desc: 'Coming soon: an Android app for Google Play. Until then HostSuite runs in the browser on any phone or laptop.' },
                ]}
            />

            <Terms
                items={[
                    { q: 'Do I keep my OTA accounts?', a: 'Yes. HostSuite connects to your channels through their calendar feeds and confirmation emails rather than replacing them. The listings stay in your name and you keep the relationship.' },
                    { q: 'Who is it built for?', a: 'Hosting businesses and their teams: vacation rentals, homestays, boutique hotels, villas, farmstays and resorts. The fit is set by how many units you run, not by whether you call yourself a professional.' },
                    { q: 'What does it cost?', a: `From ${HOSTSUITE.priceFrom}, with larger plans as you grow and custom pricing for big portfolios. Every plan starts with a ${HOSTSUITE.trial}.` },
                    { q: 'Is this the same as HostOS?', a: 'Yes. HostOS was renamed HostSuite in 2026. The address, hostos.hostizzy.com, stays the same.' },
                    { q: 'Is there a mobile app?', a: 'The Android app is being prepared for Google Play. Today HostSuite runs in the browser on any phone, tablet or laptop.' },
                    { q: 'Has it actually been used?', a: 'It runs our own operation daily. Every feature here exists because a property we manage needed it first.' },
                ]}
            />

            <Close
                line="Built inside a working operation, not a pitch deck."
                cta={
                    <>
                        <PrimaryLink href={HOSTSUITE.signupUrl}>Start free trial</PrimaryLink>
                        <OutlineLink href={HOSTSUITE.demoUrl} onDark>Book a demo</OutlineLink>
                    </>
                }
            />

            <ProductStyles />
        </>
    );
}
