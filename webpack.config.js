/* eslint-env node */
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const environment = process.env.NODE_ENV;
const PROD = environment === "production";

const defaultEnvFile = ".env.js";
let envFile = path.resolve(__dirname, `.env.${environment}.js`);
if (!fs.existsSync(envFile)) {
    envFile = path.resolve(__dirname, defaultEnvFile);
}

const getPath = function () {
    return path.join(__dirname, ...arguments);
};

let plugins = [
    new webpack.HotModuleReplacementPlugin()
];

let loaders = [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    query: {
        presets: ["env", "react"]
    }
}, {
    test: /\.scss$/
}, {
    test: /\.(eot|ttf|svg|png|jpg|gif|woff2?)$/,
    loader: 'url-loader',
    query: {
        limit: 10240,
        name: 'static/[hash].[ext]'
    }
}];

if (PROD) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );

    plugins.push(
        new ExtractTextPlugin({
            filename: "../css/bundle.css",
            disable: process.env.NODE_ENV === "development"
        })
    );

    plugins.push(
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    );

    loaders[1].use = ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"]
    });
} else {
    loaders[1].use = ["style-loader", "css-loader", "sass-loader"];
    loaders[0].query.presets.push("react-hmre");

    plugins.push(
        new webpack.SourceMapDevToolPlugin({
            lineToLine: true
        })
    );
}

let config = {
    entry: getPath("src/js/bootstrap.js"),
    devServer: {
        hot: true,
        inline: true,
        disableHostCheck: true,
        host: "0.0.0.0"
    },
    // devtool: "#inline-source-map",
    output: {
        path: getPath("web/js"),
        filename: "bundle.js",
        library: "App",
        libraryTarget: "umd",
        publicPath: "js"
    },
    module: {
        loaders: loaders
    },
    resolve: {
        alias: {
            env: envFile,
            app: getPath("src/js/app.js")
        }
    },
    plugins: plugins
};

module.exports = config;
