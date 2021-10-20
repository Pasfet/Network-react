const fs = require('fs');
const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('/images/profile/:uid/avatar/:photoName', (req, res) => {
  if (req.params.photoName === 'null') {
    res.sendFile(path.join(__dirname, '..', '..', 'images' , 'profile', 'default_avatar.jpeg'))
  }
  // fs.readdir(`images/profile/${req.params.uid}/avatar`, (err, data) => {
  //   if (err) {
  //     res.sendFile(path.join(__dirname, '..', '..', 'images' , 'profile', 'default_avatar.jpeg'))
  //   } else { 
  //     res.sendFile(path.join(__dirname, '..', '..', 'images' , 'profile', `${req.params.uid}`, 'avatar', `${req.params.photoName}`))
  //   }
  // })
});

module.exports = router;