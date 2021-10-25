import { CURRENT_URL } from '../store/types/authTypes';
import {
  SET_USERS,
  CLEAR_USERS,
  SET_USERS_LENGTH,
  CLEAR_USERS_LENGTH,
  SET_LAST_PAGE,
  CLEAR_LAST_PAGE,
} from '../store/types/usersPageTypes';
import { setError } from './errorActions';
import { loadingFalse, loadingTrue } from './spinnerActions';

export const setUsers = users => ({
  type: SET_USERS,
  payload: users,
});

export const clearUsers = () => ({
  type: CLEAR_USERS,
});

export const setUsersListLength = length => ({
  type: SET_USERS_LENGTH,
  payload: length,
});

export const clearUsersListLength = () => ({
  type: CLEAR_USERS_LENGTH,
});

export const setLastPage = lastPage => ({
  type: SET_LAST_PAGE,
  payload: lastPage,
});

export const clearLastPage = () => ({
  type: CLEAR_LAST_PAGE,
});

export const getUsersList = (page = 1, perPage = 10, name) => {
  return async dispatch => {
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
      dispatch(setError({ message: err.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};
