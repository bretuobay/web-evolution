/**
 * inventory-table.js
 *
 * A custom jQuery plugin for rendering and managing the inventory table.
 * This demonstrates the plugin pattern that was central to jQuery development.
 */

(function($) {
    'use strict';

    $.fn.inventoryTable = function(options) {
        var settings = $.extend({
            products: [],
            onDelete: function() {}
        }, options);

        var helpers = window.App.Helpers;

        return this.each(function() {
            var $container = $(this);
            var products = settings.products;
            var sortKey = 'name';
            var sortAsc = true;

            function render() {
                var sorted = helpers.sortData(products, sortKey, sortAsc);
                var html = '<table class="inventory-table">';
                html += '<thead><tr>';
                html += '<th data-sort="name">Name ' + getSortIndicator('name') + '</th>';
                html += '<th data-sort="price">Price ' + getSortIndicator('price') + '</th>';
                html += '<th data-sort="quantity">Qty ' + getSortIndicator('quantity') + '</th>';
                html += '<th>Actions</th>';
                html += '</tr></thead><tbody>';

                sorted.forEach(function(product) {
                    html += '<tr data-id="' + product.id + '">';
                    html += '<td>' + helpers.escapeHtml(product.name) + '</td>';
                    html += '<td>' + helpers.formatCurrency(product.price) + '</td>';
                    html += '<td>' + product.quantity + '</td>';
                    html += '<td>';
                    html += '<a href="#/products/edit/' + product.id + '" class="btn-edit">Edit</a> ';
                    html += '<button class="btn-delete" data-id="' + product.id + '">Delete</button>';
                    html += '</td>';
                    html += '</tr>';
                });

                html += '</tbody></table>';
                $container.html(html);

                // Bind events
                $container.find('th[data-sort]').on('click', function() {
                    var key = $(this).data('sort');
                    if (sortKey === key) {
                        sortAsc = !sortAsc;
                    } else {
                        sortKey = key;
                        sortAsc = true;
                    }
                    render();
                });

                $container.find('.btn-delete').on('click', function() {
                    var id = $(this).data('id');
                    var $row = $(this).closest('tr');
                    settings.onDelete(id, $row);
                });
            }

            function getSortIndicator(key) {
                if (sortKey !== key) return '';
                return sortAsc ? '&#9650;' : '&#9660;';
            }

            render();
        });
    };

})(jQuery);
