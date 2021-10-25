import {
  SET_USERS,
  CLEAR_USERS,
  SET_USERS_LENGTH,
  CLEAR_USERS_LENGTH,
  CLEAR_LAST_PAGE,
  SET_LAST_PAGE,
} from '../types/usersPageTypes';

const initialState = {
  users: [],
  usersListLength: null,
  lastPage: null,
};
const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS:
      return {
        ...state,
        users: payload,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
      };
    case SET_USERS_LENGTH:
      return {
        ...state,
        usersListLength: payload,
      };
    case CLEAR_USERS_LENGTH:
      return {
        ...state,
        usersListLength: null,
      };
    case SET_LAST_PAGE:
      return {
        ...state,
        lastPage: payload,
      };
    case CLEAR_LAST_PAGE:
      return {
        ...state,
        lastPage: null,
      };
    default:
      return state;
  }
};

export default usersReducer;
