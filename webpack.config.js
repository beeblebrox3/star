/* eslint-env node */
const path = require("path");

const defaultEnvFile = ".env.js";
const envFile = path.join(
    __dirname,
    process.env.NODE_ENV ? ".env." + process.env.NODE_ENV + ".js" : defaultEnvFile
);

module.exports = {
    entry: "./src/js/bootstrap.js",
    output: {
        path: "./web/js",
        filename: "bundle.js",
        library: "App",
        libraryTarget: "umd",
        publicPath: "js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets: ["react", "es2015"]
            }
        }]
    },
    resolve: {
        alias: {
            env: envFile,
            app: path.join(__dirname, "src/js/app.js")
        }
    }
};
