---
description: How to deploy the Hostizzy website to production
---

This guide outlines the steps to deploy the Hostizzy application. The project is configured as a monolithic Node.js application that serves the React frontend.

# Deployment Steps

# Deployment: Vercel (Frontend) + Render (Backend)

The user-preferred strategy is to host the Frontend on Vercel and the Backend on Render.

## ⚠️ Important Data Persistence Warning
The current backend saves data (Properties, Bookings, Settings) to **local JSON files** (`server/data/*.json`).
- **On Render:** These files are ephemeral. **All data will be reset** every time you deploy or if the server restarts, unless you attach a **Render Persistent Disk**.
- **Recommendation:** modifying the backend to use a database (MongoDB/Postgres) is recommended for production. For now, be aware that data is temporary.

## Part 1: Backend (Render.com)
1.  Connect your GitHub repo to Render.
2.  Create a **"Web Service"**.
3.  Settings:
    - **Build Command:** `npm install`
    - **Start Command:** `npm run server`
    - **Environment Variables:**
        - `ADMIN_PASSWORD`: (Your secure password)
4.  **Wait for deployment**: specific URL will be assigned (e.g., `https://hostizzy-backend.onrender.com`).
5.  **Copy this URL**.

## Part 2: Frontend (Vercel)
1.  In your project root, open `vercel.json`.
2.  Replace `https://YOUR_BACKEND_URL_ON_RENDER.onrender.com` with your actual Render URL from Part 1.
3.  Push this change to GitHub.
4.  Connect your GitHub repo to Vercel.
5.  Settings:
    - **Framework Preset:** Vite
    - **Build Command:** `npm run build`
    - **Output Directory:** `dist`
6.  Deploy!

## Alternative: Monolithic Deployment (Render Only)
If you prefer a single service, you can deploy everything to Render:
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
