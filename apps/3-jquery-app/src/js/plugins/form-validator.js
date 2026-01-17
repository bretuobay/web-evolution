/**
 * form-validator.js
 *
 * A custom jQuery plugin for form validation.
 * jQuery plugins were the standard way to extend functionality in the mid-2000s.
 */

(function($) {
    'use strict';

    $.fn.formValidator = function(options) {
        var settings = $.extend({
            onSubmit: function() {}
        }, options);

        return this.each(function() {
            var $form = $(this);

            $form.on('submit', function(e) {
                e.preventDefault();

                var isValid = true;
                var formData = {};

                // Clear previous errors
                $form.find('.error-message').remove();
                $form.find('.error').removeClass('error');

                // Validate required fields
                $form.find('[required]').each(function() {
                    var $field = $(this);
                    var value = $.trim($field.val());
                    var name = $field.attr('name') || $field.attr('id');

                    if (!value) {
                        isValid = false;
                        $field.addClass('error');
                        $field.after('<span class="error-message">This field is required</span>');
                    } else {
                        formData[name] = value;
                    }
                });

                // Validate number fields
                $form.find('[type="number"]').each(function() {
                    var $field = $(this);
                    var value = $field.val();
                    var name = $field.attr('name') || $field.attr('id');

                    if (value && isNaN(parseFloat(value))) {
                        isValid = false;
                        $field.addClass('error');
                        $field.after('<span class="error-message">Must be a valid number</span>');
                    } else if (value) {
                        formData[name] = parseFloat(value);
                    }
                });

                if (isValid) {
                    settings.onSubmit(formData);
                }
            });
        });
    };

})(jQuery);
