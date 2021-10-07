import { CLEAR_UID, CLEAR_USER, EDIT_PROFILE, SET_UID, SET_USER } from '../types/profileTypes';

const initialState = {
  profileEdit: false,
  uid: null,
  user: null,
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_PROFILE:
      return {
        ...state,
        profileEdit: !state.profileEdit,
      };
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
