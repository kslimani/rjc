// Remote Javascript console receiver
const receiver = require('./receiver')

var host = window.rjc && window.rjc.host ? window.rjc.host : '{host}'
var port = window.rjc && window.rjc.port ? window.rjc.port : '{port}'
var scheme = window.rjc && window.rjc.scheme ? window.rjc.scheme : '{scheme}'

receiver.create(scheme + host + ':' + port)
