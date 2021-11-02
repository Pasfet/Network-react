const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const app = express();

const auth = require('./routes/auth/authRouter');
const profile = require('./routes/profile/profileRouter');
const dialogs = require('./routes/dialogs/dialogsRouter');
const images = require('./routes/images/imagesRouter');
const friends = require('./routes/friends/friendsRouter');
const users = require('./routes/users/usersRouter');
const posts = require('./routes/posts/postsRouter');

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(auth);
app.use(profile);
app.use(dialogs);
app.use(images);
app.use(friends);
app.use(users);
app.use(posts);


module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}
