import App from "app";
import Result from "./Result";

/** @type React */
const React = App.libs.React;

export default React.createClass({
    displayName: "Movies.Results",

    getDefaultProps: function () {
        return {
            results: null,
            searching: false
        };
    },

    render: function () {
        if (this.props.searching) {
            return <p>searching...</p>
        }
        if (this.props.results === null) {
            return <p>search something!</p>;
        }
        
        if (!this.props.results.length) {
            return <p>no results :(</p>;
        }

        return (
            <div>
                <h2>Results</h2>
                <div className="movies-search-results">
                    <ul className="movies-search-results-list">
                        { this.props.results.map(
                            (result, index) => <Result {...result } key={ index } />
                        ) }
                    </ul>
                </div>
            </div>
        );
    }
});
