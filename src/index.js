// Remote Javascript console server (node.js)
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const rootPath = '../public/'

function render(str, params) {
  for (var prop in params) {
    str = str.replace(new RegExp('{' + prop + '}', 'g'), params[prop])
  }

  return str
}

function content(data, params, file, withCache) {
  if (withCache && data) return data

  data = render(
    fs.readFileSync(path.resolve(__dirname, rootPath + file), 'utf8'),
    params
  )

  return data
}

exports.defaultConfig = function () {
  return {
    host: '127.0.0.1',
    nocache: false,
    port: 8080,
    scheme: 'http://',
    url: null
  }
}

exports.create = function (config) {
  var home, test, rjc, jc

  var params = {
    url: config.url
  }

  var withCache = !config.nocache

  const server = http.createServer(
    express()
      .use(cors({origin: true}))
      .get('/', (req, res) => res.send(home = content(home, params, 'index.jst', withCache)))
      .get('/test', (req, res) => res.send(test = content(test, params, 'test.jst', withCache)))
      .get('/rjc.min.js', (req, res) => res.set('Content-Type', 'application/javascript').send(rjc = content(rjc, params, 'rconsole.min.jst', withCache)))
      .get('/console.js', (req, res) => res.set('Content-Type', 'application/javascript').send(jc = content(jc, params, 'console.min.jst', withCache)))
      .get('/favicon.ico', (req, res) => res.sendFile(path.resolve(__dirname, rootPath + 'favicon.ico')))
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
