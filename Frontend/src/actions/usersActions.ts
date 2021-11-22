import { CURRENT_URL } from '../types/authTypes';
import { setError } from './errorActions';
import { loadingFalse, loadingTrue } from './spinnerActions';
import {UserItemTypes, UsersPageActionsTypes, UsersPageActions} from '../types/usersPageTypes';
import {Dispatch} from 'redux';

export const setUsers = (users: Array<UserItemTypes>): UsersPageActions => ({
  type: UsersPageActionsTypes.SET_USERS,
  payload: users,
});

export const clearUsers = (): UsersPageActions => ({
  type: UsersPageActionsTypes.CLEAR_USERS,
  payload: null
});

export const setUsersListLength = (length: number): UsersPageActions => ({
  type: UsersPageActionsTypes.SET_USERS_LENGTH,
  payload: length,
});

export const clearUsersListLength = (): UsersPageActions => ({
  type: UsersPageActionsTypes.CLEAR_USERS_LENGTH,
  payload: null
});

export const setLastPage = (lastPage: number): UsersPageActions => ({
  type: UsersPageActionsTypes.SET_LAST_PAGE,
  payload: lastPage,
});

export const clearLastPage = (): UsersPageActions => ({
  type: UsersPageActionsTypes.CLEAR_LAST_PAGE,
  payload: null
});

export const getUsersList = (page = 1, perPage = 10, name?: string) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    dispatch(loadingTrue());
    try {
      const response = await fetch(
        `${CURRENT_URL}/users?page=${page}&perPage=${perPage}&name=${name ? name : ''}`,
      );
      const data = await response.json();

      if (data.result === 0) {
        dispatch(setUsers(data.users));
        dispatch(setUsersListLength(data.page_length));
        dispatch(setLastPage(data.last_page));
      } else {
        dispatch(setError({ message: data.text, type: data.type }));
      }
    } catch (err) {
      //@ts-ignore
      dispatch(setError({ message: err.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};
