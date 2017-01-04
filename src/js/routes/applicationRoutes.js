var App = require("app");
var Page = App.libs.Page;

var Router = App.ServicesContainer.get("ROUTER");
var defaultLayout = App.components.Application;
var Pages = App.components.pages;

Page("/home", Router.renderPageWithLayout.bind(null, defaultLayout, Pages.Home));
Page("/foo", Router.renderPageWithLayout.bind(null, defaultLayout, Pages.Foo));
Page("/handling-events", Router.renderPageWithLayout.bind(null, defaultLayout, Pages.HandlingEvents));
