import fs from 'fs';
import path from 'path';

// Data directory paths
const DATA_DIR = path.join(process.cwd(), 'server', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File paths
export const DATA_FILES = {
  BLOGS: path.join(DATA_DIR, 'blogs.json'),
  TESTIMONIALS: path.join(DATA_DIR, 'testimonials.json'),
  CONTACTS: path.join(DATA_DIR, 'contacts.json'),
  SEO: path.join(DATA_DIR, 'seo.json'),
  SETTINGS: path.join(DATA_DIR, 'settings.json'),
  CALCULATOR_LEADS: path.join(DATA_DIR, 'calculator-leads.json'),
  SOCIAL: path.join(DATA_DIR, 'social.json'),
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
