export interface SpinnerStateTypes {
  loading: boolean
}

export enum SpinnerActionsTypes {
  LOADING_TRUE = 'LOADING_TRUE',
  LOADING_FALSE = 'LOADING_FALSE',
}

interface LoadingTrue {
  type: SpinnerActionsTypes.LOADING_TRUE
  payload: any
}
interface LoadingFalse {
  type: SpinnerActionsTypes.LOADING_FALSE
  payload: any
}

export type SpinnerActions = LoadingTrue | LoadingFalse;