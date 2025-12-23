const http = require('http');
const fs = require('fs');
const routes = require('./routes.js')

const server = http.createServer(routes.handleResponse)

server.listen(3000);
