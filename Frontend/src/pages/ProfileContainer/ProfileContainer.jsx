import { useEffect, useState } from 'react';
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
import { useCallback } from 'react';

const ProfileContainer = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserProfile);
  const error = useSelector(getError);
  const myUid = useSelector(getMyUid);
  const myFriends = useSelector(getMyFriends);
  const userPosts = useSelector(getUserPostsFromStore);
  const myName = useSelector(getMyName);
  const myAvatar = useSelector(getMyAvatar);

  const { uid } = useParams();

  const [openStatus, setOpenStatus] = useState(false);
  const [statusInput, setStatusInput] = useState('');
  const [postValue, setPostValue] = useState('');

  const sendStatus = useCallback(() => {
    setOpenStatus(false);
    if (statusInput) {
      dispatch(sendProfileChange(myUid, { status: statusInput }));
    }
  }, [dispatch, myUid, statusInput]);

  const addToFriendsList = useCallback(() => {
    dispatch(sendRequestToFriendList(myUid, uid));
  }, [dispatch, myUid, uid]);

  const rejectFriendRequestHandler = useCallback(() => {
    dispatch(rejectFriendRequest(myUid, uid));
  }, [dispatch, myUid, uid]);

  const deleteFriend = useCallback(() => {
    dispatch(deleteFriendFromFriendsList(myUid, uid));
  }, [dispatch, myUid, uid]);

  const addPost = useCallback(
    e => {
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
    postId => {
      dispatch(deleteUserPost(uid, postId));
    },
    [dispatch, uid],
  );

  useEffect(() => {
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
    />
  );
};

export default ProfileContainer;
