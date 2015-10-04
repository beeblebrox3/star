var App = require("app");
var React = App.libs.React;

var Foo = React.createClass({
    displayName: "pages.Foo",

    render: function () {
        "use strict";

        return (
            <div className="uk-grid">
                <div className="uk-width-medium-1-1">
                    foo
                </div>
            </div>
        );
    }
});

module.exports = Foo;
