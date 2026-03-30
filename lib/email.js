import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * Send an email via Gmail SMTP.
 * Logs errors but does not throw so callers are unaffected.
 */
export async function sendEmail({ to, subject, html }) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.warn('Email not configured: GMAIL_USER or GMAIL_APP_PASSWORD missing');
      return null;
    }

    const info = await transporter.sendMail({
      from: `"Hostizzy" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error.message);
    return null;
  }
}

/**
 * Send a formatted notification for a new contact form submission.
 */
export async function sendContactNotification(formData) {
  const { name, email, phone, message, property, subject: formSubject } = formData;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1a1a2e; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">New Contact Form Submission</h1>
      </div>
      <div style="padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${name || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">
              <a href="mailto:${email || ''}" style="color: #2563eb; text-decoration: none;">${email || 'N/A'}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">
              <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          ` : ''}
          ${formSubject ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Subject</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${formSubject}</td>
          </tr>
          ` : ''}
          ${property ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Property</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${property}</td>
          </tr>
          ` : ''}
          ${message ? `
          <tr>
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; color: #111827; font-size: 14px; line-height: 1.6;">${message}</td>
          </tr>
          ` : ''}
        </table>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
          Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
        </div>
      </div>
    </div>
  `;

  return sendEmail({
    to: 'stay@hostizzy.com',
    subject: `New Contact: ${name || 'Unknown'}${formSubject ? ` - ${formSubject}` : ''}`,
    html,
  });
}

/**
 * Send a formatted notification for a new calculator lead.
 */
export async function sendCalculatorLeadNotification(leadData) {
  const {
    name, email, phone,
    propertyType, bedrooms, location,
    estimatedRevenue, occupancyRate,
    notes,
  } = leadData;

  const rows = [
    ['Name', name],
    ['Email', email ? `<a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>` : null],
    ['Phone', phone ? `<a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>` : null],
    ['Property Type', propertyType],
    ['Bedrooms', bedrooms],
    ['Location', location],
    ['Est. Revenue', estimatedRevenue],
    ['Occupancy Rate', occupancyRate],
    ['Notes', notes],
  ].filter(([, val]) => val != null && val !== '' && val !== undefined);

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 140px; vertical-align: top;">${label}</td>
      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${value}</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #065f46; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">New Calculator Lead</h1>
        <p style="color: #a7f3d0; margin: 4px 0 0; font-size: 14px;">Someone used the revenue calculator and submitted their details</p>
      </div>
      <div style="padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${tableRows}
        </table>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
          Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
        </div>
      </div>
    </div>
  `;

  return sendEmail({
    to: 'stay@hostizzy.com',
    subject: `New Calculator Lead: ${name || 'Unknown'}${location ? ` - ${location}` : ''}`,
    html,
  });
}
