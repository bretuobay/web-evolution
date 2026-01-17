// This file serves as the single point of entry for all our data models.
// In this project, we're following a pattern where the database logic is encapsulated
// in a separate, shared package: `@wees/database`.

// The Model layer in MVC is responsible for all data-related logic.
// By re-exporting from the database package, we're making the database client
// and any associated types or functions available to our controllers under a
// consistent `models` import. This keeps our code organized and decoupled.
// For example, a controller can now `import { db } from '../models'` to access
// the database connection, without needing to know the details of the `@wees/database` package.

export * from '@wees/database';
