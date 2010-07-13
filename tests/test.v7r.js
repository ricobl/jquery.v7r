$(document).ready(function(){

    test('v7r.rules.required', 3, function() {
        ok($.v7r.rules.required('a'), 'accepts simple string');
        ok(!$.v7r.rules.required(''), 'rejects empty');
        ok(!$.v7r.rules.required(null), 'rejects null');
    });

    test('v7r.rules.isEmail', 9, function() {
        ok($.v7r.rules.isEmail('a@b.co'), 'accepts minimal e-mail');
        ok($.v7r.rules.isEmail('rico.bl@gmail.com'), 'accepts full e-mail');
        ok(!$.v7r.rules.isEmail('a'), 'rejects non-email');
        ok(!$.v7r.rules.isEmail('@'), 'rejects @');
        ok(!$.v7r.rules.isEmail('a@'), 'rejects no domain');
        ok(!$.v7r.rules.isEmail('a@b'), 'rejects bad domain');
        ok(!$.v7r.rules.isEmail('@b.com'), 'rejects no user');
        // Optional rule
        ok($.v7r.rules.isEmail(''), 'accepts empty');
        ok($.v7r.rules.isEmail(null), 'accepts null');
    });

    test('v7r.rules.equals', 4, function() {
        ok($.v7r.rules.equals('value', {other_field: 'value'}, 'other_field'), 'passes on equal value for other field');
        ok(!$.v7r.rules.equals('value', {other_field: 'different value'}, 'other_field'), 'fails on different value for other field');
        // Optional rule
        ok($.v7r.rules.equals(''), 'accepts empty');
        ok($.v7r.rules.equals(null), 'accepts null');
    });
});
