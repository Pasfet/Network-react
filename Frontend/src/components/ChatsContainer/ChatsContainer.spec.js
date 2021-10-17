import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import ChatsContainer from './ChatsContainer';
import { deleteChatFromAPI } from '../../actions/dialogsActions';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
describe('<ChatsContainer />', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let history;

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const renderComponent = store => {
    history = createMemoryHistory();
    history.push = jest.fn();
    return render(
      <Provider store={store}>
        <Router history={history}>
          <ChatsContainer />
        </Router>
      </Provider>,
    );
  };

  it('Render chats', () => {
    const mockedStore = mockStore({
      error: {
        error: null,
      },
      dialogsPage: {
        chats: {
          id1: {
            chat_id: 'id1',
            chat_name: 'TestName',
          },
          id2: {
            chat_id: 'id2',
            chat_name: 'HelloTest',
          },
        },
        searchChats: [],
      },
      profilePage: { uid: '1' },
    });
    const { getByText } = renderComponent(mockedStore);

    expect(getByText(/TestName/i)).toBeInTheDocument();
    expect(getByText(/HelloTest/i)).toBeInTheDocument();
  });
  it('Redirect on private dialogs when click on chat', () => {
    const mockedStore = mockStore({
      error: {
        error: null,
      },
      dialogsPage: {
        chats: {
          id1: {
            chat_id: 'id1',
            chat_name: 'TestName',
          },
        },
        searchChats: [],
      },
      profilePage: { uid: '1' },
    });
    const { getByText } = renderComponent(mockedStore);

    fireEvent.click(getByText(/TestName/i));

    expect(history.push).toHaveBeenCalledWith('/dialogs/1/id1');
  });

  it('Delete chat', () => {
    fetch.mockResponse(JSON.stringify({ result: 0, text: 'Удалено!' }));
    const mockedStore = mockStore({
      error: {
        error: null,
        snackMessage: null,
      },
      dialogsPage: {
        chats: {
          id1: {
            chat_id: 'id1',
            chat_name: 'TestName',
          },
        },
        searchChats: [],
      },
      profilePage: { uid: '1' },
    });

    const expectedActions = [
      { type: 'GET_CHATS', payload: undefined },
      { type: 'CLEAR_IS_EMPTY_CHATS_STATE' },
      { type: 'SET_SNACK', payload: { text: 'Удалено!', result: 0 } },
      { type: 'SET_SNACK', payload: { text: 'Удалено!', result: 0 } },
    ];
    const { getByTestId } = renderComponent(mockedStore);

    fireEvent.click(getByTestId('deleteChatButton'));

    return mockedStore.dispatch(deleteChatFromAPI('1', 'id1')).then(() => {
      const actions = mockedStore.getActions();

      expect(actions).toEqual(expectedActions);
    });
  });

  it('Render error', () => {
    const mockedStore = mockStore({
      error: {
        error: { code: 0, type: 'chats', message: 'Нет чатов!' },
      },
      dialogsPage: { chats: {}, searchChats: [] },
      profilePage: { uid: '1' },
    });
    const { getByText } = renderComponent(mockedStore);

    expect(getByText(/Нет чатов!/i)).toBeInTheDocument();
  });
});
