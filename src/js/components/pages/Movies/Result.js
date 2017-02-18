import App from "app";
import Result from "./Result";

const React = App.libs.React;

export default React.createClass({
    displayName: "Movies.Results",

    getDefaultProps: function () {
        return {
            Title: "",
            Poster: "",
            Year: 0
        };
    },

    getPosterURL: function () {
        const defaultURL = "https://placeholdit.imgix.net/~text?txtsize=72&txt=not%20available&w=320&h=480";
        return this.props.Poster === "N/A" ? defaultURL : this.props.Poster;
    },

    render: function () {
        return (
            <li className="movies-search-result">
                <span className="title">{ this.props.Title }</span>
                <span className="poster">
                    <img src={ this.getPosterURL() } alt={ "poster of " + this.props.Title } />
                </span>                                    
                <span className="year">
                    Year: { this.props.Year }
                </span>
            </li>
        );
    }
})