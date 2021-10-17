const generateRandomId = () => {
  return (Math.floor((1 + Math.random()) * 0x50000000).toString(16)).substring(1);
}

const createUser = (id, email, password, name) => {
  return {
    [id]: {
      uid: id,
      user_email: email,
      password,
      user_name: name,
      user_friends: [],
      status: ""
    }
  }
}

module.exports = {
  createUser,
  generateRandomId,
}