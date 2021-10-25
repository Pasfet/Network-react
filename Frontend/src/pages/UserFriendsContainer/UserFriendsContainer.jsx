import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../actions/errorActions';
import { sendRequestToFriendList } from '../../actions/profileActions';
import { getMyUid, getUserProfile } from '../../store/profileReducer/profileSelectors';
import UserFriendsList from './UserFriendsList/UserFriendsList';

const UserFriendsContainer = () => {
  const user = useSelector(getUserProfile);
  const dispatch = useDispatch();
  const myUid = useSelector(getMyUid);

  const addToFriendsList = useCallback(
    uid => {
      dispatch(sendRequestToFriendList(myUid, uid));
    },
    [dispatch, myUid],
  );

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  return <UserFriendsList user={user} addToFriendsList={addToFriendsList} />;
};

export default UserFriendsContainer;
