const fs = require('fs');
const {getPosts, writePost, deletePost} = require('./postsActions');

const handler = (req, res, action, file) => {
  switch (action) {
    case 'GET':
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({text: err, result: 1}));
        } else {
          const posts = getPosts(JSON.parse(data), req);
          if (posts) {
            res.send(JSON.stringify({posts, result: 0}));
          } else {
            res.send(JSON.stringify({text: 'Нет постов', result: 2}));
          }
        }
      });
      break;
    case 'POST':
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({text: err, result: 1}));
        } else {
          const posts = writePost(JSON.parse(data), req);

          fs.writeFile(file, posts, err => {
            if (err) {
              res.sendStatus(404, JSON.stringify({result: 1, text: err}));
            } else {
              res.send(JSON.stringify({result: 0, text: 'Отправлено!'}));
            }
          });
        }
      });
    break;
    case 'DELETE':
      fs.readFile(file, (err, data) => {
        if (err) {
          res.sendStatus(404, JSON.stringify({text: err, result: 1}));
        } else {
          const posts = deletePost(JSON.parse(data), req);

          if (posts) {
            fs.writeFile(file, posts, err => {
              if (err) {
                res.sendStatus(404, JSON.stringify({result: 1, text: err}))
              } else {
                res.send(JSON.stringify({result: 0, text: 'Удалено'}));
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