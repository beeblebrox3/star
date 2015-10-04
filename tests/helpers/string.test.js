/*global QUnit */

QUnit.test("test resolveUrl", function (assert) {
    "use strict";

    App.Config.set('basepath', 'http://google.com/');

    var resolveUrl = App.helpers.string.resolveUrl;
    assert.equal(resolveUrl('http://google.com/'), 'http://google.com/');
    assert.equal(resolveUrl('trends'), 'http://google.com/trends');
    assert.equal(resolveUrl('//drive.google.com'), '//drive.google.com');
});
