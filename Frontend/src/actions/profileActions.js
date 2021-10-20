import {
  CLEAR_MY_FRIENDS,
  CLEAR_UID,
  CLEAR_USER,
  SET_MY_FRIENDS,
  SET_UID,
  SET_USER,
} from '../store/types/profileTypes';
import { CURRENT_URL } from '../store/types/authTypes';
import { loadingTrue, loadingFalse } from './spinnerActions';
import { setError, setSnack } from './errorActions';

export const clearUid = () => ({
  type: CLEAR_UID,
});

export const setUid = user => ({
  type: SET_UID,
  payload: user,
});

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const setMyFriends = freinds => ({
  type: SET_MY_FRIENDS,
  payload: freinds,
});

export const clearMyFriends = () => ({
  type: CLEAR_MY_FRIENDS,
});

// REQUESTS
export const getUserProfileFromApi = uid => {
  return async dispatch => {
    dispatch(loadingTrue());
    try {
      const response = await fetch(`${CURRENT_URL}/profile/${uid}`);
      const data = await response.json();
      if (data.result === 0) {
        dispatch(setUser(data.user));
        dispatch(loadingFalse());
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(loadingFalse());
      }
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};

export const sendProfileChange = (uid, change) => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/profile/${uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ change }),
      });
      const data = await response.json();
      if (data.result === 0) {
        dispatch(getUserProfileFromApi(uid));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(setError({ message: data.text, type: 'send-profile-change' }));
      }
    } catch (err) {
      return dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const getMyFriendsList = uid => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/friends/${uid}`);
      const data = await response.json();
      if (data.result === 0) {
        dispatch(setMyFriends(data.friends));
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(setError({ message: data.text, type: 'get-friends-list' }));
      }
    } catch (err) {
      return dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const sendRequestToFriendList = (senderUid, recipientUid) => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/friends`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ senderUid, recipientUid }),
      });
      const data = await response.json();
      if (data.result === 0) {
        dispatch(getMyFriendsList(senderUid));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(setError({ message: data.text, type: 'add-friends' }));
      }
    } catch (err) {
      return dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const rejectFriendRequest = (senderUid, recipientUid) => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/friends`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ senderUid, recipientUid }),
      });
      const data = await response.json();
      if (data.result === 0) {
        dispatch(getMyFriendsList(senderUid));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(setError({ message: data.text, type: 'reject-friend-request' }));
      }
    } catch (err) {
      return dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const deleteFriendFromFriendsList = (senderUid, recipientUid) => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/friends`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ senderUid, recipientUid }),
      });
      const data = await response.json();
      if (data.result === 0) {
        dispatch(getMyFriendsList(senderUid));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(setError({ message: data.text, type: 'delete-friend' }));
      }
    } catch (err) {
      return dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const addToFriendsList = (senderUid, recipientUid) => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/friends`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ senderUid, recipientUid }),
      });
      const data = await response.json();
      if (data.result === 0) {
        dispatch(getMyFriendsList(senderUid));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(setError({ message: data.text, type: 'add-friend' }));
      }
    } catch (err) {
      return dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};
