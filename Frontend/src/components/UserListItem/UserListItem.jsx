import { IconButton, TableCell } from '@mui/material';
import PropTypes from 'prop-types';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';

import { CURRENT_URL } from '../../types/authTypes';
import {
  UserListItemAvatar,
  UserListItemImgWrapper,
  UserListItemName,
  UserListItemRow,
} from './UserListItemStyled';

const UserListItem = ({
  myUid,
  myFriends,
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
          <UserListItemAvatar src={`${CURRENT_URL}/images?uid=${user.uid}`} alt={user?.user_name} />
        </UserListItemImgWrapper>
      </TableCell>
      <TableCell>
        <UserListItemName to={`/profile/${user.uid}`}>{user.user_name}</UserListItemName>
      </TableCell>
      {isFriendsOfFriends ? (
        myUid !== user.uid ? (
          myFriends?.friends_requstions.find(r => r.uid === user.uid) ||
          myFriends?.user_friends.find(f => f.uid === user.uid) ? (
            <TableCell>
              <CheckIcon data-testid="checkIcon" />
            </TableCell>
          ) : (
            <TableCell>
              <IconButton data-testid="addToFriendsList" onClick={() => addToFriendsList(user.uid)}>
                <AddIcon />
              </IconButton>
            </TableCell>
          )
        ) : (
          <TableCell></TableCell>
        )
      ) : isFriend ? (
        <TableCell>
          <IconButton data-testid="friendsDeleteButton" onClick={() => deleteFriend(user.uid)}>
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
  myUid: PropTypes.string,
  myFriends: PropTypes.object,
  user: PropTypes.object,
  isFriend: PropTypes.bool,
  deleteFriend: PropTypes.func,
  confirmRequestToFriendsList: PropTypes.func,
  rejectFriendRequestHandler: PropTypes.func,
  addToFriendsList: PropTypes.func,
};

export default UserListItem;
