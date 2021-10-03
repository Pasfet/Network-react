import { LOADING_TRUE, LOADING_FALSE } from '../types/spinnerTypes';

const initialState = {
  loading: true,
};

const spinnerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_TRUE:
      return {
        loading: payload,
      };

    case LOADING_FALSE:
      return {
        loading: payload,
      };
    default:
      return state;
  }
};

export default spinnerReducer;
