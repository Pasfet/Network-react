import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import authReducer from '../../store/auth/authReducer';
import profileReducer from '../../store/profileReducer/profileReducer';
import errorReducer from '../../store/errorReducer/errorReducer';
import { authorization, logOut, registration } from '../authActions';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Auth actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const reducerMock = combineReducers({
    profilePage: profileReducer,
    dialogsPage: (state = {}) => state,
    spinner: (state = {}) => state,
    auth: authReducer,
    error: errorReducer,
  });

  const mockEmail = 'test@example.com';
  const mockPass = '123456789';
  const mockName = 'Myname';

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('Authorization action', () => {
    it('Authorization with result === 0', () => {
      fetchMock.mockResponse(JSON.stringify({ result: 0, uid: 1 }));
      let initialState = {
        auth: { isAuth: false },
        profilePage: {
          uid: null,
        },
        error: { error: null },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(authorization({ email: mockEmail, password: mockPass })).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.profilePage.uid).toBe(1);
      });
    });
    it('Authorization with result invalid email or password', () => {
      fetchMock.mockResponse(
        JSON.stringify({ result: 2, text: 'Неверный логин или пароль', type: 'login' }),
      );

      let initialState = {
        auth: { isAuth: false },
        profilePage: {
          uid: null,
        },
        error: { error: null },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(authorization({ email: mockEmail, password: mockPass })).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.error).toEqual({
          message: 'Неверный логин или пароль',
          type: 'login',
        });
        expect(initialState.auth.isAuth).toBe(false);
      });
    });

    it('Authorization with error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));
      let initialState = {
        auth: { isAuth: false },
        profilePage: {
          uid: null,
        },
        error: {
          error: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(authorization({ email: mockEmail, password: mockPass })).then(() => {
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

  describe('Registration action', () => {
    it('Registration with result === 0', () => {
      fetchMock.mockResponse(JSON.stringify({ result: 0, text: 'Успешно' }));
      let initialState = {
        auth: { isAuth: false },
        error: { error: null },
      };

      const store = mockStore(() => initialState);

      return store
        .dispatch(registration({ name: mockName, email: mockEmail, password: mockPass }))
        .then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.auth.isAuth).toBe(true);
          expect(initialState.error.error).toBeNull();
        });
    });
    it('Registration if user was register', () => {
      fetchMock.mockResponse(
        JSON.stringify({ result: 2, text: 'Такой пользователь уже существует', type: 'signup' }),
      );

      let initialState = {
        auth: { isAuth: false },
        error: { error: null },
      };

      const store = mockStore(() => initialState);

      return store
        .dispatch(registration({ name: mockName, email: mockEmail, password: mockPass }))
        .then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.error.error).toEqual({
            message: 'Такой пользователь уже существует',
            type: 'signup',
          });
          expect(initialState.auth.isAuth).toBe(false);
        });
    });
    it('Registration with error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        auth: { isAuth: false },
        error: { error: null },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(authorization({ email: mockEmail, password: mockPass })).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.error).toEqual({ message: 'Failed to fetch', type: 'error' });
        expect(initialState.auth.isAuth).toBe(false);
      });
    });
  });
  it('Log out', () => {
    let initialState = {
      auth: { isAuth: true },
      error: { error: null },
    };

    const store = mockStore(() => initialState);

    store.dispatch(logOut());
    const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

    actions.forEach(action => {
      initialState = reducerMock(initialState, action);
    });

    expect(initialState.error.error).toBeNull();
    expect(initialState.auth.isAuth).toBe(false);
  });
});
