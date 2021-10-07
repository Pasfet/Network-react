import { CURRENT_URL } from '../store/types/authTypes';
import {
  CLEAR_CHATS,
  CLEAR_SEARCH_CHAT,
  GET_CHATS,
  GET_MESSAGES,
  SET_SEARCH_CHAT,
} from '../store/types/dialogsTypes';
import { setError } from './errorAction';

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

export const getMessagesFromApi = messages => ({
  type: GET_MESSAGES,
  payload: messages,
});

export const clearChats = () => ({
  type: CLEAR_CHATS,
});

export const searchUsersChat = (text, uid) => {
  return dispatch => {
    fetch(`${CURRENT_URL}/dialogs?uid=${uid}&searchChat=${text}`)
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(setSearchChats(data.users));
        } else {
          dispatch(setError({ message: data.text }));
        }
      })
      .catch(err => dispatch(setError({ message: err.message })));
  };
};

export const getChatsList = uid => {
  return dispatch => {
    fetch(`${CURRENT_URL}/dialogs/${uid}`)
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(getChats(data.chats));
        } else {
          dispatch(setError({ message: data.text }));
        }
      })
      .catch(err => dispatch(setError({ message: err.message })));
  };
};

export const addChatToApi = (uid, user) => {
  return dispatch => {
    fetch(`${CURRENT_URL}/dialogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ uid, user }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(getChatsList(uid));
        } else {
          dispatch(setError({ message: data.text }));
        }
      })
      .catch(err => setError({ message: err.message }));
  };
};

export const deleteChatFromApi = (uid, chatId) => dispatch => {
  fetch(`${CURRENT_URL}/dialogs`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ uid, chatId }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.result === 0) {
        dispatch(getChatsList(uid));
      } else {
        dispatch(setError({ message: data.text }));
      }
    })
    .catch(err => setError({ message: err.message }));
};

export const sendMessageToAPI = (uid, chatId, message) => {
  return dispatch => {
    fetch(`${CURRENT_URL}/dialogs/${uid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ chatId, message }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(getChatsList(uid));
        } else {
          dispatch(setError({ message: data.text }));
        }
      })
      .catch(err => dispatch({ message: err.message }));
  };
};
