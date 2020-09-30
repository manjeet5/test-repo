var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,

  entry: './assets/js/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

  output: {
      path: path.resolve('./assets/bundles/'),
      publicPath: 'http://localhost:7000/',
      filename: "[name]-[hash].js",
  },

  plugins: [ 
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: {
        loader: "babel-loader",
        options: {
            presets: ['@babel/preset-env', "@babel/preset-react"]
        }
      }}, // to transform JSX into JS
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
}