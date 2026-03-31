import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Simple in-memory rate limiting
const rateLimit = new Map();
const RATE_LIMIT = 10; // max requests per IP per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getCacheKey(body) {
  return JSON.stringify({ city: body.city, propertyType: body.propertyType, bedrooms: body.bedrooms, finishLevel: body.finishLevel });
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record || now - record.firstRequest > RATE_WINDOW) {
    rateLimit.set(ip, { count: 1, firstRequest: now });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

export async function POST(request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { city, propertyType, bedrooms, finishLevel, additionalContext } = body;

    if (!city || !propertyType || !bedrooms) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check cache
    const cacheKey = getCacheKey(body);
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({ ...cached.data, cached: true });
    }

    // Check if OpenAI key exists
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'AI service not configured', fallback: true }, { status: 503 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Determine service model based on state
    const fullManagementStates = [
      'Delhi', 'Haryana', 'Uttarakhand', 'Rajasthan', 'Himachal Pradesh',
      'Assam', 'Meghalaya', 'Arunachal Pradesh', 'Sikkim', 'West Bengal',
      'Uttar Pradesh'
    ];
    const cityLower = city.toLowerCase();
    const isFullManagement = fullManagementStates.some(s => cityLower.includes(s.toLowerCase()));
    const serviceModelHint = isFullManagement ? 'full' : 'shared';

    const prompt = `You are an expert vacation rental revenue analyst with deep knowledge of the Indian short-term rental and homestay market. You understand regional demand patterns, OTA dynamics (Airbnb, MakeMyTrip, Booking.com), and seasonal tourism flows across India. Analyze this property and provide realistic revenue estimates.

Property Details:
- Location: ${city}, India
- Type: ${propertyType}
- Configuration: ${bedrooms} BHK
- Finish Level: ${finishLevel || 'Standard'}
- Service Model: ${serviceModelHint} (full = end-to-end management, shared = co-hosting/channel management only)
${additionalContext ? `- Additional: ${additionalContext}` : ''}

Based on current Indian vacation rental market data, provide:
1. Estimated Average Daily Rate (ADR) in INR
2. ADR range — the low end (ADR minus 15%) and high end (ADR plus 15%) to show realistic variance
3. Realistic annual occupancy percentage (India vacation rentals typically range 45-80%)
4. Annual gross revenue
5. Net income after expenses (assume: 20% management fee, 18% OTA commissions, 15% operations = 53% total expenses)
6. A confidence score from 1-10
7. Monthly seasonal demand trend (12 values, 1-100 scale where 100 is peak, Jan=index 0)
8. A brief 2-sentence market insight
9. A brief market context string describing the local market (e.g. "High leisure demand — peak season Nov-Feb, 55–75% typical occupancy")
10. The service model: "${serviceModelHint}"
11. 3 actionable recommendations

IMPORTANT: Be realistic and conservative. Base estimates on actual Indian vacation rental market rates:
- Goa villas: ₹8,000-15,000/night (premium beachfront can reach ₹25,000+)
- Himalayan properties (Manali, Shimla, Mussoorie): ₹4,000-10,000/night
- Delhi NCR apartments/homestays: ₹3,500-8,000/night
- Rajasthan heritage stays (Jaipur, Udaipur, Jodhpur): ₹5,000-12,000/night
- Kerala backwater/hill properties: ₹4,000-9,000/night
- Northeast India homestays: ₹2,500-6,000/night
- Uttarakhand (Rishikesh, Nainital, Dehradun): ₹3,000-8,000/night
Adjust proportionally based on BHK count, finish level, and exact location.

Respond ONLY with valid JSON in this exact format:
{
  "adr": number,
  "adrRange": { "low": number, "high": number },
  "occupancy": number,
  "grossRevenue": number,
  "netIncome": number,
  "confidence": number,
  "seasonalTrend": [12 numbers],
  "marketInsight": "string",
  "marketContext": "string (brief, e.g. 'High leisure demand — peak Nov-Feb')",
  "serviceModel": "full or shared",
  "recommendations": ["string", "string", "string"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 700,
      response_format: { type: 'json_object' }
    });

    const responseText = completion.choices[0].message.content;
    const data = JSON.parse(responseText);

    // Validate required fields
    if (!data.adr || !data.grossRevenue || !data.netIncome) {
      throw new Error('Invalid AI response format');
    }

    // Cache the response
    cache.set(cacheKey, { data, timestamp: Date.now() });

    return NextResponse.json({ ...data, aiGenerated: true });
  } catch (error) {
    console.error('AI estimate error:', error);
    return NextResponse.json({ error: 'AI estimation failed', fallback: true }, { status: 500 });
  }
}
