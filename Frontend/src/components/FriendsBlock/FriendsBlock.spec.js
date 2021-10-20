import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import FriendsBlock from './FriendsBlock';

describe('<FriendsBlock />', () => {
  let history;

  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();

    return render(
      <Router history={history}>
        <FriendsBlock {...props} />
      </Router>,
    );
  };

  it('Render countFriends if userFriends.length does not empty', () => {
    const { getByText } = renderComponent({
      userFriends: [
        { uid: 'id1', user_name: 'Test', avatar: null },
        { uid: 'id2', user_name: 'myName', avatar: null },
      ],
    });

    expect(getByText(/2/i)).toBeInTheDocument();
  });

  it('Does not render countFriends if userFriends.length is empty', () => {
    const { getByText } = renderComponent({
      userFriends: [],
    });

    expect(getByText(/0/i)).toBeInTheDocument();
  });

  it('Render friendsItem if frindsList < 6', () => {
    const { getByText } = renderComponent({
      userFriends: [
        { uid: 'id1', user_name: 'Test', avatar: null },
        { uid: 'id2', user_name: 'myName', avatar: null },
      ],
    });

    expect(getByText(/Test/i)).toBeInTheDocument();
    expect(getByText(/myName/i)).toBeInTheDocument();
  });

  it('Render 6 friendsItem if frindsList > 6', () => {
    const { getAllByText } = renderComponent({
      userFriends: [
        { uid: 'id1', user_name: 'Test', avatar: null },
        { uid: 'id2', user_name: 'Test', avatar: null },
        { uid: 'id3', user_name: 'Test', avatar: null },
        { uid: 'id4', user_name: 'Test', avatar: null },
        { uid: 'id5', user_name: 'Test', avatar: null },
        { uid: 'id6', user_name: 'Test', avatar: null },
        { uid: 'id7', user_name: 'Test', avatar: null },
        { uid: 'id8', user_name: 'Test', avatar: null },
      ],
    });

    expect(getAllByText(/Test/i).length).toBe(6);
  });

  it('Render "Нет друзей" if usersFriends is empty', () => {
    const { getByText } = renderComponent({
      userFriends: [],
    });

    expect(getByText(/Нет друзей/i)).toBeInTheDocument();
  });

  it('Render friendsUserAvatar alt text', () => {
    const { getByAltText } = renderComponent({
      userFriends: [{ uid: 'id1', user_name: 'Test', avatar: null }],
    });

    expect(getByAltText(/ava/i)).toBeInTheDocument();
  });
  it('Push to="/profile/:uid/friends" when click on "Все друзья"', () => {
    const { getByText } = renderComponent({ uid: 'id1' });

    fireEvent.click(getByText(/Все друзья/i));

    expect(history.push).toHaveBeenCalledWith('/profile/id1/friends');
  });
  it('Push to="/profile/:uid/" when click on FriendsName', () => {
    const { getByText } = renderComponent({
      uid: 'id1',
      userFriends: [{ uid: 'id2', user_name: 'Test', avatar: null }],
    });

    fireEvent.click(getByText(/Test/i));

    expect(history.push).toHaveBeenCalledWith('/profile/id2');
  });
});
