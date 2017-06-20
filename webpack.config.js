const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var p = []

if (process.env.npm_lifecycle_event === 'dist') {
  p.push(new UglifyJsPlugin({
    test: /\.js($|\?)|\.jst($|\?)/i, // Default is /\.js($|\?)/i
    comments: false,
  }))
}

module.exports = {
  entry: {
    console: path.resolve(__dirname, 'src/console.js'),
    rconsole: path.resolve(__dirname, 'src/rconsole.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].min.jst',
  },
  plugins: p
}
