import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import authReducer from '../../store/auth/authReducer';
import profileReducer from '../../store/profileReducer/profileReducer';
import errorReducer from '../../store/errorReducer/errorReducer';
import { authorization, logOut, registration } from '../authActions';

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

  describe('Authorization action', () => {
    describe('Valid authorization', () => {
      it('Authorization with result === 0', () => {
        let initialState = {};
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve({ result: 0, uid: 1 }),
          }),
        );

        const store = mockStore(() => initialState);

        return store.dispatch(authorization({ email: mockEmail, password: mockPass })).then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.auth.isAuth).toBe(true);
          expect(initialState.profilePage.uid).toBe(1);
        });
      });
    });
    describe('Invalid authorization', () => {
      it('Authorization with result invalid email or password', () => {
        let initialState = {};
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () =>
              Promise.resolve({ result: 2, text: 'Неверный логин или пароль', type: 'login' }),
          }),
        );
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
        let initialState = {};

        global.fetch = jest.fn(() => Promise.reject(new Error('Fail to fetch')));

        const store = mockStore(() => initialState);

        return store.dispatch(authorization({ email: mockEmail, password: mockPass })).then(() => {
          const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

          actions.forEach(action => {
            initialState = reducerMock(initialState, action);
          });

          expect(initialState.error.error).toEqual({
            message: 'Fail to fetch',
            type: 'error',
          });
        });
      });
    });
  });

  describe('Regustration action', () => {
    describe('Valid registration', () => {
      it('Registration with result === 0', () => {
        let initialState = {};

        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve({ result: 0, text: 'Успешно' }),
          }),
        );

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
        let initialState = {};

        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () =>
              Promise.resolve({
                result: 2,
                text: 'Такой пользователь уже существует',
                type: 'signup',
              }),
          }),
        );

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
    });
    describe('Invalid registration', () => {
      it('Registration with error', () => {
        let initialState = {};

        global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch')));

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
  });

  describe('Logout', () => {
    it('Log out', () => {
      let initialState = {
        auth: { isAuth: true },
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
});
