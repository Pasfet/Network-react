const { Router } = require('express');
const router = Router();
const friendsHandler = require('./friendsHandler');

router.get('/friends/:uid', (req, res) => {
  friendsHandler(req, res, 'GET', 'DB/Users.json');
});

router.patch('/friends', (req, res) => {
  friendsHandler(req, res, 'PATCH', 'DB/Users.json');
});

router.delete('/friends', (req, res) => {
  friendsHandler(req, res, 'DELETE', 'DB/Users.json');
});

router.post('/friends', (req, res) => {
  friendsHandler(req, res, 'POST', 'DB/Users.json');
});

router.put('/friends', (req, res) => {
  friendsHandler(req, res, 'PUT', 'DB/Users.json')
})

module.exports = router;