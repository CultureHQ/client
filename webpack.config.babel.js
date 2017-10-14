import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import constants from "./build/constants";

const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./dist/index.js",
    library: "CultureHQ",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }]
  },
  target: "node",
  externals: [nodeExternals()],
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin(constants.for(environment))
  ]
};
