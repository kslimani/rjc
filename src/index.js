// Remote Javascript console server (node.js)
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')
const receiver = require('./receiver')
const sender = require('./sender')

function render(str, data) {
  for (var prop in data)
    str = str.replace(new RegExp('{' + prop + '}', 'g'), data[prop])

  return str
}

function content(data, config, file) {
  if (!config.nocache && data) return data

  data = render(
    fs.readFileSync(path.resolve(__dirname, '../public/' + file), 'utf8'),
    config
  )

  return data
}

exports.defaultConfig = function() {
  return {
    host: '127.0.0.1',
    nocache: false,
    port: 8080,
    scheme: 'http://',
  }
}

exports.create = function(config) {
  var home, test, rjc, jc

  const server = http.createServer(
    express()
      .use(cors({origin: true}))
      .get('/', (req, res) => res.send(home = content(home, config, 'index.jst') ))
      .get('/test', (req, res) => res.send(test = content(test, config, 'test.jst')))
      .get('/rjc.min.js', (req, res) => res.set('Content-Type', 'application/javascript').send(rjc = content(rjc, config, 'rconsole.min.js')))
      .get('/console.js', (req, res) => res.set('Content-Type', 'application/javascript').send(jc = content(jc, config, 'console.min.js')))
      .get('/favicon.ico', (req, res) => res.sendFile(path.resolve(__dirname, '../public/favicon.ico')))
  )

  const io = socketIO(server)
    .on('connection', (socket) => {
      console.log('[ %s ] connected', socket.id)
      socket
        .on('disconnect', () => console.log('[ %s ] disconnected', socket.id))
        .on('console', (data) => {
          io.emit('rconsole', data)
        })
    })

  return server
}

exports.receiver = receiver
exports.sender = sender
