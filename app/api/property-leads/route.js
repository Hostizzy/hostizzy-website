import { NextResponse } from 'next/server';
import { after } from 'next/server';
import { withAuth } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';
import { sendEmail, sendPropertyLeadWelcome } from '@/lib/email';

// POST /api/property-leads — public, captures property owner lead
export async function POST(request) {
    try {
        const body = await getRequestBody(request);
        if (!body || !body.name || !body.phone || !body.email) {
            return errorResponse('Name, phone, and email are required', 400);
        }

        // Determine lead quality
        const hasPropertyDetails = body.city && body.propertyType && body.bedrooms;
        const hasSpecificPlan = body.serviceInterest && body.serviceInterest !== 'NotSure';
        const quality = hasPropertyDetails && hasSpecificPlan ? 'high'
            : hasPropertyDetails ? 'medium'
            : 'low';

        const lead = {
            ...body,
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
                    ...(quality !== 'low' ? [sendPropertyLeadWelcome(lead)] : []),
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

// PUT /api/property-leads — update status or add note (requires auth)
const handlePUT = async (request) => {
    try {
        const body = await getRequestBody(request);
        if (!body || !body.id) return errorResponse('Lead ID is required', 400);

        const { id, status, note } = body;
        const updates = { updatedAt: new Date().toISOString() };
        if (status) updates.status = status;

        if (adminDb) {
            const docRef = adminDb.collection('property-leads').doc(id);
            const doc = await docRef.get();
            if (!doc.exists) return errorResponse('Lead not found', 404);

            if (note) {
                const existing = doc.data();
                const notes = existing.notes || [];
                notes.push({ text: note, timestamp: new Date().toISOString(), author: 'admin' });
                updates.notes = notes;
            }
            await docRef.update(updates);
        } else {
            const leads = readJson(DATA_FILES.PROPERTY_LEADS);
            const idx = leads.findIndex(l => l.id === id);
            if (idx === -1) return errorResponse('Lead not found', 404);
            if (note) {
                if (!leads[idx].notes) leads[idx].notes = [];
                leads[idx].notes.push({ text: note, timestamp: new Date().toISOString(), author: 'admin' });
            }
            Object.assign(leads[idx], updates);
            writeJson(DATA_FILES.PROPERTY_LEADS, leads);
        }

        return successResponse({ success: true, message: 'Lead updated' });
    } catch (error) {
        console.error('Property lead update error:', error);
        return errorResponse('Failed to update lead', 500);
    }
};

// DELETE /api/property-leads — bulk delete (requires auth)
const handleDELETE = async (request) => {
    try {
        const body = await getRequestBody(request);
        if (!body || !body.ids || !Array.isArray(body.ids)) return errorResponse('Lead IDs array is required', 400);

        const { ids } = body;

        if (adminDb) {
            const batch = adminDb.batch();
            ids.forEach(id => batch.delete(adminDb.collection('property-leads').doc(id)));
            await batch.commit();
        } else {
            const leads = readJson(DATA_FILES.PROPERTY_LEADS);
            const filtered = leads.filter(l => !ids.includes(l.id));
            writeJson(DATA_FILES.PROPERTY_LEADS, filtered);
        }

        return successResponse({ success: true, message: `${ids.length} lead(s) deleted` });
    } catch (error) {
        console.error('Property lead delete error:', error);
        return errorResponse('Failed to delete leads', 500);
    }
};

export const GET = withAuth(handleGET, { skipGetAuth: false });
export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
