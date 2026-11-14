import { NextResponse, after } from 'next/server';
import OpenAI from 'openai';
import { adminDb } from '@/lib/firebase-admin';
import { generateId } from '@/lib/utils';

const SYSTEM_PROMPT = `You are Hostizzy's AI concierge — friendly, professional, and knowledgeable about vacation rental management in India. Think Marriott-level hospitality in every response.

ABOUT HOSTIZZY:
Hostizzy is India's premier vacation rental management company. We help property owners earn more from their homes, villas, and apartments through professional short-term rental management.

SERVICE PLANS:
1. SmartStart — ₹14,999 one-time setup fee. Includes listing on 3 OTA channels (Airbnb, Booking.com, MakeMyTrip), listing optimization, and 90-day dynamic pricing setup. Perfect for owners who want a professional launch.
2. ChannelPro — ₹15,000–40,000/month fixed, or 15% of net revenue. Multi-OTA synchronization, dynamic pricing, 24/7 guest messaging, and performance reporting. Ideal for owners who want channel management without full operations.
3. Hybrid Core (MOST POPULAR) — 20% of net revenue. Everything in ChannelPro plus a direct booking website, dedicated property manager, and revenue optimization. Best value for serious hosts.
4. TotalCare360 — 30% of net revenue (owner pays running costs). Complete villa and farmhouse management including staff coordination, maintenance, guest experience, and full P&L management. For owners who want zero hassle.
5. StayPrime — 50-50 revenue split. Full apartment management where Hostizzy covers all operational costs (staff, consumables, maintenance). Truly zero involvement for the owner.

SERVICE AREAS:
- Full Management: Delhi NCR, Uttarakhand, Rajasthan, Himachal Pradesh, Northeast India, Uttar Pradesh
- Co-Hosting (Shared Services): Available pan-India

TECHNOLOGY:
- HostSuite (formerly HostOS): our property management system, the one our own operation runs on. Self-serve for other hosts from ₹999/month with a 14-day free trial (no card) at hostos.hostizzy.com. Managed owners see statements and payouts in the HostSuite owner portal.
- ResIQ: an app for independent homestay, villa and farmstay owners (bookings, payments, guest IDs, caretaker login, works offline). Live on Google Play and at resiq.hostizzy.com; the first 10 founding owners keep their first property free.
- JuxTravel: our trip-matching app for travellers, independent hosts only. Live across India on Android since 15 September 2026 (juxtravel.com).
- Never call ResIQ an analytics dashboard, and never say JuxTravel is upcoming.

CONTACT:
- Property owners: partnerships@hostizzy.com
- Guest inquiries: stay@hostizzy.com
- Host onboarding & owner queries (call/WhatsApp): +91-9560493335
- Bookings (call/WhatsApp): +91-9560494001
- Website: www.hostizzy.com

GUIDELINES:
- Keep responses concise: 2–4 sentences max
- Naturally qualify leads — ask about their property (location, type, current usage)
- Suggest visiting /contact or /services for detailed info and forms
- Escalate to WhatsApp when the conversation needs a human touch: +91-9560493335 for owners, +91-9560494001 for guests booking a stay
- Never make up information — if unsure, direct them to the team
- Always use ₹ for Indian Rupees
- Be warm but professional — you represent a premium brand`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'Chat service not configured' }, { status: 503 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Build messages array: system + last 10 history + new user message
    const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

    if (Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    messages.push({ role: 'user', content: message.trim() });

    // Try gpt-5-mini first, fall back to gpt-4.1-mini, then gpt-4o-mini
    let completion;
    const models = ['gpt-5-mini', 'gpt-5-nano', 'gpt-5', 'gpt-4.1-mini', 'gpt-4o-mini'];
    let lastError;

    for (const model of models) {
      try {
        completion = await openai.chat.completions.create({
          model,
          messages,
          max_tokens: 300,
          temperature: 0.7,
        });
        break; // success
      } catch (err) {
        lastError = err;
        console.error(`Model ${model} failed:`, err.message);
        continue;
      }
    }

    if (!completion) {
      throw lastError || new Error('All models failed');
    }

    const reply = completion.choices[0].message.content;

    // Save chat log to Firebase in background
    after(async () => {
      if (adminDb) {
        try {
          await adminDb.collection('chat-logs').doc(generateId()).set({
            userMessage: message.trim(),
            assistantReply: reply,
            historyLength: Array.isArray(history) ? history.length : 0,
            createdAt: new Date().toISOString(),
          });
        } catch (err) {
          console.error('Chat log save failed:', err.message);
        }
      }
    });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or reach out to us on WhatsApp at +91-9560493335.' },
      { status: 500 }
    );
  }
}
