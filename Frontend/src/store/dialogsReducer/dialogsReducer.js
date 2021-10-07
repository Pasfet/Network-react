import { CLEAR_CHATS, CLEAR_SEARCH_CHAT, GET_CHATS, SET_SEARCH_CHAT } from '../types/dialogsTypes';

const initialState = {
  chats: {},
  searchChats: [],
};

const dialogsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
    default:
      return state;
  }
};
export default dialogsReducer;
