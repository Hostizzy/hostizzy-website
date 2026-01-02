# Vercel Deployment Guide - Fix Production Errors

## 🚨 Current Issue
Production site (hostsphereindia.com) is showing:
- "Application error: a client-side exception has occurred"
- 500 errors from /api/properties

**Root Cause**: Vercel is still using the old MongoDB connection string from the deleted cluster.

## ✅ Solution: Update Vercel Environment Variables

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Login with your account
3. Select your project: **hostizzy-website** (or **hostsphereindia**)

### Step 2: Update Environment Variables

Go to **Settings** → **Environment Variables**

#### Delete Old Variables (if they exist):
- `MONGODB_URI` (old cluster connection)

#### Add/Update These Variables:

```bash
MONGODB_URI
mongodb+srv://hostizzy_admin:RFaLEbYtnawyMiwT@hostizzy-cluster.stk2utn.mongodb.net/hostizzy_db?retryWrites=true&w=majority&appName=hostizzy-cluster
```
✅ Check: Production, Preview, Development

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
dawi84j20
```
✅ Check: Production, Preview, Development

```bash
CLOUDINARY_API_KEY
593456556327369
```
✅ Check: Production, Preview, Development

```bash
CLOUDINARY_API_SECRET
BHDXC6mjEcdwVe-uJvH3h6yCBaU
```
✅ Check: Production, Preview, Development

```bash
ADMIN_USERNAME
admin
```
✅ Check: Production, Preview, Development

```bash
ADMIN_PASSWORD
hostizzy2025
```
✅ Check: Production, Preview, Development

### Step 3: Redeploy

After adding all environment variables:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots (⋮)** menu
4. Click **Redeploy**
5. Wait for deployment to complete (usually 1-2 minutes)

### Step 4: Verify Deployment

Once deployment completes, test these URLs:

1. **API Test**: https://www.hostsphereindia.com/api/properties
   - Should return JSON array with 3 properties
   - Should NOT show 500 error

2. **Homepage Test**: https://www.hostsphereindia.com
   - Should load without errors
   - Properties section should show 3 properties

3. **Admin Panel Test**: https://www.hostsphereindia.com/admin
   - Login with: admin / hostizzy2025
   - Should see properties, experiences, blogs, testimonials

## 🔍 Troubleshooting

### Issue: Still getting 500 errors after deployment

**Check:**
1. Are all environment variables saved correctly?
2. Did you check Production checkbox for each variable?
3. Did the deployment complete successfully?

**Solution:**
- Go back to Environment Variables
- Click "Edit" on MONGODB_URI
- Verify the value is correct (copy from above)
- Save and redeploy again

### Issue: "Unauthorized" or "Authentication failed"

**Cause:** Wrong MongoDB credentials

**Solution:**
1. Check MONGODB_URI has the correct password: `RFaLEbYtnawyMiwT`
2. Verify database name is `hostizzy_db` (not `admin` or `hostizzy`)
3. Redeploy

### Issue: Properties still not showing

**Check MongoDB Atlas:**
1. Go to MongoDB Atlas dashboard
2. Click "Network Access"
3. Verify "0.0.0.0/0" is in the IP Access List (allows all IPs including Vercel)
4. If not, click "Add IP Address" → "Allow Access from Anywhere" → Confirm

### Issue: Images not uploading

**Cause:** Missing Cloudinary credentials

**Solution:**
- Verify all 3 Cloudinary variables are set in Vercel
- Check spelling and values match exactly

## 📋 Environment Variables Checklist

Before redeploying, verify each variable:

- [ ] `MONGODB_URI` - Points to hostizzy-cluster with `/hostizzy_db`
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Set to `dawi84j20`
- [ ] `CLOUDINARY_API_KEY` - Set to `593456556327369`
- [ ] `CLOUDINARY_API_SECRET` - Set correctly
- [ ] `ADMIN_USERNAME` - Set to `admin`
- [ ] `ADMIN_PASSWORD` - Set to `hostizzy2025`
- [ ] All variables have "Production" checked
- [ ] All variables have "Preview" checked
- [ ] All variables have "Development" checked

## 🚀 After Successful Deployment

You should see:

✅ Homepage loads without errors
✅ Properties section shows 3 properties
✅ Experiences section shows 2 experiences
✅ Admin panel accessible
✅ API endpoints return data

## 📸 Screenshots of Where to Find Settings

### Finding Environment Variables:
```
Vercel Dashboard
└── Your Project (hostizzy-website)
    └── Settings (top navigation)
        └── Environment Variables (left sidebar)
            └── Add/Edit variables here
```

### Finding Deployments:
```
Vercel Dashboard
└── Your Project (hostizzy-website)
    └── Deployments (top navigation)
        └── Latest deployment
            └── ⋮ (three dots)
                └── Redeploy
```

## 🔐 Security Note

These credentials are shown here for deployment purposes. After deployment:
- Do NOT commit credentials to Git
- Do NOT share this file publicly
- Keep the NEW_CLUSTER_SETUP.md file private
- Consider rotating passwords periodically

## 📞 Need Help?

If deployment still fails after following all steps:

1. **Check Vercel deployment logs**:
   - Go to Deployments → Click on the deployment → View "Build Logs" and "Function Logs"
   - Look for error messages related to MongoDB or environment variables

2. **Test MongoDB connection directly**:
   - Use MongoDB Compass or Atlas UI to verify the cluster is accessible
   - Test the connection string works

3. **Verify code is pushed to GitHub**:
   - Latest commit should be `062702f` or newer
   - Check: https://github.com/Hostizzy/hostizzy-website/commits/main

## ✨ Summary

**Problem**: Old MongoDB cluster was deleted, Vercel still using old connection
**Solution**: Update MONGODB_URI to new cluster in Vercel environment variables
**Result**: Production site will connect to new MongoDB cluster and work correctly

---

**Created**: January 2, 2026
**For**: Production deployment to Vercel
**Project**: Hostizzy Website
