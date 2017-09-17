import App from "app";

const React = App.libs.React;
const RDOM = App.libs.ReactDOM;

/**
 *
 * @param {*} DOMNode
 * @param {*} Page
 * @name RouterEngine
 */
const RouterEngine = function (DOMNode, Page) {
    let defaultLayout = null;
    let defaultTitle = "App";

    const routesMap = {};
    const resolvers = {};

    const createRoute = function (routeDefinition) {
        let route = {
            name: null,
            middleware: null,
            handler: null,
            component: null,
            layout: null,
            title: ""
        };

        if (typeof routeDefinition === "function") {
            routeDefinition = {
                component: routeDefinition,
                layout: defaultLayout
            };
        }

        route = Object.assign(route, routeDefinition);
        if (!route.title || !route.title.length) {
            route.title = defaultTitle;
        } else {
            route.title = `${route.title} | ${defaultTitle}`;
        }
        return route;
    };

    const renderPage = function (Page, context) {
        RDOM.render(
            <Page { ...context.params } { ...context.query } context={ context }/>,
            DOMNode
        );
    };

    const renderPageWithLayout = function (Layout, Page, context) {
        RDOM.render(
            <Layout>
                <Page { ...context.params } { ...context.query } context={ context }/>
            </Layout>,
            DOMNode
        );
    };

    const addRouteHandler = function (path, routeDefinition) {
        let layout = routeDefinition.layout || defaultLayout;
        let useHandler = routeDefinition.handler;
        if (layout && routeDefinition.component) {
            useHandler = renderPageWithLayout.bind(null, layout, routeDefinition.component);
        } else if (layout) {
            useHandler = renderPage.bind(null, routeDefinition.component);
        }

        Page(path, function (context) {
            let args = Object.keys(context.params);
            let resolver = args.reduce(function (resolver, argName) {
                if (!resolver && resolvers.hasOwnProperty(argName)) {
                    resolver = {
                        fn: resolvers[argName],
                        name: argName,
                        value: context.params[argName]
                    };
                }
                return resolver;
            }, null);

            if (resolver) {
                resolver.fn(resolver.value, context, () => {
                    if (routeDefinition.title.length) {
                        document.title = routeDefinition.title;
                    }
                    useHandler(context);
                });
            } else {
                if (routeDefinition.title.length) {
                    document.title = routeDefinition.title;
                }
                useHandler(context);
            }
        });
    };


    return {
        setDefaultLayout: (layout) => {
            defaultLayout = layout;
        },

        setDefaultTitle: (title) => {
            defaultTitle = title;
        },

        addResolver: (param, fn) => {
            resolvers[param] = fn;
        },

        addRoutes: (routes) => {
            Object.keys(routes).map(path => {
                routesMap[path] = createRoute(routes[path]);
                addRouteHandler(path, routesMap[path]);
            });
        },

        addRoute: (path, config) => {
            routesMap[path] = createRoute(config);
            addRouteHandler(path, routesMap[path]);
        },

        addMiddleware(path, fn) {
            Page(path, fn);
        },

        setRoute: function (route) {
            Page.redirect(route);
        },

        start: function () {
            Page.start({
                click: true,
                hashbang: false
            });
        }
    }
};

export default RouterEngine;
