const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('/images/profile/:uid/avatar/:photoName', (req, res) => {
  if (req.params.photoName === 'null') {
    res.sendFile(path.join(__dirname, 'images' , 'profile', 'default_avatar.jpeg'))
  }
});

module.exports = router;