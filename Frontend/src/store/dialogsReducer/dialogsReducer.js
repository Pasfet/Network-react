import {
  CLEAR_CHATS,
  CLEAR_IS_EMPTY_CHATS_STATE,
  CLEAR_MESSAGES,
  CLEAR_SEARCH_CHAT,
  GET_CHATS,
  SET_IS_EMPTY_CHATS_STATE,
  SET_MESSAGES,
  SET_SEARCH_CHAT,
  IS_EMPTY_MESSAGES,
  IS_NOT_EMPTY_MESSAGES,
} from '../types/dialogsTypes';

const initialState = {
  chats: {},
  isEmptyChats: null,
  searchChats: [],
  messages: [],
  isEmptyMessages: null,
};

const dialogsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_EMPTY_CHATS_STATE:
      return {
        ...state,
        isEmptyChats: payload,
      };
    case CLEAR_IS_EMPTY_CHATS_STATE:
      return {
        ...state,
        isEmptyChats: null,
      };
    case GET_CHATS:
      return {
        ...state,
        chats: payload,
      };
    case SET_SEARCH_CHAT:
      return {
        ...state,
        searchChats: payload,
      };
    case CLEAR_SEARCH_CHAT:
      return {
        ...state,
        searchChats: [],
      };
    case CLEAR_CHATS:
      return {
        ...state,
        chats: {},
      };
    case IS_EMPTY_MESSAGES:
      return {
        ...state,
        isEmptyMessages: payload,
      };
    case IS_NOT_EMPTY_MESSAGES:
      return {
        ...state,
        isEmptyMessages: null,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
};
export default dialogsReducer;
