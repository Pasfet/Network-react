const fs = require('fs');
const { getUser, patchUser } = require('./profileActions');

const handler = (req, res, action, file) => {
  switch (action) {
    case 'GET':
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}));
        } else {
          const user = getUser(JSON.parse(data), req);

          if (user) {
            res.send(JSON.stringify({result: 0, user}));
          } else {
            res.send(JSON.stringify({result: 2, text: 'Пользователь не найден'}));
          }
        }
      });
      break;
    case 'PATCH': 
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}));
        } else {
          const usersList = patchUser(JSON.parse(data), req);

          if (usersList) {
            fs.writeFile(file, usersList, (err) => {
              if (err) {
                res.sendStatus(404, JSON.stringify({result: 1, text: err}));
              } else {
                res.send(JSON.stringify({result: 0, text: 'Обновлено!'}));
              }
            })
          } else {
            res.send(JSON.stringify({result: 2, text: 'Ошибка'}))
          }
        }
      });
    break;
    default:
      break;
  }
}

module.exports = handler;