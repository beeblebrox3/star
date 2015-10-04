var App = require("app");
var React = App.libs.React;

var Application = React.createClass({
    displayName: "Application",

    getDefaultProps: function () {
        "use strict";

        return {
            name: "appname"
        };
    },

    render: function () {
        "use strict";

        return (
            <div className="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
                <nav className="uk-navbar">
                    <a className="uk-navbar-brand" href="#/">Star</a>
                    <ul className="uk-navbar-nav">
                        <li><a href="#/">Home</a></li>
                        <li><a href="#/foo">Foo</a></li>
                        <li><a href="#/x">404</a></li>
                    </ul>
                </nav>

                { this.props.children }
            </div>
        );
    }
});

module.exports = Application;
