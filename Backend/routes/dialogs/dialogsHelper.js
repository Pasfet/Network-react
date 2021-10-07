const createChats = (uid, name) => {
  return {
    [uid]: {
      chat_id: `${uid}`,
      chat_name: name,
      messages: []
    }
  }
}

const createMessage = (uid, lengthMessages, message, authorName) => {
  return {
    id: lengthMessages + 1,
    text: message,
    authorId: uid,
    authorName: authorName
  }
}

module.exports = {
  createChats,
  createMessage
}