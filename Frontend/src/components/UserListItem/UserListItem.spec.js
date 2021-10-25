import { Table, TableBody } from '@mui/material';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import UserListItem from './UserListItem';

describe('<UserListItem />', () => {
  const mockProps = {
    user: {
      avatar: null,
      uid: 'id1',
      user_name: 'Name',
    },
    isFriendsOfFriends: false,
    isFriend: false,
    deleteFriend: jest.fn(),
    confirmRequestToFriendsList: jest.fn(),
    rejectFriendRequestHandler: jest.fn(),
    addToFriendsList: jest.fn(),
  };

  let history;

  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();
    return render(
      <Router history={history}>
        <Table>
          <TableBody>
            <UserListItem {...props} />
          </TableBody>
        </Table>
      </Router>,
    );
  };

  it('Render alt text', () => {
    const { getByAltText } = renderComponent(mockProps);

    expect(getByAltText(mockProps.user.user_name)).toBeInTheDocument();
  });

  it('Render userName', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(mockProps.user.user_name)).toBeInTheDocument();
  });

  it('Render addToFriendsList if isFriendsOfFriends === true', () => {
    const { getByTestId, queryByTestId } = renderComponent({
      ...mockProps,
      isFriendsOfFriends: true,
    });

    expect(getByTestId('addToFriendsList')).toBeInTheDocument();
    expect(queryByTestId('frendsDeleteButton')).not.toBeInTheDocument();
    expect(queryByTestId('confirmRequestToFriendsList')).not.toBeInTheDocument();
    expect(queryByTestId('rejectFriendRequestHandler')).not.toBeInTheDocument();
  });

  it('Render frendsDeleteButton if isFriend === true', () => {
    const { getByTestId, queryByTestId } = renderComponent({
      ...mockProps,
      isFriend: true,
    });

    expect(getByTestId('frendsDeleteButton')).toBeInTheDocument();
    expect(queryByTestId('addToFriendsList')).not.toBeInTheDocument();
    expect(queryByTestId('confirmRequestToFriendsList')).not.toBeInTheDocument();
    expect(queryByTestId('rejectFriendRequestHandler')).not.toBeInTheDocument();
  });

  it('Render rejectRequestButton and deleteButton if isFriend === false', () => {
    const { getByTestId, queryByTestId } = renderComponent(mockProps);

    expect(getByTestId('confirmRequestButton')).toBeInTheDocument();
    expect(getByTestId('rejectRequestButton')).toBeInTheDocument();
    expect(queryByTestId('frendsDeleteButton')).not.toBeInTheDocument();
    expect(queryByTestId('addToFriendsList')).not.toBeInTheDocument();
  });

  it('Push to="/profile/:uid" when click on userName', () => {
    const { getByText } = renderComponent(mockProps);

    fireEvent.click(getByText(mockProps.user.user_name));

    expect(history.push).toHaveBeenCalledWith('/profile/id1');
  });

  it('Called addToFriendsList when click on addToFriendsList Button', () => {
    const { getByTestId } = renderComponent({ ...mockProps, isFriendsOfFriends: true });

    fireEvent.click(getByTestId('addToFriendsList'));

    expect(mockProps.addToFriendsList).toHaveBeenCalledWith(mockProps.user.uid);
  });

  it('Called deleteFriend when click on frendsDeleteButton Button', () => {
    const { getByTestId } = renderComponent({ ...mockProps, isFriend: true });

    fireEvent.click(getByTestId('frendsDeleteButton'));

    expect(mockProps.deleteFriend).toHaveBeenCalledWith(mockProps.user.uid);
  });

  it('Called confirmRequestToFriendsList when click on confirmRequestButton Button', () => {
    const { getByTestId } = renderComponent(mockProps);

    fireEvent.click(getByTestId('confirmRequestButton'));

    expect(mockProps.confirmRequestToFriendsList).toHaveBeenCalledWith(mockProps.user.uid);
  });

  it('Called rejectFriendRequestHandler when click on rejectRequestButton Button', () => {
    const { getByTestId } = renderComponent(mockProps);

    fireEvent.click(getByTestId('rejectRequestButton'));

    expect(mockProps.rejectFriendRequestHandler).toHaveBeenCalledWith(mockProps.user.uid);
  });
});
