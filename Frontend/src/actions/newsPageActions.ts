import {Dispatch} from 'redux';
import { NewsActions, NewsActionsTypes, NewsItemTypes } from '../types/newsPageTypes';
import { setError } from './errorActions';
import { loadingFalse, loadingTrue } from './spinnerActions';
const API_KEY = '6e5d9a98a4077dac3b572af57cec289f';

export const setNews = (news: Array<NewsItemTypes>): NewsActions => ({
  type: NewsActionsTypes.SET_NEWS,
  payload: news,
});

export const clearNews = (): NewsActions => ({
  type: NewsActionsTypes.CLEAR_NEWS,
  payload: null
});

export const getNewsAPI = (page: number) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    dispatch(loadingTrue());
    try {
      const response = await fetch(
        `http://api.mediastack.com/v1/news?access_key=${API_KEY}&languages=ru&countries=ru&limit=${page}`,
      );
      const data = await response.json();
      dispatch(setNews(data.data));
    } catch (err: any) {
      dispatch(setError({ message: err.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};
