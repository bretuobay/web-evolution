/**
 * api.js
 *
 * This file handles all communication with the backend API.
 * jQuery's $.ajax() wrapper simplified AJAX greatly, providing a consistent
 * API across different browsers and introducing Deferreds (a precursor to Promises).
 */

(function (window) {
  "use strict";

  var API_BASE_URL = "http://localhost:3001/api"; // API server runs on port 3001

  function showSpinner() {
    $("#loading-spinner").show();
  }

  function hideSpinner() {
    $("#loading-spinner").hide();
  }

  var Api = {
    getProducts: function () {
      return $.ajax({
        url: API_BASE_URL + "/products",
        method: "GET",
        dataType: "json",
        beforeSend: showSpinner,
      }).always(hideSpinner);
    },

    getProduct: function (id) {
      return $.ajax({
        url: API_BASE_URL + "/products/" + id,
        method: "GET",
        dataType: "json",
        beforeSend: showSpinner,
      }).always(hideSpinner);
    },

    createProduct: function (productData) {
      return $.ajax({
        url: API_BASE_URL + "/products",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(productData),
        beforeSend: showSpinner,
      }).always(hideSpinner);
    },

    updateProduct: function (id, productData) {
      return $.ajax({
        url: API_BASE_URL + "/products/" + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(productData),
        beforeSend: showSpinner,
      }).always(hideSpinner);
    },

    deleteProduct: function (id) {
      return $.ajax({
        url: API_BASE_URL + "/products/" + id,
        method: "DELETE",
        beforeSend: showSpinner,
      }).always(hideSpinner);
    },

    getCategories: function () {
      return $.ajax({
        url: API_BASE_URL + "/categories",
        method: "GET",
        dataType: "json",
        beforeSend: showSpinner,
      }).always(hideSpinner);
    },
  };

  window.App = window.App || {};
  window.App.Api = Api;
})(window);
