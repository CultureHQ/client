import webpack from "webpack";
import nodeExternals from "webpack-node-externals";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./dist/index.min.js",
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
    new webpack.optimize.UglifyJsPlugin()
  ]
};
