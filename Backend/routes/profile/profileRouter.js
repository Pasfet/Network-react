const { Router } = require('express');
const router = Router();
const profileHandler = require('./profileHandler');
const {GET_USER, GET_FULL_USERS} = require('../types/profileTypes');

router.get('/users', (req, res) => {
  profileHandler(req, res, GET_FULL_USERS, 'DB/Users.json');
});

router.get('/profile/:uid', (req, res) => {
  profileHandler(req, res, GET_USER, 'DB/Users.json');
});

module.exports = router;