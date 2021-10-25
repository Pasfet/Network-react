import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import errorReducer from '../../store/errorReducer/errorReducer';
import fetchMock from 'jest-fetch-mock';
import usersReducer from '../../store/usersReducer/usersReducer';
import { getUsersList } from '../usersActions';

fetchMock.enableMocks();

describe('Users actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const reducerMock = combineReducers({
    profilePage: (state = {}) => state,
    dialogsPage: (state = {}) => state,
    spinner: (state = {}) => state,
    auth: (state = {}) => state,
    error: errorReducer,
    newsPage: (state = {}) => state,
    usersPage: usersReducer,
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('Users actions', () => {
    describe('GetUsersList action', () => {
      it('GetUsersList with result === 0', () => {
        const mockResponse = {
          result: 0,
          users: [
            { uid: 'id1', user_name: 'name' },
            { uid: 'id2', user_name: 'test' },
          ],
          page_length: 2,
          last_page: 1,
        };
        fetchMock.mockResponse(JSON.stringify(mockResponse));

        let initialState = {
          usersPage: {
            users: [],
            usersListLength: null,
            lastPage: null,
          },
          error: { error: null },
        };

        const store = mockStore(() => initialState);

        return store.dispatch(getUsersList()).then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.usersPage.users).toEqual(mockResponse.users);
          expect(initialState.usersPage.lastPage).toEqual(mockResponse.last_page);
          expect(initialState.usersPage.usersListLength).toEqual(mockResponse.page_length);
          expect(initialState.error.error).toBeNull();
        });
      });

      it('GetUsersList with result === 2', () => {
        const mockResponse = {
          result: 2,
          text: 'Пусто',
          type: 'get-users-list',
        };
        fetchMock.mockResponse(JSON.stringify(mockResponse));

        let initialState = {
          usersPage: {
            users: [],
            usersListLength: null,
            lastPage: null,
          },
          error: { error: null },
        };

        const store = mockStore(() => initialState);

        return store.dispatch(getUsersList()).then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.usersPage.users).toEqual([]);
          expect(initialState.usersPage.lastPage).toBeNull();
          expect(initialState.usersPage.usersListLength).toBeNull();
          expect(initialState.error.error).toEqual({
            message: mockResponse.text,
            type: mockResponse.type,
          });
        });
      });

      it('GetUsersList with Error', () => {
        fetchMock.mockReject(new Error('Failed to fetch'));

        let initialState = {
          usersPage: {
            users: [],
            usersListLength: null,
            lastPage: null,
          },
          error: { error: null },
        };

        const store = mockStore(() => initialState);

        return store.dispatch(getUsersList()).then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.usersPage.users).toEqual([]);
          expect(initialState.usersPage.lastPage).toBeNull();
          expect(initialState.usersPage.usersListLength).toBeNull();
          expect(initialState.error.error).toEqual({
            message: 'Failed to fetch',
            type: 'error',
          });
        });
      });
    });
  });
});
