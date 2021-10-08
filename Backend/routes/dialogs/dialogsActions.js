const {createChats, createMessage, copyMessagesListWithNewChat, copyMessagesListWithoutDeletedChat, copyMessagesListWithNewMessage} = require('./dialogsHelper');

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

const getChats = (messagesList, req) => {
  const {uid} = req.params;
  const result = messagesList.messages[uid];

  if (result) {
    return result;
  }
  return null;
}

const addChat = (usersList, messagesList, req) => {
  const {users} = usersList;
  const {messages} = messagesList;
  const {uid, user} = req.body;

  if (messages?.uid?.user.uid || uid === user.uid) return null;

  const newChatAuthor = createChats(user.uid, user.user_name);
  const newChatRecipient = createChats(uid, users[uid].user_name);
  const newMessagesList = copyMessagesListWithNewChat(messages, uid, newChatAuthor, user.uid, newChatRecipient);

  const newMsg = {
    messages: {
      ...newMessagesList,
    }
  }

  return JSON.stringify(newMsg, null, 2);
}

const deleteChat = (messagesList, req) => {
  const {uid, chatId} = req.body;
  const {messages} = messagesList;

  const chatsAuthor = Object.fromEntries(Object.entries(messages[uid]).filter(chat => chat[0] !== chatId));
  const chatsRecipient = Object.fromEntries(Object.entries(messages[chatId]).filter(chat => chat[0] !== uid));
  const newChatsList = copyMessagesListWithoutDeletedChat(messages, uid, chatsAuthor, chatId, chatsRecipient);
  const newMessagesList = {
    messages: {
      ...newChatsList
    }
  }
  return JSON.stringify(newMessagesList, null, 2);
}

const getMessages = (messagesJson, req) => {
  const {uid, chatId} = req.params;
  const {messages} = messagesJson;

  const messagesList = messages[uid][chatId];

  const messagesRes = messagesList[uid][chatId]?.messages;
  if (!Object.entries(messagesRes).length) {
    return null;
  } else {
    return messagesRes;
  }
}

const sendMessage = (usersList, messagesList, req) => {
  const {uid} = req.params;
  const {chatId, message} = req.body;
  const {messages} = messagesList;
  const {users} = usersList;

  const newMessage = createMessage(uid, message, users[uid].user_name);
  const MessagesListCopy = copyMessagesListWithNewMessage(messages, uid, newMessage, chatId);
  const newMessagesList = {
    messages: {
      ...MessagesListCopy
    }
  }

  return JSON.stringify(newMessagesList, null, 2);
}

module.exports = {
  getUsersName,
  getChats,
  getMessages,
  addChat,
  deleteChat,
  sendMessage
}