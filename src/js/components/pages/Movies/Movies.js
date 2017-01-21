import App from "app";
const React = App.libs.React;
const Movies = App.ServicesContainer.get("Movies");

import Results from "./Results";

export default React.createClass({
    displayName: "Movies",

    getInitialState: function () {
        return {
            results: null
        }
    },

    search: function () {
        Movies.search(this.refs.search.value, (res) => {
            this.setState({results: res});
        });
    },
  
    render: function () {
        return (
            <div className="container movies">
                <h1>Search for movies and series</h1>
                <p>Using <a href="https://www.omdbapi.com/">OMDb API</a></p>
                <form action="" className="movies-search-form">
                    <input type="search"
                        placeholder="Search movies or series by name"
                        onChange={ App.libs._.debounce(this.search, 500) }
                        ref="search"
                        autoFocus
                    />
                </form>

                <Results results={ this.state.results } />
            </div>
        );
    }
})