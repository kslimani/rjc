// Remote Javascript console receiver
const socketIO = require('socket.io-client')

var host = window.rjc && window.rjc.host || '{host}'
var port = window.rjc && window.rjc.port || '{port}'

function initialize() {
  if (!window.console) return

  socketIO
    .connect('http://' + host + ':' + port)
    .on('error', function (data) {
      console.log('Error: failed to connect to remote javascript console server')
    })
    .on('connect', function () {
      console.log('Remote console receiver is connected to http://' + host + ':' + port)
    })
    .on('rconsole', function (data) {
      window.console[data.f] && window.console[data.f].apply(window, Object.values(data.d))
    })
}

initialize()
