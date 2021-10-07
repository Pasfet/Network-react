import {
  CHANGE_PAGE_STORE,
  CLEAR_ANIME_LIST,
  CLEAR_ERROR,
  CLEAR_SEARCH_TITLE,
  SET_ANIME,
  SET_ERROR,
  SET_SEARCH_TITLE,
} from '../store/types/animePageTypes';
import { loadingFalse, loadingTrue } from './spinnerAction';
const ANIME_API_BASE_URL = 'https://api.aniapi.com';
const GET_ANIME_URL = ANIME_API_BASE_URL + '/v1/anime?per_page=10';

export const setAnimeList = data => ({
  type: SET_ANIME,
  payload: data,
});

export const changePageStore = pageNumber => ({
  type: CHANGE_PAGE_STORE,
  payload: pageNumber,
});

export const setSearchTitle = title => ({
  type: SET_SEARCH_TITLE,
  payload: title,
});

export const clearSearchTitle = () => ({
  type: CLEAR_SEARCH_TITLE,
  payload: null,
});

export const setError = msg => ({
  type: SET_ERROR,
  payload: msg,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
  payload: null,
});

export const clearAnimeList = () => ({
  type: CLEAR_ANIME_LIST,
});

export const getAllAnime =
  (pageNumber = 1, title) =>
  async dispatch => {
    dispatch(loadingTrue());
    try {
      const response = await fetch(
        `${GET_ANIME_URL}&page=${pageNumber}${title ? `&title=${title}` : ''}`,
      );
      const result = await response.json();
      dispatch(setAnimeList(result.data));
      dispatch(changePageStore(pageNumber));
    } catch (e) {
      dispatch(setError(e));
    }
    dispatch(loadingFalse());
  };

export const changePage = (pageNumber, title) => dispatch => {
  dispatch(loadingTrue());
  dispatch(getAllAnime(pageNumber, title));
  dispatch(changePageStore(pageNumber));
  dispatch(loadingFalse());
};

export const searchAnime = title => dispatch => {
  dispatch(loadingTrue());
  dispatch(setSearchTitle(title));
  dispatch(getAllAnime(1, title));
  dispatch(loadingFalse());
};
