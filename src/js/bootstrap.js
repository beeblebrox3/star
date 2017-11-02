// 3rd party
import React from "react";
import ReactDOM from "react-dom";

import Superagent from "superagent";
import Page from "page";
import qs from "qs";
import md5 from "md5";
import shelpers from "super-helpers";

// core
import ServicesContainer from "./core/ServicesContainer";
import EventManager from "./core/EventManager";

import App from "app";
import Config from "./config";

// Register
App.libs.React = React;
App.libs.ReactDOM = ReactDOM;
App.libs.Superagent = Superagent;
App.libs.Page = Page;
App.libs.qs = qs;
App.libs.md5 = md5;
App.libs.shelpers = shelpers;

App.Config = Config;

App.ServicesContainer = new ServicesContainer();
App.ServicesContainer.define("EventManager", EventManager);

// shortcuts
App.service = (service) => App.ServicesContainer.get(service);
App.provider = (service) => App.ServicesContainer.get(service);
App.config = (config, defaultValue = null) => App.Config.get(config, defaultValue);
App.EventManager = App.ServicesContainer.get("EventManager");

// @todo move
if (App.config("debug")) {
    App.EventManager.enableDebug();
}

require("./helpers/index");
require("./services/index");
require("./providers/index");
require("./components/index");
require("./routes/index");

// main sass file
require("../css/main.scss");

export default App;
