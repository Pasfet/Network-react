const { Router } = require('express');
const router = Router();
const postsHandler = require('./postsHandler');


router.get('/posts', (req, res) => {
  postsHandler(req, res, 'GET', 'DB/Posts.json');
});

router.post('/posts', (req, res) => {
  postsHandler(req, res, 'POST', 'DB/Posts.json');
});

router.delete('/posts', (req, res) => {
  postsHandler(req, res, 'DELETE', 'DB/Posts.json');
});

module.exports = router;