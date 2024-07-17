// --------------------------------------SERVER_CONFIG
const express = require('express');
const expressWs = require('express-ws');
const server = express();
const serverWs = expressWs(server);
// For broadcast messages to all connected clients.
const aWss = serverWs.getWss();

server.ws('/', (ws, res) => {
	ws.send('Hello!');
});

// --------------------------------------EXPORT
module.exports = { server };
