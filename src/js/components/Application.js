import App from "app";
const React = App.libs.React;

export default React.createClass({
    displayName: "Application",

    render: function () {
        return (
            <div>
                <nav>
                    <div className="container">
                        <a href="/">Star</a>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/foo">Foo</a></li>
                            <li><a href="/movies">Movies</a></li>
                            <li><a href="/x">404</a></li>
                        </ul>
                    </div>
                </nav>

                { this.props.children }
            </div>
        );
    }
});
