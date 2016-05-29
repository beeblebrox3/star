var App = require("app");
var React = App.libs.React;

var Application = React.createClass({
    displayName: "Not Found",

    getDefaultProps: function () {
        "use strict";

        return {
            pageTitle: "Ops!"
        };
    },

    render: function () {
        "use strict";

        document.title = this.props.pageTitle;

        return (
            <p>Are you lost?</p>
        );
    }
});

module.exports = Application;
