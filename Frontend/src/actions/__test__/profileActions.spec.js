import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import errorReducer from '../../store/errorReducer/errorReducer';
import profileReducer from '../../store/profileReducer/profileReducer';

import fetchMock from 'jest-fetch-mock';
import { getUser, setAboutUser, setStatus } from '../profileActions';

fetchMock.enableMocks();

describe('Profile actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const reducerMock = combineReducers({
    profilePage: profileReducer,
    dialogsPage: (state = {}) => state,
    spinner: (state = {}) => state,
    auth: (state = {}) => state,
    error: errorReducer,
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('GetUser action', () => {
    it('Get user with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          user: {
            name: 'MyName',
            status: 'MyStatus',
            about: { lang: { text: 'lang', payload: 'Eng' } },
          },
        }),
      );
      let initialState = {
        profilePage: {
          profileEdit: false,
          uid: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getUser('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.profilePage.user).toEqual({
          name: 'MyName',
          status: 'MyStatus',
          about: { lang: { text: 'lang', payload: 'Eng' } },
        });
      });
    });

    it('Get user with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Такой пользователь не найден',
          type: 'profile',
        }),
      );
      let initialState = {
        profilePage: {
          profileEdit: false,
          uid: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getUser('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.profilePage.user).toBeNull();
        expect(initialState.error.error).toEqual({
          message: 'Такой пользователь не найден',
          type: 'profile',
        });
      });
    });

    it('Get user with error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));
      let initialState = {
        profilePage: {
          profileEdit: false,
          uid: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getUser('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.profilePage.user).toBeNull();
        expect(initialState.error.error).toEqual({
          message: 'Failed to fetch',
          type: 'error',
        });
      });
    });
  });

  describe('SetStatus action', () => {
    it('SetStatus with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          text: 'Статус изменен!',
        }),
      );
      let initialState = {
        profilePage: {
          profileEdit: false,
          uid: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(setStatus('MyStatus', 'id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toEqual({ text: 'Статус изменен!', result: 0 });
      });
    });

    it('SetStatus with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Ошибка',
          type: 'profile',
        }),
      );
      let initialState = {
        profilePage: {
          profileEdit: false,
          uid: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(setStatus('MyStatus', 'id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toEqual({ text: 'Ошибка', result: 2 });
        expect(initialState.error.error).toEqual({ message: 'Ошибка', result: 2, type: 'profile' });
      });
    });

    it('SetStatus with error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));
      let initialState = {
        profilePage: {
          profileEdit: false,
          uid: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(setStatus('MyStatus', 'id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.error).toEqual({ message: 'Failed to fetch', type: 'error' });
      });
    });
  });

  describe('SetAboutUser action', () => {
    it('SetAboutUser with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          text: 'Сохранено!',
        }),
      );
      let initialState = {
        profilePage: {
          profileEdit: false,
          uid: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store
        .dispatch(setAboutUser('id1', { lang: { text: 'Lang', payload: 'Eng' } }))
        .then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.error.snackMessage).toEqual({ text: 'Сохранено!', result: 0 });
        });
    });

    it('SetAboutUser with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Ошибка',
          type: 'edit-profile',
        }),
      );
      let initialState = {
        profilePage: {
          profileEdit: false,
          uid: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store
        .dispatch(setAboutUser('id1', { lang: { text: 'Lang', payload: 'Eng' } }))
        .then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.error.snackMessage).toEqual({ text: 'Ошибка', result: 2 });
          expect(initialState.error.error).toEqual({
            message: 'Ошибка',
            result: 2,
            type: 'edit-profile',
          });
        });
    });

    it('SetAboutUser with error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));
      let initialState = {
        profilePage: {
          profileEdit: false,
          uid: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store
        .dispatch(setAboutUser('id1', { lang: { text: 'Lang', payload: 'Eng' } }))
        .then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.error.error).toEqual({
            message: 'Failed to fetch',
            type: 'error',
          });
        });
    });
  });
});
