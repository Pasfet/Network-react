export const CURRENT_URL = 'http://localhost:3001';
// export const CURRENT_URL = 'http://31.31.192.217:3001';
export const WS_URL = 'ws://31.31.192.217:8999/';

export interface AuthStateTypes {
  isAuth: boolean
} 

export enum AuthActionsTypes {
  SET_AUTH = 'SET_AUTH',
  CLEAR_AUTH = 'CLEAR_AUTH'
}

interface SetAuthTypes {
  type: AuthActionsTypes.SET_AUTH
}

interface ClearAuthTypes {
  type: AuthActionsTypes.CLEAR_AUTH
}

export type AuthActions = SetAuthTypes | ClearAuthTypes;

export interface AuthUserTypes {
  email: string
  password: string
}

export interface AuthResponseTypes {
  result: number
  text: string
  type?: string
  user?: AuthUserTypes
}

export interface ProfilePageActionsTypes {
  senderUid: string
  recipientUid: string
}

export interface UserChatTypes {
  uid: string
  user_name: string
}

export interface DialogsChatsActions {
  uid: string
  user?: UserChatTypes
  chatId?: string
}
