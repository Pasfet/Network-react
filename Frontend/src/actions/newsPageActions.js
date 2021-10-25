import { SET_NEWS, CLEAR_NEWS } from '../store/types/newsPageTypes';
import { setError } from './errorActions';
import { loadingFalse, loadingTrue } from './spinnerActions';

const API_KEY = 'e7c6177a32fe4548aee42cbab38d788f';

export const setNews = news => ({
  type: SET_NEWS,
  payload: news,
});

export const clearNews = () => ({
  type: CLEAR_NEWS,
});

export const getNewsAPI = page => {
  return async dispatch => {
    dispatch(loadingTrue());
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?pageSize=10&country=ru&category=technology&page=${page}&apiKey=${API_KEY}`,
      );
      const data = await response.json();
      dispatch(setNews(data.articles));
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};
