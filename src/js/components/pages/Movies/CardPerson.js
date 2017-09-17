import App from "app";

const React = App.libs.React;

class CardMovie extends React.Component {
    getPosterURL() {
        if (!this.props.profile_path || !this.props.profile_path.length) {
            return "N/A";
        }
        return App.provider("Movies").getPosterURL(this.props.profile_path) || "N/A";
    }

    render() {
        return (
            <li className="medias-wall-list-item">
                <span className="title">Person: { this.props.name }</span>
                <span className="poster">
                    <a href={ `/person/${this.props.id}` }>
                        <img src={ this.getPosterURL() } alt={ "poster of " + this.props.name } title={ this.props.name } />
                    </a>
                </span>
            </li>
        );
    }
}

CardMovie.displayName = "CardMovie";

export default CardMovie;
