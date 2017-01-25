var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/js/app.jsx',
  ],

  output: {
    path: path.resolve(__dirname, './app'),
    filename: 'js/app.js'
  },
  module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/
        }
      ]
  },
}
