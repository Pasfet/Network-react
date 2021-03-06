const {createChats, copyMessagesListWithNewChat, copyMessagesListWithoutDeletedChat,  generateRoomId} = require('./dialogsHelper');

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
  const {messages} = messagesList;
  const UserChats = messages[uid];
  
  if (!UserChats || !Object.keys(UserChats).length) {
    return null;
  }

  const chats = Object.keys(UserChats).map((chat) => ({
    [`${chat}`]: {
      roomId: UserChats[chat].roomId,
      chat_name: UserChats[chat].chat_name,
      chat_id: UserChats[chat].chat_id
    }
  }));

  let result;
  chats.forEach(item => {
    result = {...result, ...item}
  })
  return result;
}

const addChat = (usersList, messagesList, req) => {
  const {users} = usersList;
  const {messages} = messagesList;
  const {uid, user} = req.body;


  if (messages?.[uid]?.[user.uid] || uid === user.uid) return null;

  const roomId = generateRoomId();

  const newChatAuthor = createChats(user.uid, user.user_name, roomId);
  const newChatRecipient = createChats(uid, users[uid].user_name, roomId);
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

  const messagesRes = messages[uid][chatId].messages.slice(-50);
  if (!Object.entries(messagesRes).length) {
    return null;
  } else {
    return messagesRes;
  }
}

module.exports = {
  getUsersName,
  getChats,
  getMessages,
  addChat,
  deleteChat,
}