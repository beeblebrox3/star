var App = require("./app");

App.Config = require("./config");

require("./polyfill");

// setup events manager
var EventManager = require("./core/EventManager");
App.EventManager = new EventManager();

var ServicesContainer = require("./core/ServicesContainer");
App.ServicesContainer = new ServicesContainer();
App.ServicesContainer.define("EventManager", EventManager);

// libs
App.libs.React = require("react/addons");
App.libs._ = require("lodash");
App.libs.Director = require("director");
App.libs.Superagent = require("superagent");

require("./helpers/index");
require("./services/index");
require("./components/index");

// require("./triggers");
require("./routes");

module.exports = App;
