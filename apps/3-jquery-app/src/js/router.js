/**
 * router.js
 *
 * A simple hash-based router for single-page applications.
 * Before HTML5 History API, hash-based routing was the standard approach
 * for SPAs to handle navigation without full page reloads.
 */

(function(window) {
    'use strict';

    var routes = {};
    var currentHandler = null;

    var Router = {
        addRoute: function(pattern, handler) {
            routes[pattern] = {
                pattern: pattern,
                handler: handler,
                regex: patternToRegex(pattern)
            };
        },

        init: function() {
            $(window).on('hashchange', handleRouteChange);
            handleRouteChange();
        },

        navigate: function(hash) {
            window.location.hash = hash;
        }
    };

    function patternToRegex(pattern) {
        // Convert route patterns like '#/products/:id' to regex
        var regexStr = pattern
            .replace(/:[^\s/]+/g, '([^/]+)')
            .replace(/\//g, '\\/');
        return new RegExp('^' + regexStr + '$');
    }

    function extractParams(pattern, hash) {
        var paramNames = (pattern.match(/:[^\s/]+/g) || []).map(function(p) {
            return p.substring(1);
        });
        var route = routes[pattern];
        var match = hash.match(route.regex);
        if (!match) return {};

        var params = {};
        paramNames.forEach(function(name, index) {
            params[name] = match[index + 1];
        });
        return params;
    }

    function handleRouteChange() {
        var hash = window.location.hash || '#/products';

        for (var pattern in routes) {
            var route = routes[pattern];
            if (route.regex.test(hash)) {
                var params = extractParams(pattern, hash);
                route.handler(params);
                return;
            }
        }

        // Default to products list if no route matches
        if (routes['#/products']) {
            Router.navigate('#/products');
        }
    }

    window.App = window.App || {};
    window.App.Router = Router;

})(window);
