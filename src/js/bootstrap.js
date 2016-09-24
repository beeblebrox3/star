import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import Superagent from "superagent";
import Page from "page";
import ServicesContainer from "./core/ServicesContainer";
import EventManager from "./core/EventManager";

import App from "app";
import Config from "./config";

App.libs.React = React;
App.libs.ReactDOM = ReactDOM;
App.libs._ = _;
App.libs.Superagent = Superagent;
App.libs.Page = Page;

App.Config = Config;

App.ServicesContainer = new ServicesContainer();
App.ServicesContainer.define("EventManager", EventManager);

// shortcut
App.EventManager = App.ServicesContainer.get("EventManager");

require("./helpers/index");
require("./services/index");
require("./components/index");
// require("./routes/index");
//
// module.exports = App;

export default App;
