import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import MyFriendsContainer from './MyFriendsContainer';

describe('<MyFriendsContainer />', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const renderComponent = store => {
    const history = createMemoryHistory();

    return render(
      <Router history={history}>
        <Provider store={store}>
          <MyFriendsContainer />
        </Provider>
      </Router>,
    );
  };

  it('Render friendsList', () => {
    const initialState = {
      profilePage: {
        uid: { uid: 'id1' },
        myFriends: {
          user_friends: [{ uid: 'id2', user_name: 'FriendName', avatar: null }],
          friends_requstions: [],
        },
      },
      error: { error: null },
    };
    const state = mockStore(() => initialState);

    const { getByText } = renderComponent(state);

    expect(getByText(/FriendName/i)).toBeInTheDocument();
  });
  it('Render friendsRequestionsList', () => {
    const initialState = {
      profilePage: {
        uid: { uid: 'id1' },
        myFriends: {
          user_friends: [{ uid: 'id2', user_name: 'FriendName', avatar: null }],
          friends_requstions: [{ uid: 'id3', user_name: 'Anna', avatar: null }],
        },
      },
      error: { error: null },
    };
    const state = mockStore(() => initialState);

    const { getByText } = renderComponent(state);

    fireEvent.click(getByText(/Заявки в друзья/i));

    expect(getByText(/Anna/i)).toBeInTheDocument();
  });
  it('Render error', () => {
    const initialState = {
      profilePage: {
        uid: { uid: 'id1' },
        myFriends: {
          user_friends: [{ uid: 'id2', user_name: 'FriendName', avatar: null }],
          friends_requstions: [{ uid: 'id3', user_name: 'Anna', avatar: null }],
        },
      },
      error: { error: { message: 'Failed' } },
    };
    const state = mockStore(() => initialState);

    const { getByText } = renderComponent(state);

    expect(getByText(/Failed/i)).toBeInTheDocument();
  });
});
