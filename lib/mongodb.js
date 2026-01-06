import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function to get database
export async function getDB() {
  const client = await clientPromise;
  return client.db('hostizzy_db');
}

// Helper functions for common operations
export async function getCollection(collectionName) {
  const db = await getDB();
  return db.collection(collectionName);
}

// Get all documents from a collection
export async function findAll(collectionName, filter = {}) {
  const collection = await getCollection(collectionName);
  return collection.find(filter).toArray();
}

// Get one document by ID
export async function findById(collectionName, id) {
  const collection = await getCollection(collectionName);
  return collection.findOne({ id: parseInt(id) });
}

// Get one document by ID or slug (for SEO-friendly URLs)
export async function findByIdOrSlug(collectionName, idOrSlug) {
  const collection = await getCollection(collectionName);

  // Try to parse as numeric ID first
  const numericId = parseInt(idOrSlug);
  if (!isNaN(numericId)) {
    const byId = await collection.findOne({ id: numericId });
    if (byId) return byId;
  }

  // Otherwise, try to find by slug
  return collection.findOne({ slug: idOrSlug });
}

// Insert one document
export async function insertOne(collectionName, document) {
  const collection = await getCollection(collectionName);
  const result = await collection.insertOne(document);
  return { ...document, _id: result.insertedId };
}

// Update one document by ID
export async function updateById(collectionName, id, updates) {
  const collection = await getCollection(collectionName);
  const result = await collection.updateOne(
    { id: parseInt(id) },
    { $set: updates }
  );
  return result;
}

// Delete one document by ID
export async function deleteById(collectionName, id) {
  const collection = await getCollection(collectionName);
  const result = await collection.deleteOne({ id: parseInt(id) });
  return result;
}

// Get next ID for a collection (for auto-incrementing)
export async function getNextId(collectionName) {
  const collection = await getCollection(collectionName);
  const docs = await collection.find().sort({ id: -1 }).limit(1).toArray();
  return docs.length > 0 ? docs[0].id + 1 : 1;
}
