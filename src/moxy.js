'use strict';

const httpProxy = require('http-proxy');

module.exports = class Moxy {
  static createProxyServer(options) {
    return httpProxy.createProxyServer(options);
  }
};
