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

// Content Data Paths
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const EXPERIENCES_FILE = path.join(DATA_DIR, 'experiences.json');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');

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
app.post('/api/import-meta', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: 'URL required' });

        const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
        const html = await response.text();

        // Simple Regex Extraction for OG tags
        const getMeta = (prop) => {
            const match = html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`));
            return match ? match[1] : '';
        };

        const title = getMeta('og:title') || getMeta('twitter:title');
        const description = getMeta('og:description') || getMeta('twitter:description');
        const image = getMeta('og:image') || getMeta('twitter:image');

        res.json({ title, description, image });
    } catch (e) {
        console.error("Import Error:", e);
        res.status(500).json({ error: 'Failed to fetch metadata' });
    }
});

// Contact Form
app.post('/api/contact', (req, res) => {
    console.log('Contact Form:', req.body);
    res.json({ success: true, message: 'Message received!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} (Restarted at ${new Date().toLocaleTimeString()})`);
});
