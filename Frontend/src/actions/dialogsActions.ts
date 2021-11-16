import {Dispatch} from 'redux';
import { CURRENT_URL, UserChatTypes } from '../types/authTypes';
import { DialogsActions, DialogsActionsTypes, IsEmptyChatsTypes, IsEmptyMessagesTypes, MessageItemTypes, SearchChatsItemTypes } from '../types/dialogsTypes';
import { dialogsChatsActionsHelper } from './actionHelper';
import { clearError, setError } from './errorActions';

export const getChats = (chats: any): DialogsActions => ({
  type: DialogsActionsTypes.GET_CHATS,
  payload: chats,
});

export const setSearchChats = (chats: Array<SearchChatsItemTypes>): DialogsActions => ({
  type: DialogsActionsTypes.SET_SEARCH_CHAT,
  payload: chats,
});

export const clearSearchChats = (): DialogsActions => ({
  type: DialogsActionsTypes.CLEAR_SEARCH_CHAT,
  payload: null
});

export const clearChats = (): DialogsActions => ({
  type: DialogsActionsTypes.CLEAR_CHATS,
  payload: null
});

export const setMessagesFromApi = (messages: Array<MessageItemTypes>): DialogsActions => ({
  type: DialogsActionsTypes.SET_MESSAGES,
  payload: messages,
});

export const clearMessages = (): DialogsActions=> ({
  type: DialogsActionsTypes.CLEAR_MESSAGES,
  payload: null
});

export const sendMessageToStore = (payload: MessageItemTypes): DialogsActions => ({
  type: DialogsActionsTypes.SEND_MESSAGE, 
  payload,
});

export const setIsEmptyChatsState = (message: IsEmptyChatsTypes): DialogsActions => ({
  type: DialogsActionsTypes.SET_IS_EMPTY_CHATS_STATE,
  payload: message,
});

export const clearIsEmptyChatsState = (): DialogsActions => ({
  type: DialogsActionsTypes.CLEAR_IS_EMPTY_CHATS_STATE,
  payload: null
});

export const isEmptyMessages = (message: IsEmptyMessagesTypes): DialogsActions => ({
  type: DialogsActionsTypes.IS_EMPTY_MESSAGES,
  payload: message,
});

export const isNotEmptyMessages = (): DialogsActions => ({
  type: DialogsActionsTypes.IS_NOT_EMPTY_MESSAGES,
  payload: null
});

export const searchUsersChat = (text: string, uid: string) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    dispatch(clearError());
    try {
      const response = await fetch(`${CURRENT_URL}/dialogs?uid=${uid}&searchChat=${text}`);
      const data = await response.json();
      if (data.result === 0) {
        dispatch(setSearchChats(data.users));
      } else {
        dispatch(setError({ message: data.text, type: data.type, code: data.code }));
      }
    } catch (err: any) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const getChatsList = (uid: string) => {
  return async (dispatch: Dispatch<any>): Promise<void>=> {
    try {
      const response = await fetch(`${CURRENT_URL}/dialogs/${uid}`);
      const data = await response.json();
      if (data.result === 0) {
        dispatch(getChats(data.chats));
        dispatch(clearIsEmptyChatsState());
      } else if (data.code === 3) {
        dispatch(setIsEmptyChatsState({ message: data.text, isEmpty: true }));
        dispatch(clearChats());
      } else {
        dispatch(setError({ message: data.text, type: data.type, code: data.code }));
      }
    } catch (err: any) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const addChatToApi = (uid: string, user: UserChatTypes) => {
  return (dispatch: Dispatch<any>) : Promise<any> => {
    return dialogsChatsActionsHelper('POST', { uid, user }, dispatch);
  };
};

export const deleteChatFromAPI = (uid: string, chatId: string) => {
  return (dispatch: Dispatch<any>): Promise<void> => {
    return dialogsChatsActionsHelper('DELETE', { uid, chatId }, dispatch);
  };
};

export const getMessagesFromAPI = (uid: string, chatId: string) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    dispatch(isNotEmptyMessages());
    try {
      const response = await fetch(`${CURRENT_URL}/dialogs/${uid}/${chatId}`);
      const data = await response.json();
      if (data.result === 0) {
        dispatch(setMessagesFromApi(data.payload));
      } else if (data.code === 3) {
        dispatch(isEmptyMessages({ message: data.text, code: data.code }));
      } else {
        dispatch(setError({ message: data.text, type: data.type }));
      }
    } catch (err: any) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};
