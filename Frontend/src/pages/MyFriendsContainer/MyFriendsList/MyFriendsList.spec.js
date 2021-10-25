import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import MyFriendsList from './MyFriendsList';

describe('<MyFriendsList />', () => {
  let history;
  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();

    return render(
      <Router history={history}>
        <MyFriendsList {...props} />
      </Router>,
    );
  };

  const mockProps = {
    myFriends: {
      friends_requstions: [],
      user_friends: [],
    },
    tabsValue: '1',
    setTabsValue: jest.fn(),
    confirmRequestToFriendsList: jest.fn(),
    rejectFriendRequestHandler: jest.fn(),
    deleteFriend: jest.fn(),
    error: null,
  };

  it('Render error', () => {
    const { getByText } = renderComponent({ ...mockProps, error: 'Failed' });

    expect(getByText(/Failed/i)).toBeInTheDocument();
  });

  it('Render "Пусто" if usersList is empty', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText('Пусто')).toBeInTheDocument();
  });

  it('Render usersList', () => {
    const { getByText } = renderComponent({
      ...mockProps,
      myFriends: {
        friends_requstions: [],
        user_friends: [{ uid: 'id1', user_name: 'Test', avatar: null }],
      },
    });

    expect(getByText(/Test/i)).toBeInTheDocument();
  });

  it('Render alt text', () => {
    const { getByAltText } = renderComponent({
      ...mockProps,
      myFriends: {
        friends_requstions: [],
        user_friends: [{ uid: 'id1', user_name: 'Test', avatar: null }],
      },
    });

    expect(getByAltText(/Test/i)).toBeInTheDocument();
  });

  it('Push to="/profile/:uid"', () => {
    const { getByText } = renderComponent({
      ...mockProps,
      myFriends: {
        friends_requstions: [],
        user_friends: [{ uid: 'id1', user_name: 'Test', avatar: null }],
      },
    });

    fireEvent.click(getByText(/Test/i));

    expect(history.push).toHaveBeenCalledWith('/profile/id1');
  });

  it('Call deleteFriend', () => {
    const { getByTestId } = renderComponent({
      ...mockProps,
      myFriends: {
        friends_requstions: [],
        user_friends: [{ uid: 'id1', user_name: 'Test', avatar: null }],
      },
    });

    fireEvent.click(getByTestId('frendsDeleteButton'));

    expect(mockProps.deleteFriend).toHaveBeenCalledWith('id1');
  });

  it('Render "Пусто" if friendsRequestions is empty', () => {
    const { getByText } = renderComponent({
      ...mockProps,
      tabsValue: '2',
      myFriends: {
        friends_requstions: [],
        user_friends: [],
      },
    });

    expect(getByText(/Пусто/i)).toBeInTheDocument();
  });

  it('Render friendsRequestions', () => {
    const { getByText } = renderComponent({
      ...mockProps,
      tabsValue: '2',
      myFriends: {
        friends_requstions: [{ uid: 'id1', user_name: 'Test', avatar: null }],
        user_friends: [],
      },
    });

    expect(getByText(/Test/i)).toBeInTheDocument();
  });

  it('Call confirmRequestToFriendsList', () => {
    const { getByTestId } = renderComponent({
      ...mockProps,
      tabsValue: '2',
      myFriends: {
        friends_requstions: [{ uid: 'id1', user_name: 'Test', avatar: null }],
        user_friends: [],
      },
    });

    fireEvent.click(getByTestId('confirmRequestButton'));

    expect(mockProps.confirmRequestToFriendsList).toHaveBeenCalledWith('id1');
  });

  it('Call rejectFriendRequestHandler', () => {
    const { getByTestId } = renderComponent({
      ...mockProps,
      tabsValue: '2',
      myFriends: {
        friends_requstions: [{ uid: 'id1', user_name: 'Test', avatar: null }],
        user_friends: [],
      },
    });

    fireEvent.click(getByTestId('rejectRequestButton'));

    expect(mockProps.rejectFriendRequestHandler).toHaveBeenCalledWith('id1');
  });
});
