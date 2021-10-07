const getUser = (usersList, req) => {
  const {users} = usersList;
  const {uid} = req.params;

  if (users[uid]) {
    return {
      name: users[uid]?.user_name
    };
  } else {
    return null;
  }
}

const getFullUsers = usersList => {
  return JSON.stringify(usersList);
}

module.exports = {
  getUser,
  getFullUsers,
}