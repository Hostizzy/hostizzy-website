# Deployment Guide

## 1. Prerequisites
- GitHub Account
- Vercel Account (for Frontend)
- Render Account (for Backend)
- **Important**: Push your code to a new GitHub repository before starting.

---

## 2. Backend Deployment (Render)
1.  Log in to [Render](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Settings**:
    - **Name**: `hostizzy-backend`
    - **Runtime**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `node server/server.js`
5.  Click **Create Web Service**.
6.  **Copy the URL** once deployed (e.g., `https://hostizzy-backend.onrender.com`).

---

## 3. Frontend Deployment (Vercel)
1.  Log in to [Vercel](https://vercel.com).
2.  Click **Add New** -> **Project**.
3.  Import your GitHub repository.
4.  **Build Settings**: Default (Vite) should work efficiently.
5.  **Environment Variables**:
    - Add a new variable:
        - **Name**: `VITE_API_BASE_URL`
        - **Value**: The URL you copied from Render (e.g., `https://hostizzy-backend.onrender.com`)
6.  Click **Deploy**.

---

## 4. Final Connection
Since we are separating Frontend and Backend, the Frontend needs to know where the Backend lives.
- Ensure you added the `VITE_API_BASE_URL` in Vercel.
- If the backend fails to load data, check the Browser Console (F12) for CORS errors or 404s.

**Done!** Your site is live.
