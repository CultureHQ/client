import webpack from "webpack";
import nodeExternals from "webpack-node-externals";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./dist/index.js",
    library: "CultureHQ",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js", ".json"]
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.json$/, use: "json-loader", exclude: /node_modules/ }
    ]
  },
  target: "node",
  externals: [nodeExternals()],
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
};
