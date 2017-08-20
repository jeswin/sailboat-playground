var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  devtool: "source-map",

  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new CopyWebpackPlugin([{ from: "assets", to: "." }], {
      // By default, we only copy modified files during
      // a watch or webpack-dev-server build. Setting this
      // to `true` copies all files.
      copyUnmodified: true
    })
  ],

  devServer: {
    host: "localhost",
    port: 3000,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true
    // enable HMR on the server
  }
};