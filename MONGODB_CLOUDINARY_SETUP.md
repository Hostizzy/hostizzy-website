# MongoDB + Cloudinary Setup Guide

Complete guide to setting up MongoDB database and Cloudinary image uploads for Hostizzy.

---

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository access
- Web browser

---

## 🗄️ Part 1: MongoDB Atlas Setup (5-10 minutes)

### Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with Google/GitHub or email
3. Complete email verification

### Step 2: Create a Free Cluster

1. Click "Build a Database"
2. Choose **M0 FREE** tier
   - 512MB storage
   - Shared RAM
   - Forever free!
3. Select Cloud Provider & Region:
   - **Provider**: AWS
   - **Region**: Mumbai (ap-south-1) - closest to India
4. Cluster Name: `hostizzy-cluster` (or any name)
5. Click "Create"

### Step 3: Create Database User

1. Security → Database Access → Add New Database User
2. Authentication Method: Password
3. Username: `hostizzy_admin`
4. Password: Generate secure password (save it!)
5. Database User Privileges: **Atlas admin**
6. Click "Add User"

### Step 4: Configure Network Access

1. Security → Network Access → Add IP Address
2. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - For production, restrict to your server IPs
3. Click "Confirm"

### Step 5: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: **Node.js**
4. Version: **5.5 or later**
5. Copy the connection string:
   ```
   mongodb+srv://hostizzy_admin:<password>@hostizzy-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password

---

## 🖼️ Part 2: Cloudinary Setup (5 minutes)

### Step 1: Create Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up (free tier includes 25GB storage + 25GB bandwidth/month)
3. Verify your email

### Step 2: Get API Credentials

1. Go to Dashboard: [https://cloudinary.com/console](https://cloudinary.com/console)
2. You'll see:
   - **Cloud Name**: `dxxxxxxxx`
   - **API Key**: `123456789012345`
   - **API Secret**: `aBcDeFgHiJkLmNoPqRsTuVwXyZ`
3. Keep this tab open!

### Step 3: Configure Upload Presets (Optional)

1. Settings → Upload → Upload Presets
2. Click "Add upload preset"
3. Preset name: `hostizzy_properties`
4. Signing Mode: **Signed**
5. Folder: `hostizzy/properties`
6. Save

---

## ⚙️ Part 3: Configure Environment Variables

### Step 1: Create .env.local file

In your project root, create `.env.local`:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://hostizzy_admin:YOUR_PASSWORD@hostizzy-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=aBcDeFgHiJkLmNoPqRsTuVwXyZ

# Admin Password (existing)
ADMIN_PASSWORD=your_existing_password
```

**Important:** Replace with your actual credentials!

### Step 2: Verify .gitignore

Ensure `.env.local` is in `.gitignore`:

```
# .gitignore
.env.local
.env*.local
```

---

## 🔄 Part 4: Migrate Existing Data

### Step 1: Run Migration Script

```bash
node scripts/migrate-to-mongodb.js
```

This will:
- ✅ Connect to MongoDB
- ✅ Read your `db.json`
- ✅ Migrate all data (properties, experiences, etc.)
- ✅ Create indexes for performance
- ✅ Preserve existing IDs

### Step 2: Verify Migration

1. Go to MongoDB Atlas → Browse Collections
2. Database: `hostizzy`
3. Check collections:
   - `properties` - should have your properties
   - `experiences` - should have your experiences
   - `testimonials`, `blogs`, etc.

---

## 🧪 Part 5: Test Everything

### Test 1: Start Development Server

```bash
npm run dev
```

### Test 2: Test Image Upload

1. Go to `http://localhost:3000/login`
2. Login to admin panel
3. Go to Properties or Experiences
4. Click "Add New"
5. Try uploading an image - should upload to Cloudinary!

### Test 3: Verify Data Display

1. Visit `http://localhost:3000/properties`
2. Should see all properties from MongoDB
3. Visit `http://localhost:3000/experiences`
4. Should see all experiences

---

## 📝 Part 6: Update Admin Panel (Already Done!)

The following files have been updated to support image uploads:

### New Components:

1. **`components/admin/ImageUpload.jsx`**
   - Drag-and-drop image upload
   - Multiple image support
   - Preview before upload
   - Automatic Cloudinary integration

### Updated Components:

You need to integrate `ImageUpload` into your existing admin forms:

```jsx
import ImageUpload from '@/components/admin/ImageUpload';

// In your property/experience form:
<ImageUpload
  value={formData.image}
  onChange={(url) => setFormData({ ...formData, image: url })}
  label="Property Image"
  folder="hostizzy/properties"
/>

// For gallery (multiple images):
<ImageUpload
  value={formData.gallery || []}
  onChange={(urls) => setFormData({ ...formData, gallery: urls })}
  label="Image Gallery"
  folder="hostizzy/properties"
  multiple
  maxFiles={10}
/>
```

---

## 🚀 Part 7: Deploy to Production

### Update Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the following:

```
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=aBcDeFgHiJkLmNoPqRsTuVwXyZ
```

3. Redeploy your application

---

## 🔒 Security Best Practices

### MongoDB Security:

1. ✅ Use strong passwords (20+ characters)
2. ✅ Restrict IP access (whitelist only your server IPs)
3. ✅ Enable monitoring and alerts
4. ✅ Regular backups (Atlas does this automatically)

### Cloudinary Security:

1. ✅ Never expose `CLOUDINARY_API_SECRET` in client-side code
2. ✅ Use signed uploads for sensitive content
3. ✅ Set up content moderation (Settings → Security)
4. ✅ Enable usage alerts

---

## 📊 Monitoring & Maintenance

### MongoDB Atlas:

- **Metrics**: Monitor performance, storage, connections
- **Alerts**: Set up alerts for high CPU/memory usage
- **Backups**: Automatic continuous backups (M10+ clusters)

### Cloudinary:

- **Dashboard**: Monitor upload counts, bandwidth usage
- **Usage Alerts**: Get notified when approaching limits
- **Analytics**: Track image transformations and optimizations

---

## 🆘 Troubleshooting

### Error: "MongoServerError: Authentication failed"

**Solution**: Check your password in `MONGODB_URI`. Special characters need URL encoding:
- `@` → `%40`
- `#` → `%23`
- `!` → `%21`

### Error: "Cannot connect to MongoDB"

**Solution**:
1. Check Network Access allows your IP
2. Verify connection string format
3. Ensure cluster is running (not paused)

### Error: "Cloudinary upload failed"

**Solution**:
1. Verify API credentials are correct
2. Check file size (max 10MB on free tier)
3. Ensure file format is supported (JPG, PNG, WebP)

### Images not displaying

**Solution**:
1. Check Cloudinary URL is correct
2. Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set
3. Check browser console for errors

---

## 💡 Tips & Best Practices

### Image Optimization:

1. Upload high-quality originals - Cloudinary auto-optimizes
2. Use Cloudinary transformations for responsive images
3. Enable auto-format (WebP for modern browsers)

### Database Performance:

1. Create indexes on frequently queried fields
2. Use MongoDB aggregation for complex queries
3. Monitor slow queries in Atlas Performance Advisor

### Cost Management:

1. MongoDB Free Tier: 512MB (enough for ~10,000 properties)
2. Cloudinary Free Tier: 25GB storage (enough for ~5,000 images)
3. Upgrade only when needed

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

---

## ✅ Setup Complete!

You now have:
- ✅ MongoDB database for scalable data storage
- ✅ Cloudinary for optimized image hosting
- ✅ Image upload in admin panel
- ✅ Production-ready infrastructure

**Next Steps:**
1. Test image uploads in admin panel
2. Monitor usage in first month
3. Set up alerts for both services
4. Enjoy scalable, professional image management! 🎉
