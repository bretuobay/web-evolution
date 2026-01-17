/**
 * main.js
 *
 * Entry point for the jQuery application using ES modules.
 * This bridges modern module loading with legacy jQuery patterns.
 *
 * We use dynamic imports throughout to control load order, since
 * jQuery UI expects jQuery to be a global before it initializes.
 */

// Import styles (these are safe as static imports)
import '@design-system/00s.css';
import 'jquery-ui-dist/jquery-ui.min.css';

// Step 1: Load jQuery and expose globally
const { default: jQuery } = await import('jquery');
window.$ = window.jQuery = jQuery;

// Step 2: Load jQuery UI (now jQuery global exists)
await import('jquery-ui-dist/jquery-ui.min.js');

// Step 3: Load app modules in order
await import('./utils/helpers.js');
await import('./plugins/form-validator.js');
await import('./plugins/inventory-table.js');
await import('./api.js');
await import('./router.js');
await import('./app.js');
