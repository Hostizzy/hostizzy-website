import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';
import { sendEmail } from '@/lib/email';

// POST /api/property-leads — public, captures property owner lead
export async function POST(request) {
    try {
        const body = await getRequestBody(request);
        if (!body || !body.name || !body.phone || !body.email) {
            return errorResponse('Name, phone, and email are required', 400);
        }

        const lead = {
            ...body,
            id: generateId(),
            status: 'new',
            createdAt: new Date().toISOString()
        };

        // Try Firebase first, fallback to JSON
        if (adminDb) {
            await adminDb.collection('property-leads').doc(lead.id).set(lead);
        } else {
            // Fallback to JSON
            const leads = readJson(DATA_FILES.PROPERTY_LEADS);
            leads.unshift(lead);
            writeJson(DATA_FILES.PROPERTY_LEADS, leads);
        }

        // Send email notification (fire-and-forget)
        sendEmail({
            to: 'partnerships@hostizzy.com',
            subject: `🏠 New Property Lead: ${body.name} — ${body.city} (${body.propertyType})`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #0f172a; color: white; padding: 2rem; border-radius: 12px 12px 0 0;">
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
        }).catch(() => {});

        return successResponse({ success: true, message: 'Lead captured successfully' });
    } catch (error) {
        console.error('Property lead error:', error);
        return errorResponse('Failed to capture lead', 500);
    }
}

// GET /api/property-leads — requires auth, lists all property leads
const handleGET = async (request) => {
    try {
        if (adminDb) {
            const snapshot = await adminDb.collection('property-leads').orderBy('createdAt', 'desc').get();
            const leads = snapshot.docs.map(doc => doc.data());
            return successResponse(leads);
        } else {
            // Fallback to JSON
            const leads = readJson(DATA_FILES.PROPERTY_LEADS);
            return successResponse(leads);
        }
    } catch (error) {
        console.error('Error fetching property leads:', error);
        return errorResponse('Failed to load leads', 500);
    }
};

export const GET = withAuth(handleGET, { skipGetAuth: false });
