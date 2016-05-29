var App = require("./app");

App.libs.React = require("react");
App.libs.ReactDOM = require("react-dom");
App.libs._ = require("lodash");
App.libs.Superagent = require("superagent");
App.libs.Page = require("page");

App.Config = require("./config");

var ServicesContainer = require("./core/ServicesContainer");
App.ServicesContainer = new ServicesContainer();
App.ServicesContainer.define("EventManager", require("./core/EventManager"));
App.EventManager = App.ServicesContainer.get("EventManager");

require("./helpers/index");
require("./services/index");
require("./components/index");
require("./routes/index");

module.exports = App;
