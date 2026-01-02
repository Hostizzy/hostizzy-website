require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function migrate() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db('hostizzy_db');
    const dataDir = path.join(__dirname, '..', 'server', 'data');

    const collections = ['properties', 'experiences', 'testimonials', 'blogs'];
    let total = 0;

    for (const collName of collections) {
      const filePath = path.join(dataDir, `${collName}.json`);
      if (!fs.existsSync(filePath)) {
        console.log(`⏭️  Skipping ${collName} (file not found)`);
        continue;
      }

      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      if (!Array.isArray(data) || data.length === 0) {
        console.log(`⏭️  Skipping ${collName} (empty)`);
        continue;
      }

      // Clear existing data
      await db.collection(collName).deleteMany({});

      // Insert new data
      await db.collection(collName).insertMany(data);
      total += data.length;
      console.log(`✅ Migrated ${data.length} documents to ${collName}`);
    }

    console.log(`\n✨ Migration complete! Total documents: ${total}`);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrate();
