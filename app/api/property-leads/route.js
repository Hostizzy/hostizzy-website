import { NextResponse } from 'next/server';
import { after } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';
import { sendEmail, sendPropertyLeadWelcome } from '@/lib/email';
import { forwardLeadToHostSuite } from '@/lib/hostsuite';
import { checkSpam } from '@/lib/antispam';

// POST /api/property-leads — public, captures property owner lead
export async function POST(request) {
    try {
        const body = await getRequestBody(request);
        // The wizard asks for all three; the chat's "call me" form sends only
        // a name and phone, so email is optional here.
        if (!body || !body.name || !body.phone) {
            return errorResponse('Name and phone are required', 400);
        }

        // Honeypot, fill-time and rate checks. Bots are told it worked.
        if (checkSpam(body, request, { requireTiming: true }).isSpam) {
            return successResponse({ success: true, message: 'Lead captured successfully' });
        }

        // Determine lead quality
        const hasPropertyDetails = body.city && body.propertyType && body.bedrooms;
        const hasSpecificPlan = body.serviceInterest && body.serviceInterest !== 'NotSure';
        const quality = hasPropertyDetails && hasSpecificPlan ? 'high'
            : hasPropertyDetails ? 'medium'
            : 'low';

        const { _hp_website, _formLoadedAt, ...fields } = body; // eslint-disable-line no-unused-vars
        const lead = {
            ...fields,
            id: generateId(),
            status: 'new',
            quality,
            createdAt: new Date().toISOString()
        };

        // Route based on quality: high/medium → property-leads, low → contacts
        const collection = quality === 'low' ? 'contacts' : 'property-leads';

        if (adminDb) {
            await adminDb.collection(collection).doc(lead.id).set(lead);
        } else {
            const file = quality === 'low' ? DATA_FILES.CONTACTS : DATA_FILES.PROPERTY_LEADS;
            const items = readJson(file);
            items.unshift(lead);
            writeJson(file, items);
        }

        // Send emails AFTER response using Next.js after() — form responds instantly
        after(async () => {
            try {
                await Promise.allSettled([
                    forwardLeadToHostSuite({ kind: 'owner', form: 'property-wizard', lead }),
                    sendEmail({
                        to: 'partnerships@hostizzy.com',
                        subject: `🏠 [${quality.toUpperCase()}] New Property Lead: ${body.name} — ${body.city || 'N/A'} (${body.propertyType || 'N/A'})`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                                <div style="background: #0f172a; color: white; padding: 2rem; border-radius: 12px 12px 0 0;">
                                    <img src="https://www.hostizzy.com/images/logo.jpg" alt="Hostizzy" style="height: 36px; margin-bottom: 12px;" />
                                    <h1 style="margin: 0; font-size: 1.5rem;">New Property Lead</h1>
                                    <p style="margin: 0.5rem 0 0; opacity: 0.8;">from ${body.source || 'website'}</p>
                                </div>
                                <div style="padding: 2rem; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Name</td><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">${body.name}</td></tr>
                                        <tr><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Phone</td><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;"><a href="tel:${body.phone}">${body.phone}</a></td></tr>
                                        <tr><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Email</td><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
                                        <tr><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">City</td><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">${body.city || 'Not specified'}</td></tr>
                                        <tr><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Property Type</td><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">${body.propertyType || 'Not specified'}</td></tr>
                                        <tr><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Bedrooms</td><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">${body.bedrooms || 'Not specified'}</td></tr>
                                        <tr><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Listed on OTA?</td><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">${body.listedOnOTA || 'Not specified'}</td></tr>
                                        <tr><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Service Interest</td><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">${body.serviceInterest || 'Not specified'}</td></tr>
                                        <tr><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Current Revenue</td><td style="padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">${body.currentRevenue || 'Not specified'}</td></tr>
                                        ${body.message ? `<tr><td style="padding: 0.75rem 0; font-weight: bold; color: #64748b;">Message</td><td style="padding: 0.75rem 0;">${body.message}</td></tr>` : ''}
                                    </table>
                                </div>
                            </div>
                        `
                    }),
                    // Only send welcome email for high/medium quality leads
                    ...(quality !== 'low' && lead.email ? [sendPropertyLeadWelcome(lead)] : []),
                ]).then(results => {
                    results.forEach((r, i) => {
                        if (r.status === 'rejected') console.error(`Email ${i} failed:`, r.reason?.message);
                    });
                });
            } catch (err) {
                console.error('Background email error:', err.message);
            }
        });

        return successResponse({ success: true, message: 'Lead captured successfully' });
    } catch (error) {
        console.error('Property lead error:', error);
        return errorResponse('Failed to capture lead', 500);
    }
}
