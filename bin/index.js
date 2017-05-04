#!/usr/bin/env node

const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const server = require('../src/index')

var config = server.defaultConfig()

const optionList = [
  { name: 'help', alias: 'h', type: Boolean, description: 'Display this usage help.' },
  { name: 'host', alias: 'a', type: String, description: 'Server ip address or hostname.', defaultValue: config.host },
  { name: 'nocache', alias: 'n', type: Boolean, description: 'Disable render cache.' },
  { name: 'port', alias: 'p', type: Number, description: 'Server port number.', defaultValue: config.port },
  { name: 'scheme', alias: 's', type: String, description: 'Server scheme.', defaultValue: config.scheme },
]

const options = commandLineArgs(optionList)

if (options.help) {
  console.log(commandLineUsage([
    {
      header: 'rjc',
      content: 'Yet another remote Javascript console.',
    },
    {
      header: 'Options',
      optionList: optionList,
    }
  ]))
  process.exit()
}

options.host && (config.host = options.host)
options.port && (config.port = options.port)
options.nocache && (config.nocache = true)
options.scheme && (config.scheme = options.scheme)

server.create(config)
  .listen(config.port, config.host, () => {
    console.log('Remote Javascript console server listening on ' + config.scheme + config.host + ':' + config.port)
  })
