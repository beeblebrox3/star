/* eslint-env node */
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

const getPath = function () {
    return path.join(__dirname, ...arguments);
};

/******************************************************************************/
/* ENVIRONMENT VARIABLES                                                      */
/******************************************************************************/

const environment = process.env.NODE_ENV;
const PROD = environment === "production";

const appConfig = (function () {
    const defaultEnvFile = ".env.js";
    const exampleEnvFile = getPath(".env.example.js");
    let envFile = getPath(`.env.${environment}.js`);
    if (!fs.existsSync(envFile)) {
        logger.info(`Enviroment file not found for ${environment}`);
        envFile = getPath(defaultEnvFile);
    }

    if (!fs.existsSync(envFile)) {
        logger.warn(`Enviroment file not found for ${environment}`);

        if (!fs.existsSync(exampleEnvFile)) {
            throw Error("No environment file found neither example file.");
        }

        envFile = exampleEnvFile;
    }

    const envConfigs = require(envFile);
    return Object.keys(envConfigs).reduce((configs, config) => {
        configs[config] = process.env[config] || envConfigs[config];
        return configs;
    }, {environment: environment});
}());

let plugins = [
    new webpack.DefinePlugin({APP_CONFIG: JSON.stringify(appConfig)})
];

let loaders = [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: [
                ["env", {
                    targets: {
                        browsers: ["last 2 versions"]
                    }
                }],
                "react"
            ],
            plugins: [
                "transform-object-rest-spread",
                "transform-class-properties"
            ]
        }
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

    plugins.push(new MinifyPlugin());

    loaders[1].use = ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"]
    });
} else {
    loaders[1].use = ["style-loader", "css-loader", "sass-loader"];
    loaders[0].use.options.presets.push("react-hmre");

    plugins.push(new webpack.HotModuleReplacementPlugin());
}

let config = {
    entry: getPath("src/js/bootstrap.js"),
    devServer: {
        hot: true,
        inline: true,
        disableHostCheck: true,
        host: "0.0.0.0"
    },
    // devtool: "#cheap-module-eval-source-map",
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
            app: getPath("src/js/app.js")
        }
    },
    plugins: plugins
};

module.exports = config;
