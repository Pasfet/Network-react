import { TableBody, TableCell, TableRow } from '@mui/material';
import UserListItem from '../UserListItem/UserListItem';
import {FC} from 'react';
import { IUsersListTableProps } from '../../types/components';

const UsersListTable: FC<IUsersListTableProps> = ({
  myUid,
  myFriends,
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
      {users && !users.length ? (
        <TableRow>
          <TableCell>Пусто</TableCell>
        </TableRow>
      ) : (
        users?.map(friend => (
          <UserListItem
            myUid={myUid}
            myFriends={myFriends}
            key={friend.uid}
            user={friend}
            isFriend={isFriend}
            isFriendsOfFriends={isFriendsOfFriends}
            deleteFriend={deleteFriend ? deleteFriend : () => {}}
            confirmRequestToFriendsList={confirmRequestToFriendsList ? confirmRequestToFriendsList : () => {}}
            rejectFriendRequestHandler={rejectFriendRequestHandler ? rejectFriendRequestHandler : () => {}}
            addToFriendsList={addToFriendsList ? addToFriendsList : () => {}}
          />
        ))
      )}
    </TableBody>
  );
};

export default UsersListTable;
