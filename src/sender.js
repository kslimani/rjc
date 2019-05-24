// Sender module
const socketIO = require('socket.io-client')
const Flatted = require('flatted/cjs')

exports.create = function (url, options) {
  if (!window.console) return null

  var socket, prev

  function cure(arr) {
    arr.forEach || (arr = Array.prototype.slice.call(arr))
    var cured = []

    arr.forEach(function (a) {
      try {
        Flatted.stringify(a)
        cured.push(a)
      } catch (e) {
        // Replace unserializable argument
        cured.push(['stringify_failed'])
      }
    })

    return cured
  }

  function send(f, d) {
    if (!socket) return

    try {
      d = Flatted.stringify(d)
    } catch (e) {
      // "best effort" serialization
      d = Flatted.stringify(cure(d))
    }

    try {
      socket.emit('console', {f: f, d: d})
    } catch (e) {
      socket.emit('console', {f: 'error', d: Flatted.stringify(['Remote console sender error: ' + e.message, e])})
    }
  }

  socket = socketIO(url, options)
    .on('error', function () {
      console.log('Error: failed to connect to remote javascript console server')
    })
    .on('connect', function () {
      console.log('Remote console sender is connected to ' + url)
    })

  prev = window.console

  window.console = {
    debug: function () {
      send('debug', arguments)
      prev.debug && prev.debug.apply(prev, arguments)
    },
    error: function () {
      send('error', arguments)
      prev.error && prev.error.apply(prev, arguments)
    },
    info: function () {
      send('info', arguments)
      prev.info && prev.info.apply(prev, arguments)
    },
    log: function () {
      send('log', arguments)
      prev.log && prev.log.apply(prev, arguments)
    },
    warn: function () {
      send('warn', arguments)
      prev.warn && prev.warn.apply(prev, arguments)
    },
    restore: function () {
      socket && socket.disconnect()
      window.console = prev
    }
  }

  return socket
}
