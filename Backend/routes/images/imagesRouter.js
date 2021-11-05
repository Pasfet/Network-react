const { Router } = require('express');
const path = require('path');
const multer  = require('multer')
const router = Router();
const fs = require('fs');

const changeAvatar = (usersList, avatar, uid) => {
  const {users} = usersList;
  const res = {
    [uid]: {
      ...users[uid],
      avatar,
    }
  };

  const list = {
    users: {
      ...users,
      ...res
    }
  }

  return JSON.stringify(list, null, 2)
}

const pathDir = path.resolve(__dirname, 'images/profile');

const upload = multer({
  dest: pathDir
});

router.get('/images', (req, res) => {
  const {uid} = req.query;
  
  fs.readdir(pathDir, (err, files) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 1, text: err}))
    } else {
      const find = files.find(img => img.includes(`${uid}_avatar`));

      if (find) {
        res.sendFile(path.resolve(pathDir, find));
      } else {
        res.sendFile(path.resolve(pathDir, 'default_avatar.jpeg'));
      }
    }
  })
});



router.post('/images', upload.single('avatar'), (req, res) => {
  const {uid} = req.query;
  const tempPath = req.file.path;
  const imgName = req.file.originalname;
  const extName = /\.\w+$/.exec(imgName)[0];
  const newName = `${uid}_avatar${extName}`;

  fs.rename(tempPath, path.resolve(pathDir, newName), err => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 1, text: err}))
    }
  });
  const pathToUsersData = path.resolve('DB/Users.json');
    fs.readFile(pathToUsersData, (err, data) => {
      if (err) {
        res.sendStatus(404, JSON.stringify({result: 1, text: err}));
      }
      const copyList = changeAvatar(JSON.parse(data), newName, uid);

      fs.writeFile(pathToUsersData, copyList, err => {
        if (err) {
          res.sendStatus(404, JSON.stringify({result: 1, text: err}));
        }
      })
    })

    res.send(JSON.stringify({result: 0, text: 'Сохранено!'}));
})

module.exports = router;