import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import errorReducer from '../../store/errorReducer/errorReducer';
import dialogsReducer from '../../store/dialogsReducer/dialogsReducer';

import fetchMock from 'jest-fetch-mock';
import {
  addChatToApi,
  deleteChatFromAPI,
  getChatsList,
  getMessagesFromAPI,
  searchUsersChat,
} from '../dialogsActions';

fetchMock.enableMocks();

describe('Dialogs actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const reducerMock = combineReducers({
    profilePage: (state = {}) => state,
    dialogsPage: dialogsReducer,
    spinner: (state = {}) => state,
    auth: (state = {}) => state,
    error: errorReducer,
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('GetChatsList action', () => {
    it('Get chats with result === 0', () => {
      fetchMock.mockResponse(JSON.stringify({ result: 0, chats: { id2: { chat_name: 'Test' } } }));
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getChatsList('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.dialogsPage.chats).toEqual({ id2: { chat_name: 'Test' } });
        expect(initialState.dialogsPage.isEmptyChats).toBeNull();
      });
    });

    it('Get chats with code === 3', () => {
      fetchMock.mockResponse(
        JSON.stringify({ result: 2, type: 'chats', text: 'Пока нет чатов', code: 3 }),
      );
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getChatsList('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.dialogsPage.chats).toEqual({});
        expect(initialState.dialogsPage.isEmptyChats).toEqual({
          message: 'Пока нет чатов',
          isEmpty: true,
        });
      });
    });

    it('Get chats with result === 1', () => {
      fetchMock.mockResponse(JSON.stringify({ result: 1, type: 'chats', text: 'error', code: 2 }));
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getChatsList('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.error).toEqual({ message: 'error', type: 'chats', code: 2 });
      });
    });

    it('Get chats with Error', () => {
      fetchMock.mockReject(new Error('Failed'));
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getChatsList('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.error).toEqual({ message: 'Failed', type: 'error' });
      });
    });
  });

  describe('SearchUsersChat', () => {
    it('searchUsersChat with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({ result: 0, users: [{ user_name: 'Testname', uid: 'id1' }] }),
      );
      let initialState = {
        dialogsPage: {
          searchChats: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(searchUsersChat('test', 'id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.dialogsPage.searchChats).toEqual([
          { user_name: 'Testname', uid: 'id1' },
        ]);
      });
    });

    it('searchUsersChat with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({ result: 2, text: 'Ничего не найдено', type: 'search-chats', code: 2 }),
      );
      let initialState = {
        dialogsPage: {
          searchChats: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(searchUsersChat('test', 'id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.dialogsPage.searchChats).toEqual([]);
        expect(initialState.error.error).toEqual({
          message: 'Ничего не найдено',
          type: 'search-chats',
          code: 2,
        });
      });
    });

    it('searchUsersChat with error', () => {
      fetchMock.mockReject(new Error('Failed'));
      let initialState = {
        dialogsPage: {
          searchChats: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(searchUsersChat('test', 'id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.dialogsPage.searchChats).toEqual([]);
        expect(initialState.error.error).toEqual({
          message: 'Failed',
          type: 'error',
        });
      });
    });
  });

  describe('AddChatToApi', () => {
    it('AddChatToApi with result === 0', () => {
      fetchMock.mockResponse(JSON.stringify({ result: 0, text: 'Успешно!', type: 'chats' }));
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(addChatToApi('id1', { uid: 'id2', user_name: 'TestName' })).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toEqual({
          result: 0,
          text: 'Успешно!',
        });
      });
    });

    it('AddChatToApi with result === 2', () => {
      fetchMock.mockResponse(JSON.stringify({ result: 2, text: 'Уже добавлено', type: 'chats' }));
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(addChatToApi('id1', { uid: 'id2', user_name: 'TestName' })).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.error).toEqual({ message: 'Уже добавлено', type: 'chats' });
        expect(initialState.error.snackMessage).toEqual({
          result: 2,
          text: 'Уже добавлено',
        });
      });
    });

    it('AddChatToApi with Error', () => {
      fetchMock.mockRejectOnce(new Error('Failed'));

      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(addChatToApi('id1', { uid: 'id2', user_name: 'TestName' })).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.error).toEqual({ message: 'Failed', type: 'error' });
      });
    });
  });

  describe('DeleteChatFromAPI', () => {
    it('DeleteChatFromAPI with result === 0', () => {
      fetchMock.mockResponse(JSON.stringify({ result: 0, text: 'Удалено', type: 'chats' }));
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(deleteChatFromAPI('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toEqual({
          result: 0,
          text: 'Удалено',
        });
      });
    });

    it('DeleteChatFromAPI with result === 2', () => {
      fetchMock.mockResponse(JSON.stringify({ result: 2, text: 'Что-то не так', type: 'chats' }));
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(deleteChatFromAPI('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.error).toEqual({
          type: 'chats',
          message: 'Что-то не так',
        });
        expect(initialState.error.snackMessage).toEqual({ text: 'Что-то не так', result: 2 });
      });
    });

    it('DeleteChatFromAPI with Error', () => {
      fetchMock.mockReject(new Error('Failed'));
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(deleteChatFromAPI('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({ message: 'Failed', type: 'error' });
      });
    });
  });

  describe('GetMessagesFromAPI', () => {
    it('GetMessagesFromAPI with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({ result: 0, payload: [{ id: '1', text: 'text', authorUid: 'id2' }] }),
      );
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
          messages: [],
          isEmptyMessages: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getMessagesFromAPI('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.dialogsPage.isEmptyMessages).toBeNull();
        expect(initialState.dialogsPage.messages).toEqual([
          { id: '1', text: 'text', authorUid: 'id2' },
        ]);
        expect(initialState.error.error).toBeNull();
        expect(initialState.error.snackMessage).toBeNull();
      });
    });

    it('GetMessagesFromAPI with result === 1', () => {
      fetchMock.mockResponse(
        JSON.stringify({ result: 1, text: 'Что-то не так', type: 'get-messages' }),
      );
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
          messages: [],
          isEmptyMessages: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getMessagesFromAPI('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.dialogsPage.isEmptyMessages).toBeNull();
        expect(initialState.dialogsPage.messages).toEqual([]);
        expect(initialState.error.error).toEqual({
          message: 'Что-то не так',
          type: 'get-messages',
        });
        expect(initialState.error.snackMessage).toBeNull();
      });
    });

    it('GetMessagesFromAPI with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({ result: 2, type: 'messages', text: 'Пока нет сообщений', code: 3 }),
      );
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
          messages: [],
          isEmptyMessages: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getMessagesFromAPI('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.dialogsPage.isEmptyMessages).toEqual({
          message: 'Пока нет сообщений',
          code: 3,
        });
        expect(initialState.dialogsPage.messages).toEqual([]);
        expect(initialState.error.error).toBeNull();
        expect(initialState.error.snackMessage).toBeNull();
      });
    });

    it('GetMessagesFromAPI with Error', () => {
      fetchMock.mockReject(new Error('Failed'));
      let initialState = {
        dialogsPage: {
          chats: {},
          isEmptyChats: null,
          messages: [],
          isEmptyMessages: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getMessagesFromAPI('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.dialogsPage.isEmptyMessages).toBeNull();
        expect(initialState.dialogsPage.messages).toEqual([]);
        expect(initialState.error.error).toEqual({ message: 'Failed', type: 'error' });
        expect(initialState.error.snackMessage).toBeNull();
      });
    });
  });
});
