let express = require('express');
let serverRouter = require('./routes/route-mon-server');
let server = express();

server.use(serverRouter);

module.exports = server;
