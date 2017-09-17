import App from "app";
import Media from "./Media";

/** @type React */
const React = App.libs.React;

class Results extends React.Component {
    renderLoading() {
        if (this.props.searching) {
            return <center>Searching...</center>;
        }

        if (!this.props.results.length) {
            return <center>No results ☹</center>;
        }
    }

    render() {
        return (
            <div>
                <h2>Results</h2>
                <div className="medias-wall">
                    <ul className="medias-wall-list">
                        { this.renderLoading() }

                        { this.props.results.map(
                            (result, index) => <li className="medias-wall-list-item" key={ index }><Media {...result } key={ index } /></li>
                        ) }
                    </ul>
                </div>
            </div>
        );
    }
}

Results.displayName = "Movies.Results";
Results.defaultProps = {
    results: [],
    searching: false
};

export default Results;
