const express = require('express');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
};
const server = express();
server.use(cors(corsOptions));
const expressWs = require('express-ws')(server);
const aWss = expressWs.getWss();
const router = require('./router/router.js');
const canvasStateListHandler = require('./services/canvasStateListHandler.js');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/api/v1', router);

const broadcastHandler = (msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.sessionId) {
      client.send(JSON.stringify(msg));
    }
  });
};

const connectionHandler = (ws, msg) => {
  // eslint-disable-next-line no-console
  console.log(`User: ${msg.username} was connected to the server. Session ID: ${msg.sessionId}.`);
  ws.id = msg.sessionId;
  broadcastHandler(msg);
};

server.ws('/', (ws) => {
  ws.on('message', (message) => {
    const msg = JSON.parse(message);
    switch (msg.type) {
      case 'connection':
        connectionHandler(ws, {
          ...msg,
          canvasCommonUndoStateList: canvasStateListHandler.commonUndoStateList[msg.sessionId] ?? []
        });
        break;
      case 'draw':
        broadcastHandler(msg);
        break;
      case 'clear':
        broadcastHandler(msg);
        break;
      case 'commonUndoStateListSync':
        if (msg.sessionId in canvasStateListHandler.commonUndoStateList) {
          canvasStateListHandler.pushToCommonUndoStateList(msg.sessionId, msg.canvasLastState);
        } else {
          canvasStateListHandler.setCommonUndoStateList(msg.sessionId, msg.canvasLastState);
        }
        broadcastHandler({
          ...msg,
          canvasCommonUndoStateList: canvasStateListHandler.commonUndoStateList[msg.sessionId]
        });
        break;
      case 'undo':
        if (msg.sessionId in canvasStateListHandler.commonUndoStateList) {
          canvasStateListHandler.popFromCommonUndoStateList(msg.sessionId);
        }
        broadcastHandler(msg);
        break;
      case 'redo':
        canvasStateListHandler.pushToCommonUndoStateList(
          msg.sessionId,
          msg.canvasRedoStateList[msg.canvasRedoStateList.length - 1]
        );
        broadcastHandler(msg);
        break;
      default:
        break;
    }
  });
});

server.all('*', async (req, res) => {
  res.status(404);
  res.end();
});

module.exports = server;
