const { Router } = require('express');
const authHandler = require('./authHandler');
const {LOG_IN, SIGN_UP} = require('../types/authTypes');

const router = Router();

router.post(`/login`, (req, res) => {
  authHandler(req, res, LOG_IN, 'DB/Users.json');
});
router.post(`/signup`, (req, res) => {
  authHandler(req, res, SIGN_UP, 'DB/Users.json');
});

module.exports = router;
