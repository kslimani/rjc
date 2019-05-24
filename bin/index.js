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
  { name: 'url', alias: 'u', type: String, description: 'Proxy server redirect url.', defaultValue: config.url },
]

var options = {}

try {
  options = commandLineArgs(optionList)
} catch (e) {
  // Assume e is UNKNOWN_OPTION error
  options.help = true
}

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
options.url && (config.url = options.url) || (config.url = options.scheme + options.host + ':' + options.port)

server.create(config)
  .listen(config.port, config.host, () => {
    console.log('Remote Javascript console server listening on ' + config.scheme + config.host + ':' + config.port)
  })
