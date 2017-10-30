import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import fs from "fs";

const packageDefinition = JSON.parse(fs.readFileSync("package.json"));

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
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      CLIENT_VERSION: JSON.stringify(packageDefinition.version)
    })
  ]
};
