const { Router } = require('express');
const authHandler = require('./authHandler');

const router = Router();

router.post(`/login`, (req, res) => {
  authHandler(req, res, 'logIn', 'DB/Users.json');
});
router.post(`/signup`, (req, res) => {
  authHandler(req, res, 'signUp', 'DB/Users.json');
});

module.exports = router;
