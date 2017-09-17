import App from "app";
const React = App.libs.React;

export default class Application extends React.Component {
    render() {
        return (
            <div>
                <nav className="main-menu">
                    <div className="container">
                        <div className="brand-container">
                            <a className="brand" href="/">Star</a>
                        </div>

                        <div className="main-menu-list-container">
                            <ul className="main-menu-list">
                                <li className="main-menu-item"><a href="/">Home</a></li>
                                <li className="main-menu-item"><a href="/foo">Foo</a></li>
                                <li className="main-menu-item"><a href="/movies">Movies</a></li>
                                <li className="main-menu-item"><a href="/x">Broken Link</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="page-content">
                    { this.props.children }
                </div>

                <footer>
                    Demo page built with <a href="http://github.com/beeblebrox3/star">Star Framework</a>.
                </footer>
            </div>
        );
    }
}
