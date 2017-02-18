import App from "app";

const Page = App.libs.Page;
const RDOM = App.libs.ReactDOM;
const React = App.libs.React;

let Router = {};
const DOMNode = document.querySelector("#react-root");

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
require("./middlewares");
require("./applicationRoutes");

Page("*", Router.renderPageWithLayout.bind(null, App.components.Application, App.components.NotFound));

Page.start({
    click: true,
    hashbang: App.Config.get("environment") === "dev"
});
