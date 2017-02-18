import App from "app";
const Page = App.libs.Page;

const Router = App.ServicesContainer.get("ROUTER");
const defaultLayout = App.components.Application;
const Pages = App.components.pages;

Page("/", Router.renderPageWithLayout.bind(null, defaultLayout, Pages.Home));
Page("/foo", Router.renderPageWithLayout.bind(null, defaultLayout, Pages.Foo));
Page("/movies", Router.renderPageWithLayout.bind(null, defaultLayout, Pages.Movies));
