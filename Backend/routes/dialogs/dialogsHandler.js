const fs = require('fs');
const dialogsAction = require('./dialogsActions');

const actions = {
  search: dialogsAction.getUsersName,
  getChats: dialogsAction.getChats,
  getMessages: dialogsAction.getMessages,
  addChat: dialogsAction.addChat,
  deleteChat: dialogsAction.deleteChat,
  sendMessage: dialogsAction.sendMessage,
}

const handler = (req, res, action, file) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 1, text: err}));
    } else {
      switch (action) {
        case 'search':
          const resultSearch = actions[action](JSON.parse(data), req);
          if (resultSearch) {
            res.send(JSON.stringify({result: 0, users: resultSearch}))
          } else {
            res.send(JSON.stringify({result: 2, text: 'Ничего не найдено'}))
          }
          break;
        case 'getChats':
          const chats = actions[action](JSON.parse(data), req);
          if (chats) {
            res.send(JSON.stringify({result: 0, chats}));
          } else {
            res.send(JSON.stringify({result: 2, text: 'Пусто'}))
          }
        break;
        case 'getMessages':
          const messages = actions[action](JSON.parse(data), req);
          if (messages) {
            res.send(JSON.stringify({result: 0, messages}));
          } else {
            res.send(JSON.stringify({result: 0, text: 'Пусто'}));
          }
          break;
        case 'addChat':
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
        case 'deleteChat':
          const newUsersList = actions[action](JSON.parse(data), req);
          fs.writeFile(file, newUsersList, (err) => {
            if (err) {
              res.sendStatus(404, JSON.stringify({result: 1, text: err}));
            } else {
              res.send(JSON.stringify({result: 0, text: 'Успешно'}))
            }
          });
        break;
        case 'sendMessage':
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
