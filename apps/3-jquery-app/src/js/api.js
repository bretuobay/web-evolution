/**
 * api.js
 *
 * This file handles all communication with the backend API.
 * In the mid-2000s, this was typically done using XMLHttpRequest (XHR) directly,
 * but jQuery's $.ajax() wrapper simplified this greatly, providing a consistent
 * API across different browsers and introducing Deferreds (a precursor to Promises)
 * for handling asynchronous operations.
 */

(function(window) {
    'use strict';

    // In a real-world scenario, this would be configured based on the environment.
    var API_BASE_URL = 'http://localhost:3001/api/products';

    /**
     * A helper function to show the loading spinner.
     * Direct DOM manipulation like this was the standard jQuery practice.
     */
    function showSpinner() {
        $('#loading-spinner').show();
    }

    /**
     * A helper function to hide the loading spinner.
     */
    function hideSpinner() {
        $('#loading-spinner').hide();
    }

    /**
     * The core API client object.
     */
    var Api = {
        /**
         * Fetches a list of all products.
         *
         * @returns {jqXHR} A jQuery AJAX object, which is a Promise-like object.
         */
        getProducts: function() {
            // .ajax() is the core of jQuery's AJAX functionality.
            // It returns a jqXHR object, which implements the Promise interface,
            // allowing us to use .done(), .fail(), and .always().
            return $.ajax({
                url: API_BASE_URL,
                method: 'GET',
                dataType: 'json', // Automatically parses the JSON response
                beforeSend: showSpinner // A callback fired before the request is sent
            }).always(hideSpinner); // .always() is executed whether the request succeeds or fails.
        },

        /**
         * Fetches a single product by its ID.
         *
         * @param {string} id The ID of the product.
         * @returns {jqXHR} A jQuery AJAX object.
         */
        getProduct: function(id) {
            return $.ajax({
                url: API_BASE_URL + '/' + id,
                method: 'GET',
                dataType: 'json',
                beforeSend: showSpinner
            }).always(hideSpinner);
        },

        /**
         * Creates a new product.
         *
         * @param {object} productData The data for the new product.
         * @returns {jqXHR} A jQuery AJAX object.
         */
        createProduct: function(productData) {
            return $.ajax({
                url: API_BASE_URL,
                method: 'POST',
                contentType: 'application/json', // Set the content type of the request body
                data: JSON.stringify(productData), // Convert the JS object to a JSON string
                beforeSend: showSpinner
            }).always(hideSpinner);
        },

        /**
         * Updates an existing product.
         *
         * @param {string} id The ID of the product to update.
         * @param {object} productData The updated data.
         * @returns {jqXHR} A jQuery AJAX object.
         */
        updateProduct: function(id, productData) {
            return $.ajax({
                url: API_BASE_URL + '/' + id,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(productData),
                beforeSend: showSpinner
            }).always(hideSpinner);
        },

        /**
         * Deletes a product.
         *
         * @param {string} id The ID of the product to delete.
         * @returns {jqXHR} A jQuery AJAX object.
         */
        deleteProduct: function(id) {
            return $.ajax({
                url: API_BASE_URL + '/' + id,
                method: 'DELETE',
                beforeSend: showSpinner
            }).always(hideSpinner);
        }
    };

    // Expose the Api object to the global window object.
    // In a more modern setup, we would use ES modules (import/export).
    window.App = window.App || {};
    window.App.Api = Api;

})(window);