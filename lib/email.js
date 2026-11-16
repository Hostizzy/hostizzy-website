import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

/**
 * Create Gmail transporter with OAuth2 authentication.
 * Requires: GMAIL_USER, GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN
 * Falls back to App Password auth if GMAIL_APP_PASSWORD is set instead.
 */
function createTransporter() {
  const user = process.env.GMAIL_USER;

  // Prefer OAuth2 if credentials are available
  if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });
  }

  // Fallback to App Password
  if (process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  return null;
}

/**
 * Send an email via Gmail SMTP (OAuth2 or App Password).
 * Logs errors but does not throw so callers are unaffected.
 */
export async function sendEmail({ to, subject, html, replyTo, attachments }) {
  try {
    if (!process.env.GMAIL_USER) {
      console.warn('Email not configured: GMAIL_USER missing');
      return null;
    }

    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email not configured: Need either OAuth2 credentials (GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN) or GMAIL_APP_PASSWORD');
      return null;
    }

    const mailOptions = {
      from: `"Hostizzy" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    };
    if (replyTo) mailOptions.replyTo = replyTo;
    if (attachments) mailOptions.attachments = attachments;

    const info = await transporter.sendMail(mailOptions);

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
  const { name, email, phone, message, property, subject: formSubject, department, departmentEmail } = formData;

  // Route to the correct team based on department selection
  // Recipients are fixed here. The browser's departmentEmail is ignored, so a
  // visitor can't make this site email an address of their choosing.
  const emailRouting = {
    owner: 'partnerships@hostizzy.com',
    guest: 'stay@hostizzy.com',
    business: 'founder@hostizzy.com',
    careers: 'founder@hostizzy.com',
    privacy: 'privacy@hostizzy.com',
  };
  const recipientEmail = emailRouting[department] || 'stay@hostizzy.com';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1a1a2e; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <img src="https://www.hostizzy.com/images/logo.jpg" alt="Hostizzy" style="height: 36px; margin-bottom: 12px;" />
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
    to: recipientEmail,
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
        <img src="https://www.hostizzy.com/images/logo.jpg" alt="Hostizzy" style="height: 36px; margin-bottom: 12px;" />
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
    to: 'partnerships@hostizzy.com',
    subject: `New Calculator Lead: ${name || 'Unknown'}${location ? ` - ${location}` : ''}`,
    html,
  });
}

/**
 * Send a branded welcome email to a new property lead.
 * Attaches a PDF brochure if available at /public/hostizzy-brochure.pdf.
 */
export async function sendPropertyLeadWelcome(leadData) {
  const { name, email, city, propertyType } = leadData;
  if (!email) return null;

  const firstName = (name || '').split(' ')[0] || 'there';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px; border-radius: 8px 8px 0 0; text-align: center;">
        <img src="https://www.hostizzy.com/images/logo.jpg" alt="Hostizzy" style="height: 48px; margin-bottom: 8px;" />
        <div style="color: #94a3b8; font-size: 13px;">Premier Vacation Rental Management</div>
      </div>

      <!-- Body -->
      <div style="padding: 40px 32px; border: 1px solid #e5e7eb; border-top: none;">
        <h1 style="color: #0f172a; font-size: 22px; margin: 0 0 16px; font-weight: 700;">
          Welcome, ${firstName}!
        </h1>
        <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
          Thank you for your interest in partnering with Hostizzy${city ? ` for your property in ${city}` : ''}. We're excited to help you maximize your ${propertyType ? propertyType.toLowerCase() : 'property'}'s earning potential.
        </p>

        <!-- What happens next -->
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <h2 style="color: #0f172a; font-size: 16px; margin: 0 0 16px; font-weight: 600;">What happens next?</h2>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 8px 12px 8px 0; vertical-align: top; width: 32px;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: #FE5858; color: #fff; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px;">1</div>
              </td>
              <td style="padding: 8px 0; color: #374151; font-size: 14px; line-height: 1.5;">
                <strong>Our team will review your details</strong> and prepare a personalized revenue estimate for your property.
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px 8px 0; vertical-align: top;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: #FE5858; color: #fff; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px;">2</div>
              </td>
              <td style="padding: 8px 0; color: #374151; font-size: 14px; line-height: 1.5;">
                <strong>You'll receive a call within 24 hours</strong> from our partnerships team to discuss your goals and our management plans.
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px 8px 0; vertical-align: top;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: #FE5858; color: #fff; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px;">3</div>
              </td>
              <td style="padding: 8px 0; color: #374151; font-size: 14px; line-height: 1.5;">
                <strong>We'll create a custom onboarding plan</strong> tailored to your property type and location.
              </td>
            </tr>
          </table>
        </div>

        <!-- Service highlights -->
        <div style="margin: 24px 0;">
          <h2 style="color: #0f172a; font-size: 16px; margin: 0 0 16px; font-weight: 600;">Why property owners choose Hostizzy</h2>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 6px 0; color: #374151; font-size: 14px;">&#10003; &nbsp; Full-service property management across India</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #374151; font-size: 14px;">&#10003; &nbsp; AI-powered dynamic pricing for maximum revenue</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #374151; font-size: 14px;">&#10003; &nbsp; Listed on 10+ booking channels including Airbnb, MakeMyTrip &amp; Booking.com</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #374151; font-size: 14px;">&#10003; &nbsp; Real-time owner dashboard with complete transparency</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #374151; font-size: 14px;">&#10003; &nbsp; 100% GST-compliant invoicing & payouts</td>
            </tr>
          </table>
        </div>

        <!-- CTA -->
        <div style="text-align: center; margin: 32px 0 24px;">
          <a href="https://wa.me/919560493335?text=Hi%2C%20I%20just%20submitted%20a%20property%20lead%20on%20hostizzy.com"
            style="display: inline-block; padding: 14px 32px; background: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 600;">
            Chat with us on WhatsApp
          </a>
        </div>

        <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 0;">
          If you have any questions in the meantime, simply reply to this email or reach us at
          <a href="mailto:partnerships@hostizzy.com" style="color: #FE5858; text-decoration: none;">partnerships@hostizzy.com</a>.
        </p>
      </div>

      <!-- Footer -->
      <div style="padding: 24px 32px; background: #f8fafc; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; text-align: center;">
        <div style="color: #9ca3af; font-size: 12px; line-height: 1.6;">
          Hostizzy &mdash; India's Premier Vacation Rental Management<br/>
          <a href="https://www.hostizzy.com" style="color: #FE5858; text-decoration: none;">www.hostizzy.com</a>
          &nbsp;&middot;&nbsp;
          <a href="tel:+919560493335" style="color: #6b7280; text-decoration: none;">+91 95604 93335</a>
        </div>
      </div>
    </div>
  `;

  // Attach files — try local filesystem first, fall back to URL-based attachment
  let attachments = [];
  try {
    const publicDir = path.join(process.cwd(), 'public');

    // PDF brochure
    const brochurePath = path.join(publicDir, 'hostizzy-brochure.pdf');
    if (fs.existsSync(brochurePath)) {
      attachments.push({ filename: 'Hostizzy-Services-Overview.pdf', path: brochurePath });
    }

    // Overview image
    const overviewPath = path.join(publicDir, 'Hostizzy Overview.png');
    if (fs.existsSync(overviewPath)) {
      attachments.push({ filename: 'Hostizzy-Overview.png', path: overviewPath });
    }
  } catch {
    // Filesystem not available (Vercel serverless) — use URL-based attachment
  }

  // Fallback: attach overview image via URL if not found locally
  if (attachments.length === 0) {
    attachments.push({
      filename: 'Hostizzy-Overview.png',
      href: 'https://www.hostizzy.com/Hostizzy%20Overview.png',
    });
  }
  if (attachments.length === 0) attachments = undefined;

  return sendEmail({
    to: email,
    subject: `Welcome to Hostizzy, ${firstName}! Your property journey starts here`,
    html,
    replyTo: 'partnerships@hostizzy.com',
    attachments,
  });
}
