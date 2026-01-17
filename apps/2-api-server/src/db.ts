import { initializeDatabase } from "@wees/database";

const dbPath = process.env.API_DB_PATH ?? ":memory:";
export const database = initializeDatabase(dbPath);
