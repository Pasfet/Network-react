import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import errorReducer from '../../store/errorReducer/errorReducer';
import profileReducer from '../../store/profileReducer/profileReducer';

import fetchMock from 'jest-fetch-mock';
import {
  addToFriendsList,
  deleteFriendFromFriendsList,
  deleteUserPost,
  getMyFriendsList,
  getUserPosts,
  getUserProfileFromApi,
  rejectFriendRequest,
  sendProfileChange,
  sendRequestToFriendList,
  sendUserPost,
} from '../profileActions';

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

  const URL = 'http://localhost:3001';

  describe('GetUserProfileFromApi action', () => {
    const mockUser = {
      uid: 'id1',
      user_name: 'MyName',
      avatar: null,
      user_friends: [],
      status: 'MyStatus',
      about: { lang: { text: 'lang', payload: 'Eng' } },
    };

    it('GetUserProfileFromApi with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          user: mockUser,
        }),
      );
      let initialState = {
        profilePage: {
          uid: { uid: null, name: null },
          myFriends: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getUserProfileFromApi('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.profilePage.user).toEqual(mockUser);
        expect(initialState.error.error).toBeNull();
      });
    });

    it('GetUserProfileFromApi with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Пользователь не найден',
        }),
      );

      let initialState = {
        profilePage: {
          uid: { uid: null, name: null },
          myFriends: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getUserProfileFromApi('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.profilePage.user).toBeNull();
        expect(initialState.error.error).toBeNull();
        expect(initialState.error.snackMessage).toEqual({
          text: 'Пользователь не найден',
          result: 2,
        });
      });
    });

    it('GetUserProfileFromApi with Error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        profilePage: {
          uid: { uid: null, name: null },
          myFriends: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getUserProfileFromApi('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.profilePage.user).toBeNull();
        expect(initialState.error.error).toEqual({ message: 'Failed to fetch', type: 'error' });
        expect(initialState.error.snackMessage).toBeNull();
      });
    });
  });

  describe('SendProfileChange action', () => {
    const mockRequest = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ about: { lang: 'en', city: 'Moscow' } }),
    };

    it('SendProfileChange with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          text: 'Обновлено!',
        }),
      );

      let initialState = {
        profilePage: {
          uid: { uid: null, name: null },
          myFriends: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(sendProfileChange('id1', mockRequest)).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/profile/id1`);
        expect(initialState.error.snackMessage).toEqual({ text: 'Обновлено!', result: 0 });
      });
    });

    it('SendProfileChange with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Ошибка',
        }),
      );

      let initialState = {
        profilePage: {
          uid: { uid: null, name: null },
          myFriends: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(sendProfileChange('id1', mockRequest)).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toEqual({ text: 'Ошибка', result: 2 });
        expect(initialState.error.error).toEqual({
          message: 'Ошибка',
          type: 'send-profile-change',
        });
      });
    });

    it('SendProfileChange with Error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        profilePage: {
          uid: { uid: null, name: null },
          myFriends: null,
          user: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(sendProfileChange('id1', mockRequest)).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({
          message: 'Failed to fetch',
          type: 'error',
        });
      });
    });
  });

  describe('GetMyFriendsList action', () => {
    const mockFriendsList = {
      friends_requstions: [{ uid: 'id3', user_name: 'Name', avatar: null }],
      user_friends: [{ uid: 'id2', user_name: 'testname', avatar: null }],
    };

    it('GetMyFriendsList with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          friends: mockFriendsList,
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getMyFriendsList('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/friends/id1`);
        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toBeNull();
        expect(initialState.profilePage.myFriends).toEqual(mockFriendsList);
      });
    });

    it('GetMyFriendsList with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Ошибка',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getMyFriendsList('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toEqual({ text: 'Ошибка', result: 2 });
        expect(initialState.error.error).toEqual({ message: 'Ошибка', type: 'get-friends-list' });
        expect(initialState.profilePage.myFriends).toBeNull();
      });
    });

    it('GetMyFriendsList with Error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getMyFriendsList('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({ message: 'Failed to fetch', type: 'error' });
        expect(initialState.profilePage.myFriends).toBeNull();
      });
    });
  });

  describe('SendRequestToFriendList action', () => {
    it('SendRequestToFriendList with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          text: 'Отправлено',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(sendRequestToFriendList('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/friends`, expect.any(Object));
        expect(initialState.error.snackMessage).toEqual({ result: 0, text: 'Отправлено' });
        expect(initialState.error.error).toBeNull();
      });
    });

    it('SendRequestToFriendList with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Заявка уже отправлена',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(sendRequestToFriendList('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toEqual({
          result: 2,
          text: 'Заявка уже отправлена',
        });
        expect(initialState.error.error).toEqual({
          message: 'Заявка уже отправлена',
          type: 'add-friends',
        });
      });
    });

    it('SendRequestToFriendList with Error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(sendRequestToFriendList('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({
          message: 'Failed to fetch',
          type: 'error',
        });
      });
    });
  });

  describe('RejectFriendRequest action', () => {
    it('RejectFriendRequest with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          text: 'Удалено',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(rejectFriendRequest('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/friends`, expect.any(Object));
        expect(initialState.error.snackMessage).toEqual({ result: 0, text: 'Удалено' });
        expect(initialState.error.error).toBeNull();
      });
    });

    it('RejectFriendRequest with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Ошибка',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(rejectFriendRequest('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toEqual({ result: 2, text: 'Ошибка' });
        expect(initialState.error.error).toEqual({
          message: 'Ошибка',
          type: 'reject-friend-request',
        });
      });
    });

    it('RejectFriendRequest with Error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(rejectFriendRequest('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({
          message: 'Failed to fetch',
          type: 'error',
        });
      });
    });
  });

  describe('DeleteFriendFromFriendsList action', () => {
    it('DeleteFriendFromFriendsList with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          text: 'Удален из друзей',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(deleteFriendFromFriendsList('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/friends`, expect.any(Object));
        expect(initialState.error.snackMessage).toEqual({ result: 0, text: 'Удален из друзей' });
        expect(initialState.error.error).toBeNull();
      });
    });

    it('DeleteFriendFromFriendsList with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Уже был удален',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(deleteFriendFromFriendsList('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toEqual({
          result: 2,
          text: 'Уже был удален',
        });
        expect(initialState.error.error).toEqual({
          message: 'Уже был удален',
          type: 'delete-friend',
        });
      });
    });

    it('RejectFriendRequest with Error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(deleteFriendFromFriendsList('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({
          message: 'Failed to fetch',
          type: 'error',
        });
      });
    });
  });

  describe('AddToFriendsList action', () => {
    it('AddToFriendsList with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          text: 'Добавлен в друзья',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(addToFriendsList('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/friends`, expect.any(Object));
        expect(initialState.error.snackMessage).toEqual({ result: 0, text: 'Добавлен в друзья' });
        expect(initialState.error.error).toBeNull();
      });
    });

    it('AddToFriendsList with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Уже в друзьях',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(addToFriendsList('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toEqual({
          result: 2,
          text: 'Уже в друзьях',
        });
        expect(initialState.error.error).toEqual({
          message: 'Уже в друзьях',
          type: 'add-friend',
        });
      });
    });

    it('AddToFriendsList with Error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        profilePage: {
          myFriends: null,
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(addToFriendsList('id1', 'id2')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({
          message: 'Failed to fetch',
          type: 'error',
        });
      });
    });
  });

  describe('GetUserPosts action', () => {
    it('GetUserPosts with result === 0', () => {
      const mockPosts = [{ id: 'id1', text: 'text posts', author_uid: 'id2' }];
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          posts: mockPosts,
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
          posts: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getUserPosts('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/posts?uid=id1`);
        expect(initialState.profilePage.posts).toEqual(mockPosts);
        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toBeNull();
      });
    });

    it('GetUserPosts with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Нет постов',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
          posts: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getUserPosts('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/posts?uid=id1`);
        expect(initialState.profilePage.posts).toEqual([]);
        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({ message: 'Нет постов', type: 'user-posts' });
      });
    });

    it('GetUserPosts with Error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        profilePage: {
          myFriends: null,
          posts: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(getUserPosts('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/posts?uid=id1`);
        expect(initialState.profilePage.posts).toEqual([]);
        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({ message: 'Failed to fetch', type: 'error' });
      });
    });
  });

  describe('SendUserPost action', () => {
    it('SendUserPost with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          text: 'Отправлено!',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
          posts: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(sendUserPost('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/posts?uid=id1`);
        expect(initialState.profilePage.posts).toEqual([]);
        expect(initialState.error.snackMessage).toEqual({ text: 'Отправлено!', result: 0 });
        expect(initialState.error.error).toBeNull();
      });
    });

    it('SendUserPost with Error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        profilePage: {
          myFriends: null,
          posts: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(sendUserPost('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.profilePage.posts).toEqual([]);
        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({ message: 'Failed to fetch', type: 'error' });
      });
    });
  });

  describe('DeleteUserPost', () => {
    it('DeleteUserPost with result === 0', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 0,
          text: 'Удалено!',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
          posts: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(deleteUserPost('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(fetchMock).toHaveBeenCalledWith(`${URL}/posts?uid=id1`);
        expect(initialState.profilePage.posts).toEqual([]);
        expect(initialState.error.snackMessage).toEqual({ text: 'Удалено!', result: 0 });
        expect(initialState.error.error).toBeNull();
      });
    });

    it('DeleteUserPost with result === 2', () => {
      fetchMock.mockResponse(
        JSON.stringify({
          result: 2,
          text: 'Ошибка!',
        }),
      );

      let initialState = {
        profilePage: {
          myFriends: null,
          posts: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(deleteUserPost('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.profilePage.posts).toEqual([]);
        expect(initialState.error.snackMessage).toEqual({ text: 'Ошибка!', result: 2 });
        expect(initialState.error.error).toEqual({ message: 'Ошибка!', type: 'user-posts' });
      });
    });

    it('DeleteUserPost with Error', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      let initialState = {
        profilePage: {
          myFriends: null,
          posts: [],
        },
        error: {
          error: null,
          snackMessage: null,
        },
      };

      const store = mockStore(() => initialState);

      return store.dispatch(deleteUserPost('id1')).then(() => {
        const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));

        actions.forEach(action => {
          initialState = reducerMock(initialState, action);
        });

        expect(initialState.profilePage.posts).toEqual([]);
        expect(initialState.error.snackMessage).toBeNull();
        expect(initialState.error.error).toEqual({ message: 'Failed to fetch', type: 'error' });
      });
    });
  });
});
