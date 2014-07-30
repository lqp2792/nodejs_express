/**
 * Created by phule on 29/07/2014.
 */
suite('"About" Page tests', function() {
    test('Page should contain link to contact page', function() {
        assert($('a[href="/contact"]').length);
    });
});