const { Router } = require('express');
const router = Router();
const profileHandler = require('./profileHandler');


router.get('/profile/:uid', (req, res) => {
  profileHandler(req, res, 'GET', 'DB/Users.json');
});

router.patch('/profile/:uid', (req, res) => {
  profileHandler(req, res, 'PATCH', 'DB/Users.json');
});

module.exports = router;