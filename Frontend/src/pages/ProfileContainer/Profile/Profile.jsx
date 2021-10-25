import { Divider } from '@mui/material';
import PropTypes from 'prop-types';
import FriendsBlock from '../../../components/FriendsBlock/FriendsBlock';
import ProfileAboutUser from '../../../components/ProfileAboutUser/ProfileAboutUser';
import ProfilePageActions from '../../../components/ProfilePageActions/ProfilePageActions';
import ProfilePosts from '../../../components/ProfilePosts/ProfilePosts';
import {
  BoxStyled,
  ProfileBar,
  ProfileMainContainer,
  ProfileUserName,
  ProfileUserStatus,
  ProfileWrapper,
  ProfileInputStatus,
  ErrorMessage,
} from './ProfileStyled';

const Profile = ({
  user,
  myFriends,
  uid,
  myUid,
  error,
  openStatus,
  setOpenStatus,
  statusInput,
  setStatusInput,
  sendStatus,
  addToFriendsList,
  deleteFriend,
  rejectFriendRequestHandler,
  userPosts,
  postValue,
  setPostValue,
  addPost,
  deletePost,
}) => {
  return (
    <ProfileWrapper container spacing={2}>
      <ProfileBar item lg={3} md={4}>
        <BoxStyled>
          <ProfilePageActions
            userAvatar={user?.avatar}
            myUid={myUid}
            uid={uid}
            myFriends={myFriends}
            addToFriendsList={addToFriendsList}
            deleteFriend={deleteFriend}
            rejectFriendRequestHandler={rejectFriendRequestHandler}
          />
        </BoxStyled>
        <BoxStyled>
          <FriendsBlock userFriends={user?.user_friends} uid={uid} />
        </BoxStyled>
      </ProfileBar>
      <ProfileMainContainer item lg={9} md={8}>
        {error && error?.type !== 'user-posts' ? (
          <ErrorMessage> {error.message} </ErrorMessage>
        ) : (
          ''
        )}

        <BoxStyled>
          <ProfileUserName>{user?.user_name}</ProfileUserName>
          {openStatus ? (
            <ProfileInputStatus
              value={statusInput}
              onChange={e => setStatusInput(e.target.value)}
              onBlur={() => sendStatus()}
              inputProps={{ 'data-testid': 'inputStatus' }}
            />
          ) : (
            <ProfileUserStatus onClick={() => uid === myUid && setOpenStatus(true)}>
              {statusInput ? statusInput : 'Установить статус'}
            </ProfileUserStatus>
          )}
          <Divider />
          <ProfileAboutUser about={user?.about && user.about} />
        </BoxStyled>
        <BoxStyled>
          <ProfilePosts
            userPosts={userPosts}
            error={error?.type === 'user-posts' ? error.message : ''}
            postValue={postValue}
            setPostValue={setPostValue}
            addPost={addPost}
            myUid={myUid}
            uid={uid}
            deletePost={deletePost}
          />
        </BoxStyled>
      </ProfileMainContainer>
    </ProfileWrapper>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  myFriends: PropTypes.object,
  friendsRequests: PropTypes.array,
  error: PropTypes.object,
  uid: PropTypes.string,
  myUid: PropTypes.string,
  openStatus: PropTypes.bool,
  setOpenStatus: PropTypes.func,
  statusInput: PropTypes.string,
  setStatusInput: PropTypes.func,
  sendStatus: PropTypes.func,
  addToFriendsList: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func,
  rejectFriendRequestHandler: PropTypes.func,
  userPosts: PropTypes.array,
  postValue: PropTypes.string,
  setPostValue: PropTypes.func,
  addPost: PropTypes.func,
  deletePost: PropTypes.func,
};

export default Profile;
