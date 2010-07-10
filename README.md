# jQuery v7r form validation plugin
> Version: 0.1.0

A jQuery plugin for simple form validation.

As `validator` is a rather long name, it was shortened to `v7r`, which
means `v` + 7 characters + `r`, just like I18N for internationalization
and or L10N for localization.

## Sample Usage

    $('form').submit(function(){
        var $form = $(this);
        var errors = $form.hasErrors(
            [
                {name: 'username', rule: 'minLength', params: [5]},
                {name: 'email', rule: 'isEmail'},
                {name: 'age', rule: 'isNumber'},
                {name: 'password', rule: 'equals', params: ['confirmation']}
            ],
            {
                error: function (errors) {
                    $.each(errors, function(){
                        $(elem.name, this).addClass('error');
                    });
                },
                clear: function () {
                    $('.error', this).removeClass('error');
                }
            }
        );
        if (errors) {
            return false;
        }
    });
 
The `hasErrors` jQuery method is installed by the plugin and takes two
parameters: the list of rules to validate the serialized list of values
and a dictionary of options.

## Validation Rules

Each validation rule is a callback that takes at least two parameters:
the value to be tested and the full serialized list of values.

A rule may have extra parameters that will be appended in the function
call.

Available validation rules:

* `required`: must be selected or have a value;
* `minLength`: must have a minimal lenght;
* `isEmail`: must have a valid email;
* `equals`: must be equal to other field;
* `requiredWith`: is required if other field has a value;
* `isNumber`: must be a number;
 
Registering new rules:

     $.v7r.rules.isLower = function (v) {
         return (v == v.toLowerCase());
     };
     $.extend($.v7r.rules, {
         isUpper: function (v) {
             return (v == v.toUpperCase());
         }
     };

## Callbacks

* `error`: called once after all rules were tested;
    * takes the list of failed rules;
    * takes the jQuery context as `this`;
* `clear`: called before rules are tested, to cleanup the form;
    * takes the jQuery context as `this`;

