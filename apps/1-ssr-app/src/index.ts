// The classic web server framework for Node.js.
import express from 'express';
// Node.js built-in module for working with file and directory paths.
import path from 'path';
import { fileURLToPath } from 'url';
// Session middleware for Express. Used here for flash messages.
import session from 'express-session';
// Middleware to parse incoming request bodies. Essential for handling form submissions.
import bodyParser from 'body-parser';
// EJS layouts middleware for template inheritance
import expressLayouts from 'express-ejs-layouts';

// Import routes for different parts of the application.
// This is part of the MVC pattern: routes direct requests to controllers.
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';

// Initialize database on startup
import { getDb } from './db.js';
getDb();

// --- Core Application Setup ---

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an instance of the Express application.
const app = express();
const port = Number(process.env.PORT ?? 3001);

// --- View Engine Configuration (The "V" in MVC) ---

// EJS (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript.
app.set('view engine', 'ejs');
// Set the directory where our EJS template files are located.
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts for template inheritance
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// --- Middleware ---

// Serve static files (like CSS, images) from the "public" directory.
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms).
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware setup for flash messages.
app.use(session({
  secret: 'a-secret-key-for-ssr-app',
  resave: false,
  saveUninitialized: true,
}));

// Make flash messages available in all templates.
app.use((req, res, next) => {
  // @ts-ignore
  res.locals.flash = req.session.flash;
  // @ts-ignore
  delete req.session.flash;
  next();
});

// --- Routes (The "C" in MVC, forwarding to Controllers) ---

// Mount routers
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

// Root route redirects to products list
app.get('/', (req, res) => {
  res.redirect('/products');
});

// --- Server Activation ---

app.listen(port, () => {
  console.log(`Server-Side Rendered application listening at http://localhost:${port}`);
});
