const express = require('express')
const app = express()
const http = require("http");
const wss = require('ws');

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const ws = new wss.Server({ server });
let CLIENTS=[];
const webSocket = new wss.Server({ port: 8080 });

webSocket.on('connection', function connection(ws) {
  CLIENTS.push(ws);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    CLIENTS[message.recipient].send(message);
  });

  ws.send(JSON.stringify({recipient: CLIENTS.length-1}));
});


server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});