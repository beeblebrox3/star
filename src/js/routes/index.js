var App = require("app");
var Page = App.libs.Page;
var RDOM = require("react-dom");
var React = require("react");

var Router = {};
var DOMNode = document.querySelector("#react-root");

Router.setRoute = function (route) {
    "use strict";

    Page.redirect(route);
};

Router.renderPage = function (Page, context) {
    "use strict";

    RDOM.render(
        <Page { ...context.params } context={ context }/>,
        DOMNode
    );
};

Router.renderPageWithLayout = function (Layout, Page, context) {
    "use strict";

    RDOM.render(
        <Layout>
            <Page { ...context.params } context={ context }/>
        </Layout>,
        DOMNode
    );
};

App.ServicesContainer.setInstance("ROUTER", Router);
require("./routeNames");
require("./middlewares");
require("./applicationRoutes");

Page("*", Router.renderPageWithLayout.bind(null, App.components.Application, App.components.NotFound));

Page.start({
    click: true,
    hashbang: App.Config.get("environment") === "dev"
});
