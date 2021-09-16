// Receiver module
const socketIO = require('socket.io-client')
const { parse } = require('flatted')

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
        args = Object.values(parse(data.d))
      } catch (e) {
        // JSON parse failure
        args = ['rjc parse error', e]
      }
      window.console[data.f] && window.console[data.f].apply(window, args)
    })
}
