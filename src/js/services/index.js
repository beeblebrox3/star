import App from "app";

// application's services
import Request from "./ajax/Request";
import PersistentCache from "./cache/Persistent";

// example:
// constructor
// App.ServicesContainer.define("Service", require("./Service"))

// instance
// App.ServicesContainer.setInstance("Service", new Service());


// Default services
// interface to handle AJAX requests
App.ServicesContainer.define("AJAX", Request);
App.ServicesContainer.define("Cache", PersistentCache);

// configure AJAX to always ask for json
// You can ask for a new instance do get rid of this behaviour :)
App.ServicesContainer.get("AJAX").onStart(req => req.set("Accept", "application/json"));
