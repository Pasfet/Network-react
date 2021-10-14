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

const handler = (req, res, action, file, fileUsers = null) => {
fs.readFile(file, (err, data) => {
  if (err) {
    res.sendStatus(404, JSON.stringify({result: 1, text: err}));
  } else {
    switch (action) {
      case SEARCH_CHAT: 
        fs.readFile(fileUsers, (err, users) => {
          if (err) {
            res.sendStatus(404, JSON.stringify({result: 1, text: err}));
          } else {
            const resultSearch = actions[action](JSON.parse(users), req);
            if (resultSearch) {
              res.send(JSON.stringify({result: 0, users: resultSearch}))
            } else {
              res.send(JSON.stringify({result: 2, text: 'Ничего не найдено', type: 'search-chats', code: 2}))
            }
          }
        });
        break;
      case GET_CHATS:
        const chats = actions[action](JSON.parse(data), req);
        if (chats) {
          res.send(JSON.stringify({result: 0, chats}));
        } else {
          res.send(JSON.stringify({result: 2, type: 'chats', text: 'Пока нет чатов', code: 3}))
        }
      break;
      case ADD_CHAT:
        fs.readFile(fileUsers, (err, users) => {
          if (err) {
            res.sendStatus(404, JSON.stringify({result: 1, text: err}))
          } else {
            const newMessagesList = actions[action]( JSON.parse(users), JSON.parse(data), req);
            if (newMessagesList) {
              fs.writeFile(file, newMessagesList, (err) => {
                if (err) {
                  res.sendStatus(404, JSON.stringify({result: 1, text: err}))
                } else {
                  res.send(JSON.stringify({result: 0, text: 'Успешно!', type: 'chats'}))
                }
              })
            } else {
              res.send(JSON.stringify({result: 2, text: 'Уже добавлено', type: 'chats'}))
            }
          }
        })
      break;
      case DELETE_CHAT:
        const newMessagesList = actions[action](JSON.parse(data), req);
        fs.writeFile(file, newMessagesList, (err) => {
          if (err) {
            res.sendStatus(404, JSON.stringify({result: 1, text: err}));
          } else {
            res.send(JSON.stringify({result: 0, text: 'Успешно', type: 'chats'}))
          }
        });
      break;
      case GET_MESSAGES:
        const messagesList = actions[action](JSON.parse(data), req);
        if (messagesList) {
          res.send(JSON.stringify({result: 0, payload: messagesList}));
        } else {
          res.send(JSON.stringify({result: 2, type: 'messages', text: 'Пока нет сообщений', code: 3}));
        }
        break;
      default:
        break;
    }
  }
  })
}

module.exports = handler;
