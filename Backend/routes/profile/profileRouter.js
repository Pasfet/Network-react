const { Router } = require('express');
const router = Router();
const profileHandler = require('./profileHandler');
const {GET_USER, GET_FULL_USERS, SET_STATUS, SET_ABOUT} = require('../types/profileTypes');

router.get('/users', (req, res) => {
  profileHandler(req, res, GET_FULL_USERS, 'DB/Users.json');
});

router.get('/profile/:uid', (req, res) => {
  profileHandler(req, res, GET_USER, 'DB/Users.json');
});

router.post('/profile/:uid', (req, res) => {
  profileHandler(req, res, SET_STATUS, 'DB/Users.json');
});

router.post('/profile/:uid/about', (req, res) => {
  profileHandler(req, res, SET_ABOUT, 'DB/Users.json');
})

module.exports = router;