import App from "app";
const React = App.libs.React;

class Home extends React.Component {

    render () {
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

Home.displayName = "Home";

export default Home;
