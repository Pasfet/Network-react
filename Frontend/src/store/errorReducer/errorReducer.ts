import { ErrorActions, ErrorActionsType, ErrorStateTypes } from "../../types/errorTypes";

const initialState : ErrorStateTypes = {
  error: null,
  snackMessage: null,
};

const errorReducer = (state = initialState, { type, payload } : ErrorActions) : ErrorStateTypes => {
  switch (type) {
    case ErrorActionsType.SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    case ErrorActionsType.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case ErrorActionsType.SET_SNACK:
      return {
        ...state,
        snackMessage: payload,
      };
    case ErrorActionsType.CLEAR_SNACK:
      return {
        ...state,
        snackMessage: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
