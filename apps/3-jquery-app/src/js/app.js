/**
 * app.js
 *
 * Main application file. Initializes the router and defines route handlers.
 * In classic jQuery applications, this file often became large and hard to maintain.
 */

$(function() {
    'use strict';

    var $mainContent = $('#main-content');
    var api = window.App.Api;
    var router = window.App.Router;
    var helpers = window.App.Helpers;

    /**
     * Renders the product list view.
     */
    function renderProductList() {
        api.getProducts().done(function(response) {
            // API returns paginated response: { data: [...], total, page, pageSize, totalPages }
            var products = response.data || response;

            var $tableContainer = $('<div id="inventory-table-container"></div>');
            $mainContent.html('<h2>All Products</h2>').append($tableContainer);

            $tableContainer.inventoryTable({
                products: products,
                onDelete: function(id, $row) {
                    $('<div></div>').text('Are you sure you want to delete this product?').dialog({
                        modal: true,
                        title: 'Confirm Deletion',
                        buttons: {
                            'Yes, Delete': function() {
                                var $dialog = $(this);
                                api.deleteProduct(id).done(function() {
                                    $row.fadeOut(function() { $row.remove(); });
                                    $dialog.dialog('close');
                                }).fail(function() {
                                    alert('Error deleting product.');
                                    $dialog.dialog('close');
                                });
                            },
                            Cancel: function() {
                                $(this).dialog('close');
                            }
                        }
                    });
                }
            });
        }).fail(function() {
            $mainContent.html('<p class="error">Error fetching products. Please try again later.</p>');
        });
    }

    /**
     * Renders the product form for adding or editing.
     */
    function renderProductForm(params) {
        var productId = params ? params.id : null;
        var isEditing = !!productId;
        var title = isEditing ? 'Edit Product' : 'Add New Product';

        if (isEditing) {
            api.getProduct(productId).done(function(product) {
                renderForm(product);
            }).fail(function() {
                $mainContent.html('<p class="error">Error fetching product details.</p>');
            });
        } else {
            renderForm({});
        }

        function renderForm(product) {
            var formHtml =
                '<h2>' + helpers.escapeHtml(title) + '</h2>' +
                '<form id="product-form">' +
                '<div class="form-group">' +
                '<label for="name">Product Name</label>' +
                '<input type="text" id="name" name="name" value="' + helpers.escapeHtml(product.name || '') + '" required>' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="description">Description</label>' +
                '<textarea id="description" name="description">' + helpers.escapeHtml(product.description || '') + '</textarea>' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="price">Price</label>' +
                '<input type="number" id="price" name="price" value="' + (product.price || '') + '" required min="0" step="0.01">' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="quantity">Quantity</label>' +
                '<input type="number" id="quantity" name="quantity" value="' + (product.quantity || 0) + '" required min="0">' +
                '</div>' +
                '<button type="submit" class="btn-primary">' + (isEditing ? 'Update' : 'Create') + '</button>' +
                ' <a href="#/products" class="btn-secondary">Cancel</a>' +
                '</form>';

            $mainContent.html(formHtml);

            $('#product-form').formValidator({
                onSubmit: function(formData) {
                    var promise = isEditing
                        ? api.updateProduct(productId, formData)
                        : api.createProduct(formData);

                    promise.done(function() {
                        router.navigate('#/products');
                    }).fail(function() {
                        alert('Error saving product.');
                    });
                }
            });
        }
    }

    // Define routes
    router.addRoute('#/products', renderProductList);
    router.addRoute('#/products/new', renderProductForm);
    router.addRoute('#/products/edit/:id', renderProductForm);

    // Initialize router
    router.init();
});
