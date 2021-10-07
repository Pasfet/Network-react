import { CLEAR_ERROR, SET_ERROR } from '../types/animePageTypes';

const initialState = {
  error: null,
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
    default:
      return state;
  }
};

export default errorReducer;
