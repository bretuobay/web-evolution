/**
 * helpers.js
 *
 * A collection of utility functions that can be used across the application.
 * In a larger application, this would be broken down into more specific files.
 */
(function(window) {
    'use strict';

    var Helpers = {
        /**
         * Sorts an array of objects by a specified key.
         *
         * @param {Array} data The array of objects to sort.
         * @param {string} key The key to sort by.
         * @param {string} order The sort order ('asc' or 'desc').
         * @returns {Array} The sorted array.
         */
        sortData: function(data, key, order) {
            return data.sort(function(a, b) {
                var valA = a[key];
                var valB = b[key];

                // Basic type checking for sorting
                if (typeof valA === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (valA < valB) {
                    return order === 'asc' ? -1 : 1;
                }
                if (valA > valB) {
                    return order === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
    };

    window.App = window.App || {};
    window.App.Helpers = Helpers;

})(window);