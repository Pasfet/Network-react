import { CLEAR_ERROR, SET_ERROR } from '../store/types/animePageTypes';

export const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
