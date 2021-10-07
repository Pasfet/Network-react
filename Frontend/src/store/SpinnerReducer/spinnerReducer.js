import { LOADING_TRUE, LOADING_FALSE } from '../types/spinnerTypes';

const initialState = {
  loading: true,
};

const spinnerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };

    case LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default spinnerReducer;
