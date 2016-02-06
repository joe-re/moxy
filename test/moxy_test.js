'use strict';

const request = require('superagent');
const assert = require('power-assert');
const http = require('http');
const moxy = require('../src/moxy');

const targetServerPort = 9998;
const moxyPort = 9999;

http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
}).listen(targetServerPort, '127.0.0.1');

describe('Moxy', function () {
  context('normally case.', () => {
    beforeEach(() => {
      moxy.createProxyServer({ target: `http://127.0.0.1:${targetServerPort}` }).listen(moxyPort);
    });
    it('gets response data the same as response of target server.', (done) => {
      request.get('http://127.0.0.1:9999').
        end((_err, res) => {
          assert.equal(res.text, 'Hello World');
          done();
        });
    });
  });
});
