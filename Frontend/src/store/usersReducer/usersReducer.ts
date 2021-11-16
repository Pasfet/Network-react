import { UsersPageActions, UsersPageActionsTypes, UsersStateTypes } from "../../types/usersPageTypes";

const initialState: UsersStateTypes = {
  users: [],
  usersListLength: null,
  lastPage: null,
};

const usersReducer = (state = initialState, { type, payload } : UsersPageActions) : UsersStateTypes => {
  switch (type) {
    case UsersPageActionsTypes.SET_USERS:
      return {
        ...state,
        users: payload,
      };
    case UsersPageActionsTypes.CLEAR_USERS:
      return {
        ...state,
        users: [],
      };
    case UsersPageActionsTypes.SET_USERS_LENGTH:
      return {
        ...state,
        usersListLength: payload,
      };
    case UsersPageActionsTypes.CLEAR_USERS_LENGTH:
      return {
        ...state,
        usersListLength: null,
      };
    case UsersPageActionsTypes.SET_LAST_PAGE:
      return {
        ...state,
        lastPage: payload,
      };
    case UsersPageActionsTypes.CLEAR_LAST_PAGE:
      return {
        ...state,
        lastPage: null,
      };
    default:
      return state;
  }
};

export default usersReducer;
