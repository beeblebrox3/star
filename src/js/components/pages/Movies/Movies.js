import App from "app";
const React = App.libs.React;
const MoviesProvider = App.provider("Movies");
const qs = App.libs.qs;

import Results from "./Results";

class MoviesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {results: [], searching: true};
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.loadPage(this.props);
    }

    componentWillReceiveProps(newProps) {
        const shouldUpdate = ["page", "q"].some(prop => {
            return newProps[prop] != this.props[prop];
        });

        if (shouldUpdate) {
            window.scrollTo(0,0);
            this.loadPage(newProps);
        }
    }

    loadPage(props) {
        const opts = {page: props.page,  q: props.q};

        if (!props.q.length) {
            return;
        }

        this.setState({searching: true, results: []}, () => {
            MoviesProvider.search(props.q, props.page)
                .then(results => {
                    this.setState({results: results, searching: false})
                })
        });
    }

    handleSearch() {
        App.service("ROUTER").setRoute(this.getUrl(null, this.inputSearch.value));
    }

    getSearchValue() {
        if (this.inputSearch && this.inputSearch.value) {
            return this.inputSearch.value;
        }

        return "";
    }

    getUrl(page, q) {
        const query = {
            q: q || this.props.q
        };
        return `/movies?${qs.stringify(query)}`;
    }

    renderLoading() {
        if (this.state.loading) {
            // return <App.components.base.Loading />;
            return "loading...";
        }
    }

    renderResults() {
        if (this.props.q.length) {
            return (
                <Results
                    searching={ this.state.searching }
                    results={ this.state.results.filter(result => result.profile_path || result.poster_path) }
                />
            );
        }
    }

    render() {
        return (
            <div className="container movies">
                <h1>Search for movies and tv shows</h1>
                <p>All data provided by <a href="https://www.themoviedb.org/">The Movie DB</a>.</p>

                <form className="search-bar">
                    <input type="search"
                        placeholder="search..."
                        onChange={ App.libs.debounce(this.handleSearch, 500) }
                        ref={ (elem) => { this.inputSearch = elem }}
                        defaultValue={ this.props.q }
                        autoFocus
                    />
                </form>

                { this.renderResults() }
            </div>
        );
    }
}

MoviesPage.displayName = "MoviesPage";
MoviesPage.defaultProps = {
    page: 1,
    q: ""
};

export default MoviesPage;

