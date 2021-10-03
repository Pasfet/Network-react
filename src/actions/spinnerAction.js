import { LOADING_FALSE, LOADING_TRUE } from '../store/types/spinnerTypes';

export const loadingTrue = () => ({
  type: LOADING_TRUE,
  payload: true,
});

export const loadingFalse = () => ({
  type: LOADING_FALSE,
  payload: false,
});
