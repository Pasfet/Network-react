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

const sendMessage = ( messagesList, messageFromClient, messageId) => {
  const {messages} = messagesList;
  const {uid, chatId, text, authorName} = messageFromClient;

  const newMessage = createMessage(uid, text, authorName, messageId);
  const MessagesListCopy = copyMessagesListWithNewMessage(messages, uid, newMessage, chatId);
  const newMessagesList = {
    messages: {
      ...MessagesListCopy
    }
  }

  return JSON.stringify(newMessagesList, null, 2);
}

module.exports = {
  sendMessage
}