var App = require("app");
var Router = App.libs.Director.Router;
var React = App.libs.React;

var router = new Router({
    "/": function () {
        React.render(
            <App.components.Application>
                <App.components.pages.Home />
            </App.components.Application>,
            document.body
        );
    },
    "/foo": function () {
        React.render(
            <App.components.Application>
                <App.components.pages.Foo />
            </App.components.Application>,
            document.body
        );
    },
}).configure({
    notfound: function () {
        React.render(
            <App.components.Application>
                <h1>page not found :(</h1>
            </App.components.Application>,
            document.body
        );
    },

    // html5history: true
});

router.init();

if (window.location.hash === "") {
    window.location.hash = "/";
}
