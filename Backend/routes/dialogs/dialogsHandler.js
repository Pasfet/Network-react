const fs = require('fs');
const {SEARCH_CHAT, GET_CHATS, ADD_CHAT, DELETE_CHAT, GET_MESSAGES, SEND_MESSAGE} = require('../types/dialogsTypes');
const dialogsAction = require('./dialogsActions');

const actions = {
  SEARCH_CHAT: dialogsAction.getUsersName,
  GET_CHATS: dialogsAction.getChats,
  GET_MESSAGES: dialogsAction.getMessages,
  ADD_CHAT: dialogsAction.addChat,
  DELETE_CHAT: dialogsAction.deleteChat,
  SEND_MESSAGE: dialogsAction.sendMessage,
}

const handler = (req, res, action, file) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 1, text: err}));
    } else {
      switch (action) {
        case SEARCH_CHAT:
          const resultSearch = actions[action](JSON.parse(data), req);
          if (resultSearch) {
            res.send(JSON.stringify({result: 0, users: resultSearch}))
          } else {
            res.send(JSON.stringify({result: 2, text: 'Ничего не найдено'}))
          }
          break;
        case GET_CHATS:
          const chats = actions[action](JSON.parse(data), req);
          if (chats) {
            res.send(JSON.stringify({result: 0, chats}));
          } else {
            res.send(JSON.stringify({result: 2, text: 'Пусто'}))
          }
        break;
        case GET_MESSAGES:
          const messages = actions[action](JSON.parse(data), req);
          if (messages) {
            res.send(JSON.stringify({result: 0, messages}));
          } else {
            res.send(JSON.stringify({result: 0, text: 'Пусто'}));
          }
          break;
        case ADD_CHAT:
          const newUsers = actions[action](JSON.parse(data), req);
          if (newUsers) {
            fs.writeFile(file, newUsers, (err) => {
              if (err) {
                res.sendStatus(404, JSON.stringify({result: 1, text: err}))
              } else {
                res.send(JSON.stringify({result: 0, text: 'Успешно!'}))
              }
            })
          } else {
            res.send(JSON.stringify({result: 2, text: 'Уже добавлено'}))
          }
        break;
        case DELETE_CHAT:
          const newUsersList = actions[action](JSON.parse(data), req);
          fs.writeFile(file, newUsersList, (err) => {
            if (err) {
              res.sendStatus(404, JSON.stringify({result: 1, text: err}));
            } else {
              res.send(JSON.stringify({result: 0, text: 'Успешно'}))
            }
          });
        break;
        case SEND_MESSAGE:
          const newMessage = actions[action](JSON.parse(data), req);
          fs.writeFile(file, newMessage, (err) => {
            if (err) {
              res.sendStatus(404, JSON.stringify({result: 1, text: err}));
            } else {
              res.send(JSON.stringify({result: 0, text: 'Успешно'}))
            }
          })
        break;
        default:
          break;
      }
    }
  })
}

module.exports = handler;
