import { SpinnerActions, SpinnerActionsTypes } from "../types/spinnerTypes";

export const loadingTrue = (): SpinnerActions => ({
  type: SpinnerActionsTypes.LOADING_TRUE,
  payload: null
});

export const loadingFalse = (): SpinnerActions => ({
  type: SpinnerActionsTypes.LOADING_FALSE,
  payload: null
});
