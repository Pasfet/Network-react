import { Alert, Paper, Tab } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@material-ui/lab';
import PropTypes from 'prop-types';
import FriendsIcon from '@mui/icons-material/PeopleAlt';
import FriendsRequestsIcon from '@mui/icons-material/GroupAdd';

import {
  MyFriendsListBox,
  MyFriendsListHeading,
  MyFriendsListTable,
  MyFriendsListWrapper,
} from './MyFriendsListStyled';
import UsersListTable from '../../../components/UsersListTable/UsersListTable';

const MyFriendsList = ({
  myFriends,
  tabsValue,
  setTabsValue,
  confirmRequestToFriendsList,
  rejectFriendRequestHandler,
  deleteFriend,
  error,
}) => {
  return (
    <MyFriendsListWrapper container>
      <MyFriendsListHeading>Мои друзья</MyFriendsListHeading>
      <MyFriendsListBox component={Paper}>
        {error && <Alert saverity="info"> {error} </Alert>}
        <TabContext value={tabsValue}>
          <TabList onChange={setTabsValue} aria-label="icon label tabs example">
            <Tab icon={<FriendsIcon />} label="Друзья" value="1" />
            <Tab icon={<FriendsRequestsIcon />} label="Заявки в друзья" value="2" />
          </TabList>
          <TabPanel value="1">
            <MyFriendsListTable aria-label="Мои друзья">
              <UsersListTable
                users={myFriends?.user_friends}
                deleteFriend={deleteFriend}
                isFriend={true}
                rejectFriendRequestHandler={rejectFriendRequestHandler}
              />
            </MyFriendsListTable>
          </TabPanel>
          <TabPanel value="2">
            <MyFriendsListTable aria-label="Запросы в друзья">
              <UsersListTable
                users={myFriends?.friends_requstions}
                isFriend={false}
                confirmRequestToFriendsList={confirmRequestToFriendsList}
                rejectFriendRequestHandler={rejectFriendRequestHandler}
              />
            </MyFriendsListTable>
          </TabPanel>
        </TabContext>
      </MyFriendsListBox>
    </MyFriendsListWrapper>
  );
};

MyFriendsList.propsTypes = {
  myFriends: PropTypes.object.isRequired,
  tabsValue: PropTypes.string.isRequired,
  setTabsValue: PropTypes.func.isRequired,
  confirmRequestToFriendsList: PropTypes.func.isRequired,
  rejectFriendRequestHandler: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default MyFriendsList;
