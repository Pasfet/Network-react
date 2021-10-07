const {SEARCH_CHAT, GET_CHATS, ADD_CHAT, DELETE_CHAT, GET_MESSAGES, SEND_MESSAGE} = require('../types/dialogsTypes');
const { Router } = require('express');
const router = Router();
const dialogsHandler = require('./dialogsHandler');

router.get('/dialogs', (req, res) => {
  dialogsHandler(req, res, SEARCH_CHAT, 'DB/Users.json');
});

router.get('/dialogs/:uid', (req, res) => {
  dialogsHandler(req, res, GET_CHATS, 'DB/Users.json');
});


router.post('/dialogs', (req, res) => {
  dialogsHandler(req, res, ADD_CHAT, 'DB/Users.json');
});

router.patch('/dialogs', (req, res) => {
  dialogsHandler(req, res, DELETE_CHAT, 'DB/Users.json');
});

router.get('/dialogs/:uid/:chatId', (req, res) => {
  dialogsHandler(req, res, GET_MESSAGES, 'DB/Users.json');
});

router.post('/dialogs/:uid', (req, res) => {
  dialogsHandler(req, res, SEND_MESSAGE, 'DB/Users.json');
});

module.exports = router;