const generateRandomMessageId = () => {
  const messageId = () => {
    return (Math.floor((1 + Math.random()) * 0x50000000).toString(16)).substring(1);
  }
  return messageId() + '-' + messageId();
}

const generateRoomId = () => {
  return (Math.floor((1 + Math.random()) * 0x1000000).toString(16)).substring(1);
}

const createChats = (uid, name, roomId) => {
  return {
    [uid]: {
      roomId: roomId,
      chat_id: uid,
      chat_name: name,
      messages: []
    }
  }
}

const createMessage = (uid, message, authorName, messageId) => {
  return {
    id: messageId,
    text: message,
    authorId: uid,
    authorName: authorName
  }
}

const copyMessagesListWithNewMessage = (messagesList, authorUid, newMessage, chatId) => {
  return {
    ...messagesList,
    [authorUid]: {
      ...messagesList[authorUid],
      [chatId]: {
        ...messagesList[authorUid][chatId],
        messages: [...messagesList[authorUid][chatId].messages, newMessage]
      },
    },
    [chatId]: {
      ...messagesList[chatId],
      [authorUid]: {
        ...messagesList[chatId][authorUid],
        messages: [...messagesList[chatId][authorUid].messages, newMessage]
      }
    }
  }
}

const copyMessagesListWithNewChat = (messagesList, authorUid, chatAuthor, recipientUid, recipientChat) => {
  return {
    ...messagesList,
    [authorUid]: {
      ...messagesList[authorUid],
      ...chatAuthor
    },
    [recipientUid]: {
      ...messagesList[recipientUid],
      ...recipientChat
    }
  }
}

const copyMessagesListWithoutDeletedChat = (messagesList, authorUid, chatsAuthor, recipientUid, chatsRecipient) => {
  return {
    ...messagesList,
    [authorUid]: {
      ...chatsAuthor
    },
    [recipientUid]: {
      ...chatsRecipient
    }
  }
}

module.exports = {
  createChats,
  createMessage,
  copyMessagesListWithNewChat,
  copyMessagesListWithoutDeletedChat,
  copyMessagesListWithNewMessage,
  generateRandomMessageId,
  generateRoomId
}