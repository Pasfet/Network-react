import {Dispatch} from 'redux';
import { clearError, setError, setSnack } from './errorActions';
import { loadingFalse, loadingTrue } from './spinnerActions';
import { clearMyFriends, clearUid, clearUser, clearUserPosts, setUid } from './profileActions';
import { clearChats } from './dialogsActions';
import { authFetchHelper } from './actionHelper';
import { clearNews } from './newsPageActions';
import { clearLastPage, clearUsers, clearUsersListLength } from './usersActions';
import { AuthActions, AuthActionsTypes, AuthUserTypes } from '../types/authTypes';

export const setAuth = (): AuthActions => ({
  type: AuthActionsTypes.SET_AUTH,
});

export const clearAuth = (): AuthActions => ({
  type: AuthActionsTypes.CLEAR_AUTH,
});

export const authorization = (user: AuthUserTypes) => {
  return async (dispatch: Dispatch<any>) : Promise<void> => {
    dispatch(loadingTrue());

    try {
      const data = await authFetchHelper('login', user);
      if (data.result === 0) {
        dispatch(setAuth());
        dispatch(setUid(data.user));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setError({ message: data.text, type: data.type }));
        dispatch(setSnack({ text: data.text, result: data.result }));
      }
    } catch (error: any) {
      dispatch(setError({ message: error.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};

export const registration = (user: AuthUserTypes) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    dispatch(loadingTrue());

    try {
      const data = await authFetchHelper('signup', user);
      if (data.result === 0) {
        dispatch(authorization(user));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setError({ message: data.text, type: data.type }));
        dispatch(setSnack({ text: data.text, result: data.result }));
      }
    } catch (error: any) {
      dispatch(setError({ message: error.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};

export const logOut = () => {
  return (dispatch: Dispatch<any>) => {
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
