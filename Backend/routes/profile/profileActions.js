const getUser = (usersList, req) => {
  const {users} = usersList;
  const {uid} = req.params;

  if (users[uid]) {
    return {
      name: users[uid]?.user_name,
      status: users[uid]?.status,
      about: users[uid]?.about
    };
  } else {
    return null;
  }
}

const getFullUsers = usersList => {
  return JSON.stringify(usersList);
}

const setStatus = (usersList, req) => {
  const {users} = usersList;
  const {uid} = req.params;
  const {status} = req.body;

  if (!users[uid]) return null;

  users[uid].status = status;
  
  return JSON.stringify(usersList, null, 2);
}

const setAboutUser = (usersList, req) => {
  const {users} = usersList;
  const {uid} = req.params;
  const {about} = req.body;


  if (!users[uid]) return null;

  users[uid] = {...users[uid],...about};
  
  return JSON.stringify(usersList, null, 2);
}

module.exports = {
  getUser,
  getFullUsers,
  setStatus,
  setAboutUser
}