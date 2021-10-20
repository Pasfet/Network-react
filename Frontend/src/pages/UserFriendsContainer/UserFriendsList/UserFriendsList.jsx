import { Paper, TableBody, TableCell } from '@mui/material';
import PropTypes from 'prop-types';
import { CURRENT_URL } from '../../../store/types/authTypes';
import {
  UserFriendsListAvatar,
  UserFriendsListBox,
  UserFriendsListHeading,
  UserFriendsListHeadingName,
  UserFriendsListImgWrapper,
  UserFriendsListName,
  UserFriendsListTable,
  UserFriendsListTableRow,
  UserFriendsListWrapper,
} from './UserFriendsListStyled';

const UserFriendsList = ({ user }) => {
  return (
    <UserFriendsListWrapper container>
      <UserFriendsListHeading>
        Все друзья пользователя:
        <UserFriendsListHeadingName>{user.user_name}</UserFriendsListHeadingName>
      </UserFriendsListHeading>
      <UserFriendsListBox component={Paper}>
        <UserFriendsListTable aria-label="Друзья">
          <TableBody>
            {user.user_friends?.map(friend => (
              <UserFriendsListTableRow key={friend.uid} hover>
                <TableCell>
                  <UserFriendsListImgWrapper>
                    <UserFriendsListAvatar
                      src={`${CURRENT_URL}/images/profile/${friend.uid}/avatar/${friend.avatar}`}
                      alt="ava"
                    />
                  </UserFriendsListImgWrapper>
                </TableCell>
                <TableCell>
                  <UserFriendsListName to={`/profile/${friend.uid}`}>
                    {friend.user_name}
                  </UserFriendsListName>
                </TableCell>
              </UserFriendsListTableRow>
            ))}
          </TableBody>
        </UserFriendsListTable>
      </UserFriendsListBox>
    </UserFriendsListWrapper>
  );
};

UserFriendsList.propsTypes = {
  user: PropTypes.object.isRequired,
};

export default UserFriendsList;
