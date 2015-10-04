var App = require("./app");

App.Config = require("./config");

// setup events manager
var EventManager = require("./core/EventManager");
App.EventManager = new EventManager();

var ServicesContainer = require("./core/ServicesContainer");
App.ServicesContainer = new ServicesContainer();

// libs
App.libs.React = require("react/addons");
App.libs._ = require("lodash");

require("./helpers/index");
require("./services/index");
require("./components/index");

require("./triggers");

module.exports = App;
