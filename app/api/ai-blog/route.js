import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Simple in-memory rate limiting
const rateLimit = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000;

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
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { topic, keywords } = body;

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      // Graceful fallback when API key is not set
      return NextResponse.json({
        title: `${topic} - A Guide for Property Owners`,
        excerpt: `Discover key insights about ${topic} in the vacation rental industry. Learn how property owners in India can maximize their rental income with proven strategies.`,
        content: `## Introduction\n\nThe vacation rental market in India is growing rapidly, and understanding ${topic} is essential for property owners looking to maximize returns.\n\n## Key Insights\n\nProperty owners should focus on guest experience, professional photography, and dynamic pricing to stay competitive in the ${topic} space.\n\n## Getting Started\n\nWhether you are new to vacation rentals or an experienced host, staying informed about ${topic} will help you make better decisions for your property.\n\n## Conclusion\n\nBy staying ahead of trends in ${topic}, property owners can ensure sustained growth and profitability in the Indian vacation rental market.`,
        imageSuggestion: `A professional photograph of a well-maintained vacation rental property in India, showcasing modern amenities and inviting interiors related to ${topic}.`,
        fallback: true
      });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `You are an expert content writer specializing in vacation rental management in India, writing for property owners who want to maximize their rental income through professional management services like Hostizzy.

Write a blog post about: "${topic}"
${keywords ? `Keywords to include: ${keywords}` : ''}

Requirements:
1. Title: SEO-optimized, 50-60 characters, compelling for property owners
2. Excerpt: 2-3 sentences, compelling summary that makes readers want to read more
3. Content: 500-800 words, informative and actionable. Include H2 headings (use ## markdown). Write in a professional but approachable tone. Focus on the Indian vacation rental market, mentioning relevant cities, platforms (Airbnb, MakeMyTrip, Booking.com), and practical advice for property owners.
4. Image suggestion: Describe what kind of image would complement this article

Respond ONLY with valid JSON in this exact format:
{
  "title": "string",
  "excerpt": "string",
  "content": "string (with markdown formatting)",
  "imageSuggestion": "string"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    });

    const responseText = completion.choices[0].message.content;
    const data = JSON.parse(responseText);

    if (!data.title || !data.content) {
      throw new Error('Invalid AI response format');
    }

    return NextResponse.json({ ...data, aiGenerated: true });
  } catch (error) {
    console.error('AI blog generation error:', error);
    return NextResponse.json(
      { error: 'AI blog generation failed' },
      { status: 500 }
    );
  }
}
