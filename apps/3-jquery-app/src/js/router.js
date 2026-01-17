/**
 * router.js
 *
 * A simple hash-based router for the application.
 * Before the History API was widely available, hash-based routing was the
 * standard for single-page applications. The part of the URL after the '#'
 * could be changed without causing a full page reload.
 */
(function(window) {
    'use strict';

    var Router = {
        // The routes object maps a URL hash to a handler function.
        routes: {},

        /**
         * The main entry point for the router.
         * It listens for hash changes and calls the appropriate handler.
         */
        init: function() {
            // The 'hashchange' event is fired when the URL hash changes.
            // We bind our route handler to this event.
            $(window).on('hashchange', this.handleRouteChange.bind(this));

            // We also need to handle the initial page load.
            this.handleRouteChange();
        },

        /**
         * Adds a new route to the router.
         *
         * @param {string} path The URL hash (e.g., '#/products').
         * @param {function} handler The function to call when the route is matched.
         */
        addRoute: function(path, handler) {
            this.routes[path] = handler;
        },

        /**
         * This function is called when the URL hash changes.
         * It parses the hash and calls the corresponding handler.
         */
        handleRouteChange: function() {
            var hash = window.location.hash || '#/products';
            var route = this.findMatchingRoute(hash);

            if (route) {
                // We found a matching route, so call its handler.
                // The handler will be responsible for rendering the correct view.
                route.handler(route.params);
            } else {
                // No matching route found, so render a "not found" page.
                this.handleNotFound();
            }
        },

        /**
         * Finds a matching route for the given hash, supporting dynamic segments.
         *
         * @param {string} hash The current URL hash.
         * @returns {object|null} The matched route object or null if no match.
         */
        findMatchingRoute: function(hash) {
            for (var path in this.routes) {
                var paramNames = [];
                // Convert the route path to a regex to support dynamic segments (e.g., '#/products/:id').
                var regexPath = path.replace(/:(\w+)/g, function(_, paramName) {
                    paramNames.push(paramName);
                    return '([\\w-]+)';
                });

                var regex = new RegExp('^' + regexPath + '$');
                var match = hash.match(regex);

                if (match) {
                    var params = {};
                    paramNames.forEach(function(name, index) {
                        params[name] = match[index + 1];
                    });
                    return { handler: this.routes[path], params: params };
                }
            }
            return null;
        },


        /**
         * A simple "not found" handler.
         */
        handleNotFound: function() {
            $('#main-content').html('<h2>404 - Page Not Found</h2>');
        }
    };

    // Expose the Router to the global window object.
    window.App = window.App || {};
    window.App.Router = Router;

})(window);