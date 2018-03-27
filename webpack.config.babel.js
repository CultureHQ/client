import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import fs from "fs";

const packageDefinition = JSON.parse(fs.readFileSync("package.json"));

module.exports = {
  output: {
    library: "CultureHQ",
    libraryTarget: "umd"
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }]
  },
  target: "node",
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      CLIENT_VERSION: JSON.stringify(packageDefinition.version)
    })
  ]
};
