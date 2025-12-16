# Hostizzy - Premium Property Management Platform

Hostizzy is a modern, high-performance website for a premium Airbnb property management company. It features a stunning UI, dynamic content management via an Admin panel, and SEO-optimized pages.

![Hostizzy Hero](public/images/hero.png)

## 🚀 Features

-   **Premium Design**: Fully responsive, aesthetic UI with smooth animations (Framer Motion).
-   **Dynamic Content**: Manage Properties, Experiences, Blogs, and Testimonials via JSON-based backend.
-   **Admin Panel**: specific `/admin` route to manage all site content (Password protected in future versions).
-   **Inquiry System**: Users can request bookings for properties and experiences directly.
-   **SEO Optimized**: Server-side friendly structure, meta tags, and structured data (JSON-LD).
-   **Social Integration**: Instagram feed integration and share functionality.

## 🛠️ Tech Stack

-   **Frontend**: React (v18+), Vite, Framer Motion, Lucide Icons.
-   **Backend**: Node.js, Express.js.
-   **Data**: JSON-based flat-file database (No SQL/Mongo required for simplicity).
-   **Styling**: Pure CSS / Modern CSS Variables.

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Hostizzy/hostizzy-website.git
    cd hostizzy-website
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    This starts both the **Frontend** (port 5173) and **Backend** (port 3001) concurrently.

## 🚀 Deployment

This project is configured for a separated deployment strategy:
-   **Frontend**: Vercel / Netlify
-   **Backend**: Render / Railway

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step instructions.

## 📂 Project Structure

```
├── public/              # Static assets (images, robots.txt)
├── server/
│   ├── data/            # JSON data files (Database)
│   └── server.js        # Express API server
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route pages (Home, Admin, Properties...)
│   ├── main.jsx         # Entry point (API config)
│   └── App.jsx          # Routing setup
└── vercel.json          # Frontend deployment config
```

## 🔑 Admin Access

Access the CMS at `/admin`.
*   **Manage**: Properties, Experiences, Blogs, Testimonials.
*   **View**: Incoming Booking Inquiries.

## 📄 License

Private Property of Hostizzy.
