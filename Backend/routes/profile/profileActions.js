const getUser = (usersList, req) => {
  const {users} = usersList;
  const {uid} = req.params;

  if (!users[uid]) return null;

  const getUserResponse = {
    uid: users[uid].uid,
    user_name: users[uid].user_name,
    avatar: users[uid].avatar,
    user_friends: users[uid].user_friends,
    status: users[uid].status,
    about: users[uid].about,
  }

  return getUserResponse;
}

const patchUser = (usersList, req) => {
  const {users} = usersList;
  const {uid} = req.params;
  const {change} = req.body

  if (!users[uid]) return null;

  const newUsersList = {
    users: {
      ...users,
      [uid]: {
        ...users[uid],
        ...change
      }
    }
  };

  return JSON.stringify(newUsersList, null, 2)
}

module.exports = {
  getUser,
  patchUser
}