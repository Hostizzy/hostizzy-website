import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// MongoDB connection state
let isMongoConnected = false;

// MongoDB URI from environment
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB if URI is provided
if (MONGODB_URI && !isMongoConnected) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log("✅ MongoDB Connected");
      isMongoConnected = true;
    })
    .catch(err => console.error("❌ MongoDB Connection Error:", err));
}

// Mongoose Schemas
const propertySchema = new mongoose.Schema({
  id: String,
  title: String,
}, { strict: false });

const calculatorLeadSchema = new mongoose.Schema({
  email: String,
  city: String,
  propertyType: String,
  bedrooms: Number,
  finishes: String,
  revenue: Number,
  netIncome: Number,
  createdAt: { type: Date, default: Date.now }
});

// Models
export const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
export const CalculatorLead = mongoose.models.CalculatorLead || mongoose.model('CalculatorLead', calculatorLeadSchema);

// Export connection state
export const getMongoConnectionState = () => isMongoConnected;

// Data directory paths
const DATA_DIR = path.join(process.cwd(), 'server', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File paths
export const DATA_FILES = {
  PROPERTIES: path.join(DATA_DIR, 'properties.json'),
  EXPERIENCES: path.join(DATA_DIR, 'experiences.json'),
  BLOGS: path.join(DATA_DIR, 'blogs.json'),
  TESTIMONIALS: path.join(DATA_DIR, 'testimonials.json'),
  CONTACTS: path.join(DATA_DIR, 'contacts.json'),
  SEO: path.join(DATA_DIR, 'seo.json'),
  SETTINGS: path.join(DATA_DIR, 'settings.json'),
  CALCULATOR_LEADS: path.join(DATA_DIR, 'calculator-leads.json'),
  SOCIAL: path.join(DATA_DIR, 'social.json'),
  BOOKINGS: path.join(DATA_DIR, 'bookings.json'),
};

// Helper functions for JSON file operations
export const readJson = (file) => {
  if (!fs.existsSync(file)) return [];
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading JSON:", e);
    return [];
  }
};

export const writeJson = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error("Error writing JSON:", e);
    return false;
  }
};

// Async versions for better Next.js compatibility
export const readJsonAsync = async (file) => {
  if (!fs.existsSync(file)) return [];
  try {
    const data = await fs.promises.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading JSON:", e);
    return [];
  }
};

export const writeJsonAsync = async (file, data) => {
  try {
    await fs.promises.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error("Error writing JSON:", e);
    return false;
  }
};
