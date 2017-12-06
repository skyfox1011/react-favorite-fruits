const webpack = require("webpack");
const path = require("path");

const SRC_DIR = path.resolve(__dirname, "src");

const config = {
    entry: SRC_DIR + "/index.js",
    output: {
        filename: "main.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: "babel-loader"
            }
        ]
    }
};

module.exports = config;