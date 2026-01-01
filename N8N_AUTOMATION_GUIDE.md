# n8n Automation Guide for Hostizzy

## 🎯 Overview

n8n is a powerful workflow automation platform that can help Hostizzy automate repetitive tasks, improve response times, and scale operations efficiently. This guide outlines key automation opportunities for your vacation rental management platform.

---

## 📋 Table of Contents

1. [Priority Automations](#priority-automations)
2. [Form Submission Workflows](#form-submission-workflows)
3. [Property Management Automation](#property-management-automation)
4. [Guest Communication](#guest-communication)
5. [Marketing & Social Media](#marketing--social-media)
6. [Analytics & Reporting](#analytics--reporting)
7. [Integration Architecture](#integration-architecture)
8. [Setup Instructions](#setup-instructions)

---

## 🚀 Priority Automations

### 1. **Unified Inquiry Management** (Highest Priority)
**Problem**: Form submissions from Contact, Bookings, Calculator, and Wedding inquiries are scattered
**Solution**: Central n8n workflow that processes all form types

```
Workflow: "Unified Inquiry Router"
Trigger: Webhook (from each form)
Actions:
  1. Parse submission data
  2. Determine inquiry type (contact/booking/calculator/wedding)
  3. Save to appropriate database collection
  4. Send Slack/Email notification to team
  5. Add to Google Sheet for tracking
  6. Trigger WhatsApp notification to sales team
  7. Send auto-reply email to customer
  8. Create task in project management tool (Notion/ClickUp)
```

**Business Impact**:
- ✅ Zero missed inquiries
- ✅ Response time < 5 minutes
- ✅ Complete audit trail
- ✅ Automatic lead scoring

---

### 2. **Smart Lead Distribution** (High Priority)
**Problem**: Manual assignment of leads to team members
**Solution**: Intelligent routing based on inquiry type, location, and team capacity

```
Workflow: "Smart Lead Distributor"
Trigger: New inquiry saved
Logic:
  - Wedding inquiry → Assign to wedding specialist
  - Calculator inquiry > ₹50L value → Senior account manager
  - Property inquiry in Goa → Goa regional manager
  - General inquiry → Round-robin distribution
Actions:
  1. Check team availability (calendar integration)
  2. Assign to appropriate team member
  3. Send notification to assigned person
  4. Set follow-up reminder
  5. Track assignment metrics
```

**Business Impact**:
- ✅ Specialized expertise for each inquiry type
- ✅ Balanced workload across team
- ✅ Faster response times

---

### 3. **Review Collection System** (High Priority)
**Problem**: Inconsistent review collection from guests
**Solution**: Automated post-stay review requests

```
Workflow: "Review Request Automation"
Trigger: Booking checkout date + 1 day
Actions:
  1. Send personalized email with review links
  2. Include direct links to Google, Airbnb, Booking.com
  3. Wait 3 days → If no review, send gentle reminder
  4. Wait 4 more days → Final reminder with incentive
  5. Track review completion rate
  6. Alert team of new reviews posted
  7. Auto-post positive reviews to social media
```

**Business Impact**:
- ✅ 3-5x increase in review volume
- ✅ Improved SEO and trust signals
- ✅ Social proof generation

---

## 📝 Form Submission Workflows

### Contact Form Automation

```javascript
// Webhook endpoint: https://your-n8n.com/webhook/contact
{
  "trigger": "Contact Form Submit",
  "steps": [
    {
      "node": "Webhook",
      "data": "name, email, phone, message, source"
    },
    {
      "node": "Set Variables",
      "leadScore": "Calculate based on message keywords",
      "priority": "urgent/high/medium/low"
    },
    {
      "node": "MongoDB",
      "action": "Insert into contacts collection",
      "collection": "inquiries"
    },
    {
      "node": "Google Sheets",
      "action": "Append row",
      "sheet": "Contact Inquiries"
    },
    {
      "node": "Slack",
      "channel": "#sales-inquiries",
      "message": "New contact: {name} | Score: {leadScore}"
    },
    {
      "node": "SendGrid",
      "to": "{email}",
      "template": "contact-acknowledgment",
      "subject": "We received your inquiry - Hostizzy"
    },
    {
      "node": "WhatsApp Business API",
      "to": "sales_team",
      "message": "New HIGH priority inquiry from {name}"
    },
    {
      "node": "IF",
      "condition": "leadScore > 80",
      "true": "Send to senior team + Create calendar event",
      "false": "Standard routing"
    }
  ]
}
```

### Booking Request Workflow

```javascript
{
  "trigger": "Booking Form Submit",
  "steps": [
    {
      "node": "Webhook",
      "data": "propertyId, checkIn, checkOut, guests, name, email, phone"
    },
    {
      "node": "HTTP Request",
      "url": "/api/properties/{propertyId}",
      "action": "Fetch property details"
    },
    {
      "node": "Function",
      "calculate": "pricing, availability, total nights"
    },
    {
      "node": "MongoDB",
      "action": "Insert booking request",
      "collection": "booking_requests"
    },
    {
      "node": "Email - Customer",
      "template": "booking-confirmation-pending",
      "attachments": "property-details.pdf"
    },
    {
      "node": "Email - Property Manager",
      "to": "property owner email",
      "subject": "New booking request for {propertyName}"
    },
    {
      "node": "Google Calendar",
      "action": "Block dates (tentative)",
      "calendar": "property-{propertyId}"
    },
    {
      "node": "Slack",
      "channel": "#bookings",
      "message": "🎉 New booking request: {propertyName} | {nights} nights | ₹{estimatedValue}"
    },
    {
      "node": "Schedule",
      "delay": "2 hours",
      "action": "If not responded, send reminder to team"
    }
  ]
}
```

### Calculator Lead Workflow

```javascript
{
  "trigger": "Calculator Form Submit",
  "steps": [
    {
      "node": "Webhook",
      "data": "propertyType, location, bedrooms, estimatedRevenue, email, phone"
    },
    {
      "node": "Lead Scoring",
      "rules": {
        "estimatedRevenue > 50L": "+40 points",
        "location in ['Goa', 'Mumbai', 'Bangalore']": "+30 points",
        "bedrooms > 3": "+20 points",
        "propertyType == 'villa'": "+10 points"
      }
    },
    {
      "node": "MongoDB",
      "action": "Insert calculator lead",
      "collection": "calculator_leads"
    },
    {
      "node": "Airtable",
      "base": "Sales Pipeline",
      "table": "Leads",
      "action": "Create record"
    },
    {
      "node": "IF High Value Lead",
      "condition": "estimatedRevenue > 50L",
      "true": [
        "Assign to senior sales team",
        "Schedule call within 4 hours",
        "Send personalized video email",
        "Create custom proposal in Google Docs"
      ],
      "false": [
        "Standard nurture sequence",
        "Add to email drip campaign"
      ]
    },
    {
      "node": "Email - Auto Response",
      "template": "calculator-results",
      "include": "PDF report with estimates"
    },
    {
      "node": "Email - Sales Team",
      "subject": "🔥 High-value calculator lead: ₹{estimatedRevenue}/year"
    }
  ]
}
```

### Wedding Inquiry Workflow

```javascript
{
  "trigger": "Wedding Form Submit",
  "steps": [
    {
      "node": "Webhook",
      "data": "venueName, eventDate, guestCount, budget, name, email, phone, requirements"
    },
    {
      "node": "MongoDB",
      "action": "Insert wedding inquiry",
      "collection": "wedding_inquiries"
    },
    {
      "node": "Check Venue Availability",
      "calendar": "wedding-venue-{venueId}",
      "date": "{eventDate}"
    },
    {
      "node": "IF Available",
      "true": [
        "Send: 'Great news! {venueName} is available'",
        "Attach: Venue photos, pricing, packages"
      ],
      "false": [
        "Send: Alternative venue suggestions",
        "Attach: Similar properties in same location"
      ]
    },
    {
      "node": "Assign to Wedding Specialist",
      "team": "wedding_experts",
      "criteria": "location match"
    },
    {
      "node": "Create Wedding Brief",
      "tool": "Notion",
      "template": "Wedding Event Brief",
      "fields": "all inquiry data + checklist"
    },
    {
      "node": "Schedule Follow-up Call",
      "delay": "24 hours",
      "action": "If not contacted, escalate"
    },
    {
      "node": "WhatsApp",
      "to": "wedding team + venue owner",
      "message": "💒 New wedding inquiry: {guestCount} guests on {eventDate}"
    }
  ]
}
```

---

## 🏠 Property Management Automation

### 1. **Multi-Channel Listing Sync**

```
Workflow: "Property Listing Sync"
Trigger: Property added/updated in admin panel
Actions:
  1. Extract property data from MongoDB
  2. Transform to Airbnb API format → Post/Update
  3. Transform to Booking.com format → Post/Update
  4. Transform to MakeMyTrip format → Post/Update
  5. Update Google My Business listing
  6. Post to social media (Instagram, Facebook)
  7. Update sitemap.xml
  8. Trigger Google re-crawl
  9. Send confirmation to property owner
```

**Business Impact**:
- ✅ List once, publish everywhere
- ✅ Consistent data across platforms
- ✅ Save 2-3 hours per property

### 2. **Dynamic Pricing Updates**

```
Workflow: "Smart Pricing Sync"
Trigger: Daily at 2 AM
Actions:
  1. Fetch pricing from your revenue management system
  2. Check competitor pricing (web scraping)
  3. Adjust based on demand, events, seasonality
  4. Update pricing on all OTAs
  5. Log changes for analytics
  6. Alert owner if price drops > 20%
```

### 3. **Availability Calendar Sync**

```
Workflow: "Multi-Calendar Sync"
Trigger: Booking confirmed on any platform
Actions:
  1. Block dates on all OTA calendars
  2. Update Google Calendar
  3. Update property owner's calendar
  4. Send calendar invite to guest
  5. Trigger cleaning schedule
  6. Alert property manager
```

---

## 💬 Guest Communication

### 1. **Pre-Arrival Sequence**

```
Workflow: "Guest Pre-Arrival Journey"
Trigger: Booking confirmed
Timeline:
  Day 0: Booking confirmation email
  Day 3: Welcome email with local tips
  Day 7: Travel planning resources
  Day -3: Pre-arrival checklist + check-in instructions
  Day -1: Final reminder + WhatsApp message
  Day 0: "You're here!" message + concierge contact
```

### 2. **Post-Stay Engagement**

```
Workflow: "Post-Stay Guest Journey"
Trigger: Checkout date
Timeline:
  Day +1: Thank you email + review request
  Day +4: Gentle review reminder
  Day +8: Final review request with incentive
  Day +30: "We miss you" email with 10% off next stay
  Day +90: Seasonal promotion email
  Day +180: Birthday/anniversary email (if data available)
```

### 3. **Upsell Automation**

```
Workflow: "Smart Upselling"
Trigger: Guest books property
Actions:
  1. Check booking duration (if < 3 nights)
  2. Send: "Extend your stay and save 15%"
  3. Check guest count (if 4+ people)
  4. Send: "Add private chef experience"
  5. Check property type (if luxury villa)
  6. Send: "Airport transfer + luxury car rental"
  7. Track conversion rate
```

---

## 📱 Marketing & Social Media

### 1. **Auto-Post Property Photos**

```
Workflow: "Social Media Publisher"
Trigger: New property added with images
Actions:
  1. Select best 5 photos (AI image quality scoring)
  2. Generate captions using GPT-4
  3. Add relevant hashtags
  4. Post to Instagram (carousel)
  5. Post to Facebook (album)
  6. Post to Pinterest (multiple pins)
  7. Schedule LinkedIn post for company page
  8. Track engagement metrics
```

### 2. **User-Generated Content Collection**

```
Workflow: "UGC Harvester"
Trigger: Daily at 10 AM
Actions:
  1. Scan Instagram for #Hostizzy hashtag
  2. Identify posts mentioning your properties
  3. Request permission to repost (DM)
  4. Save to content library
  5. Queue for reposting
  6. Send thank-you message + discount code
```

### 3. **Blog Content Distribution**

```
Workflow: "Content Amplification"
Trigger: New blog post published
Actions:
  1. Extract title, summary, featured image
  2. Generate social media snippets
  3. Post to LinkedIn with professional tone
  4. Post to Instagram with visual focus
  5. Post to Twitter thread (key points)
  6. Send to email subscribers
  7. Submit to relevant Reddit communities
  8. Ping SEO tools for indexing
```

---

## 📊 Analytics & Reporting

### 1. **Daily Performance Dashboard**

```
Workflow: "Daily Analytics Report"
Trigger: Every day at 9 AM
Actions:
  1. Fetch data from Google Analytics
  2. Fetch booking data from MongoDB
  3. Calculate: conversion rate, revenue, occupancy
  4. Generate charts using QuickChart API
  5. Compile into HTML email
  6. Send to management team
  7. Post summary to Slack #analytics channel
```

**Metrics to Track**:
- Website visitors & sources
- Form submission rates
- Booking conversion rate
- Average booking value
- Occupancy rate by property
- Revenue per property
- Response time to inquiries
- Review ratings

### 2. **Weekly Business Intelligence Report**

```
Workflow: "Weekly BI Report"
Trigger: Every Monday at 8 AM
Sections:
  1. Revenue Summary (week vs last week, vs last year)
  2. Top Performing Properties
  3. Booking Sources (OTA breakdown)
  4. Guest Demographics
  5. Marketing Performance
  6. Operations Metrics
  7. Action Items & Alerts
Format: PDF + Google Data Studio dashboard
Recipients: Management + investors
```

### 3. **Property Owner Reports**

```
Workflow: "Owner Monthly Report"
Trigger: 1st of every month
Actions:
  1. Filter data by property owner
  2. Calculate: nights booked, revenue, expenses, net income
  3. Include: guest reviews, photos, maintenance log
  4. Generate invoice PDF
  5. Email to property owner
  6. Update owner portal dashboard
  7. Schedule call if revenue drops
```

---

## 🔧 Integration Architecture

### Recommended n8n Tech Stack

```yaml
Core Platform: n8n (self-hosted or cloud)

Key Integrations:

  CRM & Database:
    - MongoDB (your current database)
    - Airtable (visual sales pipeline)
    - Google Sheets (backup & reporting)

  Communication:
    - SendGrid (transactional emails)
    - Twilio (SMS)
    - WhatsApp Business API
    - Slack (internal notifications)

  Calendar & Scheduling:
    - Google Calendar
    - Calendly (booking calls)

  Marketing:
    - Instagram API
    - Facebook Graph API
    - LinkedIn API
    - Mailchimp/Brevo (email campaigns)

  Analytics:
    - Google Analytics 4
    - Mixpanel
    - Hotjar

  Payments:
    - Razorpay (India)
    - Stripe (international)

  AI & Content:
    - OpenAI GPT-4 (content generation)
    - Anthropic Claude (complex reasoning)
    - Stable Diffusion (image generation)

  Booking Platforms:
    - Airbnb API
    - Booking.com API
    - MakeMyTrip API

  Storage:
    - AWS S3 (file storage)
    - Cloudinary (image optimization)
```

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    HOSTIZZY WEBSITE                     │
│  (Next.js 16 + React 19 + MongoDB)                     │
└──────────────┬──────────────────────────┬───────────────┘
               │                          │
               │ Webhooks                 │ API Calls
               ▼                          ▼
┌──────────────────────────────────────────────────────────┐
│                      n8n WORKFLOWS                        │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐       │
│  │  Inquiry   │  │  Booking   │  │   Marketing  │       │
│  │  Router    │  │  Manager   │  │   Automation │       │
│  └────────────┘  └────────────┘  └──────────────┘       │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐       │
│  │  Review    │  │ Property   │  │  Analytics   │       │
│  │  System    │  │   Sync     │  │   Reporter   │       │
│  └────────────┘  └────────────┘  └──────────────┘       │
└───┬──────┬──────┬──────┬──────┬──────┬─────────┬────────┘
    │      │      │      │      │      │         │
    ▼      ▼      ▼      ▼      ▼      ▼         ▼
┌──────┐ ┌───┐ ┌────┐ ┌────┐ ┌────┐ ┌─────┐  ┌──────┐
│Slack │ │SMS│ │Mail│ │OTAs│ │ AI │ │Socials│  │  DB  │
└──────┘ └───┘ └────┘ └────┘ └────┘ └─────┘  └──────┘
```

---

## 🚀 Setup Instructions

### Phase 1: Foundation (Week 1)

1. **Install n8n**
   ```bash
   # Self-hosted (recommended for full control)
   docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n

   # Or use n8n Cloud
   # https://n8n.io/cloud
   ```

2. **Configure Webhooks**
   - Update form submission handlers to POST to n8n webhooks
   - Example: `https://your-n8n.com/webhook/contact-form`

3. **Set Up Core Integrations**
   - Connect MongoDB credentials
   - Configure SendGrid API key
   - Set up Slack workspace integration
   - Connect Google Sheets

### Phase 2: Essential Workflows (Week 2)

1. **Create Unified Inquiry Router**
   - Import workflow template
   - Configure routing logic
   - Test with sample data

2. **Set Up Auto-Response Emails**
   - Design email templates in SendGrid
   - Configure personalization tokens
   - A/B test subject lines

3. **Implement Slack Notifications**
   - Create channels: #sales-inquiries, #bookings, #reviews
   - Configure alert rules
   - Set up escalation paths

### Phase 3: Advanced Automation (Week 3-4)

1. **Property Sync Workflows**
   - Connect OTA APIs
   - Build transformation logic
   - Schedule sync intervals

2. **Review Collection System**
   - Set up post-stay triggers
   - Create email sequence
   - Configure reminder cadence

3. **Analytics Reporting**
   - Build daily dashboard
   - Create weekly reports
   - Set up owner reports

---

## 💰 ROI & Business Impact

### Expected Outcomes

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Inquiry Response Time | 2-4 hours | < 5 minutes | **96% faster** |
| Lead Conversion Rate | 12% | 22% | **83% increase** |
| Review Collection Rate | 15% | 55% | **267% increase** |
| Time on Manual Tasks | 15 hrs/week | 3 hrs/week | **80% reduction** |
| Revenue per Property | ₹12L/year | ₹18L/year | **50% increase** |
| Operational Cost | - | -30% | **Saved costs** |

### Time Savings Breakdown

- Form processing: 5 hours/week → Automated
- Review requests: 3 hours/week → Automated
- Property listing updates: 6 hours/week → Automated
- Reporting: 4 hours/week → Automated
- Follow-up reminders: 2 hours/week → Automated

**Total**: 20 hours/week saved = **80 hours/month** = **960 hours/year**

At ₹500/hour cost → **Annual savings: ₹4,80,000**

---

## 🎯 Implementation Priorities

### Month 1: Critical Foundations
1. ✅ Unified inquiry management
2. ✅ Auto-response emails
3. ✅ Slack notifications
4. ✅ Lead distribution

### Month 2: Guest Experience
1. ✅ Review collection system
2. ✅ Pre-arrival sequences
3. ✅ Post-stay engagement
4. ✅ WhatsApp integration

### Month 3: Marketing & Growth
1. ✅ Social media automation
2. ✅ Content distribution
3. ✅ Email campaigns
4. ✅ Analytics dashboards

### Month 4: Property Operations
1. ✅ Multi-channel sync
2. ✅ Dynamic pricing
3. ✅ Calendar management
4. ✅ Owner reporting

---

## 🔐 Security & Best Practices

### Webhook Security
```javascript
// Validate webhook signatures
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  return hash === signature;
}
```

### Data Privacy
- Encrypt sensitive guest data (PII)
- Implement GDPR compliance workflows
- Set data retention policies (auto-delete after X months)
- Anonymize analytics data

### Error Handling
- Set up error notifications (Slack/Email)
- Implement retry logic for failed API calls
- Log all workflow executions
- Monitor workflow performance

---

## 📚 Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community Workflows](https://n8n.io/workflows)
- [Hostizzy API Documentation](your-api-docs)
- [Integration Guides](integration-guides)

---

## 🤝 Next Steps

1. **Book n8n Setup Call**: Schedule with development team
2. **Define Priority Workflows**: Which 3 workflows to build first?
3. **Set Up n8n Instance**: Self-hosted vs cloud decision
4. **Create Webhook Endpoints**: Update forms to integrate
5. **Build First Workflow**: Start with contact form automation
6. **Test & Iterate**: Monitor for 2 weeks, optimize
7. **Scale Gradually**: Add new workflows monthly

---

**Ready to automate Hostizzy? Let's start with the Unified Inquiry Router and transform your operations! 🚀**
