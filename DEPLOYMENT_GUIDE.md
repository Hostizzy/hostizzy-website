# 🚀 Next.js Deployment Guide - Hostizzy Website

## Overview

Your website has been migrated from Vite + React Router + Express to Next.js 14+ with App Router. This guide will help you deploy to Vercel.

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables

Create these environment variables in your Vercel project settings:

```bash
# Required for authentication
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password

# Optional - MongoDB connection (uses JSON files if not set)
MONGODB_URI=your_mongodb_connection_string_here

# Automatically set by Vercel
NODE_ENV=production
```

### 2. Verify Build Locally

Test the production build before deploying:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test the production build
npm start
```

Visit http://localhost:3000 to verify everything works.

---

## 🔧 Vercel Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Migrate to Next.js"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/new
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add `ADMIN_USERNAME` = your admin username
   - Add `ADMIN_PASSWORD` = your secure password
   - Add `MONGODB_URI` = your MongoDB connection string (if using MongoDB)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Visit your deployment URL

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

---

## 🔄 Migration from Current Setup

### Current Setup (Before)
- **Frontend**: Vercel (Vite build)
- **Backend**: Render (Express server)
- **Issues**: No SSR, separate deployments, CORS issues

### New Setup (After)
- **Full-Stack**: Vercel (Next.js)
- **Benefits**: SSR/SSG, single deployment, better SEO, AI tools can read content

### Migration Steps

1. **Deploy Next.js to Vercel** (follow steps above)

2. **Test the New Deployment**
   - Visit all pages
   - Test API endpoints
   - Verify admin panel works
   - Check forms (contact, calculator, bookings)

3. **Update DNS (if using custom domain)**
   - Point hostizzy.com to new Vercel deployment
   - Vercel → Settings → Domains → Add Domain

4. **Monitor for 24-48 hours**
   - Check error logs in Vercel dashboard
   - Verify analytics/tracking still works
   - Test all critical user flows

5. **Deprecate Render Backend**
   - Once verified working, you can shut down Render
   - Save costs by removing duplicate backend

---

## 🧪 Testing Checklist

After deployment, verify these work:

### Public Pages
- [ ] Home page loads with all components
- [ ] Properties page shows listings
- [ ] Individual property details load
- [ ] About, Services, Career pages load
- [ ] Contact form submits successfully
- [ ] Calculator works and captures leads
- [ ] Experiences/NextStop pages load
- [ ] Blog page loads
- [ ] All product pages (ResIQ, HostOS, etc.)

### Authentication & Admin
- [ ] Login page works
- [ ] Admin panel accessible after login
- [ ] Can create/edit/delete properties
- [ ] Can manage experiences
- [ ] Can manage blogs
- [ ] SEO settings can be updated

### API Endpoints (Test with curl)
```bash
# Test public API
curl https://your-site.vercel.app/api/properties

# Test authentication
curl -X POST https://your-site.vercel.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"password":"hostizzy2025"}'

# Test protected route
curl https://your-site.vercel.app/api/properties \
  -H "Authorization: Bearer hz-admin-token-2025"
```

### SEO & Performance
- [ ] Google can crawl pages (check Search Console)
- [ ] Meta tags are correct (view page source)
- [ ] Open Graph images work (test on Facebook/LinkedIn)
- [ ] NotebookLM can read your site content
- [ ] Page load times are fast (<2s)

---

## 📊 Monitoring & Logs

### View Logs in Vercel

1. Go to Vercel Dashboard → Your Project
2. Click on "Deployments"
3. Click on a deployment → "Runtime Logs"

### Common Issues

**1. Build Fails**
- Check error logs in Vercel
- Verify all dependencies are in package.json
- Ensure no hardcoded localhost URLs

**2. API Routes Not Working**
- Verify environment variables are set
- Check API route files exist in app/api/
- Review runtime logs for errors

**3. Images Not Loading**
- Ensure images are in /public directory
- Use Next.js Image component for optimization
- Check image paths (no leading `/public/`)

**4. MongoDB Connection Issues**
- Verify MONGODB_URI is set correctly
- Check MongoDB Atlas network access
- Review connection string format

---

## 🎨 Custom Domain Setup

1. **Add Domain in Vercel**
   - Vercel Dashboard → Settings → Domains
   - Add `hostizzy.com` and `www.hostizzy.com`

2. **Update DNS Records**
   - Add A record: `76.76.21.21` (Vercel)
   - Add CNAME for www: `cname.vercel-dns.com`

3. **SSL Certificate**
   - Vercel automatically provisions SSL
   - Usually takes 1-24 hours

4. **Verify**
   - Visit https://hostizzy.com
   - Check SSL certificate is valid

---

## 🔐 Security Checklist

- [ ] Environment variables are set in Vercel (not in code)
- [ ] .env files are in .gitignore
- [ ] Admin password is strong
- [ ] MongoDB connection uses authentication
- [ ] API routes have proper auth middleware
- [ ] CORS is configured correctly (if needed)

---

## 📈 Performance Optimization

Vercel automatically handles:
- ✅ Edge caching
- ✅ Image optimization
- ✅ Code splitting
- ✅ Automatic compression
- ✅ CDN distribution

Optional enhancements:
- Enable ISR (Incremental Static Regeneration) for dynamic pages
- Add caching headers for API routes
- Use Next.js Image component everywhere

---

## 🆘 Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Support**: support@vercel.com
- **Error Logs**: Vercel Dashboard → Runtime Logs

---

## 📝 Notes

### Data Storage

- **JSON Files**: Located in `server/data/` - work in Vercel
- **MongoDB**: Recommended for production - more reliable
- **File Uploads**: Use Vercel Blob or external service (S3, Cloudinary)

### Build Times

- First build: ~3-5 minutes
- Subsequent builds: ~1-2 minutes
- Vercel caches dependencies

### Costs

- **Hobby (Free) Plan**:
  - Unlimited deployments
  - 100GB bandwidth/month
  - 6,000 build minutes/month
  - Perfect for getting started

- **Pro Plan** ($20/month):
  - More bandwidth
  - Password protection
  - Advanced analytics
  - Priority support

---

## ✅ Final Steps

1. Deploy to Vercel
2. Test all functionality
3. Update custom domain
4. Monitor for 48 hours
5. Shut down Render backend
6. Celebrate! 🎉

Your website is now fully deployed with Next.js on Vercel with SSR, better SEO, and AI tool compatibility!
