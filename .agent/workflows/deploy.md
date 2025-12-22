---
description: How to deploy the Hostizzy website to production
---

This guide outlines the steps to deploy the Hostizzy application. The project is configured as a monolithic Node.js application that serves the React frontend.

# Deployment Steps

## 1. Prerequisites
Ensure the target environment includes:
- **Node.js**: v18 or higher
- **NPM**: v9 or higher

## 2. Environment Variables
Configure the following environment variables in your production dashboard (e.g., Render, Vercel, Railway):

```bash
NODE_ENV=production
PORT=3001
ADMIN_PASSWORD=your_secure_password
```

## 3. Build & Run Commands

Most hosting providers (Render, Heroku, Railway) will automatically detect the settings, but you can explicitly set them:

- **Build Command:** `npm install && npm run build`
  - This installs dependencies and builds the optimized Vite frontend to the `/dist` folder.

- **Start Command:** `npm start`
  - This executes `node server/server.js`, which starts the Express API and serves the `/dist` frontend.

## 4. Platform Specifics

### Render.com (Recommended)
1.  Connect your GitHub repository.
2.  Select **"Web Service"**.
3.  Use the following settings:
    - **Runtime:** Node
    - **Build Command:** `npm install && npm run build`
    - **Start Command:** `npm start`
4.  Add Environment Variables from Step 2.

### VPS / Manual Deployment
1.  Clone the repository.
2.  Run `npm install`.
3.  Run `npm run build`.
4.  Run `npm start` (or use PM2: `pm2 start server/server.js --name hostizzy`).
