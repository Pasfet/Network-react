const {searchUsers, getUsersPage, createUser} = require('./usersHelpers');

const getUsersList = (usersList, req) => {
  const {users} = usersList;
  const {perPage = 5, page = 1, name = ''} = req.query;

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const regExp = new RegExp(name, 'i');
  const resultSearch = searchUsers(users, regExp);
  if (!resultSearch.length) return null;
  
  const usersPage = getUsersPage(resultSearch, startIndex, endIndex);
  if (!usersPage) return null;

  const copyUsersList = createUser(usersPage);


  const last_page = Math.ceil(resultSearch.length / perPage);
  const page_length = copyUsersList.length;

  return {usersList: copyUsersList, page_length, last_page};
}

module.exports = {
  getUsersList
}