/*global QUnit */

QUnit.test("test Config", function(assert) {
    "use strict";

    var Config = App.Config;

    assert.equal(Config.get("inexistent_config"), undefined);
    assert.equal(Config.get("inexistent_config", "xpto"), "xpto");

    Config.set("inexistent_config", "foo");
    assert.equal(Config.get("inexistent_config"), "foo");

    Config.set("xpto", {a: {b: 1}});
    assert.equal(true, typeof Config.get("xpto") === "object");
});
