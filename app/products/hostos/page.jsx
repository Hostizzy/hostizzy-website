'use client';

import React from 'react';
import {
    Opening, Pairing, Register, Terms, Close,
    PrimaryLink, ProductStyles,
} from '../../../components/product-sections';

const URL = 'https://hostos.hostizzy.com/';

/*
  HostSuite composition: a large system, so the page is dense and the
  give/keep split is set structurally — two columns against each other in
  one viewport, which is the promise the contract makes.
*/
export default function HostSuite() {
    return (
        <>
            <Opening
                variant="wide"
                question="Hand over the admin. Keep every decision."
                answer="HostSuite runs the daily machinery of a property business — messages, invoices, calendars, follow-ups — while the calls that matter stay with you. It is the system our own operation runs on, across forty-five properties in fifteen cities."
                cta={<PrimaryLink href={URL}>Open HostSuite</PrimaryLink>}
                ctaNote="Pricing and sign-up live on the HostSuite site."
            />

            <Pairing
                leftTitle="What it takes off your hands"
                rightTitle="What stays yours"
                rightMeta="Unchanged by any of it"
                leftItems={[
                    { title: 'Guest messages, in ten languages', desc: 'An AI Concierge works the inbox across WhatsApp and Instagram in ten Indian languages, so a message at midnight does not wait until morning.' },
                    { title: 'Booking emails you never open', desc: 'Email intelligence reads OTA confirmations as they arrive and turns them into bookings. Nobody retypes a reservation.' },
                    { title: 'GST, done correctly', desc: 'CGST, SGST and IGST split automatically with HSN codes, ready to file rather than ready to fix.' },
                    { title: 'Four calendars kept in step', desc: 'Bidirectional sync across Airbnb, Booking.com, Agoda and MakeMyTrip, so a double booking stops being a category of problem.' },
                    { title: 'Enquiries that would have gone cold', desc: 'A seven-stage pipeline carries an enquiry to a confirmed booking without depending on anyone remembering.' },
                ]}
                rightRows={[
                    { label: 'Your OTA accounts and listings', state: 'Unchanged' },
                    { label: 'Guest contact details and history', state: 'Yours' },
                    { label: 'The final say on every rate', state: 'Your call' },
                    { label: 'GST invoices in your name', state: 'Compliant' },
                    { label: 'A live view of bookings and payouts', state: 'Always on' },
                ]}
            />

            <Register
                heading="Everything it does"
                note="Built for vacation rentals, homestays, boutique hotels, villas, farmstays and resorts — whether that is one property or fifteen."
                items={[
                    { title: 'AI Concierge', desc: 'Inbox management across ten Indian languages, working the conversations your team would otherwise handle one thread at a time.' },
                    { title: 'Email intelligence', desc: 'Reads incoming OTA confirmation emails and converts them into structured bookings automatically.' },
                    { title: 'Channel sync', desc: 'Bidirectional iCal across Airbnb, Booking.com, Agoda and MakeMyTrip, with availability held consistent in both directions.' },
                    { title: 'GST invoicing', desc: 'Automatic CGST, SGST and IGST breakdown with HSN codes, slab-aware for tariffs above and below ₹7,500 a night.' },
                    { title: 'Enquiries pipeline', desc: 'A seven-stage hospitality pipeline from first contact through to a confirmed, paid reservation.' },
                    { title: 'Guest portal', desc: 'Self-service check-in, document upload and payment, reached by QR rather than an app install.' },
                    { title: 'Owner portal', desc: 'Live performance, occupancy and payout visibility for whoever owns the property, without a monthly PDF.' },
                    { title: 'WhatsApp and Instagram', desc: 'Native integration with both, because that is where Indian guests actually write from.' },
                    { title: 'Dynamic pricing', desc: 'AI rate optimisation reading demand, season, local events and competition — proposing, never overriding.' },
                    { title: 'SignFlow', desc: 'Digital agreements with WhatsApp OTP verification and e-signature capture.' },
                ]}
            />

            <Terms
                items={[
                    { q: 'Do I keep my OTA accounts?', a: 'Yes. HostSuite syncs with Airbnb, Booking.com, Agoda and MakeMyTrip rather than replacing them. The listings stay in your name and you keep the relationship.' },
                    { q: 'Who is it built for?', a: 'Owners of vacation rentals, homestays, boutique hotels, villas, farmstays and resorts. The fit is set by how many units you run, not by whether you call yourself a professional.' },
                    { q: 'What does it cost?', a: 'Plans start at a single property and scale from there. Current pricing sits on the HostSuite site, where you can also start without talking to anyone.' },
                    { q: 'Has it actually been used?', a: 'It runs our own operation daily. Every feature here exists because a property we manage needed it first.' },
                ]}
            />

            <Close
                line="Built inside a working operation, not a pitch deck."
                cta={<PrimaryLink href={URL}>Open HostSuite</PrimaryLink>}
            />

            <ProductStyles />
        </>
    );
}
