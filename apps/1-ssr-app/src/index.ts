// The classic web server framework for Node.js.
import express from 'express';
// Node.js built-in module for working with file and directory paths.
import path from 'path';
// Session middleware for Express. Used here for flash messages.
import session from 'express-session';
// Middleware to parse incoming request bodies. Essential for handling form submissions.
import bodyParser from 'body-parser';

// Import routes for different parts of the application.
// This is part of the MVC pattern: routes direct requests to controllers.
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';

// --- Core Application Setup ---

// Create an instance of the Express application.
const app = express();
const port = 3000;

// --- View Engine Configuration (The "V" in MVC) ---

// EJS (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript.
// We're telling Express to use EJS as its view engine.
app.set('view engine', 'ejs');
// We're setting the directory where our EJS template files are located.
// `__dirname` is the directory of the current module, and `path.join` creates a cross-platform compatible path.
app.set('views', path.join(__dirname, 'views'));

// --- Middleware ---
// Middleware functions are functions that have access to the request object (req), the response object (res),
// and the next middleware function in the application’s request-response cycle.

// Serve static files (like CSS, images) from the "public" directory.
// This is how the browser can access our 90s.css stylesheet.
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms).
// The `extended: true` option allows for rich objects and arrays to be encoded into the URL-encoded format.
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware setup. This is what allows us to "remember" things between requests,
// like a user being logged in, or in our case, flash messages.
app.use(session({
  secret: 'a-secret-key-for-ssr-app', // This should be a long, random string in a real app
  resave: false,
  saveUninitialized: true,
}));

// A custom middleware to make flash messages available in all our EJS templates.
// We attach the 'flash' object from the session to `res.locals`, which is an object
// that contains response local variables scoped to the request, and therefore available only
// to the view(s) rendered during that request/response cycle.
app.use((req, res, next) => {
  // @ts-ignore
  res.locals.flash = req.session.flash;
  // @ts-ignore
  delete req.session.flash;
  next();
});


// --- Routes (The "C" in MVC, forwarding to Controllers) ---

// Here we would mount our routers.
// For example:
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

// A simple root route to show that the server is running.
app.get('/', (req, res) => {
  // `res.render()` is how Express and EJS work together.
  // It will look for a file named `index.ejs` in our `views` directory,
  // process it with the EJS engine, and send the resulting HTML to the browser.
  res.send("SSR App is running!");
});


// --- Server Activation ---

// Start the server and listen for incoming connections on the specified port.
app.listen(port, () => {
  console.log(`Server-Side Rendered application listening at http://localhost:${port}`);
});
