import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import UserFriendsList from './UserFriendsList';

describe('<UserFriendsList />', () => {
  let history;
  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();

    return render(
      <Router history={history}>
        <UserFriendsList {...props} />
      </Router>,
    );
  };

  const mockProps = {
    user: {
      user_name: 'MyName',
      user_friends: [{ uid: 'id2', user_name: 'MyFriend', avatar: null }],
    },
  };

  it('Render "Все друзья пользователя: <UserName>"', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(/Все друзья пользователя/i)).toBeInTheDocument();
    expect(getByText(/MyName/i)).toBeInTheDocument();
  });

  it('Render usersList"', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(/MyFriend/i)).toBeInTheDocument();
  });

  it('Render alt text ava"', () => {
    const { getByAltText } = renderComponent(mockProps);

    expect(getByAltText(/ava/i)).toBeInTheDocument();
  });

  it('Push to="/profile/:uid" when click on Name friend', () => {
    const { getByText } = renderComponent(mockProps);

    fireEvent.click(getByText(/MyFriend/i));

    expect(history.push).toHaveBeenCalledWith('/profile/id2');
  });
});
