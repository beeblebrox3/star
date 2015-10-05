var App = require("app");
var RestInterface = require("./RestInterface");

function User() {
    "use strict";
}

User.prototype = new RestInterface(
    "User",
    App.Config.get("basepath") + "apiusers"
);

User.prototype.constructor = User;

module.exports = User;
