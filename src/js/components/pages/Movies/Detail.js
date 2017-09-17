import App from "app";
const React = App.libs.React;

import Media from "./Media";

class DetailsPage extends React.Component {

    render() {
        return (
            <div className="container">
                <center>
                    <Media { ...this.props.media } renderLongDetails />
                </center>
            </div>
        );
    }
}

DetailsPage.displayName = "DetailsPage";

export default DetailsPage;
