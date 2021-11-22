import { Paper } from '@mui/material';
import UsersListTable from '../../../components/UsersListTable/UsersListTable';
import {
  UserFriendsListBox,
  UserFriendsListHeading,
  UserFriendsListHeadingName,
  UserFriendsListTable,
  UserFriendsListWrapper,
} from './UserFriendsListStyled';
import {FC} from 'react';
import { IUserFriendsList } from '../../../types/components';

const UserFriendsList: FC<IUserFriendsList> = ({ user, addToFriendsList }) => {
  return (
    <UserFriendsListWrapper container>
      <UserFriendsListHeading>
        Все друзья пользователя:
        <UserFriendsListHeadingName>{user?.user_name}</UserFriendsListHeadingName>
      </UserFriendsListHeading>
      <UserFriendsListBox component={Paper}>
        <UserFriendsListTable aria-label="Друзья">
          <UsersListTable
            users={user?.user_friends}
            addToFriendsList={addToFriendsList}
            isFriendsOfFriends={true}
          />
        </UserFriendsListTable>
      </UserFriendsListBox>
    </UserFriendsListWrapper>
  );
};

export default UserFriendsList;
