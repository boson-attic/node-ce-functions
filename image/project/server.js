'use strict';

const path = require('path');
const framework = require('@redhat/faas-js-runtime');

const userPath = path.join(`${__dirname}`, 'user-app');
const LISTEN_PORT = process.env.LISTEN_PORT || 8080;

let server;

module.exports.close = function close() {
  if (server) server.close();
}

try {
  framework(require(userPath), LISTEN_PORT, srv => {
    console.log('FaaS framework initialized');
    server = srv;
  });
} catch (err) {
  console.error(`Cannot load user function at ${userPath}`);
  throw err;
}
