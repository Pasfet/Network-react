import {
  CLEAR_MY_FRIENDS,
  CLEAR_UID,
  CLEAR_USER,
  SET_MY_FRIENDS,
  SET_UID,
  SET_USER,
} from '../types/profileTypes';

const initialState = {
  uid: { uid: null, name: null },
  myFriends: null,
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
        uid: { uid: null, user: null },
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
    case SET_MY_FRIENDS:
      return {
        ...state,
        myFriends: payload,
      };
    case CLEAR_MY_FRIENDS:
      return {
        ...state,
        myFriends: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
