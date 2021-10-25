import { CLEAR_AUTH, SET_AUTH } from '../store/types/authTypes';
import { clearError, setError, setSnack } from './errorActions';
import { loadingFalse, loadingTrue } from './spinnerActions';
import { clearMyFriends, clearUid, clearUser, clearUserPosts, setUid } from './profileActions';
import { clearChats } from './dialogsActions';
import { authFetchHepler } from './actionHelper';
import { clearNews } from './newsPageActions';
import { clearLastPage, clearUsers, clearUsersListLength } from './usersActions';

export const setAuth = () => ({
  type: SET_AUTH,
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

export const authorization = user => {
  return async dispatch => {
    dispatch(loadingTrue());

    try {
      const data = await authFetchHepler('login', user);
      if (data.result === 0) {
        dispatch(setAuth());
        dispatch(setUid(data.user));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setError({ message: data.text, type: data.type }));
        dispatch(setSnack({ text: data.text, result: data.result }));
      }
    } catch (error) {
      dispatch(setError({ message: error.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};

export const registration = user => {
  return async dispatch => {
    dispatch(loadingTrue());

    try {
      const data = await authFetchHepler('signup', user);
      if (data.result === 0) {
        dispatch(authorization(user));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setError({ message: data.text, type: data.type }));
        dispatch(setSnack({ text: data.text, result: data.result }));
      }
    } catch (error) {
      dispatch(setError({ message: error.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};

export const logOut = () => {
  return dispatch => {
    dispatch(loadingTrue());
    dispatch(clearAuth());
    dispatch(clearUid());
    dispatch(clearUser());
    dispatch(clearChats());
    dispatch(clearError());
    dispatch(loadingFalse());
    dispatch(clearMyFriends());
    dispatch(clearNews());
    dispatch(clearLastPage());
    dispatch(clearUsersListLength());
    dispatch(clearUsers());
    dispatch(clearUserPosts());
    dispatch(setSnack({ text: 'Вы вышли', result: 0 }));
  };
};
