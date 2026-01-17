/**
 * inventory-table.js
 *
 * A custom jQuery plugin to display a sortable table of products.
 * The jQuery plugin pattern is a way to extend jQuery's functionality.
 * We add a new function to jQuery's prototype ($.fn) to make it available
 * on any jQuery object.
 */
(function($) {
    'use strict';

    // Attaching our plugin to the jQuery prototype.
    // The name of the function here ('inventoryTable') is the name of our plugin.
    $.fn.inventoryTable = function(options) {
        // 'this' refers to the jQuery object the plugin was called on.
        // It's good practice to use .each() to support multiple elements.
        return this.each(function() {
            var $container = $(this);
            var settings = $.extend({
                products: [],
                onDelete: function() {}
            }, options);

            var currentSort = {
                key: 'name',
                order: 'asc'
            };

            /**
             * Renders the entire table.
             */
            function render() {
                var sortedProducts = App.Helpers.sortData(settings.products, currentSort.key, currentSort.order);

                var tableHtml = `
                    <table>
                        <thead>
                            <tr>
                                <th data-sort-key="name">Name</th>
                                <th data-sort-key="type">Type</th>
                                <th data-sort-key="manufacturer">Manufacturer</th>
                                <th data-sort-key="price">Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sortedProducts.map(function(product) {
                                return `
                                    <tr data-product-id="${product.id}">
                                        <td>${product.name}</td>
                                        <td>${product.type}</td>
                                        <td>${product.manufacturer}</td>
                                        <td>$${product.price.toFixed(2)}</td>
                                        <td>
                                            <a href="#/products/edit/${product.id}">Edit</a>
                                            <button class="delete-btn" data-id="${product.id}">Delete</button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                `;
                $container.html(tableHtml);
                updateSortHeaders();
            }

            /**
             * Handles clicks on the table headers for sorting.
             */
            function handleHeaderClick(e) {
                var newSortKey = $(e.target).data('sort-key');
                if (!newSortKey) return;

                if (newSortKey === currentSort.key) {
                    currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSort.key = newSortKey;
                    currentSort.order = 'asc';
                }
                render();
            }

            function updateSortHeaders() {
                $container.find('th').removeClass('sort-asc sort-desc');
                var $activeHeader = $container.find('th[data-sort-key="' + currentSort.key + '"]');
                if (currentSort.order === 'asc') {
                    $activeHeader.addClass('sort-asc');
                } else {
                    $activeHeader.addClass('sort-desc');
                }
            }


            /**
             * Handles clicks on the delete buttons.
             */
            function handleDeleteClick(e) {
                var $target = $(e.target);
                if ($target.hasClass('delete-btn')) {
                    var productId = $target.data('id');
                    var $row = $target.closest('tr');
                    settings.onDelete(productId, $row);
                }
            }

            // --- Event Listeners ---
            // We use event delegation here by attaching the listener to the container.
            // This is more efficient than attaching a listener to every single header or button,
            // especially in large tables.
            $container.on('click', 'th', handleHeaderClick);
            $container.on('click', '.delete-btn', handleDeleteClick);


            // Initial render of the table.
            render();
        });
    };

})(jQuery);