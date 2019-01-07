const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

var options = {
  entry: {
    console: path.resolve(__dirname, 'src/console.js'),
    rconsole: path.resolve(__dirname, 'src/rconsole.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].min.jst',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        include: [
          path.resolve(__dirname, 'src')
        ],
      },
    ],
  },
  optimization: {},
  plugins: []
}

if (process.env.npm_lifecycle_event === 'dist') {
  options.optimization.minimizer = [
    new UglifyJsPlugin({
      test: /\.js($|\?)|\.jst($|\?)/i, // Default is /\.js($|\?)/i
      parallel: true,
      uglifyOptions: {
        output: {
          comments: false,
        },
      }
    })
  ]
} else {
  options.optimization.minimize = false
}

module.exports = options
