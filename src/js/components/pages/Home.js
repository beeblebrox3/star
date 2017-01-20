import App from "app";
const React = App.libs.React;

export default React.createClass({
    displayName: "Home",

    render: function () {
        return (
            <div>
                <div>
                    <h1>Star Framework</h1>
                    <p>Welcome :)</p>
                </div>
            </div>
        );
    }
});
