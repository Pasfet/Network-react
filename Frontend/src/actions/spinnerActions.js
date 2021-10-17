import { LOADING_FALSE, LOADING_TRUE } from '../store/types/spinnerTypes';

export const loadingTrue = () => ({
  type: LOADING_TRUE,
});

export const loadingFalse = () => ({
  type: LOADING_FALSE,
});
