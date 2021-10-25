import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import UsersListTable from '../../../components/UsersListTable/UsersListTable';
import {
  UserFriendsListBox,
  UserFriendsListHeading,
  UserFriendsListHeadingName,
  UserFriendsListTable,
  UserFriendsListWrapper,
} from './UserFriendsListStyled';

const UserFriendsList = ({ user, addToFriendsList }) => {
  return (
    <UserFriendsListWrapper container>
      <UserFriendsListHeading>
        Все друзья пользователя:
        <UserFriendsListHeadingName>{user.user_name}</UserFriendsListHeadingName>
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

UserFriendsList.propsTypes = {
  user: PropTypes.object.isRequired,
  addToFriendsList: PropTypes.func,
};

export default UserFriendsList;
