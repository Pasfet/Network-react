import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ProfilePageActions from './ProfilePageActions';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('<ProfilePageActions />', () => {
  let history;

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();

    return render(
      <Router history={history}>
        <ProfilePageActions {...props} />
      </Router>,
    );
  };

  it('Render button "Редактировать", if uid === myUid', () => {
    const { getByText, queryByText } = renderComponent({
      myUid: 'id1',
      uid: 'id1',
      userAvatar: 'avatar.jpeg',
    });

    expect(getByText(/Редактировать/i)).toBeInTheDocument();
    expect(queryByText(/Отменить запрос/i)).not.toBeInTheDocument();
    expect(queryByText(/Удалить из друзей/i)).not.toBeInTheDocument();
    expect(queryByText(/Добавить в друзья/i)).not.toBeInTheDocument();
  });

  it('Render button "Отменить запрос", if user send request', () => {
    const { getByText, queryByText } = renderComponent({
      myUid: 'id1',
      uid: 'id2',
      userAvatar: 'avatar.jpeg',
      myFriends: {
        friends_requstions: [{ uid: 'id2', user_name: 'Name', avatar: null }],
      },
    });

    expect(getByText(/Отменить запрос/i)).toBeInTheDocument();
    expect(queryByText(/Редактировать/i)).not.toBeInTheDocument();
    expect(queryByText(/Удалить из друзей/i)).not.toBeInTheDocument();
    expect(queryByText(/Добавить в друзья/i)).not.toBeInTheDocument();
  });

  it('Render button "Удалить из друзей", if user in the friendsList', () => {
    const { getByText, queryByText } = renderComponent({
      myUid: 'id1',
      uid: 'id2',
      userAvatar: 'avatar.jpeg',
      myFriends: {
        user_friends: [{ uid: 'id2', user_name: 'Name', avatar: null }],
      },
    });

    expect(getByText(/Удалить из друзей/i)).toBeInTheDocument();
    expect(queryByText(/Отменить запрос/i)).not.toBeInTheDocument();
    expect(queryByText(/Редактировать/i)).not.toBeInTheDocument();
    expect(queryByText(/Добавить в друзья/i)).not.toBeInTheDocument();
  });

  it('Render button "Добавить в друзья", if user does not in friendsList', () => {
    const { getByText, queryByText } = renderComponent({
      myUid: 'id1',
      uid: 'id2',
      userAvatar: 'avatar.jpeg',
      myFriends: {
        user_friends: [],
      },
    });

    expect(getByText(/Добавить в друзья/i)).toBeInTheDocument();
    expect(queryByText(/Удалить из друзей/i)).not.toBeInTheDocument();
    expect(queryByText(/Отменить запрос/i)).not.toBeInTheDocument();
    expect(queryByText(/Редактировать/i)).not.toBeInTheDocument();
  });

  it('Push to "/profile/:uid/edit" on click button', () => {
    const { getByText } = renderComponent({
      myUid: 'id1',
      uid: 'id1',
      userAvatar: 'avatar.jpeg',
    });

    fireEvent.click(getByText(/Редактировать/i));

    expect(history.push).toHaveBeenCalledWith('/profile/id1/edit');
  });

  it('Render avatar alt text', () => {
    fetchMock.mockResponse('Img');
    const { getByAltText } = renderComponent({
      myUid: 'id1',
      uid: 'id1',
      userAvatar: 'avatar.jpeg',
    });

    expect(getByAltText(/avatar/i)).toBeInTheDocument();
  });

  it('Call rejectFriendRequestHandler when click "Отменить запрос" button', () => {
    const rejectFriendRequestHandler = jest.fn();
    const { getByText } = renderComponent({
      myUid: 'id1',
      uid: 'id2',
      userAvatar: 'avatar.jpeg',
      myFriends: {
        friends_requstions: [{ uid: 'id2', user_name: 'Name', avatar: null }],
      },
      rejectFriendRequestHandler,
    });

    fireEvent.click(getByText(/Отменить запрос/i));

    expect(rejectFriendRequestHandler).toHaveBeenCalled();
  });

  it('Call deleteFriend when click "Удалить из друзей" button', () => {
    const deleteFriend = jest.fn();
    const { getByText } = renderComponent({
      myUid: 'id1',
      uid: 'id2',
      userAvatar: 'avatar.jpeg',
      myFriends: {
        user_friends: [{ uid: 'id2', user_name: 'Name', avatar: null }],
      },
      deleteFriend,
    });

    fireEvent.click(getByText(/Удалить из друзей/i));

    expect(deleteFriend).toHaveBeenCalled();
  });

  it('Call addToFriendsList when click "Добавить в друзья" button', () => {
    const addToFriendsList = jest.fn();
    const { getByText } = renderComponent({
      myUid: 'id1',
      uid: 'id2',
      userAvatar: 'avatar.jpeg',
      myFriends: {
        user_friends: [],
      },
      addToFriendsList,
    });

    fireEvent.click(getByText(/Добавить в друзья/i));

    expect(addToFriendsList).toHaveBeenCalled();
  });
});
