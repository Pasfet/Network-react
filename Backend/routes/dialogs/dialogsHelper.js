const generateRandomMessageId = () => {
  const messageId = () => {
    return (Math.floor((1 + Math.random()) * 0x50000000).toString(16)).substring(1);
  }
  return messageId() + '-' + messageId();
}

const createChats = (uid, name) => {
  return {
    [uid]: {
      chat_id: `${uid}`,
      chat_name: name,
      messages: []
    }
  }
}

const createMessage = (uid, message, authorName) => {
  return {
    id: generateRandomMessageId(),
    text: message,
    authorId: uid,
    authorName: authorName
  }
}

const copyWithNewMessage = (users, authorUid, newMessage, chatId) => {
  return {
    ...users,
    [authorUid]: {
      ...users[authorUid],
      user_chats: {
        ...users[authorUid].user_chats,
        [chatId]: {
         ...users[authorUid].user_chats[chatId],
         messages: [...users[authorUid].user_chats[chatId].messages, newMessage] 
        }
      }
    },
    [chatId]: {
      ...users[chatId],
      user_chats: {
        ...users[chatId].user_chats,
        [authorUid]: {
          ...users[chatId].user_chats[authorUid],
          messages: [...users[chatId].user_chats[authorUid].messages, newMessage]
        }
      }
    }
  }
}

const copyUsersListWithNewChat = (users, authorUid, chatAuthor, recipientUid, recipientChat) => {
  return {
    ...users,
        [authorUid]: {
          ...users[authorUid],
          user_chats: {
            ...users[authorUid].user_chats,
            ...chatAuthor
          }
        },
        [recipientUid]: {
          ...users[recipientUid],
          user_chats: {
            ...users[recipientUid].user_chats,
            ...recipientChat
          }
        }
  }
}

const copyUsersListWithoutDeletedChat = (users, authorUid, chatsAuthor, recipientUid, chatsRecipient) => {
  return {
    ...users,
    [authorUid]: {
      ...users[authorUid],
      user_chats: chatsAuthor
    },
    [recipientUid]: {
      ...users[recipientUid],
      user_chats: chatsRecipient
    }
  }
}

module.exports = {
  createChats,
  createMessage,
  copyUsersListWithNewChat,
  copyUsersListWithoutDeletedChat,
  copyWithNewMessage
}