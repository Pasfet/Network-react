const { createUser, generateRandomId } = require('./authHelper');

const logIn = (usersList, req) => {
  const {email, password} = req.body;
  const {users} = usersList;
  const usersKeys = Object.keys(users);

  for (let i = 0; i < usersKeys.length; i++) {
    if (users[usersKeys[i]].user_email === email && users[usersKeys[i]].password === password) {
      return users[usersKeys[i]].uid;
    }
  }
  return null;
};

const signUp = (usersList, req) => {
  const {email, password, name} = req.body;
  const {users} = usersList;
  const usersKeys = Object.keys(users);
  
  for (let i = 0; i < usersKeys.length; i++) {
    if (users[usersKeys[i]].user_email === email) {
      return null;
    }
  }

  const id = generateRandomId();
  const newUser = createUser(id, email, password, name);

  const newUsersList = {
    users: {
      ...users,
      ...newUser
    }
  }

  return JSON.stringify(newUsersList, null, 2);
}

module.exports = {
  logIn,
  signUp,
};
