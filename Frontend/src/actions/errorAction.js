import { SET_ERROR, CLEAR_ERROR, SET_SNACK, CLEAR_SNACK } from '../store/types/errorTypes';

export const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const setSnack = message => ({
  type: SET_SNACK,
  payload: message,
});

export const clearSnack = () => ({
  type: CLEAR_SNACK,
});
