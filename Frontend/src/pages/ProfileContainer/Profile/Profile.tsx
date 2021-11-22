import { Divider } from '@mui/material';
import DialogSendImage from '../../../components/DialogSendImage/DialogSendImage';
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
import {FC} from 'react';
import {IProfileProps} from '../../../types/components';

const Profile: FC<IProfileProps> = ({
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
  openDialog,
  setOpenDialog,
  sendAvatar,
  formAvatar,
  fileInfo,
  setFileInfo,
}) => {
  return (
    <ProfileWrapper container spacing={2}>
      <DialogSendImage
        open={openDialog}
        handleClose={setOpenDialog}
        sendAvatar={sendAvatar}
        title={'Отправка фото'}
        text={'Загрузите фотографию в качестве аватарке'}
        formAvatar={formAvatar}
        fileInfo={fileInfo}
        setFileInfo={setFileInfo}
      />
      <ProfileBar item lg={3} md={4}>
        <BoxStyled>
          <ProfilePageActions
            myUid={myUid}
            uid={uid}
            myFriends={myFriends}
            addToFriendsList={addToFriendsList}
            deleteFriend={deleteFriend}
            rejectFriendRequestHandler={rejectFriendRequestHandler}
            setOpenDialog={setOpenDialog}
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

export default Profile;