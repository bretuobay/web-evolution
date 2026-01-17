/**
 * app.js
 *
 * This is the main application file. It initializes the router, defines the
 * routes, and contains the logic for rendering the different views.
 * In a classic jQuery application, this file can quickly become large and
 * hard to maintain, a problem often referred to as "spaghetti code."
 * We'll try to keep it organized by separating concerns into different functions.
 */

// The $() function is a shorthand for $(document).ready().
// This is a classic jQuery pattern to ensure that the code inside this function
// is executed only after the DOM is fully loaded and ready to be manipulated.
$(function() {
    'use strict';

    var $mainContent = $('#main-content');
    var api = window.App.Api;
    var router = window.App.Router;

    /**
     * Renders the product list view.
     * This function fetches the products from the API and then uses the
     * inventoryTable plugin to render them.
     */
    function renderProductList() {
        api.getProducts().done(function(products) {
            // We'll create a container for our table and append it to the main content.
            var $tableContainer = $('<div id="inventory-table-container"></div>');
            $mainContent.html('<h2>All Products</h2>').append($tableContainer);

            // Here, we initialize our custom jQuery plugin.
            $tableContainer.inventoryTable({
                products: products,
                onDelete: function(id, $row) {
                    // Using jQuery UI for a confirmation dialog.
                    $('<div></div>').text('Are you sure you want to delete this product?').dialog({
                        modal: true,
                        title: 'Confirm Deletion',
                        buttons: {
                            'Yes, Delete': function() {
                                var $dialog = $(this);
                                api.deleteProduct(id).done(function() {
                                    $row.fadeOut(function() {
                                        $row.remove();
                                    });
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
            $mainContent.html('<p>Error fetching products. Please try again later.</p>');
        });
    }

    /**
     * Renders the form for adding or editing a product.
     *
     * @param {object} [product] The product to edit. If not provided, an empty form is rendered.
     */
    function renderProductForm(params) {
        var productId = params ? params.id : null;
        var isEditing = !!productId;
        var title = isEditing ? 'Edit Product' : 'Add New Product';

        if (isEditing) {
            api.getProduct(productId).done(function(product) {
                renderForm(product);
            }).fail(function() {
                $mainContent.html('<p>Error fetching product details.</p>');
            });
        } else {
            renderForm({});
        }

        function renderForm(product) {
            var formHtml = `
                <h2>${title}</h2>
                <form id="product-form">
                    <input type="hidden" id="productId" value="${product.id || ''}">
                    <div>
                        <label for="name">Product Name</label>
                        <input type="text" id="name" name="name" value="${product.name || ''}" required>
                    </div>
                    <div>
                        <label for="type">Type</label>
                        <input type="text" id="type" name="type" value="${product.type || ''}" required>
                    </div>
                    <div>
                        <label for="manufacturer">Manufacturer</label>
                        <input type="text" id="manufacturer" name="manufacturer" value="${product.manufacturer || ''}" required>
                    </div>
                    <div>
                        <label for="price">Price</label>
                        <input type="number" id="price" name="price" value="${product.price || ''}" required min="0">
                    </div>
                    <button type="submit">${isEditing ? 'Update' : 'Create'}</button>
                </form>
            `;
            $mainContent.html(formHtml);

            // Initialize form validation plugin
            $('#product-form').formValidator({
                onSubmit: function(formData) {
                    var promise = isEditing
                        ? api.updateProduct(productId, formData)
                        : api.createProduct(formData);

                    promise.done(function() {
                        window.location.hash = '#/products';
                    }).fail(function() {
                        alert('Error saving product.');
                    });
                }
            });
        }
    }


    // --- Route Definitions ---
    // Here, we define the application's routes. The handler functions
    // are responsible for rendering the appropriate view.

    router.addRoute('#/products', renderProductList);
    router.addRoute('#/products/new', renderProductForm);
    router.addRoute('#/products/edit/:id', renderProductForm);


    // Initialize the router to handle the initial page load and subsequent hash changes.
    router.init();
});