import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Files (Vite Build)
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Content Data Paths
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const EXPERIENCES_FILE = path.join(DATA_DIR, 'experiences.json');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const SEO_FILE = path.join(DATA_DIR, 'seo.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// --- AUTHENTICATION ---
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hostizzy2025';

app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, token: 'hz-admin-token-2025' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

// Simple Auth Middleware
const authMiddleware = (req, res, next) => {
    // Skip auth for GET requests (except bookings) and login
    if (req.method === 'GET' && !req.path.includes('/api/bookings')) return next();
    if (req.path === '/api/login' || req.path === '/api/contact' || (req.method === 'POST' && req.path === '/api/bookings')) return next();

    const authHeader = req.headers.authorization;
    if (authHeader === 'Bearer hz-admin-token-2025') {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized. Admin access required.' });
    }
};

app.use(authMiddleware);

// --- Helper Functions ---
const readJson = (file) => {
    if (!fs.existsSync(file)) return [];
    try {
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading JSON:", e);
        return [];
    }
};

const writeJson = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// --- ROUTES: PROPERTIES ---

// Get All
app.get('/api/properties', (req, res) => {
    try {
        const properties = readJson(PROPERTIES_FILE);
        const { category, location } = req.query;
        let filtered = properties;
        if (category && category !== 'All') filtered = filtered.filter(p => p.type.toLowerCase() === category.toLowerCase());
        if (location && location !== 'All') filtered = filtered.filter(p => p.location.includes(location));
        res.json(filtered);
    } catch {
        res.status(500).json({ error: "Failed to load properties" });
    }
});

// Get Single
app.get('/api/properties/:id', (req, res) => {
    const properties = readJson(PROPERTIES_FILE);
    const property = properties.find(p => p.id == req.params.id);
    property ? res.json(property) : res.status(404).json({ error: 'Not found' });
});

// Create
app.post('/api/properties', (req, res) => {
    const properties = readJson(PROPERTIES_FILE);
    const newProperty = { id: Date.now(), ...req.body, rating: 5.0, reviews: 0 };
    properties.push(newProperty);
    writeJson(PROPERTIES_FILE, properties);
    res.status(201).json(newProperty);
});

// Update (PUT)
app.put('/api/properties/:id', (req, res) => {
    let properties = readJson(PROPERTIES_FILE);
    const index = properties.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    properties[index] = { ...properties[index], ...req.body };
    writeJson(PROPERTIES_FILE, properties);
    res.json(properties[index]);
});

// Delete
app.delete('/api/properties/:id', (req, res) => {
    let properties = readJson(PROPERTIES_FILE);
    const newProperties = properties.filter(p => p.id != req.params.id);
    if (properties.length === newProperties.length) return res.status(404).json({ error: 'Not found' });

    writeJson(PROPERTIES_FILE, newProperties);
    res.json({ success: true });
});


// --- ROUTES: EXPERIENCES (NextStop) ---

// Get All
app.get('/api/experiences', (req, res) => {
    res.json(readJson(EXPERIENCES_FILE));
});

// Get Single
app.get('/api/experiences/:id', (req, res) => {
    const experiences = readJson(EXPERIENCES_FILE);
    const exp = experiences.find(e => e.id == req.params.id);
    exp ? res.json(exp) : res.status(404).json({ error: 'Not found' });
});

// Create
app.post('/api/experiences', (req, res) => {
    const experiences = readJson(EXPERIENCES_FILE);
    const newExp = { id: Date.now(), ...req.body };
    experiences.push(newExp);
    writeJson(EXPERIENCES_FILE, experiences);
    res.status(201).json(newExp);
});

// Update
app.put('/api/experiences/:id', (req, res) => {
    let experiences = readJson(EXPERIENCES_FILE);
    const index = experiences.findIndex(e => e.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    experiences[index] = { ...experiences[index], ...req.body };
    writeJson(EXPERIENCES_FILE, experiences);
    res.json(experiences[index]);
});

// Delete
app.delete('/api/experiences/:id', (req, res) => {
    let experiences = readJson(EXPERIENCES_FILE);
    const newExps = experiences.filter(e => e.id != req.params.id);
    if (experiences.length === newExps.length) return res.status(404).json({ error: 'Not found' });

    writeJson(EXPERIENCES_FILE, newExps);
    res.json({ success: true });
});

// --- ROUTES: BLOGS ---

// Get All
app.get('/api/blogs', (req, res) => {
    res.json(readJson(BLOGS_FILE));
});

// Create
app.post('/api/blogs', (req, res) => {
    const blogs = readJson(BLOGS_FILE);
    const newBlog = { id: Date.now(), date: new Date().toISOString().split('T')[0], ...req.body };
    blogs.push(newBlog);
    writeJson(BLOGS_FILE, blogs);
    res.status(201).json(newBlog);
});

// Update
app.put('/api/blogs/:id', (req, res) => {
    let blogs = readJson(BLOGS_FILE);
    const index = blogs.findIndex(b => b.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    blogs[index] = { ...blogs[index], ...req.body };
    writeJson(BLOGS_FILE, blogs);
    res.json(blogs[index]);
});

// Delete
app.delete('/api/blogs/:id', (req, res) => {
    let blogs = readJson(BLOGS_FILE);
    const newBlogs = blogs.filter(b => b.id != req.params.id);
    if (blogs.length === newBlogs.length) return res.status(404).json({ error: 'Not found' });
    writeJson(BLOGS_FILE, newBlogs);
    res.json({ success: true });
});

// --- ROUTES: TESTIMONIALS ---

// Get All
app.get('/api/testimonials', (req, res) => {
    res.json(readJson(TESTIMONIALS_FILE));
});

// Create
app.post('/api/testimonials', (req, res) => {
    const testimonials = readJson(TESTIMONIALS_FILE);
    const newTestimonial = { id: Date.now(), ...req.body };
    testimonials.unshift(newTestimonial); // Add to top
    writeJson(TESTIMONIALS_FILE, testimonials);
    res.status(201).json(newTestimonial);
});

// Update
app.put('/api/testimonials/:id', (req, res) => {
    let testimonials = readJson(TESTIMONIALS_FILE);
    const index = testimonials.findIndex(t => t.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    testimonials[index] = { ...testimonials[index], ...req.body };
    writeJson(TESTIMONIALS_FILE, testimonials);
    res.json(testimonials[index]);
});

// Delete
app.delete('/api/testimonials/:id', (req, res) => {
    let testimonials = readJson(TESTIMONIALS_FILE);
    const newTestimonials = testimonials.filter(t => t.id != req.params.id);
    if (testimonials.length === newTestimonials.length) return res.status(404).json({ error: 'Not found' });
    writeJson(TESTIMONIALS_FILE, newTestimonials);
    res.json({ success: true });
});

// --- ROUTES: SEO ---
// Using SEO_FILE declared at top

// Get SEO data
app.get('/api/seo', async (req, res) => {
    try {
        // Use fs.promises for async file operations
        const data = await fs.promises.readFile(SEO_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        // If file doesn't exist or is empty, return a default empty object
        if (err.code === 'ENOENT' || err instanceof SyntaxError) {
            return res.json({});
        }
        console.error("Error loading SEO data:", err);
        res.status(500).json({ error: 'Failed to load SEO' });
    }
});

// Update SEO data
app.put('/api/seo', authMiddleware, async (req, res) => {
    try {
        await fs.promises.writeFile(SEO_FILE, JSON.stringify(req.body, null, 2));
        res.json({ message: 'SEO updated successfully' });
    } catch (err) {
        console.error("Error saving SEO data:", err);
        res.status(500).json({ error: 'Failed to save SEO' });
    }
});

// --- ROUTES: SETTINGS ---
app.get('/api/settings', async (req, res) => {
    try {
        const data = await fs.promises.readFile(SETTINGS_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.json({});
    }
});

app.put('/api/settings', authMiddleware, async (req, res) => {
    try {
        await fs.promises.writeFile(SETTINGS_FILE, JSON.stringify(req.body, null, 2));
        res.json({ message: 'Settings updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save settings' });
    }
});

// --- ROUTES: SOCIAL ---
const SOCIAL_FILE = path.join(__dirname, 'data', 'social.json');

app.get('/api/social/instagram', (req, res) => {
    const data = readJson(SOCIAL_FILE);
    res.json(data.instagram || []);
});

app.post('/api/social/instagram', (req, res) => {
    const data = readJson(SOCIAL_FILE);
    if (!data.instagram) data.instagram = [];
    const newItem = { id: Date.now(), ...req.body };
    data.instagram.unshift(newItem);
    writeJson(SOCIAL_FILE, data);
    res.status(201).json(newItem);
});

app.put('/api/social/instagram/:id', (req, res) => {
    const data = readJson(SOCIAL_FILE);
    if (!data.instagram) return res.status(404).json({ error: 'No data' });
    const index = data.instagram.findIndex(i => i.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    data.instagram[index] = { ...data.instagram[index], ...req.body };
    writeJson(SOCIAL_FILE, data);
    res.json(data.instagram[index]);
});

app.delete('/api/social/instagram/:id', (req, res) => {
    const data = readJson(SOCIAL_FILE);
    if (!data.instagram) return res.status(404).json({ error: 'No data' });
    data.instagram = data.instagram.filter(i => i.id != req.params.id);
    writeJson(SOCIAL_FILE, data);
    res.json({ success: true });
});

// --- ROUTES: BOOKINGS (MOCK) ---
const BOOKINGS_FILE = path.join(__dirname, 'data', 'bookings.json');

// Get All Bookings
app.get('/api/bookings', (req, res) => {
    const data = readJson(BOOKINGS_FILE);
    res.json(data.bookings || []);
});

// Create Mock Booking
app.post('/api/bookings', (req, res) => {
    const data = readJson(BOOKINGS_FILE);
    if (!data.bookings) data.bookings = [];

    const newBooking = {
        id: Date.now(),
        status: 'Inquiry', // Default status for forms
        paymentId: 'N/A',
        date: new Date().toISOString(),
        ...req.body
    };

    data.bookings.unshift(newBooking);
    writeJson(BOOKINGS_FILE, data);

    // Simulate delay
    setTimeout(() => {
        res.status(201).json({ success: true, booking: newBooking });
    }, 1000);
});

// Metadata Import (Airbnb/Url)
// Enhanced Meta Scraper for Airbnb/Website
app.post('/api/import-meta', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: 'URL required' });

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });
        const html = await response.text();

        // Improved Regex based extraction
        const getMeta = (prop) => {
            const match = html.match(new RegExp(`<meta property=["']${prop}["'] content=["']([^"']*)["']`)) ||
                html.match(new RegExp(`<meta name=["']${prop}["'] content=["']([^"']*)["']`));
            return match ? match[1] : '';
        };

        const title = getMeta('og:title') || getMeta('twitter:title') || html.match(/<title>([^<]*)<\/title>/)?.[1] || '';
        const description = getMeta('og:description') || getMeta('twitter:description');
        const image = getMeta('og:image') || getMeta('twitter:image');

        // Extract Price (Very heuristic)
        let price = '';
        const priceMatch = html.match(/[₹$]\s?([0-9,]+)/);
        if (priceMatch) price = `₹${priceMatch[1]}`;

        res.json({ title: title.split(' - ')[0], description, image, price });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to import meta tags' });
    }
});

// Magic Paste Parser (AI-style regex/logic)
app.post('/api/parse-listing', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text required' });

    // AI-style logic using heuristics and regex
    const parsedData = {
        title: text.split('\n')[0].substring(0, 100),
        description: text.substring(0, 500),
        price: '',
        location: '',
        guests: 2,
        bedrooms: 1,
        bathrooms: 1
    };

    // Heuristics for common listing text
    const priceMatch = text.match(/([0-9,]+)\s?(per night|nightly|₹|$)/i);
    if (priceMatch) parsedData.price = `₹${priceMatch[1]}`;

    const guestMatch = text.match(/([0-9]+)\s?(guests|people|pax)/i);
    if (guestMatch) parsedData.guests = parseInt(guestMatch[1]);

    const bedroomMatch = text.match(/([0-9]+)\s?(bedroom|bdrm)/i);
    if (bedroomMatch) parsedData.bedrooms = parseInt(bedroomMatch[1]);

    const bathroomMatch = text.match(/([0-9]+)\s?(bathroom|bath)/i);
    if (bathroomMatch) parsedData.bathrooms = parseInt(bathroomMatch[1]);

    const locationMatch = text.match(/(in|at|located in)\s?([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/);
    if (locationMatch) parsedData.location = locationMatch[2];

    res.json(parsedData);
});

// Contact Form
app.post('/api/contact', (req, res) => {
    const contacts = readJson(CONTACTS_FILE);
    const newContact = { id: Date.now(), timestamp: new Date(), ...req.body };
    contacts.unshift(newContact);
    writeJson(CONTACTS_FILE, contacts);

    console.log('--- NEW CONTACT ---');
    console.log(newContact);
    console.log('-------------------');

    // MOCK EMAIL SENDING
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
        console.log("Email would be sent via Resend API here.");
    }

    res.json({ success: true, message: 'Message received!' });
});

// --- CATCH ALL FOR SPA ---
app.get(/(.*)/, (req, res) => {
    const distPath = path.join(__dirname, '../dist');
    if (fs.existsSync(path.join(distPath, 'index.html'))) {
        res.sendFile(path.join(distPath, 'index.html'));
    } else {
        res.status(404).send('Frontend build not found. Run npm run build.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
