import { CLEAR_AUTH, SET_AUTH } from '../types/authTypes';

const initialState = {
  isAuth: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: true,
      };

    case CLEAR_AUTH:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default authReducer;
