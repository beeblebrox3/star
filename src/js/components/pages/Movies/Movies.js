import App from "app";
const React = App.libs.React;
const MoviesProvider = App.provider("Movies");
const qs = App.libs.qs;

import Results from "./Results";

class MoviesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {results: [], searching: false, error: ""};
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

        this.setState({searching: true, results: [], error: ""}, () => {
            MoviesProvider.search(opts.q, opts.page)
                .then(results => {
                    this.setState({results: results, searching: false})
                })
                .catch(error => this.setState({error: error, loading: false}))
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        App.service("ROUTER").setRoute(this.getUrl(null, this.inputSearch.value));
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

    changeFoo = (e) => this.setState({foo: e.target.value})

    render() {
        return (
            <div className="container movies">
                <h1>Search for movies and tv shows</h1>
                <p>All data provided by <a href="https://www.themoviedb.org/">The Movie DB</a>.</p>

                <form className="search-bar" method="get" onSubmit={ this.handleSubmit }>
                    <input type="search"
                        name="q"
                        placeholder="search..."
                        defaultValue={ this.props.queryString.q }
                        value={ this.state.foo }
                        onChange={ this.changeFoo }
                        autoFocus
                        ref={ elem => this.inputSearch = elem }
                    />
                </form>

                <center>{ this.state.foo }</center>

                { this.renderResults() }
            </div>
        );
    }
}

MoviesPage.displayName = "MoviesPage";

export default MoviesPage;

