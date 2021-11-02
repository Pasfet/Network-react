const fs = require('fs');

const {sendMessage} = require('./wsChatActions');
const {generateRandomMessageId} = require('../dialogs/dialogsHelper');

const handler = (messageFromClient, fileMessage) => {
  const messageID = generateRandomMessageId();
  fs.readFile(fileMessage, 'utf-8', (err, messages) => {
    const newMessageList = sendMessage(JSON.parse(messages), messageFromClient, messageID);
    if (newMessageList) {
      fs.writeFile(fileMessage, newMessageList, (err) => {console.log(err)});
    };
  });
  return Object.assign({id: messageID}, messageFromClient);
};

module.exports = handler;