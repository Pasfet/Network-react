const fs = require('fs');
const {getUserFriends, sendRequestToFriendsList, deleteRequest, addToFriendsList, deleteFromFriendsList} = require('./friendsActions');

const handler = (req, res, action, file) => {
  switch (action) {
    case 'GET':
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}));
        } else {
          const userFriendsList = getUserFriends(JSON.parse(data), req);

          if (userFriendsList) {
            res.send(JSON.stringify({result: 0, friends: userFriendsList}))
          } else {
            res.send(JSON.stringify({result: 2, text: 'Ошибка'}))
          }
        }
      });
    break;
    case 'PATCH':
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}));
        } else {
          const usersList = sendRequestToFriendsList(JSON.parse(data), req);

          if (usersList) {
            fs.writeFile(file, usersList, err => {
              if (err) {
                res.sendStatus(404, JSON.stringify({result: 1, text: err}));
              } else {
                res.send(JSON.stringify({result: 0, text: 'Отправлено'}))
              }
            })
          } else {
            res.send(JSON.stringify({result: 2, text: 'Заявка уже отправлена'}))
          }
        }
      });
    break;
    case 'DELETE':
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}));
        } else {
          const usersList = deleteRequest(JSON.parse(data), req);

          if (usersList) {
            fs.writeFile(file, usersList, err => {
              if (err) {
                res.sendStatus(404, JSON.stringify({result: 1, text: err}));
              } else {
                res.send(JSON.stringify({result: 0, text: 'Удалено'}))
              }
            })
          } else {
            res.send(JSON.stringify({result: 2, text: 'Ошибка'}))
          }
        }
      });
    break;
    case 'POST':
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}));
        } else {
          const usersList = addToFriendsList(JSON.parse(data), req);

          if (usersList) {
            fs.writeFile(file, usersList, err => {
              if (err) {
                res.sendStatus(404, JSON.stringify({result: 1, text: err}));
              } else {
                res.send(JSON.stringify({result: 0, text: 'Добавлен в друзья'}))
              }
            })
          } else {
            res.send(JSON.stringify({result: 2, text: 'Уже в друзьях'}))
          }
        }
      });
    break;
    case 'PUT':
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}));
        } else {
          const usersList = deleteFromFriendsList(JSON.parse(data), req);

          if (usersList) {
            fs.writeFile(file, usersList, err => {
              if (err) {
                res.sendStatus(404, JSON.stringify({result: 1, text: err}));
              } else {
                res.send(JSON.stringify({result: 0, text: 'Удален из друзей'}))
              }
            })
          } else {
            res.send(JSON.stringify({result: 2, text: 'Уже был удален'}))
          }
        }
      });
    break;
    default:
      break;
  }
}

module.exports = handler;