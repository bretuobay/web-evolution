// Database initialization for the SSR app
// This creates a singleton database connection that persists across requests
import { initializeDatabase, DatabaseClient } from '@wees/database';

let db: DatabaseClient | null = null;

export function getDb(): DatabaseClient {
  if (!db) {
    // Use in-memory database for development
    // In production, you'd use a file path like './data/inventory.db'
    db = initializeDatabase(':memory:');
    console.log('Database initialized with seed data');
  }
  return db;
}
