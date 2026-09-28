'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import { Scale, Mail, Phone } from 'lucide-react';

const sectionStyle = {
    marginBottom: '3rem',
};

const h2Style = {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '1rem',
    marginTop: '0',
    fontFamily: 'var(--font-heading)',
    letterSpacing: '-0.02em',
};

const h3Style = {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#334155',
    marginBottom: '0.75rem',
    marginTop: '1.5rem',
};

const pStyle = {
    marginBottom: '1rem',
    lineHeight: 1.8,
    color: '#475569',
    fontSize: '1rem',
};

const ulStyle = {
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
    lineHeight: 1.8,
    color: '#475569',
};

const liStyle = {
    marginBottom: '0.5rem',
};

export default function Terms() {
    return (
        <>
            {/* Hero Section */}
            <section style={{
                padding: 'calc(var(--header-height) + 3rem) 0 4rem',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 80% 50%, rgba(254, 88, 88, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1.5rem',
                                background: 'rgba(254, 88, 88, 0.15)',
                                borderRadius: '2rem',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(254, 88, 88, 0.25)'
                            }}>
                                <Scale size={16} color="#FE5858" />
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Legal Agreement</span>
                            </div>

                            <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.15, color: 'white' }}>
                                Terms &amp; Conditions
                            </h1>

                            <p style={{ fontSize: '1.15rem', opacity: 0.8, lineHeight: 1.6, color: 'white', maxWidth: '650px', margin: '0 auto' }}>
                                The terms governing your use of Hostizzy&apos;s platforms, services, and products operated by Hostsphere India Pvt Ltd.
                            </p>

                            <p style={{ fontSize: '0.9rem', opacity: 0.5, color: 'white', marginTop: '1.5rem' }}>
                                Last Updated: April 2026
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Content */}
            <section style={{ padding: '4rem 0 5rem', background: '#ffffff' }}>
                <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>

                    {/* 1. Acceptance */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>1. Acceptance of Terms</h2>
                            <p style={pStyle}>
                                By accessing, browsing, or using any of the platforms, applications, or services provided by Hostsphere India Pvt Ltd (operating under the brand name <strong>&quot;Hostizzy&quot;</strong>), you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions (&quot;Terms&quot;). These Terms constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Hostsphere India Pvt Ltd (&quot;Hostizzy,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                            </p>
                            <p style={pStyle}>
                                If you do not agree to these Terms, you must not access or use our services. Your continued use of any Hostizzy platform constitutes acceptance of these Terms and any subsequent modifications.
                            </p>
                            <p style={pStyle}>
                                These Terms apply to all users, including but not limited to property owners, guests, visitors, and anyone who accesses our platforms or receives our services.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 2. Definitions */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>2. Definitions</h2>
                            <p style={pStyle}>For the purposes of these Terms:</p>

                            <div style={{
                                background: '#f8fafc',
                                borderRadius: '12px',
                                padding: '1.5rem 2rem',
                                marginBottom: '1rem',
                                border: '1px solid #e2e8f0'
                            }}>
                                <ul style={{ ...ulStyle, listStyle: 'none', paddingLeft: 0, marginBottom: 0 }}>
                                    <li style={{ ...liStyle, paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                                        <strong>&quot;Hostizzy&quot;</strong> refers to Hostsphere India Pvt Ltd, its brand &quot;Hostizzy,&quot; and all associated platforms and services.
                                    </li>
                                    <li style={{ ...liStyle, paddingTop: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                                        <strong>&quot;Owner&quot;</strong> or <strong>&quot;Property Owner&quot;</strong> refers to any individual or entity that lists, registers, or enrolls a property with Hostizzy for management services.
                                    </li>
                                    <li style={{ ...liStyle, paddingTop: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                                        <strong>&quot;Guest&quot;</strong> refers to any individual who books, stays at, or uses a property managed or listed through Hostizzy.
                                    </li>
                                    <li style={{ ...liStyle, paddingTop: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                                        <strong>&quot;Property&quot;</strong> refers to any vacation rental, homestay, villa, apartment, or accommodation listed or managed through Hostizzy.
                                    </li>
                                    <li style={{ ...liStyle, paddingTop: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                                        <strong>&quot;Platform&quot;</strong> refers to all Hostizzy digital properties, including www.hostizzy.com, book.hostizzy.com, hostos.hostizzy.com (HostOS), resiq.hostizzy.com (ResIQ), mobile applications, and any related tools or portals.
                                    </li>
                                    <li style={{ ...liStyle, paddingTop: '0.75rem' }}>
                                        <strong>&quot;Services&quot;</strong> refers to all property management, booking, technology, marketing, hospitality, and consulting services offered by Hostizzy.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* 3. Our Services */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>3. Our Services</h2>
                            <p style={pStyle}>
                                Hostizzy provides a comprehensive suite of vacation rental management services across India. Our services include but are not limited to:
                            </p>

                            <h3 style={h3Style}>3.1 Property Management</h3>
                            <p style={pStyle}>We offer five distinct management plans tailored to different owner needs:</p>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>SmartStart:</strong> One-time property setup and OTA listing service for new hosts</li>
                                <li style={liStyle}><strong>ChannelPro:</strong> Ongoing channel management across multiple OTA platforms</li>
                                <li style={liStyle}><strong>Hybrid Core:</strong> Commission-based co-hosting model combining owner involvement with professional management</li>
                                <li style={liStyle}><strong>TotalCare360:</strong> Full-service property management with profit-sharing for villas and premium properties</li>
                                <li style={liStyle}><strong>StayPrime:</strong> Complete end-to-end management including staffing, consumables, and operations for apartments</li>
                            </ul>
                            <p style={pStyle}>
                                Specific pricing, terms, and deliverables for each plan are detailed in the individual management agreement executed between Hostizzy and the property owner.
                            </p>

                            <h3 style={h3Style}>3.2 Booking Platform</h3>
                            <p style={pStyle}>
                                Our booking platform at <strong>book.hostizzy.com</strong> allows guests to search, view, and book stays at Hostizzy-managed properties. Bookings are also facilitated through third-party OTA platforms including Airbnb, Booking.com, MakeMyTrip, Agoda, and others.
                            </p>

                            <h3 style={h3Style}>3.3 Technology Products</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>HostOS</strong> (hostos.hostizzy.com): Our property management system for day-to-day operations including task management, guest communications, housekeeping coordination, and maintenance tracking.</li>
                                <li style={liStyle}><strong>ResIQ</strong> (resiq.hostizzy.com): Our owner portal providing real-time analytics, revenue reporting, booking calendars, guest KYC management, and financial dashboards.</li>
                            </ul>

                            <h3 style={h3Style}>3.4 Guest Experiences &amp; Wedding Services</h3>
                            <p style={pStyle}>
                                Hostizzy curates bespoke guest experiences including local tours, adventure activities, private chefs, and celebration arrangements. We also provide venue coordination and hospitality management for intimate weddings and events at select managed properties.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 4. User Accounts */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>4. User Accounts</h2>

                            <h3 style={h3Style}>4.1 Registration</h3>
                            <p style={pStyle}>
                                Certain services require you to create an account or register with Hostizzy. When registering, you agree to provide accurate, current, and complete information. You are responsible for maintaining the accuracy of your account information.
                            </p>

                            <h3 style={h3Style}>4.2 Account Security</h3>
                            <p style={pStyle}>
                                You are responsible for maintaining the confidentiality of your account credentials, including your password and any access tokens. You agree to notify Hostizzy immediately of any unauthorized use of your account. Hostizzy shall not be liable for any loss or damage arising from your failure to protect your account credentials.
                            </p>

                            <h3 style={h3Style}>4.3 Account Termination</h3>
                            <p style={pStyle}>
                                You may request account deletion at any time by contacting us. Hostizzy reserves the right to suspend or terminate your account if:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>You breach any provision of these Terms</li>
                                <li style={liStyle}>Information provided is found to be inaccurate, misleading, or fraudulent</li>
                                <li style={liStyle}>Your account is involved in illegal, abusive, or harmful activity</li>
                                <li style={liStyle}>As required by law or regulatory order</li>
                            </ul>
                            <p style={pStyle}>
                                Upon termination, your right to access the Platform ceases immediately. Provisions of these Terms that by their nature should survive termination (including but not limited to intellectual property, limitation of liability, and dispute resolution) will continue in effect.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 5. Property Owner Terms */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>5. Property Owner Terms</h2>

                            <h3 style={h3Style}>5.1 Management Agreement</h3>
                            <p style={pStyle}>
                                Property owners who enroll with Hostizzy will execute a separate Management Agreement that details the specific terms, pricing, services, and obligations applicable to their property and chosen management plan. These Terms &amp; Conditions supplement the Management Agreement; in the event of a conflict, the Management Agreement shall prevail.
                            </p>

                            <h3 style={h3Style}>5.2 Listing Authorization</h3>
                            <p style={pStyle}>
                                By enrolling your property with Hostizzy, you authorize us to:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Create, optimize, and manage listings on your behalf across OTA platforms and our direct booking website</li>
                                <li style={liStyle}>Use property photographs, descriptions, and other content for marketing and listing purposes</li>
                                <li style={liStyle}>Set and adjust pricing based on market demand, seasonality, and competitive analysis (as agreed in your plan)</li>
                                <li style={liStyle}>Communicate with guests on your behalf regarding bookings, check-ins, and stays</li>
                                <li style={liStyle}>Accept or decline booking requests based on your property&apos;s availability and policies</li>
                            </ul>

                            <h3 style={h3Style}>5.3 Commission &amp; Fee Structure</h3>
                            <p style={pStyle}>
                                Fees vary by plan and are detailed in the Management Agreement:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>SmartStart:</strong> One-time setup fee</li>
                                <li style={liStyle}><strong>ChannelPro:</strong> Monthly retainer fee</li>
                                <li style={liStyle}><strong>Hybrid Core:</strong> Percentage commission on booking revenue</li>
                                <li style={liStyle}><strong>TotalCare360:</strong> Profit-sharing model</li>
                                <li style={liStyle}><strong>StayPrime:</strong> Revenue-sharing model covering all operational expenses</li>
                            </ul>
                            <p style={pStyle}>
                                All fees are exclusive of applicable GST unless stated otherwise. Hostizzy reserves the right to revise fee structures with 30 days&apos; prior written notice.
                            </p>

                            <h3 style={h3Style}>5.4 Owner Responsibilities</h3>
                            <p style={pStyle}>Property owners agree to:</p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Maintain adequate property insurance (fire, liability, and contents) throughout the management period</li>
                                <li style={liStyle}>Ensure the property complies with all local laws, zoning regulations, building codes, and short-term rental regulations</li>
                                <li style={liStyle}>Maintain the property in a safe, habitable condition and address structural or major maintenance issues promptly</li>
                                <li style={liStyle}>Provide accurate information about the property, its amenities, and any known issues</li>
                                <li style={liStyle}>Obtain all necessary permits, licenses, and approvals for operating a vacation rental</li>
                                <li style={liStyle}>Pay applicable taxes on rental income as required by Indian tax law</li>
                            </ul>

                            <h3 style={h3Style}>5.5 Exclusivity</h3>
                            <p style={pStyle}>
                                Depending on the management plan, certain exclusivity terms may apply to listing and channel management. These will be detailed in the Management Agreement. In general, properties under full management (TotalCare360, StayPrime) grant Hostizzy exclusive listing rights for the duration of the agreement.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 6. Guest Terms */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>6. Guest Terms</h2>

                            <h3 style={h3Style}>6.1 Bookings</h3>
                            <p style={pStyle}>
                                All bookings are subject to availability and confirmation. A booking is confirmed only upon receipt of payment and issuance of a booking confirmation (via email, WhatsApp, or the booking platform). Hostizzy reserves the right to decline a booking at its sole discretion.
                            </p>

                            <h3 style={h3Style}>6.2 Payment</h3>
                            <p style={pStyle}>
                                Payment terms, including the amount due, payment schedule, and accepted methods, are communicated at the time of booking. Failure to complete payment within the stipulated timeframe may result in automatic cancellation of the booking.
                            </p>

                            <h3 style={h3Style}>6.3 Check-In &amp; Check-Out</h3>
                            <p style={pStyle}>
                                Guests must comply with the check-in and check-out times specified for their booking. Early check-in or late check-out is subject to availability and may incur additional charges. Valid government-issued photo identification is required at check-in for all adult guests as part of our KYC compliance.
                            </p>

                            <h3 style={h3Style}>6.4 Property Rules</h3>
                            <p style={pStyle}>
                                Guests agree to comply with all property-specific house rules communicated at the time of booking or check-in, including but not limited to:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Occupancy limits and guest registration requirements</li>
                                <li style={liStyle}>Noise levels, quiet hours, and community guidelines</li>
                                <li style={liStyle}>Smoking, pet, and party/event policies</li>
                                <li style={liStyle}>Swimming pool, amenity, and common area usage rules</li>
                                <li style={liStyle}>Garbage disposal and cleanliness expectations</li>
                            </ul>

                            <h3 style={h3Style}>6.5 Damage Liability &amp; Security Deposits</h3>
                            <p style={pStyle}>
                                Guests are liable for any damage caused to the property, its contents, or amenities during their stay, beyond normal wear and tear. Hostizzy may collect a refundable security deposit prior to check-in, which will be refunded (in full or in part) after check-out inspection. In the event of damage exceeding the security deposit amount, the guest agrees to pay the balance within 7 days of notification.
                            </p>

                            <h3 style={h3Style}>6.6 Cancellation &amp; Refunds</h3>
                            <p style={pStyle}>
                                Cancellation and refund policies vary by property and booking channel. The applicable cancellation policy is clearly communicated at the time of booking. For bookings made through third-party OTA platforms, the OTA&apos;s cancellation policy applies. For direct bookings via book.hostizzy.com, Hostizzy&apos;s cancellation policy applies as stated on the booking confirmation.
                            </p>
                            <p style={pStyle}>
                                In the event of cancellation by Hostizzy due to unforeseen circumstances (force majeure, property damage, safety concerns), guests will receive a full refund or an alternative property of equivalent or superior standard, at Hostizzy&apos;s discretion.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 7. Payments */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>7. Payments</h2>

                            <h3 style={h3Style}>7.1 Accepted Payment Methods</h3>
                            <p style={pStyle}>Hostizzy accepts the following payment methods:</p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>UPI (Google Pay, PhonePe, Paytm, BHIM, etc.)</li>
                                <li style={liStyle}>Net banking and NEFT/RTGS/IMPS bank transfers</li>
                                <li style={liStyle}>Credit and debit cards (Visa, Mastercard, RuPay, American Express)</li>
                                <li style={liStyle}>Payment links and online payment gateways</li>
                                <li style={liStyle}>Payments through OTA platforms (processed by the respective platform)</li>
                            </ul>

                            <h3 style={h3Style}>7.2 GST &amp; Taxes</h3>
                            <p style={pStyle}>
                                All applicable Goods &amp; Services Tax (GST) will be charged as per prevailing Indian tax laws. Currently, accommodation services attract GST at rates determined by the tariff value of the property. GST registration details and invoices will be provided for all transactions. Property owners are responsible for their own income tax obligations on rental income.
                            </p>

                            <h3 style={h3Style}>7.3 Owner Payouts</h3>
                            <p style={pStyle}>
                                Payouts to property owners are processed as per the schedule defined in the Management Agreement. Typically, payouts are processed within 7-10 business days after guest check-out. Detailed revenue statements are accessible through the ResIQ owner portal. Payouts are made via bank transfer (NEFT/RTGS) to the bank account registered in the owner&apos;s profile.
                            </p>

                            <h3 style={h3Style}>7.4 Disputed Payments</h3>
                            <p style={pStyle}>
                                Any payment disputes must be raised within 30 days of the transaction. Hostizzy will investigate disputed payments and resolve them within a reasonable timeframe. For bookings made through OTA platforms, the respective platform&apos;s dispute resolution process applies.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 8. Intellectual Property */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>8. Intellectual Property</h2>

                            <h3 style={h3Style}>8.1 Hostizzy&apos;s Intellectual Property</h3>
                            <p style={pStyle}>
                                All intellectual property rights in the Hostizzy brand, logos, trademarks (including but not limited to &quot;Hostizzy,&quot; &quot;HostOS,&quot; &quot;ResIQ,&quot; &quot;Hostizzy Stays,&quot; &quot;Hostizzy Retreats,&quot; &quot;Hostizzy Luxe,&quot; &quot;Hostizzy Urban Spaces&quot;), website design, software, content, and technology are owned by Hostsphere India Pvt Ltd or its licensors. Unauthorized use, reproduction, or distribution of any Hostizzy intellectual property is strictly prohibited.
                            </p>

                            <h3 style={h3Style}>8.2 User Content License</h3>
                            <p style={pStyle}>
                                By submitting content to Hostizzy (including but not limited to property descriptions, photographs, reviews, and feedback), you grant Hostizzy a non-exclusive, worldwide, royalty-free, perpetual license to use, reproduce, modify, adapt, publish, translate, and display such content for the purpose of providing, promoting, and improving our services. You represent that you own or have the necessary rights to grant this license.
                            </p>

                            <h3 style={h3Style}>8.3 Photography &amp; Listing Content</h3>
                            <p style={pStyle}>
                                Photographs and content created by Hostizzy (or commissioned by Hostizzy) for property listings remain the intellectual property of Hostizzy. Property owners may use such content for personal, non-commercial purposes with attribution. Hostizzy may use property photographs for marketing and promotional purposes across all channels.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 9. Prohibited Conduct */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>9. Prohibited Conduct</h2>
                            <p style={pStyle}>
                                You agree not to engage in any of the following prohibited activities when using our platforms or services:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Providing false, misleading, or fraudulent information during registration, booking, or property listing</li>
                                <li style={liStyle}>Attempting to circumvent Hostizzy&apos;s booking system, commission structure, or payment processes</li>
                                <li style={liStyle}>Using the Platform for any illegal purpose, including but not limited to money laundering, drug trafficking, or hosting illegal activities at managed properties</li>
                                <li style={liStyle}>Harassing, threatening, or discriminating against other users, guests, staff, or Hostizzy personnel</li>
                                <li style={liStyle}>Scraping, data mining, or using automated tools to extract data from our platforms without written authorization</li>
                                <li style={liStyle}>Attempting to gain unauthorized access to any part of the Platform, other user accounts, or Hostizzy systems</li>
                                <li style={liStyle}>Uploading or transmitting viruses, malware, or other harmful code</li>
                                <li style={liStyle}>Interfering with the proper functioning of the Platform or its infrastructure</li>
                                <li style={liStyle}>Subletting, sub-licensing, or unauthorized transfer of bookings</li>
                                <li style={liStyle}>Posting false reviews, manipulating ratings, or engaging in review fraud</li>
                                <li style={liStyle}>Using Hostizzy&apos;s intellectual property without explicit written permission</li>
                            </ul>
                            <p style={pStyle}>
                                Violation of any prohibited conduct may result in immediate account suspension or termination, cancellation of bookings, forfeiture of deposits, and/or legal action.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 10. Limitation of Liability */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>10. Limitation of Liability</h2>

                            <h3 style={h3Style}>10.1 Service Provided &quot;As Is&quot;</h3>
                            <p style={pStyle}>
                                The Platform and Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. Hostizzy makes no warranties, express or implied, regarding the reliability, availability, accuracy, completeness, or suitability of the Platform or Services for any particular purpose.
                            </p>

                            <h3 style={h3Style}>10.2 Maximum Liability</h3>
                            <p style={pStyle}>
                                To the maximum extent permitted by applicable law, Hostizzy&apos;s total aggregate liability to any user for all claims arising out of or related to these Terms or the use of our Services shall not exceed the greater of:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>The total fees paid by you to Hostizzy in the 12 months preceding the claim, or</li>
                                <li style={liStyle}>INR 50,000 (Indian Rupees Fifty Thousand)</li>
                            </ul>

                            <h3 style={h3Style}>10.3 Exclusion of Damages</h3>
                            <p style={pStyle}>
                                Hostizzy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, goodwill, or any other intangible losses, regardless of whether such damages were foreseeable.
                            </p>

                            <h3 style={h3Style}>10.4 Third-Party Services</h3>
                            <p style={pStyle}>
                                Hostizzy is not responsible for the actions, content, or policies of third-party services, platforms, or partners, including but not limited to OTA platforms, payment gateways, and transportation providers.
                            </p>

                            <h3 style={h3Style}>10.5 Force Majeure</h3>
                            <p style={pStyle}>
                                Hostizzy shall not be liable for any failure or delay in performing its obligations due to circumstances beyond its reasonable control, including but not limited to natural disasters, epidemics, pandemics, wars, terrorism, civil unrest, government actions, power failures, internet outages, fire, flood, or other acts of God.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 11. Dispute Resolution */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>11. Dispute Resolution</h2>

                            <h3 style={h3Style}>11.1 Governing Law</h3>
                            <p style={pStyle}>
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                            </p>

                            <h3 style={h3Style}>11.2 Jurisdiction</h3>
                            <p style={pStyle}>
                                Subject to the mediation clause below, any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.
                            </p>

                            <h3 style={h3Style}>11.3 Mediation Before Litigation</h3>
                            <p style={pStyle}>
                                Before initiating any legal proceedings, the parties agree to attempt to resolve any dispute through good-faith mediation. The party raising the dispute shall send a written notice to the other party describing the dispute and proposed resolution. The parties shall have 30 days from receipt of such notice to resolve the dispute through mediation. If the dispute is not resolved within this period, either party may pursue legal remedies.
                            </p>

                            <h3 style={h3Style}>11.4 Arbitration</h3>
                            <p style={pStyle}>
                                For disputes involving amounts exceeding INR 10,00,000 (Indian Rupees Ten Lakhs), the parties agree to submit to binding arbitration under the Arbitration and Conciliation Act, 1996 (as amended). The arbitration shall be conducted by a sole arbitrator appointed by mutual consent, with the seat of arbitration in New Delhi. The language of arbitration shall be English.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 12. Communication Consent */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>12. Communication Consent</h2>
                            <p style={pStyle}>
                                By using our Services or providing your contact information, you consent to receiving communications from Hostizzy through the following channels:
                            </p>

                            <h3 style={h3Style}>12.1 Transactional Communications</h3>
                            <p style={pStyle}>
                                You consent to receiving essential service-related communications via email, SMS, WhatsApp, and phone calls, including booking confirmations, payment receipts, check-in instructions, payout notifications, and account alerts. These communications are necessary for service delivery and cannot be opted out of while you have an active booking or management agreement.
                            </p>

                            <h3 style={h3Style}>12.2 Marketing Communications</h3>
                            <p style={pStyle}>
                                With your explicit consent, we may send promotional communications including offers, newsletters, property management insights, event invitations, and service announcements via email, SMS, and WhatsApp. You may opt out of marketing communications at any time by:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Clicking the &quot;unsubscribe&quot; link in any marketing email</li>
                                <li style={liStyle}>Replying &quot;STOP&quot; to any marketing SMS or WhatsApp message</li>
                                <li style={liStyle}>Emailing <a href="mailto:privacy@hostizzy.com" style={{ color: '#FE5858' }}>privacy@hostizzy.com</a></li>
                            </ul>

                            <h3 style={h3Style}>12.3 WhatsApp Business Communications</h3>
                            <p style={pStyle}>
                                By providing your phone number, you consent to receiving messages via the WhatsApp Business API, as further detailed in our <a href="/privacy" style={{ color: '#FE5858' }}>Privacy Policy</a>. You may revoke this consent at any time by replying &quot;STOP&quot; or contacting us directly.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 13. Modifications */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>13. Modifications to Terms</h2>
                            <p style={pStyle}>
                                Hostizzy reserves the right to modify, amend, or update these Terms at any time at its sole discretion. When we make changes:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>We will update the &quot;Last Updated&quot; date at the top of these Terms</li>
                                <li style={liStyle}>For material changes, we will provide notice via email or a prominent notice on our website at least 15 days before the changes take effect</li>
                                <li style={liStyle}>Your continued use of our Services after the effective date of any modifications constitutes acceptance of the updated Terms</li>
                            </ul>
                            <p style={pStyle}>
                                If you do not agree to the modified Terms, you must discontinue use of our Services before the changes take effect.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 14. Severability, Waiver, Entire Agreement */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>14. General Provisions</h2>

                            <h3 style={h3Style}>14.1 Severability</h3>
                            <p style={pStyle}>
                                If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if it cannot be modified, it shall be severed. The remaining provisions shall continue in full force and effect.
                            </p>

                            <h3 style={h3Style}>14.2 Waiver</h3>
                            <p style={pStyle}>
                                The failure of Hostizzy to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. A waiver of any provision shall only be effective if made in writing and signed by an authorized representative of Hostizzy.
                            </p>

                            <h3 style={h3Style}>14.3 Entire Agreement</h3>
                            <p style={pStyle}>
                                These Terms, together with the Privacy Policy and any applicable Management Agreement, constitute the entire agreement between you and Hostizzy regarding the use of our Services. These Terms supersede all prior agreements, understandings, and communications (whether oral or written) between the parties regarding the subject matter hereof.
                            </p>

                            <h3 style={h3Style}>14.4 Assignment</h3>
                            <p style={pStyle}>
                                You may not assign or transfer your rights or obligations under these Terms without the prior written consent of Hostizzy. Hostizzy may assign its rights and obligations under these Terms to an affiliate or successor entity without your consent.
                            </p>

                            <h3 style={h3Style}>14.5 No Third-Party Beneficiaries</h3>
                            <p style={pStyle}>
                                These Terms do not create any third-party beneficiary rights. Nothing in these Terms is intended to confer any rights or remedies upon any person other than the parties hereto.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 15. Contact */}
                    <ScrollReveal>
                        <div style={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #fff5f5 100%)',
                            borderRadius: '16px',
                            padding: '2.5rem',
                            border: '1px solid #e2e8f0',
                            marginTop: '2rem'
                        }}>
                            <h2 style={{ ...h2Style, marginBottom: '1.5rem' }}>15. Contact Us</h2>
                            <p style={pStyle}>
                                If you have any questions, concerns, or feedback regarding these Terms &amp; Conditions, please contact us:
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Mail size={18} color="#FE5858" />
                                    <span style={{ color: '#475569' }}>
                                        <strong>Legal Inquiries:</strong>{' '}
                                        <a href="mailto:legal@hostizzy.com" style={{ color: '#FE5858' }}>legal@hostizzy.com</a>
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Mail size={18} color="#FE5858" />
                                    <span style={{ color: '#475569' }}>
                                        <strong>General Support:</strong>{' '}
                                        <a href="mailto:stay@hostizzy.com" style={{ color: '#FE5858' }}>stay@hostizzy.com</a>
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Mail size={18} color="#FE5858" />
                                    <span style={{ color: '#475569' }}>
                                        <strong>Partnerships:</strong>{' '}
                                        <a href="mailto:partnerships@hostizzy.com" style={{ color: '#FE5858' }}>partnerships@hostizzy.com</a>
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Phone size={18} color="#FE5858" />
                                    <span style={{ color: '#475569' }}>
                                        <strong>Phone/WhatsApp:</strong>{' '}
                                        <a href="tel:+919560493335" style={{ color: '#FE5858' }}>+91-9560493335</a>
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <p style={{ ...pStyle, marginBottom: 0, fontSize: '0.95rem' }}>
                                    <strong>Hostsphere India Pvt Ltd</strong> (Brand: Hostizzy)<br />
                                    E 13/29, 1st Floor, Harsha Bhawan<br />
                                    Connaught Place, New Delhi 110001, India
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </section>
        </>
    );
}
