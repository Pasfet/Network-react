import { ADD_CHAT, DELETE_CHAT, SEND_MESSAGES } from '../store/types/dialogsTypes';

export const addChatAction = nameChat => ({
  type: ADD_CHAT,
  payload: nameChat,
});

export const deleteChatAction = chatId => ({
  type: DELETE_CHAT,
  payload: chatId,
});

export const sendMessageAction = msg => ({
  type: SEND_MESSAGES,
  payload: msg,
});

export const botMessage = (chatId, chats) => dispatch => {
  if (
    chats[chatId].messages[chats[chatId].messages.length - 1]?.author === 'me' &&
    chats[chatId].messages.length !== 0
  ) {
    setTimeout(() => {
      dispatch(sendMessageAction({ id: chatId, message: 'successfully sent', author: 'bot' }));
    }, 1000);
  }
};
