export interface IsEmptyChatsTypes {
  message: string,
  isEmpty: boolean
}

export interface SearchChatsItemTypes {
  user_name: string,
  uid: string
}

export interface MessageItemTypes {
  id: string,
  uid: string,
  authorId: string,
  chatId: string,
  authorName: string,
  text: string
}

export interface IsEmptyMessagesTypes {
  message: string,
  code: number
}

export interface DialogsStateTypes {
  chats: Object,
  isEmptyChats: null | IsEmptyChatsTypes,
  searchChats: Array<SearchChatsItemTypes>,
  messages: Array<MessageItemTypes>,
  isEmptyMessages: null | IsEmptyMessagesTypes
}

export enum DialogsActionsTypes {
  SET_IS_EMPTY_CHATS_STATE = 'SET_IS_EMPTY_CHATS_STATE',
  CLEAR_IS_EMPTY_CHATS_STATE = 'CLEAR_IS_EMPTY_CHATS_STATE',
  GET_CHATS = 'GET_CHATS',
  SET_SEARCH_CHAT = 'SET_SEARCH_CHAT',
  CLEAR_SEARCH_CHAT = 'CLEAR_SEARCH_CHAT',
  CLEAR_CHATS = 'CLEAR_CHATS',
  IS_EMPTY_MESSAGES = 'IS_EMPTY_MESSAGES',
  IS_NOT_EMPTY_MESSAGES = 'IS_NOT_EMPTY_MESSAGES',
  SET_MESSAGES = 'SET_MESSAGES',
  CLEAR_MESSAGES = 'CLEAR_MESSAGES',
  SEND_MESSAGE = 'SEND_MESSAGE'
}

interface SetIsEmptyChatsState {
  type: DialogsActionsTypes.SET_IS_EMPTY_CHATS_STATE,
  payload: IsEmptyChatsTypes
}
interface ClearIsEmptyChatsState {
  type: DialogsActionsTypes.CLEAR_IS_EMPTY_CHATS_STATE,
  payload: any
}
interface GetChats {
  type: DialogsActionsTypes.GET_CHATS,
  payload: any
}
interface SetSearchChats {
  type: DialogsActionsTypes.SET_SEARCH_CHAT,
  payload: Array<SearchChatsItemTypes>
}
interface ClearSearchChats {
  type: DialogsActionsTypes.CLEAR_SEARCH_CHAT,
  payload: any
}
interface ClearChats {
  type: DialogsActionsTypes.CLEAR_CHATS,
  payload: any
}
interface IsEmptyMessages {
  type: DialogsActionsTypes.IS_EMPTY_MESSAGES,
  payload: IsEmptyMessagesTypes
}
interface IsNotEmptyMessages {
  type: DialogsActionsTypes.IS_NOT_EMPTY_MESSAGES,
  payload: any
}
interface SetMessages {
  type: DialogsActionsTypes.SET_MESSAGES,
  payload: Array<MessageItemTypes>
}
interface SendMessage {
  type: DialogsActionsTypes.SEND_MESSAGE,
  payload: MessageItemTypes
}
interface ClearMessages {
  type: DialogsActionsTypes.CLEAR_MESSAGES,
  payload: any
}

export type DialogsActions = SetIsEmptyChatsState | ClearIsEmptyChatsState | GetChats | SetSearchChats | ClearSearchChats | ClearChats | IsEmptyMessages | IsNotEmptyMessages | SetMessages | SendMessage | ClearMessages;