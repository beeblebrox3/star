import App from "app";
const React = App.libs.React;

export default class NotFound extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Ops! Page not found!</h1>

                <p>Are you lost?</p>
            </div>
        );
    }
}
