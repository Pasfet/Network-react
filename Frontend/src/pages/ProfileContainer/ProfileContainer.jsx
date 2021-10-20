import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getError } from '../../store/errorReducer/errorSelector';
import {
  deleteFriendFromFriendsList,
  getMyFriendsList,
  getUserProfileFromApi,
  rejectFriendRequest,
  sendProfileChange,
  sendRequestToFriendList,
} from '../../actions/profileActions';
import { getUserProfile, getMyUid, getMyFriends } from '../../store/profileReducer/profileSelector';
import Profile from './Profile/Profile';
import { clearError } from '../../actions/errorActions';
import { useCallback } from 'react';

const ProfileContainer = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserProfile);
  const error = useSelector(getError);
  const myUid = useSelector(getMyUid);
  const myFriends = useSelector(getMyFriends);

  const { uid } = useParams();

  const [openStatus, setOpenStatus] = useState(false);
  const [statusInput, setStatusInput] = useState('');

  const sendStatus = useCallback(() => {
    setOpenStatus(false);
    if (statusInput) {
      dispatch(sendProfileChange(myUid, { status: statusInput }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusInput]);

  const addToFriendsList = useCallback(() => {
    dispatch(sendRequestToFriendList(myUid, uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const rejectFriendRequestHandler = useCallback(() => {
    dispatch(rejectFriendRequest(myUid, uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const deleteFriend = useCallback(() => {
    dispatch(deleteFriendFromFriendsList(myUid, uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  useEffect(() => {
    dispatch(getUserProfileFromApi(uid));
    dispatch(getMyFriendsList(myUid));
    setStatusInput(user?.status);

    return () => {
      dispatch(clearError());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, user?.status]);

  return (
    <Profile
      user={user}
      myFriends={myFriends}
      uid={uid}
      myUid={myUid}
      error={error?.type === 'profile' || error?.type === 'error' ? error.message : ''}
      openStatus={openStatus}
      setOpenStatus={setOpenStatus}
      statusInput={statusInput}
      setStatusInput={setStatusInput}
      sendStatus={sendStatus}
      addToFriendsList={addToFriendsList}
      deleteFriend={deleteFriend}
      rejectFriendRequestHandler={rejectFriendRequestHandler}
    />
  );
};

export default ProfileContainer;
