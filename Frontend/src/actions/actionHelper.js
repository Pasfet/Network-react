import { CURRENT_URL } from '../store/types/authTypes';
import { getChatsList } from './dialogsActions';
import { setError, setSnack } from './errorActions';
import { getMyFriendsList } from './profileActions';

export const authFetchHelper = async (url, body) => {
  const response = await fetch(`${CURRENT_URL}/${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const profileChangeFetchHelper = async (method, url, uid, body) => {
  const response = await fetch(`${CURRENT_URL}/${url}/${uid}`, {
    method: method,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ change: body }),
  });
  return response.json();
};

export const profilePageActionsHelper = async (method, body, type, dispatch) => {
  try {
    const response = await fetch(`${CURRENT_URL}/friends`, {
      method: method,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.result === 0) {
      dispatch(getMyFriendsList(body.senderUid));
      dispatch(setSnack({ text: data.text, result: data.result }));
      return;
    } else {
      dispatch(setSnack({ text: data.text, result: data.result }));
      dispatch(setError({ message: data.text, type: type }));
    }
  } catch (err) {
    dispatch(setError({ message: err.message, type: 'error' }));
  }
};

export const dialogsChatsActionsHelper = async (method, body, dispatch) => {
  try {
    const response = await fetch(`${CURRENT_URL}/dialogs`, {
      method: method,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (data.result === 0) {
      dispatch(getChatsList(body.uid));
      dispatch(setSnack({ text: data.text, result: data.result }));
    } else {
      dispatch(setSnack({ text: data.text, result: data.result }));
      dispatch(setError({ message: data.text, type: data.type }));
    }
  } catch (err) {
    dispatch(setError({ message: err.message, type: 'error' }));
  }
};
