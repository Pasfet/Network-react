import { ErrorActions, ErrorActionsType, ErrorTypes, SnackMessageTypes } from "../types/errorTypes";

export const setError = (error: ErrorTypes): ErrorActions => ({
  type: ErrorActionsType.SET_ERROR,
  payload: error,
});

export const clearError = (): ErrorActions => ({
  type: ErrorActionsType.CLEAR_ERROR,
  payload: null
});

export const setSnack = (message: SnackMessageTypes): ErrorActions => ({
  type: ErrorActionsType.SET_SNACK,
  payload: message,
});

export const clearSnack = (): ErrorActions => ({
  type: ErrorActionsType.CLEAR_SNACK,
  payload: null
});
