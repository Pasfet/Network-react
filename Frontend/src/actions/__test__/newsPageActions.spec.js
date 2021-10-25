import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import errorReducer from '../../store/errorReducer/errorReducer';
import fetchMock from 'jest-fetch-mock';
import newsReducer from '../../store/newsReducer/newsReducer';
import { getNewsAPI } from '../newsPageActions';

fetchMock.enableMocks();

describe('News actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const reducerMock = combineReducers({
    profilePage: (state = {}) => state,
    dialogsPage: (state = {}) => state,
    spinner: (state = {}) => state,
    auth: (state = {}) => state,
    error: errorReducer,
    newsPage: newsReducer,
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('NewsPage actions', () => {
    describe('GetNewsAPI action', () => {
      it('GetNewsAPI with result === 0', () => {
        const mockArticles = [{ id: '1', source: { name: 'namesource' }, text: 'Text' }];
        fetchMock.mockResponse(JSON.stringify({ result: 0, articles: mockArticles }));

        let initialState = {
          newsPage: {
            news: [],
          },
          error: { error: null },
        };

        const store = mockStore(() => initialState);

        return store.dispatch(getNewsAPI(1)).then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.newsPage.news).toEqual(mockArticles);
          expect(initialState.error.error).toBeNull();
        });
      });

      it('GetNewsAPI with Error', () => {
        fetchMock.mockReject(new Error('Failed to fetch'));

        let initialState = {
          newsPage: {
            news: [],
          },
          error: { error: null },
        };

        const store = mockStore(() => initialState);

        return store.dispatch(getNewsAPI(1)).then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.newsPage.news).toEqual([]);
          expect(initialState.error.error).toEqual({ message: 'Failed to fetch', type: 'error' });
        });
      });
    });
  });
});
