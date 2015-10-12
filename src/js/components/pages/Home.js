var App = require("app");
var React = App.libs.React;

var Home = React.createClass({
    displayName: "pages.Home",

    render: function () {
        "use strict";

        return (
            <div className="uk-width-medium-1-2 uk-container-center">
                <div className="uk-align-center uk-text-center uk-margin-large-top">

                    <h1 className="uk-heading-large">Star Framework</h1>
                    <p className="uk-text-large">Welcome :)</p>
                </div>
            </div>
        );
    }
});

module.exports = Home;
