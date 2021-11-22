import { NewsActions, NewsActionsTypes, NewsStateTypes } from "../../types/newsPageTypes";

const initialState:NewsStateTypes = {
  news: [],
};

const newsReducer = (state = initialState, { type, payload } : NewsActions) : NewsStateTypes => {
  switch (type) {
    case NewsActionsTypes.SET_NEWS:
      return {
        ...state,
        news: [...payload],
      };

    case NewsActionsTypes.CLEAR_NEWS:
      return {
        ...state,
        news: [],
      };
    default:
      return state;
  }
};

export default newsReducer;
