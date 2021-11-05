import { SET_NEWS, CLEAR_NEWS } from '../store/types/newsPageTypes';
import { setError } from './errorActions';
import { loadingFalse, loadingTrue } from './spinnerActions';
// OLD `https://newsapi.org/v2/top-headlines?pageSize=10&country=ru&category=technology&page=${page}&apiKey=${API_KEY}`,
// const API_KEY = 'e7c6177a32fe4548aee42cbab38d788f';
const API_KEY = '6e5d9a98a4077dac3b572af57cec289f';

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
        `http://api.mediastack.com/v1/news?access_key=${API_KEY}&languages=ru&countries=ru&limit=${page}`,
      );
      const data = await response.json();
      dispatch(setNews(data.data));
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};
