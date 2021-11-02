import { CURRENT_URL } from '../store/types/authTypes';
import {
  CLEAR_CHATS,
  CLEAR_SEARCH_CHAT,
  GET_CHATS,
  SET_SEARCH_CHAT,
  SET_MESSAGES,
  CLEAR_MESSAGES,
  SET_IS_EMPTY_CHATS_STATE,
  CLEAR_IS_EMPTY_CHATS_STATE,
  IS_EMPTY_MESSAGES,
  IS_NOT_EMPTY_MESSAGES,
  SEND_MESSAGE,
} from '../store/types/dialogsTypes';
import { dialogsChatsActionsHelper } from './actionHelper';
import { clearError, setError } from './errorActions';

export const getChats = chats => ({
  type: GET_CHATS,
  payload: chats,
});

export const setSearchChats = chats => ({
  type: SET_SEARCH_CHAT,
  payload: chats,
});

export const clearSearchChats = () => ({
  type: CLEAR_SEARCH_CHAT,
});

export const clearChats = () => ({
  type: CLEAR_CHATS,
});

export const setMessagesFromApi = messages => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

export const sendMessageToStore = payload => ({
  type: SEND_MESSAGE,
  payload,
});

export const setIsEmptyChatsState = message => ({
  type: SET_IS_EMPTY_CHATS_STATE,
  payload: message,
});

export const clearIsEmptyChatsState = () => ({
  type: CLEAR_IS_EMPTY_CHATS_STATE,
});

export const isEmptyMessages = message => ({
  type: IS_EMPTY_MESSAGES,
  payload: message,
});

export const isNotEmptyMessages = () => ({
  type: IS_NOT_EMPTY_MESSAGES,
});

export const searchUsersChat = (text, uid) => {
  return async dispatch => {
    dispatch(clearError());
    try {
      const response = await fetch(`${CURRENT_URL}/dialogs?uid=${uid}&searchChat=${text}`);
      const data = await response.json();
      if (data.result === 0) {
        dispatch(setSearchChats(data.users));
      } else {
        dispatch(setError({ message: data.text, type: data.type, code: data.code }));
      }
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const getChatsList = uid => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/dialogs/${uid}`);
      const data = await response.json();
      if (data.result === 0) {
        dispatch(getChats(data.chats));
        dispatch(clearIsEmptyChatsState());
      } else if (data.code === 3) {
        dispatch(setIsEmptyChatsState({ message: data.text, isEmpty: true }));
        dispatch(clearChats());
      } else {
        dispatch(setError({ message: data.text, type: data.type, code: data.code }));
      }
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const addChatToApi = (uid, user) => {
  return dispatch => {
    return dialogsChatsActionsHelper('POST', { uid, user }, dispatch);
  };
};

export const deleteChatFromAPI = (uid, chatId) => {
  return dispatch => {
    return dialogsChatsActionsHelper('DELETE', { uid, chatId }, dispatch);
  };
};

export const getMessagesFromAPI = (uid, chatId) => {
  return async dispatch => {
    dispatch(isNotEmptyMessages());
    try {
      const response = await fetch(`${CURRENT_URL}/dialogs/${uid}/${chatId}`);
      const data = await response.json();
      if (data.result === 0) {
        dispatch(setMessagesFromApi(data.payload));
      } else if (data.code === 3) {
        dispatch(isEmptyMessages({ message: data.text, code: data.code }));
      } else {
        dispatch(setError({ message: data.text, type: data.type }));
      }
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};
