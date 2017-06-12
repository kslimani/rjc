const path = require('path')
const webpack = require('webpack')

var p = []

if (process.env.npm_lifecycle_event === 'dist') {
  p.push(new webpack.optimize.UglifyJsPlugin())
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
