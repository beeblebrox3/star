import App from "app";
const React = App.libs.React;
const MoviesProvider = App.provider("Movies");
const qs = App.libs.qs;

import Results from "./Results";

class MoviesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {results: [], searching: false};
    }

    componentDidMount() {
        this.loadPage(this.props.queryString);
    }

    componentWillReceiveProps(newProps) {
        const shouldUpdate = ["page", "q"].some(prop => {
            return newProps.queryString[prop] != this.props.queryString[prop];
        });

        if (shouldUpdate) {
            window.scrollTo(0,0);
            this.loadPage(newProps.queryString);
        }
    }

    loadPage = (userOpts) => {
        const defaultOpts = {
            page: 1,
            q: ""
        };

        const opts = Object.assign({}, defaultOpts, userOpts);

        if (!opts.q.length) {
            return;
        }

        this.setState({searching: true, results: []}, () => {
            MoviesProvider.search(opts.q, opts.page)
                .then(results => {
                    this.setState({results: results, searching: false})
                })
        });
    }

    handleSearch = () => {
        App.service("ROUTER").setRoute(this.getUrl(null, this.inputSearch.value));
    }

    getSearchValue = () => {
        if (this.inputSearch && this.inputSearch.value) {
            return this.inputSearch.value;
        }

        return "";
    }

    getUrl = (page, q) => {
        const query = {
            q: q || App.libs.shelpers.object.getFlattened("queryString.q", this.props, "")
        };
        return `/movies?${qs.stringify(query)}`;
    }

    renderLoading = () => {
        if (this.state.loading) {
            return "loading...";
        }
    }

    renderResults = () => {
        if (App.libs.shelpers.object.getFlattened("queryString.q", this.props, "").length > 0) {
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

                <form className="search-bar" method="get">
                    <input type="search"
                        name="q"
                        placeholder="search..."
                        onChange={ App.libs.debounce(this.handleSearch, 500) }
                        ref={ (elem) => { this.inputSearch = elem }}
                        defaultValue={ this.props.queryString.q }
                        autoFocus
                    />
                </form>

                { this.renderResults() }
            </div>
        );
    }
}

MoviesPage.displayName = "MoviesPage";

export default MoviesPage;

