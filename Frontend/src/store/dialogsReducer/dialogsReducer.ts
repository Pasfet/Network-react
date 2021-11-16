import {
  DialogsActions,
  DialogsActionsTypes,
  DialogsStateTypes,
} from '../../types/dialogsTypes';

const initialState : DialogsStateTypes = {
  chats: {},
  isEmptyChats: null,
  searchChats: [],
  messages: [],
  isEmptyMessages: null,
};

const dialogsReducer = (state = initialState, { type, payload } : DialogsActions) : DialogsStateTypes => {
  switch (type) {
    case DialogsActionsTypes.SET_IS_EMPTY_CHATS_STATE:
      return {
        ...state,
        isEmptyChats: payload,
      };
    case DialogsActionsTypes.CLEAR_IS_EMPTY_CHATS_STATE:
      return {
        ...state,
        isEmptyChats: null,
      };
    case DialogsActionsTypes.GET_CHATS:
      return {
        ...state,
        chats: payload,
      };
    case DialogsActionsTypes.SET_SEARCH_CHAT:
      return {
        ...state,
        searchChats: payload,
      };
    case DialogsActionsTypes.CLEAR_SEARCH_CHAT:
      return {
        ...state,
        searchChats: [],
      };
    case DialogsActionsTypes.CLEAR_CHATS:
      return {
        ...state,
        chats: {},
      };
    case DialogsActionsTypes.IS_EMPTY_MESSAGES:
      return {
        ...state,
        isEmptyMessages: payload,
      };
    case DialogsActionsTypes.IS_NOT_EMPTY_MESSAGES:
      return {
        ...state,
        isEmptyMessages: null,
      };
    case DialogsActionsTypes.SET_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    case DialogsActionsTypes.SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case DialogsActionsTypes.CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
};
export default dialogsReducer;
