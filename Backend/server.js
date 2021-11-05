const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const fs = require('fs');
const https = require('https');
const path = require('path');

const privateKey  = fs.readFileSync(path.join(__dirname, 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'server.cert'), 'utf8');

const credentials = {key: privateKey, cert: certificate};
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

app.options('*', cors());

app.use(auth);
app.use(profile);
app.use(dialogs);
app.use(images);
app.use(friends);
app.use(users);
app.use(posts);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3001, () => console.log('API server listening on port 3001'))

// app.listen(3001, () => console.log('API server listening on port 3001'));