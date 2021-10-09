const http = require("http");
const express = require( "express");
const WebSocket = require( "ws");
const chatHandler = require("./wsChatHandler");
const app = express();

const server = http.createServer(app);


const webSocketServer = new WebSocket.Server({ server });
const clients = new Set();

const dispatchEvent = (message, ws) => {
    const json = JSON.parse(message);

    switch (json.event) {
        case "chat-message":
          const msg = chatHandler(json.payload, 'DB/Messages.json', 'DB/Users.json');
          for (let key in clients) {
            clients[key].send(JSON.stringify(msg));
          }
          console.log(Object.keys(clients))
          // webSocketServer.clients.forEach(client => {
            // const msg = chatHandler(json.payload, 'DB/Messages.json', 'DB/Users.json');
            // client.send(JSON.stringify(msg));
          // });
          // webSocketServer.clients.forEach(client => {
          //   console.log("CLIENTS");
          //   const msg = chatHandler(json.payload, 'DB/Messages.json', 'DB/Users.json');
          //   client.send(JSON.stringify(msg));
          // });
          break;
        default: ws.send((new Error(JSON.stringify("Wrong query"))).message);
    }
}

webSocketServer.on('connection', ws => {
    const id = Math.random();
    clients[id] = ws;
    console.log('создал', id)
    ws.on('message', m => dispatchEvent(m, ws));
    ws.on("error", e => ws.send(e));
    ws.on('close', () => {
      console.log('ЗАКРЫЛИ')
      clients.delete(ws);
    })
});

server.listen(8999, () => console.log("Server started"))
