import {
  CHANGE_PAGE_STORE,
  CLEAR_ANIME_LIST,
  CLEAR_ERROR,
  CLEAR_SEARCH_TITLE,
  SET_ANIME,
  SET_ERROR,
  SET_SEARCH_TITLE,
} from '../types/animePageTypes';

const initialState = {
  animeList: {},
  searchTitle: null,
  error: null,
};

const animeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ANIME:
      return {
        ...state,
        animeList: payload,
      };

    case CHANGE_PAGE_STORE:
      return {
        ...state,
        animeList: {
          ...state.animeList,
          current_page: payload,
        },
      };
    case SET_SEARCH_TITLE:
      return {
        ...state,
        searchTitle: payload,
      };
    case CLEAR_SEARCH_TITLE:
      return {
        ...state,
        searchTitle: payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_ANIME_LIST:
      return {
        ...state,
        animeList: {},
      };
    default:
      return state;
  }
};

export default animeReducer;
