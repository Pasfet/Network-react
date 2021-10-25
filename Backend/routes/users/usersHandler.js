const fs = require('fs');

const {getUsersList} = require('./usersActions');

const handler = (req, res, action, file) => {
  switch (action) {
    case 'GET':
    fs.readFile(file, (err, data) => {
      if (err) {
        res.sendStatus(404, JSON.stringify({result: 1, text: err}));
      } else {
        const usersList = getUsersList(JSON.parse(data), req);

        if (usersList) {
          res.send(JSON.stringify({result: 0, users: usersList.usersList, page_length: usersList.page_length, last_page: usersList.last_page}));
        } else {
          res.send(JSON.stringify({result: 2, text: 'Пусто', type: 'get-users-list'}));
        }
      }
    });
    break;

    default:
      break;
  }
}

module.exports = handler;