var App = require("app");
var Page = App.libs.Page;

var Router = App.ServicesContainer.get("ROUTER");
var defaultLayout = App.components.Application;
var Pages = App.components.pages;

Page(App.routes.home, Router.renderPageWithLayout.bind(null, defaultLayout, Pages.Home));
Page(App.routes.foo, Router.renderPageWithLayout.bind(null, defaultLayout, Pages.Foo));
Page(App.routes.em, Router.renderPageWithLayout.bind(null, defaultLayout, Pages.Em));
