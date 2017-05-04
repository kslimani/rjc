// Remote Javascript console sender
const sender = require('./sender')

var host = window.rjc && window.rjc.host || '{host}'
var port = window.rjc && window.rjc.port || '{port}'
var scheme = window.rjc && window.rjc.scheme || '{scheme}'

sender.create(scheme + host + ':' + port)
