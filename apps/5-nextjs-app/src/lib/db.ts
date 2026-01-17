// src/lib/db.ts
import { initializeDatabase } from '@wees/database/client';

/**
 * Initializes and exports a singleton database client.
 *
 * In a real-world scenario, you'd want to manage the database connection
 * more carefully, especially in a serverless environment. For this demo,
 * we'll initialize it once.
 */
export const db = initializeDatabase();
