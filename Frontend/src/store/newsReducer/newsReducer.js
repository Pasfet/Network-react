import { CLEAR_NEWS, SET_NEWS } from '../types/newsPageTypes';

const initialState = {
  news: [],
};

const newsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NEWS:
      return {
        ...state,
        news: [...state.news, ...payload],
      };

    case CLEAR_NEWS:
      return {
        ...state,
        news: [],
      };
    default:
      return state;
  }
};

export default newsReducer;
