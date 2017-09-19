import webpack from "webpack";

const plugins = [new webpack.optimize.ModuleConcatenationPlugin()];

if (process.env.NODE_ENV === "production") {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: "./src/index",
  output: {
    filename: "index.js"
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }]
  },
  plugins
};
