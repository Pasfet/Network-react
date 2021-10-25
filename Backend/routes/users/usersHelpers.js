const searchUsers = (users, regExp) => {
  return Object.entries(users).filter(user => regExp.test(user[1].user_name))
}

const getUsersPage = (users, startIndex, endIndex) => {
  const usersPage = users.slice(startIndex, endIndex);

  if (!usersPage.length) return null;

  return usersPage;
}

const createUser = (users) => {
  return users.map(user => ({user_name: user[1].user_name, uid: user[1].uid, avatar: user[1].avatar})); 
}

module.exports = {searchUsers, getUsersPage, createUser}