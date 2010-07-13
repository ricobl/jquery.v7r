$(document).ready(function(){

    module("v7r.rules.required");
    test("rejects empty string", function() {
        ok(!$.v7r.rules.required(''));
    });
    test("rejects null", function() {
        ok(!$.v7r.rules.required(null));
    });
    test("accepts string", function() {
        ok($.v7r.rules.required('a'));
    });

});
