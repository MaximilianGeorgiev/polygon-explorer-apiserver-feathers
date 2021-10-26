const WebSocketServer = require('websocket').server;
const wsResolver = require('./wspathresolver.js');
const http = require('http');

// WS Server
const server = http.createServer();
server.listen(9898);

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    console.log('connected');

    connection.on('message', function(message) {
      const parsedMessage = message.utf8Data.split("/");
      console.log(parsedMessage);
      wsResolver.resolvePath(connection, parsedMessage);
    });

    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});