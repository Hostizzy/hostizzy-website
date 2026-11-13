import crypto from 'crypto';

// Forwards website leads to HostSuite, Hostizzy's PMS, so the team works
// them there instead of in this site's admin panel.
//
//   kind 'owner' → HostSuite's Owner Leads list
//   kind 'guest' → HostSuite's Enquiries (source 'website')
//
// Off until both env vars are set, so nothing changes before the HostSuite
// endpoint is live:
//   HOSTSUITE_LEADS_URL  e.g. https://hostos.hostizzy.com/api/v1/website-leads
//   HOSTSUITE_LEADS_KEY  shared secret, sent as a Bearer token
//
// Call it inside after(): it never throws and never slows the form down.
// Email notifications stay as they are, so a HostSuite outage loses nothing.

// A stable UUID-shaped id from a string (HostSuite validates client_id as a UUID).
const stableUuid = (s) => {
    const h = crypto.createHash('sha256').update(s).digest('hex');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-${((parseInt(h[16], 16) & 3) | 8).toString(16)}${h.slice(17, 20)}-${h.slice(20, 32)}`;
};

const clean = (v) => (v === undefined || v === null || v === '' ? undefined : v);

export async function forwardLeadToHostSuite({ kind, form, lead }) {
    const url = process.env.HOSTSUITE_LEADS_URL;
    const key = process.env.HOSTSUITE_LEADS_KEY;
    if (!url || !key) return { skipped: true };

    const {
        id, name, email, phone, city, propertyType, bedrooms, serviceInterest, plan, message,
        // Internal or anti-spam fields that shouldn't travel.
        _hp_website, _formLoadedAt, departmentEmail, status, createdAt, timestamp, // eslint-disable-line no-unused-vars
        ...rest
    } = lead;

    const body = {
        // Same website lead → same client_id, so a retry can't duplicate it.
        client_id: id ? stableUuid(`hostizzy-website:${form}:${id}`) : crypto.randomUUID(),
        kind,
        form,
        name: clean(name),
        email: clean(email),
        phone: clean(phone),
        city: clean(city),
        property_type: clean(propertyType),
        bedrooms: clean(bedrooms),
        plan_interest: clean(serviceInterest || plan),
        message: clean(message),
        details: Object.fromEntries(Object.entries(rest).filter(([, v]) => clean(v) !== undefined)),
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) console.error(`HostSuite lead forward failed (${form}): HTTP ${res.status}`);
        return { ok: res.ok, status: res.status };
    } catch (err) {
        console.error(`HostSuite lead forward failed (${form}):`, err.message);
        return { ok: false };
    }
}
