import App from "app";

const React = App.libs.React;

class CardMovie extends React.Component {
    getPosterURL() {
        if (!this.props.poster_path || !this.props.poster_path.length) {
            return "N/A";
        }
        return App.provider("Movies").getPosterURL(this.props.poster_path) || "N/A";
    }

    render() {
        return (
            <li className="medias-wall-list-item">
                <span className="title">Movie: { this.props.title }</span>
                <span className="poster">
                    <a href={ `/movie/${this.props.id}` }>
                        <img src={ this.getPosterURL() } alt={ "poster of " + this.props.title } title={ this.props.overview } />
                    </a>
                </span>
                <span className="year">
                    Date: { this.props.release_date }
                </span>
            </li>
        );
    }
}

CardMovie.displayName = "CardMovie";

export default CardMovie;
