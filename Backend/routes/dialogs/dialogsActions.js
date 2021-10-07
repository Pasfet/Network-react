const {createChats, createMessage} = require('./dialogsHelper');

const getUsersName = (usersList, req) => {
  const {users} = usersList;
  const {searchChat} = req.query;

  const regExp = new RegExp(searchChat, 'i');
  const resultSearch = Object.entries(users).filter(user => regExp.test(user[1].user_name));
  
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

  if (users[uid].user_chats[user.uid]) return null;

    const newChatAuthor = createChats(user.uid, user.user_name);
    const newChatRecipient = createChats(uid, users[uid].user_name);
    
    const newUsersList = {
      users: {
        ...users,
        [uid]: {
          ...users[uid],
          user_chats: {
            ...users[uid].user_chats,
            ...newChatAuthor
          }
        },
        [user.uid]: {
          ...users[user.uid],
          user_chats: {
            ...users[user.uid].user_chats,
            ...newChatRecipient
          }
        }
      }
    };

    return JSON.stringify(newUsersList, null, 2);
}

const deleteChat = (usersList, req) => {
  const {uid, chatId} = req.body;
  const {users} = usersList;

  const chatsAuthor = Object.fromEntries(Object.entries(users[uid].user_chats).filter(chat => chat[0] !== chatId));
  const chatRecipient = Object.fromEntries(Object.entries(users[chatId].user_chats).filter(chat => chat[0] !== `${uid}`));

  const newUsersList = {
    users: {
      ...users,
      [uid]: {
        ...users[uid],
        user_chats: chatsAuthor
      },
      [chatId]: {
        ...users[chatId],
        user_chats: chatRecipient
      }
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

  const lengthMessages = users[uid].user_chats[chatId].messages.length;

  const newMessage = createMessage(uid, lengthMessages, message, users[uid].user_name);

  const newUsersList = {
    users: {
      ...users,
      [uid]: {
        ...users[uid],
        user_chats: {
          ...users[uid].user_chats,
          [chatId]: {
           ...users[uid].user_chats[chatId],
           messages: [...users[uid].user_chats[chatId].messages, newMessage] 
          }
        }
      },
      [chatId]: {
        ...users[chatId],
        user_chats: {
          ...users[chatId].user_chats,
          [uid]: {
            ...users[chatId].user_chats[uid],
            messages: [...users[chatId].user_chats[uid].messages, newMessage]
          }
        }
      }
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