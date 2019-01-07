// Remote Javascript console receiver
const receiver = require('./receiver')

var url = window.rjc && window.rjc.url ? window.rjc.url : '{url}'

receiver.create(url)
