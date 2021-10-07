const { Router } = require('express');
const router = Router();
const dialogsHandler = require('./dialogsHandler');

router.get('/dialogs', (req, res) => {
  dialogsHandler(req, res, 'search', 'DB/Users.json');
});

router.get('/dialogs/:uid', (req, res) => {
  dialogsHandler(req, res, 'getChats', 'DB/Users.json');
});


router.post('/dialogs', (req, res) => {
  dialogsHandler(req, res, 'addChat', 'DB/Users.json');
});

router.patch('/dialogs', (req, res) => {
  dialogsHandler(req, res, 'deleteChat', 'DB/Users.json');
});

router.get('/dialogs/:uid/:chatId', (req, res) => {
  dialogsHandler(req, res, 'getMessages', 'DB/Users.json');
});

router.post('/dialogs/:uid', (req, res) => {
  dialogsHandler(req, res, 'sendMessage', 'DB/Users.json');
});

module.exports = router;