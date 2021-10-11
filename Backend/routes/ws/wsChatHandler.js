const fs = require('fs');

const {SEND_MESSAGE} = require('../types/dialogsTypes');
const dialogsAction = require('../dialogs/dialogsActions');
const {generateRandomMessageId} = require('../dialogs/dialogsHelper');

const actions = {
  SEND_MESSAGE: dialogsAction.sendMessage,
}
const handler = (messageFromClient, fileMessage, fileUsers) => {
  const messageID = generateRandomMessageId();
  fs.readFile(fileMessage, (err, messages) => {
    fs.readFile(fileUsers, (err, users) => {
      const newMessageList = actions[SEND_MESSAGE](JSON.parse(users), JSON.parse(messages), messageFromClient, messageID);
      if (newMessageList) {
        fs.writeFile(fileMessage, newMessageList, (err) => {});
      };
    });
  });
  return Object.assign({id: messageID}, messageFromClient);
};

module.exports = handler;