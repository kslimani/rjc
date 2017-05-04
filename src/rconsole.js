// Remote Javascript console receiver
const receiver = require('./receiver')

var host = window.rjc && window.rjc.host || '{host}'
var port = window.rjc && window.rjc.port || '{port}'
var scheme = window.rjc && window.rjc.scheme || '{scheme}'

receiver.create(scheme + host + ':' + port)
