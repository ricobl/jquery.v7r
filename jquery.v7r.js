/*
* jQuery v7r plugin
* Version: 0.1.0
* http://ricobl.wordpress.com/
*
* Copyright (c) 2010 Enrico Batista da Luz
* Dual licensed under the MIT and GPL 3+ licenses.
*
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/copyleft/gpl.html
*
* A jQuery plugin for simple form validation.
*/

(function($){
	
	$.v7r = {
		
		rules: {
			required: function (v) {
				return (v != '') && (v != null);
			},
			isEmail: function (v) {
				if (v == '') return true;
				return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(v);
			},
			equals: function (v, valueList, other) {
				if (v == '') return true;
				return (v == valueList[other]);
			},
			requiredWith: function (v, valueList, other) {
				if (!$.v7r.rules.required(valueList[other])) return true;
				return $.v7r.rules.required(v);
			},
			isNumber: function(v){
				if (v == '') return true;
				return !isNaN(v);
			},
			minLength: function(v, valueList, len){
				if (v == '') return true;
				return (v.length >= len);
			}
		},
		
		// Customizable options
		options: {
			// Error cleaning callback
			clear: null,
			// Error reporting callback
			error: function (errors) {
				var errorNames = $.map(errors, function(elem){
					return elem.name;
				});
				alert('Invalid fields: ' + errorNames.join(', '));
			}
		},
		
		// Rule testing
		test: function (rule, value, valueList, ruleParams) {
			
			// The rule isn't a function?
			if (!$.isFunction(rule)) {
				// Look for an internal validation rule, using the rule parameter as key name
				rule = $.v7r.rules[rule];
				// No rule found? Invalidate!
				if (!rule) return false;
			}
			
			// Initialize the test parameters with the field value and the values list
			params = [value, valueList];
			
			// Add rule parameters
			$.merge(params, (ruleParams ? ruleParams : []));
			
			// Test the value against the rule
			return rule.apply(null, params);
			
		},
		
		// Custom serialization
		serialize: function (context) {
			
			var valueList = {};
			
			// Convert the serialized object to a dictionary (key/value pairs)
			// TODO: Deal with repeated values that may have only a single available option
            //       but should be treated as a list of values (multi-selects or checkboxes)
			$.each($(context).serializeArray(), function(){
				
				// Look for fields with the same name
				var fields = $(':input[name=' + this.name + ']');
				
				// If is a select-multiple field, or a group of checkboxes
				if (fields.is('[multiple]') || (fields.length > 1) && fields.is(':checkbox')) {
					// Append the value to the array if no value found
					// or create a new array with the first value
					if (valueList[this.name]) {
						valueList[this.name].push(this.value);
					}
					else {
						valueList[this.name] = [this.value];
					}
				}
				// Simple field? Just assign the value
				else {
					valueList[this.name] = this.value;
				}
				
			});
			
			return valueList;
			
		},
		
		hasErrors: function (context, validations, options) {
			
			// Extend the default options
			var options = $.extend({}, $.v7r.options, options);
			
			// Run the cleaning callback for the context
			if ($.isFunction(options.clear)) {
				options.clear.call(context);
			}
			
			// Error and value lists
			var errors = [];
			var values = $.v7r.serialize(context);
			
			// Test each validation rule
			$.each(validations, function () {
				if (!$.v7r.test(this.rule, values[this.name], values, this.params)) {
					// Add the rule to the error list if failed the test
					errors.push(this);
				}
			});
			
			// If errors found
			if (errors.length > 0) {
				// Run the error callback (if it is a valid function)
				if ($.isFunction(options.error)) {
					options.error.call(context, errors);
				}
				
				// Return the list of failed validations
				return errors;
			}
			else {
				// No errors
				return false;
			}
			
		}
	};
	
	$.fn.hasErrors = function (validations, options) {
		return $.v7r.hasErrors(this, validations, options);
	};
	
})(jQuery);
