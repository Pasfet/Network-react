import { Alert, Paper, Tab, TableBody, TableCell, TableRow } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { CURRENT_URL } from '../../../store/types/authTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import FreindsIcon from '@mui/icons-material/PeopleAlt';
import FreindsRequestsIcon from '@mui/icons-material/GroupAdd';
import AddIcon from '@mui/icons-material/AddCircleOutline';

import {
  MyFriendsAgreeRequstionsButton,
  MyFriendsDeleteButton,
  MyFriendsListAvatar,
  MyFriendsListBox,
  MyFriendsListHeading,
  MyFriendsListImgWrapper,
  MyFriendsListName,
  MyFriendsListTable,
  MyFriendsListTableRow,
  MyFriendsListWrapper,
  MyFriendsRejectRequstionsButton,
} from './MyFriendsListStyled';

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
            <Tab icon={<FreindsIcon />} label="Друзья" value="1" />
            <Tab icon={<FreindsRequestsIcon />} label="Заявки в друзья" value="2" />
          </TabList>
          <TabPanel value="1">
            <MyFriendsListTable aria-label="Мои друзья">
              <TableBody>
                {!myFriends?.user_friends.length ? (
                  <TableRow>
                    <TableCell>Пока нет друзей</TableCell>
                  </TableRow>
                ) : (
                  myFriends?.user_friends?.map(friend => (
                    <MyFriendsListTableRow key={friend.uid} hover>
                      <TableCell>
                        <MyFriendsListImgWrapper>
                          <MyFriendsListAvatar
                            src={`${CURRENT_URL}/images/profile/${friend.uid}/avatar/${friend.avatar}`}
                            alt="ava"
                          />
                        </MyFriendsListImgWrapper>
                      </TableCell>
                      <TableCell>
                        <MyFriendsListName to={`/profile/${friend.uid}`}>
                          {friend.user_name}
                        </MyFriendsListName>
                      </TableCell>
                      <TableCell>
                        <MyFriendsDeleteButton
                          data-testid="frendsDeleteButton"
                          onClick={() => deleteFriend(friend.uid)}
                        >
                          <DeleteIcon />
                        </MyFriendsDeleteButton>
                      </TableCell>
                    </MyFriendsListTableRow>
                  ))
                )}
              </TableBody>
            </MyFriendsListTable>
          </TabPanel>
          <TabPanel value="2">
            <MyFriendsListTable aria-label="Запросы в друзья">
              <TableBody>
                {!myFriends?.friends_requstions.length ? (
                  <TableRow>
                    <TableCell>Пока нет заявок</TableCell>
                  </TableRow>
                ) : (
                  myFriends?.friends_requstions?.map(request => (
                    <MyFriendsListTableRow key={request.uid} hover>
                      <TableCell>
                        <MyFriendsListImgWrapper>
                          <MyFriendsListAvatar
                            src={`${CURRENT_URL}/images/profile/${request.uid}/avatar/${request.avatar}`}
                            alt="ava"
                          />
                        </MyFriendsListImgWrapper>
                      </TableCell>
                      <TableCell>
                        <MyFriendsListName to={`/profile/${request.uid}`}>
                          {request.user_name}
                        </MyFriendsListName>
                      </TableCell>
                      <TableCell>
                        <MyFriendsAgreeRequstionsButton
                          data-testid="confirmRequestButton"
                          onClick={() => confirmRequestToFriendsList(request.uid)}
                        >
                          <AddIcon />
                        </MyFriendsAgreeRequstionsButton>
                        <MyFriendsRejectRequstionsButton
                          data-testid="rejectRequestButton"
                          onClick={() => rejectFriendRequestHandler(request.uid)}
                        >
                          <DeleteIcon />
                        </MyFriendsRejectRequstionsButton>
                      </TableCell>
                    </MyFriendsListTableRow>
                  ))
                )}
              </TableBody>
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
