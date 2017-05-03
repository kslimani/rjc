// Remote Javascript console sender
const socketIO = require('socket.io-client')

var socket, prev
var host = window.rjc && window.rjc.host || '{host}'
var port = window.rjc && window.rjc.port || '{port}'

function send(f, d)
{
  if (!socket) return
  try {
    // "Maximum Call Stack Size Exceeded" error may happen
    socket.emit('console', {f: f, d: d})
  } catch(mcsse) {
    try {
      // "Converting circular structure to JSON" error may happen
      socket.emit('console', {f: f, d: JSON.parse(JSON.stringify(d))})
    } catch(e) {
      // Sorry bro :~(
      socket.emit('console', {f: 'error', d: ['Remote console sender error: ' + e.message]})
    }
  }
}

function overrideConsole() {
  if (prev) return

  prev = window.console

  window.console = {
    debug: function() {
      send('debug', arguments)
      prev.debug && prev.debug.apply(window, arguments)
    },
    error: function() {
      send('error', arguments)
      prev.error && prev.error.apply(window, arguments)
    },
    info: function() {
      send('info', arguments)
      prev.info && prev.info.apply(window, arguments)
    },
    log: function() {
      send('log', arguments)
      prev.log && prev.log.apply(window, arguments)
    },
    warn: function() {
      send('warn', arguments)
      prev.warn && prev.warn.apply(window, arguments)
    },
    restore: function() {
      socket && socket.disconnect()
      window.console = prev
    }
  }
}

function initialize() {
  if (!window.console) return

  socket = socketIO('http://' + host + ':' + port)
    .on('error', function (data) {
      console.log('Error: failed to connect to remote javascript console server')
    })
    .on('connect', function () {
      console.log('Remote console sender is connected to http://' + host + ':' + port)
    })

  overrideConsole()
}

initialize()
