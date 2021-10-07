const {createChats, createMessage, copyUsersListWithNewChat, copyUsersListWithoutDeletedChat, copyWithNewMessage} = require('./dialogsHelper');

const getUsersName = (usersList, req) => {
  const {users} = usersList;
  const {searchChat, uid} = req.query;

  const regExp = new RegExp(searchChat, 'i');
  const resultSearch = Object.entries(users).filter(user => regExp.test(user[1].user_name) && user[0] !== uid);
  
  if (!resultSearch.length) {
    return null;
  } else {
    const result = resultSearch.map(user => ({user_name: user[1].user_name, uid: user[1].uid}))
    return result;
  }
}

const getChats = (usersList, req) => {
  const {users} = usersList;
  const {uid} = req.params;
  const result = users[uid].user_chats;

  if (result) {
    return result;
  }
  return null
}

const addChat = (usersList, req) => {
  const {users} = usersList;
  const {uid, user} = req.body;

  if (users[uid].user_chats[user.uid] || uid === user.uid) return null;

  const newChatAuthor = createChats(user.uid, user.user_name);
  const newChatRecipient = createChats(uid, users[uid].user_name);
  const newUsers = copyUsersListWithNewChat(users, uid, newChatAuthor, user.uid, newChatRecipient);
  const newUsersList = {
    users: {
      ...newUsers
    }
  };

  return JSON.stringify(newUsersList, null, 2);
}

const deleteChat = (usersList, req) => {
  const {uid, chatId} = req.body;
  const {users} = usersList;

  const chatsAuthor = Object.fromEntries(Object.entries(users[uid].user_chats).filter(chat => chat[0] !== chatId));
  const chatsRecipient = Object.fromEntries(Object.entries(users[chatId].user_chats).filter(chat => chat[0] !== `${uid}`));
  const newChatsList = copyUsersListWithoutDeletedChat(users, uid, chatsAuthor, chatId, chatsRecipient);
  const newUsersList = {
    users: {
      ...newChatsList
    }
  }
  return JSON.stringify(newUsersList, null, 2);
}

const getMessages = (usersList, req) => {
  const {uid, chatId} = req.params;
  const {users} = usersList;

  const messages = users[uid]?.user_chats[chatId].messages;
  if (!Object.entries(messages).length) {
    return null
  } else {
    return messages
  }
}

const sendMessage = (usersList, req) => {
  const {uid} = req.params;
  const {chatId, message} = req.body;
  const {users} = usersList;

  // const lengthMessages = users[uid].user_chats[chatId].messages.length;

  const newMessage = createMessage(uid, message, users[uid].user_name);
  const newUsers = copyWithNewMessage(users, uid, newMessage, chatId);
  const newUsersList = {
    users: {
      ...newUsers
    }
  }

  return JSON.stringify(newUsersList, null, 2);
}

module.exports = {
  getUsersName,
  getChats,
  getMessages,
  addChat,
  deleteChat,
  sendMessage
}