import App from "app";
const React = App.libs.React;

class Home extends React.Component {
    constructor() {
        super();
        this.displayName = "pages.Home";
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Star Framework</h1>
                    <p>Welcome :)</p>
                </div>
            </div>
        );
    }
}

export default Home;
