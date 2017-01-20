/* eslint-env node */
const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const environment = process.env.NODE_ENV;
const PROD = environment === "production";
const defaultEnvFile = ".env.js";
const envFile = path.join(
    __dirname,
    environment ? ".env." + process.env.NODE_ENV + ".js" : defaultEnvFile
);

let plugins = [
    new webpack.HotModuleReplacementPlugin()
];

let loaders = [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: "babel",
    query: {
        presets: ["react", "es2015"]
    }
}, {
    test: /\.scss$/
}];

if (PROD) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    );
    plugins.push(
        new ExtractTextPlugin("../css/bundle.css")
    );
    loaders[1].loader = ExtractTextPlugin.extract("style", "css!sass");
} else {
    loaders[1].loaders = ["style", "css", "sass"];
}

let config = {
    entry: "./src/js/bootstrap.js",
    devServer: {
        hot: true,
        inline: true
    },
    output: {
        path: "./web/js",
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
            app: path.join(__dirname, "src/js/app.js")
        }
    },
    plugins: plugins
};

module.exports = config;
