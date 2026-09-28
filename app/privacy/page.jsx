'use client';

import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import { Shield, Mail, Phone } from 'lucide-react';

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

export default function Privacy() {
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
                    background: 'radial-gradient(circle at 20% 50%, rgba(254, 88, 88, 0.1) 0%, transparent 50%)',
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
                                <Shield size={16} color="#FE5858" />
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Your Privacy Matters</span>
                            </div>

                            <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.15, color: 'white' }}>
                                Privacy Policy
                            </h1>

                            <p style={{ fontSize: '1.15rem', opacity: 0.8, lineHeight: 1.6, color: 'white', maxWidth: '650px', margin: '0 auto' }}>
                                How Hostsphere India Pvt Ltd (brand: Hostizzy) collects, uses, stores, and protects your personal information across all our platforms and services.
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

                    {/* 1. Introduction */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>1. Introduction</h2>
                            <p style={pStyle}>
                                Hostsphere India Pvt Ltd, operating under the brand name <strong>Hostizzy</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you interact with any of our platforms and services, including:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Our corporate website at <strong>www.hostizzy.com</strong></li>
                                <li style={liStyle}>Our booking platform at <strong>book.hostizzy.com</strong></li>
                                <li style={liStyle}>Our property management system <strong>HostOS</strong> (hostos.hostizzy.com)</li>
                                <li style={liStyle}>Our owner portal <strong>ResIQ</strong> (resiq.hostizzy.com)</li>
                                <li style={liStyle}>Mobile applications (iOS and Android)</li>
                                <li style={liStyle}>WhatsApp Business communications</li>
                                <li style={liStyle}>AI-powered chatbot and conversational services</li>
                                <li style={liStyle}>Any other digital or offline services provided by Hostizzy</li>
                            </ul>
                            <p style={pStyle}>
                                By accessing or using our services, you acknowledge that you have read, understood, and agree to the practices described in this Privacy Policy. If you do not agree with this policy, please discontinue use of our services.
                            </p>
                            <p style={pStyle}>
                                <strong>Registered Office:</strong> E 13/29, 1st Floor, Harsha Bhawan, Connaught Place, New Delhi 110001, India
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 2. Information We Collect */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>2. Information We Collect</h2>
                            <p style={pStyle}>
                                We collect different types of information depending on how you interact with our platforms. This includes information you provide directly, information collected automatically, and information from third-party sources.
                            </p>

                            <h3 style={h3Style}>2.1 Personal Information</h3>
                            <p style={pStyle}>Information you provide directly when registering, making inquiries, or using our services:</p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Full name, email address, and phone number (including international numbers)</li>
                                <li style={liStyle}>Mailing address and billing address</li>
                                <li style={liStyle}>Government-issued identification (for KYC verification of guests and property owners)</li>
                                <li style={liStyle}>Date of birth (where required for identity verification)</li>
                                <li style={liStyle}>Professional or company information (for B2B partnerships)</li>
                            </ul>

                            <h3 style={h3Style}>2.2 Property Information (for Property Owners)</h3>
                            <p style={pStyle}>When you list or register a property with Hostizzy, we collect:</p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Property location, address, and GPS coordinates</li>
                                <li style={liStyle}>Property type, size, bedroom count, and amenities</li>
                                <li style={liStyle}>Property photographs and virtual tour content</li>
                                <li style={liStyle}>Financial information including revenue data, bank details for payouts, and pricing preferences</li>
                                <li style={liStyle}>Existing OTA listing URLs (Airbnb, Booking.com, MakeMyTrip, etc.)</li>
                                <li style={liStyle}>Insurance and compliance documentation</li>
                            </ul>

                            <h3 style={h3Style}>2.3 Booking Information (for Guests)</h3>
                            <p style={pStyle}>When you make a booking through our platforms or partner OTAs, we collect:</p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Check-in and check-out dates</li>
                                <li style={liStyle}>Number of guests and guest details</li>
                                <li style={liStyle}>Payment information (processed via secure third-party payment gateways)</li>
                                <li style={liStyle}>Special requests, dietary preferences, and accessibility requirements</li>
                                <li style={liStyle}>Guest reviews and feedback</li>
                            </ul>

                            <h3 style={h3Style}>2.4 Usage Data</h3>
                            <p style={pStyle}>Information collected automatically when you use our platforms:</p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Pages visited, features used, and time spent on our platforms</li>
                                <li style={liStyle}>Device information (type, operating system, browser, screen resolution)</li>
                                <li style={liStyle}>IP address and approximate geolocation</li>
                                <li style={liStyle}>Referral URLs and search queries that led you to our services</li>
                                <li style={liStyle}>Click patterns, scroll depth, and interaction data</li>
                            </ul>

                            <h3 style={h3Style}>2.5 Communication Data</h3>
                            <p style={pStyle}>Information from your communications with us:</p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>WhatsApp Business messages (booking confirmations, guest communications, support inquiries)</li>
                                <li style={liStyle}>Email correspondence</li>
                                <li style={liStyle}>Phone call records and SMS messages</li>
                                <li style={liStyle}>Contact form submissions</li>
                                <li style={liStyle}>Chat transcripts from our website chatbot</li>
                            </ul>

                            <h3 style={h3Style}>2.6 AI Interaction Data</h3>
                            <p style={pStyle}>When you use our AI-powered features, we collect:</p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Chatbot conversation transcripts (Floating Concierge)</li>
                                <li style={liStyle}>Revenue estimation inputs and outputs (AI Calculator)</li>
                                <li style={liStyle}>Dynamic pricing interaction data</li>
                                <li style={liStyle}>Property recommendations and search queries</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* 3. How We Use Your Information */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>3. How We Use Your Information</h2>
                            <p style={pStyle}>We use your information for the following purposes:</p>

                            <h3 style={h3Style}>3.1 Service Delivery</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Processing bookings, managing check-ins/check-outs, and facilitating guest experiences</li>
                                <li style={liStyle}>Property management services including listing optimization, pricing, and maintenance coordination</li>
                                <li style={liStyle}>Managing owner payouts and financial reporting via ResIQ</li>
                                <li style={liStyle}>Coordinating housekeeping, maintenance, and guest support through HostOS</li>
                            </ul>

                            <h3 style={h3Style}>3.2 Communications</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Sending booking confirmations, reminders, and check-in instructions via email, SMS, or WhatsApp</li>
                                <li style={liStyle}>Guest-host communication facilitation</li>
                                <li style={liStyle}>Customer support and inquiry responses</li>
                                <li style={liStyle}>Service updates and important notifications about your account or property</li>
                            </ul>

                            <h3 style={h3Style}>3.3 AI-Powered Features</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Providing automated customer support through our AI chatbot</li>
                                <li style={liStyle}>Generating revenue estimates for property owners</li>
                                <li style={liStyle}>Dynamic pricing optimization based on market data</li>
                                <li style={liStyle}>Personalized property recommendations for guests</li>
                                <li style={liStyle}>Automated blog and content generation for property listings</li>
                            </ul>

                            <h3 style={h3Style}>3.4 Analytics and Improvement</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Understanding how users interact with our platforms to improve user experience</li>
                                <li style={liStyle}>Analyzing booking patterns, market trends, and occupancy data</li>
                                <li style={liStyle}>A/B testing and feature development</li>
                                <li style={liStyle}>Performance monitoring and bug resolution</li>
                            </ul>

                            <h3 style={h3Style}>3.5 Marketing (With Consent)</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Sending promotional offers, newsletters, and property management insights</li>
                                <li style={liStyle}>Targeted advertising on social media platforms</li>
                                <li style={liStyle}>Referral programs and loyalty communications</li>
                                <li style={liStyle}>Event invitations and webinar notifications</li>
                            </ul>
                            <p style={pStyle}>
                                You can opt out of marketing communications at any time by clicking the unsubscribe link in any marketing email, replying &quot;STOP&quot; to WhatsApp marketing messages, or contacting us at <a href="mailto:privacy@hostizzy.com" style={{ color: '#FE5858' }}>privacy@hostizzy.com</a>.
                            </p>

                            <h3 style={h3Style}>3.6 Legal Compliance and Fraud Prevention</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Complying with applicable Indian laws and regulations, including the Information Technology Act, 2000 and its rules</li>
                                <li style={liStyle}>Preventing fraud, unauthorized access, and other illegal activities</li>
                                <li style={liStyle}>Enforcing our Terms &amp; Conditions</li>
                                <li style={liStyle}>Responding to legal processes, law enforcement requests, and regulatory inquiries</li>
                                <li style={liStyle}>KYC/AML compliance for financial transactions</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* 4. WhatsApp & Messaging */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>4. WhatsApp &amp; Messaging</h2>
                            <p style={pStyle}>
                                Hostizzy uses the <strong>WhatsApp Business API</strong> (provided by Meta Platforms, Inc.) to communicate with guests, property owners, and prospective clients. By providing your phone number and consenting to receive WhatsApp messages, you agree to the following:
                            </p>

                            <h3 style={h3Style}>4.1 Types of Messages</h3>
                            <p style={pStyle}>We may send the following types of messages via WhatsApp:</p>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>Transactional Messages:</strong> Booking confirmations, check-in/check-out details, payment receipts, and payout notifications</li>
                                <li style={liStyle}><strong>Service Messages:</strong> Property updates, maintenance notifications, guest arrival alerts, and operational communications</li>
                                <li style={liStyle}><strong>Support Messages:</strong> Responses to your inquiries, troubleshooting assistance, and follow-ups</li>
                                <li style={liStyle}><strong>Marketing Messages (with explicit consent):</strong> Promotional offers, new service announcements, property management tips, and newsletters</li>
                            </ul>

                            <h3 style={h3Style}>4.2 Data Processed via WhatsApp</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Your phone number and WhatsApp profile name</li>
                                <li style={liStyle}>Message content (text, images, documents shared in conversation)</li>
                                <li style={liStyle}>Read receipts and delivery status</li>
                                <li style={liStyle}>Timestamp of messages</li>
                            </ul>

                            <h3 style={h3Style}>4.3 Opt-Out Mechanism</h3>
                            <p style={pStyle}>
                                You can opt out of WhatsApp communications at any time by:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Replying <strong>&quot;STOP&quot;</strong> to any WhatsApp message from Hostizzy</li>
                                <li style={liStyle}>Emailing <a href="mailto:privacy@hostizzy.com" style={{ color: '#FE5858' }}>privacy@hostizzy.com</a> with your phone number and opt-out request</li>
                                <li style={liStyle}>Contacting us at <a href="tel:+919560493335" style={{ color: '#FE5858' }}>+91-9560493335</a></li>
                            </ul>
                            <p style={pStyle}>
                                Please note that opting out of transactional messages may affect our ability to provide you with essential service updates related to active bookings or property management.
                            </p>

                            <h3 style={h3Style}>4.4 Meta Platform Compliance</h3>
                            <p style={pStyle}>
                                Our use of WhatsApp Business API is governed by Meta&apos;s Platform Terms and WhatsApp Business Policy. We do not sell, share, or use WhatsApp conversation data for advertising purposes beyond the scope of our direct business relationship with you. Message data is processed in accordance with Meta&apos;s data processing terms and this Privacy Policy.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 5. Data Sharing & Third Parties */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>5. Data Sharing &amp; Third Parties</h2>
                            <p style={pStyle}>
                                We do not sell your personal data to third parties. We may share your information with the following categories of service providers and partners, solely for the purposes described in this policy:
                            </p>

                            <h3 style={h3Style}>5.1 Cloud Infrastructure &amp; Data Storage</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>Google Firebase (Firestore):</strong> Secure storage of leads, contacts, booking data, chat logs, and application data</li>
                                <li style={liStyle}><strong>Vercel:</strong> Website hosting and serverless function execution</li>
                                <li style={liStyle}><strong>ImageKit:</strong> Image storage, optimization, and delivery for property photos</li>
                            </ul>

                            <h3 style={h3Style}>5.2 AI &amp; Machine Learning</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>OpenAI:</strong> Powers our AI chatbot, revenue estimation engine, and content generation tools. Data sent to OpenAI is anonymized where possible and is subject to OpenAI&apos;s data processing agreement. We do not send personally identifiable information to OpenAI unless required for the specific service interaction.</li>
                            </ul>

                            <h3 style={h3Style}>5.3 Analytics</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>Google Analytics:</strong> Website traffic analysis, user behavior tracking, and conversion measurement. Data is aggregated and anonymized.</li>
                            </ul>

                            <h3 style={h3Style}>5.4 OTA Platforms</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}>We share necessary property and booking information with Online Travel Agencies including <strong>Airbnb, Booking.com, MakeMyTrip, Agoda,</strong> and other platforms where properties are listed. This sharing is essential for managing bookings and maintaining listing accuracy.</li>
                            </ul>

                            <h3 style={h3Style}>5.5 Payment Processors</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Payment information is processed by PCI-DSS compliant third-party payment gateways. We do not store complete credit card numbers or CVV codes on our servers.</li>
                            </ul>

                            <h3 style={h3Style}>5.6 Communication Services</h3>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>Google Gmail API (OAuth2):</strong> For sending transactional and notification emails</li>
                                <li style={liStyle}><strong>Meta WhatsApp Business API:</strong> For WhatsApp communications as described in Section 4</li>
                            </ul>

                            <h3 style={h3Style}>5.7 Legal &amp; Regulatory Disclosure</h3>
                            <p style={pStyle}>
                                We may disclose your information if required by law, regulation, legal process, or governmental request. This includes compliance with Indian tax authorities, law enforcement agencies, and court orders.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 6. Cookies & Tracking */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>6. Cookies &amp; Tracking Technologies</h2>
                            <p style={pStyle}>
                                We use cookies and similar technologies to enhance your experience on our platforms:
                            </p>

                            <h3 style={h3Style}>6.1 Essential Cookies</h3>
                            <p style={pStyle}>
                                Required for basic site functionality including session management, authentication, and security. These cannot be disabled.
                            </p>

                            <h3 style={h3Style}>6.2 Analytics Cookies</h3>
                            <p style={pStyle}>
                                Google Analytics cookies help us understand how visitors use our website, which pages are most popular, and how users navigate between pages. This data is aggregated and does not personally identify you.
                            </p>

                            <h3 style={h3Style}>6.3 Functional Cookies</h3>
                            <p style={pStyle}>
                                These remember your preferences such as language, region, and display settings to provide a personalized experience.
                            </p>

                            <h3 style={h3Style}>6.4 Chat Persistence (localStorage)</h3>
                            <p style={pStyle}>
                                Our AI chatbot uses browser localStorage to maintain conversation history during your session and across visits. This data is stored locally on your device and can be cleared through your browser settings.
                            </p>

                            <h3 style={h3Style}>6.5 Managing Cookies</h3>
                            <p style={pStyle}>
                                You can control cookies through your browser settings. Disabling certain cookies may limit your ability to use some features of our platforms. Most browsers allow you to block or delete cookies. Please refer to your browser&apos;s help documentation for instructions.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 7. Data Security */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>7. Data Security</h2>
                            <p style={pStyle}>
                                We take the security of your data seriously and implement industry-standard measures to protect it:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using TLS/SSL (HTTPS). Sensitive data at rest is encrypted using AES-256 encryption.</li>
                                <li style={liStyle}><strong>Access Controls:</strong> Strict role-based access controls ensure only authorized personnel can access personal data. Admin panel access requires authenticated credentials.</li>
                                <li style={liStyle}><strong>Firebase Security:</strong> Our Firestore database is protected by Firebase Security Rules, ensuring data isolation between users and properties.</li>
                                <li style={liStyle}><strong>OAuth2 Authentication:</strong> Email services use OAuth2 authentication (not plain-text passwords) for enhanced security.</li>
                                <li style={liStyle}><strong>Regular Audits:</strong> We conduct periodic security reviews of our codebase, infrastructure, and third-party integrations.</li>
                                <li style={liStyle}><strong>Incident Response:</strong> We maintain an incident response plan to address any data breaches promptly. In the event of a breach affecting your personal data, we will notify you within 72 hours as required by applicable law.</li>
                            </ul>
                            <p style={pStyle}>
                                While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest practical level of data protection.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 8. Data Retention */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>8. Data Retention</h2>
                            <p style={pStyle}>
                                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Specific retention periods are as follows:
                            </p>

                            <div style={{
                                background: '#f8fafc',
                                borderRadius: '12px',
                                padding: '1.5rem 2rem',
                                marginBottom: '1.5rem',
                                border: '1px solid #e2e8f0'
                            }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                            <th style={{ textAlign: 'left', padding: '0.75rem 0', color: '#1e293b', fontWeight: 600 }}>Data Type</th>
                                            <th style={{ textAlign: 'left', padding: '0.75rem 0', color: '#1e293b', fontWeight: 600 }}>Retention Period</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>Active owner/partner accounts</td>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>Duration of relationship + 3 years</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>Guest booking data</td>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>Duration of stay + 3 years</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>Guest KYC documents</td>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>Auto-deleted after 60 days (via ResIQ)</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>AI chatbot logs</td>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>90 days</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>WhatsApp message logs</td>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>90 days (unless part of an active booking)</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>Website analytics data</td>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>26 months (Google Analytics default)</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>Financial &amp; tax records</td>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>As required by Indian law (minimum 8 years)</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>Lead &amp; inquiry data</td>
                                            <td style={{ padding: '0.75rem 0', color: '#475569' }}>2 years from last interaction</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p style={pStyle}>
                                Upon expiry of the retention period, data is securely deleted or anonymized. You may request early deletion of your data (subject to legal and contractual obligations) by contacting us at <a href="mailto:privacy@hostizzy.com" style={{ color: '#FE5858' }}>privacy@hostizzy.com</a>.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 9. Your Rights */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>9. Your Rights</h2>
                            <p style={pStyle}>
                                Under applicable Indian data protection laws and in line with global best practices, you have the following rights regarding your personal data:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
                                <li style={liStyle}><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete personal data.</li>
                                <li style={liStyle}><strong>Right to Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
                                <li style={liStyle}><strong>Right to Data Portability:</strong> Request your data in a structured, machine-readable format.</li>
                                <li style={liStyle}><strong>Right to Withdraw Consent:</strong> Withdraw your consent for data processing at any time. This will not affect the lawfulness of processing based on consent before its withdrawal.</li>
                                <li style={liStyle}><strong>Right to Restrict Processing:</strong> Request that we limit the processing of your data in certain circumstances.</li>
                                <li style={liStyle}><strong>Right to Object:</strong> Object to processing of your personal data for direct marketing purposes.</li>
                                <li style={liStyle}><strong>Right to Lodge a Complaint:</strong> File a complaint with the relevant data protection authority if you believe your rights have been violated.</li>
                            </ul>

                            <h3 style={h3Style}>How to Exercise Your Rights</h3>
                            <p style={pStyle}>
                                To exercise any of these rights, please contact our Data Protection Officer:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}><strong>Email:</strong> <a href="mailto:privacy@hostizzy.com" style={{ color: '#FE5858' }}>privacy@hostizzy.com</a></li>
                                <li style={liStyle}><strong>Phone:</strong> <a href="tel:+919560493335" style={{ color: '#FE5858' }}>+91-9560493335</a></li>
                                <li style={liStyle}><strong>Mail:</strong> Data Protection Officer, Hostsphere India Pvt Ltd, E 13/29, 1st Floor, Harsha Bhawan, Connaught Place, New Delhi 110001</li>
                            </ul>
                            <p style={pStyle}>
                                We will respond to your request within 30 days. We may request additional information to verify your identity before processing your request.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 10. Children's Privacy */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>10. Children&apos;s Privacy</h2>
                            <p style={pStyle}>
                                Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:privacy@hostizzy.com" style={{ color: '#FE5858' }}>privacy@hostizzy.com</a>, and we will take steps to delete such information promptly.
                            </p>
                            <p style={pStyle}>
                                If we become aware that we have inadvertently collected personal data from a child under 18, we will take immediate steps to delete that data from our systems.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 11. International Data */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>11. International Data Transfers</h2>
                            <p style={pStyle}>
                                Your personal data is primarily processed and stored in India. However, some of our third-party service providers (such as Google Firebase, OpenAI, and Vercel) may process data in other jurisdictions, including the United States.
                            </p>
                            <p style={pStyle}>
                                When your data is transferred outside of India, we ensure appropriate safeguards are in place, including:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>Contractual obligations with data processors requiring equivalent data protection standards</li>
                                <li style={liStyle}>Use of service providers that comply with recognized data protection frameworks</li>
                                <li style={liStyle}>Encryption of data in transit and at rest</li>
                            </ul>
                            <p style={pStyle}>
                                By using our services, you consent to the transfer of your data to jurisdictions outside India where our service providers operate, subject to appropriate safeguards.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 12. Changes to Policy */}
                    <ScrollReveal>
                        <div style={sectionStyle}>
                            <h2 style={h2Style}>12. Changes to This Policy</h2>
                            <p style={pStyle}>
                                We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or for other operational reasons. When we make material changes:
                            </p>
                            <ul style={ulStyle}>
                                <li style={liStyle}>We will update the &quot;Last Updated&quot; date at the top of this policy</li>
                                <li style={liStyle}>We will notify you via email (to the email address associated with your account) for material changes</li>
                                <li style={liStyle}>We will post a prominent notice on our website</li>
                                <li style={liStyle}>For significant changes affecting data processing, we will seek renewed consent where required</li>
                            </ul>
                            <p style={pStyle}>
                                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your data.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* 13. Contact */}
                    <ScrollReveal>
                        <div style={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #fff5f5 100%)',
                            borderRadius: '16px',
                            padding: '2.5rem',
                            border: '1px solid #e2e8f0',
                            marginTop: '2rem'
                        }}>
                            <h2 style={{ ...h2Style, marginBottom: '1.5rem' }}>13. Contact Us</h2>
                            <p style={pStyle}>
                                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Mail size={18} color="#FE5858" />
                                    <span style={{ color: '#475569' }}>
                                        <strong>Privacy Inquiries:</strong>{' '}
                                        <a href="mailto:privacy@hostizzy.com" style={{ color: '#FE5858' }}>privacy@hostizzy.com</a>
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
