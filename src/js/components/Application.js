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
            <div className="application">
                Hello to { this.props.name }
            </div>
        );
    }
});

module.exports = Application;
