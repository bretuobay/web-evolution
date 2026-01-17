/**
 * form-validator.js
 *
 * A custom jQuery plugin for basic form validation.
 * This demonstrates how jQuery can be used to encapsulate reusable UI logic.
 */
(function($) {
    'use strict';

    $.fn.formValidator = function(options) {
        return this.each(function() {
            var $form = $(this);
            var settings = $.extend({
                onSubmit: function() {}
            }, options);

            /**
             * The main submit handler for the form.
             */
            $form.on('submit', function(e) {
                e.preventDefault(); // Prevent the default form submission

                if (validate()) {
                    settings.onSubmit(getFormData());
                }
            });

            /**
             * Validates all the required fields in the form.
             * @returns {boolean} True if the form is valid, false otherwise.
             */
            function validate() {
                var isValid = true;
                clearErrors();

                // Find all fields with the 'required' attribute.
                // This is a simple validation logic. A real-world plugin
                // would support various validation rules (email, minlength, etc.).
                $form.find('[required]').each(function() {
                    var $field = $(this);
                    if (!$field.val().trim()) {
                        isValid = false;
                        showError($field, 'This field is required.');
                    }
                });

                return isValid;
            }

            /**
             * Displays an error message for a specific field.
             */
            function showError($field, message) {
                var $errorMessage = $('<div class="error-message"></div>').text(message);
                $field.after($errorMessage);
                $field.addClass('is-invalid'); // For potential styling
            }

            /**
             * Clears all previous error messages.
             */
            function clearErrors() {
                $form.find('.error-message').remove();
                $form.find('.is-invalid').removeClass('is-invalid');
            }

            /**
             * Gathers the form data into a plain object.
             * @returns {object} The form data as a key-value object.
             */
            function getFormData() {
                var formData = {};
                $form.find('input, select, textarea').each(function() {
                    var $field = $(this);
                    var name = $field.attr('name');
                    if (name) {
                        formData[name] = $field.val();
                    }
                });
                return formData;
            }
        });
    };

})(jQuery);