var App = require("app");

// example:
// constructor
// App.ServicesContainer.define("Service", require("./Service"))

// instance
// App.ServicesContainer.setInstance("Service", new Service());


// Default services
// interface to handle AJAX requests
App.ServicesContainer.define("AJAX", require("./ajax/Request"));
// configure AJAX to always ask for json
// You can ask for a new instance do get rid of this behaviour :)
App.ServicesContainer.get("AJAX").onStart(function (req) {
    "use strict";

    req.set("Accept", "application/ajax");
});

// Example
App.ServicesContainer.define("User", require("./User"));
