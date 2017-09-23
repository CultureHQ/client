import webpack from "webpack";
import nodeExternals from "webpack-node-externals";

const plugins = [new webpack.optimize.ModuleConcatenationPlugin()];
if (process.env.NODE_ENV === "production") {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

const externals = [];
if (process.env.BUNDLE !== "1") {
  externals.push(nodeExternals());
}

let output = "build/bundled.js";
if (process.env.OUTPUT) {
  output = process.env.OUTPUT;
}

module.exports = {
  entry: "./build/index.min.js",
  output: {
    filename: output,
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }]
  },
  externals,
  plugins
};
