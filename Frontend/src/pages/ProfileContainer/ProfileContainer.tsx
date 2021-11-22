import { useEffect, useRef, useState, useCallback, FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getError } from '../../store/errorReducer/errorSelectors';
import {
  deleteFriendFromFriendsList,
  deleteUserPost,
  getMyFriendsList,
  getUserPosts,
  getUserProfileFromApi,
  rejectFriendRequest,
  sendProfileChange,
  sendRequestToFriendList,
  sendUserPost,
  setAvatar,
} from '../../actions/profileActions';
import {
  getUserProfile,
  getMyUid,
  getMyFriends,
  getUserPostsFromStore,
  getMyName,
  getMyAvatar,
} from '../../store/profileReducer/profileSelectors';
import Profile from './Profile/Profile';
import { clearError } from '../../actions/errorActions';

const ProfileContainer: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserProfile);
  const error = useSelector(getError);
  const myUid = useSelector(getMyUid);
  const myFriends = useSelector(getMyFriends);
  const userPosts = useSelector(getUserPostsFromStore);
  const myName = useSelector(getMyName);
  const myAvatar = useSelector(getMyAvatar);

  const { uid } = useParams<{uid: string}>();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const [statusInput, setStatusInput] = useState<string | undefined>('');
  const [postValue, setPostValue] = useState<string>('');
  const [fileInfo, setFileInfo] = useState<Object | null>(null);
  const formAvatar = useRef<any>(null);

  const sendStatus = useCallback((): void => {
    setOpenStatus(false);
    if (statusInput) {
      dispatch(sendProfileChange(myUid, { status: statusInput }));
    }
  }, [dispatch, myUid, statusInput]);

  const addToFriendsList = useCallback((): void => {
    dispatch(sendRequestToFriendList(myUid, uid));
  }, [dispatch, myUid, uid]);

  const rejectFriendRequestHandler = useCallback((): void => {
    dispatch(rejectFriendRequest(myUid, uid));
  }, [dispatch, myUid, uid]);

  const deleteFriend = useCallback((): void => {
    dispatch(deleteFriendFromFriendsList(myUid, uid));
  }, [dispatch, myUid, uid]);

  const addPost = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(clearError());
      dispatch(
        sendUserPost(uid, {
          author_name: myName,
          text: postValue,
          author_avatar: myAvatar,
          author_uid: myUid,
        }),
      );
      setPostValue('');
    },
    [dispatch, myAvatar, myName, myUid, postValue, uid],
  );

  const deletePost = useCallback(
    (postId: string): void => {
      dispatch(deleteUserPost(uid, postId));
    },
    [dispatch, uid],
  );

  const sendAvatar = useCallback(
    (e: ChangeEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const data = new FormData();
      data.append('avatar', formAvatar.current.files[0]);
      dispatch(setAvatar(myUid, data));
      setOpenDialog(false);
    },
    [formAvatar, dispatch, myUid],
  );

  useEffect((): () => void => {
    dispatch(getUserProfileFromApi(uid));
    dispatch(getMyFriendsList(myUid));
    dispatch(getUserPosts(uid));
    setStatusInput(user?.status);

    return () => {
      dispatch(clearError());
    };
  }, [dispatch, myUid, uid, user?.status]);

  return (
    <Profile
      user={user}
      myFriends={myFriends}
      uid={uid}
      myUid={myUid}
      error={error && error}
      openStatus={openStatus}
      setOpenStatus={setOpenStatus}
      statusInput={statusInput}
      setStatusInput={setStatusInput}
      sendStatus={sendStatus}
      addToFriendsList={addToFriendsList}
      deleteFriend={deleteFriend}
      rejectFriendRequestHandler={rejectFriendRequestHandler}
      userPosts={userPosts}
      postValue={postValue}
      setPostValue={setPostValue}
      addPost={addPost}
      deletePost={deletePost}
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      sendAvatar={sendAvatar}
      formAvatar={formAvatar}
      fileInfo={fileInfo}
      setFileInfo={setFileInfo}
    />
  );
};

export default ProfileContainer;
