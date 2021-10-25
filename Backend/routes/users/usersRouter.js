const { Router } = require('express');
const router = Router();
const usersHandler = require('./usersHandler');


router.get('/users', (req, res) => {
  usersHandler(req, res, 'GET', 'DB/Users.json');
});


module.exports = router;