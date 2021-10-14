import { SET_ERROR, SET_SNACK, CLEAR_ERROR, CLEAR_SNACK } from '../types/errorTypes';

const initialState = {
  error: null,
  snackMessage: null,
};

const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_SNACK:
      return {
        ...state,
        snackMessage: payload,
      };
    case CLEAR_SNACK:
      return {
        ...state,
        snackMessage: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
