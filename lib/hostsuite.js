import crypto from 'crypto';

// Forwards website leads to HostSuite, Hostizzy's PMS, so the team works
// them there instead of in this site's admin panel.
//
//   kind 'owner' → HostSuite's Owner enquiries pipeline
//   kind 'guest' → HostSuite's Enquiries (source 'website')
//
// Contract: HostSuite repo docs/plans/2026-11-14-website-leads-contract.md
//   POST {HOSTSUITE_LEADS_URL}  (https://hostos.hostizzy.com/api/v1/website-leads)
//   Authorization: Bearer {WEBSITE_LEADS_KEY}  — the same secret is set on both projects
//   201/200 {id} = stored (200 = already had this client_id). Anything else = not stored.
//
// Off until both env vars are set. Call it inside after(): it never throws
// and never slows the form down. The email notifications stay, so a
// HostSuite outage loses nothing.

const LIMITS = { name: 120, email: 254, phone: 32, city: 80, property_type: 60, plan_interest: 60, message: 4000 };
const DETAILS_MAX_BYTES = 8000;
const RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);

// A stable UUID-shaped id from a string, so a retry of the same lead is
// recognised by HostSuite and never stored twice.
const stableUuid = (s) => {
    const h = crypto.createHash('sha256').update(s).digest('hex');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-${((parseInt(h[16], 16) & 3) | 8).toString(16)}${h.slice(17, 20)}-${h.slice(20, 32)}`;
};

const text = (v, max) => {
    if (v === undefined || v === null) return undefined;
    const s = String(v).trim();
    return s ? s.slice(0, max) : undefined;
};

export function buildHostSuiteLead({ kind, form, lead }) {
    const {
        id, name, email, phone, city, propertyType, bedrooms, serviceInterest, plan, message,
        // Internal or anti-spam fields that shouldn't travel.
        _hp_website, _formLoadedAt, departmentEmail, status, createdAt, timestamp, // eslint-disable-line no-unused-vars
        ...rest
    } = lead;

    const details = Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined && v !== null && v !== ''));

    // bedrooms must be a whole number 0–200; anything else ("5+") rides in details.
    const beds = /^\d+$/.test(String(bedrooms ?? '').trim()) ? Number(bedrooms) : NaN;
    if (bedrooms !== undefined && bedrooms !== '' && !(beds >= 0 && beds <= 200)) details.bedrooms = String(bedrooms);

    // details must stay under 8 KB: drop the longest values until it fits.
    while (Buffer.byteLength(JSON.stringify(details)) > DETAILS_MAX_BYTES) {
        const longest = Object.keys(details).sort((a, b) => String(details[b]).length - String(details[a]).length)[0];
        delete details[longest];
    }

    const cleanEmail = text(email, LIMITS.email);
    const cleanPhone = text(phone, LIMITS.phone);

    return {
        client_id: id ? stableUuid(`hostizzy-website:${form}:${id}`) : crypto.randomUUID(),
        kind,
        form,
        // Name is required; the calculator only asks for an email.
        name: text(name, LIMITS.name) || text(cleanEmail || cleanPhone, LIMITS.name),
        email: cleanEmail,
        phone: cleanPhone,
        city: text(city, LIMITS.city),
        property_type: text(propertyType, LIMITS.property_type),
        bedrooms: beds >= 0 && beds <= 200 ? beds : undefined,
        plan_interest: text(serviceInterest || plan, LIMITS.plan_interest),
        message: text(message, LIMITS.message),
        details,
    };
}

export async function forwardLeadToHostSuite({ kind, form, lead }) {
    const url = process.env.HOSTSUITE_LEADS_URL;
    const key = process.env.WEBSITE_LEADS_KEY;
    if (!url || !key) return { skipped: true };

    const body = buildHostSuiteLead({ kind, form, lead });
    if (!body.name || (!body.email && !body.phone)) {
        console.error(`HostSuite lead not sent (${form}): no name or contact details`);
        return { ok: false };
    }

    // One retry for rate limits, server errors and network failures; the
    // client_id makes a repeat safe.
    for (let attempt = 1; attempt <= 2; attempt++) {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
                body: JSON.stringify(body),
                signal: AbortSignal.timeout(10000),
            });
            if (res.status === 200 || res.status === 201) return { ok: true, status: res.status };
            const detail = await res.text().catch(() => '');
            if (attempt === 1 && RETRY_STATUSES.has(res.status)) {
                const wait = Math.min(Number(res.headers.get('retry-after')) || 2, 10) * 1000;
                await new Promise((r) => setTimeout(r, wait));
                continue;
            }
            console.error(`HostSuite lead not stored (${form}): HTTP ${res.status} ${detail.slice(0, 200)}`);
            return { ok: false, status: res.status };
        } catch (err) {
            if (attempt === 1) { await new Promise((r) => setTimeout(r, 2000)); continue; }
            console.error(`HostSuite lead not stored (${form}):`, err.message);
            return { ok: false };
        }
    }
    return { ok: false };
}
