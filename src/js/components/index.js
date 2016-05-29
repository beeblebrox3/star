var App = require("app");

require("./mixins/index");
require("./base/index");
require("./pages/index");

App.components.Application = require("./Application");
App.components.NotFound = require("./NotFound");
