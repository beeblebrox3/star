import App from "app";

import Movie from "./CardMovie";
import TVShow from "./CardTVShow";
import Person from "./CardPerson";

const React = App.libs.React;

class Media extends React.Component {
    renderShortDetails() {
        if (!this.props.renderLongDetails) {
            return (
                <span className="short-details">{ this.getShortDetails() }</span>
            );
        }
    }

    renderLongDetails() {
        if (this.props.renderLongDetails) {
            return (
                <div className="long-details">{ this.getLongDetails() }</div>
            );
        }
    }

    getType() {
        return this.props.media_type;
    }

    getTitle() {
        return this.props.name || this.props.title;
    }

    getPosterUrl() {
        return App.provider("Movies").getPosterURL(this.props.poster_path || this.props.profile_path);
    }

    getShortDetails() {
        const type = this.getType();
        if (type === "person") {
            return this.props.known_for.length > 0 ? `known for ${this.props.known_for[0]["title"]}` : "";
        }

        if (type === "tv") {
            return `First air date: ${this.props.first_air_date}`;
        }

        return `Release date: ${this.props.release_date}`;
    }

    getLongDetails() {
        switch(this.getType()) {
            case "movie":
                return this.getLongDetailsMovie();
            case "tv":
                return this.getLongDetailsTV();
            case "person":
                return this.getLongDetailsPerson();
        }
    }

    getLongDetailsMovie() {
        return (
            <table className="media-details">
                <tbody>
                    <tr>
                        <th>Overview</th>
                        <td>{ this.props.overview }</td>
                    </tr>
                    <tr>
                        <th>Genres</th>
                        <td>
                            <ul>
                                { this.props.genres.map(genre => <li>{ genre.name }</li>)}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Homepage</th>
                        <td><a href={ this.props.homepage } target="_blank">{ this.props.homepage }</a></td>
                    </tr>
                    <tr>
                        <th>Original Language</th>
                        <td>{ this.props.original_language }</td>
                    </tr>
                    <tr>
                        <th>Average rate</th>
                        <td>{ this.props.vote_average }</td>
                    </tr>
                    <tr>
                        <th>Rates</th>
                        <td>{ this.props.vote_count }</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    getLongDetailsTV() {
        return (
            <table className="media-details">
                <tbody>
                    <tr>
                        <th>Overview</th>
                        <td>{ this.props.overview }</td>
                    </tr>
                    <tr>
                        <th>Genres</th>
                        <td>
                            <ul>
                                { this.props.genres.map((genre, index) => <li key={ index }>{ genre.name }</li>)}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Homepage</th>
                        <td><a href={ this.props.homepage } target="_blank">{ this.props.homepage }</a></td>
                    </tr>
                    <tr>
                        <th>Original Language</th>
                        <td>{ this.props.original_language }</td>
                    </tr>
                    <tr>
                        <th>Average rate</th>
                        <td>{ this.props.vote_average }</td>
                    </tr>
                    <tr>
                        <th>Rates</th>
                        <td>{ this.props.vote_count }</td>
                    </tr>
                    <tr>
                        <th>In production</th>
                        <td>{ this.props.in_production }</td>
                    </tr>
                    <tr>
                        <th>Nº episodes</th>
                        <td>{ this.props.number_of_episodes }</td>
                    </tr>
                    <tr>
                        <th>Nº seasons</th>
                        <td>{ this.props.number_of_seasons }</td>
                    </tr>
                    <tr>
                        <th>First air date</th>
                        <td>{ this.props.first_air_date }</td>
                    </tr>
                    <tr>
                        <th>Last air date</th>
                        <td>{ this.props.last_air_date }</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    getLongDetailsPerson() {
        return (
            <table className="media-details">
                <tbody>
                    <tr>
                        <th>Biography</th>
                        <td>{ this.props.biography }</td>
                    </tr>
                    <tr>
                        <th>Birthday</th>
                        <td>{ this.props.birthday }</td>
                    </tr>
                    <tr>
                        <th>Deathday</th>
                        <td>{ this.props.deathdate }</td>
                    </tr>
                    <tr>
                        <th>Homepage</th>
                        <td><a href={ this.props.homepage } target="_blank">{ this.props.homepage }</a></td>
                    </tr>
                </tbody>
            </table>
        );
    }

    getMediaUrl() {
        return `/${this.props.media_type}/${this.props.id}`;
    }

    render() {
        return (
            <div className="media">
                <span className="poster">
                    <a href={ this.getMediaUrl() }>
                        <img src={ this.getPosterUrl() } alt={ "poster of " + this.getTitle() } />
                    </a>
                </span>
                <h3 className="title">{ this.getTitle() }</h3>

                { this.renderShortDetails() }
                { this.renderLongDetails() }
            </div>
        );
    }
}

Media.displayName = "Movies.Media";
Media.defaultProps = {
    renderLongDetails: false
};

export default Media;
