const express = require('express');
const app = express();
const morgan = require('morgan');
var cors = require('cors')
const auth = require('./routes/auth/authRouter');
const profile = require('./routes/profile/profileRouter');
const dialogs = require('./routes/dialogs/dialogsRouter');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(auth);
app.use(profile);
app.use(dialogs);

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}
