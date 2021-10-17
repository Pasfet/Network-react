const fs = require('fs');
const profileActions = require('./profileActions');
const {GET_USER, GET_FULL_USERS, SET_STATUS, SET_ABOUT} = require('../types/profileTypes');

const actions = {
  GET_USER: profileActions.getUser,
  GET_FULL_USERS: profileActions.getFullUsers,
  SET_STATUS: profileActions.setStatus,
  SET_ABOUT: profileActions.setAboutUser
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
            res.send(JSON.stringify({result: 2, text: 'Такой пользователь не найден', type: 'profile'}))
          }
        }
      });
      break;
    case SET_STATUS:
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}))
        } else {
          const usersList = actions[action](JSON.parse(data), req);
          if (usersList) {
            fs.writeFile(file, usersList, (err, data) => {
              if (err) {
                res.sendStatus(404, JSON.stringify({result: 1, text: err}))
              } else {
                res.send(JSON.stringify({result: 0, text: 'Статус изменен!'}));
              }
            })
          } else {
            res.send(JSON.stringify({result: 2, text: 'Ошибка', type: 'profile'}));
          }
        }
      })
      break;
    case SET_ABOUT:
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}))
        } else {
          const usersList = actions[action](JSON.parse(data), req);
          if (usersList) {
            fs.writeFile(file, usersList, (err, data) => {
              if (err) {
                res.sendStatus(404, JSON.stringify({result: 1, text: err}))
              } else {
                res.send(JSON.stringify({result: 0, text: 'Сохранено!'}));
              }
            })
          } else {
            res.send(JSON.stringify({result: 2, text: 'Ошибка', type: 'edit-profile'}));
          }
        }
      })
      break
      default:
      break;
  }
}

module.exports = handler;