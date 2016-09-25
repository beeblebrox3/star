import App from "app";
const React = App.libs.React;

class Application extends React.Component {
    constructor() {
        super();
        this.displayName = "Application";
    }

    static get defaultProps() {
        return {
            pageTitle: "Star"
        }
    }

    render() {
        document.title = this.props.pageTitle;

        return (
            <div>
                <nav>
                    <a href="/">Star</a>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/foo">Foo</a></li>
                        <li><a href="/x">404</a></li>
                    </ul>
                </nav>

                { this.props.children }
            </div>
        );
    }
}

export default Application;
