// Receiver module
const socketIO = require('socket.io-client')

exports.create = function (url, options) {
  if (!window.console) return null

  return socketIO(url, options)
    .on('error', function (data) {
      console.log('Error: failed to connect to remote javascript console server')
    })
    .on('connect', function () {
      console.log('Remote console receiver is connected to ' + url)
    })
    .on('rconsole', function (data) {
      window.console[data.f] && window.console[data.f].apply(window, Object.values(data.d))
    })
}
