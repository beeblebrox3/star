import App from "app";
const React = App.libs.React;

class Foo extends React.Component {

    render () {
        return (
            <div className="container">
                <h1>Foo</h1>

                <p>This is an example page!</p>
            </div>
        );
    }
}
Foo.displayName = "Foo";

export default Foo;
