/*global QUnit */

QUnit.test("test getFlattened", function (assert) {
    "use strict";

    var getFlattened = App.helpers.object.getFlattened,
        obj = {
            keya: {
                keyb: {
                    keyc: {
                        keyd: 2
                    }
                },
                keye: 3
            }
        };

    assert.equal(true, getFlattened('keya.keyb.keyc.keyd', obj) === 2);
    assert.equal(true, getFlattened('keya.keyb', obj) === obj.keya.keyb);
    assert.equal(true, getFlattened('keya.notkey', obj) === null);
    assert.equal(true, getFlattened('App.helpers.object.getFlattened') === getFlattened);
});

QUnit.test("test firstKey", function (assert) {
    "use strict";

    var obj = {
        a: 1,
        b: 2,
        c: 3
    };

    assert.equal(App.helpers.object.firstKey(obj), 'a');
});
