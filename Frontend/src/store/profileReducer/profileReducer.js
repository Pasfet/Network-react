import { CLEAR_UID, CLEAR_USER, SET_UID, SET_USER } from '../types/profileTypes';

const initialState = {
  uid: null,
  user: null,
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_UID:
      return {
        ...state,
        uid: payload,
      };
    case CLEAR_UID:
      return {
        ...state,
        uid: null,
      };
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
