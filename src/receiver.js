// Receiver module
const socketIO = require('socket.io-client')
const Flatted = require('flatted/cjs')

exports.create = function (url, options) {
  if (!window.console) return null

  return socketIO(url, options)
    .on('error', function () {
      console.log('Error: failed to connect to remote javascript console server')
    })
    .on('connect', function () {
      console.log('Remote console receiver is connected to ' + url)
    })
    .on('rconsole', function (data, args) {
      try {
        args = Object.values(Flatted.parse(data.d))
      } catch (e) {
        // JSON parse failure
        args = ['rjc parse error', e]
      }
      window.console[data.f] && window.console[data.f].apply(window, args)
    })
}
