const ws = require('ws');
const chatHandler = require('./wsChatHandler');

const wss = new ws.Server({
  port: 8999
}, () => console.log(`WebSocket server on 8999 port`));

const rooms = {};

wss.on('connection', ws => {
  const id = Date.now();

  const leave = room => {
    if (!rooms[room][id]) return;

    if (Object.keys(rooms[room]).length === 1) {
      delete rooms[room];
    } else {
      delete rooms[room][id]
    }
  }

  ws.on('message', message => {
    const {event, payload, uidRoom} = JSON.parse(message);
    switch (event) {
      case 'connection': 
        if (!rooms[uidRoom]) rooms[uidRoom] = {}; //crate room
        if (!rooms[uidRoom][id]) rooms[uidRoom][id] = ws; //connection
        break;
      case 'leave':
        leave(uidRoom);
        break;
      case 'chat-message':
        const msg = chatHandler(payload, 'DB/Messages.json', 'DB/Users.json');
        Object.entries(rooms[uidRoom]).forEach(([_, client]) => {
          client.send(JSON.stringify(msg));
        });
        break;
      default:
        break;
    }
  })
})
