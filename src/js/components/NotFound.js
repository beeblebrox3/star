import App from "app";
const React = App.libs.React;

class NotFound extends React.Component {
    constructor() {
        super();
        this.displayName = "Not found";
    }

    static get defaultProps() {
        return {
            pageTitme: "Ops!"
        }
    }

    render() {
        document.title = this.props.pageTitle;

        return (
            <p>Are you lost?</p>
        );
    }
}

export default NotFound;
