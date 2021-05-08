'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('open', function open() {
  console.log('connected');
});

wss.on('close', function close() {
  console.log('disconnected');
});

server.listen(PORT, function() {
  console.log(`Server is listening on ${port}!`)
})

wss.on('connection', function connection(ws) {
  wss.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === Server.OPEN) {
        client.send(data);
      }
    });
	console.log(data);
  });
});