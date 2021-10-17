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
} from '../store/types/dialogsTypes';
import { clearError, setError, setSnack } from './errorActions';

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
  return dispatch => {
    dispatch(clearError());
    return fetch(`${CURRENT_URL}/dialogs?uid=${uid}&searchChat=${text}`)
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(setSearchChats(data.users));
        } else {
          dispatch(setError({ message: data.text, type: data.type, code: data.code }));
        }
      })
      .catch(err => dispatch(setError({ message: err.message, type: 'error' })));
  };
};

export const getChatsList = uid => {
  return dispatch => {
    return fetch(`${CURRENT_URL}/dialogs/${uid}`)
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(getChats(data.chats));
          dispatch(clearIsEmptyChatsState());
        } else if (data.code === 3) {
          dispatch(setIsEmptyChatsState({ message: data.text, isEmpty: true }));
          dispatch(clearChats());
        } else {
          dispatch(setError({ message: data.text, type: data.type, code: data.code }));
        }
      })
      .catch(err => dispatch(setError({ message: err.message, type: 'error' })));
  };
};

export const addChatToApi = (uid, user) => {
  return dispatch => {
    return fetch(`${CURRENT_URL}/dialogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ uid, user }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(getChatsList(uid));
          dispatch(setSnack({ text: data.text, result: data.result }));
        } else {
          dispatch(setError({ message: data.text, type: data.type }));
          dispatch(setSnack({ text: data.text, result: data.result }));
        }
      })
      .catch(err => dispatch(setError({ message: err.message, type: 'error' })));
  };
};

export const deleteChatFromAPI = (uid, chatId) => {
  return dispatch => {
    return fetch(`${CURRENT_URL}/dialogs`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ uid, chatId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(getChatsList(uid));
          dispatch(setSnack({ text: data.text, result: data.result }));
        } else {
          dispatch(setError({ message: data.text, type: data.type }));
        }
      })
      .catch(err => dispatch(setError({ message: err.message, type: 'error' })));
  };
};

export const getMessagesFromAPI = (uid, chatId) => {
  return dispatch => {
    dispatch(isNotEmptyMessages());
    return fetch(`${CURRENT_URL}/dialogs/${uid}/${chatId}`)
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(setMessagesFromApi(data.payload));
        } else if (data.code === 3) {
          dispatch(isEmptyMessages({ message: data.text, code: data.code }));
        } else {
          dispatch(setError({ message: data.text, type: data.type }));
        }
      })
      .catch(err => dispatch(setError({ message: err.message, type: 'error' })));
  };
};
