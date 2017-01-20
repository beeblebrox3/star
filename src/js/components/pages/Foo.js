import App from "app";
const React = App.libs.React;

export default React.createClass({
    displayName: "Foo",

    render: function () {
        return (
            <div className="container">
                <h1>Foo</h1>

                <p>This is an example page!</p>
            </div>
        );
    }
});
