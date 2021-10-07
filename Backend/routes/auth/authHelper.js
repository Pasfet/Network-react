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
      user_chats: {}
    }
  }
 // const newUser = {
  //   [`user${usersKeys.length + 1}`]: {
  //     uid: usersKeys.length + 1,
  //     user_email: email,
  //     user_name: name,
  //     password: password,
  //     user_friends: [],
  //     user_chats: {},    
  //   }
  // }
}

module.exports = {
  createUser,
  generateRandomId,
}