/**
 * Migration Script: db.json → MongoDB
 *
 * This script migrates all data from db.json to MongoDB Atlas
 *
 * Usage:
 * 1. Ensure MONGODB_URI is set in .env.local
 * 2. Run: node scripts/migrate-to-mongodb.js
 */

import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'hostizzy';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  console.error('Please add your MongoDB connection string to .env.local');
  process.exit(1);
}

async function migrateData() {
  let client;

  try {
    console.log('🚀 Starting migration to MongoDB...\n');

    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas\n');

    const db = client.db(DB_NAME);

    // Read db.json
    const dbPath = path.join(__dirname, '..', 'db.json');
    if (!fs.existsSync(dbPath)) {
      console.error(`❌ db.json not found at ${dbPath}`);
      process.exit(1);
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    console.log('📖 Read db.json successfully\n');

    // Collections to migrate
    const collections = [
      'properties',
      'experiences',
      'testimonials',
      'blogs',
      'contacts',
      'bookings',
      'settings',
      'instagram',
      'calculator_leads'
    ];

    let totalMigrated = 0;

    for (const collectionName of collections) {
      if (dbData[collectionName] && Array.isArray(dbData[collectionName])) {
        const data = dbData[collectionName];

        if (data.length === 0) {
          console.log(`⏭️  Skipping ${collectionName} (empty)`);
          continue;
        }

        const collection = db.collection(collectionName);

        // Check if collection already has data
        const existingCount = await collection.countDocuments();
        if (existingCount > 0) {
          console.log(`⚠️  ${collectionName} already has ${existingCount} documents`);
          const readline = await import('readline');
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });

          const answer = await new Promise(resolve => {
            rl.question(`   Overwrite existing data? (yes/no): `, resolve);
          });
          rl.close();

          if (answer.toLowerCase() !== 'yes') {
            console.log(`   Skipping ${collectionName}\n`);
            continue;
          }

          // Clear existing data
          await collection.deleteMany({});
          console.log(`   Cleared existing ${collectionName} data`);
        }

        // Add timestamps to documents
        const documentsWithTimestamps = data.map(doc => ({
          ...doc,
          createdAt: doc.createdAt || new Date().toISOString(),
          updatedAt: doc.updatedAt || new Date().toISOString()
        }));

        // Insert documents
        const result = await collection.insertMany(documentsWithTimestamps);
        totalMigrated += result.insertedCount;

        console.log(`✅ Migrated ${result.insertedCount} documents to ${collectionName}`);

        // Create indexes
        if (collectionName === 'properties' || collectionName === 'experiences') {
          await collection.createIndex({ id: 1 }, { unique: true });
          await collection.createIndex({ location: 1 });
          await collection.createIndex({ type: 1 });
          console.log(`   Created indexes for ${collectionName}`);
        }
      }
    }

    console.log(`\n✨ Migration complete!`);
    console.log(`📊 Total documents migrated: ${totalMigrated}`);
    console.log(`\n💡 Next steps:`);
    console.log(`1. Test the application to ensure everything works`);
    console.log(`2. Keep db.json as backup`);
    console.log(`3. Update your deployment with MongoDB credentials\n`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('👋 Disconnected from MongoDB');
    }
  }
}

// Run migration
migrateData();
