import App from "app";
const React = App.libs.React;

class Foo extends React.Component {
    render() {
        return (
            <div className="uk-grid">
                <div className="uk-width-medium-1-1">
                    foo
                </div>
            </div>
        );
    }
}

export default Foo;
