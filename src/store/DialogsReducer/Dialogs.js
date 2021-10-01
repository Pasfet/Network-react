import { ADD_CHAT, DELETE_CHAT, SEND_MESSAGES } from '../types/dialogsTypes';

const initialState = {
  chats: {},
};

const dialogsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CHAT:
      return {
        ...state,
        chats: {
          ...state.chats,
          [`id${Object.keys(state.chats).length + 1}`]: {
            id: Object.keys(state.chats).length + 1,
            name: payload,
            messages: [],
          },
        },
      };

    case DELETE_CHAT:
      const chats = Object.fromEntries(Object.entries(state.chats).filter(el => el[0] !== payload));
      return {
        ...state,
        chats: {
          ...chats,
        },
      };
    case SEND_MESSAGES:
      const { id, message, author } = payload;
      const newMsg = {
        id: state.chats[id].messages.length + 1,
        text: message,
        author: author,
      };
      return {
        ...state,
        chats: {
          ...state.chats,
          [payload.id]: {
            ...state.chats[payload.id],
            messages: [...state.chats[payload.id].messages, newMsg],
          },
        },
      };
    default:
      return state;
  }
};
export default dialogsReducer;
