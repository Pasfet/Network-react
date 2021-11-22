export interface UserItemTypes {
  user_name: string,
  uid: string,
  avatar: string | null
}

export interface UsersStateTypes {
  users: Array<UserItemTypes> | [],
  usersListLength: number | null,
  lastPage: number | null
}

export enum UsersPageActionsTypes {
  SET_USERS = 'SET_USERS',
  CLEAR_USERS = 'CLEAR_USERS',
  SET_USERS_LENGTH = 'SET_USERS_LENGTH',
  CLEAR_USERS_LENGTH = 'CLEAR_USERS_LENGTH',
  SET_LAST_PAGE = 'SET_LAST_PAGE',
  CLEAR_LAST_PAGE = 'CLEAR_LAST_PAGE',
}

interface SetUsers {
  type: UsersPageActionsTypes.SET_USERS,
  payload: Array<UserItemTypes>
}
interface ClearUsers {
  type: UsersPageActionsTypes.CLEAR_USERS,
  payload: any
}
interface SetUsersLength {
  type: UsersPageActionsTypes.SET_USERS_LENGTH,
  payload: number
}
interface ClearUsersLength {
  type: UsersPageActionsTypes.CLEAR_USERS_LENGTH,
  payload: any
}
interface SetLastPage {
  type: UsersPageActionsTypes.SET_LAST_PAGE,
  payload: number
}
interface ClearLastPage {
  type: UsersPageActionsTypes.CLEAR_LAST_PAGE,
  payload: any
}

export type UsersPageActions = SetUsers | ClearUsers | SetUsersLength | ClearUsersLength | SetLastPage | ClearLastPage;