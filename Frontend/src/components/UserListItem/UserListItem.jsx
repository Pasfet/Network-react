import { IconButton, TableCell } from '@mui/material';
import PropTypes from 'prop-types';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/AddCircleOutline';

import { CURRENT_URL } from '../../store/types/authTypes';
import {
  UserListItemAvatar,
  UserListItemImgWrapper,
  UserListItemName,
  UserListItemRow,
} from './UserListItemStyled';

const UserListItem = ({
  user,
  isFriendsOfFriends,
  isFriend,
  deleteFriend,
  confirmRequestToFriendsList,
  rejectFriendRequestHandler,
  addToFriendsList,
}) => {
  return (
    <UserListItemRow hover>
      <TableCell>
        <UserListItemImgWrapper>
          <UserListItemAvatar
            src={`${CURRENT_URL}/images/profile/${user.uid}/avatar/${user.avatar}`}
            alt={user?.user_name}
          />
        </UserListItemImgWrapper>
      </TableCell>
      <TableCell>
        <UserListItemName to={`/profile/${user.uid}`}>{user.user_name}</UserListItemName>
      </TableCell>
      {isFriendsOfFriends ? (
        <TableCell>
          <IconButton data-testid="addToFriendsList" onClick={() => addToFriendsList(user.uid)}>
            <AddIcon />
          </IconButton>
        </TableCell>
      ) : isFriend ? (
        <TableCell>
          <IconButton data-testid="frendsDeleteButton" onClick={() => deleteFriend(user.uid)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      ) : (
        <TableCell>
          <IconButton
            data-testid="confirmRequestButton"
            onClick={() => confirmRequestToFriendsList(user.uid)}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            data-testid="rejectRequestButton"
            onClick={() => rejectFriendRequestHandler(user.uid)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </UserListItemRow>
  );
};

UserListItem.propTypes = {
  user: PropTypes.object,
  isFriend: PropTypes.bool,
  deleteFriend: PropTypes.func,
  confirmRequestToFriendsList: PropTypes.func,
  rejectFriendRequestHandler: PropTypes.func,
  addToFriendsList: PropTypes.func,
};

export default UserListItem;
