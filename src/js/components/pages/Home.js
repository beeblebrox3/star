var App = require("app");
var React = App.libs.React;

var Home = React.createClass({
    displayName: "pages.Home",

    render: function () {
        "use strict";

        return (
            <div className="uk-grid">
                <div className="uk-width-medium-1-1">
                    <div className="uk-vertical-align-middle uk-width-1-2">
                        <h1 className="uk-heading-large">Star Framework</h1>
                        <p className="uk-text-large">Welcome :)</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Home;
