/**
 * helpers.js
 *
 * Utility functions for the jQuery application.
 * In the mid-2000s, developers often created their own utility libraries
 * before tools like Lodash/Underscore became popular.
 */

(function(window) {
    'use strict';

    var Helpers = {
        /**
         * Formats a number as currency.
         */
        formatCurrency: function(amount) {
            return '$' + parseFloat(amount).toFixed(2);
        },

        /**
         * Sorts an array of objects by a given key.
         */
        sortData: function(data, key, ascending) {
            if (!Array.isArray(data)) return data;
            return data.slice().sort(function(a, b) {
                var valA = a[key];
                var valB = b[key];
                if (typeof valA === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }
                if (valA < valB) return ascending ? -1 : 1;
                if (valA > valB) return ascending ? 1 : -1;
                return 0;
            });
        },

        /**
         * Escapes HTML to prevent XSS attacks.
         */
        escapeHtml: function(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }
    };

    window.App = window.App || {};
    window.App.Helpers = Helpers;

})(window);
