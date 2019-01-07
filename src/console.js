// Remote Javascript console sender
const sender = require('./sender')

var url = window.rjc && window.rjc.url ? window.rjc.url : '{url}'

sender.create(url)
