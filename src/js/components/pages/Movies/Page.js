import App from "app";
const React = App.libs.React;
const Movies = App.ServicesContainer.get("Movies");

import Results from "./Results";

export default React.createClass({
    displayName: "Movies",

    getInitialState: function () {
        return {
            results: null,
            searching: false
        }
    },

    search: function () {
        let term = this.refs.search.value;
        if (!term.length) {
            this.setState({results: null, searching: false});
            return;
        }

        this.setState(
            {searching: true, results: []},
            Movies.search(term, (res) => this.setState({results: res, searching: false}))
        );
    },
  
    render: function () {
        return (
            <div className="container movies">
                <h1>Search for movies and series</h1>
                <p>Using <a href="https://www.omdbapi.com/">OMDb API</a></p>
                <form action="" className="movies-search-form">
                    <input type="search"
                        placeholder="Search movies or series by name"
                        onChange={ App.libs.debounce(this.search, 500) }
                        ref="search"
                        autoFocus
                    />
                </form>

                <Results results={ this.state.results } searching={ this.state.searching } />
            </div>
        );
    }
})