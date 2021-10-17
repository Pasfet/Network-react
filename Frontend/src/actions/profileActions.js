import { CLEAR_UID, CLEAR_USER, SET_UID, SET_USER } from '../store/types/profileTypes';
import { CURRENT_URL } from '../store/types/authTypes';
import { loadingTrue, loadingFalse } from './spinnerActions';
import { setError, clearError, setSnack } from './errorActions';

export const clearUid = () => ({
  type: CLEAR_UID,
});

export const setUid = uid => ({
  type: SET_UID,
  payload: uid,
});

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const getUser = uid => {
  return dispatch => {
    dispatch(clearError());
    dispatch(loadingTrue());
    return fetch(`${CURRENT_URL}/profile/${uid}`)
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(setUser(data.user));
        } else {
          dispatch(setError({ message: data.text, type: data.type }));
        }
      })
      .catch(err => dispatch(setError({ message: err.message, type: 'error' })))
      .finally(() => dispatch(loadingFalse()));
  };
};

export const setStatus = (status, uid) => {
  return dispatch => {
    return fetch(`${CURRENT_URL}/profile/${uid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ status }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(setSnack({ text: data.text, result: data.result }));
          dispatch(getUser(uid));
        } else {
          dispatch(setSnack({ text: data.text, result: data.result }));
          dispatch(setError({ message: data.text, result: data.result, type: data.type }));
        }
      })
      .catch(err => dispatch(setError({ message: err.message, type: 'error' })));
  };
};

export const setAboutUser = (uid, about) => {
  return dispatch => {
    return fetch(`${CURRENT_URL}/profile/${uid}/about`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ about }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(getUser(uid));
          dispatch(setSnack({ text: data.text, result: data.result }));
        } else {
          dispatch(setSnack({ text: data.text, result: data.result }));
          dispatch(setError({ message: data.text, result: data.result, type: data.type }));
        }
      })
      .catch(err => dispatch(setError({ message: err.message, type: 'error' })));
  };
};
