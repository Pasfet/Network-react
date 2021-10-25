import { TableBody, TableCell, TableRow } from '@mui/material';
import UserListItem from '../UserListItem/UserListItem';
import PropTypes from 'prop-types';

const UsersListTable = ({
  users,
  isFriend,
  deleteFriend,
  confirmRequestToFriendsList,
  rejectFriendRequestHandler,
  addToFriendsList,
  isFriendsOfFriends,
}) => {
  return (
    <TableBody>
      {!users.length ? (
        <TableRow>
          <TableCell>Пусто</TableCell>
        </TableRow>
      ) : (
        users?.map(friend => (
          <UserListItem
            key={friend.uid}
            user={friend}
            isFriend={isFriend}
            isFriendsOfFriends={isFriendsOfFriends}
            deleteFriend={deleteFriend && deleteFriend}
            confirmRequestToFriendsList={confirmRequestToFriendsList && confirmRequestToFriendsList}
            rejectFriendRequestHandler={rejectFriendRequestHandler && rejectFriendRequestHandler}
            addToFriendsList={addToFriendsList && addToFriendsList}
          />
        ))
      )}
    </TableBody>
  );
};

UsersListTable.propTypes = {
  users: PropTypes.array,
  isFriend: PropTypes.bool,
  deleteFriend: PropTypes.func,
  confirmRequestToFriendsList: PropTypes.func,
  rejectFriendRequestHandler: PropTypes.func,
  addToFriendsList: PropTypes.func,
  isFriendsOfFriends: PropTypes.bool,
};

export default UsersListTable;
