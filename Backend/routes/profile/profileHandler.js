const fs = require('fs');
const profileActions = require('./profileActions');
const {GET_USER, GET_FULL_USERS} = require('../types/profileTypes');

const actions = {
  GET_USER: profileActions.getUser,
  GET_FULL_USERS: profileActions.getFullUsers,
}

const handler = (req, res, action, file) => {
  switch (action) {
    case GET_FULL_USERS:
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}));
        } else {
          const users = actions[action](JSON.parse(data)); 
          res.send(users)
        }
      });
      break;
    case GET_USER:
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}))
        } else {
          const user = actions[action](JSON.parse(data), req);
          if (user) {
            res.send(JSON.stringify({result: 0, user: user}));
          } else {
            res.send(JSON.stringify({result: 2, text: 'Такой пользователь не найден'}))
          }
        }
      });
      break;
    default:
      break;
  }
}

module.exports = handler;