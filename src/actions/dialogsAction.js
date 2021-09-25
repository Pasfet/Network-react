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
