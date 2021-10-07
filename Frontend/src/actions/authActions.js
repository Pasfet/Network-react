import { CLEAR_AUTH, CURRENT_URL, SET_AUTH } from '../store/types/authTypes';
import { clearError, setError } from './errorAction';
import { loadingFalse, loadingTrue } from './spinnerAction';
import { clearUid, clearUser, getUser, setUid } from './profileAction';
import { clearChats, getChatsList } from './dialogsAction';
import { clearAnimeList, clearSearchTitle } from './animePageAction';

export const setAuth = () => ({
  type: SET_AUTH,
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

export const authorization = ({ email, password }) => {
  return dispatch => {
    dispatch(loadingTrue());

    fetch(`${CURRENT_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(setAuth());
          dispatch(setUid(data.uid));
          dispatch(getChatsList(data.uid));
          dispatch(getUser(data.uid));
        } else {
          dispatch(setError({ message: data.text }));
        }
      })
      .catch(error => {
        dispatch(setError({ message: error.message }));
      })
      .finally(() => dispatch(loadingFalse()));
  };
};

export const registration = ({ name, email, password }) => {
  return dispatch => {
    dispatch(loadingTrue());

    fetch(`${CURRENT_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ email, password, name }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 0) {
          dispatch(authorization({ email, password }));
        } else {
          dispatch(setError({ message: data.text }));
        }
      })
      .catch(error => {
        dispatch(setError({ message: error.message }));
      })
      .finally(() => dispatch(loadingFalse()));
  };
};

export const logOut = () => {
  return async dispatch => {
    await dispatch(loadingTrue());
    await dispatch(clearAuth());
    await dispatch(clearUid());
    await dispatch(clearUser());
    await dispatch(clearChats());
    await dispatch(clearSearchTitle());
    await dispatch(clearError());
    await dispatch(clearAnimeList());
    dispatch(loadingFalse());
  };
};
