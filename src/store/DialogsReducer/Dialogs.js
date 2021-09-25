import { ADD_CHAT, DELETE_CHAT, SEND_MESSAGES } from '../types/dialogsTypes';

const initialState = {
  chats: {
    id0: {
      id: 0,
      name: 'Mike',
      messages: [],
    },
    id1: {
      id: 1,
      name: 'Anna',
      messages: [],
    },
  },
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
      delete state.chats[`id${payload}`];
      return {
        ...state,
      };
    case SEND_MESSAGES:
      const newMsg = {
        id: state.chats[payload.id].messages.length + 1,
        text: payload.message,
        author: payload.author,
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
