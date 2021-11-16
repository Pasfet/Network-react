export interface ErrorTypes {
  message: string
  code?: number
  type: string
}

export interface SnackMessageTypes {
  text: string
  result: number
}

export interface ErrorStateTypes {
  error: ErrorTypes | null
  snackMessage: SnackMessageTypes | null
}

export enum ErrorActionsType {
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  SET_SNACK = 'SET_SNACK',
  CLEAR_SNACK = 'CLEAR_SNACK'
}

interface SetError {
  type: ErrorActionsType.SET_ERROR
  payload: ErrorTypes
}

interface ClearError {
  type: ErrorActionsType.CLEAR_ERROR
  payload: any
}

interface SetSnack {
  type: ErrorActionsType.SET_SNACK
  payload: SnackMessageTypes
}

interface ClearSnack {
  type: ErrorActionsType.CLEAR_SNACK
  payload: any
}

export type ErrorActions = SetError | ClearError | SetSnack | ClearSnack;